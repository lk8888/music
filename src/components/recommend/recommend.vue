<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="recomPlaylist" ref="recommendContent">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
              <slider>
                <div v-for="(item,index) in recommends" :key="index">
                  <a :href="item.linkUrl">
                    <img :src="item.picUrl" @load="loadImgage" />
                  </a>
                </div>
              </slider>
        </div>
        <div class="recommend-list">
          <h1 class="title">热门歌曲推荐</h1>
          <ul>
            <li class="recommend-item" v-for="(item,index) in recomPlaylist" :key="index">
              <div class="icon">
                <img v-lazy="item.cover" width="60" height="60" />
              </div>
              <div class="desc">
                <p class="text">{{item.title}}</p>
                <p class="listen_num">播放量: {{playVolume(item.listen_num)}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!recomPlaylist.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import { getRecommend, getHotMusic } from 'api/recommend';
import { ERR_OK } from 'api/config';
import slider from 'base/slider/slider';
import scroll from 'base/scroll/scroll';
import loading from 'base/loading/loading';
export default {
  components: {
    slider,
    scroll,
    loading
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
        }
      });
    },
    playVolume(num) {
      return num > 10000 ? (num / 10000).toFixed(1) + '万' : num;
    },
    loadImgage() {
      if (!this.checkloaded) {
        this.$refs.recommendContent.refresh();
        this.checkloaded = true;
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  .recommend
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .title
          line-height: 65px
          height: 65px
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
              margin-top: 10px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
