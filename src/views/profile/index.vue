<template>
  <el-card class="user-center-card">
    <div class="avatar-container">
      <el-upload
        class="avatar-uploader"
        action="your-upload-url"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="avatarUrl"
          :src="userInfo.avatar"
          class="avatar"
          @click="showDialog = true"
        />
        <i
          v-else
          class="el-icon-plus avatar-icon"
          @click="showDialog = true"
        ></i>
      </el-upload>
    </div>

    <div class="role-container block-container">
      <h2>{{ userRoleLabel(userInfo.roles) }}</h2>
    </div>

    <div class="register-time-container block-container">
      <span>注册时间：{{ userInfo.createTime | dateFmt }}</span>
    </div>
    <EditableField
      class="block-container"
      label="手机"
      :value="phone"
      :editing="editingPhone"
      @update="updatePhone"
      @click="togglePhoneEdit"
    />

    <EditableField
      class="block-container"
      label="邮箱"
      :value="email"
      :editing="editingEmail"
      @update="updateEmail"
      @click="toggleEmailEdit"
    />

    <div class="change-password-container block-container">
      <el-button
        type="primary"
        @click="showPasswordDialog = true"
        >修改密码</el-button
      >
      <el-dialog
        title="修改密码"
        :visible.sync="showPasswordDialog"
        width="50%"
        @close="showPasswordDialog = false"
      >
        <el-form
          :model="passwordForm"
          label-width="120px"
        >
          <el-form-item label="旧密码">
            <el-input
              type="password"
              v-model="passwordForm.oldPassword"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              type="password"
              v-model="passwordForm.newPassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="changePassword"
              >确认</el-button
            >
            <el-button @click="showPasswordDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import EditableField from '@/components/EditableField.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      avatarUrl: 'path/to/default/avatar.jpg',
      showDialog: false,
      phone: '12345678901',
      email: 'user@example.com',
      editingPhone: false,
      newPhone: '',
      editingEmail: false,
      newEmail: '',
      showPasswordDialog: false,
      passwordForm: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },
  methods: {
    userRoleLabel(roles) {
      return roles === String(['admin']) ? '超级管理员' : '普通用户'
    },
    beforeAvatarUpload(file) {
      // 在这里可以进行文件类型、大小等的校验
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(response, file, fileList) {
      // 处理上传成功后的逻辑，比如更新头像的URL
      this.avatarUrl = response.url // 假设服务器返回了头像的URL
    },
    togglePhoneEdit() {
      // console.log(this.editingPhone)
      this.editingPhone = !this.editingPhone
    },
    updatePhone(value) {
      // 调用后端API更新手机号
      // 这里只是一个示例，你需要根据实际情况进行请求
      this.$message.success('手机号更新成功' + value)
    },

    toggleEmailEdit() {
      this.editingEmail = !this.editingEmail
    },
    updateEmail(value) {
      // 调用后端API更新手机号
      // 这里只是一个示例，你需要根据实际情况进行请求
      this.$message.success('新邮箱账号：' + value)
    },
    changePassword() {
      // 调用后端API验证旧密码并更新新密码
      // 这里只是一个示例，你需要根据实际情况进行请求
      if (this.passwordForm.oldPassword === 'old_password_placeholder') {
        // 假设的旧密码
        this.$message.success('密码更新成功')
        this.showPasswordDialog = false
        // 你可以在这里清空表单
        this.passwordForm.oldPassword = ''
        this.passwordForm.newPassword = ''
      } else {
        this.$message.error('旧密码错误')
      }
    }
  },
  components: {
    EditableField
  }
}
</script>

<style lang="scss" scoped>
.user-center-card {
  margin: 0 auto;
  padding: 20px;
  .user-center-card {
    margin: 20px;
  }

  .avatar-container {
    text-align: center;
    margin-bottom: 20px;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader {
      display: flex;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid #eee;
      object-fit: cover;
      padding: 10px;
      cursor: pointer;
    }

    .avatar-icon {
      font-size: 24px;
      color: #999;
      cursor: pointer;
    }
  }

  .block-container {
    margin-bottom: 20px;
  }
}
</style>
