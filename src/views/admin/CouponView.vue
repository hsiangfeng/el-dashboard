<template>
  <h3>優惠券列表</h3>
  <div class="text-end">
    <ElButton type="primary" plain @click="openModal(true)">新增優惠券</ElButton>
  </div>
  <ElTable :data="coupons" stripe style="width: 100%" v-loading="isLoading">
    <ElTableColumn prop="title" label="名稱" />
    <ElTableColumn label="折扣百分比" width="200">
      <template #default="scope">
          {{ scope.row.percent }}%
      </template>
    </ElTableColumn>
    <ElTableColumn label="到期日" width="150">
      <template #default="scope">
          {{ $filters.date(scope.row.due_date) }}
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

  <CouponModal ref="CouponModalRef" :is-new="isNew" :coupon="tempCoupon" @update-coupon="updateCoupon" />
  <DeleteModal ref="DeleteModalRef" :data="tempCoupon" @delete="deleteCoupon" />
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  data() {
    return {
      isNew: true,
      coupons: [],
      tempCoupon: {},
      isLoading: false,
    };
  },
  components: {
    CouponModal,
    DeleteModal,
  },
  methods: {
    getCoupons() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupons`;
      this.$http.get(url)
        .then((response) => {
          this.coupons = response.data.coupons;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$notify({
            title: '優惠券取得失敗',
            message: error.response.data.message,
            type: 'error',
          });
        });
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        // 避免出現錯誤，預設帶入 is_enabled
        this.tempCoupon = {
          is_enabled: 0,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.CouponModalRef.dialogVisible = true;
    },
    openDeleteModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.DeleteModalRef.dialogVisible = true;
    },
    updateCoupon(item) {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupon`;
      let httpMethos = 'post';
      let status = '新增優惠卷';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${this.tempCoupon.id}`;
        httpMethos = 'put';
        status = '更新優惠卷';
      }
      this.$http[httpMethos](url, { data: item })
        .then(() => {
          this.isLoading = false;
          this.$notify({
            title: status,
            message: '執行成功！',
            type: 'success',
          });
          this.$refs.CouponModalRef.dialogVisible = false;
          this.getCoupons();
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
    deleteCoupon(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${id}`;
      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          this.$refs.DeleteModalRef.dialogVisible = false;
          this.$notify({
            title: '優惠券刪除',
            message: '執行成功！',
            type: 'success',
          });
          this.getCoupons();
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
    this.getCoupons();
  },
};
</script>

<style>

</style>
