/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/home.js":
/*!************************!*\
  !*** ./src/js/home.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_home_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/styles/home.scss */ "./src/styles/home.scss");
/* harmony import */ var _js_theia_sticky_sidebar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/js/theia-sticky-sidebar.js */ "./src/js/theia-sticky-sidebar.js");
/* harmony import */ var _js_theia_sticky_sidebar_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_theia_sticky_sidebar_js__WEBPACK_IMPORTED_MODULE_1__);



(function ($) {
  $(() => {
    $(".content, .sidebar").theiaStickySidebar({
      // Settings
      additionalMarginTop: 120,
      minWidth: 1024
    });
  });
})(jQuery);

/***/ }),

/***/ "./src/js/theia-sticky-sidebar.js":
/*!****************************************!*\
  !*** ./src/js/theia-sticky-sidebar.js ***!
  \****************************************/
/***/ (() => {

/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */
(function ($) {
  $.fn.theiaStickySidebar = function (options) {
    var defaults = {
      'containerSelector': '',
      'additionalMarginTop': 0,
      'additionalMarginBottom': 0,
      'updateSidebarHeight': true,
      'minWidth': 0,
      'disableOnResponsiveLayouts': true,
      'sidebarBehavior': 'modern',
      'defaultPosition': 'relative',
      'namespace': 'TSS'
    };
    options = $.extend(defaults, options); // Validate options

    options.additionalMarginTop = parseInt(options.additionalMarginTop) || 0;
    options.additionalMarginBottom = parseInt(options.additionalMarginBottom) || 0;
    tryInitOrHookIntoEvents(options, this); // Try doing init, otherwise hook into window.resize and document.scroll and try again then.

    function tryInitOrHookIntoEvents(options, $that) {
      var success = tryInit(options, $that);

      if (!success) {
        console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');
        $(document).on('scroll.' + options.namespace, function (options, $that) {
          return function (evt) {
            var success = tryInit(options, $that);

            if (success) {
              $(this).unbind(evt);
            }
          };
        }(options, $that));
        $(window).on('resize.' + options.namespace, function (options, $that) {
          return function (evt) {
            var success = tryInit(options, $that);

            if (success) {
              $(this).unbind(evt);
            }
          };
        }(options, $that));
      }
    } // Try doing init if proper conditions are met.


    function tryInit(options, $that) {
      if (options.initialized === true) {
        return true;
      }

      if ($('body').width() < options.minWidth) {
        return false;
      }

      init(options, $that);
      return true;
    } // Init the sticky sidebar(s).


    function init(options, $that) {
      options.initialized = true; // Add CSS

      var existingStylesheet = $('#theia-sticky-sidebar-stylesheet-' + options.namespace);

      if (existingStylesheet.length === 0) {
        $('head').append($('<style id="theia-sticky-sidebar-stylesheet-' + options.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'));
      }

      $that.each(function () {
        var o = {};
        o.sidebar = $(this); // Save options

        o.options = options || {}; // Get container

        o.container = $(o.options.containerSelector);

        if (o.container.length == 0) {
          o.container = o.sidebar.parent();
        } // Create sticky sidebar


        o.sidebar.parents().css('-webkit-transform', 'none'); // Fix for WebKit bug - https://code.google.com/p/chromium/issues/detail?id=20574

        o.sidebar.css({
          'position': o.options.defaultPosition,
          'overflow': 'visible',
          // The "box-sizing" must be set to "content-box" because we set a fixed height to this element when the sticky sidebar has a fixed position.
          '-webkit-box-sizing': 'border-box',
          '-moz-box-sizing': 'border-box',
          'box-sizing': 'border-box'
        }); // Get the sticky sidebar element. If none has been found, then create one.

        o.stickySidebar = o.sidebar.find('.theiaStickySidebar');

        if (o.stickySidebar.length == 0) {
          // Remove <script> tags, otherwise they will be run again when added to the stickySidebar.
          var javaScriptMIMETypes = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
          o.sidebar.find('script').filter(function (index, script) {
            return script.type.length === 0 || script.type.match(javaScriptMIMETypes);
          }).remove();
          o.stickySidebar = $('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());
          o.sidebar.append(o.stickySidebar);
        } // Get existing top and bottom margins and paddings


        o.marginBottom = parseInt(o.sidebar.css('margin-bottom'));
        o.paddingTop = parseInt(o.sidebar.css('padding-top'));
        o.paddingBottom = parseInt(o.sidebar.css('padding-bottom')); // Add a temporary padding rule to check for collapsable margins.

        var collapsedTopHeight = o.stickySidebar.offset().top;
        var collapsedBottomHeight = o.stickySidebar.outerHeight();
        o.stickySidebar.css('padding-top', 1);
        o.stickySidebar.css('padding-bottom', 1);
        collapsedTopHeight -= o.stickySidebar.offset().top;
        collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight - collapsedTopHeight;

        if (collapsedTopHeight == 0) {
          o.stickySidebar.css('padding-top', 0);
          o.stickySidebarPaddingTop = 0;
        } else {
          o.stickySidebarPaddingTop = 1;
        }

        if (collapsedBottomHeight == 0) {
          o.stickySidebar.css('padding-bottom', 0);
          o.stickySidebarPaddingBottom = 0;
        } else {
          o.stickySidebarPaddingBottom = 1;
        } // We use this to know whether the user is scrolling up or down.


        o.previousScrollTop = null; // Scroll top (value) when the sidebar has fixed position.

        o.fixedScrollTop = 0; // Set sidebar to default values.

        resetSidebar();

        o.onScroll = function (o) {
          // Stop if the sidebar isn't visible.
          if (!o.stickySidebar.is(":visible")) {
            return;
          } // Stop if the window is too small.


          if ($('body').width() < o.options.minWidth) {
            resetSidebar();
            return;
          } // Stop if the sidebar width is larger than the container width (e.g. the theme is responsive and the sidebar is now below the content)


          if (o.options.disableOnResponsiveLayouts) {
            var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css('float') == 'none');

            if (sidebarWidth + 50 > o.container.width()) {
              resetSidebar();
              return;
            }
          }

          var scrollTop = $(document).scrollTop();
          var position = 'static'; // If the user has scrolled down enough for the sidebar to be clipped at the top, then we can consider changing its position.

          if (scrollTop >= o.sidebar.offset().top + (o.paddingTop - o.options.additionalMarginTop)) {
            // The top and bottom offsets, used in various calculations.
            var offsetTop = o.paddingTop + options.additionalMarginTop;
            var offsetBottom = o.paddingBottom + o.marginBottom + options.additionalMarginBottom; // All top and bottom positions are relative to the window, not to the parent elemnts.

            var containerTop = o.sidebar.offset().top;
            var containerBottom = o.sidebar.offset().top + getClearedHeight(o.container); // The top and bottom offsets relative to the window screen top (zero) and bottom (window height).

            var windowOffsetTop = 0 + options.additionalMarginTop;
            var windowOffsetBottom;
            var sidebarSmallerThanWindow = o.stickySidebar.outerHeight() + offsetTop + offsetBottom < $(window).height();

            if (sidebarSmallerThanWindow) {
              windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight();
            } else {
              windowOffsetBottom = $(window).height() - o.marginBottom - o.paddingBottom - options.additionalMarginBottom;
            }

            var staticLimitTop = containerTop - scrollTop + o.paddingTop;
            var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o.marginBottom;
            var top = o.stickySidebar.offset().top - scrollTop;
            var scrollTopDiff = o.previousScrollTop - scrollTop; // If the sidebar position is fixed, then it won't move up or down by itself. So, we manually adjust the top coordinate.

            if (o.stickySidebar.css('position') == 'fixed') {
              if (o.options.sidebarBehavior == 'modern') {
                top += scrollTopDiff;
              }
            }

            if (o.options.sidebarBehavior == 'stick-to-top') {
              top = options.additionalMarginTop;
            }

            if (o.options.sidebarBehavior == 'stick-to-bottom') {
              top = windowOffsetBottom - o.stickySidebar.outerHeight();
            }

            if (scrollTopDiff > 0) {
              // If the user is scrolling up.
              top = Math.min(top, windowOffsetTop);
            } else {
              // If the user is scrolling down.
              top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight());
            }

            top = Math.max(top, staticLimitTop);
            top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight()); // If the sidebar is the same height as the container, we won't use fixed positioning.

            var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar.outerHeight();

            if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
              position = 'fixed';
            } else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o.stickySidebar.outerHeight()) {
              position = 'fixed';
            } else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <= options.additionalMarginTop) {
              // Stuck to the top of the page. No special behavior.
              position = 'static';
            } else {
              // Stuck to the bottom of the page.
              position = 'absolute';
            }
          }
          /*
           * Performance notice: It's OK to set these CSS values at each resize/scroll, even if they don't change.
           * It's way slower to first check if the values have changed.
           */


          if (position == 'fixed') {
            var scrollLeft = $(document).scrollLeft();
            o.stickySidebar.css({
              'position': 'fixed',
              'width': getWidthForObject(o.stickySidebar) + 'px',
              'transform': 'translateY(' + top + 'px)',
              'left': o.sidebar.offset().left + parseInt(o.sidebar.css('padding-left')) - scrollLeft + 'px',
              'top': '0px'
            });
          } else if (position == 'absolute') {
            var css = {};

            if (o.stickySidebar.css('position') != 'absolute') {
              css.position = 'absolute';
              css.transform = 'translateY(' + (scrollTop + top - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom) + 'px)';
              css.top = '0px';
            }

            css.width = getWidthForObject(o.stickySidebar) + 'px';
            css.left = '';
            o.stickySidebar.css(css);
          } else if (position == 'static') {
            resetSidebar();
          }

          if (position != 'static') {
            if (o.options.updateSidebarHeight == true) {
              o.sidebar.css({
                'min-height': o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom
              });
            }
          }

          o.previousScrollTop = scrollTop;
        }; // Initialize the sidebar's position.


        o.onScroll(o); // Recalculate the sidebar's position on every scroll and resize.

        $(document).on('scroll.' + o.options.namespace, function (o) {
          return function () {
            o.onScroll(o);
          };
        }(o));
        $(window).on('resize.' + o.options.namespace, function (o) {
          return function () {
            o.stickySidebar.css({
              'position': 'static'
            });
            o.onScroll(o);
          };
        }(o)); // Recalculate the sidebar's position every time the sidebar changes its size.

        if (typeof ResizeSensor !== 'undefined') {
          new ResizeSensor(o.stickySidebar[0], function (o) {
            return function () {
              o.onScroll(o);
            };
          }(o));
        } // Reset the sidebar to its default state


        function resetSidebar() {
          o.fixedScrollTop = 0;
          o.sidebar.css({
            'min-height': '1px'
          });
          o.stickySidebar.css({
            'position': 'static',
            'width': '',
            'transform': 'none'
          });
        } // Get the height of a div as if its floated children were cleared. Note that this function fails if the floats are more than one level deep.


        function getClearedHeight(e) {
          var height = e.height();
          e.children().each(function () {
            height = Math.max(height, $(this).height());
          });
          return height;
        }
      });
    }

    function getWidthForObject(object) {
      var width;

      try {
        width = object[0].getBoundingClientRect().width;
      } catch (err) {}

      if (typeof width === "undefined") {
        width = object.width();
      }

      return width;
    }

    return this;
  };
})(jQuery);

