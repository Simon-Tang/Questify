function createElement({
  type = 'div',
  id = "",
  classList = [],
  textContent = "",
  onClick,
  children = [],
}) {
  const e = document.createElement(type);
  e.id = id;
  e.classList.add(...(classList || []));
  e.textContent = textContent;
  if (onClick) {
    e.addEventListener('click', onClick);
  }
  children.forEach(child => e.appendChild(child));
  return e;
}

class Component {
  constructor(elementType, id, classList) {
    this._element = createElement({ type: elementType, id, classList });
  }
  get element() {
    return this._element;
  }
}
