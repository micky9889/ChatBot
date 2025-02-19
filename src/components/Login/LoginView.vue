<template>
  <div class="login-container" v-loading.FullScreen.lock="loading">
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
          <el-button type="primary" class="login-btn" @click="handleLogin">
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
import type { FormLogin } from "@/types/formLogin";

const router = useRouter();

const form = ref<FormLogin>({
  username: "",
  password: "",
});

const loading = ref<boolean>(false);
const usernameInput = ref<any>(null);

const rules: FormRules = {
  username: [{ required: true, message: "Username is required", trigger: "blur" }],
  password: [{ required: true, message: "Password is required", trigger: "blur" }],
};

onMounted(() => {
  setTimeout(() => {
    usernameInput.value?.focus(); // focus ที่ input เมื่อ component โหลด
  }, 500);
});

const handleLogin = async () => {
  loading.value = true;
  setTimeout(() => {
    if (form.value.username === "admin" && form.value.password === "admin") {
      ElMessage({ type: "success", message: "Login successful!" });
      router.push("/");
    } else {
      ElMessage({ type: "error", message: "Invalid username or password." });
    }
    loading.value = false;
  }, 1000);
};
</script>

<style scoped>
/* พื้นหลังแบบ Gradient */
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #2c2c2c, #1a1a1a); /* ปรับพื้นหลังให้เข้มขึ้น */
  animation: fadeIn 1.2s ease-in-out;
}

/* Animation เมื่อเปิดหน้า */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ข้อความ Chat-BOT */
.chatbot-title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff; /* ปรับให้เป็นสีขาว */
}

/* กล่องฟอร์ม */
.login-content {
  background: rgba(255, 255, 255, 0.1); /* ทำให้กล่องฟอร์มมีความโปร่งใสมากขึ้น */
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  width: 400px;
  animation: scaleIn 0.8s ease-in-out;
}

/* Animation การเด้งเข้า */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ข้อความ Welcome */
.welcome-text {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff; /* ปรับให้เป็นสีขาว */
}

/* ปุ่ม login */
.login-btn {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  transition: all 0.3s ease;
  background-color: #5e5e5e; /* เปลี่ยนสีพื้นหลังปุ่ม */
  color: #ffffff; /* เปลี่ยนสีตัวอักษรให้เป็นสีขาว */
  border: none; /* ลบเส้นขอบ */
}

/* Hover Effect */
.login-btn:hover {
  transform: scale(1.05);
  background-color: #7e7e7e; /* เปลี่ยนสีเมื่อวางเมาส์เหนือปุ่ม */
}

/* Input Style */
.el-input {
  background-color: #3c3c3c; /* ปรับสีพื้นหลังของ input */
  color: #ffffff; /* เปลี่ยนสีตัวอักษรให้เป็นสีขาว */
  border: 1px solid #666666; /* เพิ่มเส้นขอบให้กับ input */
}

.el-input:focus-within {
  transform: scale(1.02);
  border-color: #ffffff; /* เปลี่ยนสีเส้นขอบเมื่ออยู่ในโฟกัส */
}

/* Placeholder Style */
.el-input input::placeholder {
  color: #aaaaaa; /* เปลี่ยนสี placeholder */
}
:deep(.el-form-item__label) {
  color: white;
}
</style>
