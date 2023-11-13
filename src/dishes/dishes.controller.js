const path = require("path");

// Use the existing dishes data
const controller = { dishes: require(path.resolve("src/data/dishes-data")) };

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
const {
  bodyDataHas,
  propertyIsNotEmptyString,
  propertyIsGreaterThan0,
  propertyIsInteger,
  bodyIdMatchesIdInRoute,
} = require("../base.middleware");
const baseController = require("../base.controller")(
  controller,
  "dishId",
  "dishes"
);

module.exports = {
  create: [
    bodyDataHas("name"),
    propertyIsNotEmptyString("name"),
    bodyDataHas("description"),
    propertyIsNotEmptyString("description"),
    bodyDataHas("price"),
    propertyIsGreaterThan0("price"),
    propertyIsInteger("price"),
    bodyDataHas("image_url"),
    propertyIsNotEmptyString("image_url"),
    baseController.create,
  ],
  read: [baseController.exists, baseController.read],
  update: [
    baseController.exists,
    bodyIdMatchesIdInRoute("dishId"),
    bodyDataHas("name"),
    propertyIsNotEmptyString("name"),
    bodyDataHas("description"),
    propertyIsNotEmptyString("description"),
    bodyDataHas("price"),
    propertyIsGreaterThan0("price"),
    propertyIsInteger("price"),
    bodyDataHas("image_url"),
    propertyIsNotEmptyString("image_url"),
    baseController.update,
  ],
  list: [baseController.list],
};
