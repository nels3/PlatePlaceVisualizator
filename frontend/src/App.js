import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from 'src/components/navbar/Navbar'

import PlatesList from 'src/pages/PlatesList'
import PlateMap from 'src/pages/PlateMap'
import StatisticsList from 'src/pages/StatisticsList'

import 'src/App.css'
import 'src/static/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<PlatesList />} />;
        <Route exact path='/map' element={<PlateMap />} />;
        <Route exact path='/stats' element={<StatisticsList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
