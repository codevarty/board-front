<template>
  <MyModal id="boardSaveModal" size="lg" ref="commonModalRef" @confirm="handleSave">
    <template #header>
      {{ mode === 'SAVE' ? '게시글 등록' : '게시글 수정' }}
    </template>

    <template #body>
      <div class="mb-3">
        <label class="form-label fw-bold">제목</label>
        <input
          id="board-title"
          v-model="form.title"
          type="text"
          class="form-control"
          maxlength="255"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label fw-bold">내용</label>
        <textarea
          id="board-content"
          v-model="form.content"
          class="form-control"
          rows="10"
          required
        ></textarea>
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
import { ref, reactive } from 'vue'
import MyModal from '../common/MyModal.vue'
import MyAxios from '@/api/axios'

const props = defineProps({
  mode: String,
})
const emit = defineEmits(['refresh'])

const commonModalRef = ref(null)

// 초기 상태 정의
const initialForm = {
  boardId: null,
  title: '',
  userSeq: '1', // 기본값 세팅
  content: '',
}

const form = reactive({ ...initialForm })

/**
 * 폼 초기화 함수
 */
const resetForm = () => {
  Object.assign(form, initialForm)
}

/**
 * 모달 열기 (부모에서 호출)
 * @param {Object} data - 수정 시 넘어오는 게시글 데이터
 */
const show = (data) => {
  resetForm() // 일단 비우고
  if (data) {
    // 데이터가 있으면 덮어쓰기 (수정 모드)
    Object.assign(form, data)
  }
  commonModalRef.value?.showModal()
}

const close = () => commonModalRef.value?.closeModal()

/**
 * form 검증 함수
 */
const validForm = () => {
  if (!form.title.trim()) {
    alert('제목을 입력해 주세요.')
    document.getElementById('board-title').focus()
    return false
  }

  if (!form.content.trim()) {
    alert('내용을 입력해 주세요.')
    document.getElementById('board-content').focus()
    return false
  }

  return true
}

/**
 * 저장/수정 로직
 */
const handleSave = async () => {
  // form 검증
  if (!validForm()) return

  try {
    const isSave = props.mode === 'SAVE'
    const url = isSave ? '/board/save' : `/board/update/${form.boardId}`
    const method = isSave ? 'post' : 'put'

    // 서버의 GlobalExceptionHandler가 400 에러를 잡아서 메시지를 띄워줄 것입니다.
    await MyAxios[method](url, form)

    emit('refresh')
    close()
  } catch (error) {
    // 에러 처리는 axios 인터셉터에서 공통 처리됨
    console.error('Board save error:', error)
  }
}

defineExpose({ show, close })
</script>
