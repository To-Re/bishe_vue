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
      <el-table-column align="center" label="班级id" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="班级名">
        <template slot-scope="scope">
          {{ scope.row.klass_name }}
        </template>
      </el-table-column>
      <el-table-column label="老师" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: [
        {"id":1,"klass_name":"nt","teacher_name":"wzy"},
        {"id":2,"klass_name":"sb","teacher_name":"yzw"},
        {"id":3,"klass_name":"sb","teacher_name":"yzw"}
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
      // getList().then(response => {
      //   this.list = response.data.items
        this.listLoading = false
      // })
    }
  }
}
</script>
