<template>
  <div class="home">
    <video-player  class="video-play-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        customEventName="customstatechangedeventname"

        @ready="playerReadied">
    </video-player>
    <!-- 自定义控件 -->
    <div class="video-play-custom">
      <div class="video-play-mask" @click="togglePopup">
        <van-icon class="video-play-button" v-if="playIconFlag" :name="playIcon" size="0.5rem" @click.stop="videoPlay"/>
      </div>
      <!-- 底部 -->
      <van-popup class="video-play-col" v-model="show" position="bottom" :style="{ height: '1.28rem' }" :overlay="false">
        <div class="video-col-list">

        </div>
        <div class="video-res-list">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swipe-item" v-for="item in resList" :key="item.id">
              <p class="video-res-item-con">{{item.name}}</p>
              <div class="video-res-item-mask"></div>
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
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'home',
  data(){
    return {
      show: false,
      playIcon: require('../assets/collection-icon-play.png'),
      playIconFlag: true,
      resList: [
        {id: '111',name: '第一页: 教育介绍', src: require('../assets/demo1.mp4')},
        {id: '222',name: '第二页: 数学(一)', src: require('../assets/demo2.mp4')},
        {id: '333',name: '第三页: 数学(二)', src: require('../assets/demo3.mp4')},
        {id: '444',name: '第四页: 科学', src: require('../assets/demo4.mp4')},
        {id: '555',name: '第五页: 艺术', src: require('../assets/demo5.mp4')},
        {id: '666',name: '第六页: 语言(一)', src: require('../assets/demo6.mp4')},
        {id: '777',name: '第七页: 语言(二)', src: require('../assets/demo7.mp4')},
        {id: '888',name: '第八页: 舞蹈', src: require('../assets/demo8.mp4')}
      ],
      playerOptions: {
          // videojs options
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,

        // playbackRates: [1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: require('../assets/demo1.mp4')
        }],
        loop: false,
        preload: true,
        // poster: require('../assets/logo.png'),
        controls: false
      },
      swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
        }
    }
  },
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Icon.name]: Icon,
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
  mounted() {

  },
  methods: {
    togglePopup (){
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
    playerReadied() {
      // console.log(111);
      // console.log('the player is readied', player)
    },
    videoPlay() {
      this.player.play();
      this.playIconFlag = false;
    }
  }
}
</script>
<style lang="less" scoped>
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
      background: rgba(255,255,255,0.6);
    }
    .video-res-list{

      .swipe-item{
        width: 1rem;
        height: 0.56rem;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        margin: 0 6px;

        .video-res-item-con{
          padding: 6px;
          font-size: 0.12rem;
          color: #000;
        }
      }
    }

  }
}


</style>