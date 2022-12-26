import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Link,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ChatBubbleOutline } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getCurrentUser,
  removeCurrentUser,
} from "../../modules/users/userSlice";
import Authentication from "../Authentication/Authentication";

function ResponsiveAppBar() {
  const user = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    window.localStorage.removeItem("accessToken");
    dispatch(removeCurrentUser());
  };

  const goToUserPage = () => {
    navigate(`/user/${user?.ID}`);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              textDecoration: "none",
            }}
          >
            <ChatBubbleOutline
              sx={{
                display: "flex",
                mr: 1,
                color: "white",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", sm: "flex" },
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              Gossip with Go
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: "flex" }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open user menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.username}
                      src={
                        user?.profilePicture
                          ? `https://cvwo-user-profiles.s3.ap-southeast-1.amazonaws.com/${user?.profilePicture}`
                          : "/static/images/avatar/2.jpg"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      goToUserPage();
                    }}
                  >
                    <Typography textAlign="center">{user?.username}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Authentication />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
