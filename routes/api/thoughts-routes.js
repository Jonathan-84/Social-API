// import methods from thought-controller file
const router = require('express').Router();
// const { addThought, removeThought } = require('../../controllers/Thought-controller');

// import methods from the thought-controller
const {
        addThoughts,
        getAllThoughts,
        getThoughtsById,
        removeThoughts,
        updateThoughts,
        addReactions,
        removeReactions
      } = require('../../controllers/thoughts-controller');      

// ---------------- routes ----------------
//set up GET and POST routes for /api/thoughts/
router
    .route('/')
    .get(getAllThoughts)
    .post(addThoughts)

//      POST /api/thoughts/<userId>
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(removeThoughts)

//      GET for Thought by ID
//      PUT for Reaction /api/thoughts/<userId>/<thoughtId>  
//      DELETE for thought
router
    .route('/:thoughtsId/reactions')
    .post(addReactions)

//      DELETE route for Reaction /api/thoughts/<userId>/<thoughtId>/<ReactionID>    
router
.route('/:thoughtsId/reactions/:reactionId').delete(removeReactions)

//export 
module.exports = router;