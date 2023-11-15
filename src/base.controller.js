const read = (controller, itemIdParamKey, itemCollectionKey) => (req, res) => {
  res.json({ data: res.locals.item });
};

const create =
  (controller, itemIdParamKey, itemCollectionKey) => (req, res) => {
    let lastId = controller[itemCollectionKey].reduce(
      (maxId, item) => Math.max(maxId, item.id),
      0
    );
    const { data = {} } = req.body;
    const newItem = {
      ...data,
      id: ++lastId,
    };
    controller[itemCollectionKey].push(newItem);
    res.status(201).json({ data: newItem });
  };

const list = (controller, itemIdParamKey, itemCollectionKey) => (req, res) => {
  res.json({ data: controller[itemCollectionKey] });
};

const update =
  (controller, itemIdParamKey, itemCollectionKey) => (req, res) => {
    const item = {
      ...res.locals.item,
      ...req.body.data,
      id: res.locals.item.id,
    };
    res.json({ data: item });
  };

const _delete =
  (controller, itemIdParamKey, itemCollectionKey) => (req, res) => {
    const { itemId } = req.params;
    const index = controller[itemCollectionKey].findIndex(
      (item) => item.id === itemId
    );
    controller[itemCollectionKey].splice(index, 1);
    res.sendStatus(204);
  };

const exists =
  (controller, itemIdParamKey, itemCollectionKey) => (req, res, next) => {
    const itemId = req.params[itemIdParamKey];
    const foundItem = controller[itemCollectionKey].find(
      (item) => item.id === itemId
    );
    if (foundItem) {
      res.locals.item = foundItem;
      return next();
    }
    next({
      status: 404,
      message: `Item id not found: ${itemId}`,
    });
  };

function init(controller, itemIdParamKey, itemCollectionKey) {
  return {
    read: read(controller, itemIdParamKey, itemCollectionKey),
    create: create(controller, itemIdParamKey, itemCollectionKey),
    list: list(controller, itemIdParamKey, itemCollectionKey),
    update: update(controller, itemIdParamKey, itemCollectionKey),
    delete: _delete(controller, itemIdParamKey, itemCollectionKey),
    exists: exists(controller, itemIdParamKey, itemCollectionKey),
  };
}

module.exports = init;
