<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        创建班级
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
    // 得到班级列表
    fetchData() {
      this.listLoading = true
      getKlassList().then(response => {
        this.list = response.klasses
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
        reject(error)
      })
    },
    handleCreate() {
      this.$router.push({path:'/klass/create'})
    },
  }
}
</script>
