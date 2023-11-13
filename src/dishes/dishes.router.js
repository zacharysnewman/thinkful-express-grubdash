const router = require("express").Router();

// TODO: Implement the /dishes routes needed to make the tests pass
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./dishes.controller");
router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);
router
  .route("/:dishId")
  .put(controller.update)
  .get(controller.read)
  .all(methodNotAllowed);

module.exports = router;
