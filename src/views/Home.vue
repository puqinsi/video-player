<template>
  <div class="home">
    <header>
      <img src="../assets/icon-back-orange.png" alt="" @click="goBack">
    </header>
    <video-player class="video-play-box" v-show="typeFlag"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        customEventName="customstatechangedeventname"

        @play="onPlayerPlay"
        @pause="onPlayerPause"
        @ended="onPlayerEnded"
        @waiting="onPlayerWaiting($event)" 
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @ready="playerReadied">
    </video-player>
    <van-image v-show="!typeFlag"
      width="100%"
      height="100%"
      fit="contain"
      :src="playerImage"
    />
    <!-- 自定义控件 -->
    <div class="video-play-custom">
      <div class="video-play-mask" @click="togglePopup">
        <img class="video-play-button" v-if="playIconFlag" src="../assets/collection-icon-play.png" @click.stop="videoInitPlay" alt="">
      </div>
      <!-- 底部 -->
      <van-popup class="video-play-col" v-model="popupFlag" position="bottom" :style="{ height: '1.28rem' }" :overlay="false">
        <div class="video-col-list">
          <div class="video-col-button">
            <van-icon v-show="!playFlag" name="play-circle" size="0.32rem" color="#FDAA3D" @click="togglePlay"/>
            <van-icon v-show="playFlag" name="pause-circle" size="0.32rem" color="#FDAA3D" @click="togglePlay"/>
          </div>
          <div class="video-col-progress">
            <van-slider v-model="proValue" bar-height="4px" active-color="#FDAA3D" @change="changePro">
              <div class="video-col-pro-dot" slot="button"></div>
            </van-slider>
          </div>
          <div class="video-col-time">
            <span>{{currentTime}}/{{duration}}</span>  
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
import { Slider } from 'vant';
import { Image } from 'vant';

import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

Number.prototype.formatTime=function(){
    // 计算
    let i=0,s=parseInt(this);
    if(s>60){
        i=parseInt(s/60);
        s=parseInt(s%60);
    }
    // 补零
    let zero=function(v){
        return (v>>0)<10?"0"+v:v;
    };
    return [zero(i),zero(s)].join(":");
};

export default {
  name: 'home',
  data(){
    return {
      playerOptions: {
          // videojs options
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,

        // playbackRates: [1.0, 1.5, 2.0],
        sources: [
          {type: "video/mp4",src: ''},
          // {type: "image/png",src: require('../assets/logo.png')},
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
        }
      }
    }
  },
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Slider.name]: Slider,
    [Image.name]: Image,

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
    },
    popupFlag: {
      get() {
        return this.$store.state.popupFlag;
      },
      set(v) {
        this.$store.dispatch('changePopup', v);
      }
    },
    playIconFlag(){
      return this.$store.state.playIconFlag;
    },
    playFlag(){
      return this.$store.state.playFlag;
    },
    playIndex(){
      return this.$store.state.playIndex;
    },
    typeFlag(){
      return this.$store.state.typeFlag;
    },
    duration(){
      return this.$store.state.duration;
    },
    currentTime(){
      return this.$store.state.currentTime;
    },
    proValue: {
      get() {
        return this.$store.state.proValue;
      },
      set(v) {
        this.$store.dispatch('changeProValue', v);
      }
    },
    resList(){
      return this.$store.state.resList;
    },
    playerImage(){
      return this.$store.state.playerImage;
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
    onPlayerPlay() {
      window.console.log('player play!')
      this.$store.dispatch('changePlayFlag', true)
    },
    onPlayerPause() {
      window.console.log('player pause!')
      this.$store.dispatch('changePlayFlag', false)
    },
    onPlayerWaiting(player) {
      window.console.log('the player is waiting', player)
    },
    onPlayerLoadeddata(player) {
      window.console.log('the player is loaded')

      let duration = Number(player.duration()).formatTime();
      let currentTime = Number(player.currentTime()).formatTime();
      
      this.$store.dispatch('changeDuration',duration);
      this.$store.dispatch('changeCurrentTime',currentTime);

      if(!this.playIconFlag){
        player.play();
      }
    },
    onPlayerTimeupdate() {
      // window.console.log('the player is timeupdate')
      this.changeProTime();
    },
    onPlayerEnded() {
      window.console.log('the player is ended')
      let index = this.playIndex+1;

      if(index < this.resList.length){
        this.switchRes(this.playIndex);
        this.$store.dispatch('changePlayIndex', index);
      }
    },
    // 视频控件操作
    // 控件进度条
    changePro() {
      let duration = this.player.duration();
      let currentTime = duration*this.proValue/100;
      window.console.log(currentTime,duration,currentTime/duration*100+'%')

      this.player.currentTime(currentTime);
    },
    // 控件进度时间
    changeProTime() {
      let duration = this.player.duration();
      let currentTime = this.player.currentTime();

      let proValue = currentTime/duration*100;
      let fDuration = Number(duration).formatTime();
      let fCurrentTime = Number(currentTime).formatTime();
      
      this.$store.dispatch('changeProValue', proValue)
      this.$store.dispatch('changeDuration',fDuration);
      this.$store.dispatch('changeCurrentTime',fCurrentTime);
    },
    // 控件播放按钮
    togglePlay() {
      if(this.playFlag){
        this.player.pause();
      }else{
        this.player.play();
      }
    },
    // 其他操作
    goBack() {
      window.console.log('返回');
    },
    // 初始播放
    videoInitPlay() {
      this.player.play();

      this.$store.dispatch('changePlayIconFlag', false);

      this.$store.dispatch('changePopup', true);
      setTimeout( ()=>{
        this.$store.dispatch('changePopup', false);
      },1500)
    },
    // 弹出层切换
    togglePopup() {
      window.console.log(this.popupFlag);
      if(this.popupFlag == false){
        if(!this.playIconFlag){
          window.console.log('show');
          this.$store.dispatch('changePopup', true);
        }
      }else{
        window.console.log('hide');
        this.$store.dispatch('changePopup', false);
      }
    },
    selRes() {
      let clickedIndex = this.swiper.clickedIndex;
      if(clickedIndex || clickedIndex == 0){
        this.$store.dispatch('changePlayIndex', clickedIndex);
        this.switchRes(clickedIndex);
        setTimeout( ()=>{
          this.$store.dispatch('changePopup', false);
        },1500)
      }else{
        window.console.log(clickedIndex);
      }
    },
    // 切换资源时调用
    switchRes(resIndex) {
      window.console.log(resIndex);
  
      this.playerOptions.sources[0].src = this.resList[resIndex].src;
      // 注意测试能不能自动切换播放
    }
  }
}
</script>
<style lang="less">
.home{
  height: 100%;
  background: #000;
}
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
        .video-col-pro-dot{
          width: 12px;
          height: 12px;
          background: #FDAA3D;
          border-radius: 12px;
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