<template>
  <div class="app-container">
    <el-form ref="form" :model="exam_form" label-width="120px">
        <el-form-item label="考试名称">
            <el-input v-model="exam_form.exam_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="总分">
            <el-input v-model="exam_form.score_limit" disabled></el-input>
        </el-form-item>
        <el-form-item label="最终得分">
            <el-input v-model="exam_form.student_score" disabled></el-input>
        </el-form-item>
        
        <el-form-item label="考试结束时间">
          <el-date-picker
                v-model="exam_form.exam_end_time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间"
                disabled
          >
          </el-date-picker>
        </el-form-item>
        <el-button type="danger" @click="$router.back(-1)">返回</el-button>
    </el-form>


    <el-form ref="form" :model="question_list" label-width="80px">
        <el-table v-loading="listLoading" :data="question_list" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column label="题目描述">
                <template slot-scope="scope">
                {{ scope.row.question_desc }}
                </template>
            </el-table-column>

            <el-table-column label="选项">
                <template slot-scope="scope">
                    <el-checkbox-group v-model="scope.row.answer_tmp">
                        <el-checkbox label="A" name="type">
                          {{scope.row.option_desc_a}}
                        </el-checkbox> <br/>
                        <el-checkbox label="B" name="type">
                          {{scope.row.option_desc_b}}
                        </el-checkbox> <br/>
                        <el-checkbox label="C" name="type">
                          {{scope.row.option_desc_c}}
                        </el-checkbox> <br/>
                        <el-checkbox label="D" name="type">
                          {{scope.row.option_desc_d}}
                        </el-checkbox>
                    </el-checkbox-group>
                </template>
            </el-table-column>

            
            <el-table-column label="得分" width="100">
                <template slot-scope="scope">
                {{ scope.row.question_student_score }}
                </template>
            </el-table-column>
            <el-table-column label="题目类型" width="100">
                <template slot-scope="scope">
                {{ scope.row.question_type }}
                </template>
            </el-table-column>
            <el-table-column label="单题分数" width="80">
                <template slot-scope="scope">
                {{ scope.row.question_score }}
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    

    <el-button type="success" @click="handleCommit">交卷</el-button>
  </div>
</template>

<script>
import { getStudentExamDetail, commitAnswer } from '@/api/student'

export default {
  data() {
    return {
      exam_form: {
        exam_name:null,
        score_limit:null,
        exam_end_time:null,
        student_score:null,
      },
      question_list:null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getStudentExamDetail({
        exam_id:this.$route.query.id,
      }).then(response => {
        this.question_list = response.questions
        this.exam_form.exam_name = response.exam_name
        this.exam_form.score_limit = response.score_limit
        this.exam_form.exam_end_time = response.exam_end_time*1000
        this.exam_form.student_score = response.student_score

        for(let i=0, len = this.question_list.length;i<len;i++){
          this.$set(this.question_list[i], "answer_tmp", []);
          if (this.question_list[i].student_answer != "") {
            this.$set(this.question_list[i], "answer_tmp", this.question_list[i].student_answer.split(";"));
          }
        }
      }).catch(error => {
        this.$message({
          message: '考试内容获取失败',
          type: 'warning'
        });
        reject(error)
      })
    },
    handleCommit() {
      for(let i=0, len = this.question_list.length;i<len;i++){
        this.question_list[i].student_answer = ""
        this.question_list[i].answer_tmp.sort()
        for(var j = 0, sz = this.question_list[i].answer_tmp.length; j < sz; j++) {
          this.question_list[i].student_answer += this.question_list[i].answer_tmp[j]
          if (j !== sz-1) {
            this.question_list[i].student_answer+=";"
          }
        }
      }
      var student_answer = {
        exam_id:Number(this.$route.query.id),
        question_answers:[],
      }
      for(var i=0, len = this.question_list.length;i<len;i++){
        student_answer.question_answers.push(
          {
            question_id:this.question_list[i].question_id,
            answer:this.question_list[i].student_answer
          }
        )
      }
      commitAnswer(student_answer).then(response => {
        this.$message({
          message: '交卷创建成功',
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
