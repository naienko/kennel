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
import AnimalDetail from './animal/AnimalDetail';
import EmployeeDetail from './employee/EmployeeDetail';
import OwnerDetail from "./owner/OwnerDetail";
import AnimalForm from "./animal/AnimalForm";
import EmployeeForm from "./employee/EmployeeForm";
import OwnerForm from "./owner/OwnerForm";

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

            .then(() => EmployeeManager.getAll())
            .then(employees => newState.employees = employees)

            .then(() => LocationManager.getAll())
            .then(locations => newState.locations = locations)

            .then(() => OwnerManager.getAll())
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
        EmployeeManager.deleteAndGetAll(id)
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

    addAnimal = animal => {
        AnimalManager.post(animal)
        .then(() => AnimalManager.getAll())
        .then(animals =>
            this.setState({
                animals: animals
            })
        );
    }

    addEmployee = employee => {
        EmployeeManager.post(employee)
        .then(() => EmployeeManager.getAll())
        .then(employees =>
            this.setState({
                employees: employees
            })
        );
    }

    addOwner = owner => {
        OwnerManager.post(owner)
        .then(() => OwnerManager.getAll())
        .then(owners =>
            this.setState({
                owners: owners
            })
        );
    }

    render() {
        return (
            <div id="body">
                <Route exact path="/" render={() => {
                    return <LocationList locations={this.state.locations} />
                }} />

                <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props}
                        animals={this.state.animals} 
                        ownersToAnimals={this.state.ownersToAnimals} 
                        deleteAnimal={this.deleteAnimal} />
                }} />
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                       addAnimal={this.addAnimal}
                       owners={this.state.owners}
                       employees={this.state.employees} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    return <AnimalDetail {...props} 
                        deleteAnimal={this.deleteAnimal}
                        ownersToAnimals={this.state.ownersToAnimals}
                        animals={this.state.animals} />
                }} />

                <Route exact path="/employees" render={(props) => {
                    return <EmployeeList {...props}
                        employees={this.state.employees}
                        deleteEmployee={this.deleteEmployee} />
                }} />
                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee} />
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail {...props} 
                        deleteEmployee={this.deleteEmployee}
                        employees={this.state.employees} />
                }} />

                <Route exact path="/owners" render={(props) => {
                    return <OwnerList {...props}
                        owners={this.state.owners}
                        deleteOwner={this.deleteOwner} />
                }} />
                <Route path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                        addOwner={this.addOwner} />
                }} />
                <Route path="/owners/:ownerId(\d+)" render={(props) => {
                    return <OwnerDetail {...props} 
                        deleteOwner={this.deleteOwner}
                        owners={this.state.owners} />
                }} />
            </div>
        )
    }
}

export default ApplicationViews