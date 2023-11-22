module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  //megtalálja a 3 utoljára szerkesztettet
  router.get("/latest", tutorials.findLatest);

  //ABC szerint növekvő sorrendben összes
  router.get("/titleASC", tutorials.findAllTitleASC);

  //ABC szerint csökkenő sorrendben
  router.get("/titleDESC", tutorials.findAllTitleDESC);

  // Make sure the placeholders in the route match the parameters
  router.get('/searchTitle/:searchWord/:sortype', tutorials.searchTitle);

  router.get('/title/:searchWord', tutorials.findByTitle);

  router.get('/tags/:searchWord', tutorials.findByTags);

  router.get('/findbyDescription/:searchWord', tutorials.findByDescription);

  router.get('/latestcreated/', tutorials.findLatestCreated);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
 router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  app.use('/api/noveny', router);
};
