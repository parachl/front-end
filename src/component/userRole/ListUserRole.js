import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showSpinner } from '../../action/Constants.action';
import { hideSpinner } from '../../action/Constants.action';
import { AuthenService } from '../../_services/authen.service';
import { useHistory } from 'react-router-dom';
import { PageBox } from '../reuse/PageBox';
import styled from "styled-components";
import { FormGroup, Label } from 'reactstrap';
import api from "../../api/GetApi";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { InputLabelReuse } from '../reuse/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';


const ListUserRole = () => {
  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    scrollBar: {
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
      }
    },
  });
  const dispathch = useDispatch();
  const history = useHistory();
  const menus = JSON.parse(localStorage.getItem('listMenu'));

  console.log('1');

  const [listGroupRoleMenu, setListGroupRoleMenu] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [checkedGroupMenu, setCheckedGroupMenu] = useState({});
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [init, setInit] = useState('');
  let userRoles = [{}];
  const [listUserRole, setListUserRole] = useState([]);
  // const [listRoleMenuAdd, setListRoleMenuAdd] = useState([]);
  let listRoleMenuAdd = [];
  const styleDivButton = {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const styleButtonAdd = {
    float: 'right',
    marginRight: '43px',
    marginBottom:'20px',
  };

  const styleButton = {
    margin: '10px',
  };

  function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }

  const fetcData = async () => {
    const { status, data } = await api.get("/userRole/listUserRole");

    if (status === 200) {
      console.log('list role data > ', data);
      if (data.listUserRoleObj !== null && data.listUserRoleObj.length > 0) {
        for (let i = 0; i < data.listUserRoleObj.length; i++) {
          let current_datetime = new Date(data.listUserRoleObj[i].createDate);
let formatted_date = appendLeadingZeroes((current_datetime.getMonth() + 1)) + "-" + appendLeadingZeroes(current_datetime.getDate()) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
          userRoles[i] = { roleName: data.listUserRoleObj[i].roleObj.roleName , userName:data.listUserRoleObj[i].userObj.userName, groupId: data.listUserRoleObj[i].groupId,createBy:data.listUserRoleObj[i].createBy,createDate:formatted_date,updateDate:data.listUserRoleObj[i].updateDate,updateBy:data.listUserRoleObj[i].updateBy,status:data.listUserRoleObj[i].status }
          // objCheckedArray[i] = { isChecked: true, id: menu.listMenu[i].id }
        }
        setListUserRole(userRoles);
        // setListRoleMenu(objRoleArray);
        // setCheckedMenu(objCheckedArray)
       }
       console.log("userRoles >>", userRoles);
    } else {
      alert('error');
    }

  }

  const initPage = () => {
  //   console.log('3');
  //   dispathch(showSpinner());
  //   setTimeout(function () {
  //     dispathch(hideSpinner())
  //   }, 500);

    const result = AuthenService.checkPermission('ListUserRole', 'AED');

    if (!result) {
      history.push("/main");
    }
  //   const objArray = [];
  //   console.log(' menu initPage>', menu);
  //   for (let i = 0; i < menu.listGroupMenu.length; i++) {
  //     objArray[i] = { id: menu.listGroupMenu[i].id, isChecked: false };

  //   }
  //   setListGroupRoleMenu(objArray);

  }

  useEffect(() => {
    console.log('2');
    fetcData();
  }, []);

  const editUser = (groupId) => {
    // const { status, data } = await api.post("/findById", userRoleObj);
    // console.log('data' , data);
    // if(data === 'Success'){
      history.push("/editUserRole",{groupId:groupId});
    // }
  }

  const addUserRole = () => {
    // const { status, data } = await api.post("/addUserRole", userRoleObj);
    // console.log('data' , data);
    // if(data === 'Success'){
      history.push("/addUserRole");
    // }
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <PageBox>
      <div style={{ width: 980, fontSize: 32,padding:10 }}>List User Role</div><Button variant="contained" color="primary" style={styleButtonAdd} onClick={() => addUserRole()}>
                        Add
                      </Button>
      <TableContainer className={classes.container} style={{ height: 600}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <tableRow > </tableRow>
            <TableRow>
              <TableCell style={{ width: 320, fontSize: 18 }}>
                <p>User Name</p>
              </TableCell>
              <TableCell style={{ width: 320, fontSize: 18 }}>
                <p>Role Name</p>
              </TableCell>
              <TableCell style={{ width: 320 , fontSize: 18}}>
                <p>Create Date</p>
              </TableCell>
              <TableCell style={{ width: 320, fontSize: 18 }}>
                <p>Create By</p>
              </TableCell>
              <TableCell style={{ width: 320 , fontSize: 18}}>
                <p>Update Date</p>
              </TableCell>
              <TableCell style={{ width: 320, fontSize: 18 }}>
                <p>Update By</p>
              </TableCell>
              <TableCell style={{ width: 320, fontSize: 18 }}>
                <p>Status</p>
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ height: 600}}>
            {listUserRole.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userRole) => {
              return (
                <TableRow tabIndex={-1} key={userRole.id}>
                  <TableCell>{userRole.userName}</TableCell>
                  <TableCell>{userRole.roleName}</TableCell>
                  <TableCell>{userRole.createDate}</TableCell>
                  <TableCell>{userRole.createBy}</TableCell>
                  <TableCell>{userRole.updateDate}</TableCell>
                  <TableCell>{userRole.updateBy}</TableCell>
                  <TableCell>{userRole.status === 'ST001' ? 'Active' : ''}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" style={styleButton} onClick={() => editUser(userRole.groupId)}>
                      Edit
                    </Button></TableCell>
                  {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })} */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={listUserRole.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </PageBox>
  );
}

export default ListUserRole;