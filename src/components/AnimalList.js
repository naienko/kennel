import React, { Component } from 'react'

export default class AnimalList  extends Component {
    render() {
        return (
            <section className="animals">
                <h1>Animal List</h1>
                {
                    this.props.animals.map(animal => 
                        <div key={animal.id}>
                            <h3>{animal.name} - {animal.type}</h3>
                        </div>
                        )
                }
            </section>
        );
    }
}