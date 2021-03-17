const { User } = require('../models');

const userController = {
    // get all user - getAllUser method
        //callback function for the GET /api/User route
    getAllUser(req, res) {
      User.find({})
      .populate({           // added so with thoughtID, the thought(s) is populated as well.
        path: 'thoughts',   //    thoughts added
        select: '-__v'      //    exclude the __v in the thoughts
      })                    //    end popoulate.
        .select('-__v')     //    with excluded __v above.
        .sort({ _id: -1 })      // adding sort() method to sort DESC, to get latest User
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // get one User by id
        //  rather than accessing entire req, destructure just params from it
        // -- updated to get thoughts from single User
          getUserById({ params }, res) {
            User.findOne({ _id: params.id })
              .populate({
                path: 'thoughts',
                select: '-__v'
              })
              .select('-__v')
              .then(dbUserData => res.json(dbUserData))
              .catch(err => {
                console.log(err);
                res.sendStatus(400);
              });
          },

     
    // createUser
        // create method for handling POST /api/User to add a User to the database
                // destructure the body out of the Express.js req object 
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update User by id
        // request to PUT /api/User/:id   to find a single document
                // Note: without { new: true }, will return original doc. 
                 // By setting to true, Mongoose will return new version of doc
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete User
        // request to DELETE /api/User/:id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //add a friend to a user's friend list
    addFriend({params}, res) {
      User.findOneAndUpdate(
          {_id: params.userId},
          {$push: {friends: params.friendsId}},
          {new: true}
      )
      .then (dbUserData => {
          if(!dbUserData) {
              res.status(404).json({message: 'No user found with this id.'});
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  //delete a friend from a user's friend list
  removeFriend({params}, res) {
      User.findOneAndUpdate(
          {_id: params.userId},
          {$pull: {friends: params.friendsId}},
          {new: true}
      )
      .then (dbUserData => {
          if(!dbUserData) {
              res.status(404).json({message: 'No user found with this id.'});
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }

};


module.exports = userController;