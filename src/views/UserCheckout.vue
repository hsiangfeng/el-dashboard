<template>
  <ElRow justify="center">
    <ElCol :span="8">
      <h3>訂單資訊</h3>
      <ElTable
        :data="products"
        stripe
        style="width: 100%"
        :show-summary="true"
        :summary-method="getSummary"
        sum-text="總計"
        v-loading="isLoading"
      >
        <ElTableColumn prop="product.title" label="品名" />
        <ElTableColumn prop="qty" label="數量">
          <template #default="scope">
            {{ scope.row.qty }} / {{ scope.row.product.unit }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="final_total" label="單價">
          <template #default="scope">
            {{ $filters.currency(scope.row.final_total) }}
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCol>
  </ElRow>
  <ElRow justify="center" v-loading="isLoading">
    <ElCol :span="8">
      <h3>使用者資訊</h3>
      <ElForm @submit.prevent="payOrder" :label-position="'top'">
        <ElFormItem label="Email">
          <ElInput v-model="order.user.email" disabled />
        </ElFormItem>
        <ElFormItem label="姓名">
          <ElInput v-model="order.user.name" disabled />
        </ElFormItem>
        <ElFormItem label="電話">
          <ElInput v-model="order.user.tel" disabled />
        </ElFormItem>
        <ElFormItem label="地址">
          <ElInput v-model="order.user.address" disabled />
        </ElFormItem>
        <ElFormItem label="付款狀態">
          <ElTag :type="order.is_paid ? 'success' : 'info'">
            {{ order.is_paid ? '付款成功' : '尚未付款' }}
          </ElTag>
        </ElFormItem>
        <div class="text-end">
          <ElButton
            :native-type="'submit'"
            :type="order.is_paid ? 'success' : 'info'"
            :disabled="order.is_paid"
            plain
          >
            {{ order.is_paid ? '已付款' : '付款去' }}
          </ElButton>
        </div>
      </ElForm>
    </ElCol>
  </ElRow>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orderId: '',
      order: {
        user: {},
      },
      products: [],
    };
  },
  methods: {
    getOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/order/${this.orderId}`;
      this.$http.get(url)
        .then((response) => {
          this.order = response.data.order;
          const { products } = response.data.order;

          // 因為原始資料是物件，所以要重新轉成陣列
          const cacheProducts = Object.keys(response.data.order.products).map(
            (key) => ({
              ...products[key],
            }),
          );
          this.products = cacheProducts;
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
    payOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/pay/${this.orderId}`;
      this.$http
        .post(url)
        .then(() => {
          this.isLoading = false;
          this.$notify({
            title: '付款資訊',
            message: '付款成功！',
            type: 'success',
          });
          this.getOrder();
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
    getSummary({ columns, data }) {
      const sums = [];
      // Element Plus 官方的範例程式碼
      // https://element-plus.org/zh-CN/component/table.html#%E8%A1%A8%E5%B0%BE%E5%90%88%E8%AE%A1%E8%A1%8C
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '總計';
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => Number.isNaN(value))) {
          const total = values.reduce((previousValue, currentValue) => previousValue + currentValue);
          sums[index] = this.$filters.currency(total);
        }
      });
      return sums;
    },
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>

<style></style>
