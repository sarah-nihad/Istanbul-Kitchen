import React, { Component } from 'react';
import { Link ,NavLink} from 'react-router-dom'
import DepartTable from "../Table/DepartTable";
import DepartNew from "../common/DepartNew";

class Department extends Component {
    render() {
        return (
          <div id="main_sec">
            <div id="main_row">
              <div style={{ width: "100%" }}>
                <DepartNew />
              </div>

              <div style={{ width: "100%" }} id="rightdiv">
                <NavLink to="/Department" activeClassName="active">
                  <div id="sect1">الاقسام</div>
                </NavLink>
              </div>
            </div>

            <DepartTable />
          </div>
        );
    }
}

export default Department;