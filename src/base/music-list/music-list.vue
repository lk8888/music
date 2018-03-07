<template>
  <div class="music-list">
    <div class="icon-wrapper">
      <i class="icon-back" @click="back"></i>
    </div>
    <h1 class="singer-name">{{singer.name}}</h1>
    <div class="singer-avatar" ref="avatar">
      <img :src="singer.avatar" />
      <div class="filter"></div>
    </div>
    <scroll class="list" :data="songs" ref="list" :probeType="probeType">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script>
import scroll from 'base/scroll/scroll';
import songList from 'base/song-list/song-list';
export default {
  props: {
    songs: {
      type: Array
    },
    singer: {
      type: Object
    }
  },
  data() {
    return {
      probeType: 3
    };
  },
  components: {
    scroll,
    songList
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
  .music-list
    position: fixed
    top: 0
    bottom: 0
    left: 0
    z-index: 50
    width: 100%
    overflow: hidden
    background-color: $color-background
    .icon-wrapper
      position: absolute
      top: 15px
      left: 15px
      z-index: 40
      .icon-back
        font-size: $font-size-medium-x
        color: $color-theme
    .singer-name
      position: absolute
      top: 15px
      left: 50%
      transform: translateX(-50%)
      z-index: 40
      white-space:nowrap
      font-size: $font-size-large
      color: $color-text
    .singer-avatar
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      z-index: 30
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(7, 17, 27, 0.4)
    .list
      position: absolute
      bottom: 0
      z-index: 20
      width: 100%
</style>
