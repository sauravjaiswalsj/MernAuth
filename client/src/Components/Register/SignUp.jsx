import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import './signup.css';
import signup from '../../services/signup';
import { useState } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const initialSignup = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    }
    const [userData, setSignUp] = useState(initialSignup);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignUp((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if any required fields are empty
        if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.username) {
            { alert('Please fill in all the required fields') }
            return;
        }

        try {
            const result = await signup(userData)
            setSignUp(initialSignup);
            navigate('/signin');
        }
        catch (error) {
            if (error.statusCode !== 201) {
                console.error(`Signup: ${error.errorText}`);

                alert(error.errorText);

                if (error.errorText.includes("exists")) {
                    setSignUp(initialSignup);
                    navigate('/signin');
                }
            } else {
                console.error(`Signup:${error}`);
            }
        }
    };

    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden w-100'>
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
                    <div className="overlay">
                        <h1 className="my-5 display-3 fw-bold ls-tight px-5" style={{ color: 'hsl(218, 81%, 95%)' }}>
                            Authentication <br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}> System Design</span>
                        </h1>
                    </div>
                </MDBCol>

                <MDBCol md='5' className='position-relative' id='profileCard'>

                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                    <form noValidate onSubmit={handleSubmit}>
                        <MDBCard className='my-5 bg-glass' >
                            <MDBCardBody className='p-5' >
                                <MDBRow>
                                    <MDBCol col='6'>
                                        <MDBInput
                                            autoComplete="given-name"
                                            autoFocus
                                            wrapperClass='mb-4'
                                            label='First name'
                                            id='firstName'
                                            type='text'
                                            name='firstName'
                                            required
                                            value={userData.firstName}
                                            onChange={handleChange}

                                        />
                                    </MDBCol>

                                    <MDBCol col='6'>
                                        <MDBInput
                                            wrapperClass='mb-4'
                                            required
                                            label='Last name'
                                            id='lastName'
                                            type='text'
                                            name='lastName'
                                            value={userData.lastName}
                                            autoComplete="family-name"
                                            onChange={handleChange}

                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBInput
                                    wrapperClass='mb-4'
                                    required
                                    label='username'
                                    id='username'
                                    type='text'
                                    name='username'
                                    value={userData.username}
                                    autoComplete="family-name"
                                    onChange={handleChange}

                                />

                                <MDBInput
                                    wrapperClass='mb-4'
                                    required
                                    label='Email'
                                    id='email'
                                    type='email'
                                    name="email"
                                    autoComplete="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    required
                                    label='Password'
                                    id='password'
                                    type='password'
                                    name="password"
                                    autoComplete="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                />

                                <MDBBtn className='w-50 mb-4 buttonB align-items-center justify-content-center' size='md'>sign up</MDBBtn>

                                <div className="text-center">

                                    <p>or sign up with:</p>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='facebook-f' size="sm" />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='twitter' size="sm" />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='google' size="sm" />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='github' size="sm" />
                                    </MDBBtn>

                                </div>

                            </MDBCardBody>
                        </MDBCard>
                    </form>
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}
