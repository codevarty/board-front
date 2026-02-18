<script setup>
import { RouterLink } from 'vue-router';
import * as bootstrap from 'bootstrap';
import { ref } from 'vue';

// 1. ref 객체 생성 (초기값 null)
const offCanvas = ref(null);

const closeOffcanvas = () => {
    
    // 2. .value를 통해 DOM 요소에 접근
    const navOffcanvas = offCanvas.value;
    
    if (navOffcanvas) {
        // 인스턴스가 없으면 새로 생성하고, 있으면 가져와서 hide 호출
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(navOffcanvas);
        bsOffcanvas.hide();
        bsOffcanvas.hide();
    }
}

</script>

<template>
  <div 
    ref="offCanvas"
    class="offcanvas offcanvas-start" 
    tabindex="-1" 
    id="offcanvasNavbar" 
    aria-labelledby="offcanvasNavbarLabel"
  >
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title fw-bold" id="offcanvasNavbarLabel">Menu</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li class="nav-item mb-2">
          <RouterLink class="nav-link p-2" to="/" @click="closeOffcanvas">
            <i class="bi bi-list-ul me-2"></i>홈
          </RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink class="nav-link p-2" to="/board" @click="closeOffcanvas">
            <i class="bi bi-list-ul me-2"></i>게시판 목록
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.nav-link:hover {
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>