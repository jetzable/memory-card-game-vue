import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


/* add icons to the library */
library.add(fas)

const app = createApp(App);
// eslint-disable-next-line vue/multi-word-component-names
app.component('fa', FontAwesomeIcon);
app.mount('#app')
