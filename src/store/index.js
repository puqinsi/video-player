import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import BASE_URL from './base-url'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    popupFlag: false, //弹出层开关
    playIconFlag: true, //初始播放开关
    playFlag: false,  //声音播放开关
    playIndex: 0, //视频序数
    typeFlag: true, // 测试用 图false,视频true
    duration: '00:00',
    currentTime: '00:00',
    proValue: 0,  //进度百分数
    resList: [
      {id: '111',name: '幼儿教育介绍达力芬的弗兰克大师傅', src: require('../assets/demo1.mp4')},
      {id: '222',name: '数学教学(一)', src: require('../assets/demo2.mp4')},
      {id: '333',name: '数学教学(二)', src: require('../assets/demo3.mp4')},
      {id: '444',name: '科学教学', src: require('../assets/demo4.mp4')},
      {id: '555',name: '艺术教学', src: require('../assets/demo5.mp4')},
      {id: '666',name: '语言教学(一)', src: require('../assets/demo6.mp4')},
      {id: '777',name: '语言教学(二)', src: require('../assets/demo7.mp4')},
      {id: '888',name: '舞蹈教学', src: require('../assets/demo8.mp4')}
    ],
    playerImage: require('../assets/story04.png'),
  },
  mutations: {
    changePopup(state, flag) {
      state.popupFlag = flag;
    },
    changePlayIconFlag(state, flag) {
      state.playIconFlag = flag;
    },
    changePlayFlag(state, flag) {
      state.playFlag = flag;
    },
    changePlayIndex(state, index) {
      state.playIndex = index;
    },
    changeDuration(state, time) {
      state.duration = time;
    },
    changeCurrentTime(state, time) {
      state.currentTime = time;
    },
    changeProValue(state, proValue) {
      state.proValue = proValue;
    }
  },
  actions: {
    changePopup({ commit }, flag) {
      commit('changePopup',flag)
    },
    changePlayIconFlag({ commit }, flag) {
      commit('changePlayIconFlag', flag)
    },
    changePlayFlag({ commit }, flag) {
      commit('changePlayFlag',flag);
    },
    changePlayIndex({ commit }, index) {
      commit('changePlayIndex', index);
    },
    changeDuration({ commit }, time) {
      commit('changeDuration',time)
    },
    changeCurrentTime({ commit }, time) {
      commit('changeCurrentTime',time)
    },
    changeProValue({ commit }, proValue) {
      commit('changeProValue',proValue)
    } 
  }
})
