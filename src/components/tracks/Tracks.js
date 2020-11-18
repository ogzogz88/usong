import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';




class Tracks extends Component {
    render() {
        return (
            <Consumer>
                {
                    value => {
                        const { track_list } = value;
                        if (track_list === undefined || track_list.length === 0) {
                            console.log(track_list);
                            return (
                                <Spinner />
                            );

                        } else {
                            return (
                                <React.Fragment>
                                    <h1>{value.heading}</h1>
                                    <ul>
                                        {
                                            track_list.map(track => {
                                                return (
                                                    <React.Fragment>
                                                        <ul>
                                                            <li key={track.track.track_id}>
                                                                <p>Track name: {track.track.track_name}</p>
                                                            </li>
                                                        </ul>
                                                    </React.Fragment>
                                                );
                                            })

                                        }
                                    </ul>
                                </React.Fragment>
                            );


                        }
                    }
                }

            </Consumer>
        );
    }
}


export default Tracks;
