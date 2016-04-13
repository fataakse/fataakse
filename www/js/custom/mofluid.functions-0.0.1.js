/*
mofluid-functions.js v0.0.1
(c) 2009-2013 by Mofluid. All rights reserved.
Shashi Badhuk
*/

/*
 *Function to check login status
 *@param
 *@return
 */
var database=config.app.storage_key;

var cache_expire_time=localStorage['c_time'];
var cache_expire_status=localStorage['c_status'];
var cache_time = parseInt(parseInt(cache_expire_time) * 60 *1000);
if(cache_expire_status==0 || cache_expire_status==null)
{
  var cache_time = parseInt(parseInt(config.sqlite_data.cache_time) * 60 *1000);
}

function checkLoginStatus_preview() {
        $("#cartProducts").html(Cart.getTotalQuantity());
        var login_status = "Deactive";
        if (localStorage[config.app.storage_key+'_session'] == null) {
            login_status = "Deactive";
        } else {
            var Session = JSON.parse(localStorage[config.app.storage_key+'_session']);
            if (Session != null) {
                login_status = Session["login_status"];
            }
        }
        if (login_status == "Active") {
            var list_item = "<li id='mofluid_home'><a href='javascript:void(0);'  id='mofluid_home_a'></a></li><li id='mofluid_myaccount'><a href='javascript:void(0);'  id='mofluid_myaccount_a'></a></li><li id='mofluid_editprofile'><a href='javascript:void(0);'  id='mofluid_editprofile_a'></a></li><li id='mofluid_myorders'><a href='javascript:void(0);'  id='mofluid_myorders_a'></a></li><li id='mofluid_signout'><a href='javascript:void(0);'  id='mofluid_signout_a'></a></li>";
            $("#left_navigation").html(list_item);
            $("#left_navigation").listview();
            $("#left_navigation").listview("refresh");
        } else {
            var list_item = "<li id='mofluid_home'><a href='javascript:void(0);'  id='mofluid_home_a'></a></li><li id='mofluid_signin'><a href='javascript:void(0);' onclick=redirectTopage('index_preview.html'); id='mofluid_signin_a'></a></li>      ";
            $("#left_navigation").html(list_item);
            $("#left_navigation").listview();
            $("#left_navigation").listview("refresh");
        }

    }

function checkLoginStatus() {
        $("#cartProducts").html(Cart.getTotalQuantity());
        var login_status = "Deactive";
        if (localStorage[config.app.storage_key+'_session'] == null) {
            login_status = "Deactive";
        } else {
            var Session = JSON.parse(localStorage[config.app.storage_key+'_session']);
            if (Session != null) {
                login_status = Session["login_status"];
            }
        }
        if (login_status == "Active") {
            $('#user_login_icon').hide(); // hide user login icon 
            var list_item = "<li id='mofluid_home'><a href='javascript:void(0);' onclick=redirectTopage('index.html'); id='mofluid_home_a'></a></li><li id='mofluid_myaccount'><a href='javascript:void(0);' onclick=redirectTopage('profile.html'); id='mofluid_myaccount_a'></a></li><li id='mofluid_editprofile'><a href='javascript:void(0);' onclick=redirectTopage('editprofile.html'); id='mofluid_editprofile_a'></a></li><li id='mofluid_myorders'><a href='javascript:void(0);' onclick=redirectTopage('myorder.html'); id='mofluid_myorders_a'></a></li><li id='mofluid_signout'><a href='javascript:void(0);' onclick='logOut();' id='mofluid_signout_a'></a></li>";
            $("#left_navigation").html(list_item);
            $("#left_navigation").listview();
            $("#left_navigation").listview("refresh");
        } else {
            var list_item = "<li id='mofluid_home'><a href='javascript:void(0);' onclick=redirectTopage('index.html'); id='mofluid_home_a'></a></li><li id='mofluid_signin'><a href='javascript:void(0);' onclick=redirectTopage('login.html'); id='mofluid_signin_a'></a></li>      ";
            $("#left_navigation").html(list_item);
            $("#left_navigation").listview();
            $("#left_navigation").listview("refresh");
        }

    }
    /*
     *Function to get date format
     *@param date
     *return
     */


function getFormatDate(date) {
    var error = 0;
    var now = date;
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        var month = '0' + month;
    }
    if (day.toString().length == 1) {
        var day = '0' + day;
    }
    var valid_date = new Date();
    var valid_day = valid_date.getDate();
    var valid_month = valid_date.getMonth() + 1;
    var valid_year = valid_date.getFullYear();
    if (year == valid_year && month == valid_month && day == valid_day) {
        var dateTime = year + '-' + month + '-' + day;
        return dateTime;
    } else if (date < valid_date) {
        if (config.app.platform == 'ios' || config.app.platform == 'android') {
            navigator.notification.alert("Invalid Date.", function() {}, config.app.name, locale.message.button["close"]);
        } else {
            alert("Invalid Date.");
        }
        day = valid_day;
        month = valid_month;
        year = valid_year;
        error++;
    } else {
        if (year >= valid_year + 1) {
            if (config.app.platform == 'ios' || config.app.platform == 'android') {
                navigator.notification.alert("Invalid Date.", function() {}, config.app.name, locale.message.button["close"]);
            } else {
                alert("Invalid Date.");
            }
            day = valid_day;
            month = valid_month;
            year = valid_year;
            error++;
        }
    }
    if (error == 0) {
        var dateTime = year + '-' + month + '-' + day;
    } else {
        var dateTime = '';
    }
    return dateTime;
}

/*
 *Function to get time format
 *@param time
 *return
 */

function getFormatTime(date) {
        var now = date;
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (hour.toString().length == 1) {
            var hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            var second = '0' + second;
        }
        var dateTime = hour + ':' + minute + ':' + second;
        return dateTime;
    }

/*
 *Function call to logout
 *@param
 *@return
 */
function logOut() {
    
    localStorage.clear();
 
    
    if (config.app.platform == 'ios' || config.app.platform == 'android') {
        
        navigator.notification.alert(locale.message.alert["sign_out_message"], function() {}, config.app.name, locale.message.button["close"]);
        
        redirectTopage('index.html');
        
       
    } else {
    

        alert(locale.message.alert["sign_out_message"]);
    }
    
    redirectTopage('index.html');
}



// Global InAppBrowser reference
var iabRef = null;

/*
 *Function to check load start
 *@param event
 *@return
 */
function iabLoadStart(event) {

}

/*
 *Function to check load stop
 *@param event
 *@return
 */
function iabLoadStop(event) {

}

/*
 *Function to check load close
 *@param event
 *@return
 */
function iabClose(event) {
    var Session = JSON.parse(localStorage[config.app.storage_key+"_session"]);
    var Store = JSON.parse(localStorage[config.app.storage_key+"_store"]);
    var Order = JSON.parse(localStorage[config.app.storage_key+"_order"]);
    localStorage.clear();
    localStorage[config.app.storage_key+"_session"] = JSON.stringyfy(Session);
    localStorage[config.app.storage_key+"_order"] = JSON.stringyfy(Order);
    localStorage[config.app.storage_key+"_store"] = JSON.stringyfy(Store);
    visitHomePage();
    iabRef.removeEventListener('loadstart', iabLoadStart);
    iabRef.removeEventListener('loadstop', iabLoadStop);
    iabRef.removeEventListener('exit', iabClose);
}

/*
 *Function to verify session
 *@param
 *@return
 */
