//    Re-call element   
let $ = function (select) {
    return document.querySelector(select);
}

let $a = function (select) {
    return document.querySelectorAll(select);
}



//Create element 
const createEl = function (tagName, className, content, parents) {
    const newElement = document.createElement(tagName);
    if (className) {
        newElement.setAttribute("class", className);
    }
    if (content) {
        newElement.innerHTML = content;
    }
    if (parents) {
        return parents.appendChild(newElement);
    }
    return newElement;
}