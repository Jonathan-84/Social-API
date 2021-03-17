//import models needed
const { Thoughts, User } = require('../models');

// create object

const thoughtsController = {

  getAllThoughts(req, res) {
    Thoughts.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
},

    //get a single thought by id
    getThoughtsById({params}, res) {
      Thoughts.findOne({_id: params.id})
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                  res.status(404).json({message: 'No thought found with this id.'});
                  return;
              }
              res.json(dbThoughtData);
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
  },

    // add Thought to User, return a User Promise
    addThoughts({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              // -- update the array with $push method, $ sign denotes MongoDB-based function
              { $push: { thoughts: _id } }, // -- push method will add Thoughts' ID to the User
              { new: true, runValidators: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'Your thought has been added!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      // add Reaction method resides within the thoughtController, 
        // note: new reaction are NOT adding, are Updating an existing Thought
      addReactions({ params, body }, res) {
        Thoughts.findOneAndUpdate(
          { _id: params.thoughtsId },
          { $push: { reaction: body } },
          { new: true, runValidators: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      updateThoughts({ params, body }, res) {
        console.log("params",params);
        console.log("body", body);
        Thoughts.findOneAndUpdate(
            { _id: params.id}, body,{ new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Cannot update this thought, try again!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
  
    // remove Thought, remove Thought & remove Thought ID from its User 
    removeThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'Thought not deleted, try again!!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtsId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'You thought has been deleted!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

    // remove Reaction with $pull operator
    removeReactions({ params }, res) {
      Thoughts.findOneAndUpdate(
        { _id: params.thoughtsId },
        { $pull: { reaction: { reactionId: params.reactionId } } },
        { new: true }
      )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

 //update thoughts needs to be added.  (the updateThoughts)
  
  module.exports = thoughtsController;