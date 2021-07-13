import React ,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { showSpinner  } from '../../action/Constants.action';
import { hideSpinner } from '../../action/Constants.action';
import { AuthenService } from '../../_services/authen.service';
import { useHistory } from 'react-router-dom';
import { PageBox } from '../reuse/PageBox';
import { Table, Input } from 'reactstrap';

const AddRole = () => {
    const dispathch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispathch(showSpinner());
        setTimeout(function() {
          dispathch(hideSpinner())
        }, 500);

        const result =  AuthenService.checkPermission('AddRole', 'AED');
        
        console.log('result >>',result);
        if(!result){
            history.push("/main");
        }
      });
return (
    <PageBox>
       <Table>
      <thead>
        <tr>
          <th></th>
          <th>GroupMenu</th>
          <th>Permission</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><Input type="checkbox" /></th>
          <td></td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    </PageBox>
);
} 

export default AddRole;