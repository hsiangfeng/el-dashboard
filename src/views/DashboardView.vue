<template>
  <ElContainer style="height: 100vh">
    <ElAside class="bg-primary" width="200px">
      <ElScrollbar>
        <ElMenu
          background-color="#303133"
          text-color="#ffffff"
          active-text-color="#79bbff"
          :router="true"
        >
          <ElMenuItem index="/admin" >
            <ElImage class="el-logo" :src="require('@/assets/logo.png')" :fit="'fill'" style="width: 30px"/> &nbsp; 電商後台
          </ElMenuItem>
          <ElMenuItem index="/admin/products">
            <ElIcon>
              <Refrigerator />
            </ElIcon>
            產品管理
          </ElMenuItem>
          <ElMenuItem index="/admin/coupon">
            <ElIcon>
              <Money />
            </ElIcon>
            優惠卷管理
          </ElMenuItem>
          <ElMenuItem index="/admin/orders">
            <ElIcon>
              <TrendCharts />
            </ElIcon>
            訂單管理
          </ElMenuItem>
          <ElMenuItem index="/admin/users">
            <ElIcon>
              <UserFilled />
            </ElIcon>
            模擬下單
          </ElMenuItem>
        </ElMenu>
      </ElScrollbar>
    </ElAside>
    <ElContainer>
      <ElHeader>
        <ElLink :underline="false" type="info" @click="logout">
          <ElIcon>
            <Tools />
          </ElIcon>
          登出
        </ElLink>
      </ElHeader>
      <ElMain>
        <RouterView v-if="status" />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script>
import {
  Refrigerator, Tools, UserFilled, TrendCharts, Money,
} from '@element-plus/icons-vue';

export default {
  components: {
    Refrigerator,
    Tools,
    UserFilled,
    TrendCharts,
    Money,
  },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      this.$http.defaults.headers.common.Authorization = `${token}`;
      const url = `${process.env.VUE_APP_API_URL}/api/user/check`;
      this.$http.post(url)
        .then(() => {
          this.status = true;
        })
        .catch((error) => {
          this.$notify({
            title: '登入失敗',
            message: error.response.data.message,
            type: 'error',
          });
          this.$router.push('/login');
        });
    },
    logout() {
      const api = `${process.env.VUE_APP_API_URL}/logout`;
      this.$http.post(api)
        .then(() => {
          document.cookie = 'hexToken=\'\';';
          this.$notify({
            title: '登出資訊',
            message: '登出成功！',
            type: 'success',
          });
          this.$router.push('/login');
        }).catch((error) => {
          this.$notify({
            title: '登出失敗',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>

<style scoped>

.el-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-aside {
  color: var(--el-text-color-primary);
  background-color: var(--el-text-color-primary);
}

.el-header {
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: var(--el-text-color-primary);
}

.el-menu {
  border-right: none;
}

.el-main {
  padding: 0px 20px
}
</style>
