<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderView1 from './views/HeaderView.vue';

</script>

<template>
  <div id="app">
    <nav>
      <HeaderView1/>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>

</style>
