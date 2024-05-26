const checkOpenItem = (openItem, param) => {
  return openItem === param ? "menu-open" : "";
};

const checkActiveItem = (activeItem, param) => {
  return activeItem === param ? "active" : "";
};

export default {
  checkOpenItem,
  checkActiveItem,
};
