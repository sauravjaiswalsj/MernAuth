import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './app.css';
import SignUp from './Components/Register/SignUp';
import Navbar from './Components/Navbar';
import SignIn from './Components/Login/Signin';
import Home from './Components/Home';
import Profile from './Components/Profile/Profile';

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<ProfileWrapper />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ProfileWrapper() {
  const location = useLocation();
  const user = location.state && location.state.user;

  return <Profile user={user} />;
}
