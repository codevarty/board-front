<script setup>
    import { RouterLink } from 'vue-router';
    import NavLayout from './NavLayout.vue'
</script>

<template>
  <nav class="navbar navbar-light bg-white fixed-top shadow-sm">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <button 
          class="btn border-0 me-2" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <RouterLink class="navbar-brand fw-bold" to="/">MyBoard</RouterLink>
      </div>

      <div class="d-flex">
        <button class="btn btn-primary btn-sm px-3 fw-bold" type="button">로그인</button>
      </div>
    </div>

    <NavLayout />
  </nav>
</template>