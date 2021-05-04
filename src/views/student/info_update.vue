<template>
  <div class="app-container">
    <el-form ref="student_info_form" :model="student_info_form" label-width="80px">
        <el-form-item label="学生id" >
            <el-input v-model="student_info_form.student_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="student_info_form.student_name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
            <el-input v-model="student_info_form.student_number" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="student_info_form.password"></el-input>
        </el-form-item>
        <el-form-item label="班级id">
            <el-input v-model="student_info_form.klass_id"></el-input>
        </el-form-item>
        <el-form-item label="班级名称">
            <el-input v-model="student_info_form.klass_name" disabled></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="$router.back(-1)">取消并返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { studentInfoDetail, updateStudentInfo } from '@/api/student'
export default {
    data() {
        return {
            student_info_form: null,
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            studentInfoDetail().then(response => {
                this.student_info_form = response
            }).catch(error => {
                this.$message({
                    message: '个人信息获取失败',
                    type: 'warning'
                });
                reject(error)
            })
        },
        onSubmit() {
            updateStudentInfo({
                student_name: this.student_info_form.student_name,
                password:this.student_info_form.password,
                klass_id:Number(this.student_info_form.klass_id)
            }).then(response => {
                this.fetchData()
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            }).catch(error => {
                this.$message({
                    message: '修改失败',
                    type: 'warning'
                });
                reject(error)
            })
        }
    }
}
</script>