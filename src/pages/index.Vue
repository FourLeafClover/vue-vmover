<template>
  <div class="main">
    <div ref="content">
      <router-link to="/keyword">
        <div class="search">
          <div class="jump">
            <img style="height: 20px;" src="../assets/img/search.png" />&nbsp;搜索精彩片段</div>
        </div>
      </router-link>
      <div v-if="banners.length>0">
        <slidebox :loop='loop' :autoPlay='autoPlay'>
          <div class="slider-item" style="z-index:99" v-for="item in banners" :key="item.postId">
            <router-link :to="{ name:'videodetail',params:{ postid:item.postId }}" style="width:100%;">
              <img :src="item.image" style="width:100%;" />
            </router-link>
          </div>
        </slidebox>
      </div>
      <a style="display:block" href="http://a.app.qq.com/o/simple.jsp?pkgname=vmovier.com.activity&channel=0002160650432d595942&fromcase=60001">
        <img style="width:100%;" src="../assets/img/app.jpg" />
      </a>
      <div class="list" ref="wrapper">
        <div class="item" v-for="video in videos" :key="video.postid">
          <router-link :to="{ name:'videodetail',params:{ postid:video.postid }}">
            <img style="width:100%" :src="video.image" />
          </router-link>
          <div class="line1">
            <span class="time">{{video.duration}}</span>
            <span class="catename">#{{video.catename}}</span>
          </div>
          <div class="line2">{{video.title}}</div>
        </div>
        <div ref="loading" v-if="videos.length>1">
          <loading :loadingWord="loadingWord"></loading>
        </div>
      </div>
      <div style="height:50px;"></div>
    </div>
    <bottombar activeId="1" />
  </div>
</template>
<script>
  import bottombar from "../component/bottombar";
  import slidebox from "../component/slidebox";
  import vmover from "../service/vmover";
  import BScroll from "better-scroll";
  import loading from "../component/loading";
  export default {
    data() {
      return {
        loop: false,
        autoPlay: false,
        banners: [],
        videos: [],
        loadingWord: "上拉加载下一页",
        curPage: 1,
        isCanLoad: true
      };
    },
    components: {
      slidebox: slidebox,
      bottombar: bottombar,
      loading: loading
    },
    created() {
      vmover.loadBanner(banners => {
        this.$set(this.$data, "banners", banners);
      });
      this.getHomePage();
      this.initScroll();
    },
    methods: {
      getHomePage() {
        if (this.isCanLoad) {
          this.isCanLoad = false;
          this.$set(this.$data, "loadingWord", "正在加载下一页");
          vmover.loadHomePage(this.curPage, videos => {
            if (videos.length > 0) {
              videos.forEach(item => {
                this.videos.push(item);
              });
              this.$set(this.$data, "videos", this.videos);
              this.curPage += 1;
              setTimeout(() => {
                this.isCanLoad = true;
                this.$set(this.$data, "loadingWord", "上拉加载下一页");
              }, 1000);
            } else {
              this.$set(this.$data, "loadingWord", "亲,数据加载完了");
            }
          });
        }
      },
      initScroll() {
        window.onscroll = () => {
          let clientHeight = document.documentElement.clientHeight;
          let scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
          let offsetHeight = document.body.offsetHeight;
          if (this.$refs.loading) {
            if (scrollTop + clientHeight > offsetHeight - 70) {
              this.getHomePage();
            }
          }
        };
      }
    },
    activated() {
      this.isCanLoad = true;
      document.title = "V电影|Vue by Frank";
      this.initScroll();
    },
    deactivated() {
      window.onscroll = null;
    }
  };
</script>
<style scoped>
  .main {
    background-color: black;
  }

  .search {
    padding: 10px 20px;
  }

  .search .jump {
    height: 40px;
    background-color: white;
    border-radius: 20px;
    color: black;
    text-align: center;
    line-height: 40px;
    letter-spacing: 2px;
    color: gray;
  }

  .slider-item a {
    display: inline-block;
    z-index: 99;
  }

  .item {
    position: relative;
  }

  .item .line1 {
    position: absolute;
    left: 10px;
    bottom: 50px;
    font-size: 14px;
  }

  .item .time {
    font-weight: bold;
    margin-right: 10px;
  }

  .item .line2 {
    position: absolute;
    left: 10px;
    bottom: 20px;
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }
</style>