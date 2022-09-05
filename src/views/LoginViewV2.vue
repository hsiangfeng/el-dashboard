<script setup>
import axios from 'axios';
import { ElNotification } from 'element-plus';

import { ref, reactive } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const isLoading = ref(false);

const user = reactive({});

const submitForm = () => {
  const url = `${process.env.VUE_APP_API_URL}/admin/signin`;

  isLoading.value = true;

  axios.post(url, user)
    .then((response) => {
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

      isLoading.value = false;

      ElNotification({
        type: 'success',
        title: '登入成功',
      });

      router.push('/admin');
    })
    .catch((error) => {
      isLoading.value = false;

      ElNotification({
        title: '登入失敗',
        message: error.response.data.message,
        type: 'error',
      });
    });
};
</script>

<template>
  <ElContainer>
    <ElMain>
      <ElRow justify="center" align="middle" class="h-100vh">
        <ElCol :md="6" :sm="6">
          <ElForm
            ref="formRef"
            label-position="top"
            class="text-center"
            @submit.prevent="submitForm(ruleFormRef)"
          >
            <ElImage style="width: 100px; height: 100px" :src="require('@/assets/logo.png')"></ElImage>
            <ElFormItem label="帳號">
              <ElInput v-model="user.username" placeholder="請輸入帳號" :disabled="isLoading"></ElInput>
            </ElFormItem>
            <ElFormItem label="密碼">
              <ElInput v-model="user.password" type="password" placeholder="請輸入密碼" show-password :disabled="isLoading"></ElInput>
            </ElFormItem>
            <div>
              <ElButton native-type="submit" type="primary" :loading="isLoading">登入</ElButton>
            </div>
          </ElForm>
        </ElCol>
      </ElRow>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.h-100vh {
  height: 100vh
}
.text-center {
  text-align: center;
}
</style>
