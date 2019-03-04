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
                        this.props.ownersToAnimals.map(animal => 
                            <Animal animal={animal.animal} 
                                owner={animal.owner} 
                                key={animal.id} 
                                deleteAnimal={this.props.deleteAnimal} />
                        )
                    }
                </section>
            </React.Fragment>
        );
    }
}