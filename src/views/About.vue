<template>
  <div class="home">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide class="swipe-item" v-for="(item, index)  in resList" :key="item.id">
        <p class="res-item-type">视频</p>
        <p class="res-item-con" v-if="maskFlag[index]">{{item.name}}</p>
        <p class="res-item-con res-item-con-active" v-else>{{item.name}}</p>
        <div class="res-item-mask" v-show="maskFlag[index]"></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
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
        {id: '111',name: '幼儿教育介绍达力芬的弗兰克大师傅', src: require('../assets/demo1.mp4')},
        {id: '222',name: '数学教学(一)', src: require('../assets/demo2.mp4')},
        {id: '333',name: '数学教学(二)', src: require('../assets/demo3.mp4')},
        {id: '444',name: '科学教学', src: require('../assets/demo4.mp4')},
        {id: '555',name: '艺术教学', src: require('../assets/demo5.mp4')},
        {id: '666',name: '语言教学(一)', src: require('../assets/demo6.mp4')},
        {id: '777',name: '语言教学(二)', src: require('../assets/demo7.mp4')},
        {id: '888',name: '舞蹈教学', src: require('../assets/demo8.mp4')}
      ],
      maskFlag: [false,true,true,true,true,true,true,true],
      playerOptions: {
          // videojs options
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,

        // playbackRates: [1.0, 1.5, 2.0],
        sources: [
          {type: "video/mp4",src: require('../assets/demo1.mp4')},
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
          centeredSlides: true,
          centeredSlidesBounds: true
        }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  created() {
    this.playerOptions.sources[0].src = this.resList[0].src;
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>

      .swiper-container{
        // padding: 0 0.27rem;
        width: 100%;
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

</style>