<template>
  <div class="assignment-page">
    <el-card shadow="never">
      <div class="toolbar">
        <el-input
          v-model="searchTitle"
          placeholder="搜索作业标题"
          style="width: 250px; margin-bottom: 20px"
          clearable
          @input="handleSearch"
        />
      </div>

      <el-table :data="filteredAssignments" stripe v-loading="loading">
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="course.name" label="所属课程" width="160" />
        <el-table-column prop="teacher" label="发布人" width="160" />
        <el-table-column prop="due_date" label="截止日期" width="180" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="status" label="完成状态" />
        <el-table-column label="操作" fixed="right" width="160">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px; text-align: right">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          :total="total"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { getMyAssignments } from '@/api/assignment'

export default {
  data() {
    return {
      loading: false,
      assignments: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      searchTitle: '',
      filteredAssignments: []
    }
  },
  mounted() {
    this.fetchAssignments()
  },
  methods: {
    fetchAssignments() {
      this.loading = true
      getMyAssignments(this.pageNum, this.pageSize).then(res => {
        const { list, total } = res.data
        this.assignments = list
        this.filteredAssignments = list
        this.total = total
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$message.error('获取作业失败')
      })
    },
    handleSearch() {
      const keyword = this.searchTitle.toLowerCase()
      this.filteredAssignments = this.assignments.filter(a =>
        a.title.toLowerCase().includes(keyword)
      )
    },
    handlePageChange(val) {
      this.pageNum = val
      this.fetchAssignments()
    }
  }
}
</script>
<style scoped lang="scss">
.assignment-page {
  padding: 20px;

  .toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>
