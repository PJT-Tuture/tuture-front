<template>
    <div>
        <form @submit.prevent="submitForm">
            <!-- Section 1 -->
            <div>
                <h3>1. 프로젝트 기본 정보를 입력해주세요.</h3>
                <div>
                    <label for="roleCategory">모집 구분</label>
                    <select v-model="form.roleCategory" id="roleCategory">
                        <option value="멘토">멘 토</option>
                        <option value="멘티">멘 티</option>
                    </select>
                </div>
                <div>
                    <label for="tags">기술 스택</label>
                    <multiselect
                        v-model="form.tags"
                        :options="availableTags"
                        :multiple="true"
                        :taggable="true"
                        label="name"
                        track-by="id"
                        placeholder="기술 스택을 선택하세요"
                        @tag="addTag"
                    ></multiselect>
                </div>
                <div>
                    <label for="dueDate">모집 마감일</label>
                    <input type="date" v-model="form.dueDate" id="dueDate" />
                </div>
                <div>
                    <label for="region">지역</label>
                    <select v-model="form.region" id="region">
                        <option value="서울">서울</option>
                        <option value="부산">부산</option>
                        <option value="대구">대구</option>
                        <!-- 추가 지역 선택지를 여기 추가하세요 -->
                    </select>
                </div>
            </div>

            <!-- Section 2 -->
            <div>
                <h3>2. 프로젝트에 대해 소개해주세요.</h3>
                <div>
                    <label for="title">제목</label>
                    <input type="text" v-model="form.title" id="title" />
                </div>
                <div>
                    <label for="content">내용</label>
                    <textarea v-model="form.content" id="content"></textarea>
                </div>
            </div>

            <button type="submit">등록</button>
            <button type="button" @click="cancelForm">취소</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
export default {
    components: {
        Multiselect,
    },
    data() {
        return {
            form: {
                roleCategory: '',
                tags: [],
                dueDate: '',
                region: '',
                title: '',
                content: '',
            },
            availableTags: [
                { id: 1, name: 'Nextjs' },
                { id: 2, name: 'Flutter' },
                { id: 3, name: 'Spring' },
                { id: 4, name: 'MySQL' },
                { id: 5, name: 'JavaScript' },
                { id: 6, name: 'Python' },
                { id: 7, name: 'Kubernetes' },
                { id: 8, name: 'Kotlin' },
                { id: 9, name: 'React' },
                { id: 10, name: 'Linux' },
                { id: 11, name: 'TypeScript' },
                { id: 12, name: 'Redis' },
                { id: 13, name: 'Java' },
                { id: 14, name: 'MongoDB' },
                { id: 15, name: 'Figma' },
                { id: 16, name: 'Vue' },
                { id: 17, name: 'CSS' },
                { id: 18, name: 'EC2' },
                { id: 19, name: 'AWS' },
                { id: 20, name: 'php' },
                { id: 21, name: 'Firebase' },
                { id: 22, name: 'Go' },
                { id: 23, name: 'Django' },
                { id: 24, name: 'GraphQL' },
                { id: 25, name: 'Android' },
            ],
        };
    },
    methods: {
        addTag(newTag) {
            const newId = this.availableTags.length + 1;
            const tag = {
                id: newId,
                name: newTag,
            };
            this.availableTags.push(tag);
            this.form.tags.push(tag);
        },
        async submitForm() {
            try {
                const token = this.$cookies.get('access_token');
                const writerId = this.$cookies.get('user_id');
                const writerNickname = this.$cookies.get('nickname');
                const payload = {
                    title: this.form.title,
                    writerId: writerId,
                    writerNickname: writerNickname,
                    content: this.form.content,
                    dueDate: this.form.dueDate,
                    region: this.form.region,
                    roleCategory: this.form.roleCategory,
                    tags: this.form.tags,
                    imgUrl: 'url',
                };
                const response = await axios.post('http://localhost:8080/board', payload, {
                    headers: {
                        'X-AUTH-TOKEN': token, // 헤더에 토큰 설정
                    },
                });
                console.log('Form submitted successfully:', response.data);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
        cancelForm() {
            this.$router.push({ name: 'BoardList' });
        },
    },
};
</script>

<style scoped>
</style>
