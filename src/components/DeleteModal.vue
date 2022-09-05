<template>
  <ElDialog
    v-model="dialogVisible"
    title="刪除"
    :width="'50%'"
  >
    <h3>你確定要刪除 {{ data.title || data.id }}(刪除後將無法恢復)。</h3>
    <template #footer>
      <ElButton type="info" @click="dialogVisible = false" plain>取消</ElButton>
      <ElButton type="danger" @click="onClick" plain>刪除</ElButton>
    </template>
  </ElDialog>
</template>

<script>
export default {
  props: ['data'],
  emits: ['delete'],
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    onClick() {
      this.$emit('delete', this.data.id);
    },
  },
};
</script>

<style>

</style>
