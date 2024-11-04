import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPlusSquare, faHeart,faClock,faUser,faEyeSlash, faEye
} from '@fortawesome/free-regular-svg-icons'

import {
  faCheckDouble, faMapMarkerAlt, faCircle, faSearch, faArrowRight, 
   faAngleRight, faAngleLeft, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faPlusSquare,faHeart,faCheckDouble,faClock,faMapMarkerAlt,faUser,faCircle, faSearch, faArrowRight,
   faEyeSlash, faSignOutAlt,faEye,faAngleRight,faAngleLeft
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.use(VueCookies, { expires: '7d', secure: 'true', sameSite: 'Lax' })

const userInfos = ref(
  $cookies.get('userInfos') || {
    username: '',
    token: ''
  }
)
const changeUserInfos = (infos) => {
  userInfos.value = infos
}

app.provide('GlobalStore', { userInfos: userInfos, changeUserInfos: changeUserInfos })

app.mount('#app')