function verify_session() {
    console.log("Session Checking Starts..");
    if (localStorage[config.app.storage_key+'_session'] == null) {
        var dirPath = dirname(location.href);
        var fullPath = dirPath + "/login.html";
        window.location = fullPath;
    } else {
        var Session = JSON.parse(localStorage[config.app.storage_key+'_session']);
        if (Session != null) {
            var login_status = Session["login_status"];
            if (login_status != "Active") {
                localStorage[config.app.storage_key+'_session'] = null;
                var dirPath = dirname(location.href);
                var fullPath = dirPath + "/login.html";
                window.location = fullPath;
            }
        } else {
            var dirPath = dirname(location.href);
            var fullPath = dirPath + "/login.html";
            window.location = fullPath;
        }
    }
    console.log("Session Checking Done..");
}
function setApplicationFooter(store) {
    var footer_content = config.theme.footer;
    if (footer_content == "") {
        footer_content = '\
               <div class="customer-care"><span id="support"></span><br>\
                <a href="javascript:void(0)"  id="storemail" class="storemail">'+store.email+'</a>\
            </div>\
            <div style="text-align:center;margin-bottom:3px;">\
                    <span id="storeadminname">&copy; '+new Date().getFullYear()+' '+store.name+'</span>\
            </div>';
        $("#footer_content").html(footer_content);
        $("#footer_content").trigger("create");
        
    }
     else {
         $("#footer_content").html(footer_content);
     }
      document.title = store.name;
      $("#storelabel").html(store.frontname);
}

function setApplicationLogoBanner(response) {
    try {
    var theme = response.theme;
    var store_response = response.store;
    var banner_data = theme.banner;
    var logo_data = theme.logo;
    var banner_image_slider = '';
    try { var image_len =banner_data.image.length; } catch(err) {var image_len = 0;}
    var i = 0;
    console.log("Images : "+image_len);
    try {
    if(image_len <= 0 || image_len == null || image_len == "") {
       banner_image_slider += '<div class="item"><img src="' + config.theme.banner +'" alt=""  onerror="this.src=\'media/images/default/banner.png\'"></div>';
    }
    else {
        for(i=0; i<image_len; i++) {
             banner_image_slider += '<div class="item"><img onclick="bannerAction(\''+banner_data.image[i].mofluid_image_action+'\')" src="'+banner_data.image[i].mofluid_image_value+'" alt=""  onerror="this.src=\''+ config.theme.banner+'\'" ></div>';
        }
    }
    } catch(err) {
    banner_image_slider += '<div class="item"><img src="' + config.theme.banner +'" alt=""  onerror="this.src=\'media/images/default/banner.png\'"></div>';
    }
    $("#banner_slider").html(banner_image_slider);
    var storeLogo = "<a href='javascript:void(0);' onclick=redirectTopage('index.html')><img src="+logo_data.image[0].mofluid_image_value+" onerror ='this.src=\'media/images/default/logo.png'\' alt='" + config.theme.logo + "' class='logo_icon'/></a>";
    $(".navigation_logo").html(storeLogo);
    var store_data = {};
    store_data["logo"] = storeLogo;
    store_data["banner"] = banner_image_slider;
    store_data["store"] = store_response;
    localStorage[config.app.storage_key+"_store"] = JSON.stringify(store_data); 
    var owl = $("#banner_slider");
    owl.owlCarousel({
           items : 1, //10 items above 1000px browser width
           itemsDesktop : [1000,1], //5 items between 1000px and 901px
           itemsDesktopSmall : [900,1], // betweem 900px and 601px
           itemsTablet: [600,1], //2 items between 600 and 0
           itemsMobile : false,  // itemsMobile disabled - inherit from itemsTablet option
           navigation : false,
           pagination: true
    });
    } catch(err) {
       console.error(err.message);
    }
}
//using at only home page for new design
function setApplicationHomeLogoBanner(response) {
    try {
    var theme = response.theme;
    var store_response = response.store;
    var banner_data = theme.banner;
    var logo_data = theme.logo;
    var banner_image_slider = '';
    try { var image_len =banner_data.image.length; } catch(err) {var image_len = 0;}
    var i = 0;
    console.log("Images : "+image_len);

    try {
    if(image_len <= 0 || image_len == null || image_len == "") {
       banner_image_slider += '<div class="item active"><img class="img-responsive" alt="img" src="' + config.theme.banner +'" onerror="this.src=\'media/images/default/banner.png\'"></div>';
    }
    else {
        for(i=0; i<image_len; i++) {
            var tempClass = i==0 ? ' active':'';
             banner_image_slider += '<div class="item'+tempClass+'"><img  class="img-responsive" alt="img" onclick="bannerAction(\''+banner_data.image[i].mofluid_image_action+'\')" src="'+banner_data.image[i].mofluid_image_value+'" onerror="this.src=\''+ config.theme.banner+'\'" ></div>';
        }
    }
    } catch(err) {
    banner_image_slider += '<div class="item active"><img class="img-responsive" alt="img" src="' + config.theme.banner +'"  onerror="this.src=\'media/images/default/banner.png\'"></div>';
    }
    $("#banner_home_slider").html(banner_image_slider);
    var storeLogo = "<a href='javascript:void(0);' onclick=redirectTopage('index.html')><img src="+logo_data.image[0].mofluid_image_value+" onerror ='this.src=\'media/images/default/logo.png'\' alt='" + config.theme.logo + "' class='logo_icon'/></a>";
    $(".navigation_logo").html(storeLogo);
    var store_data = {};
    store_data["logo"] = storeLogo;
    store_data["banner"] = banner_image_slider;
    store_data["store"] = store_response;
    localStorage[config.app.storage_key+"_store"] = JSON.stringify(store_data); 
    
    } catch(err) {
       console.error(err.message);
    }
}
function setSecondaryBanner(response){
    if(typeof response['secondary_banner'] == 'undefined')
        return false;

    var complete_path = location.href;
    var dirPath = dirname(complete_path);
    
    for(i in response.secondary_banner) {
        var bClass = response.secondary_banner[i]["type"];
        var categoryId = response.secondary_banner[i]["id"];
        var fullPath = dirPath + "/subcategory.html?parent=" + categoryId + "&All=1";
        
        if($('.'+bClass).length == 1){
            $('.'+bClass).attr('data-url', fullPath);
            $('.'+bClass).show();
        }
    }
}
function setApplicationLogoBanner_preview(response) {
    try {
    var theme = response.theme;
    var store_response = response.store;
    var banner_data = theme.banner;
    var logo_data = theme.logo;
    var banner_image_slider = '';
    try { var image_len =banner_data.image.length; } catch(err) {var image_len = 0;}
    var i = 0;
    console.log("Images : "+image_len);
    try {
    if(image_len <= 0 || image_len == null || image_len == "") {
       banner_image_slider += '<div class="item"><img src="' + config.theme.banner +'" alt=""  onerror="this.src=\'media/images/default/banner.png\'"></div>';
    }
    else {
        for(i=0; i<image_len; i++) {
             banner_image_slider += '<div class="item"><img  src="'+banner_data.image[i].mofluid_image_value+'" alt=""  onerror="this.src=\''+ config.theme.banner+'\'" ></div>';
        }
    }
    } catch(err) {
    banner_image_slider += '<div class="item"><img src="' + config.theme.banner +'" alt=""  onerror="this.src=\'media/images/default/banner.png\'"></div>';
    }
    $("#banner_slider").html(banner_image_slider);
    var storeLogo = "<a href='javascript:void(0);' ><img src="+logo_data.image[0].mofluid_image_value+" onerror ='this.src=\'media/images/default/logo.png'\' alt='" + config.theme.logo + "' class='logo_icon'/></a>";
    $(".navigation_logo").html(storeLogo);
    var store_data = {};
    store_data["logo"] = storeLogo;
    store_data["banner"] = banner_image_slider;
    store_data["store"] = store_response;
    localStorage[config.app.storage_key+"_store"] = JSON.stringify(store_data); 
    var owl = $("#banner_slider");
    owl.owlCarousel({
           items : 1, //10 items above 1000px browser width
           itemsDesktop : [1000,1], //5 items between 1000px and 901px
           itemsDesktopSmall : [900,1], // betweem 900px and 601px
           itemsTablet: [600,1], //2 items between 600 and 0
           itemsMobile : false,  // itemsMobile disabled - inherit from itemsTablet option
           navigation : false,
           pagination: true
    });
    } catch(err) {
       console.error(err.message);
    }
}
function bannerAction(action) {
    if(action == null || action == "") {
             
    }
    else {
         try {
            var banner_action =  JSON.parse(Base64.decode(action));
              if(banner_action.action == "open") {
                if(banner_action.base == "category") {
                        var dirPath = dirname(location.href);
                         var fullPath = dirPath + "/subcategory.html?parent=" + banner_action.id;
                         window.location = fullPath;
                   }
                   else if(banner_action.base == "product") {
                        var dirPath = dirname(location.href);
                         var fullPath = dirPath + "/product.html?id=" + banner_action.id+"stock_status"+banner_action.status;
                         window.location = fullPath;
                   } 
              }
          } 
          catch(ex) { 
            console.error(ex.message);
          }
    }
}
/*
 *Function to fetch store details
 *@param
 *@return
 */
