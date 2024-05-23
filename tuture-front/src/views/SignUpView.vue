<template>
    <div class="page-container">
        <div class="signup-container">
            <h1>SignUp View</h1>
            <hr class="divider" />
            <form @submit.prevent="handleSubmit">
                <!-- 이메일 입력 -->
                <div>
                    <div class="form-group">
                        <div class="label">
                            <label for="email">이메일</label>
                        </div>
                        <div class="input-group">
                            <input type="email" id="email" v-model="email" placeholder="이메일을 입력하세요"
                                :disabled="isCodeVerified" required />
                        </div>
                        <div class="button-group">
                            <button type="button" class="secondary-button" @click="sendEmailVerification"
                                :disabled="isCodeVerified">이메일 인증</button>
                        </div>
                    </div>
                    <div v-if="emailError" class="error-message">
                        {{ emailError }}
                    </div>
                    <div v-if="isVerificationSent" class="success-message">
                        해당 이메일로 인증코드를 발송했습니다.
                    </div>
                </div>

                <!-- 인증 코드 입력 -->
                <div>
                    <div class="form-group" v-if="isVerificationSent">
                        <div class="label">
                            <label for="verificationCode">인증 코드 입력</label>
                        </div>
                        <div class="input-group">
                            <input type="text" id="verificationCode" v-model="verificationCode"
                                placeholder="인증 코드를 입력하세요" required />
                        </div>
                        <div class="button-group">
                            <button type="button" class="secondary-button" @click="verifyCode">확인</button>
                        </div>
                    </div>
                    <div v-if="!isCodeVerified && verificationError" class="error-message">
                        인증 코드가 유효하지 않습니다.
                    </div>
                    <div v-if="isCodeVerified" class="success-message">
                        이메일 인증에 성공했습니다.
                    </div>
                </div>

                <!-- 비밀번호 입력 -->
                <div>
                    <div class="form-group">
                        <div class="label">
                            <label for="password">비밀번호</label>
                        </div>
                        <div class="input-group">
                            <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요"
                                required />
                        </div>
                    </div>
                    <div v-if="isPasswordError" class="error-message">{{ passwordError }}</div>
                </div>

                <!-- 비밀번호 확인 -->
                <div>
                    <div class="form-group">
                        <div class="label">
                            <label for="confirmPassword">비밀번호 확인</label>
                        </div>
                        <div class="input-group">
                            <input type="password" id="confirmPassword" v-model="confirmPassword"
                                placeholder="비밀번호를 다시 입력하세요" required />
                        </div>
                    </div>
                    <div v-if="password !== confirmPassword && confirmPassword !== ''" class="error-message">
                        비밀번호가 일치하지 않습니다.
                    </div>
                </div>

                <!-- 닉네임 입력 -->
                <div>
                    <div class="form-group">
                        <div class="label">
                            <label for="nickname">닉네임</label>
                        </div>
                        <div class="input-group">
                            <input type="text" id="nickname" v-model="nickname" placeholder="닉네임을 입력하세요" required />
                        </div>
                        <div class="button-group">
                            <button type="button" class="secondary-button" @click="checkNickname">닉네임 중복확인</button>
                        </div>
                    </div>
                </div>
                <div :class="{ 'success-message': isUniqueNickname, 'error-message': !isUniqueNickname }"
                    v-if="nicknameChecked">
                    {{ nicknameMessage }}
                </div>

                <!-- 회원가입 버튼 -->
                <button type="submit" class="primary-button" @click.prevent="handleSubmit">회원가입</button>
                <hr class="divider" />
                <div class="login-link">
                    이미 아이디가 있으신가요? <router-link to="/signin" class="signin-link">로그인</router-link>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
