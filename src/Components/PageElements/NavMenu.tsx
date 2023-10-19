import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './NavMenu.css';
import {NavLink, useLocation } from "react-router-dom";
import useWindowDimensions from "../../hookcs/useWindowDimensions";
import {ILink, links} from "../../Navigation/Lincks";

export default function NavMenu() {
  const {height, width} = useWindowDimensions();
  const [anchorEl, setAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const MenuContent = () =>
    <>{
      links.map((link: ILink, index: number) =>
        <NavLink key={index} className={`link ${location.pathname === link.path ? 'currentLink' : null}`} to={link.path}>{link.name}</NavLink>
      )}</>

  const MobileMenuContent = () =>
    <>{
      links.map((link: ILink, index: number) =>
        <MenuItem key={index} onClick={handleClose}>
          <NavLink className="link" to={link.path}>{link.name}</NavLink>
        </MenuItem>
      )}
    </>

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: width > 670 ? "center" : "flex-end",
      marginBottom: "6px"
    }}>
      {width > 670 ? <MenuContent/> :
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="menu-button"
          >
            Menu
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MobileMenuContent/>
          </Menu>
        </div>
      }
    </div>

  );
}