function fetchStoredetail_preview() {
    var store_webservice = config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=storedetails&currency="+ Currency.getStoreCurrency()+"&theme="+config.theme.code;
    console.log(store_webservice);
    $.ajax({
        url: store_webservice,
        type: "get",
        dataType: "jsonp",
        beforeSend: function(){
            console.log("Before Store Webservice");
        },
        error: function(){
           console.log("error");
           try {if (config.app.platform == 'ios' || config.app.platform == 'android') {
                   navigator.notification.alert(locale.message.alert["try_again"], function() {}, config.app.name, locale.message.button["close"]);
              }
              else {
                    alert(locale.message.alert["try_again"])
              }
           }catch(ee) {
           console.log(ee.message);
           }
            console.log("Error  on Webservice");
        },
        complete: function(){
            console.log("Complete Webservice");
        },
        success: function( response ){
           console.log("success");
            console.log(response); 
             setApplicationFooter(response.store);
            setApplicationLogoBanner_preview(response);
            printRootCategory_preview(response.categories);
            console.log("Success Webservice");
        }
    });
}

function updateStoreDetail(response) {
    setGoogleAnalytics(response.analytics);
    setApplicationFooter(response.store);
    if(isHomePage)
        setApplicationHomeLogoBanner(response);
    else
        setApplicationLogoBanner(response);
    printRootCategory(response.categories);
    setSecondaryBanner(response);
    $('#free_shipping_amt').html(response.free_shipping_amt);
    if(response.discount_amt)
        $('#discount_amt').html(response.discount_amt+'%');
}
//
function setGoogleAnalytics(analytics) {
    console.log("rohit analtics :"+analytics);
    try{
        if(analytics.status) {
             var timeSpent = Math.floor((Math.random() * 300000) + 60000);
            window.analytics.startTrackerWithId(analytics.accountid);
            window.analytics.trackView(config.app.name);
            window.analytics.trackEvent(config.app.name, 'DeviceReady', 'Hits', 1);
            window.analytics.trackTiming(config.app.name, timeSpent, 'AppUser', 'Duration'); 
            window.analytics.debugMode();     
        } else {}
    } catch (e) {
        console.error(e);
    }
}

/*
 *Function to fetch store details
 *@param
 *@return
 */
function fetchStoredetail() {
   
    var db = dbConnection();
    var current_time = new Date().getTime();
    var key = 'storedetails';
    db.transaction(function(tx) {
              // tx.executeSql('DROP TABLE IF EXISTS mofluid_cache');
                   tx.executeSql('CREATE TABLE IF NOT EXISTS mofluid_cache (key text, data text, timestamp text)');
                   
                   tx.executeSql("select * from mofluid_cache where key='storedetails';", [], function(tx, resdata) {
                                 
                                 if (resdata.rows.length > 0) {
                               
                                             var diff=current_time - resdata.rows.item(0).timestamp;
                                 
                                             if (diff > cache_time) {//if the cache time expire then this code wiil execute
                                 
                                                //delete the old row of storedetails data if cache time expire
                                               tx.executeSql("DELETE FROM mofluid_cache WHERE key=?", ["storedetails"],
                                               function(tx, result) {
                                               });// end deletion
                                 
                                 var store_webservice = config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=storedetails&currency="+ Currency.getStoreCurrency()+"&theme="+config.theme.code;
                                 //alert(store_webservice);
                                 //Start ajax call
                                 $.ajax({
                                        url: store_webservice,
                                        type: "get",
                                        dataType: "jsonp",
                                        async: false,
                                        beforeSend: function(){
                                        console.log("Before Store Webservice");
                                        },
                                        error: function(){
                                        console.log("error");
                                        try {if (config.app.platform == 'ios' || config.app.platform == 'android') {
                                        navigator.notification.alert(locale.message.alert["try_again"], function() {}, config.app.name, locale.message.button["close"]);
                                        }
                                        else {
                                        alert(locale.message.alert["try_again"])
                                        }
                                        }catch(ee) {
                                        console.log(ee.message);
                                        }
                                        console.log("Error  on Webservice");
                                        },
                                        complete: function(){
                                        console.log("Complete Webservice");
                                        },
                                        success: function( response ){
                                        console.log(response);
                                        
                                        db.transaction(function(tx) {
                                                       tx.executeSql("INSERT INTO mofluid_cache (key,data,timestamp) VALUES (?,?,?)", ["" + key + "", "" + JSON.stringify(response) + "", "" + current_time + ""], function(tx, res) {}, function(e) {
                                                                     console.log("ERROR in insert product: " + e);
                                                                     });
                                                       
                                                       });
                                        localStorage.setItem('c_time', response.store.cache_setting.cache_time);
                                        localStorage.setItem('c_status', response.store.cache_setting.status);
                                        localStorage.setItem('free_shipping_amt', response.free_shipping_amt);
                                        
                                        
                                        console.log(response);
                                        updateStoreDetail(response);
                                        }
                                        });
                                 
                                             }//End of ( if the cache time expire then this code wiil execute) comment
                                             else//if cache time is not expire then this code will execute
                                             {
                               
                                                    var response = JSON.parse(resdata.rows.item(0).data);
                                                    updateStoreDetail(response);
                                             }
                                 
                                 }
                                 else// if table is empty
                                 {
                                
                                 var store_webservice = config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=storedetails&currency="+ Currency.getStoreCurrency()+"&theme="+config.theme.code;
                                // alert(store_webservice);
                                 //Start ajax call
                                 $.ajax({
                                        url: store_webservice,
                                        type: "get",
                                        dataType: "jsonp",
                                        async: false,
                                        beforeSend: function(){
                                        console.log("Before Store Webservice");
                                        },
                                        error: function(){
                                        console.log("error");
                                        try {if (config.app.platform == 'ios' || config.app.platform == 'android') {
                                        navigator.notification.alert(locale.message.alert["try_again"], function() {}, config.app.name, locale.message.button["close"]);
                                        }
                                        else {
                                        alert(locale.message.alert["try_again"])
                                        }
                                        }catch(ee) {
                                        console.log(ee.message);
                                        }
                                        console.log("Error  on Webservice");
                                        },
                                        complete: function(){
                                        console.log("Complete Webservice");
                                        },
                                        success: function( response ){
                                        
                                        
                                        db.transaction(function(tx) {
                                                       tx.executeSql("INSERT INTO mofluid_cache (key,data,timestamp) VALUES (?,?,?)", ["" + key + "", "" + JSON.stringify(response) + "", "" + current_time + ""], function(tx, res) {}, function(e) {
                                                                     console.log("ERROR in insert product: " + e);
                                                                     });
                                                       
                                                       });
                                        localStorage.setItem('c_time', response.store.cache_setting.cache_time);
                                        localStorage.setItem('c_status', response.store.cache_setting.status);
                                        localStorage.setItem('free_shipping_amt', response.free_shipping_amt);
                                        
                                        console.log(response);
                                        updateStoreDetail(response);
                                        }
                                        }); //End ajax call
                                 }//End (if table is empty) comment
                                 });
                   });
    
    
    
    
}


