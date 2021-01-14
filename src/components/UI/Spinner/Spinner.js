import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
    <>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block', zIndex: '100' }}
            alt='Loading...'
        />
    </>
);

export default Spinner