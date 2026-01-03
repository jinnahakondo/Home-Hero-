import React, { useEffect, useState } from 'react';
import ChooseCard from './ChooseCard';
import axios from 'axios';

const ChooseUs = () => {
    const [details, setDetails] = useState([])
    useEffect(() => {
        axios.get('./choose.json')
            .then(data => {
                setDetails(data.data);
            })
    }, [])

    return (
        <div>
            <h2 className='heading text-center mb-5'>Why Choose Us</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    details.map(card => <ChooseCard key={card.id} card={card} />)
                }
            </div>
        </div>
    );
};

export default ChooseUs;