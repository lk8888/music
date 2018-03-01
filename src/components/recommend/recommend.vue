<template>
  <div class="recommend">
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
    </div>
  </div>
</template>
<script>
import { getRecommend } from 'api/recommend';
import { ERR_OK } from 'api/config';
import slider from 'base/slider/slider';
export default {
  components: {
    slider
  },
  data() {
    return {
      recommends: []
    };
  },
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .recommend
    .recommend-content
      .slider-wrapper
        position: relative
        text-align: center
</style>
