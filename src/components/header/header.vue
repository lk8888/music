<template>
  <div class="header">
    <div class="icon"></div>
    <div class="title">Music</div>
    <i class="icon-mine"></i>
  </div>
</template>
<script>
  export default {};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable.styl"
  .header
    position: relative
    width: 100%
    height: 44px
    text-align: center
    font-size: 0
    color: $color-theme
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      margin-right: 9px
      width: 30px
      height: 32px
      bg-image('logo')
      background-size: 30px 32px
    .title
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .icon-mine
      position: absolute
      top:10px
      right: 10px
      font-size: $font-size-small
</style>
