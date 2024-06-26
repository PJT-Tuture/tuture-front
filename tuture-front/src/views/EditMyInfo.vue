<template>
  <div class="edit-my-info">
    <div class="container">
      <h1>프로필 수정</h1>
      <div class="profile-container">
        <input type="file" id="profilePicture" @change="onFileChange" class="file-input">
        <label for="profilePicture" class="profile-label">
          <img :src="previewImage || defaultProfileImage" alt="Profile Preview" class="profile-preview">
          <div class="camera-icon">📷</div>
        </label>
      </div>
      <hr class="divider">

      <form @submit.prevent="submitForm" class="form-container">
        <div class="form-group">
          <label for="nickname" class="form-label">닉네임</label>
          <input type="text" id="nickname" v-model="nickname" class="form-input" placeholder="닉네임을 입력하세요.">
          <button type="button" class="check-button" @click="checkNickname">중복확인</button>
        </div>
        <div v-if="nicknameChecked">
          {{ nicknameMessage }}
        </div>
        <hr class="divider">
        <button type="submit" class="submit-button" :disabled="isSubmitDisabled">개인정보 수정</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditMyInfo',
  data() {
    return {
      profilePicture: null,
      isProfileChanged: false,
      previewImage: '',
      nickname: '',
      nicknameMessage: '',
      isUniqueNickname: false,
      nicknameChecked: false,
      defaultProfileImage: '/path/to/default/profile/image.png',
      file: null,
    };
  },
  created() {
    const token = this.$cookies.get('access_token');
    if (token) {
      this.isAuthenticated = true;
      this.accessToken = token;
    }
  },
  watch: {
    profilePicture(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.isProfileChanged = true;
      }
    }
  },
  computed: {
    isSubmitDisabled() {
      if (this.nickname) {
        return !(this.nicknameChecked && this.isUniqueNickname);
      } else {
        if (!this.isProfileChanged) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
      if (this.file) {
        this.profilePicture = this.file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(this.file);
      }
    },
    async checkNickname() {
      try {
        const response = await axios.get(`http://localhost:8080/user/verify-nickname/${this.nickname}`);
        console.log(response)
        this.nicknameMessage = response.data.msg;
        if (response.data.status === 200) {
          this.isUniqueNickname = true;
        } else {
          this.isUniqueNickname = false;
        }
        this.nicknameChecked = true;
      } catch (error) {
        console.error('닉네임 확인 중 오류가 발생했습니다:', error);
        this.nicknameMessage = '닉네임 확인 중 오류가 발생했습니다.';
        this.isUniqueNickname = false;
        this.nicknameChecked = true;
      }
    },
    async submitForm() {
      let formData = new FormData();

      if (!this.isSubmitDisabled || this.isProfileChanged) {
        const payload = {
          nickname: this.nickname,
          profile_img: this.file.name,
        };

        let json = JSON.stringify(payload);
        formData.append("json", new Blob([json], { type: 'application/json' }));
        formData.append("profileImg", this.file);

        const response = await axios.put('http://localhost:8080/user/basic', formData, {
          headers: {
            'X-AUTH-TOKEN': this.accessToken,
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response.data) {
          alert('프로필이 성공적으로 업데이트되었습니다.');
        } else {
          alert('실패');
        }


      }
    }
  }};
</script>

<style scoped>
.edit-my-info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.container {
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.profile-container {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.file-input {
  display: none;
}

.profile-label {
  cursor: pointer;
}

.profile-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.camera-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  align-items: center;
}

.form-label {
  margin-right: 10px;
  font-weight: bold;
  color: #555;
}

.form-input {
  flex-grow: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.check-button {
  padding: 10px 20px;
  font-size: 14px;
  color: #999;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.divider {
  width: 100%;
  border: 1px solid #ddd;
  margin: 20px 0;
}

.submit-button {
  padding: 15px 30px;
  font-size: 16px;
  color: #fff;
  background-color: #FFC107;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #e0a800;
}

.submit-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.nickname-message {
  margin-left: 10px;
  font-size: 14px;
}
</style>
