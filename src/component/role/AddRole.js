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
import { get } from 'lodash';

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
// import Row from './Rows';


const AddRole = () => {
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
  const [checkedGroupMenu, setCheckedGroupMenu] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [init, setInit] = useState('');
  // const [listRoleMenuAdd, setListRoleMenuAdd] = useState([]);
  // const [listRoleMenuAdd, setListRoleMenuAdd] = useState([]);


  const [isChecked, setIsChecked] = useState([]);
  const [listCheckedMenu, setCheckedMenu] = useState([]);
  const [listRoleMenu, setListRoleMenu] = useState([]);
  const [listOpen, setListOpen] = useState([]);

  let listRoleMenuAdd = [];
  const styleDivButton = {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const styleButton = {
    margin: '10px',
  };

  const initPage = (menu) => {
    console.log('3');
    dispathch(showSpinner());
    setTimeout(function () {
      dispathch(hideSpinner())
    }, 500);

    const result = AuthenService.checkPermission('AddRole', 'A');

    if (!result) {
      history.push("/main");
    }
    const objArray = [];
    console.log(' menu initPage>', menu);
    const objRoleArray = [];
    const objCheckedArray = [];
    const openArray = [];
    for (let i = 0; i < menu.listGroupMenu.length; i++) {
      objArray[i] = { id: menus.listGroupMenu[i].id, isChecked: false };
      openArray[i] = { id: menus.listGroupMenu[i].id, open: false };
      if (menu.listGroupMenu[i].listMenu !== null) {
        for (let b = 0; b < menu.listGroupMenu[i].listMenu.length; b++) {
          objRoleArray.push({groupId: menu.listGroupMenu[i].id, menuId: menu.listGroupMenu[i].listMenu[b].id, roleId: '', roleRight: 'D' });
          objCheckedArray.push({ isChecked: false, id: menu.listGroupMenu[i].listMenu[b].id });
        }
      }
    }
    setListOpen(openArray);
    setListGroupRoleMenu(objArray);
    setListRoleMenu(objRoleArray);
    setCheckedMenu(objCheckedArray);
    setCheckedGroupMenu(objArray);

  }

  useEffect(() => {
    console.log('2');
    initPage(menus);

  }, []);

  const submitAddRole = async (roleName, listGroupRoleMenu) => {
    let ArrayRoleMenu = [];
    for(let i = 0; i < checkedGroupMenu.length; i++){
      if(checkedGroupMenu[i].isChecked === true){
        for (let f = 0; f < listRoleMenu.length; f++) {
                if(listRoleMenu[f].groupId === checkedGroupMenu[i].id){
                  if(listRoleMenu[f].roleRight !== 'D'){
                    ArrayRoleMenu.push(listRoleMenu[f]);
                  }
                }
        }
      }
    }

    const roleObj = { roleName: roleName, listRoleMenuObj: ArrayRoleMenu };
    console.log('roleObj', roleObj);
    const { status, data } = await api.post("/role/addRole", roleObj);
    console.log('data', data);
    if (data === 'success') {
      history.push("/listRole");
    }else if(data === 'duplicate'){
      console.log('data', data);
      alert('Data Duplicate');
    }
  }

  function cancel() {
    history.push("/listRole");
  }

  const changeCheckBoxGroupMenu = (event, index) => {
    if (checkedGroupMenu.length > 0) {
      let g = checkedGroupMenu[index];
      if (g["isChecked"] === true) {
        g["isChecked"] = false;
        getOpen(index,false);
      } else {
        g["isChecked"] = true;
      }
      setCheckedGroupMenu([...checkedGroupMenu.slice(0, index), g, ...checkedGroupMenu.slice(index + 1)]);
    }

  }

  function getRoleRight(menu) {
    if (listRoleMenu.length > 0) {
      var index = listRoleMenu.findIndex((x) => x.menuId === menu.id);
      return listRoleMenu[index].roleRight;
    }
  }

  function getCheckedGroupMenu(index) {
    console.log('checkedGroupMenu index>', index);
    if (checkedGroupMenu.length > 0) {
      console.log('checkedGroupMenu >', checkedGroupMenu);
      return checkedGroupMenu[index].isChecked;
    }else{
      return false;
    }
  }

  function getCheckedMenu(menu) {
    console.log('getCheckedMenu menu>', menu);
    console.log('getCheckedMenu listCheckedMenu>', listCheckedMenu);
    var index = listCheckedMenu.findIndex((x) => x.id === menu.id);
    if (listCheckedMenu.length > 0 && index > -1) {
      console.log('getCheckedMenu listCheckedMenu',listCheckedMenu);
      return listCheckedMenu[index].isChecked;
    }else{
      return false;
    }
  }

  function getOpen(index,fix) {
    if (listOpen.length > 0) {
      let g = listOpen[index];
      if(fix !== null && fix === false){
        g["open"] = false;
        setListOpen([...listOpen.slice(0, index), g, ...listOpen.slice(index + 1)]);
      }else{
        if (g["open"] === true) {
          g["open"] = false;
          setListOpen([...listOpen.slice(0, index), g, ...listOpen.slice(index + 1)]);
        } else {
          g["open"] = true;
          setListOpen([...listOpen.slice(0, index), g, ...listOpen.slice(index + 1)]);
        }
      }
      
    }
  }
  console.log('listOpen out', listOpen);
  const handleChange = (event, param) => {
    var index = listRoleMenu.findIndex((x) => x.menuId === param.id);
    if (index === -1) {
      setListRoleMenu([...listRoleMenu, { menuId: param.id, roleId: '', roleRight: event.target.value }]);
    } else {
      let g = listRoleMenu[index];
      g["roleRight"] = event.target.value;
      setListRoleMenu([...listRoleMenu.slice(0, index), g, ...listRoleMenu.slice(index + 1)]);
    }
  };

  const name = 'selectedOption';
  const deleteRoleMenu = (index) => {
    if (index !== -1) {
      let g = listRoleMenu[index];
      g["roleRight"] = "D";
      setListRoleMenu([...listRoleMenu.slice(0, index), g, ...listRoleMenu.slice(index + 1)]);
    }
    console.log('deleteRoleMenu', listRoleMenu);
  }

  const defaltRoleMenu = (index) => {
    if (index !== -1) {
      let g = listRoleMenu[index];
      g["roleRight"] = "AED";
      setListRoleMenu([...listRoleMenu.slice(0, index), g, ...listRoleMenu.slice(index + 1)]);
    }
    console.log('defaltRoleMenu', listRoleMenu);
  }

  const handleChangeMenu = (event, menu) => {
    var index = listCheckedMenu.findIndex((x) => x.id === menu.id);
    if (index !== -1) {
      let g = listCheckedMenu[index];
      if (g["isChecked"] === true) {
        g["isChecked"] = false;
        deleteRoleMenu(index);
      } else {
        g["isChecked"] = true;
        defaltRoleMenu(index);
      }
      setCheckedMenu([...listCheckedMenu.slice(0, index), g, ...listCheckedMenu.slice(index + 1)]);
    }
  };

  // const [checkedMenuAll, setCheckedMenuAll] = useState({});
  // const handleChangeMenuAll = (event) => {
  //   setCheckedMenuAll({ check: event.target.checked });
  // };

  return (
    <PageBox>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {/* <TableCell/> */}
              <TableCell style={{ width: 180, fontSize: 32 }}>Setting Role </TableCell>
            </TableRow>
            <TableRow>
              <FormGroup style={{ width: 380, padding: 15 }}>
                {/* <Label className="form-group">Role Name :</Label> */}
                {/* <input type="text" className="form-control" placeholder="" value="" /></FormGroup> */}
                <InputLabelReuse label="Role Name :" type="text" value={roleName}
                  onChange={(e) => {
                    setRoleName(e.target.value);
                  }} style={{ width: 180 }} />
              </FormGroup>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
          </TableHead>
          <TableBody>
            <TableRow style={{ width: 180 }}>
            </TableRow>
            {menus.listGroupMenu.map((menuGroup, index) => (
              <React.Fragment>
                <TableRow className={classes.root} ><TableCell style={{ width: 50 }}><Checkbox
                  defaultChecked
                  color="primary" checked={getCheckedGroupMenu(index)}
                  onChange={(e) => changeCheckBoxGroupMenu(e, index)}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                /></TableCell>
                  <TableCell style={{ width: 150 }}>
                    {menuGroup.listMenu !== null && menuGroup.listMenu.length > 0 && <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!getOpen(index))} disabled={!get(checkedGroupMenu[index],'isChecked',false)}>
                      {get(listOpen[index], 'open', false) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>}
                  </TableCell>
                  <TableCell style={{ fontSize: 18 }}>{menuGroup.groupMenuName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={get(listOpen[index], 'open', false)} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell >
                                {/* <Checkbox
                                defaultChecked
                                color="primary" checked={checkedMenuAll}
                                onChange={(e) => handleChangeMenuAll(e)}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              /> */}
                              </TableCell>
                              <TableCell> MenuName </TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          {menuGroup.listMenu !== null && menuGroup.listMenu.map((menus, index) => (
                            <TableBody>
                              <TableCell>
                                <Checkbox
                                  defaultChecked
                                  color="primary" checked={getCheckedMenu(menus)}
                                  onChange={(e) => handleChangeMenu(e, menus)}
                                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                                /></TableCell>
                              <TableCell>{menus.menuName}</TableCell>
                              <TableCell>
                                <React.Fragment>
                                  <RadioGroup key={index} id={name} name={name} value={getRoleRight(menus)} onChange={(event) => handleChange(event, menus, index)}>
                                    <FormControlLabel value="V" control={<Radio />} disabled={!getCheckedMenu(menus)} label="View Only" />
                                    <FormControlLabel value="AED" control={<Radio />} disabled={!getCheckedMenu(menus)} label="Full Control" />
                                  </RadioGroup>
                                </React.Fragment>
                              </TableCell>
                            </TableBody>
                          ))}
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
              // <Row key={menuGroup.groupMenuName} menu={menuGroup} listGroupRoleMenu={listGroupRoleMenu} listRoleMenuAdd={listRoleMenuAdd} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={styleDivButton}>
        <Button variant="contained" color="primary" style={styleButton} onClick={() => submitAddRole(roleName, listGroupRoleMenu)}>
          Submit
        </Button>
        <Button variant="contained" color="secondary" style={styleButton} onClick={() => cancel()}>
          Cancel
        </Button>
      </div>
    </PageBox>
  );
}

export default AddRole;