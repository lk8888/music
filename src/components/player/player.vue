<template>
  <div class="player" v-show="playList.length>0">
    <div class="player-content" v-show="fullScreen">
      播放器页面
    </div>
    <div class="mini-player" v-show="!fullScreen"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters([
        'fullScreen',
        'playList'
      ])
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl';

  .player
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    .player-content
      wdith: 100%
      height: 100%
      background-color: $color-background
    .mini-player
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 10%
      background-color: $color-highlight-background
</style>
