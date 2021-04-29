import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    user_type:0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_TYPE: (state, user_type) => {
    state.user_type = user_type
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { number, password, user_type } = userInfo
    return new Promise((resolve, reject) => {
      login({ number: number.trim(), password: password, user_type: user_type }).then(response => {
        // debugger
        // const { data } = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)

        const { token } = response
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // debugger
        // const { data } = response

        // if (!data) {
        //   return reject('Verification failed, please Login again.')
        // }

        // const { name, avatar } = data

        if (!response) {
          return reject('Verification failed, please Login again.')
        }
        const { name, user_type } = response

        commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_USER_TYPE', user_type)
        // resolve(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

