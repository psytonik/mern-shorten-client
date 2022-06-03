import BlurCircularSharpIcon from '@mui/icons-material/BlurCircularSharp';
import MenuIcon from '@mui/icons-material/Menu';
import {AppBar, Box, Button, Container, IconButton, Menu, Toolbar, Typography} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.js";

const NavBar = () => {
	const history = useHistory();
	const {logOut} = useContext(AuthContext);

	const logOutHandler = event => {
		event.preventDefault();
		logOut();
		history.push('/')
	}

	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};


	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/*LEFT LOGO*/}

					<Link to="/" style={{textDecoration: 'none', color: 'white'}}>
						<Typography
							variant="h5"
							noWrap
							component="h5"
							sx={{
								mr: 2,
								display: {xs: 'none', md: 'flex'},
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								textDecoration: 'none',
							}}
						>
							Sh<BlurCircularSharpIcon size="medium"/>rten
						</Typography>
					</Link>

					<Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: {xs: 'block', md: 'none'},
							}}
						>

							<Link to='/create' style={{textDecoration: 'none'}}>
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography textAlign="center">
										Create
									</Typography>
								</MenuItem>
							</Link>

							<Link to='/links' style={{textDecoration: 'none'}}>
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography textAlign="center">
										Links
									</Typography>
								</MenuItem>
							</Link>

							<Link to="/" onClick={logOutHandler} style={{textDecoration: 'none'}}>
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography textAlign="center">
										LogOut
									</Typography>
								</MenuItem>
							</Link>

						</Menu>
					</Box>

					{/*Middle logo*/}

						<Typography
							variant="h5"
							noWrap
							component="h5"
							href=""
							sx={{
								mr: 2,
								display: {xs: 'flex', md: 'none'},
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								textDecoration: 'none',
							}}
						>
							<Link to="/" style={{textDecoration: 'none', color: 'white'}}>
							Sh<BlurCircularSharpIcon size="medium"/>rten
							</Link>

						</Typography>
					<Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
						<Link to='/create' style={{textDecoration: 'none'}}>
							<Button
								sx={{my: 2, color: 'white', display: 'block'}}
							>
								Create
							</Button>
						</Link>
						<Link to='/links' style={{textDecoration: 'none'}}>
							<Button
								sx={{my: 2, color: 'white', display: 'block'}}
							>
								Links
							</Button>
						</Link>
						<Link to="/" onClick={logOutHandler} style={{textDecoration: 'none'}}>
							<Button
								sx={{my: 2, color: 'white', display: 'block'}}
							>
								LogOut
							</Button>
						</Link>
					</Box>

				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavBar;


