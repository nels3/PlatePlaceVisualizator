import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from 'src/components/navbar/Navbar'

import PlatesList from 'src/pages/PlatesList'

import 'src/App.css'
import 'src/static/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<PlatesList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
