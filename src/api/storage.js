import { getItem, setItem, clearItem } from '@/utils/$storage'
const SEARCH_HISTORY = 'search_history'
const VIEW_HISTORY = 'view_history'

export function setSearchHistory (keyword) {
  let history = getItem(SEARCH_HISTORY)
  if (history === null) {
    history = []
    history.push(keyword)
  } else {
    if (history.indexOf(keyword) < 0) {
      history = [keyword, ...history]
    }
  }
  setItem(SEARCH_HISTORY, history)
}

export function getSearchHsitory () {
  return getItem(SEARCH_HISTORY) || []
}

export function setViewHistory (item) {
  let history = getItem(VIEW_HISTORY)
  if (!history) {
    history = []
    history.push(item)
  } else {
    let sameItem = history.find(x => x.postid === item.postid)
    if (!sameItem) {
      history.push(item)
    }
  }
  setItem(VIEW_HISTORY, history)
}

export function getViewHistory () {
  let history = getItem(VIEW_HISTORY) || []
  return history.map(item => {
    return {
      postid: item.postid,
      title: item.title,
      image: item.image,
      catename: item.cate[0],
      duration: item.duration,
      publishtime: item.publish_time,
      post_type: '1'
    }
  })
}

export function clearSearchHistory () {
  clearItem(SEARCH_HISTORY)
}

export function clearViewHistory () {
  clearItem(VIEW_HISTORY)
}
