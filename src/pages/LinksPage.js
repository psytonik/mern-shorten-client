import {Box, Container, Grid, Paper} from "@mui/material";
import React, {useCallback, useContext, useEffect, useState} from "react";
import LinksList from "../components/linksList.js";
import Loader from "../components/loader.js";

import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";


export const LinksPage = () => {
	const [links, setLinks] = useState(null);
	const {request, loading} = useHttp();
	const {token} = useContext(AuthContext)

	const getLinks = useCallback(async () => {
		try {
			const data = await request(`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/link`, 'GET', null, {Authorization: `Bearer ${token}`})
			setLinks(data);
		} catch (e) {
		}
	}, [token, request])

	useEffect(() => {
		getLinks().then(r => r)
	}, [getLinks])

	if (loading) {
		return <Loader/>
	}
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				height: '90vh',
				overflow: 'auto',
			}}
		>
			<Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
				<Grid item xs={12}>
					<Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}} elevation={3}>
						{!loading && <LinksList links={links}/>}
					</Paper>
				</Grid>
			</Container>
		</Box>

	)
}

