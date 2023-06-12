import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import './profile.css';

export default function UserCard({ userData, onUserDataChange }) {
    const editable = false;
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(userData);

    const handleIconClick = () => {
        setIsEditing(true);
    };

    const handleEmailChange = (e) => {
        console.log(isEditing);
        e.preventDefault();
        const { name, value } = e.target;
        setEditedData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = () => {
        // Handle the save logic here, update the user data with the edited information
        // and then set isEditing back to false to exit editing mode
        // For now, let's just log the edited email value
        onUserDataChange(editedData);
        setIsEditing(false);
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <MDBContainer className="py-5 h-75">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-4" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol
                                    md="4"
                                    className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                                >
                                    <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                        alt="Avatar"
                                        className="my-5"
                                        style={{ width: '80px' }}
                                        fluid
                                    />
                                    {isEditing ? (
                                        <input type="text" name="designation" classname="cardInputTransparent" value={editedData.designation} onChange={handleEmailChange} />
                                    ) : (
                                        userData.designation ?
                                            <MDBCardText>{userData.designation}</MDBCardText>
                                            :
                                            <MDBCardText>Software Engineer</MDBCardText>
                                    )}
                                    {isEditing ? (
                                        <MDBBtn color="primary" onClick={handleSaveClick}>
                                            Save
                                        </MDBBtn>
                                    ) : (
                                        <a href="#" onClick={handleIconClick}>
                                            <MDBIcon far icon="edit" className="mb-5" />
                                        </a>
                                    )}
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">FirstName</MDBTypography>
                                                {isEditing ? (
                                                    <input type="text" name="firstName" classname="cardInputTransparent" value={editedData.firstName} onChange={handleEmailChange} />
                                                ) : (
                                                    <MDBTypography tag="h6" className="text-muted">{userData.firstName} </MDBTypography>
                                                )}
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">LastName</MDBTypography>
                                                {isEditing ? (
                                                    <input type="text" name="lastName" classname="cardInputTransparent" value={editedData.lastName} onChange={handleEmailChange} />
                                                ) : (
                                                    <MDBTypography tag="h6" className="text-muted">{userData.lastName} </MDBTypography>
                                                )}
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                {isEditing && editable ? (
                                                    <input type="text" name="email" value={editedData.email} onChange={handleEmailChange} />
                                                ) : (
                                                    <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                                                )}
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                {isEditing ? (
                                                    <input type="text" name="phone" value={editedData.phone} onChange={handleEmailChange} />
                                                ) : (
                                                    userData.phone ?
                                                        <MDBCardText className="text-muted">{userData.phone}</MDBCardText>
                                                        :
                                                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                        <div className="d-flex justify-content-start">
                                            <a href="#!">
                                                <MDBIcon fab icon="facebook me-3" size="lg" />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon fab icon="twitter me-3" size="lg" />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon fab icon="instagram me-3" size="lg" />
                                            </a>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    )
}
