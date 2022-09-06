<template>
  <ElRow class="h-100vh" justify="center" align="middle">
    <ElCol :md="12">
      <ElCard>
        <ElRow>
          <ElCol class="d-flex-center" :md="12">
            <ElImage :src="require('@/assets/logo.png')" alt="404" :fit="'fill'" />
          </ElCol>
          <ElCol :md="12">
            <h1>404</h1>
            <h2>找不到頁面</h2>
            <p>您要觀看的頁面可能已被刪除、名稱已更改或暫時不可用。</p>
            <ElButton type="primary" @click="$router.push('/')">Go to Home</ElButton>
          </ElCol>
        </ElRow>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script>
export default {

};
</script>

<style>
.h-100vh {
  height: 100vh;
}

.d-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
