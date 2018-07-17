<template>
<img class="download" @click="downloadApp" :style="styles" src="img/download.jpg" alt="">
</template>

<script>
export default {
  name: 'vDownloadapp',
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    downloadApp () {
      window.open('http://a.app.qq.com/o/simple.jsp?pkgname=vmovier.com.activity&amp;channel=0002160650432d595942&amp;fromcase=60001')
    }
  },
  computed: {
    styles () {
      if (this.fixed) {
        return {
          'position': 'absolute',
          'left': 0,
          'bottom': 0
        }
      } else {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.download {
  width: 100%;
  display: inline-block;
}
</style>
