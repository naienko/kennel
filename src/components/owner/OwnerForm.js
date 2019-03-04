import React, { Component } from "react";

export default class OwnerForm extends Component {
    // Set initial state
    state = {
        ownerName: "",
        ownerPhone: ""
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
    constructNewOwner = event => {
        event.preventDefault();
        const owner = {
            name: this.state.ownerName,
            phoneNumber: this.state.ownerPhone,
        };
            
        // Create the animal and redirect user to animal list
        this.props
            .addOwner(owner)
            .then(() => this.props.history.push("/owners"));
    };
    
    render() {
        return (
            <React.Fragment>
                <form className="ownerForm">
                    <div className="form-group">
                        <label htmlFor="ownerName">Owner name</label>
                            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="ownerName" placeholder="Owner name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ownerNumber">Phone Contact</label>
                            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="ownerNumber" placeholder="phone number" />
                    </div>
                    <button type="submit" onClick={this.constructNewOwner} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}