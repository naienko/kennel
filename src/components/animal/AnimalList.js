import React, { Component } from 'react'
import Animal from "./Animal"

export default class AnimalList extends Component {
    render() {
        return (
            <section className="animals">
                <h1>Animal List</h1>
                {
                    this.props.ownersToAnimals.map(animal => 
                        <Animal animal={animal.animal} 
                            owner={animal.owner} 
                            key={animal.id} 
                            deleteAnimal={this.props.deleteAnimal} />
                        )
                }
            </section>
        );
    }
}