// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import signup from '../services/signup';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useState } from 'preact/hooks';
// import { useNavigate } from 'react-router-dom';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://sauravjaiswalsj.vercel.app">
//                 Saurav Jaiswal
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const defaultTheme = createTheme();

// export default function SignUp() {
//     const initialSignup = {
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: ''
//     }
//     const [userData, setSignUp] = useState(initialSignup);
//     const navigate = useNavigate();

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setSignUp((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     }
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Check if any required fields are empty
//         if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
//             { alert('Please fill in all the required fields') }
//             return;
//         }

//         try {
//             const result = await signup(userData)
//             setSignUp(initialSignup);
//         }
//         catch (error) {
//             if (error.statusCode !== 201) {
//                 console.error(`Signup: ${error.errorText}`);

//                 alert(error.errorText);

//                 if (error.errorText.includes("exists")) {
//                     setSignUp(initialSignup);
//                     navigate('/signin');
//                 }
//             } else {
//                 console.error(`Signup:${error}`);
//             }
//         }
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         marginTop: 15,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Sign up
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     autoComplete="given-name"
//                                     name="firstName"
//                                     required
//                                     fullWidth
//                                     id="firstName"
//                                     label="First Name"
//                                     value={userData.firstName}
//                                     onChange={handleChange}
//                                     autoFocus
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="lastName"
//                                     label="Last Name"
//                                     name="lastName"
//                                     value={userData.lastName}
//                                     autoComplete="family-name"
//                                     onChange={handleChange}
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="email"
//                                     label="Email Address"
//                                     name="email"
//                                     autoComplete="email"
//                                     value={userData.email}
//                                     onChange={handleChange}
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="password"
//                                     label="Password"
//                                     type="password"
//                                     id="password"
//                                     value={userData.password}
//                                     autoComplete="new-password"
//                                     onChange={handleChange}
//                                 />
//                             </Grid>
//                         </Grid>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             Sign Up
//                         </Button>
//                         <Grid container justifyContent="flex-end">
//                             <Grid item>
//                                 <Link href="/signin" variant="body2" >
//                                     Already have an account? Sign in
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//                 <Copyright sx={{ mt: 25 }} />
//             </Container>
//         </ThemeProvider>
//     );
// }


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'preact/hooks';
import signin from '../services/signin';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://sauravjaiswalsj.vercel.app//">
                Saurav Jaiswal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignIn() {

    const initialSignup = {
        email: '',
        password: ''
    }
    const [loginData, setSignIn] = useState(initialSignup);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignIn((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!loginData.email || !loginData.password) {
            { alert('Please fill in all the required fields') }
            return;
        }

        try {
            const result = await signin(loginData)
            console.log(result);
            setSignIn(initialSignup); // Reset the form fields to initial values
        }
        catch (error) {
            if (error.statusCode !== 201) {
                console.error(`Login Failed: ${error.errorText}`);

                alert(error.errorText);

                if (error.errorText.includes("exist")) {
                    setSignIn(initialSignup);
                    navigate('/signup');
                }
            } else {
                console.error(`Login: ${error}`);
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={loginData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth

                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            value={loginData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 25, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

