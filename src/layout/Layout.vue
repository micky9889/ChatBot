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
            <el-button
              :icon="Search"
              round
              class="button-expand"
              @click="openSearchDialog"
            />
          </el-tooltip>
        </el-header>
        <el-menu :default-active="activeMenu" class="el-menu-vertical">
          <el-menu-item index="/" @click="goTo('/')">
            <span>chat with Chat-BOX</span>
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
                  type="default"
                  :icon="Expand"
                  round
                  @click="toggleCollapse"
                  class="button-expand"
                />
              </el-tooltip>
              <span style="margin-left: 10px;font-weight: bold;font-size: large;"> Chat-BOX </span>
            </div>
            <el-dropdown trigger="click">
              <el-button type="info" :icon="Setting" circle />

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :icon="UserFilled"
                    @click="openProfileDialog"
                    >Profile</el-dropdown-item
                  >
                  <el-dropdown-item :icon="SwitchButton" @click="handleLogout"
                    >Logout</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-header>
        </div>
        <!-- Chat Page -->
        <el-main
          class="chat-container"
          v-loading.lock="fullscreenLoading"
          element-loading-text="Loading..."
        >
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
              ref="inputRef"
              type="textarea"
              v-model="userMessage"
              placeholder="Type a message to Chat-BOX..."
              @keyup.enter="sendMessage"
              clearable
              :disabled="fullscreenLoading"
              rows="3"
            />
            <el-button
              type="primary"
              :icon="ArrowUp"
              @click="sendMessage"
              class="send-button"
              :disabled="fullscreenLoading"
              circle
            ></el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- dialog profile -->
    <el-dialog
      v-model="profileDialogVisible"
      title="User Profile"
      width="500px"
      center
    >
      <div class="profile-container">
        <el-avatar :size="80" src="https://via.placeholder.com/80" />
        <div class="profile-info">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
        </div>
      </div>
      <template #footer>
        <el-button type="primary" @click="profileDialogVisible = false"
          >Close</el-button
        >
      </template>
    </el-dialog>
    <!-- dialog search -->
    <el-dialog
      v-model="searchDialogVisible"
      title="Search"
      width="500px"
      center
      @close="closeSearchDialog"
    >
      <el-input
        ref="searchInput"
        v-model="searchQuery"
        placeholder="Enter text to search..."
        clearable
      />
      <el-scrollbar class="search-results">
        <div
          v-for="(result, index) in filteredMessages"
          :key="index"
          class="search-item"
        >
          <span>{{ result.text }}</span>
        </div>
      </el-scrollbar>
      <template #footer>
        <el-button @click="closeSearchDialog">Close</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, onMounted } from "vue";
import {
  Expand,
  Fold,
  Search,
  ArrowUp,
  SwitchButton,
  UserFilled,
  Setting,
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const isCollapse = ref<boolean>(false);
const activeMenu = ref<string>("/");
const messages = ref<{ text: string; sender: string }[]>([]);
const userMessage = ref<string>("");
const chatScrollbar = ref<any>(null);
const fullscreenLoading = ref<boolean>(false);
const searchDialogVisible = ref<boolean>(false);
const searchQuery = ref<string>("");
const profileDialogVisible = ref<boolean>(false);
const inputRef = ref<any>(null);
const searchInput = ref<any>(null);
const router = useRouter();

onMounted(() => {
  nextTick(() => {
    inputRef.value?.focus(); // Set focus on the input element
  });
});

//not use
const goTo = (path: string): void => {
  console.log("Navigating to:", path);
};

//expand sidebar
const toggleCollapse = (): void => {
  isCollapse.value = !isCollapse.value;
};

//send message
const sendMessage = (): void => {
  if (userMessage.value.trim() === "") return;

  messages.value.push({ text: userMessage.value, sender: "user" });
  userMessage.value = "";
  fullscreenLoading.value = true;

  // Simulate bot response
  setTimeout(() => {
    messages.value.push({ text: "Hello! How can I help you?", sender: "bot" });
    fullscreenLoading.value = false;

    // Set focus back to the input field
    nextTick(() => {
      inputRef.value?.focus(); // Set focus on the input element
    });

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
//logout
const handleLogout = (): void => {
  ElMessageBox.confirm(
    "Are you sure you want to logout?",
    "Logout Confirmation",
    {
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      type: "warning",
    }
  )
    .then(() => {
      ElMessage({
        type: "success",
        message: "Logout successful!",
      });
      // reset token
      router.push("/login");
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Logout cancelled",
      });
    });
};
//dialog profile
const openProfileDialog = (): void => {
  profileDialogVisible.value = true;
};
// dialog search
const openSearchDialog = (): void => {
  searchDialogVisible.value = true;

  //focus input search
  nextTick(() => {
    setTimeout(() => {
      searchInput.value?.focus();
    }, 100); 
  });
};

// filter message
const filteredMessages = computed(() => {
  if (!searchQuery.value) return [];
  return messages.value.filter((msg) =>
    msg.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const closeSearchDialog = (): void => {
  searchDialogVisible.value = false;
  searchQuery.value = "";
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
  background-color: white;
  color: #444444;
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
.profile-container {
  display: flex;
  align-items: center;
  gap: 20px;
}
.profile-info p {
  margin: 5px 0;
}
.search-results {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
}
.search-item {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>
