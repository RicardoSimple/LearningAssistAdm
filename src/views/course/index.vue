<template>
  <div class="course-manager">
    <!-- 查询 + 新增 -->
    <el-row :gutter="20" class="toolbar">
      <el-col :span="6">
        <el-input v-model="search" placeholder="请输入课程名称" clearable @input="filterCourses" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增课程</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-plus" @click="handleSubject">科目管理</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="filteredCourses" border stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="课程名称" width="180" />
      <el-table-column prop="subject" label="科目" width="120" />
      <el-table-column prop="description" label="课程详情" />
      <el-table-column prop="duration" label="时长" width="120" />
      <el-table-column prop="date" label="创建时间" width="180" />
      <el-table-column label="操作" fixed="right" width="160">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增课程" :visible.sync="addWindowVisible">
      <el-form :model="form">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面URL" :label-width="formLabelWidth">
          <el-input v-model="form.cover" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="科目" :label-width="formLabelWidth">
          <el-select multiple  v-model="form.subject_ids" placeholder="请选择活动区域">
            <el-option v-for="item in subjects" :key="item.id" :label=item.name :value=item.id></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程时长" :label-width="formLabelWidth">
          <el-input v-model="form.duration" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addWindowVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="科目管理" :visible.sync="subjectWindowVisible">
      <el-col>
      <el-form :model="subjectForm">
        <el-form-item label="科目名称" label-width="70px">
          <el-input v-model="subjectForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
        <el-col>
          <el-button type="primary" @click="submitAddSubject">增加</el-button>
        </el-col>
      </el-col>

      已有科目：
      <el-tag type="info" class="sub_tag" v-for="item in subjects" :key="item.id">{{item.name}}</el-tag>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subjectWindowVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddSubject;subjectWindowVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCourses, createCourse, getSubjects, createSubject } from '@/api/course'

export default {
  data() {
    return {
      loading: false,
      search: '',
      courseList: [
      ],
      subjects: [{
        id: 1,
        name: '语文'
      },
      {
        id: 2,
        name: '数学'
      }],
      filteredCourses: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      addWindowVisible: false,
      subjectWindowVisible: false,
      form: {
        name: '',
        subject_ids: [],
        description: '',
        cover: '',
        duration: 0,
        date: ''
      },
      formLabelWidth: '200px',
      subjectForm: {
        name: ''
      }
    }
  },
  mounted() {
    this.initCourse()
  },
  methods: {
    filterCourses() {
      const keyword = this.search.toLowerCase()
      this.filteredCourses = this.courseList.filter(c =>
        c.name.toLowerCase().includes(keyword)
      )
    },
    initCourse() {
      getCourses(this.pageNum, this.pageSize).then(res => {
        res = res.data
        this.courseList = res.courses
        this.total = res.total
        this.filteredCourses = this.courseList
      })
      getSubjects().then(res => {
        this.subjects = res.data
      })
    },
    handleAdd() {
      // this.$message.info('点击了新增课程')
      // 可以弹出对话框组件或跳转页面
      this.addWindowVisible = true
    },
    handleSubject() {
      // this.$message.info('点击了新增课程')
      // 可以弹出对话框组件或跳转页面
      this.subjectWindowVisible = true
    },
    submitAdd() {
      createCourse(this.form).then(res => {
        if (res.code && res.code === 200) {
          this.$message.success('添加成功')
        }
        this.initCourse()
        this.addWindowVisible = false
      }).catch(e => {
        this.$message.error(e)
      })
    },
    submitAddSubject() {
      createSubject(this.subjectForm).then(res => {
        if (res.code && res.code === 200) {
          this.$message.success('添加成功')
        }
        this.initCourse()
      }).catch(e => {
        this.$message.error(e)
      })
    },
    handleEdit(course) {
      this.$message.success(`编辑课程：${course.name}`)
    },
    handleDelete(course) {
      this.$confirm(`确认删除课程「${course.name}」？`, '提示', {
        type: 'warning'
      })
        .then(() => {
          this.courseList = this.courseList.filter(c => c.id !== course.id)
          this.filterCourses()
          this.$message.success('已删除')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.course-manager {
  padding: 20px;

  .toolbar {
    margin-bottom: 20px;
  }
}
.sub_tag{
  margin:5px 10px 5px 0
}
</style>
