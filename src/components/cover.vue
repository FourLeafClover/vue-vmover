<template>
  <div class="cover" :style="style"></div>
</template>
<script>
export default{
  name: 'vCover',
  props: {
    zIndex: 0
  },
  computed: {
    style () {
      return {
        'z-index': this.zIndex
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cover{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
  top: 0;
  left: 0;
  opacity: 0.5;
}
</style>
