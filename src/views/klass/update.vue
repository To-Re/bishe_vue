<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="班级id" >
            <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="班级名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="$router.back(-1)">取消并返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateKlass, klassDetail } from '@/api/klass'
export default {
    data() {
        return {
            form: {
                id:0,
                name: ''
            }
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.form.id = this.$route.query.id
            klassDetail({
                klass_id:this.form.id,
            }).then(response => {
                this.form.name = response.klass_name
            }).catch(error => {
                this.$message({
                    message: '班级详情获取失败',
                    type: 'warning'
                });
                reject(error)
            })
        },
        onSubmit() {
            updateKlass({
                klass_id:this.form.id,
                klass_name:this.form.name,
            }).then(response => {
                this.$message({
                    message: '班级修改成功',
                    type: 'success'
                });
                this.fetchData()
            }).catch(error => {
                reject(error)
            })
        }
    }
}
</script>