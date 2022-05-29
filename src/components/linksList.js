import React from "react";
import {MDBTable,MDBTableHead,MDBTableBody} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

const LinksList = ({links}) => {
	if(!links){
		return <p>No Links</p>
	}
	return (
		<div >
			<h1 className="text-center mt-3">Your Shorted Links</h1>
			<MDBTable hover striped align="middle" responsive>
				<MDBTableHead>
				<tr className='table-primary'>
					<th scope='col'>#</th>
					<th scope='col'>Long Link</th>
					<th scope='col'>Short Link</th>
					<th scope='col'>Action</th>
				</tr>
				</MDBTableHead>
				<MDBTableBody>
				{ links && links.map((link,ind)=>{
					return(
						<tr key={ind} >
							<td scope='row'>{ind+1}</td>
							<td scope='row'>{link.from}</td>
							<td scope='row'>{link.to}</td>
							<td scope='row'>
								<Link to={`/detail/${link._id}`}>Open</Link>
							</td>
						</tr>
					)
				})}
				</MDBTableBody>
			</MDBTable>
		</div>
	);
}

export default LinksList;
