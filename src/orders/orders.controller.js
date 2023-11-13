const path = require("path");

// Use the existing order data
const controller = { orders: require(path.resolve("src/data/orders-data")) };

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass
// TODO: Implement the /dishes handlers needed to make the tests pass
const {
  bodyDataHas,
  propertyIsNotEmptyString,
  bodyIdMatchesIdInRoute,
} = require("../base.middleware");
const {
  isArrayWithAtLeastOneItem,
  arrayValuesAreValid,
  propertyIsOneOfTheseValues,
  orderStatusIsNotPending,
} = require("./orders.middleware");
const baseController = require("../base.controller")(
  controller,
  "orderId",
  "orders"
);

module.exports = {
  create: [
    bodyDataHas("deliverTo"),
    propertyIsNotEmptyString("deliverTo"),
    bodyDataHas("mobileNumber"),
    propertyIsNotEmptyString("mobileNumber"),
    bodyDataHas("dishes"),
    isArrayWithAtLeastOneItem("dishes"),
    arrayValuesAreValid,
    baseController.create,
  ],
  read: [baseController.exists, baseController.read],
  update: [
    baseController.exists,
    bodyIdMatchesIdInRoute("orderId"),
    bodyDataHas("deliverTo"),
    propertyIsNotEmptyString("deliverTo"),
    bodyDataHas("mobileNumber"),
    propertyIsNotEmptyString("mobileNumber"),
    bodyDataHas("dishes"),
    isArrayWithAtLeastOneItem("dishes"),
    arrayValuesAreValid,
    bodyDataHas("status"),
    propertyIsOneOfTheseValues("status", [
      "pending",
      "preparing",
      "out-for-delivery",
    ]),
    baseController.update,
  ],
  delete: [
    baseController.exists,
    orderStatusIsNotPending,
    baseController.delete,
  ],
  list: [baseController.list],
};
