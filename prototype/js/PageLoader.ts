
class PageLoader{

  constructor(){
      var id = 0;
      var els = $('#artisan-container *').each(function() {
          if (!$(this).attr('artisan-element')) {
              $(this).attr('onclick', 'new ClickableEvent(event,this);');
              $(this).attr('artisan-element', id);
              id++;
          };
      });
      return this;
  }

}
