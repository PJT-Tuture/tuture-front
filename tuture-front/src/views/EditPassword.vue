<template>
  <div class="container">
    <div>
      <h2>비밀번호 변경</h2>
      <hr class="divider">
      <form @submit.prevent="updatePassword">
        <div class="form-group">
          <label for="currentPassword">현재 비밀번호</label>
          <input type="password" id="currentPassword" v-model="currentPassword" placeholder="현재 비밀번호를 입력하세요">
        </div>
        <div class="form-group">
          <label for="newPassword">새 비밀번호</label>
          <input type="password" id="newPassword" v-model="newPassword" placeholder="새 비밀번호를 입력하세요">
        </div>
        <div class="form-group">
          <label for="confirmPassword">새 비밀번호 확인</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="새 비밀번호를 한번 더 입력해주세요">
        </div>
        <hr class="divider">
        <button type="submit">개인정보 수정</button>
      </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      accessToken: '',
    };
  },
  created() {
    const token = this.$cookies.get('access_token');
    if (token) {
      this.isAuthenticated = true;
      this.accessToken = token;
    }
  },
  methods: {
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert('새 비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        const response = await axios.put('http://localhost:8080/user/password', {
          curPassword: this.currentPassword,
          newPassword: this.newPassword,
        }, {
          headers: {
            'X-AUTH-TOKEN': this.accessToken,
          }
        });
        if (response.status === 200) {
          alert('비밀번호가 성공적으로 변경되었습니다.');
        }
      } catch (error) {
        if (error.response || error.response.status === 400) {
          alert('현재 비밀번호가 일치하지 않습니다.');
        } else {
          alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  display: flex;
  height: 100%;
  margin: 0;
}

.container {
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  align-content: center;
  width: 300px;
  height: 500px;
}

.container h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  background-color: #ffcc00;
  border: none;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #e6b800;
}

.divider {
  width: 100%;
  border: 1px solid #ddd;
  margin: 20px 0;
}
</style>
