<template>
  <div class="login__page">
    <div class="login__form">
      <div class="login__head">
        <!-- 不能写相对路径，因为打包后可能变化-->
        <img :src="logo" alt="" class="logo__image" />
        <h1 class="logo__title">动力港能源管理平台</h1>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" @keyup.enter.native="handleLogin">
        <el-form-item prop="username">
          <el-input prefix-icon="User" placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="Lock"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/logo.png';
import type { FormRules, FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/auth.store';
import { useRouter } from 'vue-router';

// 获取表单实例
const ruleFormRef = ref<FormInstance>();

//什么时候用ts
// 变量的定义、函数的定义（参数、返回值）的地方

interface RuleForm {
  username: string;
  password: string;
}

const ruleForm: RuleForm = reactive({
  username: '',
  password: '',
});

// 校验规则
// 参照泛型这一章
// FormRules 泛型1 element-ui的内置类型
// RuleForm 泛型2 自己定义的类型
// 泛型套用泛型
const rules = reactive<FormRules<RuleForm>>({
  // 对应prop，校验字段
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur', // 触发条件
    },
    {
      min: 3,
      max: 5,
      message: '长度应该在3-长度应该在3-5位数字字母组合',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 10,
      message: '长度应该在3-10之间',
      trigger: 'blur',
    },
    {
      pattern: /^\d{6}$/,
      message: '密码必须是6位纯数字',
      trigger: 'blur',
    },
  ],
});

/**
 * 处理登录
 */

const userStore = useUserStore();
const router = useRouter();
function handleLogin() {
  // ?. 可选链操作符
  // 报错：因为ruleFormRef可能为空
  // valid：是否所有表单验证通过了
  ruleFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      await userStore.login(ruleForm); // 使用await解决调用登录接口的异步问题
      router.push('/');
    }
  });
}
</script>
<style lang="less" scoped>
.login__page {
  background-image: url('../assets/bg.png'); // 背景图片
  background-size: cover; // 让图片全屏
  background-position: center; // 位置在中间
  background-repeat: no-repeat; // 不重复
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login__form {
    background-color: #fff;
    width: 400px;
    height: 250px;
    padding: 50px;
    // box-shadow: 0 0 10px #f4f4f4;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    text-align: center;
    // position: absolute;

    .login__head {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      .logo__image {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .logo__title {
        color: rgb(14, 53, 148);
      }
    }
  }
}
</style>
