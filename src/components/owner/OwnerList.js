import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class OwnerList extends Component {
    render() {
        return (
            <section className="owners">
                <h1>Owner List</h1>
                {
                    this.props.owners.map(owner => 
                        <div key={owner.id} className="card">
                            <h3>{owner.name}</h3>
                            <Link className="nav-link" to={`/owners/${owner.id}`}>Details</Link>
                            <a href="#"
                            onClick={() => this.props.deleteOwner(owner.id)}>Delete</a>
                        </div>
                        )
                }
            </section>
        );
    }
}