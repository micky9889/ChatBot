<template>
  <div class="login-container"  v-loading.FullScreen.lock="loading">
    <h2 class="chatbot-title">Chat-BOT</h2>

    <div class="login-content">
      <h2 class="welcome-text">Welcome</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="Username" prop="username">
          <el-input
             ref="usernameInput"
            v-model="form.username"
            placeholder="Enter your username"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            @keyup.enter="handleLogin"
            placeholder="Enter your password"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="handleLogin"
           
          >
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage, type FormRules } from "element-plus";
import { useRouter } from "vue-router";
import type { FullScreen } from "@element-plus/icons-vue";
import type { FormLogin } from "@/types/formLogin";

const router = useRouter();

const form = ref<FormLogin>({
  username: "",
  password: "",
});

const loading = ref<boolean>(false);
  const usernameInput = ref<any>(null); 

const rules:FormRules = {
  username: [
    { required: true, message: "Username is required", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
  ],
};
onMounted(() => {
  usernameInput.value?.focus(); // focus ที่ input เมื่อ component โหลด
});


const handleLogin = async () => {
  loading.value = true;
  try {
setTimeout(()=>{
    if (form.value.username === "admin" && form.value.password === "admin") {
      ElMessage({
        type: "success",
        message: "Login successful!",
      });
      router.push("/");
      loading.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "Invalid username or password.",
      });
      loading.value = false;
    }
},1000)
  } catch (error) {
    ElMessage({
      type: "error",
      message: "An error occurred. Please try again.",
    });
    loading.value = false;
  } 
};
</script>

<style scoped>
/* "Chat-BOT" อยู่มุมซ้ายบน */
.chatbot-title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
}

/* จัดให้ Welcome และ Form อยู่ตรงกลางจอ */
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* กล่องที่บรรจุ Welcome และ Form */
.login-content {
  text-align: center;
  width: 400px;
}

/* ปรับแต่งข้อความ Welcome */
.welcome-text {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

/* ปุ่ม login */
.login-btn {
  width: 100%;
}
</style>
