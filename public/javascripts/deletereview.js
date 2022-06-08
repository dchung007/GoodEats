const express = require('express')
const router = express.Router()
const {User, Restaurant, Review, MenuItem} = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');
const { requireAuth } = require("../auth");


router.use(requireAuth);

// router.delete('/restaurants/:restaurantid(\\d+)/reviews/:id(\\d+)',
//     csrfProtection,
//     requireAuth,
//     asyncHandler(async (req, res) => {
//         const reviewId = req.params.id;
//         const review = await Review.findByPk(reviewId);

//         //delete if review can be found
//         if (review){
//             await review.destroy();
//             res.status(204).end;
//         } else{
//             next (reviewNotFoundError(reviewId));
//         }
// }));

document.addEventListener("DOMContentLoaded", async () => {
const deleteButtons = document.querySelectorAll(".delete-botton");
for (let i = 0; i < deleteBottons.length; i++){
    const button = deleteButtons[i];

    button.addEventListener('click', async(e) =>{
        e.preventDefault();
        const reviewId = e.target.id.split('-')[2];
        const res = await fetch(`/restaurants/${req.params.restaurantid}/reviews/${reviewId}`),{
                method: 'DELETE'
        }})
        }
    )
};
