import {
	TableContainer,
	Table,
	Button,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Container,
	Box, Typography
} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const LinksList = ({links}) => {

	if(!links){
		return <p>No Links</p>
	}

	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<TableContainer >
					<Typography variant="h6" component="h6" color="primary" gutterBottom>Your Shorted Links</Typography>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell scope='col'>#</TableCell>
								<TableCell scope='col'>Original Link</TableCell>
								<TableCell scope='col'>Short Link</TableCell>
								<TableCell scope='col'>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ links && links.map((link,ind)=>{
								return(
									<TableRow key={ind} >
										<TableCell >{ind+1}</TableCell>
										<TableCell >{link.from.substring(0,75)}...</TableCell>
										<TableCell >{link.to}</TableCell>
										<TableCell >
											<Link to={`/detail/${link._id}`} style={{textDecoration:'none'}}>
												<Button >Open</Button>
											</Link>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Container>
	);
}

export default LinksList;
