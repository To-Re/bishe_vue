<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="考试id" >
            <el-input v-model="form.exam_id" disabled></el-input>
        </el-form-item>
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
            <el-input v-model="form.paper_id"></el-input>
        </el-form-item>
       
        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="$router.back(-1)">取消并返回</el-button>
        </el-form-item>


        <el-form-item label="tmp">
            <el-input v-model="form.exam_begin_time"></el-input>
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
                exam_id:null,
                exam_name:null,
                exam_begin_time:null,
                exam_end_time:null,
                paper_id:null
            }
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.form.exam_id = this.$route.query.id
        },
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