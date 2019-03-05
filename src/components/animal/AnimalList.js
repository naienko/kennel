import React, { Component } from 'react'
import Animal from "./Animal"

export default class AnimalList extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Animal List</h1>
                <div className="animalButton">
                    <button type="button" className="btn btn-success" onClick={() => {
                        this.props.history.push("/animals/new")}
                    }>Admit Animal</button>
                </div>
                <section className="animals">
                    {
                        this.props.animals.map(animal => 
                            <Animal {...this.props} animal={animal} 
                                owners={
                                    this.props.ownersToAnimals
                                        .filter(ao => ao.animalId === animal.id)
                                        .map(ao =>
                                            this.props.owners.find(
                                                o => o.id === ao.ownerId
                                            ).name
                                        )
                                }
                                species={this.props.species.filter(element => element.id === animal.speciesId).name}
                                key={`animal-${animal.id}`} 
                                deleteAnimal={this.props.deleteAnimal} />
                        )
                    }
                </section>
            </React.Fragment>
        );
    }
}