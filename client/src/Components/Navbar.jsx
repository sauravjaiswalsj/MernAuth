import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Button, CssBaseline, Toolbar, Typography, Link, GlobalStyles } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'preact/hooks';

const defaultTheme = createTheme();

export default function Navbar({ isLoggedIn, setLoggedIn }) {
    const navigate = useNavigate();

    console.log('NavBar', isLoggedIn);

    const handleLogout = () => {
        // Perform logout logic here
        sessionStorage.removeItem('user');
        navigate('/');
        setLoggedIn(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' }, color: "#FFFFFF" }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{
                    color: "#FFFFFF",
                    //color: "#b1d3f4",
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                    backgroundColor: "rgb(27,41,65)"
                }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" onClick={() => navigate('/')} noWrap sx={{ flexGrow: 1 }}>
                        Authentication System
                    </Typography>
                    <nav styles={{ color: "#FFFFFF" }}>
                        <Link
                            color="inherit"
                            variant="button"
                            href="#"
                            sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
                            onClick={() => navigate('/signup')}
                        >
                            Register
                        </Link>
                        <Link
                            color="inherit"
                            variant="button"
                            href="/about"
                            sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
                        >
                            About
                        </Link>
                    </nav>
                    {isLoggedIn ? (
                        <Button variant="outlined" onClick={handleLogout} sx={{ my: 1, mx: 1.5 }}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="outlined" onClick={() => navigate('/signin')} sx={{ my: 1, mx: 1.5 }}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
