<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="elform">
          <h1>Hello</h1>
          <h2>欢迎来到我管理系统</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              :show-password="true"
              v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="default"
              class="login-btn"
              :loading="isLoading"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { Lock, User } from "@element-plus/icons-vue";
  import useUserStore from "@/store/modules/user";
  import { reactive, ref } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { ElNotification } from "element-plus";
  import { getTime } from "@/utils/time";
  //使用小仓库
  let UseStore = useUserStore();
  let $router = useRouter();
  let $route = useRoute();
  //收集账号密码
  let isLoading = ref(false);
  let loginForm = reactive({ username: "admin", password: "111111" });
  let elform = ref();
  let rules = {
    username: [
      {
        trigger: "change",
        validator: validatorUserName,
      },
    ],
    password: [
      {
        trigger: "change",
        validator: validatorPassWord,
      },
    ],
  };
  //自定义校验规则
  function validatorUserName(_rule: any, value: any, callback: any) {
    //rule:校验对象
    //value:输入的值
    //callback:放行,必须调用,若错误,需传递错误信息
    if (/^[a-zA-Z0-9]{5,10}$/.test(value)) {
      //符合则调用回调函数放行
      callback();
    } else {
      //不符合则调用回调函数,传入错误信息
      callback(new Error("账号长度为5-10位字母或数字"));
    }
  }
  function validatorPassWord(_rule: any, value: any, callback: any) {
    //rule:校验对象
    //value:输入的值
    //callback:放行,必须调用,若错误,需传递错误信息
    if (/^[a-zA-Z0-9]{6,10}$/.test(value)) {
      //符合则调用回调函数放行
      callback();
    } else {
      //不符合则调用回调函数,传入错误信息
      callback(new Error("密码长度为6-10位字母或数字"));
    }
  }
  //登录按钮逻辑
  async function login() {
    await elform.value.validate();
    isLoading.value = true;

    //当点击登录按钮以后：
    //使用仓库的方法发送请求,并验证信息
    //请求成功：跳转到首页
    //请求失败：弹出失败信息

    //使用仓库的方法发送请求,验证并返回一个promise对象
    //根据promise对象的状态,决定要进行的操作
    try {
      //保证登陆成功
      await UseStore.userLogin(loginForm);
      //成功后跳转到首页,如果有重定向参数,则跳转到重定向路径,且不可返回
      let redirect: string = $route.query.redirect as string;
      $router.replace({ path: redirect || "/" });
      ElNotification({
        type: "success",
        message: "登陆成功",
        title: `Hi,${getTime()}好`,
      });
      isLoading.value = false;
    } catch (error) {
      //失败后弹出失败信息
      ElNotification({
        type: "error",
        message: (error as Error).message,
      });
      isLoading.value = false;
    }
  }
</script>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    height: 100vh;
    background: url("@/assets/images/background.jpg") no-repeat;
    background-size: cover;
    .login-form {
      position: relative;
      width: 70%;
      top: 30vh;
      background-color: rgb(45, 88, 192, 0.7);
      border-radius: 10px;
      //box-shadow: 0 0 80px;

      padding: 40px;
    }
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }
    .login-btn {
      width: 100%;
    }
  }
</style>
