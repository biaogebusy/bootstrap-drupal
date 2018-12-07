(function($) {
  /**
   * Slick carousel init
   * @type {{attach: Drupal.behaviors.slick.attach}}
   */
  Drupal.behaviors.slick = {
    attach: function(context) {
      $('.carousel').slick();
    }
  }

}(jQuery));
