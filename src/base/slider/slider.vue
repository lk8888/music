<template>
  <div class="slider">
    <div class="sliderShow">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .slider
    position: relative
    width: 100%
    .content-wrapper
      width: 100%
      overflow: hidden
      .content
        width: auto
        font-size: 0
        .content-item
          display: inline-block
</style>
