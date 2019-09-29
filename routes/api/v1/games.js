var express = require("express");
var router = express.Router();
var Game = require('../../../models').Game;

/* GET all games */
router.get("/", function(req, res, next) {
  Game.findAll()
    .then(games => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(games));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

/* GET single game */
router.get("/:id", function (req, res, next) {
  Game.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

/* POST new game */
router.post("/", function(req, res, next) {
  Game.create({
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
    })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/* UPDATE a single resource */
router.put("/:id", function (req, res, next) {
  Game.update(
    {
      title: req.body.title,
      price: req.body.price,
      releaseYear: req.body.releaseYear,
      active: req.body.active
    },
    {
      returing: true,
      where: {
        id: parseInt(req.params.id)
      }
    }
  )
    .then(([rowsUpdate, [updatedGame]]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(202).send(JSON.stringify(updatedGame));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/* DELETE a single game */
router.delete("/:id", function(req, res, next) {
  Game.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(game => {
    res.setHeader("Content-Type", "application/json");
    res.status(204).send(JSON.stringify(game));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  });
})

module.exports = router; //this should stay at the bottom of the file
