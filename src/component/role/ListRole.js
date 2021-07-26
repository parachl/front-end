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


const ListRole = () => {
  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
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
  let rowsRole = [{}];
  const [listRole, setListRole] = useState([]);
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
    margin: '10px',
  };

  const styleButton = {
    margin: '10px',
  };

  const fetcData = async () => {
    const { status, data } = await api.get("/listRole");

    if (status === 200) {
      console.log('list role data > ', data);
      if (data.listRoleObj !== null && data.listRoleObj.length > 0) {
        for (let i = 0; i < data.listRoleObj.length; i++) {
          rowsRole[i] = { roleName: data.listRoleObj[i].roleName, id: data.listRoleObj[i].id }
          // objCheckedArray[i] = { isChecked: true, id: menu.listMenu[i].id }
        }
        setListRole(rowsRole);
        // setListRoleMenu(objRoleArray);
        // setCheckedMenu(objCheckedArray)
      }
      //  console.log("rowsRole >>", rowsRole);
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

    const result = AuthenService.checkPermission('ListRole', 'AED');

  //   if (!result) {
  //     history.push("/main");
  //   }
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

  const editUser = (id) => {
    // const { status, data } = await api.post("/addUserRole", userRoleObj);
    // console.log('data' , data);
    // if(data === 'Success'){
    //   history.push("/main");
    // }
  }

  const addRole = () => {
    // const { status, data } = await api.post("/addUserRole", userRoleObj);
    // console.log('data' , data);
    // if(data === 'Success'){
    //   history.push("/main");
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
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <tableRow style={{ width: 1080, fontSize: 32,padding:10 }}>List Role </tableRow>
            <TableRow>
            <TableCell style={{ width: 1220}}></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell><Button variant="contained" color="primary" style={styleButtonAdd} onClick={() => addRole()}>
                        Add
                      </Button></TableCell></TableRow>
            <TableRow>
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
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listRole.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((role) => {
              return (
                <TableRow tabIndex={-1} key={role.id}>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" style={styleButton} onClick={() => editUser(role.id)}>
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
        count={listRole.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </PageBox>
  );
}

export default ListRole;