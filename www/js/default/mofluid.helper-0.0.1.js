/*
mofluid-helper v0.0.1
(c) 2009-2013 by Mofluid. All rights reserved.
Shashi Badhuk

Provides Following Methods :-
    a) getParameterByName
    b) queryValue
    c) redirectTopage
    d) sleep
    e) dirname
*/

var  Currency = new function() {
	this.getStoreCurrency = function () {
    	    var stores = config.store.all;
         var total = config.store.all.length;
         var default_store = config.store.default; 
         for(var i=0;i<total;i++) {
		   if(default_store == stores[i].id) {
			 console.log("Store Found");
			 return stores[i].currency[0].code;
		   }
	    }
         if(i>=total) {
            console.error("Currency Not Found.");
         }
    };
    this.getStoreCurrencySymbol = function () {
    	    var stores = config.store.all;
         var total = config.store.all.length;
         var default_store = config.store.default; 
         for(var i=0;i<total;i++) {
		   if(default_store == stores[i].id) {
			 return stores[i].currency[0].symbol;
		   }
	    }
         if(i>=total) {
            console.error("Currency Not Found.");
         }
    };
}

var  Locale = new function() {
	this.loadSubCategoryText = function () {
    	     $("#mofluid_home_a").html(locale.message.button["home"]); 
		$("#mofluid_myaccount_a").html(locale.message.button["my_account"]);
		$("#mofluid_editprofile_a").html(locale.message.button["edit_profile"]);
		$("#mofluid_myorders_a").html(locale.message.button["my_orders"]);
		$("#mofluid_signout_a").html(locale.message.button["sign_out"]);
		$("#mofluid_signin_a").html(locale.message.button["sign_in"]);
		$("#p1").html(locale.message.text["position_sort_type"] + '&#8595;');
		$("#p1").trigger("change");
		$("#p2").html(locale.message.text["position_sort_type"] + '&#8593;');
		$("#p3").html(locale.message.text["name_sort_type"] + '&#8595;');
		$("#p4").html(locale.message.text["name_sort_type"] + '&#8593;');
		$("#p5").html(locale.message.text["price_sort_type"] + '&#8595;');
		$("#p6").html(locale.message.text["price_sort_type"] + '&#8593;');
    };
    this.loadHomeText = function () {
    	     $("#mofluid_home_a").html(locale.message.button["home"]); 
		$("#mofluid_myaccount_a").html(locale.message.button["my_account"]);
		$("#mofluid_editprofile_a").html(locale.message.button["edit_profile"]);
		$("#mofluid_myorders_a").html(locale.message.button["my_orders"]);
		$("#mofluid_signout_a").html(locale.message.button["sign_out"]);
		$("#mofluid_signin_a").html(locale.message.button["sign_in"]);
		$("#support").html(locale.message.text["support_text"]);  
		$("#policies").html(locale.message.text["policy_text"]);
		$("#searchFilter").attr("placeholder",locale.message.text["search_by_name"]);
		if(locale.message.text["shop_by_departments"] == null || locale.message.text["shop_by_departments"] == '')
			   $("#heading_text").html("Shop by Departments");
		else
			   $("#heading_text").html(locale.message.text["shop_by_departments"]);
    };
    this.loadProductDetailText = function () {
        $("#mofluid_home_a").html(locale.message.button["home"]); 
	   $("#mofluid_myaccount_a").html(locale.message.button["my_account"]);
	   $("#mofluid_editprofile_a").html(locale.message.button["edit_profile"]);
	   $("#mofluid_myorders_a").html(locale.message.button["my_orders"]);
	   $("#mofluid_signout_a").html(locale.message.button["sign_out"]);
	   $("#mofluid_signin_a").html(locale.message.button["sign_in"]);
	    $("#product_description").html(locale.message.text["product_description"]);
	    $("#product_name").html(locale.message.text["products"] + locale.message.text["name"]);
	    $("#item_code").html(locale.message.text["item"]);
	    $("#description").html(locale.message.text["description"]);
	    $("#availability").html(locale.message.text["availability"]);
	    $("#price").html(locale.message.text["price"]);
	    $("#size").html(locale.message.text["price"]);
	    $("#material").html(locale.message.text["price"]);
	    $("#style").html(locale.message.text["price"]);
	    $("#color").html(locale.message.text["price"]);
		$("#product_options").html(locale.message.text["product_options"]);
	    $("#buy_now_div").html(' <input id="buyNow" class="content-secondry" type="button" data-role="button" data-theme="b" value="'+locale.message.button["add_to_cart"]+'"/  > ');
	    $("#buy_now_div").trigger("create");
    };
    this.loadCartText = function () {
		 $("#mofluid_home_a").html(locale.message.button["home"]); 
          $("#mofluid_myaccount_a").html(locale.message.button["my_account"]);
          $("#mofluid_editprofile_a").html(locale.message.button["edit_profile"]);
          $("#mofluid_myorders_a").html(locale.message.button["my_orders"]);
          $("#mofluid_signout_a").html(locale.message.button["sign_out"]);
          $("#mofluid_signin_a").html(locale.message.button["sign_in"]); 
     	$("#discount_codes").html(locale.message.text["discount_codes"]);
          $("#coupon_code").html(locale.message.text["coupon_code_text"]);
          $("#applybutton").html(' <input type="button" id="apply_coupon" class="cartButton2" class="content-secondry" data-role="button" data-theme="a" value="'+locale.message.button["apply_coupon"]+'" onclick="applyCoupon();"/> ');
          $("#applybutton").trigger("create");
          $("#cancelcoupon").html(' <input type="button" id="cancel_coupon" class="cartButton2" class="content-secondry" data-role="button" data-theme="a" value="'+locale.message.button["cancel_coupon"]+'" onclick="cancelCoupon();"/> ');
          $("#cancelcoupon").trigger("create");
          $("#checkout_btn").html('  <input type="button" id="buyNow2" class="cartButton2" class="content-secondry" data-role="button" data-theme="b" value="'+locale.message.button["checkout"]+'"  onClick="CartLayout.proceedToCheckout();"/> ');
          $("#checkout_btn").trigger("create");
          $("#continue_shopping_btn").html('  <input id="shopping1" class="content-secondry" type="button" data-role="button" data-theme="c" value="'+locale.message.button["continue_shopping"]+'"  onClick="visitHomePage();"/> ');
          $("#continue_shopping_btn").trigger("create");
                    
    };
    this.loadCheckoutText  = function() {
           $("#mofluid_home_a").html(locale.message.button["home"]); 
		 $("#mofluid_myaccount_a").html(locale.message.button["my_account"]);
		 $("#mofluid_editprofile_a").html(locale.message.button["edit_profile"]);
		 $("#mofluid_myorders_a").html(locale.message.button["my_orders"]);
		 $("#mofluid_signout_a").html(locale.message.button["sign_out"]);
		 $("#mofluid_signin_a").html(locale.message.button["sign_in"]);
		 $("#edit_heading").html(locale.message.text["shipping_method"]);
		 $("#ship_select").html(locale.message.text["select"]);
		 $("#ship_select").trigger("change");
		 $("#shipping_error").html(locale.message.text["no_shipping_methods_message"]);
		 $("#product").html(locale.message.text["products"]);
		 $("#image").html(locale.message.text["image"]);
		 $("#unit_price").html(locale.message.text["unit_price"]);
		 $("#qty").html(locale.message.text["qty"]);
		 $("#shippCode").html(locale.message.text["shipping__handling"]);
		 $("#tax_amount").html(locale.message.text["tax"]);
		 $("#couponCode").html(locale.message.text["discount_codes"]);
		 $("#coupon_code_text").html(locale.message.text["coupon_code_text"]);
		 $("#discount_codes").html(locale.message.text["discount_codes"]);
		 $("#grand_total").html(locale.message.text["grand_total"]);
		 $("#total").html(locale.message.text["total"]);
		 $("#applybutton").html(' <input type="button" id="apply_coupon" class="cartButton2" class="content-secondry" data-role="button" data-theme="b" value="'+locale.message.button["apply_coupon"]+'" onclick="couponApply();"/>');
		 $("#applybutton").trigger("create");
		 $("#cancelcoupon").html(' <input type="button" id="cancel_coupon" class="cartButton2" class="content-secondry" data-role="button" data-theme="b" value="'+locale.message.button["cancel_coupon"]+'" onclick="cancelCoupon();"/> ');
		 $("#cancelcoupon").trigger("create");
		 $("#cartbtn2").html('  <input type="button" id="buyNow2" class="cartButton2" class="content-secondry" data-role="button" data-theme="c" value="'+locale.message.button["proceed"]+'" style="padding:bottom:1%;" onClick="review_order();"/> ');
		 $("#cartbtn2").trigger("create"); 
		 $('#buyNow2').button('disable');
		 $('#buyNow2').button('refresh');
		 $("#cancelcoupon").css("display","none");
		 $("#couponCode").html(locale.message.text["discount"]);
		 $("#coupon_row").css("display","none");
    };
}

/*
 *Function to fetch the querystring by name.
 *@param name
 *@return decodeURIComponent
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/*
 *Function to fetch the complete query string.
 *@param NULL
 *@return decodeURIComponent
 */
function queryValue() {
    var qrStr = window.location.search;
    if (qrStr)
        var qrvalue = (qrStr.split("?")[1].split("=")[1]);
    return decodeURIComponent(qrvalue);
}

/*
 *Function to redirect to various page
 *@param decodeURIComponent
 *@return NULL
 */
function redirectTopage(pagename) {
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/" + pagename;
    window.location = fullPath;
}
/*
 *Function to redirect to various page
 *@param decodeURIComponent
 *@return NULL
 */
function redirectWithParams(pagename, attribute, value) {
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/" + pagename+"?"+attribute+"="+value;
    window.location = fullPath;
}
/*
 *Function to sleep for some seconds
 *@param milliseconds
 *@return
 */
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

/*
 *Function to get directory path
 *@param path
 *@return
 */
function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');;
}

/*
 *Function to Capitalise First Letter of the String
 *@param path
 *@return
 */
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/*
 *Function to fetch the querystring by name in given url.
 *@param name,url
 *@return decodeURIComponent
 */
function getParameterByNameInUrl(name,url) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}