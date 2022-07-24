import { Menu, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import MenuItem from "antd/lib/menu/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { RouteNames } from "../router";

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Header>
      <Menu theme='dark' mode="horizontal" defaultSelectedKeys={[location.pathname]}>
        <MenuItem key="/posts" data-testid="posts-link" onClick={() => navigate(RouteNames.POSTS)}>Posts</MenuItem>
        <MenuItem key="/users" data-testid="users-link" onClick={() => navigate(RouteNames.USERS)}>Users</MenuItem>
      </Menu>
    </Header>
  );
}

export default Navbar;