function isArrayWithAtLeastOneItem(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    if (Array.isArray(data[propertyName]) && data[propertyName].length > 0) {
      return next();
    }
    next({
      status: 400,
      message: `${propertyName} must be an array with at least 1 item`,
    });
  };
}

function arrayValuesAreValid(req, res, next) {
  const { dishes = [] } = req.body.data;
  let invalidIndex = -1;
  const areValid = dishes.every((x, i) => {
    const isValid =
      x.quantity && Number.isInteger(x.quantity) && x.quantity > 0;
    if (!isValid) {
      invalidIndex = i;
    }
    return isValid;
  });
  if (areValid) {
    return next();
  }
  next({
    status: 400,
    message: `Dish ${invalidIndex} must have a quantity that is an integer greater than 0`,
  });
}

function propertyIsOneOfTheseValues(propertyName, values) {
  return function (req, res, next) {
    const propertyValue = req.body.data[propertyName];

    if (values.some((x) => x === propertyValue)) {
      return next();
    }
    next({
      status: 400,
      message: `${propertyName} was not one of these values: [${values.join(
        ","
      )}]`,
    });
  };
}

function orderStatusIsNotPending(req, res, next) {
  const order = res.locals.item;
  if (order.status === "pending") {
    return next();
  }
  next({
    status: 400,
    message: `status ${order.status} was 'pending'`,
  });
}

module.exports = {
  isArrayWithAtLeastOneItem,
  arrayValuesAreValid,
  propertyIsOneOfTheseValues,
  orderStatusIsNotPending,
};
