<template>
  <ElDialog
    v-model="dialogVisible"
    :title="isNew ? '產品新增' : '產品編輯'"
    center
    :width="'50%'"
    :close-on-click-modal="false"
  >
    <ElForm @submit.prevent="onSubmit" :label-position="'top'">
      <ElRow :gutter="30">
        <ElCol :md="6">
          <ElFormItem label="圖片連結">
            <ElInput v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結" />
          </ElFormItem>
          <ElFormItem label="圖片上傳">
            <ElUpload action="/" :before-upload="uploadFile">
              <ElButton type="primary" v-loading="fileUploading" plain>Click to upload</ElButton>
            </ElUpload>
          </ElFormItem>
          <h3>圖片預覽</h3>
          <ElImage :src="tempProduct.imageUrl" style="width: 100%; height: 200px" :fit="'cover'" />
        </ElCol>
        <ElCol :md="18">
          <ElRow :gutter="15">
            <ElCol :md="12">
              <ElFormItem label="產品標題">
                <ElInput type="text" v-model="tempProduct.title" placeholder="請輸入產品標題" />
              </ElFormItem>
            </ElCol>
            <ElCol :md="12">
              <ElFormItem label="產品分類">
                <ElInput type="text" v-model="tempProduct.category" placeholder="請輸入產品分類" />
              </ElFormItem>
            </ElCol>
            <ElCol :md="8">
              <ElFormItem label="單位">
                <ElInput type="text" v-model="tempProduct.unit" placeholder="請輸入產品單位" />
              </ElFormItem>
            </ElCol>
            <ElCol :md="8">
              <ElFormItem label="原價">
                <ElInput type="number" v-model.number="tempProduct.origin_price" placeholder="請輸入產品原價" />
              </ElFormItem>
            </ElCol>
            <ElCol :md="8">
              <ElFormItem label="售價">
                <ElInput type="number" v-model.number="tempProduct.price" placeholder="請輸入產品售價" />
              </ElFormItem>
            </ElCol>
            <ElCol :md="24">
              <ElFormItem label="產品描述">
                <ElInput type="textarea" v-model="tempProduct.description" placeholder="產品描述" />
              </ElFormItem>
            </ElCol>
            <ElCol :md="24">
              <ElFormItem label="說明內容">
                <ElInput type="textarea" v-model="tempProduct.content" placeholder="產品描述" />
              </ElFormItem>
            </ElCol>
            <ElCol :md="24">
              <ElCheckbox class="text-end" v-model="tempProduct.is_enabled" label="是否啟用" size="large" />
            </ElCol>
            <ElCol class="text-end" :md="24">
              <ElButton type="info" @click="dialogVisible = false" plain>取消</ElButton>
              <ElButton :native-type="'submit'" type="primary" plain>送出</ElButton>
            </ElCol>
          </ElRow>
        </ElCol>
      </ElRow>
    </ElForm>
  </ElDialog>
</template>

<script>
export default {
  props: ['isNew', 'product'],
  emits: ['update-product'],
  data() {
    return {
      dialogVisible: false,
      tempProduct: {},
      fileUploading: false,
    };
  },
  methods: {
    uploadFile(file) {
      this.fileUploading = true;
      const formData = new FormData();
      formData.append('file-to-upload', file);
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/upload`;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          this.fileUploading = false;
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl;
            this.$notify({
              title: '上傳結果',
              message: '圖片上傳成功！',
              type: 'success',
            });
          } else {
            this.$notify({
              title: '上傳結果',
              message: res.data.message,
              type: 'error',
            });
          }
        })
        .catch((error) => {
          this.fileUploading = false;
          this.$notify({
            title: '錯誤訊息',
            message: error.response.data.message,
            type: 'error',
          });
        });
      // ElUpload 如果不預設回傳一個 false，會導致上傳後會再次觸發上傳事件
      return false;
    },
    onSubmit() {
      this.$emit('update-product', this.tempProduct);
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
};
</script>

<style>
.text-end {
  text-align: right;
}
</style>
