import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'


class Lyrics extends Component {
    //we need this particular info only here, so we use class level state instead of application level state
    state = {
        track: {},
        lyrics: {}
    }
    componentDidMount() {
        const requestTrack = axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MUSIXMATCH_APIKEY}`);
        const requestLyrics = axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MUSIXMATCH_APIKEY}`);

        axios.all([requestTrack, requestLyrics]).then(axios.spread((...responses) => {
            const responseTracks = responses[0];
            const responseLyrics = responses[1];
            const track = responseTracks.data.message.body.track;
            const lyrics = responseLyrics.data.message.body.lyrics;
            this.setState({ track });
            this.setState({ lyrics });
            console.log("tracks");
            console.log(this.state.track);
            console.log("lyrics");
            console.log(this.state.lyrics);

        })).catch(errors => {
            console.log('error: ' + errors)
        })

        //THIS IS ONLY ONE AXIOS GET REQUEST
        //ANOTHER WAY OF USING AXIOS WITH MULTIPLE REQUESTS: After first request, just add the second with "return" statement
        // axios
        //     .get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MUSIXMATCH_APIKEY}`)
        //     .then(result => {
        //         const lyrics = result.data.message.body.lyrics;
        //         console.log('liyrics fetching');
        //         console.log(result.data);
        //         this.setState({ lyrics });
        //         console.log("lyrics state");
        //         console.log(this.state.lyrics)
        //     })
        //     .catch(err => console.log('error: ' + err));

    }
    render() {
        const { track, lyrics } = this.state;
        if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
            return (
                <Spinner />
            );
        } else {
            return (
                <React.Fragment>
                    <div className="container px-0">
                        <div className="row justify-content-between mx-0">
                            <Link className="btn btn-dark btn-lg my-4" to="/"><FontAwesomeIcon icon={faChevronLeft} />{' '}Go Back</Link>

                            <a className="btn btn-success btn-lg my-4" rel="noreferrer" target="_blank" href={track.track_edit_url}>
                                Edit the song{' '}
                                <FontAwesomeIcon icon={faChevronRight} />
                            </a>
                        </div>
                    </div>
                    <div className="card-header bg-primary h4 text-light rounded">
                        {track.track_name} by {' '} <span className="text-dark">{track.artist_name}</span>
                    </div>
                    <div className="card-body bg-light rounded">
                        <p className="card-text">{lyrics.lyrics_body}</p>
                    </div>
                    <ul className="list-group mt-0 mb-5" style={{ "flexDirection": "row" }}>
                        <li className="list-group-item col-sm-4">
                            <strong>Track Rating: </strong>{' '}{track.track_rating}
                        </li>
                        <li className="list-group-item col-sm-4" style={{
                            "borderTopLeftRadius": "inherit",
                            "borderTopRightRadius": "inherit",
                            "borderTopWidth": "1px",
                        }}>
                            <strong>Track Explicit: </strong>{' '}{track.explicit === 0 ? 'No' : 'Yes'}
                        </li>
                        <li className="list-group-item col-sm-4" style={{
                            "borderTopLeftRadius": "inherit",
                            "borderTopRightRadius": "inherit",
                            "borderTopWidth": "1px",

                        }}>
                            <strong>Release Date: </strong>{' '}{(lyrics.updated_time).substring(0, 4)}
                        </li>
                    </ul>

                </React.Fragment>
            );
        }
    }
}

export default Lyrics
