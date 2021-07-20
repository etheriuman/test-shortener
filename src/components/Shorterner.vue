<template>
  <div class="shorterner-wrapper">
    <div class="input-wrapper mb-4">
      <input v-model="url" class="form-control" type="text" placeholder="請輸入目標網址" />
    </div>
    <div v-if="shorternUrl" class="shortern-url-wrapper text-center mb-3">
      <p>您的短網址是：</p>
      <p id="shortern-url" >{{ shorternUrl }}</p>
    </div>
    <div class="actions-wrapper">
      <button @click.prevent="copyShorternUrl" v-if="shorternUrl" type="button" class="btn btn-sm btn-warning mb-3">複製短網址</button>
      <button @click.prevent="createShorternUrl" type="button" class="btn btn-sm btn-dark">產生短網址</button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import apis from './../apis'

export default {
  name: 'shorterner',
  data() {
    return {
      url: '',
      shorternUrl: ''
    }
  },
  methods: {
    async createShorternUrl() {
      try {
        if (!this.url) {
          this.sweetAlert('warning', '請填入網址！')
          return
        }
        const { data } = await apis.createShorternUrl(this.url)
        this.shorternUrl = data.data.picseeUrl
        this.setLocalFeatureData()
        this.sweetAlert('success', '您的網址已經縮短！')
      } catch(error) {
        console.log(error)
        this.sweetAlert('error', '無法取得結果，請輸入有效網址！')
        this.url = ''
      }
    },
    copyShorternUrl() {
      const range = document.createRange()
      const shorternUrl = document.querySelector('#shortern-url')
      range.selectNode(shorternUrl)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      this.sweetAlert('success', '已複製到剪貼簿！')
    },
    setLocalFeatureData() {
      // get feature data from local
      let featureData = JSON.parse(localStorage.getItem('featureData')) || []
      // get feature name from url
      const urlParams = new URLSearchParams(window.location.search)
      const featureName = urlParams.get('feature')
      // no feature
      if (featureName === null) {
        return
      }
      // no this feature
      if (!featureData.some(feature => feature.featureName === featureName)) {
        featureData = [
          ...featureData,
          {
            featureName,
            featureLinkCount: 1,
            featureLinks: [
              {
                url: this.url,
                shorternUrl: this.shorternUrl
              }
            ]
          }
        ]
      }
      // over links limit
      if (featureName !== 'admin' && featureData.find(feature => feature.featureName === featureName).featureLinkCount >= 3) {
        this.sweetAlert('warning', '超出次數！')
        return
      }
      // add link
      // 這邊我沒有存到 featureData 中所以沒有更新上去 QQ..
      featureData.map(feature => {
        if (feature.featureName === featureName) {
          return {
            ...feature,
            featureLinkCount: feature.featureLinkCount + 1,
            featureLinks: [
              ...feature.featureLinks,
              {
                url: this.url,
                shorternUrl: this.shorternUrl
              }
            ]
          }
        }
        return feature
      })
      // set to local again
      localStorage.setItem('featureData', JSON.stringify(featureData))
    },
    sweetAlert(icon, title) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
      })
      Toast.fire({
        icon,
        title
      })
    }
  }
}
</script>

<style scoped>
.shorterner-wrapper {
  height: 30%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.actions-wrapper {
  display: flex;
  flex-flow: column;
}
</style>