<template>
    <div class="board-container">
        <div class="button-group">
            <button>멘토</button>
            <button>멘티</button>
            <button>프로젝트</button>
            <button>스터디</button>
        </div>
        <div class="button-group2">
            <button @click="toggleTechStack">기술 스택</button>
        </div>
        <TechStack v-if="showTechStack" @select-tag="selectTag" />
        <div class="navbar-search">
            <input type="text" placeholder="Search" />
            <i class="fas fa-search"></i>
        </div>
        <div class="board">
            <BoardItem
                v-for="board in boards"
                :key="board.id"
                :id="board.id"
                :status="board.status"
                :tag="board.tag"
                :date="board.dueDate"
                :title="board.title"
                :role="board.roleCategory"
                :author="board.writerNickname"
                :icons="['fas fa-brain', 'fas fa-rocket', 'fas fa-paint-brush']"
                :views="board.viewCnt"
                :comments="0"
                :tags="board.tags"
                :hot="false"
            />
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import BoardItem from '@/components/BoardItem.vue';
import TechStack from '@/components/TechStack.vue';

export default {
    components: {
        BoardItem,
        TechStack,
    },
    setup() {
        const showTechStack = ref(false);
        const boards = ref([]);
        const selectedTags = ref([]);

        const fetchBoards = async (tags = []) => {
            try {
                console.log('Fetching boards with tags:', tags);
                let response;
                if (tags.length === 0) {
                    response = await axios.get('http://localhost:8080/board');
                } else {
                    response = await axios.get(`http://localhost:8080/board/tags`, {
                        params: {
                            tagIds: tags,
                        },
                        paramsSerializer: (params) => {
                            return Object.keys(params)
                                .map((key) => {
                                    return `${key}=${encodeURIComponent(params[key])}`;
                                })
                                .join('&');
                        },
                    });
                }
                boards.value = response.data;
            } catch (error) {
                console.error('Error fetching boards:', error);
            }
        };

        const toggleTechStack = () => {
            showTechStack.value = !showTechStack.value;
        };

        const selectTag = (tagId) => {
            if (!selectedTags.value.includes(tagId)) {
                selectedTags.value.push(tagId);
            } else {
                selectedTags.value = selectedTags.value.filter((id) => id !== tagId);
            }
            fetchBoards(selectedTags.value);
        };

        onMounted(() => {
            fetchBoards();
        });

        return {
            showTechStack,
            boards,
            toggleTechStack,
            selectTag,
        };
    },
};
</script>

<style scoped>
.button-group {
    display: flex;
    justify-content: left;
    gap: 20px;
    padding: 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #ffffff;
}

.button-group2 {
    display: flex;
    justify-content: left;
    gap: 20px;
    padding: 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
}

.button-group button,
.button-group2 button {
    font-family: 'Gmarket Sans TTF';
    padding: 10px 20px;
    font-size: 1em;
    border: none;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.button-group button:hover,
.button-group2 button:hover {
    background-color: #f0f0f0;
}

.board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2px;
    max-width: 1200px;
}
</style>
