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

  router.delete('/:id', (req, res) =>  {
    Actions.remove(req.params.id)
    .then(action => {
      if (action.length == 0) {
        res.status(500).json({
          message: "No Action Found"
        });
      } else {
        res.status(200).json({
          message: "Action deleted"
        });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the Action',
      });
    });
  });

  router.put('/:id', (req, res) =>  {
    const changes = req.body;
    Actions.update(req.params.id,changes)
    .then(() => {
      if (!changes.description || !changes.notes) {
        res.status(400).json({ errorMessage: "Text field can't be empty" });
      } else {
        res.status(200).json({ message: `action updated.` });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the action',
      });
    });
  })

  module.exports = router;