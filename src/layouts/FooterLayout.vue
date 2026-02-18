<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <footer class="footer mt-auto py-4 bg-light border-top">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start">
          <span class="text-muted">© 2026 <strong class="text-primary">MyBoard</strong>. All rights reserved.</span>
        </div>

        <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
          <ul class="list-inline mb-0">
            <li class="list-inline-item me-3">
              <RouterLink to="/terms" class="text-decoration-none text-muted small">이용약관</RouterLink>
            </li>
            <li class="list-inline-item me-3">
              <RouterLink to="/privacy" class="text-decoration-none text-muted small">개인정보처리방침</RouterLink>
            </li>
            <li class="list-inline-item">
              <a href="https://github.com" class="text-muted" target="_blank">
                <i class="bi bi-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  font-size: 0.9rem;
}

.footer a:hover {
  color: var(--bs-primary) !important;
}
</style>