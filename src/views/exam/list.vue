<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        创建考试
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


      <el-table-column label="考试时间" width="450" align="center">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.TimeValue"
            type="datetimerange"
            value-formate="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            disabled
            >
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column label="考卷id" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.paper_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="功能" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleUpdate(scope.row.exam_id)">更新</el-button>
          <el-button type="danger" @click="handleUpdate(scope.row.exam_id)">配置班级</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getExamList } from '@/api/exam'

export default {
  data() {
    return {
      list: [
        {
          TimeValue: null,
        }
      ],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getExamList().then(response => {
        this.list = response.exams
        for(let i=0, len = this.list.length;i<len;i++){
          this.list[i].TimeValue = [this.list[i].exam_begin_time*1000, this.list[i].exam_end_time*1000];
        }
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
        reject(error)
      })
    },
    handleCreate() {
      this.$router.push({path:'/exam/create'})
    },
    handleUpdate(exam_id) {
      this.$router.push({path:'/exam/update', query:{id:exam_id}})
    }
  }
}
</script>
