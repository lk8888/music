<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24" />
    <p class="text">{{text}}</p>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '正在载入...'
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  .loading
    width: 100%
    text-align: center
    .text
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
