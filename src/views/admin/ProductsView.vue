<template>
  <h3>產品列表</h3>
  <div class="text-end">
    <ElButton type="primary" plain @click="openModal(true)">新增產品</ElButton>
  </div>
  <ElTable :data="products" stripe style="width: 100%" v-loading="isLoading">
    <ElTableColumn prop="category" label="分類" width="150"/>
    <ElTableColumn prop="title" label="標題"/>
    <ElTableColumn prop="origin_price" label="原價" width="100">
      <template #default="scope">
        {{ $filters.currency(scope.row.origin_price) }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="price" label="售價" width="100">
      <template #default="scope">
        {{ $filters.currency(scope.row.origin_price) }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="是否啟用" width="100">
      <template #default="scope">
        <ElTag :type="scope.row.is_enabled ? 'success' : 'info'">
          {{ scope.row.is_enabled ? '啟用' : '未啟用' }}
        </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn label="功能" width="150">
      <template #default="scope">
        <ElButton type="primary" plain size="small" @click="openModal(false, scope.row)">編輯</ElButton>
        <ElButton type="danger" plain size="small" @click="openDeleteModal(scope.row)">刪除</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>

  <ProductModal ref="ProductModalRef" :is-new="isNew" :product="tempProduct" @update-product="updateProduct" />
  <DeleteModal ref="DeleteModalRef" :data="tempProduct" @delete="deleteProduct" />
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: true,
      isLoading: false,
    };
  },
  components: {
    ProductModal,
    DeleteModal,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/products`;
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
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
    openModal(isNew, item) {
      this.isNew = isNew;
      if (isNew) {
        // 避免出現錯誤，預設帶入 is_enabled
        this.tempProduct = {
          is_enabled: 0,
        };
      } else {
        this.tempProduct = { ...item };
      }
      this.$refs.ProductModalRef.dialogVisible = true;
    },
    openDeleteModal(item) {
      this.tempProduct = { ...item };
      this.$refs.DeleteModalRef.dialogVisible = true;
    },
    updateProduct(item) {
      let api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/product`;
      this.isLoading = true;
      let httpMethod = 'post';
      let status = '新增產品';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
        status = '更新產品';
      }
      this.$http[httpMethod](api, { data: item })
        .then(() => {
          this.$refs.ProductModalRef.dialogVisible = false;
          this.$notify({
            title: status,
            message: '執行成功！',
            type: 'success',
          });
          this.getProducts();
        })
        .catch((error) => {
          this.$notify({
            title: '錯誤訊息',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
    deleteProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/product/${id}`;
      this.$http.delete(url)
        .then(() => {
          this.$refs.DeleteModalRef.dialogVisible = false;
          this.$notify({
            title: '產品刪除',
            message: '刪除成功！',
            type: 'success',
          });
          this.isLoading = false;
          this.getProducts();
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
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style>

</style>
