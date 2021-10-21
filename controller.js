($ => {
    window.swipeController = function(selector, handlers) {

        // Swipe Up / Down / Left / Right
        var initialX = null;
        var initialY = null;
        var _this = this;

        this.handlers = handlers;
        this.selector = selector;
        this.element = $(selector);


        if ($(this.element).length > 0) {
            this.element[0].addEventListener("touchstart", function(e) { _this.startTouch(e); }, false);
            this.element[0].addEventListener("touchmove", function(e) { _this.moveTouch(e); }, false);
        }

        /* Functions */
        this.startTouch = function(e) {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        };

        this.moveTouch = function(e) {
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
                if (_this.handlers.hasOwnProperty('left') && typeof _this.handlers.left === 'function') {
                    _this.handlers.left(e);
                }
              } else {
                // swiped right
                if (_this.handlers.hasOwnProperty('right') && typeof _this.handlers.right === 'function') {
                    _this.handlers.right(e);
                }
              }
            } else {
              // sliding vertically
              if (diffY > 0) {
                // swiped up
                if (_this.handlers.hasOwnProperty('up') && typeof _this.handlers.up === 'function') {
                    _this.handlers.up(e);
                }
              } else {
                // swiped down
                if (_this.handlers.hasOwnProperty('down') && typeof _this.handlers.down === 'function') {
                    _this.handlers.down(e);
                }
              }
            }

            initialX = null;
            initialY = null;

            e.preventDefault();
        };

    };
  })(jQuery);
