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
      <el-table-column align="center" label="考试id" width="95">
        <template slot-scope="scope">
          {{ scope.row.exam_id }}
        </template>
      </el-table-column>
      <el-table-column label="考试名称">
        <template slot-scope="scope">
          {{ scope.row.exam_name }}
        </template>
      </el-table-column>

      <el-table-column label="考试开始时间" width="250">
        <template slot-scope="scope">
          <el-date-picker
                v-model="scope.row.exam_begin_time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="timestamp"
                disabled
          >
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column label="考试结束时间" width="250">
        <template slot-scope="scope">
          <el-date-picker
                v-model="scope.row.exam_end_time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间"
                disabled
          >
          </el-date-picker>
        </template>
      </el-table-column>
      

      <el-table-column label="学生得分" width="200">
        <template slot-scope="scope">
          {{ scope.row.exam_student_score }}
        </template>
      </el-table-column>

      <el-table-column label="功能" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleUpdate(scope.row.exam_id)">参加考试</el-button>
          <el-button type="danger" @click="handleExamKlassUpdate(scope.row.exam_id)">作答结果</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudentExamList } from '@/api/exam'

export default {
  data() {
    return {
      list:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getStudentExamList().then(response => {
        this.list = response.exams
        for(let i=0, len = this.list.length;i<len;i++){
          this.list[i].exam_begin_time *= 1000
          this.list[i].exam_end_time *= 1000
        }
      }).catch(error => {
        this.$message({
          message: '个人考试列表失败',
          type: 'warning'
      });
        reject(error)
      })
    }
  }
}
</script>
