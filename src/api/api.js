import axios from '@/utils/$http'

export function loadBanner (cb) {
  axios.get('/apiv3/index/getBanner?type=7').then((response) => {
    let result = []
    if (response.msg === 'OK' && response.data) {
      response.data.forEach(item => {
        if (item.extra_data.app_banner_type === '2') {
          result.push({
            image: item.image,
            postId: item.extra_data.app_banner_param
          })
        }
      })
    }
    cb(result)
  })
}

export function loadHomePage (page, cb) {
  axios.get(`/apiv3/post/getPostByTab?p=${[page]}&tab=latest`).then((response) => {
    let result = []
    if (response.msg === 'OK' && response.data) {
      response.data.forEach(item => {
        result.push({
          postid: item.postid,
          title: item.title,
          image: item.image,
          catename: item.cates[0].catename,
          duration: item.duration,
          publishtime: item.publish_time,
          post_type: item.post_type
        })
      })
    }
    cb(result)
  })
}

export function loadCates (cb) {
  axios.get(`/apiv3/cate/getList`).then((response) => {
    cb(response.data)
  })
}

export function loadVideo (postid, cb) {
  axios.get(`/apiv3/post/view?postid=${postid}`).then((response) => {
    let result = null
    if (response.status !== '-1') {
      result = response.data
    }
    cb(result)
  })
}

export function loadCateVideos (cateid, page, cb) {
  axios.get(`apiv3/post/getPostInCate?cateid=${cateid}&p=${page}&tab=latest`).then(response => {
    let result = []
    if (response.data) {
      response.data.forEach(item => {
        // type = 1 表示视频
        result.push({
          title: item.title,
          image: item.image,
          duration: item.duration,
          postid: item.postid,
          catename: (item.cate && item.cate.length > 0) ? item.cate[0].catename : '',
          post_type: item.post_type
        })
      })
    }
    return cb(result)
  })
}

export function search (keyword, page, cb) {
  axios.get(`apiv3/search?kw=${keyword}&p=${page}&tab=latest`).then(response => {
    let result = []
    if (response.data) {
      response.data.forEach(item => {
        result.push({
          title: item.title,
          image: item.image,
          duration: item.duration,
          postid: item.postid,
          catename: (item.cate && item.cate.length > 0) ? item.cate[0].catename : '',
          post_type: item.post_type
        })
      })
    }
    return cb(result)
  })
}
