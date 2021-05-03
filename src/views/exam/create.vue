<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="考试名称">
            <el-input v-model="form.exam_name"></el-input>
        </el-form-item>
        <el-form-item label="考试开始时间">
            <el-date-picker
                v-model="form.exam_begin_time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="timestamp"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item label="考试结束时间">
            <el-date-picker
                v-model="form.exam_end_time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="考卷id">
            <el-input v-model="form.paper_id" @input="checkPositiveInteger"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="$router.back(-1)">取消并返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createExam } from '@/api/exam'
export default {
    data() {
        return {
            form: {
                exam_name:null,
                exam_begin_time:null,
                exam_end_time:null,
                paper_id:null
            }
        }
    },
    methods: {
        onSubmit() {
            createExam({
                exam_name:          this.form.exam_name,
                exam_begin_time:    this.form.exam_begin_time/1000,
                exam_end_time:      this.form.exam_end_time/1000,
                paper_id:           Number(this.form.paper_id),
            }).then(response => {
                this.$message({
                    message: '考试创建成功',
                    type: 'success'
                });
                this.$router.push({path:'/exam/list'})
            }).catch(error => {
                this.listLoading = false
                reject(error)
            })
        },
        checkPositiveInteger() {
            var pattern = /^(0|[1-9][0-9]*)$/
            if (!pattern.test(this.form.paper_id)) {
                this.form.paper_id = ''
            }
        }
    }
}
</script>