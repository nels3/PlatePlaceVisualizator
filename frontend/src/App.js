import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from 'src/components/navbar/Navbar'

import PlatesList from 'src/pages/PlatesList'
import PlateMap from 'src/pages/PlateMap'
import StatisticsList from 'src/pages/StatisticsList'
import World from 'src/pages/World'

import 'src/App.css'
import 'src/static/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<PlatesList />} />;
          <Route exact path='/map' element={<PlateMap />} />;
          <Route exact path='/stats' element={<StatisticsList />} />;
          <Route exact path='/world' element={<World />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
