<template>
  <h3>訂單列表</h3>
  <ElTable :data="orders" stripe style="width: 100%" v-loading="isLoading">
    <ElTableColumn prop="id" label="訂單編號" width="100"/>
    <ElTableColumn prop="create_at" label="購買時間" width="100">
      <template #default="scope">
        {{ $filters.date(scope.row.create_at) }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="user.email" label="Email" width="150"/>
    <ElTableColumn prop="products" label="購買款項">
      <template #default="scope">
        <ul class="list-unstyled p-0">
          <li v-for="(product, i) in scope.row.products" :key="i">
            {{ product.product.title }} x {{ product.qty }} {{ product.product.unit }}
          </li>
        </ul>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="total" label="應付金額" width="150">
      <template #default="scope">
         {{ $filters.currency( scope.row.total) }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="is_paid" label="是否付款" width="100">
      <template #default="scope">
        <ElTag :type="scope.row.is_paid ? 'success' : 'info'">
          {{ scope.row.is_paid ? '已付款' : '未付款' }}
        </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn label="功能" align="center" width="150">
      <template #default="scope">
        <ElButton type="success" size="small" @click="checkOrder(scope.row.id)">付款</ElButton>
        <ElButton type="danger" size="small" @click="openDeleteModal(scope.row)">刪除</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
  <DeleteModal ref="DeleteModalRef" :data="order" @delete="deleteOrder" />
</template>

<script>
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  data() {
    return {
      orders: [],
      order: [],
      isLoading: false,
    };
  },
  components: {
    DeleteModal,
  },
  methods: {
    getOrders() {
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/orders`;
      this.isLoading = true;
      this.$http.get(url)
        .then((response) => {
          this.orders = response.data.orders;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$notify({
            title: '錯誤訊息',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
    openDeleteModal(item) {
      this.order = item;
      this.$refs.DeleteModalRef.dialogVisible = true;
    },
    deleteOrder(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/order/${id}`;
      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          this.$notify({
            title: '刪除訂單',
            message: '執行成功！',
            type: 'success',
          });
          this.$refs.DeleteModalRef.dialogVisible = false;
          this.getOrders(this.currentPage);
        })
        .catch((error) => {
          this.isLoading = false;
          this.$notify({
            title: '錯誤訊息',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
    checkOrder(id) {
      this.$router.push(`/admin/user-checkout/${id}`);
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style>
.p-0 {
  padding: 0px;
}

.list-unstyled {
  list-style: none
}
</style>
