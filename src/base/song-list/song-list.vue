<template>
  <div class="song-list">
    <ul>
      <li class="song" v-for="(song,index) in songs" :key="index" @click="selectSong(song,index)">
        <h2 class="song-name">{{song.name}}</h2>
        <p class="desc">{{getDesc(song)}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    songs: {
      type: Array
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer} . ${song.album}`;
    },
    selectSong(song, index) {
      this.$emit('selectSong', song, index);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .song-list
    .song
      line-height: 20px
      height: 64px
      font-size: $font-size-medium
      .song-name
        no-wrap()
        color: $color-text
      .desc
        margin-top: 4px
        no-wrap()
        color: $color-text-d
</style>
