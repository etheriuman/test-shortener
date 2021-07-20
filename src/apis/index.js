import axios from 'axios'

const baseURL = 'https://api.pics.ee/v1/links'



const basicParams = {
  access_token: '20f07f91f3303b2f66ab6f61698d977d69b83d64'
}

export default {
  createShorternUrl(url) {
    const payload = {
      url
    }
    return axios.post(baseURL, payload , { params: basicParams })
  }
}