/***/ }),

/***/ "./src/styles/home.scss":
/*!******************************!*\
  !*** ./src/styles/home.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/js/home.js");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/styles/home.scss");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0gsQ0FGRCxDQUdBLE9BQU91RSxHQUFQLEVBQVksQ0FDWDs7TUFFRCxJQUFJLE9BQU92RSxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO1FBQzlCQSxLQUFLLEdBQUdxRSxNQUFNLENBQUNyRSxLQUFQLEVBQVI7TUFDSDs7TUFFRCxPQUFPQSxLQUFQO0lBQ0g7O0lBRUQsT0FBTyxJQUFQO0VBQ0gsQ0F0V0Q7QUF1V0gsQ0F4V0QsRUF3V0dwQixNQXhXSDs7Ozs7Ozs7Ozs7O0FDVkE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2NzMDAxLy4vc3JjL2pzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vd2NzMDAxLy4vc3JjL2pzL3RoZWlhLXN0aWNreS1zaWRlYmFyLmpzIiwid2VicGFjazovL3djczAwMS8uL3NyYy9zdHlsZXMvaG9tZS5zY3NzP2Y5Y2QiLCJ3ZWJwYWNrOi8vd2NzMDAxL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3djczAwMS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93Y3MwMDEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3djczAwMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3djczAwMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3djczAwMS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3djczAwMS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2NzMDAxL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJAL3N0eWxlcy9ob21lLnNjc3NcIjtcbmltcG9ydCBcIkAvanMvdGhlaWEtc3RpY2t5LXNpZGViYXIuanNcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJCgoKSA9PiB7XG4gICAgICAgICQoXCIuY29udGVudCwgLnNpZGViYXJcIikudGhlaWFTdGlja3lTaWRlYmFyKHtcbiAgICAgICAgICAgIC8vIFNldHRpbmdzXG4gICAgICAgICAgICBhZGRpdGlvbmFsTWFyZ2luVG9wOiAxMjAsXG4gICAgICAgICAgICBtaW5XaWR0aDogMTAyNCxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KShqUXVlcnkpO1xuIiwiLyohXG4gKiBUaGVpYSBTdGlja3kgU2lkZWJhciB2MS43LjBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9XZUNvZGVQaXhlbHMvdGhlaWEtc3RpY2t5LXNpZGViYXJcbiAqXG4gKiBHbHVlcyB5b3VyIHdlYnNpdGUncyBzaWRlYmFycywgbWFraW5nIHRoZW0gcGVybWFuZW50bHkgdmlzaWJsZSB3aGlsZSBzY3JvbGxpbmcuXG4gKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNiBXZUNvZGVQaXhlbHMgYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJC5mbi50aGVpYVN0aWNreVNpZGViYXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAnY29udGFpbmVyU2VsZWN0b3InOiAnJyxcbiAgICAgICAgICAgICdhZGRpdGlvbmFsTWFyZ2luVG9wJzogMCxcbiAgICAgICAgICAgICdhZGRpdGlvbmFsTWFyZ2luQm90dG9tJzogMCxcbiAgICAgICAgICAgICd1cGRhdGVTaWRlYmFySGVpZ2h0JzogdHJ1ZSxcbiAgICAgICAgICAgICdtaW5XaWR0aCc6IDAsXG4gICAgICAgICAgICAnZGlzYWJsZU9uUmVzcG9uc2l2ZUxheW91dHMnOiB0cnVlLFxuICAgICAgICAgICAgJ3NpZGViYXJCZWhhdmlvcic6ICdtb2Rlcm4nLFxuICAgICAgICAgICAgJ2RlZmF1bHRQb3NpdGlvbic6ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAnbmFtZXNwYWNlJzogJ1RTUydcbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBWYWxpZGF0ZSBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMuYWRkaXRpb25hbE1hcmdpblRvcCA9IHBhcnNlSW50KG9wdGlvbnMuYWRkaXRpb25hbE1hcmdpblRvcCkgfHwgMDtcbiAgICAgICAgb3B0aW9ucy5hZGRpdGlvbmFsTWFyZ2luQm90dG9tID0gcGFyc2VJbnQob3B0aW9ucy5hZGRpdGlvbmFsTWFyZ2luQm90dG9tKSB8fCAwO1xuXG4gICAgICAgIHRyeUluaXRPckhvb2tJbnRvRXZlbnRzKG9wdGlvbnMsIHRoaXMpO1xuXG4gICAgICAgIC8vIFRyeSBkb2luZyBpbml0LCBvdGhlcndpc2UgaG9vayBpbnRvIHdpbmRvdy5yZXNpemUgYW5kIGRvY3VtZW50LnNjcm9sbCBhbmQgdHJ5IGFnYWluIHRoZW4uXG4gICAgICAgIGZ1bmN0aW9uIHRyeUluaXRPckhvb2tJbnRvRXZlbnRzKG9wdGlvbnMsICR0aGF0KSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHRyeUluaXQob3B0aW9ucywgJHRoYXQpO1xuXG4gICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVFNTOiBCb2R5IHdpZHRoIHNtYWxsZXIgdGhhbiBvcHRpb25zLm1pbldpZHRoLiBJbml0IGlzIGRlbGF5ZWQuJyk7XG5cbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsLicgKyBvcHRpb25zLm5hbWVzcGFjZSwgZnVuY3Rpb24gKG9wdGlvbnMsICR0aGF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHRyeUluaXQob3B0aW9ucywgJHRoYXQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudW5iaW5kKGV2dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfShvcHRpb25zLCAkdGhhdCkpO1xuICAgICAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplLicgKyBvcHRpb25zLm5hbWVzcGFjZSwgZnVuY3Rpb24gKG9wdGlvbnMsICR0aGF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHRyeUluaXQob3B0aW9ucywgJHRoYXQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudW5iaW5kKGV2dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfShvcHRpb25zLCAkdGhhdCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcnkgZG9pbmcgaW5pdCBpZiBwcm9wZXIgY29uZGl0aW9ucyBhcmUgbWV0LlxuICAgICAgICBmdW5jdGlvbiB0cnlJbml0KG9wdGlvbnMsICR0aGF0KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pbml0aWFsaXplZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJCgnYm9keScpLndpZHRoKCkgPCBvcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbml0KG9wdGlvbnMsICR0aGF0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbml0IHRoZSBzdGlja3kgc2lkZWJhcihzKS5cbiAgICAgICAgZnVuY3Rpb24gaW5pdChvcHRpb25zLCAkdGhhdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIEFkZCBDU1NcbiAgICAgICAgICAgIHZhciBleGlzdGluZ1N0eWxlc2hlZXQgPSAkKCcjdGhlaWEtc3RpY2t5LXNpZGViYXItc3R5bGVzaGVldC0nICsgb3B0aW9ucy5uYW1lc3BhY2UpO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nU3R5bGVzaGVldC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCQoJzxzdHlsZSBpZD1cInRoZWlhLXN0aWNreS1zaWRlYmFyLXN0eWxlc2hlZXQtJyArIG9wdGlvbnMubmFtZXNwYWNlICsgJ1wiPi50aGVpYVN0aWNreVNpZGViYXI6YWZ0ZXIge2NvbnRlbnQ6IFwiXCI7IGRpc3BsYXk6IHRhYmxlOyBjbGVhcjogYm90aDt9PC9zdHlsZT4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICR0aGF0LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvID0ge307XG5cbiAgICAgICAgICAgICAgICBvLnNpZGViYXIgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gU2F2ZSBvcHRpb25zXG4gICAgICAgICAgICAgICAgby5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICAgICAgICAgIC8vIEdldCBjb250YWluZXJcbiAgICAgICAgICAgICAgICBvLmNvbnRhaW5lciA9ICQoby5vcHRpb25zLmNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoby5jb250YWluZXIubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgby5jb250YWluZXIgPSBvLnNpZGViYXIucGFyZW50KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHN0aWNreSBzaWRlYmFyXG4gICAgICAgICAgICAgICAgby5zaWRlYmFyLnBhcmVudHMoKS5jc3MoJy13ZWJraXQtdHJhbnNmb3JtJywgJ25vbmUnKTsgLy8gRml4IGZvciBXZWJLaXQgYnVnIC0gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTIwNTc0XG4gICAgICAgICAgICAgICAgby5zaWRlYmFyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6IG8ub3B0aW9ucy5kZWZhdWx0UG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICdvdmVyZmxvdyc6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIFwiYm94LXNpemluZ1wiIG11c3QgYmUgc2V0IHRvIFwiY29udGVudC1ib3hcIiBiZWNhdXNlIHdlIHNldCBhIGZpeGVkIGhlaWdodCB0byB0aGlzIGVsZW1lbnQgd2hlbiB0aGUgc3RpY2t5IHNpZGViYXIgaGFzIGEgZml4ZWQgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgICAgICctd2Via2l0LWJveC1zaXppbmcnOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgICAgICctbW96LWJveC1zaXppbmcnOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgICAgICdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIHN0aWNreSBzaWRlYmFyIGVsZW1lbnQuIElmIG5vbmUgaGFzIGJlZW4gZm91bmQsIHRoZW4gY3JlYXRlIG9uZS5cbiAgICAgICAgICAgICAgICBvLnN0aWNreVNpZGViYXIgPSBvLnNpZGViYXIuZmluZCgnLnRoZWlhU3RpY2t5U2lkZWJhcicpO1xuICAgICAgICAgICAgICAgIGlmIChvLnN0aWNreVNpZGViYXIubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIDxzY3JpcHQ+IHRhZ3MsIG90aGVyd2lzZSB0aGV5IHdpbGwgYmUgcnVuIGFnYWluIHdoZW4gYWRkZWQgdG8gdGhlIHN0aWNreVNpZGViYXIuXG4gICAgICAgICAgICAgICAgICAgIHZhciBqYXZhU2NyaXB0TUlNRVR5cGVzID0gLyg/OnRleHR8YXBwbGljYXRpb24pXFwvKD86eC0pPyg/OmphdmFzY3JpcHR8ZWNtYXNjcmlwdCkvaTtcbiAgICAgICAgICAgICAgICAgICAgby5zaWRlYmFyLmZpbmQoJ3NjcmlwdCcpLmZpbHRlcihmdW5jdGlvbiAoaW5kZXgsIHNjcmlwdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjcmlwdC50eXBlLmxlbmd0aCA9PT0gMCB8fCBzY3JpcHQudHlwZS5tYXRjaChqYXZhU2NyaXB0TUlNRVR5cGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgby5zdGlja3lTaWRlYmFyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygndGhlaWFTdGlja3lTaWRlYmFyJykuYXBwZW5kKG8uc2lkZWJhci5jaGlsZHJlbigpKTtcbiAgICAgICAgICAgICAgICAgICAgby5zaWRlYmFyLmFwcGVuZChvLnN0aWNreVNpZGViYXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEdldCBleGlzdGluZyB0b3AgYW5kIGJvdHRvbSBtYXJnaW5zIGFuZCBwYWRkaW5nc1xuICAgICAgICAgICAgICAgIG8ubWFyZ2luQm90dG9tID0gcGFyc2VJbnQoby5zaWRlYmFyLmNzcygnbWFyZ2luLWJvdHRvbScpKTtcbiAgICAgICAgICAgICAgICBvLnBhZGRpbmdUb3AgPSBwYXJzZUludChvLnNpZGViYXIuY3NzKCdwYWRkaW5nLXRvcCcpKTtcbiAgICAgICAgICAgICAgICBvLnBhZGRpbmdCb3R0b20gPSBwYXJzZUludChvLnNpZGViYXIuY3NzKCdwYWRkaW5nLWJvdHRvbScpKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBhIHRlbXBvcmFyeSBwYWRkaW5nIHJ1bGUgdG8gY2hlY2sgZm9yIGNvbGxhcHNhYmxlIG1hcmdpbnMuXG4gICAgICAgICAgICAgICAgdmFyIGNvbGxhcHNlZFRvcEhlaWdodCA9IG8uc3RpY2t5U2lkZWJhci5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgdmFyIGNvbGxhcHNlZEJvdHRvbUhlaWdodCA9IG8uc3RpY2t5U2lkZWJhci5vdXRlckhlaWdodCgpO1xuICAgICAgICAgICAgICAgIG8uc3RpY2t5U2lkZWJhci5jc3MoJ3BhZGRpbmctdG9wJywgMSk7XG4gICAgICAgICAgICAgICAgby5zdGlja3lTaWRlYmFyLmNzcygncGFkZGluZy1ib3R0b20nLCAxKTtcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWRUb3BIZWlnaHQgLT0gby5zdGlja3lTaWRlYmFyLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWRCb3R0b21IZWlnaHQgPSBvLnN0aWNreVNpZGViYXIub3V0ZXJIZWlnaHQoKSAtIGNvbGxhcHNlZEJvdHRvbUhlaWdodCAtIGNvbGxhcHNlZFRvcEhlaWdodDtcbiAgICAgICAgICAgICAgICBpZiAoY29sbGFwc2VkVG9wSGVpZ2h0ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgby5zdGlja3lTaWRlYmFyLmNzcygncGFkZGluZy10b3AnLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgby5zdGlja3lTaWRlYmFyUGFkZGluZ1RvcCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvLnN0aWNreVNpZGViYXJQYWRkaW5nVG9wID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sbGFwc2VkQm90dG9tSGVpZ2h0ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgby5zdGlja3lTaWRlYmFyLmNzcygncGFkZGluZy1ib3R0b20nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgby5zdGlja3lTaWRlYmFyUGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvLnN0aWNreVNpZGViYXJQYWRkaW5nQm90dG9tID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBXZSB1c2UgdGhpcyB0byBrbm93IHdoZXRoZXIgdGhlIHVzZXIgaXMgc2Nyb2xsaW5nIHVwIG9yIGRvd24uXG4gICAgICAgICAgICAgICAgby5wcmV2aW91c1Njcm9sbFRvcCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAvLyBTY3JvbGwgdG9wICh2YWx1ZSkgd2hlbiB0aGUgc2lkZWJhciBoYXMgZml4ZWQgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgby5maXhlZFNjcm9sbFRvcCA9IDA7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgc2lkZWJhciB0byBkZWZhdWx0IHZhbHVlcy5cbiAgICAgICAgICAgICAgICByZXNldFNpZGViYXIoKTtcblxuICAgICAgICAgICAgICAgIG8ub25TY3JvbGwgPSBmdW5jdGlvbiAobykge1xuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIGlmIHRoZSBzaWRlYmFyIGlzbid0IHZpc2libGUuXG4gICAgICAgICAgICAgICAgICAgIGlmICghby5zdGlja3lTaWRlYmFyLmlzKFwiOnZpc2libGVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgaWYgdGhlIHdpbmRvdyBpcyB0b28gc21hbGwuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKCdib2R5Jykud2lkdGgoKSA8IG8ub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRTaWRlYmFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIGlmIHRoZSBzaWRlYmFyIHdpZHRoIGlzIGxhcmdlciB0aGFuIHRoZSBjb250YWluZXIgd2lkdGggKGUuZy4gdGhlIHRoZW1lIGlzIHJlc3BvbnNpdmUgYW5kIHRoZSBzaWRlYmFyIGlzIG5vdyBiZWxvdyB0aGUgY29udGVudClcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ub3B0aW9ucy5kaXNhYmxlT25SZXNwb25zaXZlTGF5b3V0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpZGViYXJXaWR0aCA9IG8uc2lkZWJhci5vdXRlcldpZHRoKG8uc2lkZWJhci5jc3MoJ2Zsb2F0JykgPT0gJ25vbmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpZGViYXJXaWR0aCArIDUwID4gby5jb250YWluZXIud2lkdGgoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0U2lkZWJhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gJ3N0YXRpYyc7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgaGFzIHNjcm9sbGVkIGRvd24gZW5vdWdoIGZvciB0aGUgc2lkZWJhciB0byBiZSBjbGlwcGVkIGF0IHRoZSB0b3AsIHRoZW4gd2UgY2FuIGNvbnNpZGVyIGNoYW5naW5nIGl0cyBwb3NpdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA+PSBvLnNpZGViYXIub2Zmc2V0KCkudG9wICsgKG8ucGFkZGluZ1RvcCAtIG8ub3B0aW9ucy5hZGRpdGlvbmFsTWFyZ2luVG9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHRvcCBhbmQgYm90dG9tIG9mZnNldHMsIHVzZWQgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0VG9wID0gby5wYWRkaW5nVG9wICsgb3B0aW9ucy5hZGRpdGlvbmFsTWFyZ2luVG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldEJvdHRvbSA9IG8ucGFkZGluZ0JvdHRvbSArIG8ubWFyZ2luQm90dG9tICsgb3B0aW9ucy5hZGRpdGlvbmFsTWFyZ2luQm90dG9tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbGwgdG9wIGFuZCBib3R0b20gcG9zaXRpb25zIGFyZSByZWxhdGl2ZSB0byB0aGUgd2luZG93LCBub3QgdG8gdGhlIHBhcmVudCBlbGVtbnRzLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lclRvcCA9IG8uc2lkZWJhci5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyQm90dG9tID0gby5zaWRlYmFyLm9mZnNldCgpLnRvcCArIGdldENsZWFyZWRIZWlnaHQoby5jb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdG9wIGFuZCBib3R0b20gb2Zmc2V0cyByZWxhdGl2ZSB0byB0aGUgd2luZG93IHNjcmVlbiB0b3AgKHplcm8pIGFuZCBib3R0b20gKHdpbmRvdyBoZWlnaHQpLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd09mZnNldFRvcCA9IDAgKyBvcHRpb25zLmFkZGl0aW9uYWxNYXJnaW5Ub3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luZG93T2Zmc2V0Qm90dG9tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2lkZWJhclNtYWxsZXJUaGFuV2luZG93ID0gKG8uc3RpY2t5U2lkZWJhci5vdXRlckhlaWdodCgpICsgb2Zmc2V0VG9wICsgb2Zmc2V0Qm90dG9tKSA8ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaWRlYmFyU21hbGxlclRoYW5XaW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dPZmZzZXRCb3R0b20gPSB3aW5kb3dPZmZzZXRUb3AgKyBvLnN0aWNreVNpZGViYXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd09mZnNldEJvdHRvbSA9ICQod2luZG93KS5oZWlnaHQoKSAtIG8ubWFyZ2luQm90dG9tIC0gby5wYWRkaW5nQm90dG9tIC0gb3B0aW9ucy5hZGRpdGlvbmFsTWFyZ2luQm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGljTGltaXRUb3AgPSBjb250YWluZXJUb3AgLSBzY3JvbGxUb3AgKyBvLnBhZGRpbmdUb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGljTGltaXRCb3R0b20gPSBjb250YWluZXJCb3R0b20gLSBzY3JvbGxUb3AgLSBvLnBhZGRpbmdCb3R0b20gLSBvLm1hcmdpbkJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvcCA9IG8uc3RpY2t5U2lkZWJhci5vZmZzZXQoKS50b3AgLSBzY3JvbGxUb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG9wRGlmZiA9IG8ucHJldmlvdXNTY3JvbGxUb3AgLSBzY3JvbGxUb3A7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzaWRlYmFyIHBvc2l0aW9uIGlzIGZpeGVkLCB0aGVuIGl0IHdvbid0IG1vdmUgdXAgb3IgZG93biBieSBpdHNlbGYuIFNvLCB3ZSBtYW51YWxseSBhZGp1c3QgdGhlIHRvcCBjb29yZGluYXRlLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8uc3RpY2t5U2lkZWJhci5jc3MoJ3Bvc2l0aW9uJykgPT0gJ2ZpeGVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLm9wdGlvbnMuc2lkZWJhckJlaGF2aW9yID09ICdtb2Rlcm4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCArPSBzY3JvbGxUb3BEaWZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ub3B0aW9ucy5zaWRlYmFyQmVoYXZpb3IgPT0gJ3N0aWNrLXRvLXRvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSBvcHRpb25zLmFkZGl0aW9uYWxNYXJnaW5Ub3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLm9wdGlvbnMuc2lkZWJhckJlaGF2aW9yID09ICdzdGljay10by1ib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gd2luZG93T2Zmc2V0Qm90dG9tIC0gby5zdGlja3lTaWRlYmFyLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxUb3BEaWZmID4gMCkgeyAvLyBJZiB0aGUgdXNlciBpcyBzY3JvbGxpbmcgdXAuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gTWF0aC5taW4odG9wLCB3aW5kb3dPZmZzZXRUb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vIElmIHRoZSB1c2VyIGlzIHNjcm9sbGluZyBkb3duLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IE1hdGgubWF4KHRvcCwgd2luZG93T2Zmc2V0Qm90dG9tIC0gby5zdGlja3lTaWRlYmFyLm91dGVySGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSBNYXRoLm1heCh0b3AsIHN0YXRpY0xpbWl0VG9wKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gTWF0aC5taW4odG9wLCBzdGF0aWNMaW1pdEJvdHRvbSAtIG8uc3RpY2t5U2lkZWJhci5vdXRlckhlaWdodCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNpZGViYXIgaXMgdGhlIHNhbWUgaGVpZ2h0IGFzIHRoZSBjb250YWluZXIsIHdlIHdvbid0IHVzZSBmaXhlZCBwb3NpdGlvbmluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaWRlYmFyU2FtZUhlaWdodEFzQ29udGFpbmVyID0gby5jb250YWluZXIuaGVpZ2h0KCkgPT0gby5zdGlja3lTaWRlYmFyLm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2lkZWJhclNhbWVIZWlnaHRBc0NvbnRhaW5lciAmJiB0b3AgPT0gd2luZG93T2Zmc2V0VG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXNpZGViYXJTYW1lSGVpZ2h0QXNDb250YWluZXIgJiYgdG9wID09IHdpbmRvd09mZnNldEJvdHRvbSAtIG8uc3RpY2t5U2lkZWJhci5vdXRlckhlaWdodCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2Nyb2xsVG9wICsgdG9wIC0gby5zaWRlYmFyLm9mZnNldCgpLnRvcCAtIG8ucGFkZGluZ1RvcCA8PSBvcHRpb25zLmFkZGl0aW9uYWxNYXJnaW5Ub3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdHVjayB0byB0aGUgdG9wIG9mIHRoZSBwYWdlLiBObyBzcGVjaWFsIGJlaGF2aW9yLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gJ3N0YXRpYyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdHVjayB0byB0aGUgYm90dG9tIG9mIHRoZSBwYWdlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAqIFBlcmZvcm1hbmNlIG5vdGljZTogSXQncyBPSyB0byBzZXQgdGhlc2UgQ1NTIHZhbHVlcyBhdCBlYWNoIHJlc2l6ZS9zY3JvbGwsIGV2ZW4gaWYgdGhleSBkb24ndCBjaGFuZ2UuXG4gICAgICAgICAgICAgICAgICAgICAqIEl0J3Mgd2F5IHNsb3dlciB0byBmaXJzdCBjaGVjayBpZiB0aGUgdmFsdWVzIGhhdmUgY2hhbmdlZC5cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PSAnZml4ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsTGVmdCA9ICQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgby5zdGlja3lTaWRlYmFyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBnZXRXaWR0aEZvck9iamVjdChvLnN0aWNreVNpZGViYXIpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZVkoJyArIHRvcCArICdweCknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0JzogKG8uc2lkZWJhci5vZmZzZXQoKS5sZWZ0ICsgcGFyc2VJbnQoby5zaWRlYmFyLmNzcygncGFkZGluZy1sZWZ0JykpIC0gc2Nyb2xsTGVmdCkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnOiAnMHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocG9zaXRpb24gPT0gJ2Fic29sdXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNzcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5zdGlja3lTaWRlYmFyLmNzcygncG9zaXRpb24nKSAhPSAnYWJzb2x1dGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoJyArIChzY3JvbGxUb3AgKyB0b3AgLSBvLnNpZGViYXIub2Zmc2V0KCkudG9wIC0gby5zdGlja3lTaWRlYmFyUGFkZGluZ1RvcCAtIG8uc3RpY2t5U2lkZWJhclBhZGRpbmdCb3R0b20pICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzLnRvcCA9ICcwcHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3Mud2lkdGggPSBnZXRXaWR0aEZvck9iamVjdChvLnN0aWNreVNpZGViYXIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcy5sZWZ0ID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG8uc3RpY2t5U2lkZWJhci5jc3MoY3NzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwb3NpdGlvbiA9PSAnc3RhdGljJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRTaWRlYmFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gIT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLm9wdGlvbnMudXBkYXRlU2lkZWJhckhlaWdodCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaWRlYmFyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtaW4taGVpZ2h0Jzogby5zdGlja3lTaWRlYmFyLm91dGVySGVpZ2h0KCkgKyBvLnN0aWNreVNpZGViYXIub2Zmc2V0KCkudG9wIC0gby5zaWRlYmFyLm9mZnNldCgpLnRvcCArIG8ucGFkZGluZ0JvdHRvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgby5wcmV2aW91c1Njcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgc2lkZWJhcidzIHBvc2l0aW9uLlxuICAgICAgICAgICAgICAgIG8ub25TY3JvbGwobyk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZWNhbGN1bGF0ZSB0aGUgc2lkZWJhcidzIHBvc2l0aW9uIG9uIGV2ZXJ5IHNjcm9sbCBhbmQgcmVzaXplLlxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwuJyArIG8ub3B0aW9ucy5uYW1lc3BhY2UsIGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLm9uU2Nyb2xsKG8pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0obykpO1xuICAgICAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplLicgKyBvLm9wdGlvbnMubmFtZXNwYWNlLCBmdW5jdGlvbiAobykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5zdGlja3lTaWRlYmFyLmNzcyh7J3Bvc2l0aW9uJzogJ3N0YXRpYyd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ub25TY3JvbGwobyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfShvKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZWNhbGN1bGF0ZSB0aGUgc2lkZWJhcidzIHBvc2l0aW9uIGV2ZXJ5IHRpbWUgdGhlIHNpZGViYXIgY2hhbmdlcyBpdHMgc2l6ZS5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFJlc2l6ZVNlbnNvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlc2l6ZVNlbnNvcihvLnN0aWNreVNpZGViYXJbMF0sIGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ub25TY3JvbGwobyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KG8pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgc2lkZWJhciB0byBpdHMgZGVmYXVsdCBzdGF0ZVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0U2lkZWJhcigpIHtcbiAgICAgICAgICAgICAgICAgICAgby5maXhlZFNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG8uc2lkZWJhci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ21pbi1oZWlnaHQnOiAnMXB4J1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgby5zdGlja3lTaWRlYmFyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAnc3RhdGljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGhlaWdodCBvZiBhIGRpdiBhcyBpZiBpdHMgZmxvYXRlZCBjaGlsZHJlbiB3ZXJlIGNsZWFyZWQuIE5vdGUgdGhhdCB0aGlzIGZ1bmN0aW9uIGZhaWxzIGlmIHRoZSBmbG9hdHMgYXJlIG1vcmUgdGhhbiBvbmUgbGV2ZWwgZGVlcC5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRDbGVhcmVkSGVpZ2h0KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IGUuaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0LCAkKHRoaXMpLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFdpZHRoRm9yT2JqZWN0KG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIHdpZHRoO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gb2JqZWN0WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpZHRoID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBvYmplY3Qud2lkdGgoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSkoalF1ZXJ5KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy90aGVpYS1zdGlja3ktc2lkZWJhci5qcy5tYXBcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9ob21lLmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3N0eWxlcy9ob21lLnNjc3NcIik7XG4iLCIiXSwibmFtZXMiOlsiJCIsInRoZWlhU3RpY2t5U2lkZWJhciIsImFkZGl0aW9uYWxNYXJnaW5Ub3AiLCJtaW5XaWR0aCIsImpRdWVyeSIsImZuIiwib3B0aW9ucyIsImRlZmF1bHRzIiwiZXh0ZW5kIiwicGFyc2VJbnQiLCJhZGRpdGlvbmFsTWFyZ2luQm90dG9tIiwidHJ5SW5pdE9ySG9va0ludG9FdmVudHMiLCIkdGhhdCIsInN1Y2Nlc3MiLCJ0cnlJbml0IiwiY29uc29sZSIsImxvZyIsImRvY3VtZW50Iiwib24iLCJuYW1lc3BhY2UiLCJldnQiLCJ1bmJpbmQiLCJ3aW5kb3ciLCJpbml0aWFsaXplZCIsIndpZHRoIiwiaW5pdCIsImV4aXN0aW5nU3R5bGVzaGVldCIsImxlbmd0aCIsImFwcGVuZCIsImVhY2giLCJvIiwic2lkZWJhciIsImNvbnRhaW5lciIsImNvbnRhaW5lclNlbGVjdG9yIiwicGFyZW50IiwicGFyZW50cyIsImNzcyIsImRlZmF1bHRQb3NpdGlvbiIsInN0aWNreVNpZGViYXIiLCJmaW5kIiwiamF2YVNjcmlwdE1JTUVUeXBlcyIsImZpbHRlciIsImluZGV4Iiwic2NyaXB0IiwidHlwZSIsIm1hdGNoIiwicmVtb3ZlIiwiYWRkQ2xhc3MiLCJjaGlsZHJlbiIsIm1hcmdpbkJvdHRvbSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwiY29sbGFwc2VkVG9wSGVpZ2h0Iiwib2Zmc2V0IiwidG9wIiwiY29sbGFwc2VkQm90dG9tSGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJzdGlja3lTaWRlYmFyUGFkZGluZ1RvcCIsInN0aWNreVNpZGViYXJQYWRkaW5nQm90dG9tIiwicHJldmlvdXNTY3JvbGxUb3AiLCJmaXhlZFNjcm9sbFRvcCIsInJlc2V0U2lkZWJhciIsIm9uU2Nyb2xsIiwiaXMiLCJkaXNhYmxlT25SZXNwb25zaXZlTGF5b3V0cyIsInNpZGViYXJXaWR0aCIsIm91dGVyV2lkdGgiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsIm9mZnNldFRvcCIsIm9mZnNldEJvdHRvbSIsImNvbnRhaW5lclRvcCIsImNvbnRhaW5lckJvdHRvbSIsImdldENsZWFyZWRIZWlnaHQiLCJ3aW5kb3dPZmZzZXRUb3AiLCJ3aW5kb3dPZmZzZXRCb3R0b20iLCJzaWRlYmFyU21hbGxlclRoYW5XaW5kb3ciLCJoZWlnaHQiLCJzdGF0aWNMaW1pdFRvcCIsInN0YXRpY0xpbWl0Qm90dG9tIiwic2Nyb2xsVG9wRGlmZiIsInNpZGViYXJCZWhhdmlvciIsIk1hdGgiLCJtaW4iLCJtYXgiLCJzaWRlYmFyU2FtZUhlaWdodEFzQ29udGFpbmVyIiwic2Nyb2xsTGVmdCIsImdldFdpZHRoRm9yT2JqZWN0IiwibGVmdCIsInRyYW5zZm9ybSIsInVwZGF0ZVNpZGViYXJIZWlnaHQiLCJSZXNpemVTZW5zb3IiLCJlIiwib2JqZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZXJyIl0sInNvdXJjZVJvb3QiOiIifQ==