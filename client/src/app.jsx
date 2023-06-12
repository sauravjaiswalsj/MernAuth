import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './app.css';
import SignUp from './Components/Register/SignUp';
import Navbar from './Components/Navbar';
import SignIn from './Components/Login/Signin';
import Home from './Components/Home';
import Profile from './Components/Profile/Profile';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/users/:username" element={<Profile />} />
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
