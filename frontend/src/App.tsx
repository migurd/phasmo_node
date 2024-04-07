// FUNCTIONALITIES
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Role } from '../../backend/src/Models/enums'
// MODULES
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import UserMenu from './components/User/UserMenu/UserMenu'
import AdminMenu from './components/Admin/AdminMenu/AdminMenu'
import Background from './components/Decoration/Background/Background'
import Frame from './components/Decoration/Frame/Frame'
import SheetLogin from './components/Decoration/Sheets/SheetLogin.tsx/SheetLogin'
import Sheet from './Interfaces/Sheet'
import Banner from './components/Decoration/Banner/Banner'
// CSS
import './App.css'
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
</style>

export default function App() {

  // When using axios, this is needed
  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role>(Role.notAsigned);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/login");
        if (response.data.loggedIn) {
          setIsLoggedIn(true)
          if (Role.admin === response.data.user.role) {
            setUserRole(Role.admin);
            console.log("When eres admin (╯‵□′)╯︵┻━┻");
          } else {
            setUserRole(Role.user);
            console.log("When eres user :'v");
          }
        } else {
          console.log("Log in, NOW!");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserRole();
  }, []);

  const loginSheets: Sheet[] = [
    { title: "Login", path: "/login", element: <Login /> },
    { title: "Register", path: "/register", element: <Register /> },
  ]

  return (
    <div className="App">
      <Background />
      <Frame />
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path='/' element={<Navigate to={'login'} />}></Route>
            <Route path="login" element={
              <>
                <Banner title="PHASMOPHOBIA" /> 
                <SheetLogin sheets={loginSheets} />
              </>
            }/>
            <Route path="register" element={
              <>
                <Banner title="PHASMOPHOBIA" /> 
                <SheetLogin sheets={loginSheets} />
              </>
            }/>
            <Route path='*' element={<Navigate to={'/'} replace />}></Route>
          </>
        ) : (
          userRole === Role.user ? (
            <>
              <Route path='/user'>
                <Route path='/user/user_menu' element={
                  <>
                    <Banner title="USER PHASMO" />
                    <UserMenu />
                  </>
                }></Route>
              </Route>

              <Route path="*" element={<Navigate to="/user/user_menu" replace />} />
            </>
          ) : (
            <>
              <Route path='/admin'>
                <Route path='/admin/admin_menu' element={
                  <>
                  <Banner title="ADMIN PHASMO" />
                  <AdminMenu />
                  </>
                }></Route>
              </Route>

              <Route path="*" element={<Navigate to="/admin/admin_menu" replace />} />
            </>
          )
        )
      }
      {/* <Route path='*' element={<Navigate to="/login" />} /> */}
    </Routes>
    </div>
  )
}