// import { BoltRounded } from "@mui/icons-material";
import { Avatar, colors, Typography } from "@mui/material";
import { MenuItem, ProSidebarProvider, Menu } from "react-pro-sidebar";
import React from "react";
import "../Styles/Sidebar.css"
import { HomeOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const Item = ({ title, to, icon }) => {
        return (
            <NavLink to={to} className="navlink">
                <MenuItem icon={icon}>
                    <Typography>{title}</Typography>
                </MenuItem>
            </NavLink>
        );
    };

    return (
        <>
            <div className="sidebar_main">
                <div className="header">
                    <h2>ADMIN</h2>
                </div>
                <Avatar src="https://avatars.githubusercontent.com/u/84275426?v=4" sx={{ height: '100px', width: '100px' }} className="avatar" />
                <Typography mt={"4%"} fontSize="25px" color={colors.yellow[100]} borderBottom="solid 1px yellow" >Shashi raj</Typography>
                <div className="border"></div>
                <ProSidebarProvider>
                    <Menu className="menu">
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlined className="icon" />}
                        />
                        <Item
                            title="Leaderboard"
                            to="/leaderboard"
                            icon={<HomeOutlined className="icon" />}
                        />
                        <Item
                            title="Teams"
                            to="/"
                            icon={<HomeOutlined className="icon" />}
                        />
                    </Menu>
                </ProSidebarProvider>
            </div>
        </>
    )
}