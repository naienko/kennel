import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from "./animal/AnimalList"
import LocationList from "./location/LocationList"
import EmployeeList from "./employee/EmployeeList"
import OwnerList from "./owner/OwnerList"
import AnimalManager from '../modules/api/AnimalManager';
import EmployeeManager from '../modules/api/EmployeeManager';
import LocationManager from '../modules/api/LocationManager';
import OwnerManager from '../modules/api/OwnerManager';

class ApplicationViews extends Component {

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: [],
        ownersToAnimals: []
    }

    componentDidMount() {
        const newState = {}
    
        AnimalManager.getAll()
            .then(animals => newState.animals = animals)

        EmployeeManager.getAll()
            .then(employees => newState.employees = employees)

        LocationManager.getAll()
            .then(locations => newState.locations = locations)

        OwnerManager.getAll()
            .then(owners => newState.owners = owners)

            .then(() => fetch("http://localhost:5002/ownersAnimals?_expand=owner&_expand=animal")
            .then(r => r.json()))
            .then(ownersToAnimals => newState.ownersToAnimals = ownersToAnimals)

            .then(() => this.setState(newState))
    }

    deleteAnimal = id => {
        return fetch(`http://localhost:5002/animals/${id}`, {
            method: "DELETE"
        })
        .then(() => fetch("http://localhost:5002/ownersAnimals?_expand=owner&_expand=animal"))
        .then(e => e.json())
        .then(ownersToAnimals => this.setState({
            ownersToAnimals: ownersToAnimals
        })
      )
    }

    deleteEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
        .then(() => fetch("http://localhost:5002/employees"))
        .then(e => e.json())
        .then(employees => this.setState({
            employees: employees
        })
      )
    }

    deleteOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
        .then(() => fetch("http://localhost:5002/owners"))
        .then(e => e.json())
        .then(owners => this.setState({
            owners: owners
        })
        .then(() => fetch("http://localhost:5002/ownersAnimals?_expand=owner&_expand=animal"))
        .then(e => e.json())
        .then(ownersToAnimals => this.setState({
            ownersToAnimals: ownersToAnimals
        }))
      )
    }

    render() {
        return (
            <div id="body">
                <Route exact path="/" render={() => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={() => {
                    return <AnimalList animals={this.state.animals} 
                        ownersToAnimals={this.state.ownersToAnimals} 
                        deleteAnimal={this.deleteAnimal} />
                }} />
                <Route path="/employees" render={() => {
                    return <EmployeeList employees={this.state.employees}
                    deleteEmployee={this.deleteEmployee} />
                }} />
                <Route path="/owners" render={() => {
                    return <OwnerList owners={this.state.owners}
                        deleteOwner={this.deleteOwner} />
                }} />
            </div>
        )
    }
}

export default ApplicationViews