/*
 *Function to create country dropdown
 *@param country array
 *@return
 */

function print_country(country_arrr) {
    var defcountryarr1 = country_arrr.mofluid_countries;
    var defcountry = country_arrr.mofluid_default_country.country_id;
    var option_str = document.getElementById("Scountry");
    var i = 1,
        indexj = 0;
    option_str.options[0] = new Option("Select", "Select");

    $.each(defcountryarr1, function() {
        option_str.options[i++] = new Option(defcountryarr1[indexj].country_name, defcountryarr1[indexj].country_id);
        console.log(defcountryarr1[indexj].country_name);
        indexj++;
    });



    $("#Scountry").val(defcountry);
    $("#Scountry").trigger("create");
}

/*
 *Function call to preview image
 *@param
 *@return
 */
function display_img_preview(image){
    localStorage[config.app.storage_key+"_preview_image"] = image.src;
    var PRODUCT_ID = queryValue();
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/product_img_view.html?id="+PRODUCT_ID;
    window.location=fullPath;
}
function print_countryy(country_arr) {
    var defcountryarr = country_arr.mofluid_countries;
    var defcountry = country_arr.mofluid_default_country.country_id;
    var option_str1 = document.getElementById("country");
    var jj = 1,
        indexjj = 0;
    option_str1.options[0] = new Option("Select", "Select");
    $.each(defcountryarr, function() {
        option_str1.options[jj++] = new Option(defcountryarr[indexjj].country_name, defcountryarr[indexjj].country_id);
        indexjj++;
    });


    $("#country").val(defcountry);
    $("#country").trigger("create");
}




/*
 *Function to check name is valid or not
 *@param name
 *@return true or false
 */
function isValidName(name) {
    var alphaExp = /^[a-zA-Z]+$/;
    if (name.match(alphaExp))
        return true;
    else
        return false;
}

/*
 *Function to check email is valid or not
 *@param email
 *@return true or false
 */
function checkEmail(email) {
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!filter.test(email)) {
        return false;
    }
    return true;
}

/*
 *Function to check number is valid or not
 *@param text
 *@return true or false
 */
function IsNumeric(sText) {
    var ValidChars = "0123456789.";
    var IsNumber = true;
    var Char;
    for (i = 0; i < sText.length && IsNumber == true; i++) {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
        }
    }
    return IsNumber;
}





/*
 *Function to fetch the querystring
 *@param
 *@return decodeURIComponent
 */
function queryValue() {
    var qrStr = window.location.search;
    if (qrStr)
        var qrvalue = (qrStr.split("?")[1].split("=")[1]);
    return decodeURIComponent(qrvalue);
}


/*
 *Function to update order status
 *@param this
 *@return
 */
function orderComplete(ths) {
    if (config.app.platform == 'ios' || config.app.platform == 'android') {
        navigator.notification.alert(locale.message.alert["order_success_message"], function() {}, config.app.name, locale.message.button["close"]);
    } else {
        alert(locale.message.alert["order_success_message"])
    }
}

/*
 *Function to get current date
 *@param days
 *@return someFormattedDate
 */
function getCurDate(days) {
    var someDate = new Date();
    var numberOfDaysToAdd = days;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var someFormattedDate = y + '-' + mm + '-' + dd;
    return someFormattedDate;
}



/*
 *Function to call shipping method page
 *@param amount, ship_state, ship_country
 *@return
 */
function previewForm(amount, ship_state, ship_country) {
    var address = new Object();
    var billing = new Object();
    var shipping = new Object();
    var previeworder = new Object();
    //Retrive Save action Flag
    var saveaction = $("#saveaction").is(':checked') ? 1 : 0;
    //Retrive Billing Address
    billing["prefix"] = "";
    billing["firstname"] = $("#name").val();
    billing["lastname"] = $("#blname").val();
    billing["company"] = "";
    billing["street"] = $("#address").val();
    billing["city"] = $("#city").val();
    billing["region"] = $("#state").val();
    billing["country"] = $("#country").val();
    billing["postcode"] = $("#pincode").val();
    billing["phone"] = $("#phone").val();
    billing["email"] = $("#email").val();
    //Retrive Shipping Address
    shipping["prefix"] = "";
    shipping["firstname"] = $("#recName").val();
    shipping["lastname"] = $("#recLName").val();
    shipping["company"] = "";
    shipping["street"] = $("#Saddress").val();
    shipping["city"] = $("#Scity").val();
    shipping["region"] = $("#Sstate").val();
    shipping["country"] = $("#Scountry").val();
    shipping["postcode"] = $("#Spincode").val();
    shipping["phone"] = $("#recMobile").val();
    address["billing"] = billing;
    address["shipping"] = shipping;
    localStorage[config.app.storage_key+"_address"] = Base64.encode(JSON.stringify(address));
    console.log(address);
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/checkout.html";
    window.location = fullPath;
}

/*
 *Function call to save address and make payment
 *@param amount, previewdata, shiping_type, couponvalue, shippmethod
 *@return
 */

