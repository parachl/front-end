import React, { useState, useEffect } from 'react';
import { Container } from './Container';
import { Wrapper } from './Wrapper';
import styles from './Login.module.css';
import { useHistory } from 'react-router-dom';
import logo from '../../image/Thai-Life-Logo.jpg';
import { Button } from 'reactstrap';
import { authenticationService } from '../../_services/authentication.service';
import api from '../../api/GetApi';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    localStorage.clear();
    const history = useHistory();

    const verifyLogin = async (username,password) => {
        const userName = username;
        const userObj = { userName };
        console.log('userObj', userObj);
        const { status, data } = await api.post("/verifyLogin", userObj);
        if (status === 200) {
            if (data.isLogin) {
                login(userObj);
            }else {
                alert('username or password is incorrect');
            }
        }else {
            alert('error');
        }

    }

    const login = async (userObj) => {

        const { status, data } = await api.post("/getMenu", userObj);

        if (status === 200) {
            console.log("data >>", data);
            localStorage.setItem('listMenu', JSON.stringify(data));
            history.push("/main");

        } else {
            alert('error');
        }

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
                        <input type="email" className="form-control" placeholder="Enter user" value={username} onChange={(e) => {
                    setUsername(e.target.value);
                  }} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                  }} />
                    </div>
                    <div className="text-center">
                        <Button type="button" onClick={() => verifyLogin(username,password)}>Submit</Button>
                    </div>
                </form>
            </Wrapper>
        </Container>
    );
}

export default Login;