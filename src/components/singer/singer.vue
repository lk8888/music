<template>
  <div class="singer">
    <div class="title">热门</div>
    <div class="singer-container">
      <ul>
        <li class="singer-item" v-for="(item,index) in singers" :key="index">
          <span class="avatar">
            <img :src="item.avatar" />
          </span>
          <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getSinger } from 'api/singer';
import { ERR_OK } from 'api/config';
import Singer from 'common/js/Singer';

const HOT_NAME = '热门';
const HOT_SINGER_LENGTH = 10;
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSinger();
  },
  methods: {
    _getSinger() {
      getSinger().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
          console.log(this.singers);
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
    }
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
    .title
      line-height: 25px
      padding-left: 15px
      width: 100%
      height: 25px
      font-size: $font-size-small
      color: $color-text-d
      background-color: $color-highlight-background
    .singer-container
      .singer-item
        display: flex
        align-items: center
        padding: 20px 20px 0 20px
        .icon
          flex: 0 0 60px
          width: 60px
          height: 60px
          margin-right: 20px
          border-radius: 50%
          background: #fff
          text-align: center
          color: #333
          line-height: 60px
        .name
          display: flex
          flex-direction: column
          justify-conent: center
          flex: 1
          font-size: $font-size-medium
          color: $color-text-l
</style>
