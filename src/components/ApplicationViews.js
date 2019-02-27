import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from "./AnimalList"
import LocationList from "./LocationList"
import EmployeeList from "./employee/EmployeeList"
import OwnerList from "./OwnerList"

class ApplicationViews extends Component {

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: []
    }

    componentDidMount() {
        const newState = {}
    
        fetch("http://localhost:5002/animals")
            .then(r => r.json())
            .then(animals => newState.animals = animals)

            .then(() => fetch("http://localhost:5002/employees")
            .then(r => r.json()))
            .then(employees => newState.employees = employees)

            .then(() => fetch("http://localhost:5002/locations")
            .then(r => r.json()))
            .then(locations => newState.locations = locations)

            .then(() => fetch("http://localhost:5002/owners")
            .then(r => r.json()))
            .then(owners => newState.owners = owners)
            
            .then(() => this.setState(newState))
    }

    render() {
        return (
            <div id="body">
                <Route exact path="/" render={() => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={() => {
                    return <AnimalList animals={this.state.animals} />
                }} />
                <Route path="/employees" render={() => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
                <Route path="/owners" render={() => {
                    return <OwnerList owners={this.state.owners} />
                }} />
            </div>
        )
    }
}

export default ApplicationViews