<template>
	<div class="footer clearfix">
        <div>
            <div class="item" :class="{'active':activeId=='1'}">
                   <router-link to="/">首页</router-link>
            </div>
        </div>
        <div>
            <div class="item" :class="{'active':activeId=='2'}">
                <router-link to="/cate">频道</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "loading",
  props: {
    activeId: {
      type: String
    }
  }
};
</script>

<style scoped>
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: black;
  z-index: 9999;
}

.footer div {
  width: 50%;
  float: left;
  margin-bottom: 5px;
  text-align: center;
}

.footer .item {
  padding-top: 8px;
  color: gray;
  padding-bottom: 5px;
  width: 40px;
  margin-left: 50%;
  transform: translateX(-50%);
}

.footer .item a {
  color: gray;
  font-size: 16px;
  font-weight: bold;
}

.footer .item.active a {
  color: white;
}

.footer .item.active {
  border-bottom: 2px solid white;
}

.clearfix:after {
  /*最简方式*/
  content: "";
  display: block;
  clear: both;
}
</style>