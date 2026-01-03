import React from 'react';

const Review = ({ review }) => {
    return (
        <div className='bg-base-300 rounded-2xl p-4 shadow-md'>
            <div className='flex gap-2 items-center'>
                <img src={review?.userImage} alt="user image" className='h-12 w-12 rounded-full border' />
                <h4 className='font-bold text-gray-600'>{review.user}</h4>
            </div>
            <div className=' rounded-xl ml-[72px]'>
                <p className='text-gray-500'>{review.comment}</p>
            </div>
        </div>
    );
};

export default Review;