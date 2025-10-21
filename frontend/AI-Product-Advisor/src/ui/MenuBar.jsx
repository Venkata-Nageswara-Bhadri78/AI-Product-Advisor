import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { Link } from 'react-router-dom'; // Keep this import
import { CiMenuKebab } from "react-icons/ci";

// 'ProductCatalog' import removed as it was unused.

/**
 * Renamed from MenuBar to OptionsDropdown for clarity,
 * as it's a single dropdown, not a full bar.
 */
export default function OptionsDropdown() {
  return (
    <Dropdown>
      <MenuButton
        variant="plain" // Use 'plain' for a clean icon-button look
        color="neutral"
        size="sm"
        aria-label="Main menu" // Essential for accessibility on icon-only buttons
        sx={{ borderRadius: '50%' }} // Optional: makes the button circular
      >
        <CiMenuKebab />
      </MenuButton>
      <Menu size="sm">
        {/*
          This is the correct way to use react-router-dom's Link with MUI.
          Using the 'component' prop tells MenuItem to render *as* a Link,
          preserving all accessibility and styling.
        */}
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