<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
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
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="$router.back(-1)">取消并返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createQuestion } from '@/api/question'
export default {
    data() {
        return {
            answer_tmp: [],
            form: {
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
    methods: {
        onSubmit() {
            this.form.question_answer = ""
            this.answer_tmp.sort()
            for(var i=0,len=this.answer_tmp.length;i<len;i++){
                this.form.question_answer += this.answer_tmp[i]
                if (i !== len-1) {
                    this.form.question_answer+=";"
                }
            }

            createQuestion(this.form).then(response => {
                this.$message({
                    message: '题目创建成功',
                    type: 'success'
                });
                this.$router.push({path:'/question/list'})
            }).catch(error => {
                reject(error)
            })
        }
    }
}
</script>