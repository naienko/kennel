import React, { Component } from "react";
import OwnerManager from "../../modules/api/OwnerManager";

export default class OwnerEditForm extends Component {
    // Set initial state
    state = {
        ownerName: "",
        ownerNumber: ""
    };
    
    // Update state whenever an input field is edited
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };
    
    updateExistingOwner = event => {
        event.preventDefault();
        const editedOwner = {
            id: this.props.match.params.ownerId,
            name: this.state.ownerName,
            phoneNumber: this.state.ownerNumber,
        };
            
        // Create the animal and redirect user to animal list
        this.props.updateOwner(editedOwner)
            .then(() => this.props.history.push("/owners"));
    };

    componentDidMount() {
        OwnerManager.get(this.props.match.params.ownerId)
            .then(owner => {
                this.setState({
                    ownerName: owner.name,
                    ownerNumber: owner.phoneNumber
                });
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <form className="ownerForm">
                    <div className="form-group">
                        <label htmlFor="ownerName">Owner name</label>
                            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="ownerName" value={this.state.ownerName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ownerNumber">Phone Contact</label>
                            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="ownerNumber" value={this.state.ownerNumber} />
                    </div>
                    <button type="submit" onClick={this.updateExistingOwner} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}