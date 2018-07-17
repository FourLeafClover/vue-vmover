<template>
<v-layout :active="3">
  <div class="about">
      <div class="card">
        <van-cell title="播放历史" is-link @click="goto('/history')" />
        <van-cell title="清除缓存" is-link @click="clearStorage" />
        <van-cell title="Github" is-link @click="jump('https://github.com/FourLeafClover/vue-vmovie')" />
        <van-cell title="站点声明" is-link @click="showInfo" />
      </div>
      <img class="pay" src="@/assets/header/pay.png" alt="">
      <div class="tip">
            如果觉得可以,请献出一份爱心<br/>
            微信浏览器请长按二维码
      </div>
  </div>
</v-layout>
</template>

<script>
import { clearSearchHistory, clearViewHistory } from '@/api/storage'
export default {
  name: 'about',
  created () {},
  methods: {
    clearStorage () {
      this.$dialog
        .confirm({
          title: '缓存',
          message: '清除缓存后,浏览记录和搜索记录也将被清除掉?'
        })
        .then(() => {
          clearSearchHistory()
          clearViewHistory()
          this.$toast('删除成功')
        })
        .catch(() => {})
    },
    showInfo () {
      this.$dialog.alert({
        message:
          '平时很喜欢用场库App,觉得里面的短视频很不错,但是因为场库App的没有和App界面一样的移动端网站,所以就模仿App的界面自己制作了一个场库移动端站点,方便平时在微信和浏览器里面观看,如果访问者觉得视频还可以,想查看更多信息建议大家去下载[场库]App,只有App里面才能查看其他用户的评论,此站点不用于任何商业用途,如果有侵权行为,请及时联系我,我将立刻下架此站点,如果场库官方有看到我这个站点,觉得还可以的话,我可以将此站点代码无偿提供给场库官方公司,联系方式zc_smile@outlook.com。也可以直接访问我的github地址,在github的项目issue里面提供建议'
      })
    },
    goto (url) {
      this.$router.push(url)
    },
    jump (url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  padding: 10px;
  box-sizing: border-box;
  .pay {
    width: 100%;
    box-sizing: border-box;
    margin-top: 20px;
    padding: 10%;
  }
  .tip {
    text-align: center;
    line-height: 20px;
    margin-top: 10px;
    font-size: 12px;
    color: gray;
  }
  .card {
    box-shadow: 0 0 10px #c9c9c9;
    /* border-radius: 20px; */
  }
}
</style>
