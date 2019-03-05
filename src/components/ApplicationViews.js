import { Route, Redirect } from 'react-router-dom'
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

import AnimalEditForm from "./animal/AnimalEditForm";
import EmployeeEditForm from "./employee/EmployeeEditForm";
import OwnerEditForm from "./owner/OwnerEditForm";

import Login from "./authentication/Login";

export default class ApplicationViews extends Component {

     // Check if credentials are in local storage
     isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: [],
        ownersToAnimals: [],
        species: []
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

            .then(() => fetch("http://localhost:5002/species"))
            .then(results => results.json())
            .then(species => newState.species = species)

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
        .then(() => AnimalManager.getAll())
        .then(animals => this.setState({
            animals: animals
        }))
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

    updateAnimal = (editedAnimalObject) => {
        return AnimalManager.edit(editedAnimalObject)
            .then(() => AnimalManager.getAll())
            .then(animals => {
                this.setState({
                    animals: animals
                })
            });
    };

    updateEmployee = (editedEmployeeObject) => {
        return EmployeeManager.edit(editedEmployeeObject)
            .then(() => EmployeeManager.getAll())
            .then(employees => {
                this.setState({
                    employees: employees
                })
            });
    };

    updateOwner = (editedOwnerObject) => {
        return OwnerManager.edit(editedOwnerObject)
            .then(() => OwnerManager.getAll())
            .then(owners => {
                this.setState({
                    owners: owners
                })
            });
    };

    render() {
        return (
            <div id="body">
                <Route path="/login" component={Login} />

                <Route exact path="/" render={() => {
                    if (this.isAuthenticated()) {
                        return <LocationList locations={this.state.locations} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/animals" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <AnimalList {...props}
                            animals={this.state.animals} 
                            owners={this.state.owners} 
                            species={this.state.species}
                            ownersToAnimals={this.state.ownersToAnimals} 
                            deleteAnimal={this.deleteAnimal} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/animals/new" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <AnimalForm {...props}
                           addAnimal={this.addAnimal}
                           owners={this.state.owners}
                           species={this.state.species}
                           employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/animals/:animalId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <AnimalDetail {...props} 
                            deleteAnimal={this.deleteAnimal}
                            ownersToAnimals={this.state.ownersToAnimals}
                            owners={this.state.owners}
                            species={this.state.species}
                            animals={this.state.animals} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/animals/:animalId(\d+)/edit" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <AnimalEditForm {...props} 
                            employees={this.state.employees} 
                            owners={this.state.owners} 
                            species={this.state.species} 
                            updateAnimal={this.updateAnimal} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/employees" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props}
                            employees={this.state.employees}
                            deleteEmployee={this.deleteEmployee} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/employees/new" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeForm {...props}
                            addEmployee={this.addEmployee} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/employees/:employeeId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeDetail {...props} 
                            deleteEmployee={this.deleteEmployee}
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/employees/:employeeId(\d+)/edit" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeEditForm {...props} 
                            employees={this.state.employees} 
                            updateEmployee={this.updateEmployee} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/owners" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <OwnerList {...props}
                            owners={this.state.owners}
                            deleteOwner={this.deleteOwner} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/owners/new" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <OwnerForm {...props}
                            addOwner={this.addOwner} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/owners/:ownerId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <OwnerDetail {...props} 
                            deleteOwner={this.deleteOwner}
                            owners={this.state.owners} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/owners/:ownerId(\d+)/edit" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <OwnerEditForm {...props} 
                            owners={this.state.owners} 
                            updateOwner={this.updateOwner} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            </div>
        )
    }
}