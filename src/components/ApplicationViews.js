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