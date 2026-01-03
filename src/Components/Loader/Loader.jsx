import React from 'react';


const Loader = () => {
    return (
        <div className='grid place-items-center min-h-screen'>
            <div className='text-5xl'>
                <span className="loading loading-ring loading-xl"></span>
            </div>
        </div>
    );
};

export default Loader;