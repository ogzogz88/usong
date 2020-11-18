import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPlay, faMusic } from '@fortawesome/free-solid-svg-icons'

const Track = ({ track }) => {

    return (
        <div className="col-md-6">
            <div key={track.track_id} className="card mb-4 shadow-lg rounded">
                <div className="card-body">
                    <h5 className="text-primary">{track.artist_name}</h5>
                    <p className="card-text">
                        <strong>
                            <FontAwesomeIcon icon={faMusic} />{' '}
                        Track </strong>: {track.track_name}
                    </p>
                    <p className="card-text">
                        <strong>
                            <FontAwesomeIcon icon={faPlay} />{' '}
                        Album </strong>: {track.album_name}
                    </p>
                    <Link
                        className='btn btn-primary btn-block d-flex justify-content-between align-items-center'
                        to={`lyrics/track/${track.track_id}`}
                    >
                        View Lyrics
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default Track;

