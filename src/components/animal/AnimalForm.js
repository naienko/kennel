import React, { Component } from "react";
import "./Animal.css";

export default class AnimalForm extends Component {
    // Set initial state
    state = {
        animalName: "",
        breed: "",
        employeeId: "",
        ownerId: ""
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
    constructNewAnimal = event => {
        event.preventDefault();
        if (this.state.employee === "") {
            window.alert("Please select a caretaker");
        } else {
            const animal = {
                name: this.state.animalName,
                breed: this.state.breed,
                // Make sure the employeeId is saved to the database as a number since it is a foreign key.
                employeeId: parseInt(this.state.employeeId)
            };
            // Create the animal and redirect user to animal list
            this.props
                .addAnimal(animal)
                .then(() => this.props.history.push("/animals"));
        }
    };
    
    render() {
        return (
            <React.Fragment>
                <form className="animalForm">
                    <div className="form-group">
                        <label htmlFor="animalName">Animal name</label>
                            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="animalName" placeholder="Animal name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="breed">Breed</label>
                            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="breed" placeholder="Breed" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="owner">Owned by</label>
                            <select defaultValue="" name="owner" id="ownerId" onChange={this.handleFieldChange}>
                                <option value="">Select an owner</option>
                                    {this.props.owners.map(element => (
                                        <option key={element.id} id={element.id} value={element.id}>
                                            {element.name}
                                        </option>
                                    ))}
                            </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="employee">Assign to caretaker</label>
                            <select defaultValue="" name="employee" id="employeeId" onChange={this.handleFieldChange}>
                                <option value="">Select an employee</option>
                                    {this.props.employees.map(element => (
                                        <option key={element.id} id={element.id} value={element.id}>
                                            {element.name}
                                        </option>
                                    ))}
                            </select>
                    </div>
                    <button type="submit" onClick={this.constructNewAnimal} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}