<template>
  <div class="song-list">
    <ul>
      <li class="song" v-for="(song,index) in songs" :key="index">
        <h2 class="song-name">{{song.name}}</h2>
        <p class="desc">{{getDesc(song)}}</p>
      </li>
    </ul>
    <div class="loading-container" v-show="!songs.length">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import loading from 'base/loading/loading';
export default {
  props: {
    songs: {
      type: Array
    }
  },
  components: {
    loading
  },
  methods: {
    getDesc(song) {
      return `${song.singer}.${song.album}`;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  .song-list
    position: relative
    top: 0
    padding: 30px 20px
    z-index: 20
    box-sizing: border-box
    width: 100%
    height: 100%
    .song
      padding-bottom: 15px
      font-size: $font-size-medium-x
      &:last-child
        padding-bottom: 0
      .song-name
        line-height: 32px
        color: $color-text
      .desc
        line-height: 18px
        color: $color-text-l
    .loading-container
      position: absolute
      top: 50%
      transform: translateY(-50%)
      width: 100%
</style>
