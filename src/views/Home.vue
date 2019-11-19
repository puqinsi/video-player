<template>
  <div class="home">
    <header>
      <img src="../assets/icon-back-orange.png" alt="" @click="goBack">
    </header>
    <video-player  class="video-play-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        customEventName="customstatechangedeventname"

        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)" 
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @ready="playerReadied">
    </video-player>
    <!-- 自定义控件 -->
    <div class="video-play-custom">
      <div class="video-play-mask" @click="togglePopup">
        <img class="video-play-button" v-if="playIconFlag" src="../assets/collection-icon-play.png" @click.stop="videoInitPlay" alt="">
      </div>
      <!-- 底部 -->
      <van-popup class="video-play-col" v-model="show" position="bottom" :style="{ height: '1.28rem' }" :overlay="false">
        <div class="video-col-list">
          <div class="video-col-button">
            <van-icon v-if="!playFlag" name="play-circle" size="0.32rem"/>
            <van-icon v-else name="pause-circle" size="0.32rem"/>
          </div>
          <div class="video-col-progress">
            <!-- <van-progress :percentage="50" stroke-width="4" track-color="#fff" color="#FDAA3D" /> -->
            <div class="video-col-pro-bottom">
              <span class="video-col-pro-top"></span>
              <span class="video-col-pro-dot"></span>
            </div>
          </div>
          <div class="video-col-time">
            <span>03:46 / 09:08</span>  
          </div>
        </div>
        <div class="video-res-list">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swipe-item" v-for="(item, index)  in resList" :key="item.id">
              <p class="res-item-type">视频</p>
              <p class="res-item-con" v-if="playIndex != index">{{item.name}}</p>
              <p class="res-item-con res-item-con-active" v-else>{{item.name}}</p>
              <div class="res-item-mask" v-show="playIndex != index"></div>
            </swiper-slide>
          </swiper>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Popup } from 'vant';
import { Button } from 'vant';
import { Icon } from 'vant';
import { Progress } from 'vant';

import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'home',
  data(){
    return {
      show: true, //弹出层开关
      playIconFlag: true, //初始播放开关
      playFlag: false,  //声音播放开关
      playIndex: 0,
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
      playerOptions: {
          // videojs options
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,

        // playbackRates: [1.0, 1.5, 2.0],
        sources: [
          {type: "video/mp4",src: ''},
        ],
        loop: false,
        preload: true,
        // poster: require('../assets/logo.png'),
        controls: false
      },
      swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          spaceBetween: 12,
          slidesPerView: 'auto',
          observer:true,
          on:{
            click: this.selRes
          },
        }
    }
  },
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    videoPlayer,
    swiper,
    swiperSlide
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  created() {
    this.playerOptions.sources[0].src = this.resList[0].src;
  },
  methods: {
    // listen event
    playerReadied() {
      window.console.log('the player is readied')
    },
    onPlayerPlay(player) {
      window.console.log('player play!', player)
    },
    onPlayerPause(player) {
      window.console.log('player pause!', player)
    },
    onPlayerWaiting(player) {
      window.console.log('the player is waiting', player)
    },
    onPlayerLoadeddata(player) {
      window.console.log('the player is loaded', player)
      if(!this.playIconFlag){
        player.play();
      }
    },
    onPlayerTimeupdate(player) {
      window.console.log('the player is timeupdate', player)
    },
    onPlayerEnded(player) {
      window.console.log('the player is ended', player)
      this.playIndex++;
      if(this.playIndex < this.resList.length){
        this.switchRes(this.playIndex);
      }
    },

    goBack() {
      window.console.log('返回');
    },
    // 初始播放
    videoInitPlay() {
      this.player.play();
      this.playIconFlag = false;
    },
    // 弹出层切换
    togglePopup() {
      if(this.show == false){
        if(!this.playIconFlag){
          window.console.log('show');
          this.show = true;
        }
      }else{
        window.console.log('hide');
        this.show = false;
      }
    },
    selRes() {
      var clickedIndex = this.swiper.clickedIndex;
      if(clickedIndex){
        this.show = false;
        this.playIndex = clickedIndex;
        this.switchRes(clickedIndex);
      }else{
        window.console.log(clickedIndex);
      }
    },
    // 切换资源时调用
    switchRes(resIndex) {
      window.console.log(resIndex);
  
      this.playerOptions.sources[0].src = this.resList[resIndex].src;
    }
  }
}
</script>
<style lang="less">
header{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  img{
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    left: 20px;
    top: 20px
  }
}
.video-play-custom{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // 播放按钮
  .video-play-mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  
    .video-play-button{
      width: 0.5rem;
      height: 0.5rem;
      background: #fff;
      border-radius: 0.5rem;
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%,-50%);
    }
  }
  // 播放控制器
  .video-play-col{
    background-color: rgba(0,0,0,0.6);
    .video-col-list{
      height: 0.6rem; 
      overflow: hidden;
      .video-col-button{
        float: left;
        margin: 0.12rem 0.12rem 0 0.24rem;
        font-size: 0;
      }
      .video-col-progress{
        float: left;
        width: 5.08rem;
        margin: 0.26rem 0.12rem 0 0;
        .video-col-pro-bottom{
          width: 100%;
          height: 4px;
          border-radius: 4px;
          background: #fff;
          position: relative;
          .video-col-pro-top{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 4px;
            background: #FDAA3D;
          }
          .video-col-pro-dot{
            width: 12px;
            height: 12px;
            background: #FDAA3D;
          }
        }
      }
      .video-col-time{
        float: left;
        margin-top: 0.2rem;
        font-size: 0;
        span{
          font-size: 11px;
          line-height: 16px;
          color: #fff;
        }
      }
    }
    .video-res-list{
      .swiper-container{
        padding: 0 0.27rem;
        .swipe-item{
          width: 1rem;
          height: 0.56rem;
          background: rgba(255,255,255,1);
          border-radius: 4px;
          border: 2px solid #F8BE71;
          // position: relative;
          .res-item-con{
            padding: 6px 6px 0;
            font-size: 0.12rem;
            color: #8E8E93;
            text-align: left;
            
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
          }
          .res-item-con-active{
            color: #FF9500;
          }
          .res-item-type{
            width: 0.33rem;
            height: 0.16rem;
            background: #FDAA3D;
            font-size: 9px;
            color: #fff;
            text-align: center;
            margin-top: 6px;
          }
          .res-item-mask{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.3);
          }
        }
      }
    }

  }
}
</style>