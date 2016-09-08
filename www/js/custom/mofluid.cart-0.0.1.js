/*
mofluid-cart.js v0.0.1
(c) 2009-2013 by Mofluid. All rights reserved.
Shashi Badhuk

Provides Following Class & Methods :-
   A) ShoppingCart
	  1) getCartFromStorage
	  2) getConfigurableCartData
	  3) getGroupedCartData
	  4) getBundleCartData 
	  5) getVirtualCartData
	  6) getDownloadableCartData
	  7) getSimpleCartData
	  8) add
	  9) addToCartStorage
	  10) remove
	  11) clear
	  12) get
	  13) getAll
	  14) getTotalProducts
	  15) getTotalQuantity
	  
  B) CartLayout
	  1) initialize
	  2) upadteQuanitiy
	  
*/

/*
 *Class to handle all Cart Functionality.
 *@public total Total Number of product in Cart
 */
var CartLayout = new function()  {
	/*
 	* Function to add product to cart
 	*@param Object product
 	*/
	this.upadteQuanitiy = function(element, index, productid) {
	    var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
	    CompleteCart["products"][index].quantity = element.value;
	    localStorage[config.app.storage_key+"_cart"] = Base64.encode(JSON.stringify(CompleteCart));
	    var carttotal = 0;
	    var CurrentCart = CompleteCart["products"];
	    for (key in CurrentCart) {
    	        if (CurrentCart.hasOwnProperty(key)) {	
    	            carttotal += parseFloat(CurrentCart[key].price) * CurrentCart[key].quantity;
    	        }
    	    }
    	    var floatdCartTotal = parseFloat(carttotal).toFixed(2);
    	    this.updateShippingMsg(floatdCartTotal);
    	    $("#cart_total_amount").html(Currency.getStoreCurrencySymbol()+floatdCartTotal);
    	    $("#cart_total_amount").html(Currency.getStoreCurrencySymbol()+parseFloat(carttotal).toFixed(2));
    	    $("#cart_total_amount").trigger("create");
    	    $("#quant_"+productid).html(CompleteCart["products"][index].quantity);
    	    $("#producttotal_"+productid).html(Currency.getStoreCurrencySymbol()+''+(CompleteCart["products"][index].quantity*parseFloat(CompleteCart["products"][index].price)).toFixed(2));
    	    $("#cartProducts").html(Cart.getTotalQuantity());
     };
     this.removeItem = function(element, index, productid) {
	    var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
	    var index = 0;
	    var CurrentCart = CompleteCart["products"];
	    var UpdatedCart = new Array();
	    for (key in CurrentCart) {
    	        if (CurrentCart.hasOwnProperty(key)) {	
    	            if (CurrentCart[key].id == productid) {
    	                continue;
    	            }
    	            else {	
    	                UpdatedCart[index] = CurrentCart[key];
    	                index++;
    	            }
    	        }
    	    }
    	    CompleteCart["products"] = UpdatedCart;
    	    localStorage[config.app.storage_key+"_cart"] = Base64.encode(JSON.stringify(CompleteCart));
	    this.initialize();
	    $("#cartProducts").html(Cart.getTotalQuantity());
     };
     this.updateShippingMsg = function(amt) {
     	var freeAmt = localStorage.getItem('free_shipping_amt');
     	if(amt >= freeAmt) {
	    	$('#shipping-msg').html('Congratulations!! Free shipping is applicable.');
	    	$('#shipping-msg').removeClass('non-free');
	    	$('#shipping-msg').addClass('free');
	    } else {
	    	var remaining_price = freeAmt - amt;
	    	$('#shipping-msg').html('Shop for '+Currency.getStoreCurrencySymbol()+remaining_price+' more and get free shipping.');
	    	$('#shipping-msg').removeClass('free');
	    	$('#shipping-msg').addClass('non-free');
	    }
     }
     this.initialize = function() {
	    var cart_list_html = CartLayout.getCartHtml("enable_controls");
    	    $("#cartlist_container").html(cart_list_html);
    	    $("#cartlist_container").trigger("create");
     };
     this.getCartHtml = function(mode) {
         try {
	    var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
	    var CurrentCart = CompleteCart["products"];
	    var carttotal = 0;
	    var isCartEmpty  = 1;
	    var cart_list_html = '<ul data-role="listview" id="cartlist" data-icon="remove">';
	   for (key in CurrentCart) {
	 	   if (CurrentCart.hasOwnProperty(key)) {	
 			  isCartEmpty = 0;
 			  var redirectid = CurrentCart[key].id;
 			  try {
				if(CurrentCart[key].options.parent.id) {
				 	  redirectid = CurrentCart[key].options.parent.id;
			     }
			  }catch(err) {
			  
		      }
			  cart_list_html += '<li id="cart_item_'+CurrentCart[key].id+'" productid="'+CurrentCart[key].id+'" productsku="'+CurrentCart[key].sku+'">';
			  cart_list_html += '<div class="cart_product_outer">';
			  	cart_list_html += '<div class="cart_product_image" onClick=\'redirectWithParams("product.html", "id", "'+redirectid+'")\'>';
			  		cart_list_html += '<a class="ui-link-inherit no-svg ui-icon-del" rel="#">';
			  			cart_list_html += '<img src="'+CurrentCart[key].image[0]+'" onerror="bad_image(this);" />';
			  	cart_list_html += '</a></div>';
			  	cart_list_html += '<div class="cart_product_item_info_block">';
					    cart_list_html += '<div class="cart_product_item_info">';
			                       cart_list_html += '<div class="cart_product_item_title">';
			                           cart_list_html += '<p class="cart_product_item_title_text">'+CurrentCart[key].name+'</p>';
			                           if(CurrentCart[key].type="configurable") {
									 try {
										var option_label = CurrentCart[key].options.attributes.label.trim();
										option_label = option_label.substring(0, option_label.length - 1);
										if(option_label) {
										    cart_list_html +='<p><span class="product_price_color product_option_text">'+option_label+'</span></p>';
										}
									 }
									 catch(err) {
									 }
								  }
								  cart_list_html += '</div>'; //cart_product_item_title
								  if(mode == "enable_controls") {
								      cart_list_html += '<div class="cart_product_item_del"><img class="cart_remove" src="media/images/icons/elegant/delete_32x32.png" onClick="CartLayout.removeItem(this, '+key+', '+CurrentCart[key].id+')" /></div>';
			      				  }
								  cart_list_html += '</div>'; //cart_product_item_info
								  
								  
					   cart_list_html += '<div class="cart_product_item_config">';
			               cart_list_html += '<div class="cart_product_item_main"><div class="cart_product_item_config_unit product_price_color">';
			   cart_list_html += Currency.getStoreCurrencySymbol()+parseFloat(CurrentCart[key].price).toFixed(2);
			  
					   cart_list_html += '</div>'; 
					   cart_list_html += '<div class="cart_product_item_config_multiply">';
			  			cart_list_html += 'X';
			  
					   cart_list_html += '</div>'; 
					   cart_list_html += '<div class="cart_product_item_config_quant">';
			            if(mode == "enable_controls") {
			     	 cart_list_html += '<input type="text" class="myinputclassspin" readonly data-role="spinbox" data-mini="true" data-type="horizontal" name="spin" id="cart_item_quantity_'+CurrentCart[key].id+'" value="'+CurrentCart[key].quantity+'" min="1" max="'+parseInt(CurrentCart[key].stock_quantity)+'" onChange="CartLayout.upadteQuanitiy(this, '+key+', '+CurrentCart[key].id+')"/>';
			     	}
			     	else {
			     	cart_list_html += '<div>'+locale.message.text['qty']+' : '+CurrentCart[key].quantity+'</div>';
			      
			     	}
			  
					   cart_list_html += '</div></div>'; 
					   cart_list_html += '<div class="cart_product_item_config_total">';
			  
			  cart_list_html += '<span class="product_price_color" id="producttotal_'+CurrentCart[key].id+'">'+Currency.getStoreCurrencySymbol()+parseFloat(CurrentCart[key].price*CurrentCart[key].quantity).toFixed(2)+'</div>';
					   cart_list_html += '</div>'; 
			  
					   cart_list_html += '</div>'; //cart_product_item_config
			  
			  	cart_list_html += '</div>'; //cart_product_item_info_block
			  cart_list_html += '</div>'; //cart_product_outer
			  cart_list_html += '</li>';
			  
			 /* if(mode == "enable_controls") {
			      cart_list_html += '<input type="text" readonly data-role="spinbox" data-mini="true" data-type="horizontal" name="spin" id="cart_item_quantity_'+CurrentCart[key].id+'" value="'+CurrentCart[key].quantity+'" min="1" max="100" onChange="CartLayout.upadteQuanitiy(this, '+key+', '+CurrentCart[key].id+')"/>';
			      cart_list_html += '</div>';
			      cart_list_html += '<div style="float:right">';
			      cart_list_html += '<div style="text-align:right;margin:.45em 0;"><img class="cart_remove" src="media/images/icons/elegant/delete_32x32.png" onClick="CartLayout.removeItem(this, '+key+', '+CurrentCart[key].id+')" /></div>';
			      cart_list_html += '<div class="cart_unit_price_row">'+Currency.getStoreCurrencySymbol()+CurrentCart[key].price+' x <span id="quant_'+CurrentCart[key].id+'">'+CurrentCart[key].quantity+'</span> = <span class="cart_unit_price product_price_color">'+Currency.getStoreCurrencySymbol()+'<span id="producttotal_'+CurrentCart[key].id+'">'+CurrentCart[key].price*CurrentCart[key].quantity+'</span></span></div>';
			  }
			  else {
			      cart_list_html += '<div>'+locale.message.text['qty']+' : '+CurrentCart[key].quantity+'</div>';
			      cart_list_html += '</div>';
			      cart_list_html += '<div style="float:right">';
			      cart_list_html += '<div class="cart_unit_price_row" style="text-align:right;margin:.45em 0;">'+Currency.getStoreCurrencySymbol()+CurrentCart[key].price+' x '+CurrentCart[key].quantity+' = <span class="cart_unit_price product_price_color">'+Currency.getStoreCurrencySymbol()+CurrentCart[key].price*CurrentCart[key].quantity+'</span></div>';
			  }
			  cart_list_html += '</div>';
			  cart_list_html +='</a></li>';*/
			  carttotal += parseFloat(CurrentCart[key].price).toFixed(2) * CurrentCart[key].quantity;
		   }
	    }
	    if(isCartEmpty) {
	        cart_list_html = '<div id="cart_empty"><img src="media/images/default/cart_empty.png"></div>';
	        $("#checkout_btn").css("display","none");
	        carttotal = 0;
	        
	    }
	    else {
		   cart_list_html += '</ul><div class="cart_total_row">';
		   cart_list_html += '<div style="float:left;">'+locale.message.text["total"]+'</div><div id="cart_total_amount" class="product_price_color" style="float:right;font-size:18px;padding-right:0px;">'+Currency.getStoreCurrencySymbol()+parseFloat(carttotal).toFixed(2)+'</div>';
		   cart_list_html += '</div>';
    	    }
    	    }
    	    catch(err) {
    	         cart_list_html = '<div id="cart_empty"><img src="media/images/default/cart_empty.png"></div>';
	        $("#checkout_btn").css("display","none");
	        carttotal = 0;
    	    }
    	    this.updateShippingMsg(carttotal);
    	    return cart_list_html;
     };
     this.getAddressHtml = function() {
         var address_html = '<ul data-role="listview" id="cart_address" data-icon="none" class="cart_address">';
         var address = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_address"])); 
         console.log(address);
	    for (key in address) {
		  if (address.hasOwnProperty(key)) {
		       address_html += '<li id="address_'+key+'">';
			  if(key == "billing") {
			    address_html += '<h2>'+locale.message.text['billing_address']+'</h2>';
			  }
			  else {
			    address_html += '<h2>'+locale.message.text['shipping_address']+'</h2>';
			  }
			  address_html +="<div class='address_block'>";
			   
			 //address name section
			 address_html += "<div class='user_name'>";
			 if(address[key].prefix) {
			     address_html += address[key].prefix+" ";
			 }
			 if(address[key].firstname) {
			      address_html += address[key].firstname+" ";
			 }
			 if(address[key].lastname) {
			        address_html += address[key].lastname;
			 }
			 address_html += "</div>";
			 if(address[key].email) {
			 	address_html += "<div>"+address[key].email+"</div>";
			 }
			 if(address[key].phone) {
			 	address_html += "<div>"+address[key].phone+"</div>";
			 }
			 address_html += "<div>";
			 if(address[key].street) {
			 	address_html += address[key].street+", ";
			 }
			 if(address[key].city) {
			 	address_html += address[key].city+", ";
			 }
			 address_html += "</div>";
			 address_html += "<div>";
			 if(address[key].region) {
			 	address_html += address[key].region+", ";
			 }
			 if(address[key].country) {
			 	address_html += address[key].country+" ";
			 }
			 if(address[key].postcode) {
			 	address_html += "- "+address[key].postcode;
			 }
			 address_html += "</div>";
			 address_html +="</div>";
			    address_html += '</li>';
			 
		  }
	    }
	    address_html += '</ul>';
         return address_html;
     };
     this.getQuoteAttributesHtml = function(cart, shipping_method_text) {
            var cart_info_html = '';
            if (cart["tax_amount"] == "" || cart["tax_amount"] == null || cart["tax_amount"] <= 0){
			 cart_info_html += '';
		  }
		  else {
			  cart_info_html += '<div id="tax_amount_row" class="tax_amount_row">';
			  cart_info_html += '<div id="tax_amount_label" class="tax_amount_label">'+locale.message.text['tax']+'</div><div id="tax_amount_value" class="tax_amount_value product_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(cart["tax_amount"]).toFixed(2)+'</div>';
			  cart_info_html += '</div>';
			  
		  }
		  if (cart["shipping_amount"] == "" || cart["shipping_amount"] == null || cart["shipping_amount"] <= 0){
			 cart_info_html += '';
		  }
		  else {
			  cart_info_html += '<div id="shipping_amount_row" class="shipping_amount_row">';
			  cart_info_html += '<div id="shipping_amount_label" class="shipping_amount_label">'+locale.message.text["shipping"]/*+' - '+shipping_method_text*/+'</div><div id="shipping_amount_value" class="shipping_amount_value product_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(cart["shipping_amount"]).toFixed(2)+'</div>';
			  cart_info_html += '</div>';
			  
		  }
		   if (cart["coupon"].amount == "" || cart["coupon"].amount == null || cart["coupon"].amount <= 0){
			 cart_info_html += '';
		  }
		  else {
			  cart_info_html += '<div id="discount_amount_row" class="discount_amount_row">';
			  cart_info_html += '<div id="discount_amount_label" class="discount_amount_label">'+locale.message.text["discount"]+'</div><div id="discount_amount_value" class="discount_amount_value product_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(cart["coupon"].amount).toFixed(2)+'</div>';
			  cart_info_html += '</div>';
			  
		  }
		  if (cart["total_amount"] == "" || cart["total_amount"] == null){
			 cart_info_html += '';
		  }
		  else {
			  cart_info_html += '<div id="total_amount_row" class="total_amount_row">';
			  cart_info_html += '<div id="total_amount_label" class="total_amount_label">'+locale.message.text["total_amount"]+'</div><div id="total_amount_value" class="total_amount_value product_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(cart["total_amount"]).toFixed(2)+'</div>';
			  cart_info_html += '</div>';
			  
		  }
		  return cart_info_html;         
     };
     this.proceedToCheckout = function() {
         //When User click to proceed
         redirectTopage('buy_now.html');
     };
}




 
/*
 *Class to handle all Cart Functionality.
 *@public total Total Number of product in Cart
 */
