<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderView1 from './views/HeaderView.vue';

</script>

<template>
  <div id="app">
    <nav>
      <HeaderView1 />
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
</style>
