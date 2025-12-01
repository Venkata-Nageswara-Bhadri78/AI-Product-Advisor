import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { Link } from 'react-router-dom';
import { CiMenuKebab } from "react-icons/ci";

export default function OptionsDropdown() {
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        color="neutral"
        size="sm"
        aria-label="Main menu"
        sx={{ borderRadius: '50%' }}
      >
        <CiMenuKebab />
      </MenuButton>
      <Menu size="sm">
        <MenuItem component={Link} to="/chat_history">
          History
        </MenuItem>
        <MenuItem component={Link} to="/product_catalog">
          Product Catalog
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}