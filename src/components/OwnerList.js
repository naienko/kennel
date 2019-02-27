import React, { Component } from 'react'

export default class OwnerList extends Component {
    render() {
        return (
            <section className="locations">
                <h1>Owner List</h1>
                {
                    this.props.owners.map(owner => 
                        <div key={owner.id}>
                            <h3>{owner.name}</h3>
                            {owner.phoneNumber}
                        </div>
                        )
                }
            </section>
        );
    }
}