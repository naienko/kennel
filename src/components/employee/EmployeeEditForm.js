import React, { Component } from "react";
import EmployeeManager from "../../modules/api/EmployeeManager";

export default class EmployeeEditForm extends Component {
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

    updateExistingEmployee = event => {
        event.preventDefault();
        const editedEmployee = {
            id: this.props.match.params.employeeId,
            name: this.state.employeeName,
        };
    
            // Create the object and redirect user to list
        this.props.updateEmployee(editedEmployee)
            .then(() => this.props.history.push("/employees"))
    };
    
    componentDidMount() {
        EmployeeManager.get(this.props.match.params.employeeId)
            .then(employee => {
                this.setState({
                    employeeName: employee.name,
                });
        });
    }

    render() {
        return (
            <React.Fragment>
                <form className="employeeForm">
                    <div className="form-group">
                        <label htmlFor="employeeName">Employee Name</label>
                            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="employeeName" value={this.state.employeeName} />
                    </div>
                    <button type="submit" onClick={this.updateExistingEmployee} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}