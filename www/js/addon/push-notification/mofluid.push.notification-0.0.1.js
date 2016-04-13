/*************************************************
  Push Notification Code Block start
**************************************************/
   /*
    * Function to register the app id for push notification
    * @param
    * @return
    */
    var pageTopPadding;
    function tokenHandler(result) {
       var deviceid = window.device.uuid;
       var BASE_URL  = config.url.api;
       var STORE = config.store.default;
       var APP_NAME = config.app.name;
       var PLATFORM = config.app.platform;
       var pushnotification_register = BASE_URL+"?callback=?"+"&store="+STORE+"&service=register_push&pushtoken="+result+"&platform="+PLATFORM+"&deviceid="+deviceid+"&appname="+APP_NAME+"&description=RegisterforPush";
       console.log(pushnotification_register);
       $.ajax({
           url: pushnotification_register,
		 dataType: 'jsonp',
		 crossDomain: true,
		 beforeSend: function (request) {
		 },
		 error: function (error) {
		     console.error("Unable to Register for Push Notification.");
		 },
		 success: function (data) {
			
		     console.log("Register for Push Notification Successfully.");
		     console.log(data);
		 }
	  });
   }

 /*
  * Function to handle error
  * @param
  * @return
  */
  function errorHandler(error) {
      console.log("Error response" + error);
  }
  
  /*
   * Function call when success
   * @param
   * @return
   */
   function successHandler(res) {
       console.log("Success response" + res);
   }
   
   /*
    * Function call on notification
    * @param event
    *@return
    */
    function onNotificationAPN(event) {
        if (event.alert) {
            showPush(event.alert);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
        if (event.badge) {
            pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        }
    }
   /*
    *Function call to notify
    *@param e
    *@return
    */
    function onNotificationGCM(e) {
      console.log(e);
                   switch (e.event) {
                       case 'registered':
                           if (e.regid.length > 0) {
                               var RegId = e.regid;
                               var deviceid = config.app.name + "_" + Math.round(+new Date() / 1000) + "_" + RegId.substring(2, 18); //window.device.uuid;
                               var BASE_URL = config.url.api;
                               var STORE = config.store.default;
                               var APP_NAME = config.app.name;
                               var PLATFORM = config.app.platform;
                               var PUSH_SERVICE_URL = "" + BASE_URL + "?callback=?" + "&store=" + STORE + "&service=register_push&pushtoken=" + e.regid + "&platform=" + PLATFORM + "&deviceid=" + deviceid + "&appname=" + APP_NAME + "&description=RegisterforPush";
                            
                    					console.log(PUSH_SERVICE_URL);
                    					$.ajax({
                    					    url: PUSH_SERVICE_URL,
                    					    dataType: 'jsonp',
                    					    crossDomain: true,
                    					    beforeSend: function (request) {
                    					    },
                    					    error: function (error) {
                    						   console.error("Unable to Register for Push Notification.");
                    					    },
                    					    success: function (data) {
                    						   console.log("Register for Push Notification Successfully.");
                    						   console.log(data);

                    					    }
                    					});
                    				}
                       break;
                       case 'message':
                       // this is the actual push notification. its format depends on the data model from the push server
                        if(e.payload.display != 0 && e.payload.display != false) {
                          if (config.app.platform != 'web') {
                            showPush(e.message);
                          }
                          else {
                            alert(e.message);
                          }  
                        }
                        
                       break;
                       case 'error':
                           console.log('GCM error = ' + e.msg);
                       break;
                       default:
                           console.log('An unknown GCM event has occurred');
                       break;
                   }
               }
               function showPush(message) { 
                   if(typeof pageTopPadding == 'undefined')
                      pageTopPadding = Number($('#mainpage').css('padding-top').replace("px", ""));
                   $("#push-msg").html(message);
                   $("#push-header").trigger("create");
                   $("#push-header").slideDown('slow',function(){ updateTopPadding(true) });
               }
               function hidePush(){ 
                   $("#push-header").slideUp('slow',function(){ updateTopPadding(false) }); 
                }
                function updateTopPadding(add) {
                  var height = $('#push-header').height() + Number($('#push-header').css('padding-top').replace("px", "")) + Number($('#push-header').css('padding-bottom').replace("px", "")) + 2 * Number($('#push-header').css('border-width').replace("px", ""));
                  if(add)
                    var topPadding = pageTopPadding + height;
                  else
                    var topPadding = pageTopPadding;  
                  $('#mainpage').css('padding-top',topPadding);
                }
               /*************************************************
               Push Notification Code Block ends
               **************************************************/
