const router = require("express").Router();

// TODO: Implement the /orders routes needed to make the tests pass
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./orders.controller");

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);
router
  .route("/:orderId")
  .put(controller.update)
  .get(controller.read)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