function ShoppingCart()  {
	/*
 	*Function to Get Complete Cart Object From localStorage
 	*@param None
 	*/
  	this.getCartFromStorage = function() {
     	try {  
       		var CurrentCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
        		return CurrentCart;
    		}
    		catch(err) {
        		return '';
    		}
	};
	/*
 	*Function to add product to cart
 	*@param Object product
 	*/
  	this.getConfigurableCartData = function(product, options) {
          var cartdata =  new Object();
     	var status = new Array();
     	 if(parseInt(options.product.stock.is_in_stock) && parseInt(options.product.stock.qty)) {
			cartdata["id"] = options.product.id; 
			cartdata["sku"] = options.product.sku; 
			cartdata["name"] = product.general.name;
			cartdata["type"] = product.type;
			cartdata["price"] = options.product.price.final;
			cartdata["image"] = product.image; 
			cartdata["quantity"] = "1";
			cartdata["stock_quantity"] = options.product.stock.qty;
			cartdata["selfname"] = options.product.general.name; 
			cartdata["selftype"] = options.product.type;
			cartdata["selfimage"] = options.product.type;
			cartdata["options"] = new Object();
			cartdata["options"]["attributes"] = options.attributes;
			cartdata["options"]["parent"] = new Object();
			cartdata["options"]["parent"]["id"] =  product.id;
			cartdata["options"]["parent"]["sku"] = product.sku;
			cartdata["options"]["parent"]["name"] = product.general.name;
			cartdata["options"]["parent"]["type"] =  product.type;
			cartdata["options"]["parent"]["price"] =  product.price.final;
			cartdata["options"]["parent"]["image"] = product.image;
			cartdata["options"]["parent"]["quantity"] = "1";
			status["status"]  = this.addToCartStorage(cartdata);
			return status;
		}
		else {
		    try { 
		    	   navigator.notification.alert(locale.message.text["out_of_stock"], function() {
		            return false;
		        },config.app.name, locale.message.text['close']);
		    }
		    catch(err) {
		         alert(locale.message.text["out_of_stock"]);
		    }
		    return false;
		}
	};
	/*
 	* Function to add product to cart
 	*@param Object product
 	*/
	this.getGroupedCartData = function(product, options) {
	     var cartdata =  new Array();
    		var status = new Array();
    		var productcounter = 0;
    		for (key in product.products.grouped) {
	    		if (product.products.grouped.hasOwnProperty(key)) {
	    		     var current_key = productcounter+"";
	    		     var current_quantity = 0;
	    		     try {
	    		     	current_quantity = options[current_key].quantity;
	    		     }
	    		     catch(err) {
	    		     	current_quantity = 0;
	    		     }
	    		     if(parseInt(current_quantity) > 0) {
				    var current_product_item =  product.products.grouped[key];
				    cartdata[productcounter] = new Object();
				    status[productcounter] = new Object();
				    cartdata[productcounter]["id"] = current_product_item.id;
				    cartdata[productcounter]["sku"] = current_product_item.sku;
				    cartdata[productcounter]["type"] = current_product_item.type;
				    cartdata[productcounter]["name"] = current_product_item.general.name;
				    cartdata[productcounter]["price"] = current_product_item.price.final;
				    cartdata[productcounter]["image"] = current_product_item.image;
				    cartdata[productcounter]["quantity"] = current_quantity;
				    cartdata[productcounter]["stock_quantity"] = parseInt(current_product_item.stock.qty);
				    status[productcounter]["status"]  = this.addToCartStorage(cartdata[productcounter]);
				}
				productcounter++;
	         }
		}
		return status;
	};
	/*
 	* Function to add product to cart
 	*@param Object product
 	*/
 	this.getBundleCartData = function(product, options) {
    
	};
	/*
 	* Function to add product to cart
 	*@param Object product
 	*/
 	this.getVirtualCartData = function(product, options) {
    
	};
	/*
 	* Function to add product to cart
 	*@param Object product
 	*/
 	this.getDownloadableCartData = function(product, options) {
    
	};
	/*
 	* Function to add product to cart
 	*@param Object product
 	*/
	this.getSimpleCartData = function(product, options) {
     	var cartdata =  new Object();
     	var status = new Array();
     	if( (parseInt(product.is_in_stock) && parseInt(product.stock_quantity) ) || (parseInt(product.stock.is_in_stock) && parseInt(product.stock.qty) )) {
     		
		    var custom_options, additional_price;
		    try { 
		    	   additional_price = parseFloat(options.total_additional_price);
		    } catch(ee) {
		        additional_price = 0;
		    }
		    try {
		    	   custom_options =  options.customoptions;
		    } catch(ee) {
		        custom_options = '';
		    }

		    if( typeof product.price == 'object')
		    	var product_total_price =  parseFloat(product.price.final);
		    else if(typeof product.spclprice != 'undefined' && product.spclprice > 0 && product.spclprice < product.price)
		    	var product_total_price =  parseFloat(product.spclprice);
		    else
		    	var product_total_price =  parseFloat(product.price);
		    if(additional_price > 0) {
		        try {
		            product_total_price += parseFloat(additional_price);
		        } catch(ee) {
		            if( typeof product.price == 'object')
				    	var product_total_price =  parseFloat(product.price.final);
				    else if(typeof product.spclprice != 'undefined' && product.spclprice > 0 && product.spclprice < product.price)
		    			var product_total_price =  parseFloat(product.spclprice);
				    else
				    	var product_total_price =  parseFloat(product.price);
		        }
		    }
		    else {
		        if( typeof product.price == 'object')
			    	var product_total_price =  parseFloat(product.price.final);
			    else if(typeof product.spclprice != 'undefined' && product.spclprice > 0 && product.spclprice < product.price)
		    		var product_total_price =  parseFloat(product.spclprice);
			    else
			    	var product_total_price =  parseFloat(product.price);
		    }
		    cartdata["id"] = product.id;
		    cartdata["sku"] = product.sku;
		    if(product.general)
		    	cartdata["name"] = product.general.name;
		    else
		    	cartdata["name"] = product.name;
		    cartdata["type"] = product.type;
		    cartdata["price"] = product_total_price.toFixed(2);
		    if(product.image)
		    	cartdata["image"] = product.image;
		    else
		    {
		    	var image = [];
		    	image[0] = product.imageurl;
		    	cartdata["image"] = image;
		    }
		    cartdata["quantity"] = "1";
		    cartdata["options"]  = custom_options;
		    if(product.stock && product.stock.qty)
		    	cartdata["stock_quantity"] = parseInt(product.stock.qty);
		    else
		    	cartdata["stock_quantity"] = parseInt(product.stock_quantity);
		    status["status"]  = this.addToCartStorage(cartdata);
		    return status;
		}
		else {
			console.log('else');
		    try { 
		    	   navigator.notification.alert(locale.message.text["out_of_stock"], function() {
		            return false;
		        },config.app.name, locale.message.text['close']);
		    }
		    catch(err) {
		         alert(locale.message.text["out_of_stock"]);
		    }
		    return false;
		}
	};  
}
/*
 * Function to add product to cart
 *@param Object product
 */
 ShoppingCart.prototype.add = function(product, options) {
 	var CurrentProduct = {};
 	console.log(product);
 	console.log(options);
     switch(product.type) {
    		case 'configurable':
		    CurrentProduct = this.getConfigurableCartData(product, options);
		break;
		case 'grouped':
			CurrentProduct = this.getGroupedCartData(product, options);
		break;
		case 'bundle':
			CurrentProduct = this.getBundleCartData(product, options);
		break;
		case 'virtual':
			CurrentProduct = this.getVirtualCartData(product, options);
		break;
		case 'downloadable':
			CurrentProduct = this.getDownloadableCartData(product, options);
		break;
		default:
			CurrentProduct = this.getSimpleCartData(product, options);
		break;
    	 }
      return CurrentProduct;
};
/*
 * Function to add product to cart
 *@param Object product
 */
 ShoppingCart.prototype.addToCartStorage = function(product) {
  var status = {};
   var isSame = 0;
   try {  
	  var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
	  var CurrentCart = CompleteCart["products"];
	  for (key in CurrentCart) {
    		if (CurrentCart.hasOwnProperty(key)) {
    		    if(CurrentCart[key].id == product.id) {
    		        status["status"] = "error";
    		        status["message_code"] = "already_added";
    		        CurrentCart[key].quantity = (parseInt(CurrentCart[key].quantity) + 1).toString();
    		        isSame = 1;
    		    }
    		}
    	  }
      if(!isSame) {
         var pos = CurrentCart.length;
	     CurrentCart[pos] = new Array();
	     CurrentCart[pos] = product;
      }
      CompleteCart["products"] = CurrentCart;
	  localStorage[config.app.storage_key+"_cart"] = Base64.encode(JSON.stringify(CompleteCart));
	  this.total = pos + 1;
	}
    catch(err) {
        var pos = 0;
	   var CurrentCart = new Array();
	   var CompleteCart = new Object();
	   CurrentCart[pos] = new Array();
	   CurrentCart[pos] = product;
	   CompleteCart["products"] = new Object();
	   CompleteCart["products"] = CurrentCart;
	   localStorage[config.app.storage_key+"_cart"] = Base64.encode(JSON.stringify(CompleteCart));
	   this.total = pos + 1;
    }
    $("#cartProducts").html(this.getTotalQuantity());
    status["status"] = "success";
    status["message_code"] = "added";
    return status;
};
/*
 *Function to remove product from cart
 *@param id product id
 */
