import React, { Component } from 'react';
import { Link } from "react-router-dom";

class EmployeeList extends Component {
    render() {
        return (
            <section className="employees">
            <h1>Employee List</h1>
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card">
                        {employee.name}
                        <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                        <a href="#"
                            onClick={() => this.props.deleteEmployee(employee.id)}>Delete</a>
                    </div>
                )
            }
            </section>
        )
    }
}

export default EmployeeList