// has property
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

// property is not empty string
function propertyIsNotEmptyString(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName] === "") {
      return next({
        status: 400,
        message: `${propertyName} must not be an empty string`,
      });
    }
    next();
  };
}

// property greater than 0
function propertyIsGreaterThan0(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName] <= 0) {
      return next({
        status: 400,
        message: `${propertyName} must be greater than 0, was ${data[propertyName]}`,
      });
    }
    next();
  };
}

// property is integer
function propertyIsInteger(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (!Number.isInteger(data[propertyName])) {
      return next({
        status: 400,
        message: `${propertyName} must be a valid integer`,
      });
    }
    next();
  };
}

function bodyIdMatchesIdInRoute(idName) {
  return function (req, res, next) {
    const { id } = req.body.data;
    const idInRoute = req.params[idName];
    if (id && id !== idInRoute) {
      next({
        status: 400,
        message: `id in body (${id}) must match dishId (${idInRoute}) in params`,
      });
    }
    next();
  };
}

module.exports = {
  bodyDataHas,
  propertyIsNotEmptyString,
  propertyIsGreaterThan0,
  propertyIsInteger,
  bodyIdMatchesIdInRoute,
};
