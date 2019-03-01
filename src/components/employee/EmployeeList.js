import React, { Component } from 'react'

class EmployeeList extends Component {
    render() {
        return (
            <section className="employees">
            <h1>Employee List</h1>
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card">
                        {employee.name}
                        <a href="#"
                            onClick={() => this.props.deleteEmployee(employee.id)}
                            className="card-link">Delete</a>
                    </div>
                )
            }
            </section>
        )
    }
}

export default EmployeeList