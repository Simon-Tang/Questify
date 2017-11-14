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

function makeQuestButton(element) {
  const textStyles = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontVariant: 'small-caps',
    color: 'rgb(64,111,53)',
    backgroundColor: 'rgb(222,235,181)',
    letterSpacing: '1px',
    textDecoration: 'none',
    textTransform: 'capitalize',
    textAlign: 'center',
    lineHeight: '20px',
  };
  Object.assign(element.style, textStyles);
  // Iterate over all children, even nested ones
  element.querySelectorAll('*').forEach(child => {
    Object.assign(child.style, textStyles, {
      background: 'none',
      margin: 'none !important',
      border: 'none !important',
      padding: 'none !important',
    });
  });
  element.classList.add('quest-btn');
}

class Component {
  constructor(elementType, id, classList) {
    this._element = createElement({ type: elementType, id, classList });
  }
  get element() {
    return this._element;
  }
}
