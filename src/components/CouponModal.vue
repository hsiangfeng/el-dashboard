<template>
  <ElDialog
    v-model="dialogVisible"
    :title="isNew ? '新增優惠券' : '編輯優惠券'"
    :width="'50%'"
    :close-on-click-modal="false"
  >
    <ElForm @submit.prevent="onSubmit" :label-position="'top'">
      <ElFormItem label="優惠卷標題">
        <ElInput
          type="text"
          v-model="tempCoupon.title"
          placeholder="請輸入優惠卷標題"
        />
      </ElFormItem>
      <ElFormItem label="優惠碼">
        <ElInput
          type="text"
          v-model="tempCoupon.code"
          placeholder="請輸入優惠卷優惠碼"
        />
      </ElFormItem>
      <ElRow :gutter="30">
        <ElCol :md="12">
          <ElFormItem label="到期日">
            <ElDatePicker
              width="100%"
              v-model="due_date"
              type="date"
              placeholder="請選擇優惠卷到期日"
              format="YYYY/MM/DD"
              value-format="X"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :md="12">
          <ElFormItem label="折扣百分比">
            <ElInputNumber v-model.number="tempCoupon.percent"/>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElCheckbox
        class="text-end"
        v-model="tempCoupon.is_enabled"
        label="是否啟用"
        :true-label="1"
        :false-label="0"
        size="large"
      />
      <div class="text-end">
        <ElButton type="info" @click="dialogVisible = false" plain>取消</ElButton>
        <ElButton :native-type="'submit'" type="primary" plain>送出</ElButton>
      </div>
    </ElForm>
  </ElDialog>
</template>

<script>
export default {
  props: ['isNew', 'coupon'],
  emits: ['update-coupon'],
  data() {
    return {
      tempCoupon: {},
      due_date: '',
      dialogVisible: false,
    };
  },
  methods: {
    onSubmit() {
      if (!this.tempCoupon.is_enabled) {
        this.tempCoupon.is_enabled = 0;
      }
      // 由於後端只接收 Number，所以要針對 due_date 做型別轉換
      this.tempCoupon.due_date = Number(this.due_date);
      this.$emit('update-coupon', this.tempCoupon);
    },
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      this.due_date = this.tempCoupon.due_date;
    },
  },
};
</script>

<style>
.el-input-number {
  width: 100%;
}
</style>
