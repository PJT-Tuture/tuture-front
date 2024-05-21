<template>
  <div id="nav" class="navbar">
    <div class="nav-left">
      <router-link to="/">Main</router-link> | 
      <router-link to="/board-list">Board</router-link>
    </div>
    <div class="nav-right">
      <router-link to="/signin">SignIn</router-link> |
      <router-link to="/signup">SignUp</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #fdf9bd;
}

.nav-left,
.nav-right {
  display: flex;
  gap: 10px;
}

.nav-left a,
.nav-right a {
  text-decoration: none;
  color: #000000;
}

.nav-left a:hover,
.nav-right a:hover {
  text-decoration: underline;
}
</style>
