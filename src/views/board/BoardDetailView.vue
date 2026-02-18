<template>
  <div class="container mt-5">
    <div class="card shadow-sm">
      <div class="card-header bg-white py-3">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="fw-bold mb-0">{{ board.title }}</h3>
          <span class="badge bg-info text-dark">조회수 {{ board.viewCount }}</span>
        </div>
        <div class="mt-2 text-muted small">
          <span class="me-3"><i class="bi bi-person"></i> {{ board.userName }}</span>
          <span><i class="bi bi-calendar"></i> {{ formatDate(board.createdAt) }}</span>
        </div>
      </div>

      <div class="card-body p-4" style="min-height: 300px; white-space: pre-wrap;">
        {{ board.content }}
      </div>

      <div class="card-footer bg-light d-flex justify-content-between py-3">
        <button class="btn btn-outline-secondary" @click="goToList">
          <i class="bi bi-list"></i> 목록으로
        </button>
        <div>
          <button class="btn btn-primary me-2 text-white" @click="openEditModal">
            <i class="bi bi-pencil"></i> 수정
          </button>
          <button class="btn btn-danger" @click="handleDelete">
            <i class="bi bi-trash"></i> 삭제
          </button>
        </div>
      </div>
    </div>

    <div v-if="board.boardId">
      <CommentComponent :boardId="Number(board.boardId)" />
    </div>

    <BoardSaveModal 
      ref="updateModalRef" 
      mode="UPDATE" 
      :boardData="board" 
      @refresh="fetchDetail" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MyAxios from '@/api/axios'
import BoardSaveModal from '@/components/board/BoardSaveModal.vue'
import CommentComponent from '@/components/comment/CommentComponent.vue'

const route = useRoute()
const router = useRouter()
const board = ref({})
const updateModalRef = ref(null);

// 1. 상세 데이터 조회 (GET /board/{boardId})
const fetchDetail = async () => {
  try {
    const boardId = route.params.boardId // URL의 :boardId 파라미터 가져오기
    const response = await MyAxios.get(`/board/${boardId}`)
    board.value = response.data
  } catch (error) {
    console.error("데이터 조회 실패:", error)
    alert("게시글을 찾을 수 없습니다.")
    goToList()
  }
}

// 2. 수정 모달 열기
const openEditModal = () => {
    if (updateModalRef.value) {
        updateModalRef.value.show();
    }
}

// 3. 삭제 처리 (DELETE /board/delete/{boardId})
const handleDelete = async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return
  
  try {
    await MyAxios.delete(`/board/delete/${board.value.boardId}`)
    alert("삭제되었습니다.")
    goToList()
  } catch (error) {
    console.error("삭제 실패:", error)
  }
}

const goToList = () => router.push('/board')
const formatDate = (date) => date ? date.split('T')[0] : ''

onMounted(fetchDetail);
</script>