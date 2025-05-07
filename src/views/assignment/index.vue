<template>
  <div class="assignment-manager">
    <!-- 工具栏 -->
    <el-row :gutter="20" class="toolbar">
      <el-col :span="6">
        <el-select v-model="filter.courseId" clearable placeholder="筛选课程" @change="fetchAssignments">
          <el-option v-for="c in courseList" :key="c.id" :label="c.name" :value="c.id" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">新增作业</el-button>
      </el-col>
    </el-row>

    <!-- 作业表格 -->
    <el-table :data="assignments" border stripe v-loading="loading">
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="course.name" label="所属课程" width="160" />
      <el-table-column prop="due_date" label="截止时间" width="180" />
      <el-table-column prop="teacher.username" label="发布人" width="180" />
      <el-table-column prop="created_at" label="发布时间" width="180" />
      <el-table-column label="操作" width="160" fixed="right">
        <template v-slot="scope">
          <el-button size="mini" type="text" @click="editAssignment(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="deleteAssignment(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 20px; text-align: right;">
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :total="total"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        @current-change="fetchAssignments"
        @size-change="handleSizeChange"
      />
    </div>

    <!-- 新增作业对话框 -->
    <el-dialog title="新增作业" :visible.sync="addDialogVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="所属课程">
          <el-select v-model="form.course_id" placeholder="请选择课程">
            <el-option v-for="c in courseList" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker v-model="form.due_date" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.content" rows="4" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAssignments, createAssignment, deleteAssignment } from '@/api/assignment.js'
import { getCourses } from '@/api/course'
import { getMyClass } from '@/api/classes'
import * as storage from '@/utils/storage'

export default {
  data() {
    return {
      loading: false,
      assignments: [],
      courseList: [],
      classInfo: '',
      filter: {
        courseId: null
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      addDialogVisible: false,
      form: {
        title: '',
        course_id: null,
        content: '',
        due_date: '',
        teacher_id: '',
        class_id: 0
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getMyClass().then(res => {
        res = res.data.classes
        return res
      }).then(data => {
        if (data[0] != null) {
          this.classInfo = data[0]
          console.log(this.classInfo)
          this.form.class_id = this.classInfo.id
        }
      })
      getCourses(1, 100).then(res => {
        this.courseList = res.data.courses || []
      })
      this.fetchAssignments()
    },
    fetchAssignments() {
      this.loading = true
      getAssignments({
        page: this.pageNum,
        pageSize: this.pageSize,
        course_id: this.filter.courseId
      })
        .then(res => {
          this.assignments = res.data.list
          this.total = res.data.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.pageNum = 1
      this.fetchAssignments()
    },
    submitAdd() {
      const userinfo = storage.getItem('userInfo')
      this.form.teacher_id = userinfo.id
      createAssignment(this.form)
        .then(() => {
          this.$message.success('作业创建成功')
          this.addDialogVisible = false
          this.fetchAssignments()
        })
        .catch(() => {
          this.$message.error('创建失败')
        })
    },
    editAssignment(row) {
      this.$message.info(`编辑功能待实现：${row.title}`)
    },
    deleteAssignment(row) {
      this.$confirm(`确认删除作业「${row.title}」？`, '提示', {
        type: 'warning'
      }).then(() => {
        deleteAssignment(row.id)
          .then(() => {
            this.$message.success('删除成功')
            this.fetchAssignments()
          })
          .catch(() => {
            this.$message.error('删除失败')
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.assignment-manager {
  padding: 20px;

  .toolbar {
    margin-bottom: 20px;
  }
}
</style>
