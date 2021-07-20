<template>
  <div id="app">
    <div class="title text-center my-5">
      <h2>picsee短網址產生器</h2>
    </div>
    <Shorterner />
    <History />
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Shorterner from './components/Shorterner.vue'
import History from './components/History.vue'

export default {
  name: 'App',
  components: {
    Shorterner,
    History
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  font-size: 15px;
}
p, span {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

@media screen and (min-width: 768px) {

}
</style>
