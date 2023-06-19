import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { pages } from "../../types/enum";
import { useAuth } from "../../hooks/auth.hook";
export default function Header() {
  const { pathname } = useLocation();

  const { logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              ml: "60px",
              gap: "100px",
            }}
          >
            <Typography variant="h6" component="div">
              <Link
                style={{
                  color: pathname === pages.home ? "black" : "none",
                }}
                to={pages.home}
              >
                Home
              </Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link
                style={{
                  color: pathname === pages.transaction ? "black" : "none",
                }}
                to={pages.transaction}
              >
                Transaction
              </Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link
                style={{
                  color: pathname === pages.splitwise ? "black" : "none",
                }}
                to={pages.splitwise}
              >
                Split wise
              </Link>
            </Typography>
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => logout()}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
