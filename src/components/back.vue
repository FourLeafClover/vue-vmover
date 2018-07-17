<template>
<div class="layout">
  <div class="header">
    <van-nav-bar :title="title" left-text="返回" :right-text="rightText" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
  </div>
  <div class="layout-content">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'wBackLayout',
  props: {
    title: '',
    rightText: ''
  },
  methods: {
    onClickLeft () {
      this.$router.history.go(-1)
    },
    onClickRight () {
      this.$emit('click-right')
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .layout-content {
    width: 100%;
    height: 100%;
    padding-top: 46px;
    overflow: scroll;
    box-sizing: border-box;
  }
}

</style>
