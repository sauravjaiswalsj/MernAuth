import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CssBaseline, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Album() {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Authentication System
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Authentication is a concept of ensuring that the right people gets access to the information. The age old concept of lock and key has evolved into todays multi-variant authentication systems.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <br />
                            <br />
                            <Button variant="contained" onClick={() => navigate('/signup')}>Register</Button>
                            <Button variant="outlined" onClick={() => navigate('/signin')}>Login</Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
}