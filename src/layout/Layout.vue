<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="250px" :style="{ width: isCollapse ? '0px' : '250px' }">
        <el-header class="aside-header">
          <el-tooltip effect="dark" content="close sidebar" placement="bottom">
            <el-button
              :icon="Fold"
              round
              @click="toggleCollapse"
              class="button-expand"
            />
          </el-tooltip>
          <el-tooltip
            v-if="!isCollapse"
            effect="dark"
            content="Search"
            placement="bottom"
          >
            <el-button :icon="Search" round class="button-expand" />
          </el-tooltip>
        </el-header>
        <el-menu :default-active="activeMenu" class="el-menu-vertical">
          <el-menu-item index="/" @click="goTo('/')">
            <span>chat with Chat-BOT</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="display: flex; flex-direction: column">
        <div>
          <el-header class="header-main">
            <div>
              <el-tooltip
                v-if="isCollapse"
                effect="dark"
                content="open sidebar"
                placement="bottom"
              >
                <el-button
                  type="primary"
                  :icon="Expand"
                  round
                  @click="toggleCollapse"
                  class="button-expand"
                />
              </el-tooltip>
              <span> Chat-BOT </span>
            </div>
            <el-tooltip effect="dark" content="profile" placement="bottom">
              <el-button type="info" :icon="User" circle />
            </el-tooltip>
          </el-header>
        </div>
        <!-- Chat Page -->
        <el-main class="chat-container" v-loading.lock="fullscreenLoading">
          <el-scrollbar class="chat-messages" ref="chatScrollbar">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="message"
              :class="message.sender"
            >
              <span>{{ message.text }}</span>
            </div>
          </el-scrollbar>
          <div class="chat-input">
            <el-input
              type="textarea"
              v-model="userMessage"
              placeholder="Type a message to Chat-BOT..."
              @keyup.enter="sendMessage"
              clearable
              rows="3"
            />
            <el-button
              type="primary"
              :icon="ArrowUp"
              @click="sendMessage"
              class="send-button"
              circle
            ></el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Expand, Fold, Search, User, ArrowUp } from "@element-plus/icons-vue";

const isCollapse = ref(false);
const activeMenu = ref("/");
const messages = ref<{ text: string; sender: string }[]>([]);
const userMessage = ref("");
const chatScrollbar = ref();
const fullscreenLoading = ref(false);

const goTo = (path: string) => {
  console.log("Navigating to:", path);
};

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const sendMessage = () => {
  if (userMessage.value.trim() === "") return;

  messages.value.push({ text: userMessage.value, sender: "user" });
  userMessage.value = "";
  fullscreenLoading.value = true;

  // Simulate bot response
  setTimeout(() => {
    messages.value.push({ text: "Hello! How can I help you?", sender: "bot" });
    fullscreenLoading.value = false;
    //scroll to bottom when chat
    nextTick(() => {
      const scrollWrap = chatScrollbar.value?.$el?.querySelector(
        ".el-scrollbar__wrap"
      );
      if (scrollWrap) {
        scrollWrap.scrollTo({
          top: scrollWrap.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  }, 1000);
};
</script>

<style scoped>
.common-layout {
  height: 100vh;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #f4f4f5;
}
.el-aside .el-header.aside-header {
  background: #f4f4f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
.el-header.header-main {
  background-color: #409eff;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  width: 100%;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .chat-container {
    width: 800px;
  }
}
/* page chat */
.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #ffffff;
}
.message {
  max-width: 75%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 25px;
  word-wrap: break-word;
}
.user {
  background-color: #e5e5ea;
  color: black;
  align-self: flex-end;
  text-align: left;
  margin-left: auto;
  width: fit-content;
}
.bot {
  color: black;
  align-self: flex-start;
  text-align: left;
  margin-right: auto;
}
.chat-input {
  padding: 10px;
  background: #ffffff;
  display: flex;
  align-items: center;
}
.send-button {
  margin-left: 10px;
}
</style>
