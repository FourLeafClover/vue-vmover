import axios from "../utils/axios"
import common from "../service/common"

let loadBanner = (cb) => {
    axios.get("/apiv3/index/getBanner?type=7").then((response) => {
        let result = [];
        if (response.msg == "OK" && response.data) {
            response.data.forEach(item => {
                if (item.extra_data.app_banner_type == 2) {
                    result.push({
                        image: item.image,
                        postId: item.extra_data.app_banner_param
                    });
                }
            })
        }
        cb(result);
    });
}

let loadHomePage = (page, cb) => {
    axios.get(`/apiv3/post/getPostByTab?p=${[page]}&tab=latest`).then((response) => {
        let result = [];
        if (response.msg == "OK" && response.data) {
            response.data.forEach(item => {
                if (item.post_type == "1") {
                    result.push({
                        postid: item.postid,
                        title: item.title,
                        image: item.image,
                        catename: item.cates[0].catename,
                        duration: common.convertDuration(item.duration),
                        publishtime: common.formatDate(item.publish_time * 1000, "yyyy/MM/dd")
                    });
                }
            });
        }
        cb(result);
    });
}

let loadCates = (cb) => {
    axios.get(`/apiv3/cate/getList`).then((response) => {
        let result = [];
        if (response.data) {
            result = response.data;
        }
        cb(response.data);
    });
}

let loadVideo = (postid, cb) => {
    axios.get(`/apiv3/post/view?postid=${postid}`).then((response) => {
        let result = null;
        if (response.status != "-1") {
            response.data.duration = common.convertDuration(response.data.duration);
            result = response.data;
        }
        cb(result);
    });
}

let loadCateVideos = (cateid, page, cb) => {
    axios.get(`apiv3/post/getPostInCate?cateid=${cateid}&p=${page}&tab=latest`).then(response => {
        let result = [];
        if (response.data) {
            response.data.forEach(item => {
                // type = 1 表示视频
                if (item.post_type == 1) {
                    result.push({
                        title: item.title,
                        image: item.image,
                        duration: common.convertDuration(item.duration),
                        postid: item.postid,
                        catename: (item.cate && item.cate.length > 0) ? item.cate[0].catename : ""
                    });
                }
            });
        }
        return cb(result);
    });
}

let search = (keyword, page, cb) => {
    axios.get(`apiv3/search?kw=${keyword}&p=${page}&tab=latest`).then(response => {
        let result = [];
        if (response.data) {
            response.data.forEach(item => {
                result.push({
                    title: item.title,
                    image: item.image,
                    duration: common.convertDuration(item.duration),
                    postid: item.postid,
                    catename: (item.cate && item.cate.length > 0) ? item.cate[0].catename : "",
                    post_type: item.post_type
                });
            });
        }
        return cb(result);
    });
}

export default {
    loadBanner: loadBanner,
    loadHomePage: loadHomePage,
    loadCates: loadCates,
    loadVideo: loadVideo,
    loadCateVideos: loadCateVideos,
    search: search
}