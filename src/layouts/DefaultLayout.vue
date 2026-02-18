<script setup>
import { RouterView } from 'vue-router';
import HeaderLayout from './HeaderLayout.vue';
import FooterLayout from './FooterLayout.vue';
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    
    <HeaderLayout />

    <main class="flex-shrink-0 mt-5 pt-3">
      <div class="container py-4">
        <RouterView />
      </div>
    </main>

    <FooterLayout />
    
  </div>
</template>

<style scoped>
/* 페이지 전체 배경색이나 폰트 설정이 필요하면 여기서 수행 */
main {
  /* 본문 영역의 최소 높이를 확보하여 푸터 위치를 안정화 */
  min-height: calc(100vh - 150px); 
}
</style>