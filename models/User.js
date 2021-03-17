const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: 'Username is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is Required',
        match: [/.+@.+\..+/]
      },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
      }
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);
// is this right?
UserSchema.virtual('friendsCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
