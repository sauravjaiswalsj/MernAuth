import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useState } from 'preact/hooks';
import resetPassword from '../../services/resetPassword';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function reset({ setLoggedIn }) {

    const initialSignup = {
        password: '',
    }
    const [passwordData, setPasswordData] = useState(initialSignup);
    let [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswordData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        let token = searchParams.get('token')
        setSearchParams(token);

        if (!passwordData.password) {
            { alert('Please fill in all the required fields') }
            return;
        }
        try {
            const res = await resetPassword(passwordData, token)
            console.log(res);
            alert(res);
            setPasswordData(initialSignup); // Reset the form fields to initial values
            setLoggedIn(false);
            navigate(`/signin`);
        }
        catch (error) {
            if (error.statusCode !== 201) {
                console.error(`Login Failed: ${error.errorText}`);

                alert(error.errorText)

                if (error.errorText.includes("exist")) {
                    setPasswordData(initialSignup);
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
                            <MDBInput className="d-flex justify-content-between mb-4" wrapperClass='mb-4 w-50' label='password' id='password' type='password' size="lg" name="password"
                                autoComplete="password"
                                autoFocus
                                value={passwordData.password}
                                onChange={handleChange} />

                            <div className='text-center text-md-start mt-4 pt-2'>
                                <MDBBtn className="mb-0 px-5" size='lg'>Reset</MDBBtn>
                            </div>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}