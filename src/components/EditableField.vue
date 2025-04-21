<template>
  <div class="editable-field-container block-container">
    <span v-if="!editing">{{ label }}：{{ value }}</span>
    <div
      class="editable-field-input"
      v-else
    >
      <span class="input-label">{{ label }}：</span>
      <el-input
        v-model="internalValue"
        placeholder="请输入新的值"
      ></el-input>
      <el-button
        class="btn"
        type="primary"
        @click="updateValue"
        >更新{{ label }}</el-button
      >
    </div>
    <el-button
      class="btn"
      v-if="!editing"
      type="text"
      @click="handleToggleBtn"
      >修改{{ label }}</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      internalValue: this.value
    }
  },
  watch: {
    value(newVal) {
      if (!this.editing) {
        this.internalValue = newVal
      }
    }
  },
  methods: {
    updateValue() {
      this.$emit('update', this.internalValue)
      this.handleToggleBtn()
    },
    handleToggleBtn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
/* 样式定义 */
.editable-field-container {
  .editable-field-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
  }
  .input-label {
    width: 100px;
  }
  .btn {
    margin-left: 10px;
  }
}
</style>
