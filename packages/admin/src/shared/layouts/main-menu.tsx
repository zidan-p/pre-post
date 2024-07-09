import { Menu } from "react-admin";
import DashboardIcon from '@mui/icons-material/PostAddRounded'; 
import PersonIcon from '@mui/icons-material/Person2Outlined'; 
// import { Box, } from '@mui/material';

interface MainMenuProps {

}


export function MainMenu(props: MainMenuProps){


  return (
    <Menu>
      <Menu.Item to="/posts" primaryText="Postingan" leftIcon={<DashboardIcon/>} />
      <Menu.Item to="/users" primaryText="Users" leftIcon={<PersonIcon/>} />
    </Menu>
  )
}