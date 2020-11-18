import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track_list: [],
            heading: 'Top 10 Tracks'
        };
    }


    componentDidMount() {
        axios
            .get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIXMATCH_APIKEY}`)
            .then(result => {
                const track_list = result.data.message.body.track_list;
                // console.log(track_list);
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
