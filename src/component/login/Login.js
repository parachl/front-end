import React, { useState,useEffect } from 'react';
import { Container } from './Container';
import { Wrapper } from './Wrapper';
import styles from './Login.module.css';
import { useHistory } from 'react-router-dom';
import logo from '../../image/Thai-Life-Logo.jpg';
import { Button } from 'reactstrap';
import { authenticationService } from '../../_services/authentication.service';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    localStorage.clear();
    const history = useHistory();

    let value = '';

    const login = () => {
    //     const menus = [
    //         {
    //           title: "Home",
    //           icon: "home",
    //           path: "/home",
    //           action: null,
    //           subMenu: [
    //             {
    //               title: "PageOne",
    //               icon: "",
    //               path: "/home/homeOne",
    //               action:"AED",
        
    //             }, {
    //               title: "Home2",
    //               icon: "",
    //               path: "/home/homeTwo",
    //               action:"AED",
    //             }
    //           ]
    //         },
    //         {
    //           title: "About",
    //           icon: "id-card-alt",
    //           path: "/about",
    //           action:"V",
    //           subMenu: null
    //         },
    //         {
    //           title: "Portfolio",
    //           icon: "image",
    //           path: "/portfolio",
    //           action:"V",
    //           subMenu: null
    //         },
    //         {
    //           title: "FAQ",
    //           icon: "question",
    //           path: "/fqa",
    //           action:"AED",
    //           subMenu: null
    //         },
    //         {
    //           title: "Report",
    //           icon: "paper-plane",
    //           path: "/report",
    //           action:"AED",
    //           subMenu: null
    //         },
    //       ];

    // const listMenu = Object.keys(menus).map(function (key) {
    //     const menu = menus[key];
    //     menu.name = key;
    //     return menu;
    //   });

    //  localStorage.setItem('listMenu', JSON.stringify(menus));
 
    
     history.push("/main");
    }

    return (
        <Container>
            <Wrapper>
                <form>
                    <div className={styles.smBox}>
                        <img className={styles.bglogo} alt={logo} src={logo} />
                        <h2 className={styles.textLogin}>Login</h2>
                    </div>
                    <div className="form-group">
                        <label>User</label>
                        <input type="email" className="form-control" placeholder="Enter user" value={value} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={value} />
                    </div>
                    <div className="text-center">
                        <Button type="button" onClick={login}>Submit</Button>
                    </div>
                </form>
            </Wrapper>
        </Container>
    );
}

export default Login;