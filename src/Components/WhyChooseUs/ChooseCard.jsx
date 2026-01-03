import React from 'react';
import { motion } from "motion/react"

const ChooseCard = ({ card }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='group bg-base-200 shadow-sm rounded-lg p-6 hover:bg-primary '>
            <h3
                className='text-xl group-hover:text-white font-semibold text-center my-4 transition-all ease-in-out '>{card.title}</h3>
            <p
                className='text-gray-500 text-center group-hover:text-white transition-all ease-in-out '>{card.description}</p>
        </motion.div>

    );
};

export default ChooseCard;