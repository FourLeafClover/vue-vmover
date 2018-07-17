const state = {
  pagePositions: [],
  scrollTop: 0,
  detailShowHome: true
}
const mutations = {
  ADD_POSITION (state, data) {
    var position = state.pagePositions.find(x => x.name === data.name)
    if (position) {
      position.position = data.position
    } else {
      state.pagePositions.push(data)
    }
  },
  CHANGE_SCROLLTOP (state, data) {
    state.scrollTop = data
  }
}
const actions = {
  ADD_POSITION ({ commit }, data) {
    commit('ADD_POSITION', data)
  },
  CHANGE_SCROLLTOP ({ commit }, el) {
    commit('CHANGE_SCROLLTOP', el.scrollTop)
  }
}

const getters = {
  getCurPosition: (state) =>
    (name) => {
      let p = state.pagePositions.find(x => x.name === name)
      return p ? p.position : 0
    },
  getScrollTop: (state) => {
    return state.scrollTop
  }
}

export default { namespaced: false, state: state, mutations: mutations, actions: actions, getters: getters }
