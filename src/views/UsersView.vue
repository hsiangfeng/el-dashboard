<template>
  <h2>產品列表</h2>
  <ElRow :gutter="30" v-loading="loadingStatus.products">
    <ElCol :md="6" v-for="item in products" :key="item.id">
      <ElCard class="mb-1" :body-style="{ padding: '0px' }">
        <ElImage :src="item.imageUrl" />
        <div style="padding: 14px">
          <h3>{{ item.title }}</h3>
          <div class="bottom">
            <div>
              <del v-if="item.origin_price">
                原價 {{ item.origin_price }} 元
              </del>
              <div v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </div>
            <ElButton type="primary" plain @click="addToCart(item.id, 1)">
              加入購物車
            </ElButton>
          </div>
        </div>
      </ElCard>
    </ElCol>
  </ElRow>

  <ElRow justify="center">
    <ElCol :md="12">
      <h3>購物車</h3>
      <div class="text-end">
        <ElButton type="danger" plain @click="removeAllCart">
          清空購物車
        </ElButton>
      </div>
      <ElTable
        :data="carts.carts"
        :summary-method="getSummary"
        :show-summary="true"
        sum-text="總計"
        v-loading="loadingStatus.carts"
      >
        <ElTableColumn prop="product.title" label="品名">
          <template #default="scope">
            <span v-if="scope.row.coupon">
              {{ scope.row.product.title }} <ElTag type="success">已套用優惠</ElTag>
            </span>
            <span v-else>
              {{ scope.row.product.title }}
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn width="100" prop="qty" label="數量" />
        <ElTableColumn prop="final_total" label="單價">
          <template #default="scope">
            <span v-if="scope.row.coupon">
              {{ $filters.currency(scope.row.final_total) }} (原價：{{ $filters.currency(scope.row.total) }})
            </span>
            <span v-else>
              {{ $filters.currency(scope.row.final_total) }}
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn width="100" label="功能">
          <template #default="scope">
            <ElButton link type="danger" plain @click="removeCart(scope.row.id)">
              移除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <ElForm @submit.prevent="addCouponCode" class="el-coupon" :inline="true">
        <ElFormItem label="套用優惠券">
          <ElInput v-model="coupon_code" placeholder="請輸入優惠卷" />
        </ElFormItem>
        <ElFormItem>
          <ElButton :native-type="'submit'">
            送出
          </ElButton>
        </ElFormItem>
      </ElForm>

      <h3>送出訂單</h3>
      <ElForm ref="form" :model="form.user" :rules="rules" @submit.prevent="createOrder" :label-position="'top'" v-loading="loadingStatus.orders">
        <ElFormItem prop="email" label="Email">
          <ElInput type="email" v-model="form.user.email" placeholder="請輸入 Email" />
        </ElFormItem>
        <ElFormItem prop="name" label="姓名">
          <ElInput type="text" v-model="form.user.name" placeholder="請輸入姓名" />
        </ElFormItem>
        <ElFormItem prop="tel" label="收件人電話">
          <ElInput type="tel" v-model="form.user.tel" placeholder="請輸入收件人電話" />
        </ElFormItem>
        <ElFormItem prop="address" label="收件人地址">
          <ElInput type="address" v-model="form.user.address" placeholder="請輸入收件人地址" />
        </ElFormItem>
        <div class="text-end">
          <ElButton type="info" plain>取消</ElButton>
          <ElButton :native-type="'submit'" type="primary" plain>送出</ElButton>
        </div>
      </ElForm>
    </ElCol>
  </ElRow>
</template>

<script>
export default {
  data() {
    return {
      loadingStatus: {
        products: false,
        carts: false,
        orders: false,
      },
      rules: {
        email: [
          {
            required: true,
            message: '請輸入你的 Email',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Email 格式有誤',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: '請輸入你的名字',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 6,
            message: '最小 2 個字，最大 6 個字',
            trigger: 'blur',
          },
        ],
        tel: [
          {
            required: true,
            message: '請輸入你的聯絡電話',
            trigger: 'blur',
          },
          {
            min: 8,
            max: 10,
            message: '最短 8 碼 最長 10 碼',
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: '請輸入你的地址',
            trigger: 'blur',
          },
          {
            min: 4,
            message: '最短四個字',
            trigger: 'blur',
          },
        ],
      },
      products: [],
      carts: [],
      form: {
        user: {},
      },
      coupon_code: '',
    };
  },
  methods: {
    getProducts() {
      this.loadingStatus.products = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/products`;
      this.$http.get(url)
        .then((response) => {
          this.products = response.data.products;
          this.loadingStatus.products = false;
        })
        .catch((error) => {
          this.loadingStatus.products = false;
          this.$notify({
            title: '錯誤訊息',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
    addToCart(id, qty) {
      this.loadingStatus.products = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart })
        .then(() => {
          this.loadingStatus.products = false;
          this.$notify({
            title: '購物車',
            message: '加入購物車成功',
            type: 'success',
          });
          this.getCart();
        })
        .catch((error) => {
          this.loadingStatus.products = false;
          this.$notify({
            title: '錯誤訊息',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
    getCart() {
      this.loadingStatus.carts = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.$http.get(url)
        .then((response) => {
          this.carts = response.data.data;
          this.loadingStatus.carts = false;
        })
        .catch((error) => {
          this.loadingStatus.carts = false;
          this.$notify({
            title: '錯誤訊息',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
    removeAllCart() {
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/carts`;
      this.loadingStatus.carts = true;
      this.$http.delete(url)
        .then(() => {
          this.loadingStatus.carts = false;
          this.$notify({
            title: '購物車',
            message: '購物車已清空',
            type: 'error',
          });
          this.getCart();
        })
        .catch((error) => {
          this.loadingStatus.carts = false;
          this.$notify({
            title: '錯誤訊息',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
    removeCart(id) {
      this.loadingStatus.carts = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(url)
        .then(() => {
          this.loadingStatus.carts = false;
          this.$notify({
            title: '購物車',
            message: '商品已移除',
            type: 'success',
          });
          this.getCart();
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
    createOrder() {
      this.loadingStatus.orders = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/order`;
      this.$http.post(url, { data: this.form })
        .then((res) => {
          this.loadingStatus.orders = false;
          this.$refs.form.resetFields();
          this.$notify({
            title: '建立訂單',
            message: '訂單已建立，五秒後將會跳至付款頁面。',
            type: 'success',
          });
          window.setTimeout(() => {
            this.$router.push(`/admin/user-checkout/${res.data.orderId}`);
          }, 5000);
        })
        .catch((error) => {
          this.loadingStatus.orders = false;
          this.$notify({
            title: '錯誤訊息',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
    addCouponCode() {
      this.loadingStatus.coupon = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.$http.post(url, { data: coupon })
        .then(() => {
          this.loadingStatus.coupon = false;
          this.$notify({
            title: '優惠券',
            message: '優惠券已使用',
            type: 'success',
          });
          this.getCart();
        })
        .catch((error) => {
          this.loadingStatus.coupon = false;
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
    this.getProducts();
    this.getCart();
  },
};
</script>

<style scoped>
.bottom {
  display: flex;
  justify-content: space-between;
}

.mb-1 {
  margin-bottom: 1rem;
}

.text-end {
  text-align: right;
}

.el-coupon {
  display: flex;
  justify-content: end;
  margin-top: 2rem;
}

.el-coupon > .ElFormItem {
  margin-bottom: 0px;
}

.el-coupon > .ElFormItem:last-child {
  margin-right: 0px;
}
</style>
