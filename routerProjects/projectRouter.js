const express = require('express');

const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');
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
  });

  router.get('/', (req, res) => {
    Projects.getAll(req.query)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the projects',
      });
    });
  });

  router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the project actions',
      })
    })
  });

  router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the project',
      });
    });
  });

  router.post('/:id', (req, res) => {
    const data = { ...req.body, project_id: req.params.id };
    Actions.insert(data)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log("Error adding new post.", err);
        res.status(500).json({ message: "Error adding actions to project" });
      });
  });

  router.delete('/:id', (req, res) =>  {
    Projects.remove(req.params.id)
    .then(project => {
      if (project.length == 0) {
        res.status(500).json({
          message: "No Project Found"
        });
      } else {
        res.status(200).json({
          message: "Project deleted"
        });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the Project',
      });
    });
  });

  router.put('/:id', (req, res) =>  {
    const changes = req.body;
    Projects.update(req.params.id,changes)
    .then(() => {
      if (!changes.name || !changes.description) {
        res.status(400).json({ errorMessage: "Text field can't be empty" });
      } else {
        res.status(200).json({ message: `Project updated.` });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the project',
      });
    });
  })


  module.exports = router;