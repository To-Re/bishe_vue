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
      

      <el-table-column label="班级id" width="100">
        <template slot-scope="scope">
          {{ scope.row.klass_id }}
        </template>
      </el-table-column>
      <el-table-column label="班级名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.klass_name }}
        </template>
      </el-table-column>

      <el-table-column label="功能" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleResultDetail(scope.row.exam_id, scope.row.klass_id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getResultList } from '@/api/result'

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
      getResultList().then(response => {
        this.list = response.results
        for(let i=0, len = this.list.length;i<len;i++){
          this.list[i].exam_begin_time *= 1000
          this.list[i].exam_end_time *= 1000
        }
      }).catch(error => {
        this.$message({
          message: '获取考试结束列表失败',
          type: 'warning'
        });
        reject(error)
      })
    },
    handleResultDetail(exam_id, klass_id) {
      this.$router.push({path:'/result/detail', query:{exam_id:exam_id, klass_id:klass_id}})
    }
  }
}
</script>
