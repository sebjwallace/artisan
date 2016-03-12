var ElementSelector = (function () {
    function ElementSelector(selectedElement) {
        this.selectedElement = selectedElement;
    }
    ElementSelector.prototype.elementClicked = function (event, clickedElement) {
        event.stopPropagation;
        this.selectedElement.setSelectedElement(clickedElement);
    };
    return ElementSelector;
}());
//# sourceMappingURL=ElementSelector.js.map