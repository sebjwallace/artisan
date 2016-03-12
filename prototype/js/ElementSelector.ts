
class ElementSelector{
  constructor(private selectedElement){

  }
  elementClicked(event, clickedElement){
    event.stopPropagation;
    this.selectedElement.setSelectedElement(clickedElement);
  }
}
