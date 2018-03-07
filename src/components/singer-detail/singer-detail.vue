<template>
  <transition name="slide">
    <music-list :songs="songs" :singer="singer"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import musicList from 'base/music-list/music-list';
import { getSongs } from 'api/singer';
import { ERR_OK } from 'api/config';
import { createSong } from 'common/js/song';
export default {
  components: {
    musicList
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    ...mapGetters([
        'singer'
    ])
  },
  created() {
    this._getSongs(this.singer.id);
  },
  methods: {
    _getSongs(singerid) {
      if (!this.singer.id) {
        this.$router.push('/singer');
      }
      getSongs(singerid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item) => {
        let { musicData } = item;
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
    .slide-enter-active, .slide-leave-active
      transition: all 0.3s
    .slide-enter, .slide-leave-to
      transform: translate3d(100%, 0, 0)
</style>
