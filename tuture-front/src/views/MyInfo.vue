<template>
  <div class="page-container">
    <div class="user-info-container">
      <h1>내 정보</h1>
      <div v-if="email && nickname" class="user-details">
        <div class="profile-image-container">
          <img :src="profileImage" alt="프로필 이미지" />
        </div>
        <hr class="divider">
        <div class="user-data">
          <p><strong>이메일:</strong> {{ email }}</p>
          <p><strong>닉네임:</strong> {{ nickname }}</p>
        </div>
        <hr class="divider">
      </div>
      <div v-else>
        <p>로그인 하세요~</p>
        <router-link to="/signin">재로그인</router-link>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyInfo',
  data() {
    return {
      email: '',
      nickname: '',
      profileImage: '',
    };
  },
  created() {
    const token = this.$cookies.get('access_token');
    this.fetchUserInfo(token);
  },
  methods: {
    async fetchUserInfo(token) {
      try {
        const response = await axios.get('http://localhost:8080/user', {
          headers: {
            'X-AUTH-TOKEN': token
          }
        });
        this.email = response.data.email;
        this.nickname = response.data.nickname;
        this.profileImage = response.data.profileImage;
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', error);
        if (error.response) {
          console.error('오류 응답:', error.response);
        }
        alert('사용자 정보를 가져오는데 실패했습니다. 재로그인이 필요합니다.')
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.user-info-container {
  width: 40vw;
  margin: 20px;
  padding: 50px;
  background: #ffffff;
  border-radius: 15px;
  text-align: center;
}

h1 {
  font-size: 28px;
  color: #4a4a4a;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image-container {
  margin-bottom: 10px;
}

.profile-image-container img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #f0f0f0;
  transition: transform 0.3s ease-in-out;
}

.profile-image-container img:hover {
  transform: scale(1.05);
}

.divider {
  width: 100%;
  border: 1px solid #ddd;
  margin: 20px 0;
}

.user-data {
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
}

.user-data p {
  margin: 10px 0;
  font-size: 18px;
  color: #555;
}

.user-data strong {
  color: #333;
  font-weight: 600;
}
</style>
