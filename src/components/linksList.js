import {TableContainer, Table, Button, TableHead, TableRow, TableCell, TableBody, Container} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const LinksList = ({links}) => {
	if(!links){
		return <p>No Links</p>
	}
	return (
		<Container>
			<h1 className="text-center mt-3">Your Shorted Links</h1>
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
										<Link to={`/detail/${link._id}`}>
											<Button >Open</Button>
										</Link>
									</td>
								</tr>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}

export default LinksList;
