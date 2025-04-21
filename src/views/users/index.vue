<template>
  <div class="user-manager">
    <!-- 顶部筛选区 -->
    <el-row :gutter="20" class="toolbar">
      <el-col :span="4">
        <el-input v-model="filter.username" placeholder="输入用户名" clearable @input="filterUsers" />
      </el-col>
      <el-col :span="4">
        <el-select v-model="filter.userType" placeholder="用户类型" clearable @change="filterUsers">
          <el-option label="学生" value="student" />
          <el-option label="教师" value="teacher" />
          <el-option label="管理员" value="admin" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格列表 -->
    <el-table :data="filteredUsers" border stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="username" label="用户名" width="140" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phoneNumber" label="电话" />
      <el-table-column prop="userType" label="类型" width="100">
        <template slot-scope="scope">
              <el-tag size="large" type="info">{{ formatUserType(scope.row.userType) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="class_stage" label="年级" width="120" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column prop="createdAt" label="注册时间" width="180" />
      <el-table-column prop="lastLogin" label="最近在线时间" width="180" />
      <el-table-column label="操作" width="160" fixed="right">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUsers } from '@/api/users'

export default {
  data() {
    return {
      loading: false,
      filter: {
        username: '',
        userType: ''
      },
      userList: [
      ],
      filteredUsers: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      addWindowVisible: false
    }
  },
  mounted() {
    this.initUsers()
  },
  methods: {
    formatUserType(type) {
      switch (type) {
        case 'student': return '学生'
        case 'teacher': return '教师'
        case 'admin': return '管理员'
        default: return '未知'
      }
    },
    initUsers() {
      getUsers(this.pageNum, this.pageSize).then(res => {
        res = res.data
        console.log(res.list)
        this.userList = res.list
        this.total = res.total
        this.filteredUsers = this.userList
      })
    },
    filterUsers() {
      const { username, userType } = this.filter
      this.filteredUsers = this.userList.filter(user => {
        const matchName = !username || user.username.includes(username)
        const matchType = !userType || user.userType === userType
        return matchName && matchType
      })
    },
    handleAdd() {
      this.$message.info('点击了新增用户')
    },
    handleEdit(user) {
      this.$message.success(`编辑用户：${user.name}`)
    },
    handleDelete(user) {
      this.$confirm(`确认删除用户「${user.name}」？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.userList = this.userList.filter(u => u.id !== user.id)
        this.filterUsers()
        this.$message.success('已删除')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.user-manager {
  padding: 20px;

  .toolbar {
    margin-bottom: 20px;
  }
}
</style>
