import React, { Component } from 'react'

export default class LocationList  extends Component {
    render() {
        return (
            <section className="locations">
                <h1>Location List</h1>
                {
                    this.props.locations.map(location => 
                        <div key={location.id}>
                            <h3>{location.name}</h3>
                            {location.address}
                        </div>
                        )
                }
            </section>
        );
    }
}