 /*
mofluid-checkout.js v0.0.1
(c) 2009-2013 by Mofluid. All rights reserved.
Shashi Badhuk
*/
var Order = new function()  {
	/*
 	* Function to add product to cart
 	*@param Object product
 	*/
	this.getOrder = function(orderid, customerid, callback) {
	    var orderinfo_webservice = config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=orderinfo&currency="+Currency.getStoreCurrency()+"&customerid="+customerid+"&orderid="+orderid;
		console.log(orderinfo_webservice);
		$.ajax({
		    url: orderinfo_webservice,
		    type: "get",
		    dataType: "jsonp",
		    beforeSend: function(){
			   console.log("Before Orderinfo Webservice");
		    },
		    error: function(){
			   if (config.app.platform == 'ios' || config.app.platform == 'android') {
				  navigator.notification.alert(locale.message.alert["try_again"], function() {}, config.app.name, locale.message.button["close"]);
			   }
			   else {
				   alert(locale.message.alert["try_again"])
			   }
			   console.log("Error  on Webservice");
		    },
		    complete: function(){
			   console.log("Complete Webservice");
		    },
		    success: callback 
		});
	};
    this.updateOrderStatus = function(orderid, customerid) {
        var orderinfo_webservice = config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=orderupdate&currency="+Currency.getStoreCurrency()+"&customerid="+customerid+"&orderid="+orderid;
        console.log(orderinfo_webservice);
        $.ajax({
               url: orderinfo_webservice,
               type: "get",
               dataType: "jsonp",
               beforeSend: function(){
               console.log("Before Orderinfo Webservice");
               },
               error: function(){
               if (config.app.platform == 'ios' || config.app.platform == 'android') {
               navigator.notification.alert(locale.message.alert["try_again"], function() {}, config.app.name, locale.message.button["close"]);
               }
               else {
               alert(locale.message.alert["try_again"])
               }
               console.log("Error  on Webservice");
               },
               complete: function(){
               console.log("Complete Webservice");
               },
               success: function(){
                 Order.displayInvoice(orderid);
               }
            });
    };

	this.getAllOrder = function(customerid) {
	};
    this.displayUpdatedInvoice = function(orderid) {
        var Session = JSON.parse(localStorage[config.app.storage_key+'_session']);
        var customerid = Session["customer_id"];
        Order.updateOrderStatus(orderid, customerid);
    };
	this.displayInvoice = function(orderid) {
        var Session = JSON.parse(localStorage[config.app.storage_key+'_session']);
        var customerid = Session["customer_id"];
        Cart.clear();
        var order_html = Order.getOrder(orderid, customerid, Order.setInvoice);
	};
    
      this.setInvoice = function(response) {
	     console.error("Invoice");
	     console.log(response);
	     var shipping_address = Order.getAddressHtml(response.address, "shipping");
	     console.log(shipping_address);
	     var subtotalorder = 0;
	     var order_html = '';
		order_html += '<div id="currentorderdetail" class="currentorderdetail">';
		order_html += '<div id="currentorder" class="currentorder">';
		order_html += '<div id="currentorder_head" class="currentorder_head"><h5>'+locale.message.text["order_summary"]+'</h5></div><div id="currentorder_close" class="currentorder_close"><a href="#" data-theme="b" class="ui-btn ui-icon-delete ui-icon-nodisc ui-btn-corner-all ui-btn-icon-notext ui-alt-icon" onClick="hidePopupLayer()"></a></div>';
		order_html += '<ul id="orderinfo" class="orderinfo" data-role="listview">';
		order_html += '<li class="order_id">';
		order_html += '<div id="order_id_head" class="order_id_head order_left_head">'+locale.message.text["order_id"]+'</div><div id="order_id" class="order_id invoice_right_section_val">'+response.order_id+'</div>';
		order_html += '</li>';
		order_html += '<li class="order_status">';
		order_html += '<div id="order_state_head" class="order_state_head order_left_head">'+locale.message.text["status"]+'</div><div id="order_state" class="order_state invoice_right_section_val">'+response.status+'</div>';
		order_html += '</li>';
		order_html += '<li class="order_date">';
		order_html += '<div id="order_date_head" class="order_date_head order_left_head">'+locale.message.text["date"]+'</div><div id="order_date" class="order_date invoice_right_section_val">'+response.order_date+'</div>';
		order_html += '</li>';
		order_html += '<li id="delivery_address" class="delivery_address">';
		order_html += '<div id="order_address_head" class="order_address_head order_left_head">'+locale.message.text["shipping_address"]+'</div><div id="order_address" class="order_address invoice_right_section_val">'+shipping_address+'</div>';
		order_html += '</li>';
		order_html += '<li id="order_payment" class="order_payment">';
		order_html += '<div id="payment_state_head" class="payment_state_head order_left_head">'+locale.message.text["payment_information"]+'</div><div id="payment_state" class="payment_state invoice_right_section_val" code="'+response.payment.code+'">'+response.payment.title+'</div>';
		order_html += '</li>';
		order_html += '<li id="order_shipping" class="order_shipping">';
		order_html += '<div id="shipping_state_head" class="shipping_state_head order_left_head">'+locale.message.text["shipping_method"]+'</div><div id="shipping_state" class="shipping_state invoice_right_section_val" code="'+response.shipping.code+'">'+response.shipping.method+'</div>';
		order_html += '</li>';
		order_html += '</ul>';
		order_html += '</div>';
	     //Product Descriptions
		order_html += '<div id="currentorder_products" class="currentorder_products">';
		order_html += '<h5>'+locale.message.text["products"]+'</h5>';
		order_html += '<ul id="orderproductinfo" class="orderproductinfo" data-role="listview">';
		for (key in response.products) {
		    if (response.products.hasOwnProperty(key)) {
			  order_html += '<li id="order_item_'+response.products[key].id+'" productid="'+response.products[key].id+'" productsku="'+response.products[key].sku+'">';
			  order_html += '<div style="float:left">';
			  order_html += '<img src="'+response.products[key].image+'" onerror="bad_image(this);" width="50px" height="50px">';
			  order_html += '</div>';
			  order_html += '<div style="float:left;margin-left: 3%; width: 50%;" >';
			  order_html += '<h2 style="margin-top: 5px;">'+response.products[key].name+'</h2>';
			  order_html += '<div>'+locale.message.text['qty']+' : '+parseInt(response.products[key].qty)+'</div>';
			  order_html += '</div>';
			  order_html += '<div style="float:right" class="cart_unit_price_invoice">';
			  order_html += '<div class="cart_unit_price_row" style="text-align:right;margin:.45em 0;">'+Currency.getStoreCurrencySymbol()+response.products[key].price+' x '+parseInt(response.products[key].qty)+' = <span class="cart_unit_price product_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(response.products[key].price*response.products[key].qty).toFixed(2)+'</span></div>';
			  order_html += '</li>';
			  subtotalorder += response.products[key].price*response.products[key].qty;
		    }
		}
		order_html += '</ul>';
		order_html += '<div class="invoice_sub_total_outer"><h5>';
		order_html += '<div class="invoice_sub_total_text">'+locale.message.text["total"]+'</div>';
		order_html += '<div class="invoice_sub_total_ammount product_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(subtotalorder).toFixed(2)+'</div>';
		order_html += '</h5></div>';
	     order_html += '<div>';
	     //Amount Descriptions
	     if(response.amount.tax && parseFloat(response.amount.tax) > 0) {
		    order_html += '<div class="taxinfo">';
		    order_html += '<h5><div id="taxinfo_head" class="taxinfo_head order_left_head">'+locale.message.text["tax"]+'</div><div id="tax" class="tax amount_right product_price_color">'+Currency.getStoreCurrencySymbol()+response.amount.tax+'</div></h5>';
		    order_html += '</div>';
		}
		if(response.shipping.amount && parseFloat(response.shipping.amount) > 0) {
		    order_html += '<div class="shippinginfo">';
		    order_html += '<h5><div id="shippinginfo_head" class="shippinginfo_head order_left_head">'+locale.message.text["shipping_charge"]+'</div><div id="shipping" class="shipping amount_right product_price_color">'+Currency.getStoreCurrencySymbol()+response.shipping.amount+'</div></h5>';
		    order_html += '</div>';
		}
		if(response.coupon.amount && parseFloat(response.coupon.amount) > 0) {
		    order_html += '<div class="discountinfo">';
		    order_html += '<h5><div id="discountinfo_head" class="discountinfo_head order_left_head">'+locale.message.text["discount"]+'</div><div id="discount" class="discount amount_right product_price_color">'+Currency.getStoreCurrencySymbol()+response.coupon.amount+'</div></h5>';
		    order_html += '</div>';
		}
		order_html += '<div class="grandtotal_row" id="grandtotal_row">';
		order_html += '<h5><div id="grandtotal_head" class="grandtotal_head order_left_head">'+locale.message.text["grand_total"]+'</div><div id="grandtotal" class="grandtotal amount_right product_price_color">'+Currency.getStoreCurrencySymbol()+response.amount.total+'</div></h5>';
	     order_html += '</div>';
	     order_html += '<div>';
	     $("#popup_top_layer").html(order_html);
	     $("#currentorder").trigger("create");
	     $("#currentorder_products").trigger("create");
	     showPopupLayer();
	};
	this.getAddressHtml = function(address, key) {
	    //address name section
	    var address_html = "<div>";
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
	    return address_html;
	    
	};
}
