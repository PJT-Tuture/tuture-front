<template>
  <div>
    <div v-if="!isAuthenticated" id="not-signin" class="not-signin-bar">
      <div class="not-signin-left">
        <router-link to="/"><i class="fas fa-home"></i> Main</router-link>
        <router-link to="/board-list"><i class="fas fa-list"></i> Board</router-link>
      </div>
      <div class="not-signin-right">
        <router-link to="/signin" class="button"><i class="fas fa-sign-in-alt"></i> 로그인</router-link>
        <router-link to="/signup" class="button"><i class="fas fa-user-plus"></i> 회원가입</router-link>
      </div>
    </div>
    <div v-else id="signin" class="signin-bar">
      <div class="signin-left">
        <router-link to="/"><i class="fas fa-home"></i> Main</router-link>
        <router-link to="/board-list"><i class="fas fa-list"></i> Board</router-link>
      </div>
      <div class="signin-right">
        <div class="dropdown" @click="toggleDropdown">
          <div><i class="fas fa-user"></i> {{ nickname }}</div>
          <div v-if="showDropdown" class="dropdown-menu">
            <router-link to="/my-posts">내 작성글</router-link>
            <router-link to="/my-info">내 정보</router-link>
          </div>
        </div>
        <button @click="signOut" class="button"><i class="fas fa-sign-out-alt"></i> 로그아웃</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css'; // Font Awesome CSS 파일 import

export default {
  name: 'NavigationBar',
  data() {
    return {
      isAuthenticated: false,
      nickname: '',
      showDropdown: false
    };
  },
  created() {
    const token = this.$cookies.get('access_token');
    if (token) {
      this.isAuthenticated = true;
      this.fetchUserInfo(token);
    }
  },
  methods: {
    async fetchUserInfo(token) {
      try {
        const response = await axios.get('http://localhost:8080/user', {
          headers: {
            'X-AUTH-TOKEN': token
          }
        });
        this.nickname = response.data.nickname;
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', error);
        console.error('오류 응답:', error.response);
      }
    },
    signOut() {
      this.$cookies.remove('access_token');
      this.isAuthenticated = false;
      this.nickname = '';
      this.$router.push('/');
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    }
  }
};
</script>

<style scoped>
.not-signin-bar, .signin-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa; /* 배경 색상 */
  color: #333333; /* 텍스트 색상 */
  align-items: center;
  border-bottom: 1px solid #e0e0e0; /* 하단 경계선 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 상자 그림자 */
}

.not-signin-left, .signin-left,
.not-signin-right, .signin-right {
  display: flex;
  gap: 15px;
  margin: 10px 20px;
}

.not-signin-left a, .signin-left a {
  text-decoration: none;
  color: #333333; /* 링크 텍스트 색상 */
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.not-signin-left a:hover, .signin-left a:hover {
  background-color: #fddf68; /* 호버 시 배경 색상 */
  color: #ffffff; /* 호버 시 텍스트 색상 */
}

.button {
  padding: 8px 15px;
  background-color: #fdd835; /* 버튼 배경 색상 */
  color: #ffffff; /* 버튼 텍스트 색상 */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none; /* 링크 스타일 초기화 */
  transition: background-color 0.3s ease;
  font-family: 'Noto Sans KR', Avenir, Helvetica, Arial, sans-serif; /* 폰트 패밀리 추가 */
}

.button:hover {
  background-color: #eec318; /* 호버 시 버튼 배경 색상 */
}

.dropdown {
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 150px;
  border-radius: 8px; /* 드롭다운 메뉴 모서리를 둥글게 */
  padding: 10px 0;
}

.dropdown-menu a {
  padding: 10px 20px;
  text-decoration: none;
  font-size: 0.9em;
  color: #333333;
}

.dropdown-menu a:last-child {
  border-bottom: none; /* 마지막 항목은 구분선 제거 */
}

.dropdown-menu a:hover {
  background-color: #fdd835;
  color: #ffffff;
}

i {
  color: #333333; /* 아이콘 색상 */
}
</style>
