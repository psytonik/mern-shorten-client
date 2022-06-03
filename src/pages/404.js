
import {Typography} from "@mui/material";
import React from 'react';
import {Link} from "react-router-dom";

const Error404 = () => {
	return (
		<>
			<div>
				<Typography variant='h1'>
					<Link to="/" className="nav-link">
						Shorten
					</Link>

				</Typography>
				<Typography variant='h4'>
					Make your URL short
				</Typography>
				<h1 className="text-uppercase">Page Not Found 404</h1>
			</div>
		</>

	);
};

export default Error404;
