<template>
  <div class="class-manager">
    <!-- 顶部工具栏 -->
    <el-row :gutter="20" class="toolbar">
      <el-col :span="4">
        <el-select v-model="filter.stage" placeholder="选择年级" clearable @change="filterClasses">
          <el-option
            v-for="item in classStages"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input v-model="filter.keyword" placeholder="请输入班级名称" clearable @input="filterClasses" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增班级</el-button>
      </el-col>
    </el-row>

    <!-- 班级列表 -->
    <el-table :data="filteredClasses" border stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="班级名称" width="180" />
      <el-table-column prop="grade" label="年级" width="120" />
      <el-table-column prop="invite_code" label="邀请码" width="140" />
      <el-table-column prop="created_at" label="创建时间" width="180" />
      <el-table-column label="操作" fixed="right" width="160">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleBind(scope.row)">绑定教师</el-button>
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

    <el-dialog title="新增班级" :visible.sync="addWindowVisible">
      <el-form :model="form">
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级" :label-width="formLabelWidth">
          <el-select  v-model="form.grade" placeholder="请选择年级">
            <el-option v-for="i in classStages" :key="i" :label= i :value=i></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addWindowVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="绑定教师" :visible.sync="bindWindowVisible">
      <el-form :model="bindForm">
        <el-form-item label="教师" :label-width="formLabelWidth">
          <el-select  v-model="bindForm.teacherId" placeholder="请选择教师">
            <el-option v-for="i in teacherList" :key="i.ID" :label= i.username :value=i.ID></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bindWindowVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBind">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getClasses, createClass, deleteClass, bindClass } from '@/api/classes'
import { getUsersByType } from '@/api/users'

export default {
  data() {
    return {
      loading: false,
      classStages: [
        '一年级', '二年级', '三年级', '四年级', '五年级', '六年级',
        '初一', '初二', '初三',
        '高一', '高二', '高三',
        '大一', '大二', '大三', '大四',
        '研究生'
      ],
      filter: {
        stage: '',
        keyword: ''
      },
      classList: [
        {
          id: 1,
          name: '三年级一班',
          stage: '三年级',
          inviteCode: 'ABC123',
          createdAt: '2025-04-21 18:00:00'
        },
        {
          id: 2,
          name: '初二二班',
          stage: '初二',
          inviteCode: 'XYZ789',
          createdAt: '2025-04-20 14:30:00'
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      addWindowVisible: false,
      bindWindowVisible: false,
      filteredClasses: [],
      form: {
        name: '',
        grade: ''
      },
      teacherList: [],
      bindForm: {
        classId: '',
        teacherId: ''
      },
      formLabelWidth: '200px'
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    filterClasses() {
      const { stage, keyword } = this.filter
      this.filteredClasses = this.classList.filter(c => {
        const matchStage = !stage || c.stage === stage
        const matchKeyword = !keyword || c.name.includes(keyword)
        return matchStage && matchKeyword
      })
    },
    initData() {
      getClasses(this.pageNum, this.pageSize).then(res => {
        res = res.data
        this.classList = res.list
        this.total = res.total
        this.filteredClasses = this.classList
      })
      getUsersByType('teacher').then(res => {
        this.teacherList = res.data
        console.log(res.data)
      })
    },
    handleAdd() {
      this.addWindowVisible = true
    },
    submitAdd() {
      createClass(this.form).then(res => {
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
      console.log(this.bindForm)
      bindClass(this.bindForm).then(res => {
        if (res.code && res.code === 200) {
          this.$message.success('绑定成功')
        }
        this.initData()
        this.bindWindowVisible = false
      }).catch(e => {
        this.$message.error(e)
      })
    },
    handleEdit(cls) {
      this.$message.success(`编辑班级：${cls.name}`)
    },
    handleBind(cls) {
      this.bindForm.classId = cls.id
      this.bindWindowVisible = true
    },
    handleDelete(cls) {
      this.$confirm(`确认删除班级「${cls.name}」？`, '提示', {
        type: 'warning'
      })
        .then(() => {
          deleteClass(cls.id).then(res => {
            if (res.code && res.code === 200) {
              this.$message.success('删除成功')
            }
            this.classList = this.classList.filter(c => c.id !== cls.id)
            this.filterClasses()
          })
        })
        .catch(() => {})
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
.class-manager {
  padding: 20px;

  .toolbar {
    margin-bottom: 20px;
  }
}
</style>
