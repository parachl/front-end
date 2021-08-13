import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
} from "reactstrap";

const Topbar = ({ toggleSidebar }) => {
  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-4 bg-white rounded"
      expand="md">
      <Button color="info" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      {/* <NavbarToggler onClick={toggleTopbar} /> */}
      
    </Navbar>
  );
};

export default Topbar;