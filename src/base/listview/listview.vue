<template>
  <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
    <ul>
      <li class="list-group" v-for="(group,index) in data" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item,index) in group.items" :key="index" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="shortcutList" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="shortcut-item" v-for="(item,index) in shortcutList" :key="index" :data-index="index" :class="{'current':currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="listFixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script>
import scroll from 'base/scroll/scroll';
import loading from 'base/loading/loading';
import { getData } from 'common/js/dom';
const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  components: {
    scroll,
    loading
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      listHeight: [],
      probeType: 3,
      diff: -1
    };
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return;
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
    }
  },
  created() {
    this.touch = {};
    this.listenScroll = true;
  },
  methods: {
    onShortcutTouchStart(el) {
      let anchorIndex = getData(el.target, 'index');
      let firstTouch = el.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(el) {
      let firstTouch = el.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      this._scrollTo(anchorIndex);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    selectItem(item) {
      this.$emit('selectItem', item);
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    _calculateHeight() {
      this.listHeight = [];
      let groupList = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < groupList.length; i++) {
        let item = groupList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currntIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }
      // 当滚动到底部， 且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.listFixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'

  .listview
    position: relative
    top: 0
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-highlight-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        line-height: 30px
        padding-left: 20px
        width: 100%
        height: 30px
        font-size: $font-size-small
        color: $color-text-l
        background-color: $color-background
      .list-group-item
        display: flex
        box-sizing: border-box
        padding: 20px 0 0 30px
        align-items: center
        font-size: 0
        .avatar
          flex: 0 0 50px
          width: 50px
          height: 50px
          margin-right: 20px
          border-radius: 50%
        .name
          flex: 1
          font-size: $font-size-medium
          color: $color-text-l
    .shortcutList
      position: absolute
      top: 50%
      transform: translateY(-50%)
      right: 0
      z-index: 30
      padding: 20px 0
      width: 20px
      text-align: center
      color: $color-text-l
      font-size: $font-size-small
      background-color: $color-hightlight-background-d
      border-radius: 10px
      font-family: Helvetica
      .shortcut-item
        padding: 3px
        line-height: 1
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        background-color: $color-background
        font-size: $font-size-small
        color: $color-text-l
    .loading-container
      position: absolute
      top: 50%
      transform: translateY(-50%)
      width: 100%
</style>
