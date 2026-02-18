<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>게시글 목록</h2>
      <button class="btn btn-primary" @click="goToWrite">글쓰기</button>
    </div>

    <table class="table table-hover shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th style="width: 40%">제목</th>
          <th>작성자</th>
          <th>조회수</th>
          <th>등록일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in boardList" :key="board.boardId" @click="goToDetail(board.boardId)" style="cursor: pointer">
          <td>{{ board.boardId }}</td>
          <td class="text-start">{{ board.title }}</td>
          <td>{{ board.userName }}</td>
          <td><span class="badge bg-secondary">{{ board.viewCount }}</span></td>
          <td>{{ formatDate(board.createdAt) }}</td>
        </tr>
        <tr v-if="boardList.length === 0">
          <td colspan="5" class="text-center py-5">게시글이 없습니다.</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <nav aria-label="Page navigation" class="mb-5">
        <ul class="pagination justify-content-center align-items-center">
          <li class="page-item" :class="{ disabled: pageInfo.isFirst }">
            <a class="page-link border-0" href="#" @click.prevent="changePage(1)" title="첫 페이지로">
              <i class="bi bi-chevron-double-left"></i>
            </a>
          </li>

          <li class="page-item" :class="{ disabled: pageInfo.isFirst }">
            <a class="page-link border-0" href="#" @click.prevent="changePage(pageInfo.page - 1)">
              <i class="bi bi-chevron-left"></i>
            </a>
          </li>

          <li class="mx-4">
            <span class="fw-bold fs-5 text-primary">{{ pageInfo.page }}</span>
            <span class="text-muted mx-2">/</span>
            <span class="text-muted">{{ pageInfo.totalPages }}</span>
          </li>

          <li class="page-item" :class="{ disabled: pageInfo.isLast }">
            <a class="page-link border-0" href="#" @click.prevent="changePage(pageInfo.page + 1)">
              <i class="bi bi-chevron-right"></i>
            </a>
          </li>

          <li class="page-item" :class="{ disabled: pageInfo.isLast }">
            <a class="page-link border-0" href="#" @click.prevent="changePage(pageInfo.totalPages)" title="마지막 페이지로">
              <i class="bi bi-chevron-double-right"></i>
            </a>
          </li>
        </ul>
      </nav>

    <!-- 검색조건 -->
    <div class="card bg-light border-0 shadow-sm mb-5">
      <div class="card-body py-4">
        <form @submit.prevent="fetchBoards()" class="row g-3 justify-content-center">
          <div class="col-lg-4 col-md-6">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-white">기간</span>
              <input type="date" v-model="searchParams.startDate" class="form-control">
              <span class="input-group-text bg-white">~</span>
              <input type="date" v-model="searchParams.endDate" class="form-control">
            </div>
          </div>

          <div class="col-lg-5 col-md-6">
            <div class="input-group input-group-sm">
              <select v-model="searchParams.searchType" class="form-select" style="max-width: 100px;">
                <option value="title">제목</option>
                <option value="userName">작성자</option>
              </select>
              <input 
                type="text" 
                v-model="searchParams.searchText" 
                class="form-control" 
                placeholder="검색어를 입력해 주세요"
              >
              <button class="btn btn-dark" type="submit">
                <i class="bi bi-search me-1"></i> 검색
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal -->
    <BoardSaveModal 
      ref="saveModalRef" 
      mode="SAVE" 
      @refresh="fetchBoards" 
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MyAxios from '@/api/axios';
import BoardSaveModal from '@/components/board/BoardSaveModal.vue';

const boardList = ref([]);
const saveModalRef = ref(null);
const pageInfo = reactive({
  page: 1,
  totalPages: 1,
  isFirst: true,
  isLast: true
})

const router = useRouter();

// 검색 파라미터 상태 관리
const searchParams = reactive({
  startDate: '',
  endDate: '',
  searchType: 'title',
  searchText: ''
})

// router 이동 
const goToDetail = (id) => {
  router.push(`/board/${id}`);
};

// 데이터 불러오기
const fetchBoards = async (page = 1) => {
  try {
    const params = {
      ...searchParams,
      page : page,
    }

    console.log("boardList 조회 parameter: ", params);

    const response = await MyAxios.get('/board/list', { params })
    const pageData = response.data;

    boardList.value = pageData.content;
    pageInfo.page = pageData.page;
    pageInfo.totalPages = pageData.totalPages;
    pageInfo.isFirst = pageData.first;
    pageInfo.isLast = pageData.last;
  } catch (error) {
    console.error("데이터 로딩 실패:", error)
  }
}

const changePage = (page) => {
  if (page < 1 || page > pageInfo.totalPages) return
  fetchBoards(page)
}

// 날짜 포맷 (간단 버전)
const formatDate = (dateString) => {
  if (!dateString) return ''

  if (dateString.includes('-')) {
    return dateString.substring(0, 11);
  }

  return dateString;
}

const goToWrite = () => {
if (saveModalRef.value) {
    saveModalRef.value.show()
  }
};

onMounted(() => {
  fetchBoards()
})
</script>