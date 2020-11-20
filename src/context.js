import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
let initialState;
const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_TRACK':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Search Results'
            };
        case 'INITIAL':
            return {
                ...state,
                track_list: initialState["track_list"],
                heading: 'Top 10 Tracks',
            };
        case 'LOADING_TRUE':
            return {
                ...state,
                loading: true
            };
        case 'LOADING_FALSE':
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

export class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track_list: [],
            heading: 'Top 10 Tracks',
            dispatch: action => this.setState(state => reducer(state, action)),
            loading: false
        };
    }



    componentDidMount() {
        axios
            .get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIXMATCH_APIKEY}`)
            .then(result => {
                const track_list = result.data.message.body.track_list;
                console.log(track_list);
                initialState = { track_list };
                this.setState({ track_list });
            })
            .catch(err => console.log('error: ' + err));

    }
    render() {
        return (
            <Context.Provider value={this.state} >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
