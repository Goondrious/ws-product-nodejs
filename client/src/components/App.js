import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Navigation from './Navigation'
import DailyData from './DailyData/DailyData'
import HourlyData from './HourlyData/HourlyData'
import GeoData from './GeoData/index'
import './App.scss'

const App = () => {
  return (
    <main className='App'>
      <Navigation/>
      <Switch>
        <Route path='/dailydata' component={ DailyData }/>
        <Route path='/hourlydata' component={ HourlyData }/>
        <Route path='/geodata' component={ GeoData }/>
        <Route path='/' component={ Home }/>
      </Switch>
    </main>
  )
}

export default App
