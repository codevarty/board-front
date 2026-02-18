<template>
  <div class="modal fade" :id="id" tabindex="-1" ref="modalRef" aria-hidden="true">
    <div class="modal-dialog" :class="modalSize">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title fw-bold">
            <slot name="header">기본 제목</slot>
          </h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">닫기</button>
            <button type="button" class="btn btn-primary" @click="$emit('confirm')">확인</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as bootstrap from 'bootstrap';

const props = defineProps({
  id: { type: String, required: true },
  size: { type: String, default: 'md' } // sm, md, lg, xl
});

const emit = defineEmits(['confirm']);
const modalRef = ref(null);
let modalInstance = null;

const modalSize = {
  sm: 'modal-sm',
  md: '',
  lg: 'modal-lg',
  xl: 'modal-xl'
}[props.size];

// 외부(부모)에서 호출할 수 있도록 메소드 노출
const showModal = () => modalInstance?.show();
const closeModal = () => modalInstance?.hide();

defineExpose({ showModal, closeModal });

onMounted(() => {
  modalInstance = new bootstrap.Modal(modalRef.value);
});
</script>