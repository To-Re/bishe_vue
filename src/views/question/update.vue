<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="题目id" >
            <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="题目描述">
            <el-input v-model="form.question_desc"></el-input>
        </el-form-item>
        <el-form-item label="选项A描述">
            <el-input v-model="form.option_desc_a"></el-input>
        </el-form-item>
        <el-form-item label="选项B描述">
            <el-input v-model="form.option_desc_b"></el-input>
        </el-form-item>
        <el-form-item label="选项C描述">
            <el-input v-model="form.option_desc_c"></el-input>
        </el-form-item>
        <el-form-item label="选项D描述">
            <el-input v-model="form.option_desc_d"></el-input>
        </el-form-item>

        <el-form-item label="题目类型">
            <el-radio v-model="form.question_type" :label="1">单选题</el-radio>
            <el-radio v-model="form.question_type" :label="2">多选题</el-radio>
        </el-form-item>

        <el-form-item label="答案">
            <el-checkbox-group v-model="answer_tmp">
                <el-checkbox label="A" name="type"></el-checkbox>
                <el-checkbox label="B" name="type"></el-checkbox>
                <el-checkbox label="C" name="type"></el-checkbox>
                <el-checkbox label="D" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="$router.back(-1)">取消并返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { questionDetail } from '@/api/question'
export default {
    data() {
        return {
            answer_tmp: [],
            form: {
                id:0,
                question_desc: '',
                question_answer:"",
                question_type:1,
                option_desc_a:"",
                option_desc_b:"",
                option_desc_c:"",
                option_desc_d:""
            }
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.form.id = this.$route.query.id
            questionDetail({
                question_id:this.form.id,
            }).then(response => {
                this.form.question_desc = response.question_desc
                this.form.question_answer = response.question_answer
                this.form.question_type = response.question_type
                this.form.option_desc_a = response.option_desc_a
                this.form.option_desc_b = response.option_desc_b
                this.form.option_desc_c = response.option_desc_c
                this.form.option_desc_d = response.option_desc_d
                this.answer_tmp = this.form.question_answer.split(";")
            }).catch(error => {
                this.$message({
                    message: '题目详情获取失败',
                    type: 'warning'
                });
                reject(error)
            })
        },
        onSubmit() {
        }
    }
}
</script>