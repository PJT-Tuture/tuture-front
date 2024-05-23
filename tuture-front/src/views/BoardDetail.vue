<template>
    <div class="board-detail">
        <h1>{{ board.title }}</h1>
        <p>{{ board.content }}</p>
        <!-- 필요한 다른 정보들 표시 -->
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
            } catch (error) {
                console.error('Error fetching board detail:', error);
            }
        },
    },
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>


