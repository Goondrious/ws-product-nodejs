import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/custom.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartBar, faChartArea, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'

library.add(faChartBar, faChartArea, faGlobeAmericas)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
