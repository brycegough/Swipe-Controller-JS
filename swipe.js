($ => {
    window.SwipeController = function(selector, options) {

        // Swipe Up / Down / Left / Right
        var initialX = null;
        var initialY = null;
    
        // Options
        options = typeof options === 'object' ? options : {};
        options.preventDefault = options.preventDefault !== false;
        this.options = options;
        
        this.handlers = {
            left: this.options.left || false,
            right: this.options.right || false,
            up: this.options.up || false,
            down: this.options.down || false
        };
        this.selector = selector;
        this.element = $(selector);

        /* Functions */
        this.startTouch = (e) => {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        }

        this.moveTouch = (e) => {
            if (initialX === null || initialY === null) {
              return;
            }

            var currentX = e.touches[0].clientX,
                currentY = e.touches[0].clientY,
                diffX = initialX - currentX,
                diffY = initialY - currentY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
              // sliding horizontally
              if (diffX > 0) {
                // swiped left
                if (typeof this.handlers.left === 'function') {
                    this.handlers.left(e);
                }
              } else {
                // swiped right
                if (typeof this.handlers.right === 'function') {
                    this.handlers.right(e);
                }
              }
            } else {
              // sliding vertically
              if (diffY > 0) {
                // swiped up
                if (typeof this.handlers.up === 'function') {
                    this.handlers.up(e);
                }
              } else {
                // swiped down
                if (typeof this.handlers.down === 'function') {
                    this.handlers.down(e);
                }
              }
            }

            initialX = null;
            initialY = null;

            if (this.options.preventDefault) {
                e.preventDefault();
            }
        }

        // Add event listeners
        if ($(this.element).length > 0) {
            this.element[0].addEventListener("touchstart", function(e) { this.startTouch(e); }, false);
            this.element[0].addEventListener("touchmove", function(e) { this.moveTouch(e); }, false);
        }

    };
  })(jQuery);
