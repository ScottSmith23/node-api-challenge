const express = require('express');

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the projects',
      })
    })
  })


  module.exports = router;