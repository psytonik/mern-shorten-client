import {MDBContainer, MDBIcon, MDBTypography} from "mdb-react-ui-kit";
import React from 'react';
import {Link} from "react-router-dom";

const Error404 = () => {
	return (
		<>
			<MDBContainer className=" d-flex align-items-center justify-content-center" fluid style={{height:"90vh"}}>
				<MDBTypography tag='h1' colorText="info">
					<Link to="/" className="nav-link">
						Shorten <MDBIcon fas icon="brain"/>
					</Link>

				</MDBTypography>
				<MDBTypography tag='h4' colorText="secondary" className="pb-3">
					Make your URL short
				</MDBTypography>
				<h1 className="text-uppercase">Page Not Found 404</h1>
			</MDBContainer>
		</>

	);
};

export default Error404;