function saveForm(previewdata) {
    var place_order_url, paymethod;
    var validate_currency_url = config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=validate_currency&currency=" +  Currency.getStoreCurrency() + "&paymentgateway=" + previewdata['paymethod'];
    $.getJSON(validate_currency_url,
        function(validate_currency) {
            if (validate_currency['status'] == '0') {
                if (config.app.platform == 'ios' || config.app.platform == 'android') {
                    navigator.notification.alert(validate_currency['msg'],
                        function() {
                            redirectTopage('paymentmethod.html');
                        },
                        config.app.name,
                        'close'
                    );
                    return false;
                } else {
                    alert(validate_currency['msg']);
                    redirectTopage('paymentmethod.html');
                    return;
                }
            }
            var paymethod, transid = 0;
            var address = JSON.parse(Base64.decode(previewdata['address']));
            var message_data = previewdata['message'];
            var shippmethod = previewdata["shippmethod"];
            var paymethod = previewdata['paymethod'];
            var paymethod_urlcode  = previewdata['paymethod_urlcode'];
            var saveaction = previewdata["saveaction"];
            var cart = previewdata["cart"];
            console.log(cart);


            var pswd = generatePassword();
            var Session = JSON.parse(localStorage[config.app.storage_key+'_session']);
            var customerid = Session["customer_id"];
            var user_email = Session["email"];
            var save_address_webservice_call = config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=setaddress&customerid=" + customerid + "&address=" + Base64.encode(JSON.stringify(address)) + "&email=" + user_email + "&saveaction=" + saveaction;
            console.log(save_address_webservice_call);
            if (customerid > 0 && customerid != null && customerid != "") {
                $.getJSON(save_address_webservice_call,
                    function(response) {
                        console.log(response);
                        try {
                            if (response) {
                                if ((response.shippaddress == "1" || response.shippaddress == 1) && (response.billaddress == "1" || response.billaddress == 1)) {
                                    console.log("Address Saved");
                                    var Session1 = JSON.parse(localStorage[config.app.storage_key+'_session']);
                                    var email = Session1["email"];
                                    transid = 1234567;
                                    console.log("Payment Method "+paymethod);
                                    try {
                                        coupon_code = cart.coupon.code;
                                    }
                                    catch(ex) {
                                        coupon_code = "";
                                    }
                                    
                                   var app_currency_code = Currency.getStoreCurrency();
                                   var quote = Cart.getCartFromStorage();
                                   var products = Base64.encode(JSON.stringify(filterQuoteProducts(quote["products"])));
                                   var dtimetext = previewdata['delivery_slot']['time'];
                                   var date = new Date(previewdata['delivery_slot']['date']);
                                   var ddate = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
                                   var place_order_url = config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=placeorder&customerid=" + customerid + "&address=" +Base64.encode(JSON.stringify(address)) + "&paymentmethod=" + paymethod + "&shipmethod=" + shippmethod + "&currency=" + app_currency_code + "&transactionid=" + transid + "&products=" + products + "&is_create_quote=1&theme=elegant&couponCode=" +coupon_code+"&ddate="+ddate+"&dtimetext="+dtimetext;
                                    console.log(place_order_url);
                                    console.log("Calling Webservice..");
                                    $.getJSON(place_order_url,
                                        function(response) {
                                           if(response.status == "error" && response.type == "quantity") {
                                                navigator.notification.alert(locale.message.alert["products_out_of_stock_message"],
                                                    function() {
                                                        redirectTopage('cart.html');
                                                    },
                                                    config.app.name,
                                                    locale.message.button['close']
                                                 );
                                                 return false;
                                            }
                                           else {
                                            console.log(response);
                                            var orderid;
                                            try {
                                                orderid = parseInt(response['orderid']);
                                            } catch (ex) {
                                                console.log(ex);
                                                orderid = -1;
                                            }
                                            console.log("Order Id "+orderid);
                                            if (orderid > 0) {
                                              console.log("Payment Method "+paymethod);
                                                if (paymethod == "secureebs_standard") {
                                                    var accountid = getPaymentInfo("ebs", "payment_method_account_id");
                                                    var secret_key = getPaymentInfo("ebs", "payment_method_account_key");
                                                    var mode = getPaymentInfo("ebs", "payment_method_mode");
                                                    var store_id = config.store.default;
                                                    var invoiceid = orderid;
                                                    var description = "Payments";
                                                    var currency = "INR";
                                                    var firstname = address.billing["firstname"];
                                                    var address1 = address.billing;
                                                    var address2 = address.shipping;
                                                    var postcode = address.shipping.postcode;
                                                    var country = "IN";
                                                    var phonenumber = address.shipping.phone;
                                                    var companyname = config.app.name;
                                                    var basicurl = config.url.base;
                                                    var return_url = config.url.api + "?DR={DR}&service=mofluid_ebs_pgresponse&store=1&platform=" + config.app.platform;
                                                    var modetext = "TEST";
                                                    if (mode == "1") {
                                                        modetext = "LIVE";
                                                    }
                                                    var ebs_hash_raw = secret_key + "|" + accountid + "|" + cart.total_amount + "|" + invoiceid + "|" + return_url + "|" + modetext;
                                                    console.log(ebs_hash_raw);
                                                    var ebs_hash = MD5(ebs_hash_raw);
                                                    var Session = JSON.parse(localStorage[config.app.storage_key+'_session']);
                                                    var emailid = Session["email"];
                                                    var mofluid_ebs_pay = {};
                                                    mofluid_ebs_pay["hash"] = ebs_hash;
                                                    mofluid_ebs_pay["account_id"] = accountid;
                                                    mofluid_ebs_pay["return_url"] = Base64.encode(return_url);
                                                    mofluid_ebs_pay["mode"] = modetext;
                                                    mofluid_ebs_pay["reference_no"] = invoiceid;
                                                    mofluid_ebs_pay["amount"] = cart.total_amount;
                                                    mofluid_ebs_pay["description"] = description;
                                                    mofluid_ebs_pay["name"] = address.billing.firstname;
                                                    mofluid_ebs_pay["address"] = address.billing.street;
                                                    mofluid_ebs_pay["city"] = address.billing.city;
                                                    mofluid_ebs_pay["state"] = address.billing.region;
                                                    mofluid_ebs_pay["postal_code"] = address.billing.postcode;
                                                    mofluid_ebs_pay["country"] = address.billing.country;
                                                    mofluid_ebs_pay["phone"] = address.billing.phone;
                                                    mofluid_ebs_pay["email"] = address.billing.email;
                                                    mofluid_ebs_pay["site_url"] = config.url.api;
                                                    mofluid_ebs_pay["mofluid_ebskey"] = secret_key;
                                                    var mofluid_ebs_data = JSON.stringify(mofluid_ebs_pay);
                                                    var ebs_payment_url = encodeURI(config.url.api + "?service=ebspayment&store=1&mofluid_paymentdata=" + mofluid_ebs_data);
                                                    iabRef = window.open(ebs_payment_url, '_blank', 'location=yes');
                                                    iabRef.addEventListener('exit',
                                                        function() {
                                                            Order.displayInvoice(orderid);
                                                        });
                                                } else if (paymethod == 'authorizenet') {
                                                    var data = {};
                                                    var invoiceid = orderid;
                                                    var Session = JSON.parse(localStorage[config.app.storage_key+'_session']);
                                                    var loginID = getPaymentInfo("authorizenet", "payment_method_account_id");
                                                    var transactionKey = getPaymentInfo("authorizenet", "payment_method_account_key");
                                                    var email = Session["email"];
                                                    try {
                                                       var total_ship_tax = parseFloat(parseFloat(cart.shipping_amount) + parseFloat(cart.tax_amount)).toFixed(2);
                                                    }
                                                    catch(er) {
                                                        var total_ship_tax = 0; 
                                                    }
                                                    data["pay_bill"] = address.billing;
                                                    data["pay_shipp"] = address.shipping;
                                                    data["product_shipamt"] = total_ship_tax;
                                                    data["total_amount"] = cart.total_amount;
                                                    data["cust_id"] = customerid;
                                                    data["invoice"] = invoiceid;
                                                    data["email"] = email;
                                                    data["loginID"] = loginID;
                                                    data["transactionKey"] = transactionKey;
                                                    data["authorize_return_url"] = config.url.api;
                                                    data["mode"] = getPaymentInfo("authorizenet", "payment_method_mode");
                                                    data["currency_code"] =  Currency.getStoreCurrency();
                                                    var pay_data = JSON.stringify(data);
                                                    pay_data = Base64.encode(pay_data);
                                                    var authorizenet_payment_url = encodeURI('authorize_net.html?pay_data=' + pay_data);
                                                    iabRef = window.open(authorizenet_payment_url, '_blank', 'location=yes');
                                                    iabRef.addEventListener('exit', function() {
                                                        Order.displayInvoice(orderid);
                                                    });
                                                } 
                                                else if (paymethod == "paypal_standard") {
                                                    if(config.app.platform == "android") {
                                                        var subtotal_amount = (parseFloat(cart.total_amount).toFixed(2)).toString(); 
                                                        var paymentdata = {
                                                            "products": Cart.getAll(),
                                                            "address" : address,
                                                            "order" : {
                                                                "invoice" : orderid.toString(),
                                                                "currency": Currency.getStoreCurrency(),
                                                                "description":"Order "+orderid,
                                                                "custom":"custom_text"
                                                            },
                                                            "config": {
                                                                "mode": getPaymentInfo("paypal", "payment_method_mode"),
                                                                "businessmail": getPaymentInfo("paypal", "payment_account_email"),
                                                                "api_key" : getPaymentInfo("paypal", "payment_method_account_key")
                                                            },
                                                            "app": {
                                                                "name":config.app.name,
                                                                "privacylink":config.url.base,
                                                                "userlink":config.url.base
                                                            },
                                                            "amount":{
                                                                "subtotal" : subtotal_amount,
                                                                "total":subtotal_amount,
                                                                "tax":"0",
                                                                "shipping":"0",
                                                                "discount":"0"
                                                            }
                                                        };
                                                        if(parseFloat(subtotal_amount) <=0) {
                                                          navigator.notification.alert(locale.message.text["message_for_invalid_payment_amount"], function() {
                                                                redirectTopage('index.html');
                                                          }, config.app.name, locale.message.button["close"]);
                                                        }
                                                        else {
                                                            console.log(paymentdata);
                                                            MofluidPaypal.initialize(paymentdata);
                                                        }
                                                    }
                                                    else {
                                                        console.log("Paypal iOS Payment");
                                                        var business_mail = getPaymentInfo("paypal", "payment_account_email");
                                                        var payment_mode = getPaymentInfo("paypal", "payment_method_mode");
                                                        var data = {};
                                                        var paypal_url = "https://www.sandbox.paypal.com/cgi-bin/webscr";
                                                        if (payment_mode == "1") {
                                                            var paypal_url = "https://www.paypal.com/cgi-bin/webscr";
                                                        }
                                                        console.log(paypal_url);
                                                        data["business_mail"] = business_mail;
                                                        data["pay_url"] = paypal_url;
                                                        data["total_amount"] = parseFloat(cart.total_amount).toFixed(2);
                                                        data["firstname"] = address.billing.firstname;
                                                        data["lastname"] = address.billing.lastname;
                                                        data["mofluid_order_id"] = orderid;
                                                        console.log(data);
                                                        var pay_data = JSON.stringify(data);
                                                        pay_data = Base64.encode(pay_data);
                                                        var paypal_payment_url = encodeURI('pay.html?pay_data=' + pay_data);
                                                        console.log(paypal_payment_url);
                                                        iabRef = window.open(paypal_payment_url, '_blank', 'location=yes');
                                                        iabRef.addEventListener('exit', function() {
                                                            redirectAfterPayment();
                                                        });
                                                    }  
                                                    
                                                } 
                                                else if (paymethod == "cashondelivery" || paymethod == "cod" || paymethod == "banktransfer" || paymethod == "free") {
                                                    Cart.clear();
                                                    Order.displayInvoice(orderid);
                                                }
                                                else {
                                                      var payment_url = config.url.base+"payment"+paymethod_urlcode;
                                                      try {
                                                        var total_ship_tax = parseFloat(parseFloat(cart.shipping_amount) + parseFloat(cart.tax_amount)).toFixed(2);
                                                      }
                                                     catch(er) {
                                                        var total_ship_tax = 0; 
                                                    }
                                                    var total_amount =  parseFloat(parseFloat(cart.total_amount)+total_ship_tax).toFixed(2);
                                                    
                                                      var data = {};
                                                       data["orderid"] = orderid;
                                                       data["amount"] = total_amount;
                                                       data["shopid"] = "";
                                                       data["first_name"] =address.billing.firstname;
                                                       data["last_name"] = address.billing.lastname;
                                                       data["siteurl"] = config.url.base;
                                                    
                                                      var pay_data = JSON.stringify(data);
                                                      pay_data = Base64.encode(pay_data);
                                                      var payment_process_url = encodeURI(payment_url+'?paymentdata='+pay_data);
                                                      iabRef = window.open(payment_process_url, '_blank', 'location=yes');
                                                      iabRef.addEventListener('exit', function() {
                                                          Order.displayInvoice(orderid);
                                                      });
                                                }
                                            }
                                        }
                                   });
                                } else {
                                    if (config.app.platform == 'ios') {
                                        navigator.notification.alert(locale.message.alert["failure_message_for_address_save"],
                                            function() {},
                                            config.app.name,
                                            'close'
                                        );
                                    } else {
                                        alert(locale.message.alert["failure_message_for_address_save"]);
                                    }
                                }
                            } else {
                                if (config.app.platform == 'ios') {
                                    navigator.notification.alert(locale.message.alert["failure_message_for_address_save"], function() {}, config.app.name, 'close');
                                } else {
                                    alert(locale.message.alert["failure_message_for_address_save"]);
                                }
                            }
                        } catch (ex) {
                            if (config.app.platform == 'ios') {
                                navigator.notification.alert(locale.message.alert["failure_message_for_address_save"], function() {}, config.app.name, 'close');
                            } else {
                                alert(locale.message.alert["failure_message_for_address_save"] + ex.message);
                            }
                        }
                    });
            }
        });
}



