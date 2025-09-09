// components/Reviews.tsx
import React from 'react';

// export const Reviews = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold">Reviews</h2>
//       {/* Add your review listing logic here */}
//     </div>
//   );
// };









export const Reviews=async()=>{
    // Simulate fetching reviews data
    // const reviews = [
    //     { id: 1, text: "Great product!", rating: 5 },
    //     { id: 2, text: "Good value for money.", rating: 4 },
    //     { id: 3, text: "Average quality.", rating: 3 },
    // ];
    // return (
    //     <div>
    //         <h2>Product Reviews</h2>
    //         <ul>
    //             {reviews.map(review => (
    //                 <li key={review.id}>
    //                     <p>{review.text}</p>
    //                     <p>Rating: {review.rating}</p>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );

    await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate network delay

    return (
        <div>
            <h2>Product Reviews Rishu</h2>
            {/* <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <p>{review.text}</p>
                        <p>Rating: {review.rating}</p>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};
