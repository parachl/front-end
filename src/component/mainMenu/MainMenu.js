import React, { useState, useEffect } from 'react';

import SideBar from "./MenuBar/SideBar";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageOne from "../pageOne/PageOne";
import PageTwo from "../pageTwo/PageTwo";
import ExamRound from "../Exam/ExamRound";
import AddRole from "../role/AddRole";
import { Container } from "reactstrap";
import classNames from "classnames";
import Topbar from "./TopBar/TopBar";
import About from "../about/About";
import {useDispatch} from 'react-redux';
import { showSpinner  } from '../../action/Constants.action';
import { hideSpinner } from '../../action/Constants.action';
import { authenticationService } from '../../_services/authentication.service';
import api from '../../api/GetApi';

const MainMenu = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  const dispathch = useDispatch();

  const [data, setData] = useState({});
  
  const fetcData = async () => {
    console.log('test test');
    const { status, data } = await api.get("/test");

    if (status === 200) {
         setData(data);
         localStorage.setItem('listMenu', JSON.stringify(data));
         console.log("data >>", data);
    } else {
         alert('error');
    }
}

  useEffect(() => {
    fetcData();
    dispathch(showSpinner());
    // authenticationService.getMenu();
    setTimeout(function() {
      dispathch(hideSpinner())
    }, 300);
    
    
  },[]);

  return (
    <BrowserRouter>
    <div className="Main wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
      <Container
        fluid
        className={classNames("content", { "is-open": sidebarIsOpen })}
      >
        <Topbar toggleSidebar={toggleSidebar} />
        <Switch>
        <Route path="/home/homeOne" exact component={PageOne}></Route>
        <Route path="/home/homeTwo" exact component={PageTwo}></Route>
        <Route path="/about" exact component={About}></Route>
        <Route path="/examRound" exact component={ExamRound}></Route>
        <Route path="/addRole" exact component={AddRole}></Route>
        {/* <Redirect from="*" to="/login"/> */}
      </Switch>
     </Container>
      </div>
      
      
    </BrowserRouter>
  );
}


export default MainMenu;