import React, { Component } from 'react'
import dog from "./DogIcon.png"
import "./Animal.css"

export default class Animal  extends Component {
    render() {
        return (
            <React.Fragment>
            {
                <div key={this.props.animal.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <img src={dog} className="icon--dog" />
                            {this.props.animal.name}
                            <p>({this.props.owner.name})</p>
                            <a href="#"
                            onClick={() => this.props.deleteAnimal(this.props.animal.id)}
                            className="card-link">Delete</a>
                        </h5>
                    </div>
                </div>
            }
            </React.Fragment>
            );
        }
    };