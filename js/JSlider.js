/**
 * JSlider v1.0.0
 * created by Arnaud Plassier
 */

(function($) {
	$.fn.JSlider = function(po_options) {

		if(!$(this).length) {
			fct_error("JSlider needs to be initialized with a selector.");
			return;
		}
		else if(fct_getJSlide_o().length == 0) {
			fct_error("JSlider requires, at least, one slide.");
			return;
		}	

		fo_options = fct_getOptions_o(po_options);

		var fi_slideIndex = fo_options.initialSlideIndex;
		var fi_containerHeight;
		var fi_containerWidth;
		var fb_animationLocked = false;

		if(po_options.enableKeyboardEvent) {
			fct_setKeydownHandler();
		}

		if(po_options.enableControl) {
			fct_showControl();
		}

		$(window).resize(fct_resize);
		fct_resize();



		function fct_getOptions_o(po_options) {
			if(po_options == undefined)
				po_options = {};

			if(po_options.enableLoop == undefined)
				po_options.enableLoop = false;

			if(po_options.enableKeyboardEvent == undefined)
				po_options.enableKeyboardEvent = false;

			if(po_options.enableControl == undefined)
				po_options.enableControl = true;

			if(po_options.initialSlideIndex == undefined)
				po_options.initialSlideIndex = 0;
			else if(po_options.initialSlideIndex > (fct_getJSlide_o().length - 1))
				po_options.initialSlideIndex = (fct_getJSlide_o().length - 1);

			return po_options;
		}

		function fct_getJSlider_s() {
			return ".jslider";
		}

		function fct_getJSlider_o() {
			return $(".jslider");
		}

		function fct_getJSlide_o() {
			return $(".jslider .jslide");
		}

		function fct_getJSlide_s() {
			return ".jslider .jslide";
		}

		function fct_getJSlideSelected_o() {
			return $(".jslider .jslide.selected");
		}

		function fct_getLeftArrowControl_html() {
			return "<div id='leftArrowControl'></div>";
		}

		function fct_getRightArrowControl_html() {
			return "<div id='rightArrowControl'></div>";
		}

		function fct_getLeftArrowControl_o() {
			return $("#leftArrowControl");
		}

		function fct_getRightArrowControl_o() {
			return $("#rightArrowControl");
		}

		function fct_resize() {
			fi_containerHeight = fct_getJSlider_o().innerHeight();
			fi_containerWidth = fct_getJSlider_o().innerWidth();

			fct_getJSlide_o().each(function(pi_index) {
				$(this).css("height", fi_containerHeight);
				$(this).css("width", fi_containerWidth);
				if (pi_index != fi_slideIndex) {
					$(this).hide();
				}
				else {
					$(this).addClass("selected");
				}
			}); 

			fct_getLeftArrowControl_o().css("top", (fi_containerHeight - $("#leftArrowControl").height()) / 2);

			fct_getRightArrowControl_o().css("top", (fi_containerHeight - $("#rightArrowControl").height()) / 2);
		}

		function fct_showControl() {
			fct_getJSlider_o().append(fct_getLeftArrowControl_html());
			fct_getJSlider_o().append(fct_getRightArrowControl_html());

			fct_getLeftArrowControl_o().click(fct_previousSlide);

			if(!po_options.enableLoop && fi_slideIndex == 0)
				fct_getLeftArrowControl_o().hide();

			fct_getRightArrowControl_o().click(fct_nextSlide);

			if(!po_options.enableLoop && fi_slideIndex == (fct_getJSlide_o().length - 1))
				fct_getRightArrowControl_o().hide();
		}

		function fct_setKeydownHandler() {
			$(document).keydown(function(fi_key) {
				switch (fi_key.which) {
					// left arrow
					case 37:
						fct_previousSlide();
						break;

					// right arrow
					case 39:
						fct_nextSlide();
						break;

					default:
						return;
				}
			});
		}

		function fct_nextSlide() {
			if(fb_animationLocked) {
				return;
			}

			if (fi_slideIndex < fct_getJSlide_o().length - 1) {
				var fo_currentSlide = fct_getJSlideSelected_o();
				var fo_nextSlide = fo_currentSlide.next(fct_getJSlide_s());

				fo_currentSlide.removeClass("selected");
				fo_nextSlide.addClass("selected");

				fb_animationLocked = true;
				fo_currentSlide.hide("slide", { direction: "left" }, 750, function() {
					fb_animationLocked = false;
				});
				fo_nextSlide.show("slide", { direction: "right" }, 750, function() {
					fb_animationLocked = false;
				});

				fi_slideIndex++;

				if(!po_options.enableLoop && fi_slideIndex == (fct_getJSlide_o().length - 1)) {
					fct_getRightArrowControl_o().hide();
				}
				else  {
					fct_getLeftArrowControl_o().show();
				}
			}
			else if (fo_options.enableLoop) {
				var fo_currentSlide = fct_getJSlideSelected_o();
				var fo_nextSlide = fct_getJSlide_o().first();

				fo_currentSlide.removeClass("selected");
				fo_nextSlide.addClass("selected");

				fb_animationLocked = true;
				fo_currentSlide.hide("slide", { direction: "left" }, 750, function() {
					fb_animationLocked = false;
				});
				fo_nextSlide.show("slide", { direction: "right" }, 750, function() {
					fb_animationLocked = false;
				});

				fi_slideIndex = 0;
			}
		}

		function fct_previousSlide() {
			if(fb_animationLocked) {
				return;
			}
			
			if (fi_slideIndex > 0) {
				var fo_currentSlide = fct_getJSlideSelected_o();
				var fo_previousSlide = fo_currentSlide.prev(fct_getJSlide_s);

				fo_currentSlide.removeClass("selected");
				fo_previousSlide.addClass("selected");

				fb_animationLocked = true;
				fo_currentSlide.hide("slide", { direction: "right" }, 750, function() {
					fb_animationLocked = false;
				});
				fo_previousSlide.show("slide", { direction: "left" }, 750, function() {
					fb_animationLocked = false;
				});

				fi_slideIndex--;

				if(!po_options.enableLoop && fi_slideIndex == 0) {
					fct_getLeftArrowControl_o().hide();
				}
				else  {
					fct_getRightArrowControl_o().show();
				}
			}
			else if (fo_options.enableLoop) {
				var fo_currentSlide = fct_getJSlideSelected_o();
				var fo_previousSlide = fct_getJSlide_o().last();

				fo_currentSlide.removeClass("selected");
				fo_previousSlide.addClass("selected");

				fb_animationLocked = true;
				fo_currentSlide.hide("slide", { direction: "right" }, 750, function() {
					fb_animationLocked = false;
				});
				fo_previousSlide.show("slide", { direction: "left" }, 750, function() {
					fb_animationLocked = false;
				});

				fi_slideIndex = fct_getJSlide_o().length - 1;
			}
		}

		function fct_print(ps_message, ps_type) {
			if (ps_type == undefined) {
				fct_error("missing parameter <ps_type> in the function fct_print(ps_message, ps_type)");
				return;
			}
			console[ps_type]("[JSlider] " + ps_message);
		};

		function fct_error(ps_message) {
			fct_print(ps_message, "error");
		};

		function fct_info(ps_message) {
			fct_print(ps_message, "info");
		};

		function fct_log(ps_message) {
			fct_print(ps_message, "log");
		};

		function fct_warn(ps_message) {
			fct_print(ps_message, "warn");
		};
	}
})(jQuery);