ShoppingCart.prototype.remove = function(id, removeby) {
   var type = typeof removeby == 'undefined' ? removeby : "id";
   try {  
	  var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
	  var CurrentCart = CompleteCart["products"];
	  var updated_cart_products = new Array();
	  var update_counter = 0;
	  for (key in CurrentCart) {
    		if (CurrentCart.hasOwnProperty(key)) {
    		    switch(type) {
    		    	   case 'sku':
			   	   if(CurrentCart[key].sku == sku) {
				       continue; 
			        }
			        else {
				  	 updated_cart_products[update_counter] = new Object();
				 	 updated_cart_products[update_counter] = CurrentCart[key];
				  	 update_counter++;
			   	   }
			   break;
			   default:
			   	   if(CurrentCart[key].id == id) {
				       continue; 
			        }
			        else {
				  	 updated_cart_products[update_counter] = new Object();
				 	 updated_cart_products[update_counter] = CurrentCart[key];
				  	 update_counter++;
			   	   }
			   break;
    		    }
    		}
    	  }
    	  CompleteCart["products"] = updated_cart_products;
	  localStorage[config.app.storage_key+"_cart"] = Base64.encode(JSON.stringify(CompleteCart));
	  this.total = update_counter;
    }
    catch(err) {
    }
};
/*
 *Function to add product to cart
 *@param none
 */
