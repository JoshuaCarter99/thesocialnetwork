const { User, Thoughts } = require('../models');

module.exports = {

  // get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // get a single thought by id
  getSingleThoughts(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: _id } },
          { new: true },
        )
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Could not locate thought by the provided id' })
          return
        }
        res.json(user)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },

  // update a thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ thoughts: 'No thought with the provided id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete(
      { _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No user with that ID' })
          : thoughts.deleteMany({ _id: { $in: username } })
      )
      .then(() => res.json({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  
  // create a reaction
  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet:{ reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) => {
        if (!thoughts) {
          res.status(404).json({ message: 'Could not locate thought by the provided info' })
          return
        }
        res.json(thoughts)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },

  // delete a reaction
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(      
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
      )
      .select('-__v')
      .then((Reaction) =>
        !Reaction
          ? res.status(404).json({ message: 'No reaction with the provided ID' })
          : res.json(Reaction)
      )
      .catch((err) => res.status(500).json(err));
  },



};