<template>
  <div class="music-list">
    <div class="icon-wrapper">
      <i class="icon-back" @click="back"></i>
    </div>
    <h1 class="singer-name">{{singer.name}}</h1>
    <div class="singer-avatar" :style="bgStyle" ref="avatar">
      <div class="filter"></div>
    </div>
    <scroll class="list" :data="songs" ref="list" :probeType="probeType">
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
      probeType: 3
    };
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.singer.avatar})`;
    }
  },
  mounted() {
    this.$refs.list.$el.style.top = `${this.$refs.avatar.clientHeight}px`;
  },
  methods: {
    back() {
      this.$router.push('/singer');
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
      transform-origin: top
      background-size: cover
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(7, 17, 27, 0.4)
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      overflow: hidden
      background-color: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        top: 50%
        transform: translateY(-50%)
        width: 100%
</style>
