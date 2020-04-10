const express = require('express');

const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the actions',
      });
    });
  });


  module.exports = router;