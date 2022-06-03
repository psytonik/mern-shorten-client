import {
	TableContainer,
	Table,
	Button,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Container,
	Typography, Box
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
					marginTop: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography variant="h4" component="h4">Your Shorted Links</Typography>
				<TableContainer >
					<Table>
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
									<tr key={ind} >
										<td >{ind+1}</td>
										<td >{link.from.substring(0,75)}...</td>
										<td >{link.to}</td>
										<td >
											<Link to={`/detail/${link._id}`} style={{textDecoration:'none'}}>
												<Button >Open</Button>
											</Link>
										</td>
									</tr>
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
