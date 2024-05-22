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
  left: 20px;
  transform: translateY(-50%);
  width: 150px;
  background: #f0e15e;
  color: white;
  padding: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.fixed-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.fixed-sidebar li {
  margin-bottom: 15px;
}

.fixed-sidebar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.fixed-sidebar a:hover {
  text-decoration: underline;
}

.content {
  margin-left: 180px;
  padding: 20px;
  flex-grow: 1;
}
</style>
