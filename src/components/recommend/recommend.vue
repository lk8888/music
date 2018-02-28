<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <slider>
          <div v-for="item in recommends">
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
      recommends: [1, 2, 3]
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
    text-align: center
</style>
