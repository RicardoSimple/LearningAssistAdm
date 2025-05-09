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

    <!-- 提交记录标题 -->
    <h3 style="margin: 30px 0 10px;">作业提交记录</h3>

    <el-table :data="submissions" border stripe v-loading="loadingSubmissions">
      <el-table-column prop="student_name" label="学生姓名" width="150" />
      <el-table-column prop="title" label="提交标题" width="180" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="submitted_at" label="提交时间" width="180" />
      <el-table-column label="批改状态/时间" width="180" >
        <template v-slot="scope">
        {{scope.reviewed_at>scope.submitted_at? reviewed_at : '未批改' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template v-slot="scope">
          <el-button size="mini" type="text" @click="evaluateEvent(scope.row)">批改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 20px; text-align: right;">
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :total="subTotal"
        :current-page.sync="subPageNum"
        :page-size.sync="subPageSize"
        :page-sizes="[5, 10, 20]"
        @current-change="fetchSubmissions"
        @size-change="fetchSubmissions"
      />
    </div>

    <el-dialog title="作业详情" :visible.sync="showSubmission">
      <el-card>
        <div v-html="currentAssignment.content"></div>
      </el-card>
      <el-divider content-position="left">提交内容</el-divider>
      <el-card>
        <div v-html="currentSubmission.title"></div>
      </el-card>
      <el-card>
        <div v-html="currentSubmission.content"></div>
      </el-card>
      <el-divider content-position="left">批改部分</el-divider>
      <el-card>
        <el-form :model="evaluateSubmissionForm" label-width="100px">
          <el-form-item label="分数">
            <el-input-number :precision="2" :step="0.1" :max="10" v-model="evaluateSubmissionForm.score"/>
            <el-tooltip class="item" effect="dark" content="AI自动评估作业质量并给出分数和评价" placement="right-start">
            <el-button class="evaluate_smart_button" @click="smartEvaluteEvent">智能批改</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="评价">
            <el-input type="textarea" v-model="evaluateSubmissionForm.feedback" rows="4" />
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSubmission = false">取 消</el-button>
        <el-button type="primary" @click="evaluateSubmit">确 定</el-button>
      </div>
    </el-dialog>
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
          <article-editor :getHtml="getHtml"
                          :getTitle="getTitle"
          ></article-editor>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAssignments, createAssignment, deleteAssignment, getSubmissions, evaluateSubmission } from '@/api/assignment.js'
import { getCourses } from '@/api/course'
import { getMyClass } from '@/api/classes'
import * as storage from '@/utils/storage'
import ArticleEditor from '@/components/article-editor.vue'

export default {
  components: { ArticleEditor },
  data() {
    return {
      loading: false,
      assignments: [],
      courseList: [],
      classInfo: '',
      filter: {
        courseId: null,
        assignmentId: 0
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
      },
      submissions: [],
      subPageNum: 1,
      subPageSize: 5,
      subTotal: 0,
      loadingSubmissions: false,
      showSubmission: false,
      currentSubmission: {},
      currentAssignment: {},
      evaluateSubmissionForm: {
        score: 0,
        feedback: '',
        submission_id: ''
      },
      smartEvaluteForm: {
        assignmentId: '',
        submissionId: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getHtml (text) {
      this.form.content = text
    },
    getTitle (title) {
      this.form.title = title
    },
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
      this.fetchSubmissions()
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
    fetchSubmissions() {
      this.loadingSubmissions = true
      // 你可以根据实际接口修改参数名称
      getSubmissions({
        assignment_id: this.filter.assignmentId || null,
        page: this.subPageNum,
        pageSize: this.subPageSize
      })
        .then(res => {
          this.submissions = res.data.list
          this.subTotal = res.data.total
        })
        .finally(() => {
          this.loadingSubmissions = false
        })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.pageNum = 1
      this.fetchAssignments()
    },
    evaluateEvent(sms) {
      this.evaluateSubmissionForm.submission_id = sms.id
      this.currentSubmission = sms
      const asId = sms.assignment_id
      for (let i = 0; i < this.assignments.length; i++) {
        if (this.assignments[i].id === asId) {
          this.currentAssignment = this.assignments[i]
          break
        }
      }
      this.showSubmission = true
    },
    evaluateSubmit() {
      console.log(this.evaluateSubmissionForm)
      evaluateSubmission(this.evaluateSubmissionForm).then(res => {
        if (res && res.code === 200) {
          this.$message.success('批改成功')
          this.showSubmission = false
        }
      })
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
    },
    smartEvaluteEvent() {

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
  .evaluate_smart_button{
    margin: 0px 50px 0px 50px;
  }
}
</style>
