import React from 'react'
import MainLayout from './layout/MainLayout'
import Users from './pages/Users'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserDetail from './pages/UserDetail'
import OrderList from './pages/OrderList'
import CampaignList from './pages/CampaignList'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<>Hello</>} />
        <Route path="/customers-list" element={<Users />} />
        <Route path="/pending-customers" element={<Users />} />
        <Route path="/creators-list" element={<Users />} />
        <Route path="/pending-creators" element={<Users />} />
        <Route path="/user/:nickname/:_id" element={<UserDetail />} />

        <Route path="/all-orders" element={<OrderList />} />
        <Route path="/active-orders" element={<OrderList />} />
        <Route path="/submitted-orders" element={<OrderList />} />
        <Route path="/disputed-orders" element={<OrderList />} />

        <Route path="/all-campaigns" element={<CampaignList />} />
        <Route path="/recruiting-campaigns" element={<CampaignList />} />
        <Route path="/active-campaigns" element={<CampaignList />} />
        <Route path="/approving-campaigns" element={<CampaignList />} />
        <Route path="/buffer-campaigns" element={<CampaignList />} />


      </Routes>
      <ToastContainer transition={Zoom} position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </MainLayout>
  )
}

export default App

