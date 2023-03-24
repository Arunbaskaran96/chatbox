import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Portal from './Components/Portal';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Users from './Pages/Users';
import Messages from './Pages/Messages';
import Friends from './Pages/Friends';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';
import ViewUser from './Pages/ViewUser';
import FriendsView from './Pages/FriendsView';
import Allmessages from './Pages/Allmessages';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='/topbar' element={<Portal/>}>
        <Route path='users' element={<Users/>}></Route>
        <Route path='messages/:id' element={<Messages/>}></Route>
        <Route path='friends' element={<Friends/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='viewuser/:id' element={<ViewUser/>}></Route>
        <Route path='friendsview/:id' element={<FriendsView/>}></Route>
        <Route path='allmessages' element={<Allmessages/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
