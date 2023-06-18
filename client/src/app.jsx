import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './app.css';
import SignUp from './Components/Register/SignUp';
import Navbar from './Components/Navbar';
import SignIn from './Components/Login/Signin';
import Home from './Components/Home';
import About from './Components/About/About';
import Profile from './Components/Profile/Profile';
import Forgot from './Components/Forgot/forgot';
import Reset from './Components/Forgot/reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useEffect } from 'preact/hooks';

const queryClient = new QueryClient();

export function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in (e.g., token exists in session storage)
    if (sessionStorage.getItem('user'))
      setLoggedIn(true);

    console.log(isLoggedIn);

  }, []);


  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn} />} />
            <Route path="/forgot" element={<Forgot setLoggedIn={setLoggedIn} />} />
            <Route path="/users/:username" element={<Profile />} />
            <Route path="/:token" element={<Reset setLoggedIn={setLoggedIn} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}


//use this to pass data from signin to profile prop
//<Route path="/:username" element={<ProfileWrapper />} />
// function ProfileWrapper() {
//   const location = useLocation();
//   const user = location.state && location.state.user;

//   return <Profile user={user} />;
// }