function getPaymentInfo(paymentcode, requiredinfo) {

    if (paymentcode == 'authorizenet') {
        paymentcode = 'authorize';
    }
    try {

        var payment_data = JSON.parse(localStorage[config.app.storage_key+"_cache_payment"]);
        console.log(payment_data);
        var total = payment_data.length;
        var i = 0;
        var result_data = '';
        for (i = 0; i < total; i++) {
            if (payment_data[i].payment_method_code == "" || payment_data[i].payment_method_code == null) {
                continue;
            }
            if (payment_data[i].payment_method_code == paymentcode) {

                result_data = payment_data[i][requiredinfo];

            }
        }
    } catch (exc) {
        //alert('Error'+exc.message);

    }
    return result_data;


}




/*
 *Function call to register user
 *@param fname, lname, email, pswd
 *@return
 */
function registerUser(fname, lname, email, pswd) {
    $.getJSON("" + config.url.api + "?callback=?" + "&store=1&service=createuser&firstname=" + fname + "&lastname=" + lname + "&email=" + email + "&password=" + pswd + "",
        function(response) {
            try {
                var status = response["status"];
                if (response && status != 0) {
                    var customerid = response["id"];
                    if (config.app.platform == 'ios' || config.app.platform == 'android') {
                        navigator.notification.alert(locale.message.alert["register_successfully_message"], function() {}, config.app.name, locale.message.button["close"]);
                    } else {
                        alert(locale.message.alert["register_successfully_message"]);
                    }
                    return customerid;
                } else {
                    return -1;
                }
            } catch (ex) {
                return -1;
            }
        });
}

/*
 *Function call to generate password
 *@param
 *@return
 */
