import React, { Component } from "react";

export default class EmployeeForm extends Component {
    // Set initial state
    state = {
        employeeName: "",
    };
    
    // Update state whenever an input field is edited
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };
    
    /*
    Local method for validation, creating animal object, and
    invoking the function reference passed from parent component
    */
    constructNewEmployee = event => {
        event.preventDefault();
        const employee = {
            name: this.state.employeeName,
        };
    
            // Create the object and redirect user to list
        this.props
            .addEmployee(employee)
            .then(() => this.props.history.push("/employees"));
    };
    
    render() {
        return (
            <React.Fragment>
                <form className="employeeForm">
                    <div className="form-group">
                        <label htmlFor="employeeName">Employee Name</label>
                            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="employeeName" placeholder="Employee name"/>
                    </div>
                    <button type="submit" onClick={this.constructNewEmployee} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}