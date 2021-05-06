<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="学生id" width="110">
        <template slot-scope="scope">
          {{ scope.row.student_id }}
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.student_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="考试状态" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.student_result_status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分数" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.student_score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="功能" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleStudentPaperDetail(scope.row.student_id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="$router.back(-1)">返回</el-button>
  </div>
</template>

<script>
import { getResultDetail } from '@/api/result'

export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getResultDetail({
        exam_id:this.$route.query.exam_id,
        klass_id:this.$route.query.klass_id
      }).then(response => {
        this.list = response.klass_results
      }).catch(error => {
        this.$message({
          message: '获取信息失败',
          type: 'warning'
        });
        reject(error)
      })
    },
    handleStudentPaperDetail(student_id) {
      this.$router.push({
        path:'/result/paper_detail',
        query:{student_id:student_id, exam_id:this.$route.query.exam_id}
      })
    }
  }
}
</script>
