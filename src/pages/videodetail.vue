<template>
  <div class="main" v-if="detail!=null" :style="{'min-height':height+'px'}">
    <div class="video" v-if="detail.content.video.length>0">
      <video webkit-playsinline playsinline :src="detail.content.video[0].progressive[detail.content.video[0].progressive.length-1].qiniu_url"
        autoplay="autoplay" controls>
      </video>
    </div>
    <h1 class="title">
      {{detail.title}}
    </h1>
    <p class="cate">
      {{detail.cate.length>0?detail.cate[0]:"其他"}} / {{detail.duration}}
    </p>
    <p class="intro">
      {{detail.intro}}
    </p>
    <div style="height:60px;"></div>
    <a style="display:block;position:fixed;bottom:0;left:0" href='http://a.app.qq.com/o/simple.jsp?pkgname=vmovier.com.activity&channel=0002160650432d595942&fromcase=60001'>
      <img style="width:100%;" src="../assets/img/app.jpg" />
    </a>
  </div>
</template>
<script>
import vmover from "../service/vmover";
export default {
  data() {
    return {
      detail: null,
      postid: 0,
      height: document.documentElement.clientHeight
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      vmover.loadVideo(this.$route.query.postid, detail => {
        if (detail) {
          this.$set(this.$data, "detail", detail);
          document.title = detail.title;
        }
      });
    }
  },
  activated() {
    this.init();
  }
};
</script>
<style scoped>
video {
  width: 100%;
  background-color: black;
}

.main {
  background-color: white;
}

.title {
  color: black;
  text-align: center;
  font-size: 22px;
  margin-top: 20px;
}

.cate {
  color: black;
  text-align: center;
  padding-top: 20px;
  font-size: 18px;
  color: gray;
  font-weight: bold;
}

.intro {
  color: gray;
  padding: 18px;
  word-break: unset;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 2px;
}
</style>