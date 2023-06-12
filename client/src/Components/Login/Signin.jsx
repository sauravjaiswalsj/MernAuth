import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useState } from 'preact/hooks';
import signin from '../../services/signin';
import { useNavigate } from 'react-router-dom';
import setSessionData from '../../services/setSessionData';

export default function Signin({ setLoggedIn }) {

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
            const res = await signin(loginData)
            const result = JSON.parse(res);
            setSignIn(initialSignup); // Reset the form fields to initial values
            setSessionData(result.username + 334231);
            setLoggedIn(true);
            navigate(`/users/${result.username}`);
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
        <MDBContainer fluid className="p-3 my-5 h-custom ">
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6' className='login' style={{ marginTop: "5%" }}>
                    <form onSubmit={handleSubmit} noValidate >
                        <div style={{ alignItems: "center", justifyContent: "center" }}>
                            <h3 style={{ marginBottom: "30px" }}>Login</h3>
                            <MDBInput className="d-flex justify-content-between mb-4" wrapperClass='mb-4 w-50' label='Email address' id='email' type='email' size="lg" name="email"
                                autoComplete="email"
                                autoFocus
                                value={loginData.email}
                                onChange={handleChange} />
                            <MDBInput wrapperClass='mb-4 w-50' label='Password' id='password' type='password' size="lg" name="password"
                                autoComplete="current-password"
                                value={loginData.password}
                                onChange={handleChange} />

                            <div className="d-flex justify-content-between mb-4">
                                <a href="!#">Forgot password?</a>
                            </div>

                            <div className='text-center text-md-start mt-4 pt-2'>
                                <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
                                <p className="small fw-bold mt-4 pt-2 mb-2">Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
                            </div>

                            <div className="d-flex flex-row">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                <MDBBtn floating size='md' tag='a' className='me-2'>
                                    <MDBIcon fab icon='facebook-f' />
                                </MDBBtn>

                                <MDBBtn floating size='md' tag='a' className='me-2'>
                                    <MDBIcon fab icon='twitter' />
                                </MDBBtn>

                                <MDBBtn floating size='md' tag='a' className='me-2'>
                                    <MDBIcon fab icon='linkedin-in' />
                                </MDBBtn>

                            </div>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}