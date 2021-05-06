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
        <el-button type="success" @click="$router.back(-1)">返回</el-button>
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
                        <el-checkbox label="A" name="type" disabled>
                          {{scope.row.option_desc_a}}
                        </el-checkbox> <br/>
                        <el-checkbox label="B" name="type" disabled>
                          {{scope.row.option_desc_b}}
                        </el-checkbox> <br/>
                        <el-checkbox label="C" name="type" disabled>
                          {{scope.row.option_desc_c}}
                        </el-checkbox> <br/>
                        <el-checkbox label="D" name="type" disabled>
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
  </div>
</template>

<script>
import { getStudentResultPaperDetail } from '@/api/result'

export default {
  data() {
    return {
      exam_form:{
        exam_name:null,
        score_limit:null,
        student_score:null
      },
      question_list: [
        {
          question_desc:"123",
          student_answer:null,
          answer_tmp:['A','C'],
          option_desc_a:"12a",
          option_desc_b:"12b",
          option_desc_c:"1c2",
          option_desc_d:"d12",
          question_student_score:12,
          question_type:"的那选",
          question_score:1,
        }
      ],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getStudentResultPaperDetail({
        student_id:this.$route.query.student_id,
        exam_id:this.$route.query.exam_id,
      }).then(response => {
        this.question_list = response.questions
        this.exam_form.exam_name = response.exam_name
        this.exam_form.score_limit = response.score_limit
        this.exam_form.student_score = response.student_score

        for(let i=0, len = this.question_list.length;i<len;i++){
          this.$set(this.question_list[i], "answer_tmp", []);
          if (this.question_list[i].student_answer != "") {
            this.$set(this.question_list[i], "answer_tmp", this.question_list[i].student_answer.split(";"));
          }
        }
      }).catch(error => {
        this.$message({
          message: '内容获取失败',
          type: 'warning'
        });
        reject(error)
      })
    },
  }
}
</script>