export default {
    name: 'SignUpView',
    data() {
        return {
            email: '',
            emailError: '',
            verificationCode: '',
            isVerificationSent: false,
            isCodeVerified: false,
            verificationError: false,
            password: '',
            confirmPassword: '',
            nickname: '',
            isUniqueNickname: false,
            nicknameChecked: false,
            nicknameMessage: '',
            passwordError: '',
            isPasswordError: false,
        };
    },
    watch: {
        email(newEmail, oldEmail) {
            if (newEmail !== oldEmail) {
                this.isVerificationSent = false;
                this.verificationCode = '';
                this.isCodeVerified = false;
                this.verificationError = false;
                this.emailError = '';
            }
        },
        nickname(newNickname, oldNickname) {
            if (newNickname !== oldNickname) {
                this.nicknameChecked = false;
                this.isUniqueNickname = false;
                this.nicknameMessage = '';
            }
        },
        password(newPassword, oldPassword) {
            this.checkPasswordMatch();
            this.validatePassword();
        },
        confirmPassword(newConfirmPassword, oldConfirmPassword) {
            this.checkPasswordMatch();
        }
    },
    methods: {
        sendEmailVerification() {
            if (!this.email) {
                this.emailError = '이메일을 입력해주세요.';
                return;
            }

            fetch(`http://localhost:8080/user/send-email/${this.email}`)
                .then(response => {
                    if (response.ok) {
                        this.isVerificationSent = true;
                        this.emailError = '';
                    } else {
                        response.text().then(text => {
                            this.emailError = text;
                            this.isVerificationSent = false;
                        });
                    }
                })
                .catch(error => {
                    console.error('Error sending email verification:', error);
                    alert('인증 이메일을 보내는 중 오류가 발생했습니다.');
                });
        },
        verifyCode() {
            fetch(`http://localhost:8080/user/verify-email?email=${this.email}&code=${this.verificationCode}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        this.isCodeVerified = true;
                        this.verificationError = false;
                        console.log('성공');
                    } else {
                        this.isCodeVerified = false;
                        this.verificationError = true;
                        console.log('실패');
                    }
                })
                .catch(error => {
                    console.error('Error verifying email code:', error);
                    this.isCodeVerified = false;
                    this.verificationError = true;
                });
        },
        checkNickname() {
            fetch(`http://localhost:8080/user/verify-nickname/${this.nickname}`)
                .then(response => response.json())
                .then(data => {
                    this.nicknameMessage = data.msg;
                    if (data.status === 200) {
                        this.isUniqueNickname = true;
                    } else {
                        this.isUniqueNickname = false;
                    }
                    this.nicknameChecked = true;
                })
                .catch(error => {
                    console.error('Error verifying nickname:', error);
                    this.nicknameMessage = '닉네임 확인 중 오류가 발생했습니다.';
                    this.isUniqueNickname = false;
                    this.nicknameChecked = true;
                });
        },
        checkPasswordMatch() {
            this.passwordsMatch = this.password === this.confirmPassword;
        },
        validatePassword() {
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{4,30}$/;
            if (!passwordPattern.test(this.password)) {
                this.isPasswordError = true;
                this.passwordError = '비밀번호는 4자 이상 30자 이하이며, 숫자, 영어, 특수 문자를 포함해야 합니다.';
            } else {
                this.isPasswordError = false;
                this.passwordError = '';
            }
        },
        handleSubmit() {
            this.validatePassword();
            if (this.passwordError) {
                alert(this.passwordError);
                return;
            }
            if (this.password !== this.confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            if (!this.isCodeVerified) {
                alert('이메일 인증을 완료해주세요.');
                return;
            }
            if (!this.isUniqueNickname) {
                alert('사용할 수 없는 닉네임입니다.');
                return;
            }
            if (!this.email || !this.password || !this.nickname) {
                alert('모든 필드를 입력해주세요.');
                return;
            }

            const signUpData = {
                email: this.email,
                password: this.password,
                nickname: this.nickname,
            };

            fetch('http://localhost:8080/user/signup/general', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData),
            })
                .then(response => {
                    if (response.ok) {
                        alert('회원가입에 성공하였습니다.');
                        window.location.href = 'http://localhost:5173/';
                    } else {
                        response.text().then(text => {
                            alert(`회원가입에 실패하였습니다: ${text}`);
                        });
                    }
                })
                .catch(error => {
                    console.error('Error during sign up:', error);
                    alert('회원가입 중 오류가 발생했습니다.');
                });
        },
    },
};
</script>

<style scoped>
.page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #ffffff;
    width: 100vw;
}

.signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin-top: -90px;
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
    /* 글씨를 흰색으로 변경 */
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

.login-link {
    font-size: 0.9em;
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
