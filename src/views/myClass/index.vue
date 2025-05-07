<template>
  <div class="my-class-page">
    <el-card class="card-container" shadow="always">
      <div class="header">
        <div>
          <div class="title">我的班级：{{ classInfo.name }}</div>
          <div class="subtitle">年级：{{ classInfo.grade }} ｜ 邀请码：{{ classInfo.invite_code }}</div>
        </div>
      </div>

      <el-divider />

      <div class="student-section">
        <div class="section-title">班级学生列表</div>
        <el-table :data="students" border stripe v-loading="loading">
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="username" label="用户名" width="140" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="phoneNumber" label="电话" />
          <el-table-column prop="class_stage" label="年级" width="120" />
          <el-table-column prop="addClassTime" label="加入时间" width="180" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMyClass, getClassStudents } from '@/api/classes' // 你需要准备这两个接口

export default {
  data() {
    return {
      loading: false,
      classInfo: {
        name: '',
        grade: '',
        invite_code: ''
      },
      students: []
    }
  },
  created() {
    getMyClass().then(res => {
      console.log(res)
      res = res.data.classes
      return res
    }).then(data => {
      if (data[0] != null) {
        this.classInfo = data[0]
        getClassStudents(data[0].id).then(res => {
          console.log(res)
          this.students = res.data.students
        })
      }
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.my-class-page {
  padding: 20px;

  .card-container {
    padding: 20px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 20px;
        font-weight: bold;
      }

      .subtitle {
        color: #666;
        margin-top: 5px;
      }
    }

    .student-section {
      margin-top: 20px;

      .section-title {
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: 500;
      }
    }
  }
}
</style>
