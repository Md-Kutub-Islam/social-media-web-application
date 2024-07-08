import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Login from './scenes/loginPage/Login';
import Home from './scenes/homePage/Home';
import ProfilePage from './scenes/profilePage/Profile';
import { useMemo } from 'react';
import {  useSelector } from 'react-redux';
import {CssBaseline, ThemeProvider} from '@mui/material'
import {createTheme} from '@mui/material';
import { themeSettings } from './theme';
import FriendRoute from './scenes/friendListPage/FriendRoute';
import UpdateProfilePage from './scenes/updateProfilePage/UpdateProfilePage';
// import UpdateUserRoute from './scenes/updateProfilePage/UpdateUserRoute';

function App() {

  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))
  // const {_id} = useSelector((state) => state.user)
  
  // if (!user) {
  //   return <div>Loading...</div>;
  // }
  // const  = user

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />  {/* This is use to reset the css */}
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={ isAuth ?  <Home /> : <Navigate to="/"/>} />
            <Route path='/profile/:id' element={ isAuth ? <ProfilePage /> : <Navigate to="/"/>} />
            <Route path='/friends/:id' element={ isAuth ? <FriendRoute /> : <Navigate to="/" /> }/>
            <Route path='/update/:id' element={ isAuth ? <UpdateProfilePage /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