function generatePassword() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        var charCount = 0;
        var numCount = 0;
        for (var i = 0; i < string_length; i++) {
            if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
                var rnum = Math.floor(Math.random() * 10);
                randomstring += rnum;
                numCount += 1;
            } else {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum, rnum + 1);
                charCount += 1;
            }
        }
        return randomstring;
    }
   
/*
 *Function to start login
 *@param
 *@return
 */
function loginStart(customerid, first_name, last_name, email, password) {
    var Session = new Object();
    localStorage[config.app.storage_key+'_session'] = null;
    Session["customer_id"] = customerid;
    Session["first_name"] = first_name;
    Session["last_name"] = last_name;
    Session["email"] = email;
    Session["password"] = password;
    Session["login_status"] = "Active";
    var current_date = new Date();
    var login_date = current_date.getDate() + "/" + (current_date.getMonth() + 1) + "/" + current_date.getFullYear();
    var login_time = current_date.getHours() + ":" + current_date.getMinutes() + ":" + current_date.getSeconds();
    Session["login_date"] = login_date;
    Session["login_time"] = login_time;
    var JSession = JSON.stringify(Session);
    localStorage[config.app.storage_key+'_session'] = JSession;
}

    /*
     *Function to redirect to login page
     *@param
     *@return
     */
function goLoginPage() {
    localStorage[config.app.storage_key+'_session'] = null;
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/login.html";
    window.location = fullPath;
}

/*
 *Function to redirect to login page
 *@param
 *@return
 */
function goLogin(next) {
    var dirPath = dirname(location.href);
    localStorage[config.app.storage_key+"_nextpage"] = next;
    var fullPath = dirPath + "/login.html";
    window.location = fullPath;
}

/*
 *Function to redirect to invoice page
 *@param
 *@return
 */
function goInvPage() {
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/invoice.html";
    window.location = fullPath;
}

/*
 *Function to redirect to pay page
 *@param
 *@return
 */
function visitPayPage() {
    localStorage.clear();
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/pay.html";
    window.location = fullPath;
}

/*
 *Function to redirect to shipmyid page
 *@param
 *@return
 */
function visitShipMyIdPage() {
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/shiptomyid.html";
    window.location = fullPath;
}

/*
 *Function to redirect to cart page
 *@param
 *@return
 */
function visitCartPage() {
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/cart.html";
    window.location = fullPath;
}

/*
 *Function to redirect to home page
 *@param
 *@return
 */
function visitHomePage() {
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/index.html";
    window.location = fullPath;
}

/*
 *Function to redirect after payment
 *@param
 *@return
 */
function redirectAfterPayment() {
    Cart.clear();
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/index.html";
    window.location = fullPath;
}

/*
 *Function to redirect to home page
 *@param
 *@return
 */
function visitHomePageBuy() {
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/index.html";
    window.location = fullPath;
}

/*
 *Function to redirect to edit profile page
 *@param
 *@return
 */
function goEditProfile() {
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/editprofile.html";
    window.location = fullPath;
}

/*
 *Function to redirect to profile page
 *@param
 *@return
 */
function goMyProfile() {
    if (localStorage[config.app.storage_key+"_session"] == null) {
        visitHomePage();
    } else {
        var Session = JSON.parse(localStorage[config.app.storage_key+"_session"]);
        if (Session == null) {
            visitHomePage();
        } else {
            if (Session["login_status"] == "Active") {
                var dirPath = dirname(location.href);
                var fullPath = dirPath + "/profile.html";
                window.location = fullPath;
            } else {
                visitHomePage();
            }
        }
    }
}


/*
 *Function to redirect to my order page
 *@param
 *@return
 */
function goMyOrder() {
    if (localStorage[config.app.storage_key+"_session"] == null) {
        visitHomePage();
    } else {
        var Session = JSON.parse(localStorage[config.app.storage_key+"_session"]);
        if (Session == null) {
            visitHomePage();
        } else {
            if (Session["login_status"] == "Active") {
                var dirPath = dirname(location.href);
                var fullPath = dirPath + "/myorder.html";
                window.location = fullPath;
            } else {
                visitHomePage();
            }
        }
    }
}


/*
 *Function to show search box
 *@param
 *@return
 */
function goSearchPage() {
    display_serach_home();
    $("#navpanel").panel("close");
}

/*
 *Function to show search box
 *@param
 *@return
 */
function goSearch() {
    display_serach();
    $("#navpanel").panel("close");
}

/*
 *Function to show search box
 *@param
 *@return
 */
function display_serach() {
    $("#default_header_bar").css("display", "none");
    $("#search-product-div").css("display", "block");
}

/*
 *Function to show search box
 *@param
 *@return
 */
function display_serach_home() {
    $("#default_header_bar").css("display", "none");
    $("#search-product-div").css("display", "inline-block");
}


/*
 *Function to hide search box
 *@param
 *@return
 */
function hide_serach() {
    $("#default_header_bar").css("display", "block");
    $("#search-product-div").css("display", "none");
}

/*
 *Function to cancel coupon
 *@param
 *@return
 */
function cancelCoupon() {
    try {
        var cart =  JSON.parse(localStorage[config.app.storage_key+"_cart"]) ;
        var couponcode = cart.coupon.code;
        var coupon ={};
        coupon.applied = 0;
        coupon.code = "";
        coupon.amount = 0;
        cart["coupon"] = coupon; 
        localStorage[config.app.storage_key+"_cart"] = JSON.stringify(cart);
     
        var couponcode = JSON.parse(localStorage[config.app.storage_key+"_coupon_code"]);
        localStorage[config.app.storage_key+"_couponapplied"] = "0";
        localStorage[config.app.storage_key+"_coupon_code"] = JSON.stringify("");
        if (config.app.platform == 'ios' || config.app.platform == 'android') {
            navigator.notification.alert(locale.message.alert["coupon_canceled"].replace("{{coupon}}", couponcode), function() {}, config.app.name, locale.message.button["close"]);
        } else {
            alert(locale.message.alert["coupon_canceled"].replace("{{coupon}}", couponcode));
        }
        var CouponDetail = new Object();
        CouponDetail["apply_to_shipping"] = "";
        CouponDetail["simple_action"] = "";
        CouponDetail["discount_amount"] = "";
        CouponDetail["discount_qty"] = "";
        CouponDetail["shipmyidonly"] = "";
        localStorage[config.app.storage_key+"_coupondetails"] = JSON.stringify(CouponDetail);
        location.reload(true);
    } catch (ex) {
       if (config.app.platform == 'ios' || config.app.platform == 'android') {
            navigator.notification.alert(locale.message.alert["coupon_canceled"].replace("{{coupon}}", couponcode), function() {}, config.app.name, locale.message.button["close"]);
        } else {
            alert(locale.message.alert["coupon_canceled"].replace("{{coupon}}", couponcode));
        }
        location.reload(true);
    }
}

/*
 *Function to save state from dropdown to text field
 *@param
 *@return
 */
function savestate() {
    state = $("#states").val();
    $("#state").val(state);
}

/*
 *Function to print state and call webservice
 *@param
 *@return
 */
function printstate() {
    var Countrycode = $("#country").val();
    $.getJSON("" + config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=mofluidappstates&country=" + Countrycode,
        function(response) {
            if (response.length == "0") {
                $("#state_textfield").show();
                $("#state_dropdown").hide();

            } else {
                $("#state_textfield").hide();
                $("#state_dropdown").show();
                print_state(response);
            }
        });
}

/*
 *Function to create state dropdown
 *@param state array
 *@return
 */
