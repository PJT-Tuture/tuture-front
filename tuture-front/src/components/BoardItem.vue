<template>
    <div class="board-item" @click="goToDetail">
        <div class="item-header">
            <span class="status">{{ status }}</span>
            <span class="tag">{{ tag }}</span>
            <i class="fas fa-hand-paper" v-if="hot"></i>
        </div>
        <div class="item-date">
            <span>마감일 | {{ date }}</span>
        </div>
        <div class="item-title">
            <h3>{{ title }}</h3>
        </div>
        <div class="item-role">
            <span>{{ role }}</span>
        </div>
        <div class="item-icons">
            <i v-for="icon in icons" :key="icon" :class="icon"></i>
        </div>
        <div class="item-footer">
            <span class="author">{{ author }}</span>
            <span class="views"><i class="fas fa-eye"></i> {{ views }}</span>
            <span class="comments"><i class="fas fa-comments"></i> {{ comments }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoardItem',
    props: {
        id: Number,
        status: String,
        tag: String,
        date: String,
        title: String,
        role: String,
        author: String,
        icons: Array,
        views: Number,
        comments: Number,
        hot: Boolean,
    },
    methods: {
        goToDetail() {
            this.$router.push({ name: 'BoardDetail', params: { id: this.id } });
        },
    },
};
</script>

<style scoped>
.board-item {
    font-family: 'Gmarket Sans TTF';
    border: 1px solid #ddd;
    border-radius: 20px; /* 둥근 모서리 추가 */
    padding: 12px; /* 패딩 조정 */
    margin: 10px; /* 마진 조정 */
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 그림자 조정 */
    width: 180px; /* 너비 조정 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: Arial, sans-serif;
    transition: transform 0.3s, box-shadow 0.3s; /* 호버 애니메이션 추가 */
}

.board-item:hover {
    transform: translateY(-3px); /* 호버 시 약간 위로 올라감 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 강화 */
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85em; /* 글자 크기 조정 */
    color: #555;
    margin-bottom: 8px; /* 하단 여백 추가 */
}

.status {
    background-color: #ffcc00;
    padding: 4px 8px; /* 패딩 조정 */
    border-radius: 8px;
    font-weight: bold;
}

.tag {
    background-color: #cccccc;
    padding: 4px 8px; /* 패딩 조정 */
    border-radius: 8px;
    font-weight: bold;
}

.item-date {
    font-size: 0.8em;
    color: #999;
    margin-top: 4px;
    margin-bottom: 8px; /* 하단 여백 추가 */
}

.item-title {
    margin: 12px 0;
    font-size: 0.8em; /* 글자 크기 조정 */
    font-weight: bold;
    color: #333;
}

.item-role {
    color: #1e90ff;
    font-size: 0.9em;
    margin-bottom: 10px; /* 하단 여백 추가 */
}

.item-icons {
    display: flex;
    gap: 8px;
    margin-bottom: 10px; /* 하단 여백 추가 */
}

.item-icons i {
    font-size: 1.2em; /* 아이콘 크기 조정 */
    color: #777; /* 아이콘 색상 조정 */
}

.item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8em; /* 글자 크기 조정 */
    color: #777;
    margin-top: 10px; /* 상단 여백 추가 */
}

.author {
    font-weight: bold;
}

.views,
.comments {
    display: flex;
    align-items: center;
}

.views i,
.comments i {
    margin-right: 4px;
    color: #888; /* 아이콘 색상 조정 */
}
</style>