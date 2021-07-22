import React from 'react';
import classNames from "classnames";
import { Nav } from 'reactstrap';
import '../MainMenu.css';
import SubMenu from './SubMenu';

const SideBar = ({ isOpen, toggle }) => {

  const menus = JSON.parse(localStorage.getItem('listMenu'));
console.log('menus SideBar >>',menus);
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
        <h3>Bootstrap Sidebar</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <p>Dummy Heading</p>
          {menus.listGroupMenu.map((item, index) => {
            return (<SubMenu item={item} key={index} />
            )
          })
          }
        </Nav>
      </div>
    </div>

  );
}

export default SideBar;