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
          {{ scope.row.klass_id }}
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
import { getKlassList } from '@/api/klass'

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
      getKlassList().then(response => {
        this.list = response.klasses
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
        reject(error)
      })
    }
  }
}
</script>
