<template>
  <div class="app-container">
    <el-form ref="exam_form" :model="exam_form" label-width="100px">
        <el-form-item label="考试id" >
            <el-input v-model="exam_form.exam_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="考试名称">
            <el-input v-model="exam_form.exam_name"></el-input>
        </el-form-item>
        <el-form-item label="考试开始时间">
            <el-date-picker
                v-model="exam_form.exam_begin_time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="timestamp"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item label="考试结束时间">
            <el-date-picker
                v-model="exam_form.exam_end_time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="考卷id">
            <el-input v-model="exam_form.paper_id"></el-input>
        </el-form-item>
       
        <el-form-item>
            <el-button type="primary" @click="handleUpdateKlass">修改</el-button>
            <el-button @click="$router.back(-1)">取消并返回</el-button>
        </el-form-item>
    </el-form>
        
        
    <el-form ref="form" :model="exam_klass_form" label-width="100px">
        <el-row>
            <el-col :span="3">
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleBindExamKlass">添加班级</el-button>
            </el-col>
            <el-col :span="3">
                <el-input
                    v-model="exam_klass_form.klass_id"
                    placeholder="班级id"
                    type="text"
                    @input="checkPositiveInteger"
                >
                </el-input>
            </el-col>
        </el-row>
    </el-form>

    <el-form ref="form" :model="exam_klass_form" label-width="80px">
        <el-table v-loading="listLoading" :data="exam_klass_form" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label="班级id" width="95">
                <template slot-scope="scope">
                {{ scope.row.klass_id }}
                </template>
            </el-table-column>
            <el-table-column label="班级名称">
                <template slot-scope="scope">
                {{ scope.row.klass_name }}
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
import { examDetail, bindExamKlass, examKlassList } from '@/api/exam'
export default {
    data() {
        return {
            exam_form: {
                exam_id:null,
                exam_name:null,
                exam_begin_time:null,
                exam_end_time:null,
                paper_id:null
            },
            exam_klass_form:[],
        }
    },
    created() {
        this.fetchExamData()
        this.fetchExamKlassData()
    },
    methods: {
        fetchExamData() {
            this.exam_form.exam_id = this.$route.query.id
            examDetail({
                exam_id:this.exam_form.exam_id,
            }).then(response => {
                this.exam_form.exam_name = response.exam_name
                this.exam_form.exam_begin_time = response.exam_begin_time*1000
                this.exam_form.exam_end_time = response.exam_end_time*1000
                this.exam_form.paper_id = response.paper_id
            }).catch(error => {
                this.$message({
                    message: '考试详情获取失败',
                    type: 'warning'
                });
                reject(error)
            })
        },
        fetchExamKlassData(){
            examKlassList({
                exam_id:this.$route.query.id
            }).then(response => {
                this.exam_klass_form = response.klasses
            }).catch(error => {
                this.$message({
                    message: '考试班级详情获取失败',
                    type: 'warning'
                });
                reject(error)
            })
        },
        checkPositiveInteger() {
            var pattern = /^(0|[1-9][0-9]*)$/
            if (!pattern.test(this.exam_klass_form.klass_id)) {
                this.exam_klass_form.klass_id = ''
            }
        },
        handleBindExamKlass() {
            this.exam_form.exam_id = this.$route.query.id
            
        }
    }
}
</script>