ShoppingCart.prototype.clear = function() {
	localStorage.removeItem(config.app.storage_key+'_cart');
	this.total = 0;
};
/*
 *Function to get product from cart
 *@param id product id
 */
 ShoppingCart.prototype.get = function(id) {
 	try {  
		var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
		var CurrentCart = CompleteCart["products"];
		for (key in CurrentCart) {
    			if (CurrentCart.hasOwnProperty(key)) {
    		    		if(CurrentCart[key].id == id) {
				    return CurrentCart[key]; 
				}
				else {
				     continue;
				}
			}
		}
	}
	catch(err) {
	}
	return;
};
/*
 *Function to get all product from cart
 *@param none
 */
 ShoppingCart.prototype.getAll = function() {
   	 try {  
		var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
		var CurrentCart = CompleteCart["products"];
		return CurrentCart;
	 }
	 catch(err) {
	 }
	 return;
};
/*
 *Function to get all product from cart
 *@param none
 */
 ShoppingCart.prototype.getTotalProducts = function() {
	var len = 0;
	try {  
	  var CurrentCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
	  len = CurrentCart.products.length;
    }
    catch(err) {
    }
    return len;
};
/*
 *Function to get all product from cart
 *@param none
 */
 ShoppingCart.prototype.getTotalQuantity = function() {
	var total_quantity = 0;
	try {  
	   var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
	   var CurrentCart = CompleteCart.products;
	   for (key in CurrentCart) {
		  if (CurrentCart.hasOwnProperty(key)) {
			var curr_quant = CurrentCart[key].quantity;
			total_quantity += parseInt(curr_quant);
		  }
	   }
	}
    catch(err) {
    }
    return total_quantity;
};
ShoppingCart.total = 0; 
 var Cart = new ShoppingCart();

