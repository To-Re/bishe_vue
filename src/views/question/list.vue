<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        创建题目
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
      <el-table-column align="center" label="题目id" width="95">
        <template slot-scope="scope">
          {{ scope.row.question_id }}
        </template>
      </el-table-column>
      <el-table-column label="题目描述">
        <template slot-scope="scope">
          {{ scope.row.question_desc }}
        </template>
      </el-table-column>
      <el-table-column label="题目类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.question_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="功能" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleUpdate(scope.row.klass_id)">详情</el-button>
          <el-button type="danger" @click="handleUpdate(scope.row.klass_id)">更新</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getQuestionList } from '@/api/question'

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
    // 得到班级列表
    fetchData() {
      this.listLoading = true
      getQuestionList().then(response => {
        this.list = response.questions
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
        reject(error)
      })
    },
    handleCreate() {
      this.$router.push({path:'/question/create'})
    },
  }
}
</script>
