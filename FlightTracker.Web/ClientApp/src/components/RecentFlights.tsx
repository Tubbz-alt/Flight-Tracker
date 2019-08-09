﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FlightData } from '../services/Models';
import FlightsTable from './FlightsTable';
import { ServicesContext } from '../Context';

interface State {
    flights?: FlightData[];
}

export default class RecentFlight extends Component<any, State> {
    static displayName = RecentFlight.name;
    static contextType = ServicesContext;

    context!: React.ContextType<typeof ServicesContext>;

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        const flights = await this.context.api.getFlights(3);
        this.setState({
            flights: flights
        });
    }

    public render() {
        if (!this.state.flights) return null;
        return <>
            <FlightsTable flights={this.state.flights} />
            <Link to='/flights'>View more</Link>
        </>
    }
}