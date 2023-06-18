import React from "react";
import {
    MDBBadge,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBIcon,
    MDBBtn
} from "mdb-react-ui-kit";
import './about.css'

export default function App() {
    return (
        <MDBContainer className="py-5">
            <div className="main--4 text-white">
                <div className="-4 left-4">
                    <MDBCard className="gradient-custom">
                        <MDBCardBody className="p-5">
                            <MDBIcon fas icon="code-branch" size="2x" className="mb-3" />
                            <h4>Final Update</h4>
                            <p className="small text-white-50 mb-4">Auth</p>
                            <p>
                                Complete User Authentication has been developed using react and nodejs.
                                A user can Register and login along with the user can update their profile and perfom logout operation
                                <br />
                                <br />
                                <b>Tech:</b> <i>react, react-router-dom, react-query</i>
                            </p>
                            <MDBBadge className="text-black mb-0 me-1" color="light">
                                React
                            </MDBBadge>
                            <MDBBadge className="text-black mb-0" color="light">
                                Node
                            </MDBBadge>
                            <br />
                            <br />
                            <MDBIcon fas icon="code">
                            </MDBIcon>
                            <MDBBtn className="buttons" href="https://github.com/sauravjaiswalsj/MernAuth/" >
                                Github repo
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            </div>
        </MDBContainer>
    );
}
