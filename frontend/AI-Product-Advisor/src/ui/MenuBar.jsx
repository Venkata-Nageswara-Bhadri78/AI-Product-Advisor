import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

import { CiMenuKebab } from "react-icons/ci";
import ProductCatalog from '../components/ProductCatalog';
import { Link } from 'react-router-dom';

export default function MenuBar() {

  return (
    <Dropdown>
      <MenuButton><CiMenuKebab /></MenuButton>
      <Menu>
        <Link to={"/chat_history"}><MenuItem>History</MenuItem></Link>
        <Link to={"/product_catalog"}><MenuItem>Product Catalog</MenuItem></Link>
      </Menu>
    </Dropdown>
  );
}