function print_state(state_arr) {
    var statearr = state_arr.mofluid_regions;
    var option_str1 = document.getElementById("states");
    option_str1.options = "";
    var i = 1,
        indexj = 0;
    option_str1.options[0] = new Option("Select", "Select");

    $.each(statearr, function() {
        option_str1.options[i++] = new Option(statearr[indexj].region_name, statearr[indexj].region_id);
        indexj++;
    });
    state = $("#state").val();
    if ($("#states option[value='" + state + "']").length > 0) {
        $("#states").val(state);
    } else {
        $("#states").val("Select");
    }
    $("#states").selectmenu("refresh", true);
}

/*
 *Function to save ship state from dropdown to text field
 *@param
 *@return
 */
function saveSstate() {
    state = $("#Sstates").val();
    $("#Sstate").val(state);
}

/*
 *Function to print ship state
 *@param
 *@return
 */
function printSstate() {
    var Countrycode = $("#Scountry").val();
    $.getJSON("" + config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=mofluidappstates&country=" + Countrycode,
        function(response) {
            if (response.length == "0") {
                $("#Sstate_textfield").show();
                $("#Sstate_dropdown").hide();

            } else {
                $("#Sstate_textfield").hide();
                $("#Sstate_dropdown").show();
                print_Sstate(response);
            }
        });
}

/*
 *Function to create ship state dropdown
 *@param
 *@return
 */
function print_Sstate(state_arr) {
    var statearr = state_arr.mofluid_regions;
    var option_str1 = document.getElementById("Sstates");
    option_str1.options = "";
    var i = 1,
        indexjj = 0;
    option_str1.options[0] = new Option("Select", "Select");
    $.each(statearr, function() {
        option_str1.options[i++] = new Option(statearr[indexjj].region_name, statearr[indexjj].region_id);
        indexjj++;
    });
    state = $("#Sstate").val();
    if ($("#Sstates option[value='" + state + "']").length > 0) {
        $("#Sstates").val(state);
    } else {
        $("#Sstates").val("Select");
    }
    $("#Sstates").selectmenu("refresh", true);
}

/*
 *Function to show image on error
 *@param image
 *@return
 */
function bad_image(image) {
    image.src = "media/images/default/product_default_image.png";
}
function loadLogoBanner() {
    try {
           var store = JSON.parse(localStorage[config.app.storage_key+"_store"]);
        $(".navigation_logo").html(store.logo);
        $("#banner_slider").html(store.banner);
        var owl = $("#banner_slider");
        owl.owlCarousel({
           items : 1, //10 items above 1000px browser width
           itemsDesktop : [1000,1], //5 items between 1000px and 901px
           itemsDesktopSmall : [900,1], // betweem 900px and 601px
           itemsTablet: [600,1], //2 items between 600 and 0
           itemsMobile : false,  // itemsMobile disabled - inherit from itemsTablet option
           navigation : false,
           pagination: true
      });
    }
    catch(err) {
        console.log(store);
        console.log("Problem while loading Logo and Banner.");
    }
}

function badBannerImage(image) {
    image.src = 'images/' + config.theme.banner;
}

function printLogo() {
    try {
           var store = JSON.parse(localStorage[config.app.storage_key+"_store"]);
           $(".navigation_logo").html(store.logo);
    }
    catch(err) {
        console.log("logo is missing");
    }
    
}

$(document).ready(function() {
    printLogo();
});

function checkCart() {
    try {
        console.log(JSON.parse(localStorage[config.app.storage_key+'_pQuantities']).length);
        if (JSON.parse(localStorage[config.app.storage_key+'_pNames']) == "" || JSON.parse(localStorage[config.app.storage_key+'_pNames']) == null) {
            visitHomePage();
        } else if (JSON.parse(localStorage[config.app.storage_key+'_pQuantities']).length == 0) {
            visitHomePage();
        }
    } catch (ex) {
        console.log(ex);
        visitHomePage();
    }

}




function validateAddress(address) {
    var re = /^[a-zA-Z0-9\s,'()/-]*$/;
    return re.test(address);
}


function CurrencyFormatted(amount) {
    var i = parseFloat(amount);
    if (isNaN(i)) {
        i = 0.00;
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if (s.indexOf('.') < 0) {
        s += '.00';
    }
    if (s.indexOf('.') == (s.length - 2)) {
        s += '0';
    }
    s = minus + s;
    return s;
}

function addThousandsSeparator(input) {
    var output = input
    if (parseFloat(input)) {
        input = new String(input); // so you can perform string operations
        var parts = input.split("."); // remove the decimal part
        parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
        output = parts.join(".");
    }

    return output;
}

function fireEmail(order_id) {
    var serr_url = "" + config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=mofluid_sendorder_mail&orderid=" + order_id;
    $.getJSON(serr_url,
        function(response) {

        });
}




function showBankDetails(value) {
    if (value == "banktransfer" && $("#bankdetails").text() != "") {
        $("#bankdetails").slideDown('slow');
    } else {
        $("#bankdetails").slideUp('slow');
    }
}

/*
 *Function to check pincode is valid or not
 *@param name
 *@return true or false
 */
function isValidalphanumeric(name) {
    var alphaExp = /^([a-zA-Z0-9 ]+)$/;
    if (name.match(alphaExp))
        return true;
    else
        return false;
}

function removeUnrequiredChar(data) {
            var result = '';
            for(var i=0;i<=data.length;i++) {
                var mchar = data.charAt(i);
                if(mchar == '"' || mchar == "," || mchar == "'" || mchar == ":" || mchar == "{" || mchar == "}" || mchar == "[" || mchar == "]") {
                    result += mchar;
                }
                else if(mchar == '@' || mchar == "." || mchar == "(" || mchar == ")" || mchar == "-" || mchar == "_" || mchar == ";" || mchar == "/") {
                    result += mchar;
                }
                else if(/^[a-z0-9]+$/i.test(mchar)) {
                    result += mchar;
                }
            }
            return result;
        }
  
function showPopupLayer(){
    $(".popup_top_layer").slideDown("slow");
    $(".popup_bottom_layer").show();
}
function hidePopupLayer(){
    $(".popup_top_layer").slideUp("slow");
    setTimeout(function(){
    $(".popup_bottom_layer").hide();
    redirectTopage('index.html');
    }, 1000);
}
function phoneDial(number) {
    phonedialer.dial(
        number, 
        function(err) {
                if (err == "empty") 
                    console.error("Unknown phone number");
                else 
                    console.error("Dialer Error:" + err);    
        },
        function(success) { 
            console.log('Dialing '+number+' succeeded'); 
        }
    );
 }
 
function emailSend(email) {
    try {
       cordova.plugins.email.open({
          to:  email,
          subject: config.app.name
       });
    }
    catch(err) {
        window.location.href = "mailto:"+email+"?subject="+config.app.name;
    }    
}
var ref = null;
function openLink(url)
{
    try {
         ref = window.open(encodeURI(url),'_blank','location=no'); //encode is needed if you want to send a variable with your link if not you can use ref = window.open(url,'_blank','location=no');
         ref.addEventListener('loadstop', externalLinkLoadStop);
         ref.addEventListener('exit', externalLinkClose);
    }
    catch (err)    
    {
        console.error(err);
    }
}
function externalLinkLoadStop(event) {
    if(event.url == "http://www.mypage.com/closeInAppBrowser.html"){
        ref.close();
    }    
}
function externalLinkClose(event) {
    ref.removeEventListener('loadstop', externalLinkLoadStop);
    ref.removeEventListener('exit', externalLinkClose);
} 