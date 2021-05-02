<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="考卷id" >
            <el-input v-model="form.paper_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="考卷名称">
            <el-input v-model="form.paper_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="考卷分数">
            <el-input v-model="form.score_limit" disabled></el-input>
        </el-form-item>
    </el-form>

    <el-form ref="form" :model="add_question_form" label-width="80px">
        <el-row>
            <el-col :span="3">
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="AddQuestion">添加考题</el-button>
            </el-col>
            <el-col :span="3">
                <el-input
                    v-model="add_question_form.question_id"
                    placeholder="题目id"
                    type="text"
                    @input="checkPositiveInteger"
                >
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-input
                    v-model="add_question_form.question_score"
                    placeholder="题目分数"
                    type="text"
                    @input="checkPositiveInteger"
                >
                </el-input>
            </el-col>

            <el-col :span="2" :offset="13">
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-col>
        </el-row>
    </el-form>
    

    <el-form ref="form" :model="paper_question_form" label-width="80px">
        <el-table v-loading="listLoading" :data="paper_question_form" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label="题目id" width="95">
                <template slot-scope="scope">
                {{ scope.row.question_id }}
                </template>
            </el-table-column>
            <el-table-column label="题目描述">
                <template slot-scope="scope">
                {{ scope.row.question_desc }}
                </template>
            </el-table-column>
            <el-table-column label="题目类型" width="150">
                <template slot-scope="scope">
                {{ scope.row.question_type }}
                </template>
            </el-table-column>
            <el-table-column label="单题分数" width="150">
                <template slot-scope="scope">
                {{ scope.row.question_score }}
                </template>
            </el-table-column>
            <el-table-column label="功能" width="150" align="center">
                <template slot-scope="scope">
                <el-button type="danger" @click="handleDeleteQuestion(scope.row.question_id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
  </div>
</template>

<script>
import { paperDetail, paperQuestionList, bindPaperQuestion, deletePaperQuestion } from '@/api/paper'
export default {
    data() {
        return {
            form: {
                paper_id:0,
                paper_name: '',
                score_limit:0,
            },

            add_question_form: {
                paper_id:0,
                question_id:'',
                question_score:'',
            },

            paper_question_form: null
        }
    },
    created() {
        this.add_question_form.paper_id = this.$route.query.id
        this.form.paper_id = this.$route.query.id
        this.fetchPaperData()
        this.fetchPaperQuestionData()
    },
    methods: {
        // 刷新页面所需数据
        fetchPaperData() {
            this.form.paper_id = this.$route.query.id
            paperDetail({
                paper_id:this.form.paper_id,
            }).then(response => {
                this.form.paper_name = response.paper_name
                this.form.score_limit = response.score_limit
            }).catch(error => {
                reject(error)
            })
        },
        fetchPaperQuestionData() {
            this.form.paper_id = this.$route.query.id
            paperQuestionList({
                paper_id:this.form.paper_id,
            }).then(response => {
                this.paper_question_form = response.paper_questions
            }).catch(error => {
                reject(error)
            })
        },
        // 添加题目相关
        checkPositiveInteger() {
            var pattern = /^(0|[1-9][0-9]*)$/
            if (!pattern.test(this.add_question_form.question_id)) {
                this.add_question_form.question_id = ''
            }
            if (!pattern.test(this.add_question_form.question_score)) {
                this.add_question_form.question_score = ''
            }
        },
        AddQuestion() {
            this.add_question_form.paper_id = this.$route.query.id
            bindPaperQuestion({
                paper_id: this.add_question_form.paper_id,
                question_id: Number(this.add_question_form.question_id),
                question_score: Number(this.add_question_form.question_score)
            }).then(response => {
                this.fetchPaperData()
                this.fetchPaperQuestionData()
            }).catch(error => {
                reject(error)
            })
        },
        handleDeleteQuestion(qid) {
            this.form.paper_id = this.$route.query.id
            deletePaperQuestion({
                paper_id:this.form.paper_id,
                question_id:qid
            }).then(response => {
                this.fetchPaperData()
                this.fetchPaperQuestionData()
            }).catch(error => {
                reject(error)
            })
        }
    }
}
</script>