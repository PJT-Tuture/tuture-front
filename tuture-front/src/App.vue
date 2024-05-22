<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderView from './views/HeaderView.vue';
import FooterView from './views/FooterView.vue';

</script>

<template>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap">
  </head>
  <div id="app">
    <nav>
      <HeaderView />
    </nav>
    <router-view></router-view>
  </div>
  <div>
    <FooterView />
  </div>
</template>

<style>
#app {
  font-family: 'Noto Sans KR', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
</style>
