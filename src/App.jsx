import { useState } from 'react'

import './App.css'
import Header from './component/Header'
import RequisitionForm from './component/RequisitionForm'
import { Toaster } from 'react-hot-toast'
import Report from './component/Report'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
      {/* <RequisitionForm />
      <Report /> */}

      <Routes>
        <Route path='/' element={<RequisitionForm />} />
        <Route path='/report' element={<Report />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App

