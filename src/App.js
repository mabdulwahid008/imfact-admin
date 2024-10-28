import React from 'react'
import MainLayout from './layout/MainLayout'
import Users from './pages/Users'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<>Hello</>} />
        <Route path="/customers-list" element={<Users />} />
        <Route path="/pending-customers" element={<Users />} />
        <Route path="/creators-list" element={<Users />} />
        <Route path="/pending-creators" element={<Users />} />
      </Routes>
      <ToastContainer transition={Zoom} position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </MainLayout>
  )
}

export default App
