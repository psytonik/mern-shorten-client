
import {Box, Button, Container, CssBaseline, Typography} from "@mui/material";
import React from 'react';
import {Link} from "react-router-dom";

const Error404 = () => {
	return (
		<>
			<Container>
				<CssBaseline/>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography variant='h4'>
						Page Not Found 404
					</Typography>
					<Link to="/" style={{underline:'none', textDecoration:'none'}}>
						<Button variant="contained">
							Go Back
						</Button>
					</Link>
				</Box>
			</Container>
		</>

	);
};

export default Error404;
