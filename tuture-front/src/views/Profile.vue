<template>
  <div class="page-container">
    <div class="fixed-sidebar">
      <ul>
        <li><router-link to="/my-info">내 정보 보기</router-link></li>
        <li><router-link to="/edit-my-info">내 정보 수정</router-link></li>
        <li><router-link to="/change-password">비밀번호 변경</router-link></li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style scoped>
.page-container {
  display: flex;
  height: 90vh;
}

.fixed-sidebar {
  position: fixed;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  padding: 0;
  background-color: white;
  border: 2px solid #ffd600;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.fixed-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.fixed-sidebar li {
  margin: 0;
}

.fixed-sidebar li a {
  display: block;
  padding: 15px 20px;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  color: black;
  background-color: white;
}

.fixed-sidebar li a:hover,
.fixed-sidebar li a:focus {
  background-color: #ffd600;
}

.fixed-sidebar .delete-account a {
  background-color: #ffd600;
}

.fixed-sidebar .delete-account a:hover,
.fixed-sidebar .delete-account a:focus {
  background-color: #ffd600;
}

.content {
  display: flex;
  margin-left: 180px;
  padding: 20px;
  flex-grow: 1;
  justify-content: center;
  text-align: center;
  align-items: center;
}
</style>