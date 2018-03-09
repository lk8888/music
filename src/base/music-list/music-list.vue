<template>
  <div class="music-list">
    <div class="icon-wrapper">
      <i class="icon-back" @click="back"></i>
    </div>
    <h1 class="singer-name">{{singer.name}}</h1>
    <div class="singer-avatar" :style="bgStyle" ref="avatar">
      <div class="play-wrapper" ref="playWrapper" v-show="songs.length>0">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll class="list" :data="songs" ref="list" :probe-type="probeType" @scroll="scroll" :listen-scroll="listenScroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import scroll from 'base/scroll/scroll';
import songList from 'base/song-list/song-list';
import loading from 'base/loading/loading';
import { prefixStyle } from 'common/js/dom';

const RESERVED_HEIGHT = 40;
const transform = prefixStyle('transform');
const backdrop = prefixStyle('backdrop-filter');
export default {
  props: {
    songs: {
      type: Array
    },
    singer: {
      type: Object
    }
  },
  components: {
    scroll,
    songList,
    loading
  },
   data() {
    return {
      scrollY: 0
    };
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.singer.avatar})`;
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    this.imageHeight = this.$refs.avatar.clientHeight;
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.$refs.avatar.clientHeight}px`;
  },
  methods: {
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    }
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(newY, this.minTranslateY);
      let zIndex = 0;
      let scale = 1;
      let blur = 0;
      let percent = Math.abs(newY / this.imageHeight);
      this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;
      if (newY < this.minTranslateY) {
        zIndex = 10;
        this.$refs.avatar.style.paddingTop = 0;
        this.$refs.avatar.style.height = `${RESERVED_HEIGHT}px`;
        this.$refs.playWrapper.style.display = 'none';
      } else {
        this.$refs.avatar.style.paddingTop = '70%';
        this.$refs.avatar.style.height = 0;
        this.$refs.playWrapper.style.display = '';
      }
      if (newY > 0) {
       scale = 1 + percent;
       zIndex = 10;
      } else {
        blur = Math.min(20 * percent, 20);
      }
      this.$refs.avatar.style.zIndex = zIndex;
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      this.$refs.avatar.style[transform] = `scale(${scale})`;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .music-list
    position: fixed
    top: 0
    bottom: 0
    left: 0
    z-index: 100
    width: 100%
    background-color: $color-background
    .icon-wrapper
      position: absolute
      top: 0
      left: 6
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .singer-name
      position: absolute
      top: 0
      left: 10%
      width: 80%
      z-index: 40
      line-height: 40px
      text-align: center
      no-wrap()
      color: $color-text
      font-size: $font-size-large
    .singer-avatar
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      text-align: center
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        width: 100%
        .play
          box-sizing: border-box
          padding: 7px 0
          margin: 0 auto
          text-align: center
          width: 135px
          border: 1px solid $color-theme
          border-radius: 100px
          color: $color-theme
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            font-size: $font-size-small
            vertical-align: middle
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      width: 100%
      height: 100%
      background-color: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background-color: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        top: 50%
        transform: translateY(-50%)
        width: 100%
</style>
