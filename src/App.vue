<template>
  <div id="app">
    <v-header></v-header>
    <tab></tab>
    <router-view/>
  </div>
</template>

<script>
import header from 'components/header/header';
import tab from 'components/tab/tab';
export default {
  components: {
    'v-header': header,
    tab
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
