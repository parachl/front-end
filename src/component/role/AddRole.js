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
  const [checkedGroupMenu, setCheckedGroupMenu] = useState({});
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [init, setInit] = useState('');
  // const [listRoleMenuAdd, setListRoleMenuAdd] = useState([]);
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

  const initPage = (menu, action) => {
    console.log('3');
    dispathch(showSpinner());
    setTimeout(function () {
      dispathch(hideSpinner())
    }, 500);

    const result = AuthenService.checkPermission('AddRole', 'AED');

    if (!result) {
      history.push("/main");
    }
    const objArray = [];
    console.log(' menu initPage>', menu);
    for (let i = 0; i < menu.listGroupMenu.length; i++) {
      objArray[i] = { id: menu.listGroupMenu[i].id, isChecked: false };

    }
    setListGroupRoleMenu(objArray);

  }

  useEffect(() => {
    console.log('2');
    initPage(menus);
  }, []);

  const submitAddRole= async (roleName,listRoleMenu) =>{
    const roleObj = {roleName:roleName,listRoleMenuObj:listRoleMenu};
    console.log('roleObj',roleObj);
    const { status, data } = await api.post("/addRole", roleObj);
    console.log('data' , data);
    if(data === 'Success'){
      history.push("/main");
    }
  }


  ////////////////////////////////////////////// ROW ////////////////////////////
  const Row = (props) => {
    const { menu } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    //Radio Action
    const [value, setValue] = useState('AED');
    const [isChecked, setIsChecked] = useState({});
    const [listCheckedMenu, setCheckedMenu] = useState([]);
    const [listRoleMenu, setListRoleMenu] = useState([]);
    useEffect(() => {
      console.log('4');
      initRow(menu);

    }, []);

    
    function initRow(menu) {
      console.log('5');
      if (listGroupRoleMenu.length > 0) {
        const objRoleArray = [];
        const objCheckedArray = [];
        var index = listGroupRoleMenu.findIndex((x) => x.id === menu.id);
        setIsChecked(listGroupRoleMenu[index].isChecked);
      if(listGroupRoleMenu[index].isChecked === true){
        if (menu.listMenu !== null && menu.listMenu.length > 0) {
          for (let i = 0; i < menu.listMenu.length; i++) {
            objRoleArray[i] = { menuId: menu.listMenu[i].id, roleId: '', roleRight: 'AED' }
            objCheckedArray[i] = { isChecked: true, id: menu.listMenu[i].id }
          }
          setListRoleMenu(objRoleArray);
          setCheckedMenu(objCheckedArray)
        }
      }
      }
    }

    function setChecked() {
      var index = listGroupRoleMenu.findIndex((x) => x.id === menu.id);
      setIsChecked(listGroupRoleMenu[index].isChecked);
    }

    const changeCheckBoxGroupMenu = (event, menu) => {

      var index = listGroupRoleMenu.findIndex((x) => x.id === menu.id);

      let g = listGroupRoleMenu[index];
      if (g["isChecked"] === true) {
        g["isChecked"] = false;
      } else {
        g["isChecked"] = true;
      }

      setListGroupRoleMenu([...listGroupRoleMenu.slice(0, index), g, ...listGroupRoleMenu.slice(index + 1)]);
      // setListRoleMenu([...listRoleMenu, { menuObj: {}, roleObj: {}, roleRight: 'AED' }]);
      setChecked();

    }

    function getRoleRight(menu) {
      if (listRoleMenu.length > 0) {
        var index = listRoleMenu.findIndex((x) => x.menuId === menu.id);
        return listRoleMenu[index].roleRight;
      }
    }

    const handleChange = (event, param) => {
      var index = listRoleMenu.findIndex((x) => x.menuId === param.id);
      setValue(event.target.value);
      if (index === -1) {
        setListRoleMenu([...listRoleMenu, { menuId: param.id, roleId: '', roleRight: event.target.value }]);
      } else {
        let g = listRoleMenu[index];
        g["roleRight"] = event.target.value;
        setListRoleMenu([...listRoleMenu.slice(0, index), g, ...listRoleMenu.slice(index + 1)]);
      }
    };

    const deleteRoleMenu = (id) => {
      var index = listRoleMenu.findIndex((x) => x.menuId === id);
      if (index !== -1) {
        let g = listRoleMenu[index];
        g["roleRight"] = "D";
        setListRoleMenu([...listRoleMenu.slice(0, index), g, ...listRoleMenu.slice(index + 1)]);
      }
      console.log('deleteRoleMenu',listRoleMenu);
    }

    const defaltRoleMenu = (id) => {
      var index = listRoleMenu.findIndex((x) => x.menuId === id);
      if (index !== -1) {
        let g = listRoleMenu[index];
        g["roleRight"] = "AED";
        setListRoleMenu([...listRoleMenu.slice(0, index), g, ...listRoleMenu.slice(index + 1)]);
      }
      console.log('defaltRoleMenu',listRoleMenu);
    }

    const handleChangeMenu = (event, menu) => {
      console.log('handleChangeMenu', menu);
      var index = listCheckedMenu.findIndex((x) => x.id === menu.id);
      if (index !== -1) {
        let g = listCheckedMenu[index];
        if (g["isChecked"] === true) {
          g["isChecked"] = false;
          deleteRoleMenu(menu.id);
        } else {
          g["isChecked"] = true;
          defaltRoleMenu(menu.id);
        }
        setCheckedMenu([...listCheckedMenu.slice(0, index), g, ...listCheckedMenu.slice(index + 1)]);
      }
      
    };

    function getCheckedMenu(menu) {
      if (listCheckedMenu.length > 0) {
        var index = listCheckedMenu.findIndex((x) => x.id === menu.id);
        return listCheckedMenu[index].isChecked;
      }
    }

    function updateListRoleMenuAdd() {
      console.log('listRoleMenu update',listRoleMenu);
      if (listRoleMenu.length > 0) {
        listRoleMenuAdd = listRoleMenu;
      // setListRoleMenuAdd(listRoleMenu);
      }
    }
    updateListRoleMenuAdd();
    console.log('listRoleMenuAdd',listRoleMenuAdd);
    // 

    const [checkedMenuAll, setCheckedMenuAll] = useState({});
    const handleChangeMenuAll = (event) => {
      setCheckedMenuAll({ check: event.target.checked });
    };

    console.log('6',listRoleMenu);
    const name = 'selectedOption';

    return (
      <React.Fragment>
        <TableRow className={classes.root} ><TableCell style={{ width: 50 }}><Checkbox
          defaultChecked
          color="primary" checked={isChecked}
          onChange={(e) => changeCheckBoxGroupMenu(e, menu)}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        /></TableCell>
          <TableCell style={{ width: 150 }}>
            {menu.listMenu !== null && menu.listMenu.length > 0 && <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} disabled={!isChecked}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>}
          </TableCell>
          <TableCell style={{fontSize:18}}>{menu.groupMenuName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell ><Checkbox
                        defaultChecked
                        color="primary" checked={checkedMenuAll}
                        onChange={(e) => handleChangeMenuAll(e)}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      /></TableCell>
                      <TableCell> MenuName </TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  {menu.listMenu !== null && menu.listMenu.map((menus, index) => (
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
    );
  }

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
              <Row key={menuGroup.groupMenuName} menu={menuGroup} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={styleDivButton}>
        <Button variant="contained" color="primary" style={styleButton} onClick={() => submitAddRole(roleName,listRoleMenuAdd)}>
          Submit
        </Button>
        <Button variant="contained" color="secondary" style={styleButton}>
          Cancel
        </Button>
      </div>
    </PageBox>
  );
}

export default AddRole;