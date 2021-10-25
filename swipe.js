($ => {
    window.SwipeController = function(selector, handlers, options) {

        // Swipe Up / Down / Left / Right
        var initialX = null;
        var initialY = null;
    
        // Options
        options = typeof options === 'object' ? options : {};
        options.preventDefault = options.preventDefault !== false;
        this.options = options;
        
        this.handlers = handlers;
        this.selector = selector;
        this.element = $(selector);


        if ($(this.element).length > 0) {
            this.element[0].addEventListener("touchstart", function(e) { this.startTouch(e); }, false);
            this.element[0].addEventListener("touchmove", function(e) { this.moveTouch(e); }, false);
        }

        /* Functions */
        this.startTouch = (e) => {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        };

        this.moveTouch = (e) => {
            if (initialX === null) {
              return;
            }

            if (initialY === null) {
              return;
            }

            var currentX = e.touches[0].clientX;
            var currentY = e.touches[0].clientY;

            var diffX = initialX - currentX;
            var diffY = initialY - currentY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
              // sliding horizontally
              if (diffX > 0) {
                // swiped left
                if (this.handlers.hasOwnProperty('left') && typeof this.handlers.left === 'function') {
                    this.handlers.left(e);
                }
              } else {
                // swiped right
                if (this.handlers.hasOwnProperty('right') && typeof this.handlers.right === 'function') {
                    this.handlers.right(e);
                }
              }
            } else {
              // sliding vertically
              if (diffY > 0) {
                // swiped up
                if (this.handlers.hasOwnProperty('up') && typeof this.handlers.up === 'function') {
                    this.handlers.up(e);
                }
              } else {
                // swiped down
                if (this.handlers.hasOwnProperty('down') && typeof this.handlers.down === 'function') {
                    this.handlers.down(e);
                }
              }
            }

            initialX = null;
            initialY = null;

            if (this.options.preventDefault) {
                e.preventDefault();
            }
        };

    };
  })(jQuery);
