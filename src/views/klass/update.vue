<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="班级名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createKlass } from '@/api/klass'
export default {
    data() {
        return {
            form: {
                name: ''
            }
        }
    },
    methods: {
        onSubmit() {
            createKlass({
                klass_name:this.form.name,
            }).then(response => {
                this.$message({
                    message: '班级创建成功',
                    type: 'success'
                });
                this.$router.push({path:'/klass/list'})
            }).catch(error => {
                this.listLoading = false
                reject(error)
            })
        }
    }
}
</script>