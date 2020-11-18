import React from 'react';
import spinner from '../../assets/spinner.svg';

export const Spinner = () => {
    return (
        <div>
            <img src={spinner} alt="Loading..." style={{ width: '200px', margin: '180px auto', display: 'block' }} />
        </div>
    )
}
export default Spinner;
