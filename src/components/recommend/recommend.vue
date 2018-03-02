<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
            <slider>
              <div v-for="(item,index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" />
                </a>
              </div>
            </slider>
      </div>
      <div class="recommend-list">
        <h1 class="title">热门歌曲推荐</h1>
        <ul>
          <li class="recommend-item" v-for="(item,index) in recomPlaylist" :key="index">
            <div class="icon">
              <img :src="item.cover" width="60" height="60" />
            </div>
            <div class="desc">
              <p class="text">{{item.title}}</p>
              <p class="listen_num">播放量: {{toUnit(item.listen_num)}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import { getRecommend, getHotMusic } from 'api/recommend';
import { ERR_OK } from 'api/config';
import slider from 'base/slider/slider';
export default {
  components: {
    slider
  },
  data() {
    return {
      recommends: [],
      recomPlaylist: []
    };
  },
  created() {
    this._getRecommend();
    this._getHotMusic();
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getHotMusic() {
      getHotMusic().then((res) => {
        if (res.code === ERR_OK) {
          this.recomPlaylist = res.recomPlaylist.data.v_hot;
          console.log(res.recomPlaylist.data.v_hot);
        }
      });
    },
    toUnit(num) {
      if (num < 10000) {
        return;
      }
      return (num / 10000).toFixed(1) + '万';
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.recommend, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  .recommend
    position: absolute
    top: 88px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .recommend-content
      .recommend-list
        .title
          line-height: 48px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .recommend-item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            margin-right: 20px
            height: 60px
          .desc
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .listen_num
              color: #999
</style>
