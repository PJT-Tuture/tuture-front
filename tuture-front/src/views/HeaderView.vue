<template>
  <div>
    <div v-if="!isAuthenticated" id="not-signin" class="not-signin-bar">
      <div class="not-signin-left">
        <router-link to="/"><i class="fas fa-home"></i> Main</router-link> | 
        <router-link to="/board-list"><i class="fas fa-list"></i> Board</router-link>
      </div>
      <div class="not-signin-right">
        <router-link to="/signin"><i class="fas fa-sign-in-alt"></i> SignIn</router-link> |
        <router-link to="/signup"><i class="fas fa-user-plus"></i> SignUp</router-link>
      </div>
    </div>
    <div v-else id="signin" class="signin-bar">
      <div class="signin-left">
        <router-link to="/"><i class="fas fa-home"></i> Main</router-link> | 
        <router-link to="/board-list"><i class="fas fa-list"></i> Board</router-link>
      </div>
      <div class="signin-right">
        <div><i class="fas fa-user"></i> {{ nickname }}</div> |
        <div @click="signOut"><i class="fas fa-sign-out-alt"></i> SignOut</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: 'NavigationBar',
  data() {
    return {
      isAuthenticated: false,
      nickname: ''
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
        this.nickname = response.data.nickname; // 응답에 nickname 필드가 있다고 가정
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
    }
  }
};
</script>

<style scoped>
.not-signin-bar, .signin-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #4CAF50; /* 네비게이션 바 배경 색상 */
  color: white; /* 텍스트 색상 */
  align-items: center;
}

.not-signin-left, .signin-left,
.not-signin-right, .signin-right {
  display: flex;
  gap: 15px;
}

.not-signin-left a, .signin-left a,
.not-signin-right a {
  text-decoration: none;
  color: white; /* 링크 텍스트 색상 */
  font-weight: bold;
}

.not-signin-left a:hover, .signin-left a:hover,
.not-signin-right a:hover {
  text-decoration: underline;
  color: #FFD700; /* 호버 시 텍스트 색상 변경 */
}

.not-signin-right div, .signin-right div {
  cursor: pointer;
}

.not-signin-right div:hover, .signin-right div:hover {
  text-decoration: underline;
  color: #FFD700; /* 호버 시 텍스트 색상 변경 */
}

i {
  margin-right: 5px;
}
</style>
