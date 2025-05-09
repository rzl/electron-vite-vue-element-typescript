<template>
  <div class="index-login-box">
    <el-form autoComplete="on" :model="loginForm" ref="loginForm" label-position="left" label-width="0px"
      class="index-login-form">
      <h3 class="title">{{login_title}}</h3>
      <el-form-item prop="username" required inline-message>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户" />
      </el-form-item>
      <el-form-item prop="password" required inline-message>
        <el-input name="password" @keyup.enter="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%;" :loading="loading"
        @click="handleLogin($refs.loginForm as FormInstance)">
        登录
      </el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { configStore } from '@/store/modules/config';
import { userStore } from '@/store/modules/user';
import { FormInstance } from 'element-plus';
import { mapState, mapStores } from 'pinia';
import { defineComponent, ref } from 'vue';
const formRef = ref<FormInstance>()
</script>
<script lang="ts">

export default defineComponent({
  name: 'login',
  components: {
  },
  computed: {
    ...mapStores(configStore),
    ...mapState(configStore, ['login_title']),
    a: () => 'aa'
  },
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loading: false,
    }
  },
  methods: {
    handleLogin(loginForm: any) {
      loginForm?.validate(async (valid: any) => {
        if (valid) {
          try {
            this.loading = true
            await userStore().login(this.loginForm)
            this.$message.success('登录成功')
            this.loading = false
            this.$router.push({ path: '/test/table', query: { login: 1 } })
          } catch (e) {
            console.error(e)
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
})
</script>

<style>
.index-login-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  background: darkseagreen;
}

.index-login-form {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 200px;
  margin: auto;
  width: 400px;
  max-width: 80%;
}
</style>