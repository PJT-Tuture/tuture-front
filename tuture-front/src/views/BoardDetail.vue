<template>
    <div class="board-detail">
        <h1>{{ board.title }}</h1>
        <p>{{ board.content }}</p>
        
        <div v-if="board.writer">
            <button @click="editBoard">수정</button>
            <button @click="deleteBoard">삭제</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'BoardDetail',
    props: {
        id: Number,
    },
    data() {
        return {
            board: {},
        };
    },
    created() {
        this.fetchBoardDetail();
    },
    methods: {
        async fetchBoardDetail() {
            try {
                const token = this.$cookies.get('access_token');
                const response = await axios.get(`http://localhost:8080/board/${this.id}`, {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                });
                this.board = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching board detail:', error);
            }
        },
        editBoard() {
            this.$router.push({ name: 'EditBoard', params: { id: this.id } });
        },
        deleteBoard() {
            this.$router.push({ name: 'DeleteBoard', params: { id: this.id } });
        },
    },
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>


