<template>
  <div class="myboard">
    <h1>내 작성글</h1>
    <div v-if="boards.length">
      <div class="posts-container">
        <div v-for="board in boards" :key="board.id" class="post">
          <BoardItem
            :id="board.id"
            :status="board.status"
            :tag="getTag(board.id)"
            :date="board.dueDate"
            :title="board.title"
            :role="board.roleCategory"
            :author="board.writerNickname"
            :icons="['fas fa-brain', 'fas fa-rocket', 'fas fa-paint-brush']"
            :views="board.viewCnt"
            :comments="0"
            :tags="getTags(board.id)"
            :hot="false"
          />
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">Previous</button>
        <span>Page {{ page }}</span>
        <button @click="nextPage" :disabled="boards.length < pageSize">Next</button>
      </div>
    </div>
    <p v-else>작성한 글이 없습니다.</p>
  </div>
</template>

<script>
import axios from 'axios';
import BoardItem from '@/components/BoardItem.vue';

export default {
  components: {
    BoardItem,
  },
  data() {
    return {
      boardListResponse: {
        totalCnt: 0,
        boards: [],
        tags: [],
      },
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    boards() {
      return this.boardListResponse.boards || [];
    },
    tags() {
      return this.boardListResponse.tags || [];
    },
  },
  methods: {
    async fetchMyBoardList(page) {
      try {
        const response = await axios.get('http://localhost:8080/user/myboard', {
          params: { page },
          headers: {
            'X-AUTH-TOKEN': this.$cookies.get('access_token'),
          }
        });
        this.boardListResponse = response.data;
      } catch (error) {
        console.error('Failed to fetch board list:', error);
      }
    },
    getTag(boardId) {
      const tag = this.tags.find(tagList => tagList.some(tag => tag.boardId === boardId));
      return tag ? tag[0].lanTagId : '';
    },
    getTags(boardId) {
      const tagList = this.tags.find(tagList => tagList.some(tag => tag.boardId === boardId));
      return tagList ? tagList.map(tag => tag.lanTagId) : [];
    },
    nextPage() {
      this.page += 1;
      this.fetchMyBoardList(this.page);
    },
    prevPage() {
      if (this.page > 1) {
        this.page -= 1;
        this.fetchMyBoardList(this.page);
      }
    },
  },
  created() {
    this.fetchMyBoardList(this.page);
  },
};
</script>

<style scoped>
.myboard {
  height: 100%;
}

h1 {
  color: #333;
  text-align: center;
}

.posts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
}

.post {
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  flex: 1 1 calc(20% - 32px);
  box-sizing: border-box;
  max-width: calc(33.333% - 32px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1.2em;
}
</style>
