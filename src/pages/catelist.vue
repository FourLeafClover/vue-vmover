<template>
  <div class="main" ref="wrapper">
    <div class="list">
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
      curCateId: 0
    };
  },
  created() {
    this.curCateId = this.$route.params.id;
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
        vmover.loadCateVideos(this.curCateId, this.curPage, videos => {
          if (videos.length > 0) {
            document.title = videos[0].catename + "|频道|V电影";
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
    // 如果Id号切换就重新加载
    if (this.$route.params.id != this.curCateId) {
      this.videos = [];
      this.curPage = 1;
      this.isCanLoad = true;
      this.curCateId = this.$route.params.id;
      this.getPageData();
    }
  },
  deactivated() {
    window.onscroll = null;
  }
};
</script>
<style scoped>
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