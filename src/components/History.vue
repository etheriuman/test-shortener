<template>
  <div class="history-wrapper">
    this is history
  </div>
</template>

<script>

export default {
  name: 'history',
  data() {
    return {
      history: []
    }
  },
  methods: {
    getHistory() {
      const urlParams = new URLSearchParams(window.location.search)
      const featureName = urlParams.get('feature')
      const featureData = JSON.parse(localStorage.getItem('featureData'))
      console.log(featureData, featureName)
    }
  },
  created() {
    this.getHistory()
  }
}
</script>

<style scoped>

</style>