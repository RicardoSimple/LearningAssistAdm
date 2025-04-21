<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">Login Form</h2>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        class="login-form-wrapper"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="Username"
            prefix-icon="el-icon-user"
            class="login-input"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="Password"
            prefix-icon="el-icon-lock"
            show-password
            class="login-input"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            type="primary"
            class="login-button"
            @click="handleLogin"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/users'
// import * as storage from '@/utils/storage'

export default {
  data() {
    return {
      isLoading: false,
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.isLoading = true
          await this.$store.dispatch('user/login', this.loginForm)
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 500,
            onClose: () => {
              this.$router.push('/')
              this.isLoading = false
            }
          })
        } else {
          this.isLoading = false
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-color: #2b3a4e;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 430px;
  border: none;
  padding: 20px;
  background-color: #2b3a4e;
  border-radius: 5px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
}

.login-form-wrapper {
  text-align: left;
}

.login-input ::v-deep input {
  width: 100%;
  height: 50px;
  background-color: #273140;
  border: 1px solid #2c3949;
  color: #fff;
}

.login-button {
  width: 100%;
  height: 40px;
  margin-top: 10px;
}
</style>
