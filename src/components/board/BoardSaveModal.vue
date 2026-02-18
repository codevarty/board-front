<template>
  <MyModal id="boardSaveModal" size="lg" ref="commonModalRef" @confirm="handleSave">
    <template #header>
      {{ mode === 'SAVE' ? '게시글 등록' : '게시글 수정' }}
    </template>

    <template #body>
      <div class="mb-3">
        <label class="form-label fw-bold">제목</label>
        <input v-model="form.title" type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label fw-bold">내용</label>
        <textarea v-model="form.content" class="form-control" rows="10"></textarea>
      </div>
    </template>

    <template #footer>
      <button class="btn btn-secondary" @click="close">취소</button>
      <button class="btn btn-primary" @click="handleSave">
        {{ mode === 'SAVE' ? '저장하기' : '수정하기' }}
      </button>
    </template>
  </MyModal>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import MyModal from '../common/MyModal.vue';
import MyAxios from '@/api/axios';

const props = defineProps({
  mode: String,
  boardData: Object
});
const emit = defineEmits(['refresh']);

const commonModalRef = ref(null);
const form = reactive({ boardId: null, title: '', userSeq: '', content: '' });

// 데이터 매핑 및 초기화
watch(() => props.boardData, (newVal) => {
  if (newVal) Object.assign(form, newVal);
  else resetForm();
}, { deep: true });

const handleSave = async () => {
  // 아래 코드 입시 작성 추후 변경 필요.
  form.userSeq = '1';

  const url = props.mode === 'SAVE' ? '/board/save' : `/board/update/${form.boardId}`;
  const method = props.mode === 'SAVE' ? 'post' : 'put';
  
  await MyAxios[method](url, form);
  emit('refresh');
  close();
};

const show = () => commonModalRef.value?.showModal();
const close = () => commonModalRef.value?.closeModal();

defineExpose({ show, close });
</script>