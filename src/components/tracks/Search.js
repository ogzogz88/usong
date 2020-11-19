import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackTitle: ''
        }
    }

    onChange(e) {
        this.setState({ trackTitle: e.target.value });
        console.log('state: ' + this.state.trackTitle);

    }
    findTrack(dispatch, e) {
        e.preventDefault();
        dispatch({ type: 'LOADING_TRUE' });
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page=1&page_size=10&apikey=${process.env.REACT_APP_MUSIXMATCH_APIKEY}`)
            .then(response => {
                console.log(response.data.message.body.track_list);
                dispatch({
                    type: 'SEARCH_TRACK',
                    payload: response.data.message.body.track_list
                });
                dispatch({ type: 'LOADING_FALSE' });
            })
            .catch(error => console.log(error));
        this.setState({ trackTitle: '' });

    }
    clear(dispatch) {
        dispatch({ type: 'INITIAL' });
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <FontAwesomeIcon icon={faMusic} />{''} Search For A Song
                            </h1>
                            <p className="lead text-center">
                                Get the lyrics for a song
                            </p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg mb-4"
                                        placeholder="Enter a song title"
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={this.onChange.bind(this)}
                                    />

                                    <button
                                        className="button btn btn-dark btn-lg btn-block mb-xs-2"
                                        type="submit"
                                    >
                                        Get The Lyrics
                                    </button>
                                </div>
                            </form>
                            <div className="d-flex justify-content-center mb-xs-2 mb-md-4">
                                <button className="btn btn-secondary" onClick={this.clear.bind(this, dispatch)}>Top 10 Tracks</button>
                            </div>
                        </div>
                    );
                }

                }
            </Consumer>
        )
    }
}

export default Search;
