<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="考卷名称">
            <el-input v-model="form.paper_name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="$router.back(-1)">取消并返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createPaper } from '@/api/paper'
export default {
    data() {
        return {
            form: {
                paper_name: '',
            }
        }
    },
    methods: {
        onSubmit() {
            createPaper(this.form).then(response => {
                this.$message({
                    message: '题目创建成功',
                    type: 'success'
                });
                this.$router.push({path:'/paper/list'})
            }).catch(error => {
                reject(error)
            })
        }
    }
}
</script>