import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showSpinner } from '../../action/Constants.action';
import { hideSpinner } from '../../action/Constants.action';
import { AuthenService } from '../../_services/authen.service';
import { useHistory } from 'react-router-dom';
import { PageBox } from '../reuse/PageBox';
import api from "../../api/GetApi";

import { alpha, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { FormGroup } from 'reactstrap';
import { InputLabelReuse } from '../reuse/InputLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const AddUserRole = () => {
  const dispathch = useDispatch();
  const history = useHistory();
  const menus = JSON.parse(localStorage.getItem('listMenu'));
  const [searchUser, setSearchUser] = useState('');
  const [role, setRole] = useState({});
  let roleName = 'select role';
  const styleDivButton = {
    width: 80,
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

    const result = AuthenService.checkPermission('addUserRole', 'AED');

    if (!result) {
      history.push("/main");
    }

  }

  useEffect(() => {
    initPage(menus);
  }, []);

  const submitAddRole = async () => {
    const userRoleObj = {};
    console.log('userRoleObj', userRoleObj);
    // const { status, data } = await api.post("/addUserRole", userRoleObj);
    // console.log('data' , data);
    // if(data === 'Success'){
    //   history.push("/main");
    // }
  }

  const submitSearch = async () => {
    const userRoleObj = {};
    console.log('userRoleObj', userRoleObj);
    // const { status, data } = await api.post("/addUserRole", userRoleObj);
    // console.log('data' , data);
    // if(data === 'Success'){
    //   history.push("/main");
    // }
  }

  const handleChangeRole = (role) => {

  };


  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },

  ];

  function createData(name, code) {
    return { name, code };
  }

  const rows = [
    createData('India', 'IN'),
    createData('China', 'CN'),
    createData('Italy', 'IT'),
    createData('United States', 'US'),
    createData('Canada', 'CA'),
    createData('Australia', 'AU'),
    createData('Germany', 'DE'),
    createData('Ireland', 'IE'),
    createData('Mexico', 'MX'),
    createData('Japan', 'JP'),
    createData('France', 'FR'),
    createData('United Kingdom', 'GB'),
    createData('Russia', 'RU'),
    createData('Nigeria', 'NG'),
    createData('Brazil', 'BR'),
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '40%',
      margin: 40,

    },
    container: {
      maxHeight: 440,

    },
    boxTable: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'

    }
    ,
    buttonDelete: {
      display: 'flex',
      left: 400,
      width: 80,
      padding: 10
    }
    , formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectRole: {
      marginLeft: 105,
    }, search: {
      marginTop: 10,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }, inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    }


  }));

  const classes = useStyles();
  const SelectUser = () => {
    const classes = useStyles();
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
      <Paper className={classes.root} >
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <div class="row">
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                  <Button variant="contained" color="primary" style={styleButton} onClick={(e) => submitSearch(e)}>
                    Search
                  </Button>
                </div>

              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }


  const UserList = () => {
    const classes = useStyles();
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
      <Paper className={classes.root} >
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* <FormGroup style={{ width: 400, padding: 15 }}>
                  <Button variant="contained" color="primary" style={styleButton} onClick={(e) => submitSearch(e)} className={classes.buttonDelete}>
          Search
        </Button>
              </FormGroup> */}
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

  const SimpleSelect = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
      <div className={classes.selectRole}><FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={roleName}
          onChange={(event) => handleChangeRole(role)}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl></div>
    );
  }

  return (
    <PageBox>
      <SimpleSelect></SimpleSelect>
      <div class="row" className={classes.boxTable}>
        <UserList></UserList>
        <SelectUser></SelectUser>
      </div>
    </PageBox>
  );
}

export default AddUserRole;