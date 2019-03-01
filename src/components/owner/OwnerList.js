import React, { Component } from 'react'

export default class OwnerList extends Component {
    render() {
        return (
            <section className="owners">
                <h1>Owner List</h1>
                {
                    this.props.owners.map(owner => 
                        <div key={owner.id} className="card">
                            <h3>{owner.name}</h3>
                            {owner.phoneNumber}
                            <a href="#"
                            onClick={() => this.props.deleteOwner(owner.id)}
                            className="card-link">Delete</a>
                        </div>
                        )
                }
            </section>
        );
    }
}