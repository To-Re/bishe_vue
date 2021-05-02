<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        创建考卷
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="考卷id" width="95">
        <template slot-scope="scope">
          {{ scope.row.paper_id }}
        </template>
      </el-table-column>
      <el-table-column label="考卷名称">
        <template slot-scope="scope">
          {{ scope.row.paper_name }}
        </template>
      </el-table-column>
      <el-table-column label="考卷分数" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.score_limit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="功能" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleUpdate(scope.row.question_id)">更新</el-button>
          <el-button type="success" @click="handlePaperDetailUpdate(scope.row.question_id)">配置考题</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPaperList } from '@/api/paper'

export default {
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPaperList().then(response => {
        this.list = response.papers
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
        reject(error)
      })
    },
    handleCreate() {
      this.$router.push({path:'/paper/create'})
    },
    handleUpdate(paper_id) {
      this.$router.push({path:'/paper/update', query:{id:paper_id}})
    },
    handlePaperDetailUpdate(paper_id) {
      this.$router.push({path:'/paper/detail_update', query:{id:paper_id}})
    }
  }
}
</script>
