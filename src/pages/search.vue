<template>
  <div class="main" ref="wrapper">
    <div class="list">
       <div class="item" v-for="video in videos" :key="video.postid" v-if="video.post_type=='1'">
           <router-link :to="{ path: '/video/detail',query:{ postid:video.postid } }">
               <img style="width:100%" :src="video.image" />
           </router-link> 
           <div class="line1">
             <span class="time">{{video.duration}}</span>
             <span class="catename">#{{video.catename}}</span>
           </div>
           <div class="line2">{{video.title}}</div>           
       </div>
       <div ref="loading" v-if="videos.length>1">
           <loading :loadingWord="loadingword"></loading>
       </div>
    </div>
  </div>
</template>
<script>
import vmover from "../service/vmover";
import loading from "../component/loading";
export default {
  data() {
    return {
      videos: [],
      curPage: 1,
      isCanLoad: true,
      loadingword: "上拉加载下一页",
      keyword: ""
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    document.title = this.keyword + "|搜索|V电影";
    this.getPageData();
    this.initScroll();
  },
  components: {
    loading: loading
  },
  methods: {
    initScroll() {
      window.onscroll = () => {
        let clientHeight = document.documentElement.clientHeight;
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        let offsetHeight = document.body.offsetHeight;
        if (this.$refs.loading) {
          if (scrollTop + clientHeight > offsetHeight - 30) {
            this.getPageData();
          }
        }
      };
    },
    getPageData() {
      if (this.isCanLoad) {
        this.isCanLoad = false;
        this.$set(this.$data, "loadingword", "正在加载下一页");
        vmover.search(this.keyword, this.curPage, videos => {
          if (videos.length > 0) {
            videos.forEach(item => {
              this.videos.push(item);
            });
            this.$set(this.$data, "videos", this.videos);
            this.curPage += 1;
            setTimeout(() => {
              this.isCanLoad = true;
              this.$set(this.$data, "loadingword", "上拉加载下一页");
            }, 1000);
          } else {
            this.$set(this.$data, "loadingword", "亲,数据加载完毕了");
          }
        });
      }
    }
  },
  activated() {
    this.initScroll();
    if (this.$route.query.keyword != this.keyword) {
      document.title = this.$route.query.keyword + "|搜索|V电影";
      this.videos = [];
      this.curPage = 1;
      this.isCanLoad = true;
      this.keyword = this.$route.query.keyword;
      this.getPageData();
    }
  }
};
</script>
<style scoped>
.main {
  height: 100%;
}

.item {
  position: relative;
  min-width: 250px;
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