import React, { useLayoutEffect } from 'react'
import MainLayout from './layout/MainLayout'
import Users from './pages/Users'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ROUTES } from './constants/route'
import Login from './pages/Login'
import Loader from './components/Loader'
import { getMyProfile } from './services/employeeServices'

function App() {
  const [user, setUser] = React.useState(null)

  useLayoutEffect(() => {
    if(localStorage.getItem('admintoken')){
        const getME = async () => {
            const data = await getMyProfile();
            setUser(data);
        }
        getME()
    }
  }, [])

  if (!localStorage.getItem('admintoken'))
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    )


  else if (!user && localStorage.getItem('admintoken'))
    return (
      <div className='h-screen'>
        <Loader />
      </div>
  )

  if(user)
  return (
    <MainLayout>
      <Routes>
        {ROUTES.map((section) => (
          <>
            {section.routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component ? route.component : section.component}
              />
            ))}
            {section.nested?.routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component ? route.component : section.component}
              />
            ))}
          </>
        )
        )}
      </Routes>
      <ToastContainer transition={Zoom} position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </MainLayout>
  )
}

export default App

