<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="考卷id" >
            <el-input v-model="form.paper_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="考卷名称">
            <el-input v-model="form.paper_name"></el-input>
        </el-form-item>
        <el-form-item label="考卷分数">
            <el-input v-model="form.score_limit" disabled></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="$router.back(-1)">取消并返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { paperDetail, updatePaper } from '@/api/paper'
export default {
    data() {
        return {
            form: {
                paper_id:0,
                paper_name: '',
                score_limit:0
            }
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.form.paper_id = this.$route.query.id
            paperDetail({
                paper_id:this.form.paper_id,
            }).then(response => {
                this.form.paper_name = response.paper_name
                this.form.score_limit = response.score_limit
            }).catch(error => {
                this.$message({
                    message: '考卷详情获取失败',
                    type: 'warning'
                });
                reject(error)
            })
        },
        onSubmit() {
            updatePaper(this.form).then(response => {
                this.$message({
                    message: '题目修改成功',
                    type: 'success'
                });
                this.fetchData()
            }).catch(error => {
                this.$message({
                    message: '修改题目失败',
                    type: 'warning'
                });
                reject(error)
            })
        }
    }
}
</script>