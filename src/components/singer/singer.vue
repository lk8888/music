<template>
  <div class="singer">
    <listview :data="singers" @selectItem="selectSinger"></listview>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingers } from 'api/singer';
import { ERR_OK } from 'api/config';
import { mapMutations } from 'vuex';
import Singer from 'common/js/Singer';
import listview from 'base/listview/listview';

const HOT_NAME = '热门';
const HOT_SINGER_LENGTH = 10;
export default {
  components: {
    listview
  },
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingers();
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSingers() {
      getSingers().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }));
        }
        let key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }));
      });
      // 为了得到有序列表，处理map
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
