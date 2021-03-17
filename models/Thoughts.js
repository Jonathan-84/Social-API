const { Schema, model, Types } = require('mongoose');
var moment = require('moment'); // require


const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: "Please share your reaction.",
        minlength: 1,
        maxlength: 280
    },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        //get:()=> moment().format()
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') 
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const ThoughtsSchema = new Schema (
    {
thoughtsText:{
    type: String,
    required: true, 
    minlength: 1,
    maxlength: 280,
},
createdAt:{
    type: Date,
    default:Date.now, 
    //get:()=> moment().format()
    get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
},
username: {
    type: String,
    required: true
},
reaction: [ReactionSchema],
    },
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;