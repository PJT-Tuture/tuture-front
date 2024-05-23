<template>
    <div>
        <h3>게시물 삭제</h3>
        <p>정말로 이 게시물을 삭제하시겠습니까?</p>
        <button @click="deleteBoard">삭제</button>
        <button @click="cancel">취소</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    methods: {
        async deleteBoard() {
            try {
                const token = this.$cookies.get('access_token');
                const response = await axios.delete(`http://localhost:8080/board/${this.id}`, {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                });
                console.log('Board deleted successfully:', response.data);
                this.$router.push({ name: 'BoardList' });
            } catch (error) {
                console.error('Error deleting board:', error);
            }
        },
        cancel() {
            this.$router.push({ name: 'BoardList' });
        },
    },
};
</script>

<style scoped>
button {
    margin: 5px;
}
</style>
