import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useState } from 'preact/hooks';
import forgot from '../../services/forgot';
import { useNavigate } from 'react-router-dom';

export default function Forgot({ setLoggedIn }) {

    const initialSignup = {
        email: '',
    }
    const [emailData, setEmailData] = useState(initialSignup);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmailData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!emailData.email) {
            { alert('Please fill in all the required fields') }
            return;
        }
        try {
            const res = await forgot(emailData)
            console.log(res);
            alert(res);
            setEmailData(initialSignup); // Reset the form fields to initial values
            setLoggedIn(false);
            navigate(`/signin`);
        }
        catch (error) {
            if (error.statusCode !== 201) {
                console.error(`Login Failed: ${error.errorText}`);

                alert(error.errorText);

                if (error.errorText.includes("exist")) {
                    setEmailData(initialSignup);
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

                <MDBCol col='4' md='6' className='forgot' style={{ marginTop: "5%" }}>
                    <form onSubmit={handleSubmit} noValidate >
                        <div style={{ alignItems: "center", justifyContent: "center" }}>
                            <h3 style={{ marginBottom: "30px" }}>Forgot Password</h3>
                            <MDBInput className="d-flex justify-content-between mb-4" wrapperClass='mb-4 w-50' label='Email address' id='email' type='email' size="lg" name="email"
                                autoComplete="email"
                                autoFocus
                                value={emailData.email}
                                onChange={handleChange} />

                            <div className="d-flex justify-content-between mb-4">
                                <a href="/signin">Remember password?</a>
                            </div>

                            <div className='text-center text-md-start mt-4 pt-2'>
                                <MDBBtn className="mb-0 px-5" size='lg'>Forgot</MDBBtn>
                                <p className="small fw-bold mt-4 pt-2 mb-2">Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
                            </div>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}