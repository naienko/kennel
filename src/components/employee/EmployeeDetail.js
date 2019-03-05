import React, { Component } from "react"

export default class EmployeeDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const employee = this.props.employees.find(element => element.id === parseInt(this.props.match.params.employeeId)) || {}

        return (
            <section className="employee">
                <div key={employee.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {employee.name}
                        </h4>
                        <button type="button" className="btn btn-success" 
                                onClick={() => { this.props.history.push(`/employees/${employee.id}/edit`); }}
                                >Edit</button>
                        <a href="#"
                            onClick={() => this.props.deleteEmployee(employee.id)
                                            .then(() => this.props.history.push("/employees"))}
                            className="card-link">Delete</a>
                    </div>
                </div>
            </section>
        )
    }
}