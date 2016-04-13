/*
mofluid.payment-0.0.1.js 
(c) 2009-2013 by Mofluid. All rights reserved.
Shashi Badhuk
*/

/*
 Class: MofluidPaypal
 Supports implementation of Paypal SDK & its payment
*/
var MofluidPaypal = {
    data : {},
    initialize: function(paymentdata) {
        this.data = paymentdata;
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        MofluidPaypal.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
       MofluidPaypal.initPaymentUI();
    },
    initPaymentUI : function () {
        //this.data.config.api_key,
        var clientIDs = {
            "PayPalEnvironmentProduction": this.data.config.api_key,
            "PayPalEnvironmentSandbox": this.data.config.api_key,
        };
        PayPalMobile.init(clientIDs, MofluidPaypal.onPayPalMobileInit);
    },
    onSuccesfulPayment : function(payment) {
	   if(payment.response.state == "approved"){
           try {
               Order.displayUpdatedInvoice(MofluidPaypal.data.order.invoice);
           }
           catch(err) {
               console.log("Unable to get Order Id to display invoice "+err.message);
           }
	   }
       else {
           navigator.notification.alert(locale.message.text["payment_method"]+" "+locale.message.text["status"]+" "+payment.response.state, function() {
            setTimeout(function(){
                       redirectTopage('index.html');
                       }, 500);
           }, config.app.name, locale.message.button["close"]);
       }
    },
    onAuthorizationCallback : function(authorization) {
	   console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    createPayment : function () {
       //Setting Address
       var fullname = this.data.address.shipping.firstname+" "+this.data.address.shipping.lastname;
       var shippingaddress = new PayPalShippingAddress(fullname, this.data.address.shipping.street.substring(0, 90), '', this.data.address.shipping.city, this.data.address.shipping.region, this.data.address.shipping.postcode, this.data.address.shipping.country);
       //Setting Product
       /*var product_items = new Array();
       var item_counter = 0;
       var products = this.data.products;
       for (key in products) {
           if (products.hasOwnProperty(key)) {
               product_items[item_counter] = new PayPalItem(products[key].name, products[key].quantity, products[key].price, this.data.order.currency, products[key].sku);
               item_counter++;
           }
       }
        */
       //Setting Payment Detail
       var paymentDetails = new PayPalPaymentDetails(this.data.amount.subtotal, this.data.amount.shipping, this.data.amount.tax);
       var payment = new PayPalPayment(this.data.amount.total, this.data.order.currency, this.data.order.description, "Sale", paymentDetails);
       payment.invoiceNumber(MofluidPaypal.data.order.invoice);
       payment.custom(MofluidPaypal.data.order.custom);
       payment.softDescriptor(MofluidPaypal.data.order.description);
       payment.shippingAddress(shippingaddress);
      // payment.items(product_items);
       return payment;
    
    },
    configuration : function () {
      // for more options see `paypal-mobile-js-helper.js`
      var config = new PayPalConfiguration({
         merchantName: MofluidPaypal.data.app.name,
         merchantPrivacyPolicyURL: MofluidPaypal.data.app.privacylink,
         merchantUserAgreementURL: MofluidPaypal.data.app.userlink,
         acceptCreditCards: true
      });
      return config;
   },
   onPrepareRender : function() {
       PayPalMobile.renderSinglePaymentUI(MofluidPaypal.createPayment(), MofluidPaypal.onSuccesfulPayment, MofluidPaypal.onUserCanceled);
   },
   onPayPalMobileInit : function() {
     // must be called
     // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
     console.log("onPaypalMobile init");
     if(MofluidPaypal.data.config.mode == "1" || MofluidPaypal.data.config.mode == 1) {
         PayPalMobile.prepareToRender("PayPalEnvironmentProduction", MofluidPaypal.configuration(), MofluidPaypal.onPrepareRender);
     }
     else {
     	PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", MofluidPaypal.configuration(), MofluidPaypal.onPrepareRender);
   	 }
   },
   onUserCanceled : function(result) {
     navigator.notification.alert(result, function() {
            setTimeout(function(){
                redirectTopage('index.html');
            }, 500);
         },
         config.app.name,
         locale.message.button["close"]
     );
   }
};
