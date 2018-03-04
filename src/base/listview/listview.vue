<template>
  <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
    <ul>
      <li class="list-group" v-for="(group,index) in data" :key="index" ref="listGroup">
        <h1 class="list-group-title">{{group.title}}</h1>
        <ul>
          <li class="list-group-item" v-for="(item,index) in group.items" :key="index">
            <span class="avatar">
              <img v-lazy="item.avatar" width="50" height="50" />
            </span>
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
  </scroll>
</template>
<script>
import scroll from 'base/scroll/scroll';
import { getData } from 'common/js/dom';
const ANCHOR_HEIGHT = 18;
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  components: {
    scroll
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      listHeight: [],
      probeType: 3
    };
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      });
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
    _scrollTo(index) {
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
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (!height2 || (-newY > height1 && -newY < height2)) {
          this.currentIndex = i;
          return;
        }
      }
      this.currentIndex = 0;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        line-height: 30px
        padding-left: 20px
        width: 100%
        height: 30px
        font-size: $font-size-small
        color: $color-text-l
        background-color: $color-highlight-background
      .list-group-item
        display: flex
        padding: 20px 0 0 30px
        align-items: center
        font-size: 0
        .avatar
          flex: 0 0 50px
          width: 50px
          height: 50px
          margin-right: 20px
          img
            border-radius: 50%
        .name
          display: flex
          flex-direction
          justify-content: center
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
      background-color: $color-background-d
      border-radius: 10px
      font-family: Helvetica
      .shortcut-item
        padding: 3px
        line-height: 1
        &.current
          color: $color-theme
</style>
