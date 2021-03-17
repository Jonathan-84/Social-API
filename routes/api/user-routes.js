const router = require('express').Router();

// connecting to the routes, implementing controller methods
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  addFriend,
  removeFriend,
  deleteUser
} = require('../../controllers/user-controller');

/* May need to add this back
const { update } = require('../../models/User');
*/


// Set up GET all and POST at /api/user

    // /api/user
    router
      .route('/')
      .get(getAllUser)
      .post(createUser);

    // Set up GET one, PUT, and DELETE at /api/user/:id
    // /api/user/:id
    router
      .route('/:id')
      .get(getUserById)
      .put(updateUser)
      .delete(deleteUser);

    router
    .route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;