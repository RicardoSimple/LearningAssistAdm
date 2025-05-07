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
          <el-button type="text" size="small" @click="handleBindUser(scope.row)">绑定班级</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控件 -->
    <div style="margin-top: 20px; text-align: right;">
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="pageNum"
        :page-sizes="[5, 15, 10, 20, 50]"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <el-dialog title="新增用户" :visible.sync="addWindowVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth">
          <el-select  v-model="form.user_type" placeholder="请选择用户类型">
            <el-option v-for="item in usertypes" :key="item.name" :label=item.name :value=item.value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课堂邀请码" :label-width="formLabelWidth">
          <el-input v-model="form.class_num" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addWindowVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="绑定班级" :visible.sync="bindUserWindow">
      <el-form :model="bindUserForm">
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select  v-model="bindUserForm.classId" placeholder="请选择班级">
            <el-option v-for="i in classList" :key="i.id" :label= i.name :value=i.id></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bindUserWindow = false">取 消</el-button>
        <el-button type="primary" @click="submitBind">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createUser, getUsers } from '@/api/users'
import { bindUserClass, getAllClass } from '@/api/classes'

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
      addWindowVisible: false,
      form: {
        name: '',
        username: '',
        phone: '',
        email: '',
        class_num: '',
        user_type: ''
      },
      formLabelWidth: '200px',
      usertypes: [
        {
          name: '学生',
          value: 'student'
        },
        {
          name: '老师',
          value: 'teacher'
        },
        {
          name: '管理员',
          value: 'admin'
        }
      ],
      bindUserWindow: false,
      bindUserForm: {
        userId: '',
        classId: ''
      },
      classList: []
    }
  },
  mounted() {
    this.initData()
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
    initData() {
      getUsers(this.pageNum, this.pageSize).then(res => {
        res = res.data
        console.log(res.list)
        this.userList = res.list
        this.total = res.total
        this.filteredUsers = this.userList
      })
      getAllClass().then(res => {
        this.classList = res.data
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
      this.addWindowVisible = true
    },
    submitAdd() {
      createUser(this.form).then(res => {
        if (res.code && res.code === 200) {
          this.$message.success('添加成功')
        }
        this.initData()
        this.addWindowVisible = false
      }).catch(e => {
        this.$message.error(e)
      })
    },
    submitBind() {
      bindUserClass(this.bindUserForm).then(res => {
        if (res.code && res.code === 200) {
          this.$message.success('绑定成功')
        }
        this.initData()
        this.bindUserWindow = false
      }).catch(e => {
        this.$message.error(e)
      })
    },
    handleEdit(user) {
      this.$message.success(`编辑用户：${user.name}`)
    },
    handleBindUser(user) {
      this.bindUserForm.userId = user.ID
      this.bindUserWindow = true
    },
    handleDelete(user) {
      this.$confirm(`确认删除用户「${user.name}」？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.userList = this.userList.filter(u => u.id !== user.id)
        this.filterUsers()
        this.$message.success('已删除')
      }).catch(() => {})
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.pageNum = 1
      this.initData()
    },

    handlePageChange(newPage) {
      this.pageNum = newPage
      this.initData()
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
