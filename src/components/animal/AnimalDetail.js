import React, { Component } from 'react';
import Animal from "./Animal";

export default class AnimalDetail extends Component {
    render() {
        let isDetailView = null;
        this.props.match.params.animalId ? isDetailView = true : isDetailView = false;

        const animal = this.props.ownersToAnimals.find(element =>
            element.animal.id === parseInt(this.props.match.params.animalId)) || {
                    "id": 999999999,
                    "owner": {
                      "id": 0,
                      "name": "N/A",
                      "phoneNumber": ""
                    },
                    "animal": {
                      "id": 0,
                      "name": "404"
                    }
            }

        return (
            <Animal animal={animal.animal} 
                            owner={animal.owner} 
                            key={animal.id} 
                            isDetailView={isDetailView} 
                            deleteAnimal={this.props.deleteAnimal} />
            );
        }
    };