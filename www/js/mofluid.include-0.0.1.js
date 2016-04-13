/*
mofluid-include v0.0.1
(c) 2009-2013 by Mofluid. All rights reserved.
Shashi Badhuk

This is the main header file. All the CSS and JS files are included here.
	1) Section 1 includes third party library
	2) Section 2 includes mofluid default library
	3) Section 3 includes mofluid custom library
	4) Section 4 includes css for mofluid app
 */

 var path = window.location.href;
 var splitted = path.split('/');
 var isHomePage = 0;																																												0;

 if(splitted[splitted.length-1] == 'index.html' || splitted[splitted.length-1] == '' || splitted[splitted.length-1] == 'www')
 	isHomePage = 1;
var mofluid_include = '<!-- Mofluid Mobile App v0.0.1 \
            (c) 2009-2013 by Mofluid. All rights reserved. \
            Shashi Badhuk \
            Header included -->';

/***************************** 
 * Section 1
 *  Includes third party library
 *****************************/
 	//Include Apace Cordova/Phonegap
     mofluid_include += '<!-- Include Apace Cordova --><script type="text/javascript" src="cordova.js"></script>';

     //Include jQuery Core
	mofluid_include += '<!-- Include jQuery Core --><script type="text/javascript" src="lib/jquery/jquery-2.1.3.min.js"></script>';
     
	//Include jQuery Mobile
	mofluid_include += '\
		<!-- Include jQuery Mobile --> \
		<link rel="stylesheet" type="text/css" href="lib/jquery.mobile/jquery.mobile-1.4.5.min.css" /> \
	     <link rel="stylesheet" type="text/css" href="lib/jquery.mobile/jquery.mobile.structure-1.4.5.min.css"/> \
	     <link rel="stylesheet" type="text/css" href="lib/jquery.mobile/jquery.mobile.theme-1.4.5.min.css"/> \
	     <script type="text/javascript" src="lib/jquery.mobile/jquery.mobile-1.4.5.min.js"></script>';

	// Include jQuery Mobile Autocomplete
	mofluid_include += '<!-- Include jQuery Mobile Autocomplete--><script type="text/javascript" src="lib/jqm.autocomplete/jqm.autoComplete-1.5.2-min.js"></script>';

	//Include jQuery Mobile Spinbox
	mofluid_include += '<!-- Include jQuery Mobile Spinbox--><script type="text/javascript" src="lib/jqm.spinbox/jqm.spinbox.min-3.0.js"></script>';

	//Include  Owl Carousel Slider
	mofluid_include += '<!-- Include  Owl Carousel Slider --><script src="lib/owl.carousel/owl.carousel-1.3.3.js"></script>';

/*****************************  
 * Section 2
 *  Includes mofluid default library
 *****************************/
	// Include locale settings 
	mofluid_include += '<!-- Include locale settings --><script src="locale/mofluid.locale-0.0.1.js"></script>';

	// Include app configuration settings
	mofluid_include += '<!-- Include app configuration settings --><script src="js/default/mofluid.config-0.0.1.js"></script>';

	//Include Push Notification
	mofluid_include += '<!-- Include Push Notification --><script src="js/addon/push-notification/mofluid.push.notification-0.0.1.js"></script>';

	//Include mofluid cookies
	mofluid_include += '<!-- Include mofluid cookies --><script src="js/default/mofluid.cookies-0.0.1.js"></script>';

	// Include mofluid encryption
	mofluid_include += '<!-- Include mofluid encryption --><script src="js/default/mofluid.encryption-0.0.1.js"></script>';

	//Include mofluid helper
	mofluid_include += '<!-- Include mofluid helper --><script src="js/default/mofluid.helper-0.0.1.js"></script>';

/*****************************
 * Section 3
 *  Includes mofluid custom library
 *****************************/
	//Include mofluid catalog 
	mofluid_include += '<!-- Include mofluid catalog --><script src="js/custom/mofluid.catalog-0.0.1.js"></script>';

	//Include mofluid functions
	mofluid_include += '<!-- Include mofluid functions --><script src="js/custom/mofluid.functions-0.0.1.js"></script>';

	//Include mofluid cart
	mofluid_include += '<!-- Include mofluid cart --><script src="js/custom/mofluid.cart-0.0.1.js"></script>';
	
	//Include mofluid checkout
	mofluid_include += '<!-- Include mofluid checkout --><script src="js/custom/mofluid.checkout-0.0.1.js"></script>';
	
	//Include mofluid payment
	mofluid_include += '<!-- Include mofluid payment --><script src="js/custom/mofluid.payment-0.0.1.js"></script>';
    //Include mofluid payment
    mofluid_include += '<!-- Include mofluid paypal payment --><script type="text/javascript" src="js/paypal-mobile-js-helper.js"></script>';
    mofluid_include += '<!-- Include vmenuModulejs --><script type="text/javascript" src="js/custom/vmenuModule.js"></script>';
	
/***************************** 
 * Section 4
 *  Includes css for mofluid app
 *****************************/
 	//Include Style css for mofluid app
 	
 	if(isHomePage == 0) {
 		mofluid_include += '<!-- Include Style css for mofluid app --><link rel="stylesheet" type="text/css" href="css/Style.css" />';
	
		//Include Color css for mofluid app
		mofluid_include += '<!-- Include Color css for mofluid app --><link rel="stylesheet" type="text/css" href="css/color.css" />';
		
		//Include responsive css for mofluid app
		mofluid_include += '<!-- Include Color css for mofluid app --><link rel="stylesheet" type="text/css" href="css/responsive.css" />';
		
		//Include responsive grid css for mofluid app
		mofluid_include += '<!-- Include Color css for mofluid app --><link rel="stylesheet" type="text/css" href="css/responsive.grid.css" />';
		
		//Include responsive grid css for mofluid cart
		mofluid_include += '<!-- Include Color css for mofluid app --><link rel="stylesheet" type="text/css" href="css/cart.css" />';
	
 	} else {

 		mofluid_include += '<!-- Include Style css for mofluid app --><link rel="stylesheet" type="text/css" href="css/Style.css" />';
	
		//Include responsive css for mofluid app
		mofluid_include += '<!-- Include Color css for mofluid app --><link rel="stylesheet" type="text/css" href="css/responsive.css" />';
		
		
 		mofluid_include += '<script type="text/javascript" src="home_page/js/bootstrap.min.js"></script>';
	
		//Include Color css for mofluid app
		mofluid_include += '<!-- Include Color css for mofluid app --><link rel="stylesheet" type="text/css" href="home_page/css/bootstrap.css" />';

		mofluid_include += '<!-- Include Style css for mofluid app --><link rel="stylesheet" type="text/css" href="home_page/css/style.css" />';
		
		//Include responsive css for mofluid app
		mofluid_include += '<!-- Include Color css for mofluid app --><link rel="stylesheet" type="text/css" href="home_page/css/responsive.css" />';
		
		//Include responsive grid css for mofluid app
		mofluid_include += '<!-- Include Color css for mofluid app --><link rel="stylesheet" type="text/css" href="home_page/css/font-awesome.css" />';
 	}
	
	//Include responsive grid css for vmodule
	mofluid_include += '<!-- Include Color css for mofluid app --><link rel="stylesheet" type="text/css" href="css/vmenuModule.css" />';
 
document.write(mofluid_include);
