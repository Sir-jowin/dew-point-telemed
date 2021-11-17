/*
***
***
Name: 			Theme Library
Written by: 	ThemeTrade 
Theme Version:	1.0.0
***
***
*/
(function($) {
	
		'use strict';
	
		var ThemeBuilder = function(){
				
				var windowSize = $( window ).width();
				
				var setWindowSizeVar = function() {
					windowSize = $( window ).width();
				}
				
				var checkMobileDevice = function() {
				  var isMobile = false;
				  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isMobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
				  return isMobile;
				};
				
				var checkSelectorExistence = function(selectorName) {
				  if(jQuery(selectorName).length > 0){return true;}else{return false;}
				};
				
				/* Control One Page Layout */
				var scrollPageLayout = function() {
					if(!checkSelectorExistence('.scroll-page')){return;}
					$('.scroll-page').scroller();
				}
				
				/* Set Header Height (Call On Resize Event Also) */
				var setHeaderHeight = function(){
					if(!checkSelectorExistence('.header')){return;}
					var getActualHeaderRecentHeight = $('.header').height();
					var getActualHeaderFullHeight = $('.header').css({'max-height': 'auto', 'height': 'auto'}).height();
					$('.header').css({ 'height': getActualHeaderRecentHeight }).animate({ 'height': getActualHeaderFullHeight }, 200);
				}
				
				/* Load File ============ */
				var controlLeftSideMenu = function(){
					 /******  Remove This Function and Set double logo in html or remove logo from left side menu******/
					 if(windowSize < 991)
					{
						if($('.rs-nav .menu-links').children('div').length == 0){
							var logoData = jQuery('<div>').append($('.rs-nav .logo-header').clone()).html();
							jQuery('.rs-nav .menu-links').prepend(logoData);
							jQuery('.rs-nav .menu-links .logo-header > a > img').attr('src','images/logo.png');
							jQuery('.rs-nav.lw .menu-links .logo-header > a > img').attr('src','images/logo-white.png');
						}
					}else{
						jQuery('.rs-nav .menu-links div').remove();
						jQuery('.rs-nav.lw .menu-links div').remove();
					}
					/******  Remove This Function and Set double logo in html or remove logo from left side menu******/
				}
				
				/* Page Scroll To Top ============ */
				var pageScrollToTop = function (){
					/* page scroll top on click function */	
					jQuery("button.back-to-top").on('click',function() { /* change back-to-top to scrollToTop*/
						jQuery('html').animate({ scrollTop: 0 }, 500);
						return false;
					})

					jQuery(window).on("scroll", function() {
						var scrollWindowHeight = jQuery(window).scrollTop();
						if (scrollWindowHeight > 900) {
							jQuery("button.back-to-top").slideDown(1000).fadeIn(1000);
						} else {
							jQuery("button.back-to-top").slideUp(1000).fadeOut(1000);
						}
					});
					/* page scroll top on click function end*/
				}
				
				/* Set Sticky Header */
				var setStickyheader = function(){
					jQuery(window).on('scroll', function () {
						if(!checkSelectorExistence('.sticky-header')){return;}
						var header = jQuery('.sticky-header');
						if ($(window).scrollTop() > header.offset().top) {
							header.addClass('is-fixed'); /*change is-fixed to fixed*/
						} else {
							header.removeClass('is-fixed');
						}
					});
				}
				
				/* Set Counter Up Function */
				var setCounterUp = function(){
					/* change counter to counter-up*/
					if(!checkSelectorExistence('.counter')){return;}
					 jQuery('.counter').counterUp({
						delay: 10,
						time: 3000
					});	
				}
				
				/* Set Bootstrap Drop Down */
				var setBootstrapDropDown = function(){
					if(!checkSelectorExistence('select')){return;}	
					jQuery('select').selectpicker();
				}
				
				/* Stylish Scroll */
				var setStylishScroll = function(){
					/*change content-scroll to custom-scroll*/
					if(!checkSelectorExistence('.content-scroll')){return;}
					$(".content-scroll").mCustomScrollbar({
						setWidth:false,
						setHeight:false,
						axis:"y"
					});	
				}
				
				/* Left Side Menu */
				var manageLeftSideMenu = function(){
					/*change menuicon to nav-icon */
					jQuery('.menuicon').unbind().on('click',function(){
						$(this).toggleClass('open');
					});
					
					if(windowSize <= 991 ){
						jQuery('.navbar-nav > li > a, .sub-menu > li > a').unbind().on('click', function(e){
								//e.preventDefault();
								if(jQuery(this).parent().hasClass('open'))
								{
									jQuery(this).parent().removeClass('open');
								}
								else{
									jQuery(this).parent().parent().find('li').removeClass('open');
									jQuery(this).parent().addClass('open');
								}
							});
						}
					}
				
				
				var manageLoader = function() {
					setTimeout(function(){
						jQuery('#loading-icon-bx').remove();
					}, 0);
				}
				
				/* Function ============ */
				return {
					initialHelper:function(){
						scrollPageLayout();
						controlLeftSideMenu();
						setHeaderHeight();
						pageScrollToTop();
						setStickyheader();
						setStylishScroll();
						manageLeftSideMenu();
					},
					
					afterLoadThePage:function(){
						setBootstrapDropDown();
						setCounterUp();
						manageLoader();
					},
					
					changeTheScreen:function(){
						setWindowSizeVar();
						controlLeftSideMenu();
						manageLeftSideMenu();
						setHeaderHeight();
					}
				}
		
	}(jQuery);

	/* jQuery ready  */	
	jQuery(document).on('ready',function() {ThemeBuilder.initialHelper();BasicFunction.initialHelper();});
	/* jQuery Window Load */
	jQuery(window).on("load", function (e) {ThemeBuilder.afterLoadThePage();});
	/* Screen Resize */
	jQuery(window).on('resize',function(){ThemeBuilder.changeTheScreen();});
	
})(jQuery);