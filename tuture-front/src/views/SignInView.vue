<template>
    <div class="page-container">
        <div class="login-container">
            <h2>로그인</h2>
            <hr class="divider" />
            <form @submit.prevent="handleLogin">
                <!-- 이메일 입력 -->
                <div class="form-group">
                    <label for="email" class="label">이메일</label>
                    <div class="input-group">
                        <input type="email" id="email" v-model="email" placeholder="이메일을 입력하세요" required />
                    </div>
                </div>
                <!-- 비밀번호 입력 -->
                <div class="form-group">
                    <label for="password" class="label">비밀번호</label>
                    <div class="input-group">
                        <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요" required />
                    </div>
                </div>
                <!-- 에러 메시지 -->
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                <!-- 로그인 버튼 -->
                <button type="submit" class="primary-button">로그인</button>
            </form>
            <hr class="divider" />
            <div class="signup-link" style="margin-top: -10px;">
                계정이 없으신가요? <router-link to="/signup" class="signin-link">회원가입</router-link>
            </div>
            <div class="signup-link">
                비밀번호를 잊으셨나요? <a href="#" class="signin-link" @click.prevent="showForgotPasswordModal">비밀번호 찾기</a>
            </div>
        </div>
        <div v-if="isForgotPasswordModalVisible" class="modal">
            <div class="modal-content">
                <span class="close" @click="isForgotPasswordModalVisible = false">&times;</span>
                <h2>비밀번호 찾기</h2>
                <form @submit.prevent="handleForgotPassword">
                    <div class="form-group">
                        <label for="forgotEmail" class="label">이메일</label>
                        <div class="input-group">
                            <input type="email" id="forgotEmail" v-model="forgotEmail" placeholder="이메일을 입력하세요" required />
                        </div>
                    </div>
                    <div v-if="modalMessage" :class="{'success-message': modalSuccess, 'error-message': !modalSuccess}">{{ modalMessage }}</div>
                    <button type="submit" class="primary-button">비밀번호 재설정 링크 보내기</button>
                </form>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: '',
            forgotEmail: '',
            errorMessage: '',
            isForgotPasswordModalVisible: false,
            modalMessage: '',
            modalSuccess: false,
        };
    },
    methods: {
        handleLogin() {
            const loginData = {
                email: this.email,
                password: this.password,
            };

            fetch('http://localhost:8080/user/signin/general', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                })
                .then(data => {
                    console.log(data);
                    this.$cookies.set('userId',data.userId,'1h');
                    this.$cookies.set('access_token', data.access_token, '1h');
                    this.$cookies.set('writerNickname', data.nickname, '1h');
                    alert('로그인에 성공하였습니다.');
                    window.location.href = 'http://localhost:5173/board-list';
                })
                .catch(error => {
                    console.error('Error during login:', error);
                    this.errorMessage = '로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.';
                });
        },
        showForgotPasswordModal() {
            this.isForgotPasswordModalVisible = true;
        },
        handleForgotPassword() {
            const forgotPasswordData = {
                email: this.forgotEmail,
            };

            fetch('http://localhost:8080/user/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(forgotPasswordData),
            })
                .then(response => {
                    if (response.ok) {
                        this.modalSuccess = true;
                        this.modalMessage = '비밀번호 재설정 링크가 이메일로 전송되었습니다.';
                        this.forgotEmail = '';
                    } else {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                })
                .catch(error => {
                    console.error('Error during forgot password:', error);
                    this.modalSuccess = false;
                    this.modalMessage = '비밀번호 재설정 링크를 보내는 데 실패하였습니다. 이메일을 확인해주세요.';
                });
        },
    },
};
</script>

<style scoped>
/* 모달 스타일 추가 */
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    max-width: 500px;
    min-width: 300px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #ffffff;
    width: 100vw;
}

.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    box-sizing: border-box;
    margin-top: -90px;
}

h2 {
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.label {
    width: 120px;
    margin-bottom: 5px;
    font-size: 0.9em;
}

.input-group {
    display: flex;
    width: 250px;
    align-items: center;
}

.button-group {
    width: 120px;
}

input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
}

.primary-button {
    background-color: #fddf68;
    color: rgb(0, 0, 0);
}

.primary-button:hover {
    background-color: #ffd325;
}

.secondary-button {
    background-color: #d1cfc7;
    color: rgb(255, 255, 255);
}

.secondary-button:hover {
    background-color: #a5a39c;
}

button[type="submit"] {
    margin-top: 20px;
}

.divider {
    width: 100%;
    border: 1px solid #ccc;
    margin: 20px 0;
}

.signup-link {
    font-size: 0.9em;
    margin-top: 5px;
}

.signin-link {
    color: #5bc0de;
    text-decoration: none;
}

.signin-link:hover {
    text-decoration: underline;
}

.success-message {
    font-size: 0.7em;
    color: #28a745;
    margin-top: -15px;
    margin-bottom: 5px;
}

.error-message {
    font-size: 0.7em;
    color: red;
    margin-top: -15px;
    margin-bottom: 5px;
}
</style>