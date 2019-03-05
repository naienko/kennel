import React, { Component } from 'react';
import Animal from "./Animal";

export default class AnimalDetail extends Component {
	render() {
		let isDetailView = null;
		this.props.match.params.animalId ? isDetailView = true : isDetailView = false;
		
		const animal = this.props.animals.find(element =>
			element.id === parseInt(this.props.match.params.animalId)) || {
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
				species={this.props.species.filter(element => element.id === animal.speciesId)}
				key={animal.id} 
				isDetailView={isDetailView} 
				deleteAnimal={this.props.deleteAnimal}
			 />
		);
	}
};