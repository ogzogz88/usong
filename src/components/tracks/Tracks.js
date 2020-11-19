import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Track from '../tracks/Track';



class Tracks extends Component {

    render() {
        return (
            <Consumer>
                {
                    value => {
                        const { track_list, heading, loading } = value;
                        if (track_list === undefined || track_list.length === 0 || loading === true) {
                            console.log(track_list);
                            return (
                                <Spinner />
                            );

                        } else {
                            return (
                                <React.Fragment>
                                    <h3 className="text-center text-monospace mb-4">{heading}</h3>
                                    <hr />
                                    <div className="row mb-5">
                                        {track_list.map(item => {
                                            return (
                                                <Track track={item.track} />
                                            );

                                        })

                                        }
                                    </div>
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
