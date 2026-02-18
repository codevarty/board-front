
<template>
  <div class="comment-section mt-5">
    <h5 class="mb-4"><i class="bi bi-chat-dots"></i> 댓글 ({{ totalElements }})</h5>

    <div v-if="comments.length > 0" class="list-group list-group-flush border-top mb-4">
      <div v-for="comment in comments" :key="comment.commentId" class="list-group-item py-3">
        <div class="d-flex justify-content-between mb-1">
          <span class="fw-bold text-dark">{{ comment.userName }}</span>
          <small class="text-muted">{{ formatDate(comment.createdAt) }}</small>
        </div>
        <div class="text-secondary" style="white-space: pre-wrap;">{{ comment.content }}</div>
      </div>
    </div>
    
    <div v-else class="text-center py-5 text-muted border-top border-bottom mb-4">
      등록된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!
    </div>

    <nav v-if="pageInfo.totalPages > 0" aria-label="Comment navigation" class="mb-5">
      <ul class="pagination pagination-sm justify-content-center">
        <li class="page-item" :class="{ disabled: pageInfo.isFirst }">
          <a class="page-link" href="#" @click.prevent="fetchComments(pageInfo.page - 1)">이전</a>
        </li>
        
        <li v-for="p in pageInfo.totalPages" :key="p" class="page-item" :class="{ active: p === pageInfo.page }">
          <a class="page-link" href="#" @click.prevent="fetchComments(p)">{{ p }}</a>
        </li>

        <li class="page-item" :class="{ disabled: pageInfo.isLast }">
          <a class="page-link" href="#" @click.prevent="fetchComments(pageInfo.page + 1)">다음</a>
        </li>
      </ul>
    </nav>

    <div class="card shadow-sm mb-5">
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label fw-bold">댓글 작성</label>
          <textarea 
            class="form-control" 
            rows="3" 
            v-model="newComment.content" 
            placeholder="따뜻한 댓글을 남겨주세요."
          ></textarea>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary btn-sm px-4" @click="saveComment">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import MyAxios from '@/api/axios'

const props = defineProps({
  boardId: {
    type: Number,
    required: true
  }
})

// 전체 댓글 수 상태 추가
const totalElements = ref(0)

const pageInfo = reactive({
  page: 1,
  totalPages: 1,
  isFirst: true,
  isLast: true
})

const comments = ref([])
const newComment = reactive({
  boardId: props.boardId,
  userSeq: 1, // 임시 세팅
  content: ''
})

// 댓글 목록 조회 API 호출
const fetchComments = async (page = 1) => {
  // 페이지 범위 방어 로직
  if (page < 1 || (pageInfo.totalPages > 0 && page > pageInfo.totalPages)) return;

  try {
    const params = {
      boardId: props.boardId,
      page: page,
      // pageSize는 서버 PageRequest의 기본값(30)을 따름 (필요시 명시 가능)
    }
    const response = await MyAxios.get(`/comment/list`, { params });
    const pageData = response.data;

    comments.value = pageData.content;
    totalElements.value = pageData.totalCount; // 서버 응답에 totalElements가 있다고 가정
    
    pageInfo.page = pageData.page;
    pageInfo.totalPages = pageData.totalPages;
    pageInfo.isFirst = pageData.first;
    pageInfo.isLast = pageData.last;
  } catch (error) {
    console.error("댓글 로딩 실패:", error)
  }
}

// 댓글 저장 API 호출
const saveComment = async () => {
  if (!newComment.content.trim()) {
    alert("내용을 입력해주세요.")
    return
  }

  try {
    await MyAxios.post('/comment/save', newComment);
    newComment.content = '' // 입력창 초기화
    
    // 댓글 등록 후 최신 댓글을 보기 위해 1페이지로 이동
    await fetchComments(1); 
    alert("댓글이 등록되었습니다.");
  } catch (error) {
    const errorMsg = error.response?.data?.message || "댓글 등록에 실패했습니다."
    alert(errorMsg)
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}`
}

onMounted(() => {
  fetchComments();
})
</script>

<style scoped>
.comment-section {
  max-width: 900px;
  margin: 0 auto;
}
.list-group-item {
  background-color: transparent;
}
.page-link {
  cursor: pointer;
}
</style>