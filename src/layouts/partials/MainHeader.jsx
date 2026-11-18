import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useAuth from "../../hooks/useAuth";
import { Avatar, Divider, Box } from "@mui/material";

import Logo from "../../components/Logo";

import { Link as RouterLink } from "react-router";

function MainHeader() {
	const { user, logout } = useAuth();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar component="header" position="sticky" color="transparent" sx={{mb: 3}}>
			<Toolbar>
				<Logo
					sx={{
						width: "50px",
						height: "50px",
					}}
				/>
				<Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
					Ryuki Forum
				</Typography>
				{user && (
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<Avatar alt={user.name} src={user.avatarUrl} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
							onClick={handleClose}
						>
							<Box
								sx={{
									my: 1.5,
									px: 2.5,
								}}
							>
								<Typography variant="subtitle2" noWrap>
									{user?.name}
								</Typography>
								<Typography
									variant="body2"
									sx={{ color: "text.secondary" }}
									noWrap
								>
									{user?.email}
								</Typography>
							</Box>
							<Divider />
							<MenuItem component={RouterLink} to="/account">Trang cá nhân</MenuItem>
							<Divider />
							<MenuItem onClick={()=>logout()}>Đăng xuất</MenuItem>
						</Menu>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default MainHeader;
