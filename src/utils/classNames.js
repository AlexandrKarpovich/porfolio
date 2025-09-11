export const hasClass = (el, cls) => {
    return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

export const addClass = (el, cls) => {
    if (!hasClass(el, cls)) {
        el.className += " " + cls;
    }
};

export const removeClass = (el, cls) => {
    if (hasClass(el, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
};