/*
mofluid-catalog.js v0.0.1
(c) 2009-2013 by Mofluid. All rights reserved.
Shashi Badhuk

Provides Following Methods :-
   a) printRootCategory
   b)  updateList
   c) getCategory
   d) getSubCategory 
   e) sortProductList
   f) custom_search
   g) redirectToproductdetail
   h) fetchFeaturesProduct
*/

/* Print Root Category. */
var current_product;
var homeCategoty = {};
var database=config.app.storage_key;
var cache_expire_time=localStorage['c_time'];
var cache_expire_status=localStorage['c_status'];
var cache_time = parseInt(parseInt(cache_expire_time) * 60 *1000);
if(cache_expire_status==0 || cache_expire_status==null)
{
    
    var cache_time = parseInt(parseInt(config.sqlite_data.cache_time) * 60 *1000);
}

function dbConnection(){
    db = window.sqlitePlugin.openDatabase({name: database,location: 0});
    /*  var version = '1.0';
    var displayName = 'myCOL';
    var maxSize = -1; // in bytes
    db = openDatabase(database, version, displayName, maxSize);*/
    return db;
}
function printRootCategory(response) {
    homeCategoty = response;
    var parent_list = '<div data-role="listview" data-inset="true" class="row">', i = 0, j = 0;
    try {
        var border_color = ["u_tag", "i_tag", "m_tag", "w_tag", "mo_tag"];
        if (response.length) {
            while (i < response.length) {
                var categoryName = response[i]["name"];
                var complete_path = location.href;
                var categoryId = response[i]["id"];
                var dirPath = dirname(complete_path);
                //var imageURL = response[i]["image"];
                 var imageURL = response[i]["new_thumbnail"];
                var fullPath = "'" + dirPath + "/subcategory.html?parent=" + categoryId + "&All=1'";
                var classf = (i == 0) ? ' product-set-first' : '';
                if (config.settings.display_category_image == "1") {
                    parent_list += '<div onclick="getCategory(this);" class="product-set'+classf+'"><a class="ui-link-inherit no-svg" rel=' + fullPath + '"><div class="pro-category-point"><img src="' + imageURL + '" onerror="bad_image(this);" class="img-responsive"><h2>' + categoryName + '</h2></div></a></div>';
                }
                else {
                    parent_list += '<div onclick="getCategory(this);" class="product-set'+classf+'"><a class="ui-link-inherit no-svg" rel=' + fullPath + '"><div class="pro-category-point"><h2>' + categoryName + '</h2></div></a></div>';
                }
                i++;
                j++;
                j = j%5;
            }
        }
        else {
            parent_list += '<div>'+locale.message.text["no_category_found"]+'</div>';
        }
     }
     catch(category_exc) {
         parent_list += '<div>'+locale.message.text["no_category_found"]+'</div>';
     }
     parent_list += '</div>';
     $("#category").html(parent_list);
     $("#category .row").listview();
     $("#category .row").listview("refresh");
     
     var catWidth = $('.product-set').width()+18;
     if(catWidth){
        $('.pro-category').prepend('<div id="prev-cat" class="cat-slider-nav" style="left:0"></div><div id="next-cat" class="cat-slider-nav" style="right:0"></div>');
         $('#next-cat').click(function(){
            $('#category').animate({
                    scrollLeft: $('#category').scrollLeft()+catWidth
                }, 'slow');
         })

         $('#prev-cat').click(function(){
            $('#category').animate({
                    scrollLeft: $('#category').scrollLeft()-catWidth
                }, 'slow');
         })
     }
     
}

function printRootCategory_preview(response) {
    var parent_list = '<ul data-role="listview" data-inset="true" class="navigation_cat">', i = 0, j = 0;
    try {
        var border_color = ["u_tag", "i_tag", "m_tag", "w_tag", "mo_tag"];
        if (response.length) {
            while (i < response.length) {
                var categoryName = response[i]["name"];
                var complete_path = location.href;
                var categoryId = response[i]["id"];
                var dirPath = dirname(complete_path);
                var imageURL = response[i]["thumbnail"];
                var fullPath = "'" + dirPath + "/subcategory.html?parent=" + categoryId + "'";
                if (config.settings.display_category_image == "1") {
                    parent_list += '<li onclick="getCategory(this);"><a class="ui-link-inherit no-svg" rel=""><img src="' + imageURL + '" onerror="bad_image(this);"><h2>' + categoryName + '</h2></a></li>';
                }
                else {
                    parent_list += '<li onclick="getCategory(this);"><a class="ui-link-inherit no-svg" rel="#"><h2>' + categoryName + '</h2></a></li>';
                }
                i++;
                j++;
                j = j%5;
            }
        }
        else {
            parent_list += '<li>'+locale.message.text["no_category_found"]+'</li>';
        }
     }
     catch(category_exc) {
         parent_list += '<li>'+locale.message.text["no_category_found"]+'</li>';
     }
     parent_list += '</ul>';
     $("#category").html(parent_list);
     $("#category ul").listview();
     $("#category ul").listview("refresh");
}

/*
 *Function To update the jquery after the categories are listed
 *@param data
 *@return
 */
function updateList(data,parentDiv) {
    parent_list = "<ul data-role='listview' data-inset='true' class='slider-category'>";
    parent_list += data;
    parent_list += "</ul>";
    $("#"+parentDiv).html(parent_list);
    $("#"+parentDiv+" ul").listview();
    $("#"+parentDiv+" ul").listview("refresh");
    if(parentDiv == 'third_level_cat'){
      $('#sorting_div').addClass('small-sorting');
      $('#third_level_cat').show();

    }
    else{
      hideThirdLevelCat();
    }
      
}

function hideThirdLevelCat() {
  $('#third_level_cat').hide();
  $('#sorting_div').removeClass('small-sorting');
}
function getCategory(source) {
    var catName = $(source).find("h2").text();
    var catLink = $(source).find("a").attr("rel");
    var imageurl = $(source).find("img").attr("src");
    parent.location = catLink;
}

function getSubCategory(source) {
    $(source).siblings().find('a').removeClass('active');
    $(source).find('a').addClass('active');
    var catName = $(source).find("h2").text();
    var catLink = $(source).find("a").attr("rel");
    var imageurl = $(source).find("img").attr("src");
    parentCategoryId = getParameterByNameInUrl('parent',catLink);
    parentstr = parentCategoryId;
    show_pro = getParameterByNameInUrl('All',catLink);
    resetVariables();
    var catLevel = getParameterByNameInUrl('level',catLink);
    console.log(show_pro);
    console.log(catLevel);
    if(catLevel == 2) { // if user clicks on all products of 2nd level categories
      hideThirdLevelCat();
      $('#category').html('');
      printProducts(page);
    }
    else if(catLevel == '' && show_pro) { // if user clicks at any category of 2nd level
      hideThirdLevelCat();
      fetchSubCategoryList(parentCategoryId,false)
    } else { // if user clicks at 3rd level
      $('#category').html('');
      printProducts(page);
    }
    //parent.location = catLink;
}

function resetVariables() {
    sorttype = $("#sel-sortType").val();
    sortorder = $("#sel-sortType  :selected").attr("rel");
    total_listed_product = 0;
    $("#category").html("");
    product_count = 1;
    page = 1;
    categoryfound = 1;
}


    /*
     *Function to sort products according to selection
     *@param
     *@return
     */
function sortProductList() {
    var stock_status = "0";
    var order = $("#select-choice-1").val();
    var results = JSON.parse(localStorage[config.app.storage_key+"_last_products_list"]);
    var sorted_product_list = '';
    var temp;
    if (order == "PriceL2H") {
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results.length - i; j++) {
                try {
                    if (parseFloat(results[j]["price"].replace(/\,/g, '')) > parseFloat(results[j + 1]["price"].replace(/\,/g, ''))) {
                        temp = results[j];
                        results[j] = results[j + 1];
                        results[j + 1] = temp;
                    }
                } catch (ex) {}
            }
        }
    } else if (order == "PriceH2L") {
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results.length - i; j++) {
                try {
                    if (parseFloat(results[j]["price"].replace(/\,/g, '')) < parseFloat(results[j + 1]["price"].replace(/\,/g, ''))) {
                        temp = results[j];
                        results[j] = results[j + 1];
                        results[j + 1] = temp;
                    }
                } catch (ex) {}
            }
        }
    } else if (order == "NameA2Z") {
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results.length - i; j++) {
                try {
                    if (results[j]["name"] > results[j + 1]["name"]) {
                        temp = results[j];
                        results[j] = results[j + 1];
                        results[j + 1] = temp;
                    }
                } catch (ex) {}
            }
        }
    } else if (order == "NameZ2A") {
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results.length - i; j++) {
                try {
                    if (results[j]["name"] < results[j + 1]["name"]) {
                        temp = results[j];
                        results[j] = results[j + 1];
                        results[j + 1] = temp;
                    }
                } catch (ex) {}
            }
        }
    } else if (order == "Date") {
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results.length - i; j++) {
                try {
                    if (parseInt(results[j]["id"]) < parseInt(results[j + 1]["id"])) {
                        temp = results[j];
                        results[j] = results[j + 1];
                        results[j + 1] = temp;
                    }
                } catch (ex) {}
            }
        }
    } else {
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results.length - i; j++) {
                try {
                    if (results[j]["id"] > results[j + 1]["id"]) {
                        temp = results[j];
                        results[j] = results[j + 1];
                        results[j + 1] = temp;
                    }
                } catch (ex) {}
            }
        }
    }
    var i = 0;
    while (i < results.length) {
        var productName = results[i]["name"];
        var pid = results[i]["id"];
        var price = results[i]["price"];
        price = CurrencyFormatted(price);
        price = addThousandsSeparator(price);
        var imageURL = results[i]["imageurl"];
        var SKU = results[i]["sku"];
        var sprice = results[i]["spclprice"];
        var dirPath = dirname(location.href);
        var is_stock = '';
        if (parseInt(results[i]["is_in_stock"]) > 0 && results[i]["stock_quantity"] > 0) {
            is_stock = locale.message.text["in_stock"];
            stock_status = "1";
        } else {
            is_stock = locale.message.text["out_of_stock"];
            stock_status = "0";
        }
        var fullPath = "'" + dirPath + "/product.html?id=" + pid + "stock_status" + stock_status + "'";
       
        if (stock_status == "1") {
            sorted_product_list += '<div class="product_outer_div"><div class="product_inner_div"><div class="product_img_container"><img src="' + imageURL + '" class="product_main_img" onerror="bad_image(this);"/></div><div class="product_name_div">' + productName + '</div><div class="product_name_div">' + Currency.getStoreCurrencySymbol() + price + '</div><div style="width:100%"><div class="detail_div" id="details"><input type="button" data-theme="c" value="Details" onclick="parent.location=' + fullPath + '" /></div><div class="cart_div" id="cart"><input type="button" data-theme="b" value="' + locale.message.button["add_to_cart"] + '" onclick="addDirectToCart(' + pid + ',' + stock_status + ')" /></div></div></div></div>';
        } else {
            sorted_product_list += '<div class="product_outer_div"><div class="product_inner_div"><div class="product_img_container"><img src="' + imageURL + '" class="product_main_img" onerror="bad_image(this);"/></div><div class="product_name_div">' + productName + '</div><div class="product_name_div">' + Currency.getStoreCurrencySymbol() + price + '</div><div style="width:100%"><div class="detail_div" id="details"><input type="button" data-theme="c" value="Details" onclick="parent.location=' + fullPath + '" /></div><div class="cart_div" id="cart"><input type="button" data-theme="b" value="' + locale.message.button["add_to_cart"] + '" onclick="addDirectToCart(' + pid + ',' + stock_status + ')" /></div></div></div></div>';
        }
      
        i++;
    }
    $("#category").html(sorted_product_list);
    $("#category").trigger("create");
}


/*
 *Function to search product and redirect to search page
 *@param
 *@return
 */
function custom_search() {
    var searchdata = document.getElementById("searchFilter").value;
    if (searchdata == null || searchdata == "") {
        if (config.app.platform == 'ios' || config.app.platform == 'Android') {
            navigator.notification.alert(locale.message.alert["message_when_empty_search"], function() {}, config.app.name, locale.message.button["close"]);
        } else {
            alert(locale.message.alert["message_when_empty_search"]);
        }
    } else {
        searchdata = Base64.encode(searchdata);
        localStorage[config.app.storage_key+"_search_data_value"] = searchdata;
        var dirPath = dirname(location.href);
        var fullPath = dirPath + "/search.html?search-data=" + searchdata;
        window.location = fullPath;
    }
}
//For Showing Dynamic Starts
$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}


function redirectToproductdetail(product_id) {
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/product.html?id=" + product_id;
    window.location = fullPath;
}

/*
 *Function to getProductInfoById 
 *@param
 *@return
 */
function getProductInfoById(product_id, callback) {
    var product_webservice = config.url.api + "?callback=?" + "&store=" + config.store.default + "&service=productinfo&productid="+product_id+"&currency="+ Currency.getStoreCurrency();
    $.ajax({
       url: product_webservice,
       type: "get",
       dataType: "jsonp",
       async:false,
       beforeSend: function(){
          console.log("Before Product Webservice");
       },
       error: function(){
          if (config.app.platform == 'ios' || config.app.platform == 'android') 
              navigator.notification.alert(locale.message.alert["try_again"], function() {}, config.app.name, locale.message.button["close"]);
          else 
               alert(locale.message.alert["try_again"])
          console.log("Error  on Product Webservice");
       },
       complete: function(){
           console.log("Complete Product Webservice");
       },
       success: callback 
    });
}
/*
 *Function to getProductInfoById 
 *@param
 *@return
 */
function renderProductInfo(product, isConfigurableOptionAction){
     $("#product_detail_loader").css("display","block");
     if(typeof(isConfigurableOptionAction)==='undefined' || isConfigurableOptionAction == null)
        isConfigurableOptionAction = 'default';
     current_product = product;
     var  product_html = '', price_review_row_html ='', product_action_row = '', price_html='';
     //Get Product Stock Message
     var is_in_stock = locale.message.text.out_of_stock;
     var is_in_stock_flag = 0;
     if(product.type == "configurable" || product.type == "grouped") {
        if(parseInt(product.stock.is_in_stock) > 0) {
            is_in_stock = locale.message.text.in_stock;
            is_in_stock_flag = 1;
        }
    } 
    else if(parseInt(product.stock.is_in_stock) > 0 && parseInt(product.stock.qty) > 0) {
        is_in_stock = locale.message.text.in_stock;
        is_in_stock_flag = 1;
    }
    else if(parseInt(product.stock.manage_stock) <= 0 ) {
        if(parseInt(product.stock.use_config_manage_stock) <= 0 ) {
             is_in_stock = locale.message.text.in_stock;
            is_in_stock_flag = 1;
        }
    }
      //Get Product Review Rating
     if(product.reviews.average)
        var product_rating_star = product.reviews.average/20;
     else 
        var product_rating_star = 0;
     
     //Create Product Price & Review Rating Block
     if(product.type == "simple" || product.type == "configurable") {
        price_html = ' \
            <div class="price_field">\
               <table>';
         if(!(product.price.regular <= product.price.final)){
            price_html +='<tr> <td class="product_cross_price_color product_special_cut_price_color">'+Currency.getStoreCurrencySymbol()+product.price.regular+'<input type="hidden" data-role="none" id="specialpricehidden" value="'+product.price.regular+'"></td></tr>';
         }
                  
         price_html += '<tr><td class="product_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(product.price.final).toFixed(2)+' <input type="hidden" data-role="none" id="propricehidden" value="'+product.price.final+'"></td></tr>\
                </table>\
            </div>';
     }
     else {
         price_html = '';
     }
     var review_html =  '<div class="review_field" >\
              <table align="right">\
                  <tr><td id="rating_stars"><span class="stars">'+product_rating_star+'</span></td></tr>\
                  <tr><td><span class="total_review" id="total_review">'+product.reviews.total+'</span> '+locale.message.text.reviews+'</td></tr>\
                  <tr><td><span class="stock_detail">'+is_in_stock+'</span></td></tr>\
               </table>\
          </div>';
     
     price_review_row_html = price_html+review_html;
     //Create Product General Description Block
    var product_general_description_table = '<table>';
    for (key in product.general) {
       if (product.general.hasOwnProperty(key)) {
           if(product.general[key]) {
             product_general_description_table += '<tr><td>'+capitaliseFirstLetter(key)+'</td><td>'+product.general[key]+'</td></tr>';
         }
       }
    }
    product_general_description_table += '</table>';
    //Create Product Full Description Block 
     product_html = ' \
         <div id="product_info"  class="product_info" data-role="collapsible-set">\
           <div data-role="collapsible" data-collapsed="false" class="product_tabs_container_collapse" >\
           <h3>'+locale.message.text.description+'</h3><div class="product_tabs_container">\
              <div data-role="tabs" class="product_tabs">\
                      <div data-role="navbar">\
                      <ul>\
                         <li><a href="#general" data-ajax="false" class="ui-btn-active">'+locale.message.text["general"]+'</a></li>\
                         <li><a href="#short_desc" data-ajax="false">'+locale.message.text["short_description"]+'</a></li>\
                         <li><a href="#full_desc" data-ajax="false">'+locale.message.text["full_description"]+'</a></li>\
                      </ul>\
                      </div>\
                    <div id="general" class="ui-body-d ui-content">\
                           <p>\
                              '+product_general_description_table+' \
                        </p>\
                      </div>\
                    <div id="short_desc" class="ui-body-d ui-content">\
                       <p>'+Base64.decode(product.description.short)+'</p>\
                     </div>\
                    <div id="full_desc" class="ui-body-d ui-content">\
                         <p>'+Base64.decode(product.description.full)+'</p>\
                     </div>\
                 </div><!--End Tabs-->\
                 </div>\
             </div><!--End Collapsible-->\
                 '+getProductTypeHtml(product)+'\
             </div>';
     product_action_row = '\
    <div id="buy_share" class="buy_share" style="clear: both;overflow: hidden;"> \
        <div id="share_div" class="share_div">\
             <input id="product_share" class="content-secondry" type="button" data-role="button" data-theme="c"  data-iconpos="top" data-icon="shareicon"   value="&nbsp;" onClick=\'socialShareProduct("'+Base64.encode(product.general.name)+'", "'+Base64.encode(product.url)+'")\'  />\
        </div>\
        <div id="buy_now_div" class="buy_now_div">';
     if(is_in_stock_flag == 1) {
         product_action_row+= '<input id="buyNow" class="content-secondry" type="button" data-role="button" data-theme="b" value="'+locale.message.button["add_to_cart"]+'" onClick="proceedToCart()"/>';
     }
     else {
         product_action_row+= '<input id="buyNow" class="content-secondry" type="button" data-role="button" data-theme="b" value="'+locale.message.button["add_to_cart"]+'" disabled/>';
     }
     product_action_row += '</div></div> ';
     $("#product_full_name").html(product.general.name);
    $("#price_review_row").html(price_review_row_html);
    $("#product_description").html(product_html);
    $("#product_action_row").html(product_action_row);
    $( "#product_description" ).trigger("create");  
    $( "#product_info" ).trigger("create");
     $('#rating_stars span.stars').stars();
     $("#buyNow").button().button('refresh');
     $("#product_share").button().button('refresh');
    if(isConfigurableOptionAction != "reset") {
        $("#product_slider").html(getProductImageSlider(product.id, product.general.name, product.image));
        var product_slider = $("#product_slider");
        product_slider.owlCarousel({
            items : 1, //10 items above 1000px browser width
            singleItem :true,
            autoPlay: true,
            addClassActive : true,
            navigation : false,
            pagination: true 
        });
     }
     else {
         console.log("Slider not updated");
     }
     $("#product_detail_loader").css("display","none");
}
function productImageFullPreview(id, name, image){
    var $this = $(this);
    console.log(id, name);
    console.log(image);
  }       
function getProductTypeHtml(product) {
    var product_type_html;
    switch (product.type) {
           case 'configurable':
               product_type_html = getConfigurableOptionsHtml(product);
           break;
           case 'grouped':
               product_type_html = getGropedOptionsHtml(product);
           break;
           case 'bundle':
               product_type_html = getBundleOptionsHtml(product);
           break;
           case 'virtual':
               product_type_html = getVirtualOptionsHtml(product);
           break;
           case 'downloadable':
               product_type_html = getDownloadableOptionsHtml(product);
           break;
           default:
               product_type_html = '';
           break;
    }
    product_type_html += getProductOptionsHtml(product.custom.options);
    return product_type_html;
}
var attributes_value = [];
 function getConfigurableOptionsHtml(current){
     console.error("Test Current");
     console.log(current);
     var configurable_html = '';
     var attributes = current.products.associated.attributes;
     var child = current.products.associated.childs;
     var attributes_label = [], attributes_main_value =[];
     var counter = 0;
     var current_counter = 0;
     var same_attr_counter =0;
     console.error("Test>>>>");
     console.log(attributes);
     for (key in attributes) {
       if (attributes.hasOwnProperty(key)) {
           current_attributes = attributes[key];
           for (key2 in current_attributes) {
            if (current_attributes.hasOwnProperty(key2)) {
                attributes_value[same_attr_counter]   = ( typeof  attributes_value[same_attr_counter]   != 'undefined' && attributes_value[same_attr_counter]  instanceof Array ) ? attributes_value[same_attr_counter]  : [];
                if(attributes_label.indexOf(current_attributes[key2].id) < 0) {
                   attributes_main_value[same_attr_counter]  = new Array();
                   attributes_label[same_attr_counter] =  current_attributes[key2].id;
                   attributes_main_value[same_attr_counter]["id"]= current_attributes[key2].id;
                   attributes_main_value[same_attr_counter]["value"]= current_attributes[key2].code;
                   attributes_main_value[same_attr_counter]["label"]= current_attributes[key2].label;
                }
                attributes_value[same_attr_counter][current_counter]   = ( typeof  attributes_value[same_attr_counter][current_counter]    != 'undefined' && attributes_value[same_attr_counter][current_counter]  instanceof Array ) ? attributes_value[same_attr_counter][current_counter]  : [];
                var current_attr_value = new Array();
                current_attr_value["label"] = current_attributes[key2].value;
                current_attr_value["id"] = current_attributes[key2].value_id;
                current_attr_value["parent_id"] = current_attributes[key2].id;
                current_attr_value["price"] = current_attributes[key2].price;
                //current_attr_value["sequence_id"] = sequence_id;
                 
                attributes_value[same_attr_counter][current_counter++] = current_attr_value;
                counter++;
            }
          }
          current_counter = 0;
       }
        same_attr_counter++;
    }
    console.error("Test2");
    console.log(attributes_value);
    console.log(attributes_main_value); 
    attributes_main_value = attributes_main_value.reverse();
    console.log(attributes_main_value); 
   configurable_html += '<table id="config_dropdown_list">'; 
   var next_id, isFirst = 1, isExist = 0;
   for (key in attributes_main_value) {
       if (attributes_main_value.hasOwnProperty(key)) {
           try {
              next_key = parseInt(key)+1;
              next_id =  attributes_main_value[next_key].id;
           }
           catch(err) {
               next_id=0;
           }
           console.log("Next Element : "+next_id);
         if(isFirst) {
            configurable_html += '<tr><td>'+attributes_main_value[key].label+'</td><td><select data-role="dropdown" id="config_select_'+attributes_main_value[key].id+'" configid="'+attributes_main_value[key].id+'" onChange="filterConfigDropDown(this, '+attributes_main_value[key].id+', '+next_id+')">';
            isFirst = 0;
               
         }
         else {
            configurable_html += '<tr><td>'+attributes_main_value[key].label+'</td><td><select data-role="dropdown" id="config_select_'+attributes_main_value[key].id+'" configid="'+attributes_main_value[key].id+'" disabled onChange="filterConfigDropDown(this, '+attributes_main_value[key].id+', '+next_id+')">';
         }
         
         configurable_html +=  '<option id="select_none" value="select_none" parent="'+attributes_main_value[key].id+'" selected>'+locale.message.text.select+'</option>';
         var existArray =[], existcounter =0;
         for (key2 in attributes_value) {
            if (attributes_value.hasOwnProperty(key2)) {
                for (key3 in attributes_value[key2]) {
                   if (attributes_value[key2].hasOwnProperty(key3)) {
                      if(attributes_main_value[key].id == attributes_value[key2][key3].parent_id) {
                          isExist = existArray.indexOf(attributes_value[key2][key3].id);
                          console.log("isExist "+isExist);
                          if(isExist >= 0) {
                              var sequencid = $('#config_select_'+attributes_main_value[key].id+' :selected').attr("sequence");
                              sequencid += "_"+attributes_value[key2][key3].parent_id;
                               $('config_select_'+attributes_main_value[key].id+' :selected').attr("sequence", sequencid);
                               console.log(sequencid);
                             //configurable_html +=  '<option id="'+attributes_value[key2][key3].id+'" sequence="'+sequencid+'" parent="'+attributes_value[key2][key3].parent_id+'">'+attributes_value[key2][key3].label+'</option>';
                          }
                          else {
                              var sequencid = attributes_value[key2][key3].parent_id;
                             existArray[existcounter++] = attributes_value[key2][key3].id;
                             configurable_html +=  '<option id="'+attributes_value[key2][key3].id+'" sequence="'+sequencid+'" parent="'+attributes_value[key2][key3].parent_id+'" price="'+attributes_value[key2][key3].price+'">'+attributes_value[key2][key3].label;
                             if(parseFloat(attributes_value[key2][key3].price) > 0) { 
                                configurable_html += ' +'+Currency.getStoreCurrencySymbol()+parseFloat(attributes_value[key2][key3].price).toFixed(2);
                             }
                             configurable_html += '</option>';
                          }
                      }
                   }
                }
            }
         }
         configurable_html += '</select></td></tr>';
      }
      console.log("existArray");
      console.log(existArray);
   }
   configurable_html += "</table>"; 
 // configurable_html += 
     console.log(attributes_main_value);
      console.log(attributes_value);
     console.log("Configurable Product");
     return configurable_html;
 }
  function  filterConfigDropDown(current, attrid, next_id) {
     console.log("Drop Down Changed");
     console.log(attrid);
     console.log(attributes_value);
     
     var next_dropdown_id = "#config_select_"+next_id;
      $(next_dropdown_id).selectmenu("enable");
     var eachoption = next_dropdown_id + ' option';
       $(eachoption).each(function() {
           if($(this).attr('id') !=  "select_none") {
               $(this).css('display', 'none');
           }
       });
       var config_first_element_id = $("#config_dropdown_list select:first").attr('id');
       if($(current).attr('id') == config_first_element_id) {
           var current_option_id = "#"+$(current).attr('id')+' option';
           $(current_option_id).each(function() {
               if($(this).attr('id') == "reset") {
                   renderProductInfo(current_product, 'reset'); 
                   return false;
               }
               else if($(this).attr('id') == "select_none") {
                   $(this).attr('id', "reset");
                    $(this).text("Reset");
                   $(this).val("Reset");
                   $(this).trigger("create");
               }
           });   
       }
       else {
           console.log($(current).attr('id'));
           $(current).selectmenu("disable"); //prop('disabled',true);
           $(current).trigger("create");
       }
        /*$("#config_dropdown_list select").each(function() {
            if(String(config_first_element_id) == String($(this).attr('id'))) {
            
            }            
            else {
                
            }
        });*/
     
     for (key in attributes_value) {
        if (attributes_value.hasOwnProperty(key)) {
            for (key2 in attributes_value[key]) {
                if (attributes_value[key].hasOwnProperty(key2)) {
                    var current_attribute = attributes_value[key][key2];
                    if(current_attribute.parent_id == attrid && current_attribute.id == current.options[current.selectedIndex].id) {
                        setConfigOptions(attrid, next_id, attributes_value[key]);    
                    }
                }
            }
        }
    }
 }
  function setConfigOptions(attrid, next_id, current_attributes) {
      console.log("Current ID "+attrid);    
      console.log("Next ID "+next_id);   
      console.log("Data ");
      
      var next_dropdown_id = "#config_select_"+next_id;
       var eachoption = next_dropdown_id + ' option';
      /*$(next_dropdown_id).selectmenu("enable");
     var eachoption = next_dropdown_id + ' option';
       $(eachoption).each(function() {
           if($(this).attr('id') !=  "select_none") {
               $(this).css('display', 'none');
           }
       });
      */ 
      console.log(current_attributes);   
      console.log("Disable All");
      for (key in current_attributes) {
        if (current_attributes.hasOwnProperty(key)) {
            if(current_attributes[key].parent_id == next_id) {
                 $(eachoption).each(function() {
                  if($(this).attr('id') ==  current_attributes[key].id && current_attributes[key].parent_id == next_id) {
                         console.error(current_attributes[key].id+" => "+current_attributes[key].label);
                        $(this).css('display', 'block');
                      }
                  }) ;
             }
        }
    } 
    $(eachoption+':first-child').attr("selected", "selected");
    $(next_dropdown_id).selectmenu('refresh');
     console.log("Enable Available");
    console.error("All Selected Available Options");
    var config_selected_options = new Array();
    var config_selected_option_counter = 0;
     $('#config_dropdown_list select').each(function(){
        config_selected_options[config_selected_option_counter] = new Object();
        config_selected_options[config_selected_option_counter]["id"] = $('option:selected',$(this)).attr('id');
        config_selected_options[config_selected_option_counter]["parent"] = $('option:selected',$(this)).attr('parent'); 
        config_selected_options[config_selected_option_counter]["value"] = $('option:selected',$(this)).val(); 
        config_selected_option_counter++;
    });
    var flag = validateConfigurableOptions(next_id, config_selected_options, attributes_value); 
  }
  function  validateConfigurableOptions(next_id, config_selected_options, attributes_value) {
     var next_element_id = "config_select_"+next_id;
     console.error("Final Selected Available Options");
    console.log(config_selected_options);
    console.error("Next ID : "+next_id);
    console.log(attributes_value);
    var next_element_id1 = "#"+next_element_id+" option";
    $(next_element_id1).each(function(){
        $(this).prop('disabled', true);
    });
    console.error("------------------------------------");
    for (key1 in attributes_value) {
        if (attributes_value.hasOwnProperty(key1)) {
            outer_break = 0;
            var assume_next = new Object(); 
               for (key2 in attributes_value[key1]) {
                  if (attributes_value[key1].hasOwnProperty(key2)) {
                       if(attributes_value[key1][key2].id == config_selected_options[key2].id || config_selected_options[key2].id == 'select_none') {
                           if(config_selected_options[key2].id != 'select_none') {
                               console.log("Matched "+attributes_value[key1][key2].id+" and "+config_selected_options[key2].id+", Value = "+config_selected_options[key2].value);
                              try {
                                  console.log(attributes_value[key1][parseInt(key2)+1]);
                                  assume_next["id"] = attributes_value[key1][parseInt(key2)+1].id;
                                  assume_next["label"] = attributes_value[key1][parseInt(key2)+1].label;
                                  assume_next["parent"] = attributes_value[key1][parseInt(key2)+1].parent;
                            
                        }
                        catch(err) {
                            console.log(err.message);
                        }                      
                           }
                       }
                       else {
                           outer_break = 1;
                           break;
                       }
                  }
            }
            if(outer_break) {
                continue;
            }
            else {
                 console.log("Matched Selected : "+next_element_id);
                 console.error("####################");
                  
                 $(next_element_id1).each(function(){
                    console.log($(this).attr('id')+" => "+assume_next["id"]);
                  if(String($(this).attr('id')) == String(assume_next["id"])) {
                     console.error("Enable " + $(this).attr('id')+" => "+$(this).val());
                      $(this).prop('disabled', false);
                  }
                  else {
                       console.error("Remove" + $(this).attr('id')+" => "+$(this).val());
                  }
               });
                 console.error(" Next ID= "+assume_next["id"] +" Value = "+assume_next["label"]);   
                 //break; 
            }
        }
    }
    
  }    
function getGropedOptionsHtml(product) {
    var grouped_html = '';
    grouped_html = '<ul data-role="listview" data-icon="none" id="groped_list">';
     for (key in product.products.grouped) {
        if (product.products.grouped.hasOwnProperty(key)) {
            var current_product_item =  product.products.grouped[key];
            console.log(current_product_item);
            grouped_html += '<li><a class="ui-link-inherit no-svg ui-icon-none" rel="#">';
            grouped_html += '<div style="float:left">';
            grouped_html += '<img src="'+current_product_item.image[0]+'" onerror="bad_image(this);">';
            grouped_html += '</div>';
            grouped_html += '<div style="float:left">';
            grouped_html += '<h2>'+current_product_item.general.name+'</h2>';
            if(parseInt(product.stock.is_in_stock) <= 0) {
                 grouped_html += '<span class="out_of_stock">'+locale.message.text['out_of_stock']+'</span>';
                 grouped_html += '<div style="display:none"><input type="text" data-role="spinbox" data-mini="true" data-type="horizontal" name="spin" id="spin" value="0" min="0" max="0" /></div>';
            }
            else if(parseInt(current_product_item.stock.qty) && parseInt(current_product_item.stock.is_in_stock)) {
                grouped_html += '<input type="text" data-role="spinbox" data-mini="true" data-type="horizontal" name="spin" id="spin" value="0" min="0" max="'+parseInt(current_product_item.stock.qty)+'" />';
            }
            else {
                 grouped_html += '<span class="out_of_stock">'+locale.message.text['out_of_stock']+'</span>';
                 grouped_html += '<div style="display:none"><input type="text" data-role="spinbox" data-mini="true" data-type="horizontal" name="spin" id="spin" value="0" min="0" max="0" /></div>';
            }
            grouped_html += '</div>';
            if(current_product_item.price.final == current_product_item.price.regular) {
                grouped_html += '<div style="float:right"><h2 class="product_final_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(current_product_item.price.final).toFixed(2)+'</h2></div>';
            }
            else {
                grouped_html += '<div style="float:right"><span class="product_final_price_color" style="text-decoration: line-through;">'+Currency.getStoreCurrencySymbol()+parseFloat(current_product_item.price.regular).toFixed(2)+'</span><h2 class="product_final_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(current_product_item.price.final).toFixed(2)+'</h2></div>';
            }
            grouped_html +='</a></li>';
        }
    }
    grouped_html +='</ul>';
     return grouped_html;
}
function getBundleOptionsHtml(product){
    var bundle_html = '';
    return bundle_html;
}
function getVirtualOptionsHtml(product){
    var virtual_html = '';
    return virtual_html;
}
function getDownloadableOptionsHtml(product){
    var downloadable_html = '';
    return downloadable_html;
}

  function getProductOptionsHtml(options){
     var custom_options_table_data = '';
     if(options.status) {
         var custom_options_table_data = '<div data-role="collapsible"  data-collapsed="false"><h3>'+locale.message.text.product_options+'</h3><p>';
         custom_options = options["data"];
         custom_options_table_data += '<table id="custom_options_table" width="100%" cellpadding="0" cellspacing="0" class="productDesc">';
        for(var custom_options_counter=0;custom_options_counter<custom_options.length;custom_options_counter++) {
           var current_class_validation = 'notrequired';
           var current_option_type = custom_options[custom_options_counter].custom_option_type;
           if(current_option_type == 'file' || current_option_type == 'date_time'){
           
           }
           else {
              custom_options_table_data += '<tr>';
              custom_options_table_data += '<td>'+custom_options[custom_options_counter].custom_option_name;
              if(current_option_type == 'field' || current_option_type == 'area' ||  current_option_type == 'date' || current_option_type == 'time' ) {
                 custom_options_table_data += ' &nbsp;+'+Currency.getStoreCurrencySymbol()+custom_options[custom_options_counter]["all"].price;
              }
              //apply required flag
              if(custom_options[custom_options_counter].custom_option_is_required == "1") {
                 custom_options_table_data += '<span style="color:red">*</span>';
                 current_class_validation = 'required';
              }
              custom_options_table_data += '</td>';

              //create custom options control
              var current_field_id = ((custom_options[custom_options_counter].custom_option_name+custom_options[custom_options_counter].custom_option_id).replace(/[^A-Z0-9]/ig, "")).toLowerCase();
              var custom_option_id = custom_options[custom_options_counter].custom_option_id;
              //if the control type is drop down                       
              if(custom_options[custom_options_counter].custom_option_type == 'drop_down') {
                 custom_options_table_data += '<td>';
                 var custom_option_values = [];
                 custom_option_values = custom_options[custom_options_counter].custom_option_value_array;
                                       
                    custom_options_table_data += '<select id="'+current_field_id+'" sort_order="'+custom_options[custom_options_counter].sort_order+'" custom_option_id="'+custom_option_id+'" name="'+current_field_id+'" class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation+'">';
                if(current_class_validation == 'required') {
                    custom_options_table_data += '<option disabled selected price="" value="">'+locale.message.text["select"]+'</option>';
                }
                else {
                    custom_options_table_data += '<option selected  price="" sort_order="0" value="">'+locale.message.text["select"]+'</option>';
                }
                 for (var key in custom_option_values){
                    if (custom_option_values.hasOwnProperty(key)) {
                        custom_options_table_data += '<option valueid='+custom_option_values[key].id+' sort_order_parent="'+custom_options[custom_options_counter].sort_order+'" sku="'+custom_option_values[key].sku+'" sort_order="'+custom_option_values[key].sort_order+'" price='+custom_option_values[key].price+'>'+custom_option_values[key].title+' &nbsp;+'+Currency.getStoreCurrencySymbol()+parseFloat(custom_option_values[key].price).toFixed(2)+'</option>';
                    }
                 }
                 custom_options_table_data += '</select>';
                 custom_options_table_data += '</td>';
              }
              //if the control type is textfield
              else if(custom_options[custom_options_counter].custom_option_type == 'field') {
                 custom_options_table_data += '<td>';
                 var custom_option_values = [];
                 custom_option_values = custom_options[custom_options_counter].custom_option_value_array;
                 custom_options_table_data += '<input type="text" id="'+current_field_id+'"  sort_order="'+custom_options[custom_options_counter].sort_order+'" custom_option_id="'+custom_option_id+'" name="'+current_field_id+'" maxlength='+custom_options[custom_options_counter]["all"].max_characters+' price='+custom_options[custom_options_counter]["all"].price+' class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation+'"></input>';
                 custom_options_table_data += '</td>';
              }
              //if the control type is textarea
              else if(custom_options[custom_options_counter].custom_option_type == 'area') {
                 custom_options_table_data += '<td>';
                 var custom_option_values = [];
                 custom_option_values = custom_options[custom_options_counter].custom_option_value_array;
                 custom_options_table_data += '<textarea id="'+current_field_id+'" name="'+current_field_id+'"  custom_option_id="'+custom_option_id+'" sort_order="'+custom_options[custom_options_counter].sort_order+'" price='+custom_options[custom_options_counter]["all"].price+' maxlength='+custom_options[custom_options_counter]["all"].max_characters+' class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation+'" rows="2" cols="4"></textarea>';
                 custom_options_table_data += '</td>';
              }
              //if the control type is radio
              else if(custom_options[custom_options_counter].custom_option_type == 'radio') {
                 custom_options_table_data += '<td>';
                 var custom_option_values = [];
                 custom_option_values = custom_options[custom_options_counter].custom_option_value_array;
                  console.log( custom_option_values);
                 if(current_class_validation == 'notrequired') {
                    custom_options_table_data += '<input type="radio" valueid="0" id="'+current_field_id+key+'" sort_order_parent="0" sort_order ="0" custom_option_id="'+custom_option_id+'" name="'+current_field_id+'" price=0 class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation+'" value="0" /> <label for="'+current_field_id+key+'">None </label>';
                 }
                 for (var key in custom_option_values){
                    if (custom_option_values.hasOwnProperty(key)) {
                        
                        custom_options_table_data += '<input type="radio" valueid='+custom_option_values[key].id+'  sort_order_parent="'+custom_options[custom_options_counter].sort_order+'" sku="'+custom_option_values[key].sku+'" sort_order ="'+custom_option_values[key].sort_order+'" id="'+current_field_id+key+'" custom_option_id="'+custom_option_id+'" name="'+current_field_id+'" price='+custom_option_values[key].price+' class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation+'" value="'+custom_option_values[key].price+'" /> <label for="'+current_field_id+key+'">'+custom_option_values[key].title+' &nbsp;+'+Currency.getStoreCurrencySymbol()+parseFloat(custom_option_values[key].price).toFixed(2)+'</label>';
                    }
                 }
                 custom_options_table_data += '</td>';
              }
              //if the control type is checkbox or multiple select
              else if(custom_options[custom_options_counter].custom_option_type == 'checkbox' || custom_options[custom_options_counter].custom_option_type == 'multiple') {
                 custom_options_table_data += '<td>';
                 var custom_option_values = [];
                 custom_option_values = custom_options[custom_options_counter].custom_option_value_array;
                 for (var key in custom_option_values){
                     if (custom_option_values.hasOwnProperty(key)) {
                        custom_options_table_data += '<input type="checkbox" id="'+current_field_id+key+'" name="'+current_field_id+'" valueid='+custom_option_values[key].id+' sort_order_parent="'+custom_options[custom_options_counter].sort_order+'" sku="'+custom_option_values[key].sku+'" sort_order ="'+custom_option_values[key].sort_order+'" price='+custom_option_values[key].price+' custom_option_id="'+custom_option_id+'" class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation+'" value="'+custom_option_values[key].price+'" /> <label for="'+current_field_id+key+'">'+custom_option_values[key].title+' &nbsp;+'+Currency.getStoreCurrencySymbol()+parseFloat(custom_option_values[key].price).toFixed(2)+'</label>';
                     }
                 }
                 custom_options_table_data += '</td>';
              }
              //if the control type is file
              /*else if(custom_options[custom_options_counter].custom_option_type == 'file') {
                 custom_options_table_data += '<td>';
                 var custom_option_values = [];
                 custom_option_values = custom_options[custom_options_counter].custom_option_value_array;
                 custom_options_table_data += '<input type="file" accept="image/*" capture id="'+current_field_id+'" custom_option_id="'+custom_option_id+'" name="'+current_field_id+'"  price='+custom_options[custom_options_counter]["all"].price+' class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation+'" />';
                 custom_options_table_data += '</td>';
              }*/
              //if the control type is date
              else if(custom_options[custom_options_counter].custom_option_type == 'date') {
                 custom_options_table_data += '<td>';
                 var custom_option_values = [];
                 custom_option_values = custom_options[custom_options_counter].custom_option_value_array;
                 custom_options_table_data += '<input type="text" sort_order="'+custom_options[custom_options_counter].sort_order+'" custom_option_id="'+custom_option_id+'"  id="'+current_field_id+'" name="'+current_field_id+'" onfocus="showDateTimePicker(this, \'date\')" price='+custom_options[custom_options_counter]["all"].price+' class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation +'" />';
                 custom_options_table_data += '</td>';
                    }
              //if the control type is time
              else if(custom_options[custom_options_counter].custom_option_type == 'time') {
                 custom_options_table_data += '<td>';                                                         
                 var custom_option_values = [];
                 custom_option_values = custom_options[custom_options_counter].custom_option_value_array;
                 custom_options_table_data += '<input type="text" custom_option_id="'+custom_option_id+'" sku="'+custom_options[custom_options_counter].sku+'"  sort_order="'+custom_options[custom_options_counter].sort_order+'"  id="'+current_field_id+'" name="'+current_field_id+'" onfocus="showDateTimePicker(this, \'time\')" price='+custom_options[custom_options_counter]["all"].price+' class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation +'"/>';
                 custom_options_table_data += '</td>';
              }
              //if the control type is datetime
              /*else if(custom_options[custom_options_counter].custom_option_type == 'date_time') {
                 custom_options_table_data += '<td>';
                 var custom_option_values = [];
                 custom_option_values = custom_options[custom_options_counter].custom_option_value_array;
                 if(config.app.platform == "ios") {
                    custom_options_table_data += '<input type="text" custom_option_id="'+custom_option_id+'" sku="'+custom_options[custom_options_counter].sku+'"  id="'+current_field_id+'" name="'+current_field_id+'" sort_order="'+custom_options[custom_options_counter].sort_order+'" onfocus="showDateTimePicker(this, \'datetime\')" price='+custom_options[custom_options_counter]["all"].price+' class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation +'" />';
                 }
                 else {
                    custom_options_table_data += '<input type="datetime" custom_option_id="'+custom_option_id+'"  id="'+current_field_id+'" name="'+current_field_id+'" sku="'+custom_options[custom_options_counter].sku+'" price='+custom_options[custom_options_counter]["all"].price+' class="custom_option custom_'+custom_options[custom_options_counter].custom_option_type+' '+current_class_validation +'" />';
                 }
                 custom_options_table_data += '</td>';
              }*/
              else {
                 custom_options_table_data += '<td></td>';
              }
                custom_options_table_data += '</tr>';
           }
       }
       custom_options_table_data +='<tr><td id="finalprice" class="product_price_color">'+locale.message.text.price+' : '+Currency.getStoreCurrencySymbol()+'0.00</td><td><button id="getcustomprice" onclick="calculateCustomPrice()" data-theme="b"><span>'+locale.message.button["get_price"]+'</span></button></td></tr>';
       custom_options_table_data += '</table></p></div>';
     }
     return   custom_options_table_data;
 }   
  
function getProductImageSlider(id,  name, images) {
    var length = images.length;
    var slider = '';
    if(length) {
       for(var i=0;i<length;i++) {
          slider += '<div class="item" onClick=\'productImageFullPreview("'+id+'", "'+Base64.encode(name)+'","'+Base64.encode(images[i])+'")\'><img src="'+images[i]+'" onerror="this.src=\'media/images/default/product_default_image.png\'"/></div>';
       }
    }
    else {
          slider += '<div class="item"> <img src="media/images/default/product_default_image.png" onerror="this.src=\'media/images/default/product_default_image.png\'"/></div>';
    }
    return slider;
}

  
/*
 *Function to fetch features product list
 */
function fetchFeaturesProduct_preview() {
    $.getJSON(""+config.url.api+"?callback=?"+"&store="+config.store.default+"&service=getFeaturedProducts&currency="+ Currency.getStoreCurrency(),
        function (response) {
            var featured_pro="";
            var i=0;
            var stock_status="";
            if(response.status[0].Show_Status == "1"){
                console.log(response.products_list.length);
                while(i < response.products_list.length){
                    if(response.products_list[i].is_stock_status == "1"){
                        stock_status = "1";
                    }
                    else{
                        stock_status = "0";
                    }
                    var pid=response.products_list[i].id+"stock_status"+stock_status;
                    if(parseFloat(response.products_list[i].special_price) > 0) {
                        featured_pro += '<div class="item"><div style="height:140px"><img src="'+response.products_list[i].image+'" onerror="this.src=\'media/images/default/product_default_image.png\'"/></div><h2 class="producth2">'+response.products_list[i].name+'</h2><h4 class="producth4"><span class="product_special_price_color" style="text-decoration: line-through;" class="">'+Currency.getStoreCurrencySymbol()+parseFloat(response.products_list[i].price.replace(",","")).toFixed(2)+'</span>&nbsp;<span class="product_price_color" style="font-weight:bold;">'+Currency.getStoreCurrencySymbol()+parseFloat(response.products_list[i].special_price).toFixed(2)+'</span></h4><p class="cart_Button secondary_btn_foreground secondary_btn_background"  >'+locale.message.button["details"]+'</p></div>';
                    }
                    else {
                        featured_pro += '<div class="item"><div style="height:140px" ><img src="'+response.products_list[i].image+'" onerror="this.src=\'media/images/default/product_default_image.png\'"/></div><h2 class="producth2">'+response.products_list[i].name+'</h2><h4 class="producth4 product_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(response.products_list[i].price.replace(",","")).toFixed(2)+'</h4><p class="cart_Button secondary_btn_foreground secondary_btn_background"  >'+locale.message.button["details"]+'</p></div>';
                    }
                    i++;
                 }
                 $("#owl-demo").html(featured_pro);
                 $("#owl-demo").trigger("create");
             }
             else{
                 $("#owl-demo").hide();
             }
             var owl = $("#owl-demo");
             owl.owlCarousel({
                 items : 3, //10 items above 1000px browser width
                 itemsDesktop : [1000,3], //5 items between 1000px and 901px
                 itemsDesktopSmall : [900,3], // betweem 900px and 601px
                 itemsTablet: [600,2], //2 items between 600 and 0
                 itemsMobile : false,  // itemsMobile disabled - inherit from itemsTablet option
                 navigation : false,
                 pagination: true ,
                 autoPlay:true
             });
         });
}

/*
*Function to fetch features product list
*/
function fetchFeaturesProduct() {
    
    var db = dbConnection();
    var current_time = new Date().getTime();
    var key = 'getFeaturedProducts';
    db.transaction(function(tx) {
                   //tx.executeSql('DROP TABLE IF EXISTS mofluid_cache');
                tx.executeSql('CREATE TABLE IF NOT EXISTS mofluid_cache (key text, data text, timestamp text)');
                   
                   tx.executeSql("select * from mofluid_cache where key='getFeaturedProducts';", [], function(tx, resdata) {
                                 
                                 if (resdata.rows.length > 0) { //If cache_table is empty
                                 
                                 var diff=current_time - resdata.rows.item(0).timestamp;
                                 
                                 //if the cache time expire then this code wiil execute
                                    if (diff > cache_time) {
                                 
                                 
                                            //delete the old row of storedetails data if cache time expire
                                            tx.executeSql("DELETE FROM mofluid_cache WHERE key=?", ["getFeaturedProducts"],
                                               function(tx, result) {
                                               });// end deletion
                                 var store_webservice = ""+config.url.api+"?callback=?"+"&store="+config.store.default+"&service=getFeaturedProducts&currency="+ Currency.getStoreCurrency();
                                 $.ajax({
                                        url: store_webservice,
                                        type: "get",
                                        dataType: "jsonp",
                                        async: false,
                                        error: function(jqXHR, textStatus, errorThrown) {
                                        console.log("Cant load homepage webservice data");
                                        console.log(textStatus);
                                        console.log(errorThrown);
                                        alert("Internal server Error! \n please try after some time.")
                                        },
                                        beforeSend: function(){
                                        console.log("Before Store Webservice");
                                        },
                                        error: function(){
                                        if (config.data[0].platform == 'ios' || config.data[0].platform == 'android') {
                                        navigator.notification.alert(locale.message.alert["try_again"], function() {}, config.data[0].app_name, locale.message.button["close"]);
                                        }
                                        else {
                                        alert(locale.message.alert["try_again"])
                                        }
                                        console.log("Error  on Webservice");
                                        },
                                        complete: function(){
                                        console.log("Complete Webservice");
                                        },
                                        success: function( response ){
                                        //Insert data in cache table
                                        db.transaction(function(tx) {
                                                       tx.executeSql("INSERT INTO mofluid_cache (key,data,timestamp) VALUES (?,?,?)", ["" + key + "", "" + JSON.stringify(response) + "", "" + current_time + ""], function(tx, res) {}, function(e) {
                                                                     console.log("ERROR in insert product: " + e);
                                                                     });
                                                       
                                                       });
                                        //End of insert data in cache table
                                        
                                        
                                        var featured_pro="";
                                        var i=0;
                                        var stock_status="";
                                        if(response.status[0].Show_Status == "1"){
                                            console.log(response.products_list.length);
                                            while(i < response.products_list.length){
                                                if(response.products_list[i].is_stock_status == "1"){
                                                stock_status = "1";
                                                }
                                                else{
                                                stock_status = "0";
                                                }
                                                var pid=response.products_list[i].id+"stock_status"+stock_status;
                                                if(parseFloat(response.products_list[i].special_price) > 0) {
                                                featured_pro += '<div class="discount-set"><div class="product-box"><img class="img-responsive" src="'+response.products_list[i].image+'" width="112" height="112" alt="img" onerror="this.src=\'media/images/default/product_default_image.png\'"/> <h2>'+response.products_list[i].name+'</h2><div class="price"><strike>'+Currency.getStoreCurrencySymbol()+' '+parseFloat(response.products_list[i].price.replace(",","")).toFixed(2)+'</strike><span class="right-price">'+Currency.getStoreCurrencySymbol()+' '+parseFloat(response.products_list[i].special_price).toFixed(2)+'</span></div></div></div>';
                                                }
                                                else {
                                                featured_pro += '<div class=" discount-set"><div class="product-box"><img class="img-responsive" src="'+response.products_list[i].image+'" width="112" height="112" alt="img" onerror="this.src=\'media/images/default/product_default_image.png\'"/> <h2>'+response.products_list[i].name+'</h2><div class="price"><span class="right-price">'+Currency.getStoreCurrencySymbol()+' '+parseFloat(response.products_list[i].price.replace(",","")).toFixed(2)+'</span></div></div></div>';
                                                }
                                                i++;
                                            }
                                            $("#owl-demo").html(featured_pro);
                                            $("#owl-demo").trigger("create");
                                        }
                                        else{
                                            $("#feature-product").hide();
                                        }
                                        }
                                        });//End ajax call
                                 
                                 
                                 
                                        } // end of (if the cache time expire then this code wiil execute) comment
                                        else // if time is not expire
                                        {
                                           
                                             var response = JSON.parse(resdata.rows.item(0).data);
                                             var featured_pro="";
                                             var i=0;
                                             var stock_status="";
                                             if(response.status[0].Show_Status == "1"){
                                             console.log(response.products_list.length);
                                             while(i < response.products_list.length){
                                             if(response.products_list[i].is_stock_status == "1"){
                                             stock_status = "1";
                                             }
                                             else{
                                             stock_status = "0";
                                             }
                                             var pid=response.products_list[i].id+"stock_status"+stock_status;
                                             if(parseFloat(response.products_list[i].special_price) > 0) {
                                             featured_pro += '<div class="discount-set"><div class="product-box"><img class="img-responsive" src="'+response.products_list[i].image+'" width="112" height="112" alt="img" onerror="this.src=\'media/images/default/product_default_image.png\'"/> <h2>'+response.products_list[i].name+'</h2><div class="price"><strike>'+Currency.getStoreCurrencySymbol()+' '+parseFloat(response.products_list[i].price.replace(",","")).toFixed(2)+'</strike><span class="right-price">'+Currency.getStoreCurrencySymbol()+' '+parseFloat(response.products_list[i].special_price).toFixed(2)+'</span></div></div></div>';
                                             }
                                             else {
                                             featured_pro += '<div class=" discount-set"><div class="product-box"><img class="img-responsive" src="'+response.products_list[i].image+'" width="112" height="112" alt="img" onerror="this.src=\'media/images/default/product_default_image.png\'"/> <h2>'+response.products_list[i].name+'</h2><div class="price"><span class="right-price">'+Currency.getStoreCurrencySymbol()+' '+parseFloat(response.products_list[i].price.replace(",","")).toFixed(2)+'</span></div></div></div>';
                                             }
                                             i++;
                                             }
                                             $("#owl-demo").html(featured_pro);
                                             $("#owl-demo").trigger("create");
                                             }
                                             else{
                                             $("#feature-product").hide();
                                             }
                                        } // end of (if time is not expire) comment
                                 }
                                 else//cache table is empty
                                 {
                                 var store_webservice = ""+config.url.api+"?callback=?"+"&store="+config.store.default+"&service=getFeaturedProducts&currency="+ Currency.getStoreCurrency();
                                 $.ajax({
                                        url: store_webservice,
                                        type: "get",
                                        dataType: "jsonp",
                                        async: false,
                                        error: function(jqXHR, textStatus, errorThrown) {
                                        console.log("Cant load homepage webservice data");
                                        console.log(textStatus);
                                        console.log(errorThrown);
                                        alert("Internal server Error! \n please try after some time.")
                                        },
                                        beforeSend: function(){
                                        console.log("Before Store Webservice");
                                        },
                                        error: function(){
                                        if (config.data[0].platform == 'ios' || config.data[0].platform == 'android') {
                                        navigator.notification.alert(locale.message.alert["try_again"], function() {}, config.data[0].app_name, locale.message.button["close"]);
                                        }
                                        else {
                                        alert(locale.message.alert["try_again"])
                                        }
                                        console.log("Error  on Webservice");
                                        },
                                        complete: function(){
                                        console.log("Complete Webservice");
                                        },
                                        success: function( response ){
                                        //Insert data in cache table
                                        db.transaction(function(tx) {
                                                       tx.executeSql("INSERT INTO mofluid_cache (key,data,timestamp) VALUES (?,?,?)", ["" + key + "", "" + JSON.stringify(response) + "", "" + current_time + ""], function(tx, res) {}, function(e) {
                                                                     console.log("ERROR in insert product: " + e);
                                                                     });
                                                       
                                                       });
                                        //End of insert data in cache table
                                        
                                        
                                        var featured_pro="";
                                        var i=0;
                                        var stock_status="";
                                        if(response.status[0].Show_Status == "1"){
                                        console.log(response.products_list.length);
                                        while(i < response.products_list.length){
                                        if(response.products_list[i].is_stock_status == "1"){
                                        stock_status = "1";
                                        }
                                        else{
                                        stock_status = "0";
                                        }
                                        var pid=response.products_list[i].id+"stock_status"+stock_status;
                                        if(parseFloat(response.products_list[i].special_price) > 0) {
                                        featured_pro += '<div class="item"><div style="height:140px" onclick="redirectToproductdetail(\''+pid+'\')"><img src="'+response.products_list[i].image+'" onerror="this.src=\'media/images/default/product_default_image.png\'"/></div><h2 class="producth2">'+response.products_list[i].name+'</h2><h4 class="producth4"><span class="product_special_price_color" style="text-decoration: line-through;" class="">'+Currency.getStoreCurrencySymbol()+parseFloat(response.products_list[i].price.replace(",","")).toFixed(2)+'</span>&nbsp;<span class="product_price_color" style="font-weight:bold;">'+Currency.getStoreCurrencySymbol()+parseFloat(response.products_list[i].special_price).toFixed(2)+'</span></h4><p class="cart_Button secondary_btn_foreground secondary_btn_background" onclick="redirectToproductdetail(\''+pid+'\')" >'+locale.message.button["details"]+'</p></div>';
                                        }
                                        else {
                                        featured_pro += '<div class="item"><div style="height:140px" onclick="redirectToproductdetail(\''+pid+'\')"><img src="'+response.products_list[i].image+'" onerror="this.src=\'media/images/default/product_default_image.png\'"/></div><h2 class="producth2">'+response.products_list[i].name+'</h2><h4 class="producth4 product_price_color">'+Currency.getStoreCurrencySymbol()+parseFloat(response.products_list[i].price.replace(",","")).toFixed(2)+'</h4><p class="cart_Button secondary_btn_foreground secondary_btn_background" onclick="redirectToproductdetail(\''+pid+'\')" >'+locale.message.button["details"]+'</p></div>';
                                        }
                                        i++;
                                        }
                                        $("#owl-demo").html(featured_pro);
                                        $("#owl-demo").trigger("create");
                                        }
                                        else{
                                        $("#owl-demo").hide();
                                        }
                                        var owl = $("#owl-demo");
                                        owl.owlCarousel({
                                                        items : 3, //10 items above 1000px browser width
                                                        itemsDesktop : [1000,3], //5 items between 1000px and 901px
                                                        itemsDesktopSmall : [900,3], // betweem 900px and 601px
                                                        itemsTablet: [600,2], //2 items between 600 and 0
                                                        itemsMobile : false,  // itemsMobile disabled - inherit from itemsTablet option
                                                        navigation : false,
                                                        pagination: true ,
                                                        autoPlay:true
                                                        });
                                        }
                                        });//End ajax call
                                 }//end of cache table is empty comment
                        });
        });
    
}

function socialShareProduct(name, encodedurl) {
   var url = Base64.decode(encodedurl);
    var name = Base64.decode(name);
   var message = config.app.name;
   message += ' '+name;
   try {
        window.plugins.socialsharing.share(message, null, null, url);
    }
    catch(exc) {
        message += ' '+url; 
         try {
            window.plugins.socialsharing.share(message);
        }
        catch(err) {
            console.log("Social Share Error "+err.message);
        }
    }
}

function proceedToCart() { 
    console.log("Proceed Clicked..."); 
    var options = CartProduct.validate(current_product);
    console.log("Validation Status : "); 
    console.log(options);
    
    /*Section to validate if product has custom options or not if yes then validate if user filled the required field and */
    var hascustomoption;
    try {
        hascustomoption = current_product.custom.options.data.length;
    }
    catch(err) {
        hascustomoption = 0;
    }
    if(hascustomoption) {
        var customoption_val = calculateCustomPrice();
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(customoption_val);
        if(customoption_val.error == 0){
            var status = Cart.add(current_product, customoption_val);
            console.log(status);
            console.log("Final Cart");
            console.log(Cart.getCartFromStorage());
            redirectTopage('cart.html');
        }
    }
    else {
        if(options) {
            var status = Cart.add(current_product, options);
            if(status) { 
                console.log(Cart.getCartFromStorage());
                redirectTopage('cart.html');  
            }
        }
        else{
            if (config.app.platform == 'ios' || config.app.platform == 'android') {
                navigator.notification.alert(locale.message.alert.configurable_options_validation, function() {}, config.app.name, locale.message.button["close"]);
            }
            else {
                alert(locale.message.alert.configurable_options_validation);
            }
        }
    }
}

function addToCart(element,selectedProduct) {     
    val = element.value;
    selectedProduct = JSON.parse(Base64.decode(selectedProduct));
    if(val == 0)
    {//remove the producat


        var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
        var index = 0;
        var CurrentCart = CompleteCart["products"];
        var UpdatedCart = new Array();
        for (key in CurrentCart) {
                if (CurrentCart.hasOwnProperty(key)) {  
                    if (CurrentCart[key].id == parseInt(selectedProduct['id'])) {
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
        $("#cartProducts").html(Cart.getTotalQuantity());
    }
    else 
    {
      tempAddToCart(element,selectedProduct);  
    }
}

function tempAddToCart(element,selectedProduct) {

  var current_productId = parseInt(selectedProduct['id']);
  current_product = selectedProduct;
  
  if(localStorage[config.app.storage_key+"_cart"])
  {
    var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
  }
  var alreadyAdded = false;
  if(CompleteCart && CompleteCart["products"]) {
    $(CompleteCart["products"]).each(function(index,value){
      if(parseInt(value['id']) == current_productId && value['quantity']){
          var CompleteCart = JSON.parse(Base64.decode(localStorage[config.app.storage_key+"_cart"]));
         
         CompleteCart["products"][index].quantity = element.value;
         localStorage[config.app.storage_key+"_cart"] = Base64.encode(JSON.stringify(CompleteCart));

         $("#cartProducts").html(Cart.getTotalQuantity());
         alreadyAdded = true;
         return false;
      }
    });
  }
  if(alreadyAdded == false){
    // new in cart
    var options = CartProduct.validate(current_product);


    /*Section to validate if product has custom options or not if yes then validate if user filled the required field and */
    var hascustomoption;
    try {
        hascustomoption = current_product.custom.options.data.length;
    }
    catch(err) {
        hascustomoption = 0;
    }
    if(hascustomoption) {
        var customoption_val = calculateCustomPrice();
        if(customoption_val.error == 0){
            var status = Cart.add(current_product, customoption_val);
            console.log(status);
            console.log("Final Cart");
            console.log(Cart.getCartFromStorage());
            redirectTopage('cart.html');
        }
    }
    else {
        if(options) {
            var status = Cart.add(current_product, options);
            if(status) { 
                console.log(Cart.getCartFromStorage());
                //redirectTopage('cart.html');  
            }
        }
        else{
            if (config.app.platform == 'ios' || config.app.platform == 'android') {
                navigator.notification.alert(locale.message.alert.configurable_options_validation, function() {}, config.app.name, locale.message.button["close"]);
            }
            else {
                alert(locale.message.alert.configurable_options_validation);
            }
        }
    }
  }
}

function getConfigurableAttributes(result) {
 var attributeId = 0;
 var configLable = [];
 var imageUrl = null;
 for(i in result['attribute']) {
  if(!isNaN(parseInt(i))){
    var itrate = result['attribute'][i];
    for(j in itrate) {
        var simProduct = itrate[j];
        if(attributeId == 0)
            attributeId = simProduct['data']['attribute_id'];
        if(attributeId == simProduct['data']['attribute_id']) {
            configLable.push({'label':simProduct['data']['label'],'product':simProduct});
            imageUrl = imageUrl ? imageUrl : simProduct['image'];
            break;
        }
        if(i == 0 && j==0) 
            break;
    }
  }
 }
 
 return {'configLable':configLable,'imageUrl':imageUrl};
}
function getConfigurableAttributesHtml(attributes, totalProductInCart) {
  var sizeHtml = '', control_button_html = '';
  var displayProductAlreadyOrderedSize = 0;
  var found = false,hasDisplayed = false;
  for(i in attributes) {
    $(totalProductInCart).each(function(v, k) {
       if (parseInt(k['id']) == parseInt(attributes[i]['product']["id"])) {
          displayProductAlreadyOrderedSize = k['id'];
          found = true;
          return false;
       }
    });
    if(found)
      break;
  }
  for(i in attributes) {
    var alreadyOrder = 0,style='display:none;',active_cls='';
    $(totalProductInCart).each(function(v, k) {
       if (parseInt(k['id']) == parseInt(attributes[i]['product']["id"]))
           alreadyOrder = k['quantity'];
       if(hasDisplayed){
        }
       else if(displayProductAlreadyOrderedSize == parseInt(k['id']) || (displayProductAlreadyOrderedSize == 0 && i == 0))  {
          style = '';
          active_cls = ' active-config-lbl';
          hasDisplayed = true;
       }
    });
    if((typeof totalProductInCart == 'undefined' || totalProductInCart.length == 0)  && i == 0){
          style = '';
          active_cls = ' active-config-lbl';
    }
    control_button_html += '<div id="control-btn-'+attributes[i]['product']['id']+'" class="cart_product_item_config_quant" style="'+style+'"><input type="text" class="myinputclassspin " readonly data-role="spinbox" data-mini="true" data-type="horizontal" name="spin" id="cart_item_quantity_' + attributes[i]['product']['id'] + '" value="' + alreadyOrder + '" min="0" max="' + parseInt(attributes[i]['product']["stock_quantity"]) + '" onChange="addToCart(this,\'' +Base64.encode(JSON.stringify(attributes[i]['product'])) + '\')"/></div>';    
    sizeHtml += '<span class="config-lbl'+active_cls+'" onclick="toggleQty(this,'+attributes[i]['product']['id']+',\''+attributes[i]['product']['spclprice']+'\',\''+attributes[i]['product']['price']+'\')">'+attributes[i]['label']+'</span>';  
  }
  if(sizeHtml)
    sizeHtml = '<div class="size-config-wrp">'+sizeHtml+'</div>';
  return {'sizeHtml':sizeHtml,'controlHtml':control_button_html};
}
function toggleQty(ele,id,spclprice,price){
  var parentSib = $(ele).parent().siblings();
  parentSib.find('.cart_product_item_config_quant').hide();

  $('#control-btn-'+id).show();
  $(ele).siblings().removeClass('active-config-lbl');
  $(ele).addClass('active-config-lbl');

  if(spclprice > 0 && spclprice != price){
    parentSib.find('.product_special_price_color').show();
    parentSib.find('.product_special_price_color').html(Currency.getStoreCurrencySymbol() + price + ' ');
  } else {
    parentSib.find('.product_special_price_color').hide();
  }
  parentSib.find('.product_price_color').html( Currency.getStoreCurrencySymbol() + spclprice );
}
var CartProduct = new function() {
    this.validate = function (current_product) {
        var isValid = 1;
        console.log("Validate Product...");
        console.log(current_product);
        switch(current_product.type) {
            case 'configurable':
                isValid = validateConfigurable();
                break;
           
            case 'grouped':
                isValid = validateGrouped();
                break;
           
            case 'bundle':
                isValid = validateBundle();
                break;
           
            case 'virtual':
                isValid = validateVirtual();
                break;
           
            case 'downloadable':
                isValid = validateDownloadable();
                break;
           
            default:
                isValid = validateSimple();
                break;
        }
        return isValid;
    };
    
    validateSimple = function () {
        console.log("Simple Product...");
        var isValid = 1;
        return isValid;
    };
    
    validateConfigurable = function () {
        console.log("Configurable Product...");
        var isValid = 1;
        var super_attribute_arr = new Array();
        var applied_product;
        var super_attribute_label = '';
        $("#config_dropdown_list select").each(function() {
            if($('option:selected',$(this)).attr('id') == "" || $('option:selected',$(this)).attr('id') == "select_none" || $('option:selected',$(this)).attr('id') == "reset" || $('option:selected',$(this)).attr('id') == null) {
                isValid = 0;
                return false;
            }
            else {
                var super_attribute = new Object();
                super_attribute["id"] = parseInt($(this).attr('configid'));
                super_attribute["value"] = parseInt($('option:selected',$(this)).attr('id'));
                super_attribute_label += $('option:selected',$(this)).val()+", ";
                super_attribute_arr.push(super_attribute);
            }
            console.log($(this).val());
        });
         
        if(isValid) {
            var configchilds = current_product.products.associated.childs;
            for (var key1 in configchilds){
               if (configchilds.hasOwnProperty(key1)) {
                   isMatch = 1;
                   var configattr =  configchilds[key1].attributes.options;
                   for (var key2 in configattr){
                        if (configattr.hasOwnProperty(key2)) {
                            if(super_attribute_arr[key2].id == configattr[key2].id && super_attribute_arr[key2].value == configattr[key2].value_id) {
                                continue;
                            }
                            else {
                                isMatch = 0;
                                break;
                            }
                        }
                   }
                   if(isMatch) {
                       applied_product = configchilds[key1];
                   } 
              }
           }    
        }
        else{
            return false;
        }
        var configurable_options = new Object();
        configurable_options["attributes"] = new Object();
        configurable_options["attributes"]["label"] = super_attribute_label;
        configurable_options["attributes"]["value"] = super_attribute_arr;
        configurable_options["product"] = applied_product;
        return configurable_options;
    };
    validateGrouped = function () {
        var counter = 0;
        var isValid = 0;
        var options = new Array();
        $("#groped_list input").each(function(){
                                    var isValidCurrent = 0;
                                     try {
                                     var current_selected_quantity = $(this).val();
                                     options[counter] = new Object();
                                     options[counter]["quantity"] = current_selected_quantity;
                                     options[counter]["isValid"] = isValidCurrent;
                                     if(current_selected_quantity > 0) {
                                     isValid = 1;
                                     
                                     options[counter]["isValid"] = 1;
                                     
                                     }
                                     
                                     else {
                                     
                                     options[counter]["quantity"] = 0;
                                     
                                     options[counter]["isValid"] = 0;
                                     
                                     }
                                     
                                     } catch(err) {
                                     
                                     options[counter]["quantity"] = 0;
                                     
                                     options[counter]["isValid"] = 0;
                                     
                                     }
                                     
                                     counter++;
                                     
                                     });
        
        if(isValid) {
            
            return options;
            
        }
        
        return isValid;
        
    };
    

    validateBundle = function () {
        console.log("Bundle Product...");
    };
    validateDownloadable = function () {
        console.log("Downloadable Product...");
    };
    validateVirtual = function () {
        console.log("Virtual Product...");
    };
}

function filterQuoteProducts(quote_products) {
    var products = new Array();
    for (key in quote_products) {
        if (quote_products.hasOwnProperty(key)) {
            products[key] = new Object();
            products[key].id= quote_products[key].id;
            products[key].quantity= quote_products[key].quantity;
            products[key].sku= quote_products[key].sku;
            products[key].type= quote_products[key].type;
            products[key].options= quote_products[key].options;
        }
     }
     return products;
}

function reverseArray(array)
{
    var newarray = new Array();
    var arr_length = array.length;
    for (var key=arr_length-1; key>=0; key--) {
         newarray[key] = array[arr_length-1-key];
    }
    return newarray;
}



/**
 *Function calculate additional price depending on custom options
 *
 */
function calculateCustomPrice(){
    var total_additional_price = 0;
    var hascustomoption = 0;
    console.log(current_product);
    try {
        try {
            hascustomoption = current_product.custom.options.data.length;
        }
        catch(err) {
            hascustomoption = 0;
        }
        if(hascustomoption) {
            var custom_options_results = validateCustomOptions();
        }
        else {
            var custom_options_results = [];
            custom_options_results["error"] = 0;
            custom_options_results["customoptions"] = '';
            custom_options_results["custom_choice"] = '';
        }
        console.log(custom_options_results);
        if(custom_options_results["error"] == 0) {
            total_additional_price = parseFloat(custom_options_results["total_additional_price"]).toFixed(2);
            
            var productrealprice = parseFloat($("#propricehidden").val()).toFixed(2);
            var updated_product_price = (parseFloat(productrealprice) + parseFloat(total_additional_price)).toFixed(2);
            
            var productcrossprice = parseFloat($("#specialpricehidden").val()).toFixed(2);
            var updated_product_price_cross = (parseFloat(productcrossprice) + parseFloat(total_additional_price)).toFixed(2);
            
            $("#finalprice").html('Price ('+ Currency.getStoreCurrencySymbol() +productrealprice+' + '+ Currency.getStoreCurrencySymbol() +total_additional_price+') : '+ Currency.getStoreCurrencySymbol() +updated_product_price);
            return custom_options_results;
        }
        else{
            var custom_options_results = [];
            custom_options_results["error"] = 1;
            custom_options_results["customoptions"] = '';
            custom_options_results["custom_choice"] = '';
            return custom_options_results;
        }
    }
    catch(err) {
        console.log(err.message);
    }
}

/**
 *Function validate custom options
 *
 */

function validateCustomOptions() {
    var my_custom_choice = '';
    var total_custom_option_validation_error = 0;
    var total_additional_price = 0;
    var custom_options_results = [];
    $('#custom_options_table :input').each(function(){
        var element_type = $(this).attr("type");
        if(element_type == 'undefined' || element_type == null || element_type == '') {
            element_type = $(this).prop('tagName').toLowerCase();
            if(element_type == 'undefined' || element_type == null || element_type == '') {
                element_type = $(this)[0].tagName.toLowerCase();
            }
        }
        custom_option_id = $(this).attr("custom_option_id");
        if($(this).hasClass("required")) {
            if(element_type == 'text' || element_type == 'textarea') {
                var curr_value = $(this).val().trim();
                if(curr_value == null || curr_value == '' || curr_value == 'undefined') {
                    if (config.app.platform=='ios' || config.app.platform=='android') {
                        navigator.notification.alert(locale.message.alert["required_validation"],function () {},config.app.name, locale.message.button["close"]);
                    }
                    else{
                        alert(locale.message.alert["required_validation"]);
                    }
                    total_custom_option_validation_error++;
                    $(this).focus();
                    return false;
                }
                my_custom_choice += ' '+curr_value;
                total_additional_price += parseFloat($(this).attr("price").replace(",",""));
                custom_options_results[custom_option_id] = curr_value;
                console.log('Text Box Adding Price  : '+$(this).attr("price").replace(",","")+' Additional Total : '+total_additional_price);
            }
            else if(element_type == 'datetime') {
                var curr_value = $(this).val().trim();
                if(curr_value == null || curr_value == '' || curr_value == 'undefined') {
                    if (config.app.platform=='ios' || config.app.platform=='android') {
                        navigator.notification.alert(locale.message.alert["required_validation"],function () {},config.app.name, locale.message.button["close"]);
                    }
                    else{
                        alert(locale.message.alert["required_validation"]);
                    }
                    total_custom_option_validation_error++;
                    $(this).focus();
                    return false;
                }
                my_custom_choice += ' '+curr_value;
                total_additional_price += parseFloat($(this).attr("price").replace(",",""));
                custom_options_results[custom_option_id] = curr_value;
                console.log('Date Time Adding Price  : '+$(this).attr("price").replace(",","")+' Additional Total : '+total_additional_price);
            }
            else if(element_type == 'select') {
                try {
                    var curr_value = $(this).children("option").filter(":selected").text().trim();
                }
                catch(err) {
                    console.error('Select Error '.err.message);
                }
                if(curr_value == locale.message.text["select"] || curr_value == null || curr_value == '' || curr_value == 'undefined') {
                    if (config.app.platform=='ios' || config.app.platform=='android') {
                        navigator.notification.alert(locale.message.alert["required_validation"],function () {},config.app.name, locale.message.button["close"]);
                    }
                    else{
                        alert(locale.message.alert["required_validation"]);
                    }
                                    
                    total_custom_option_validation_error++;
                                                 
                    $(this).focus();
                    return false;
                }
                                                 
                custom_options_results[custom_option_id] = $(this).children("option").filter(":selected").attr("valueid");
                curr_label = curr_value.split('+');
                my_custom_choice += ' '+curr_label[0];
                total_additional_price += parseFloat($(this).children("option").filter(":selected").attr("price").replace(",",""));
                console.log('Select Adding Price  : '+$(this).children("option").filter(":selected").attr("price").replace(",","")+' Additional Total : '+total_additional_price);
            }
            else if(element_type == 'radio') {
                var ele_name = $(this).attr("name");
                if($('input[name='+ele_name+']:checked').length<=0) {
                    if (config.app.platform=='ios' || config.app.platform=='android') {
                        navigator.notification.alert(locale.message.alert["required_validation"],function () {},config.app.name, locale.message.button["close"]);
                    }
                    else{
                        alert(locale.message.alert["required_validation"]);
                    }
                    total_custom_option_validation_error++;
                    $(this).focus();
                    return false;
                }
                                                 
                $('input[name='+ele_name+']:checked').each(function(){
                    custom_options_results[custom_option_id] = new Array();
                    custom_options_results[custom_option_id].push($(this).attr("valueid"));
                    my_custom_choice += ' '+$(this).attr("value");
                    var curr_label = $("label[for='"+$(this).attr("id")+"']").text().split('+');
                    console.log(curr_label);
                    my_custom_choice += ' '+curr_label[0];
                });
            }
            else if(element_type == 'checkbox') {
                var ele_name = $(this).attr("name");
                var len = $('input[name='+ele_name+']:checked').length;
                if(len<=0) {
                    if (config.app.platform=='ios' || config.app.platform=='android') {
                        navigator.notification.alert(locale.message.alert["required_validation"],function () {},config.app.name, locale.message.button["close"]);
                    }
                    else{
                        alert(locale.message.alert["required_validation"]);
                    }
                    total_custom_option_validation_error++;
                    $(this).focus();
                    return false;
                }
                else {
                    $('input[name='+ele_name+']:checked').each(function(){
                        try {
                            var inarray_flag = $.inArray($(this).attr("valueid"), custom_options_results[custom_option_id]);
                            if(inarray_flag == -1) {
                                try {
                                    custom_options_results[custom_option_id].push($(this).attr("valueid"));
                                    total_additional_price += parseFloat($(this).attr("price").replace(",",""));
                                }
                                catch(err) {
                                    custom_options_results[custom_option_id] = new Array();
                                    custom_options_results[custom_option_id].push($(this).attr("valueid"));
                                    total_additional_price += parseFloat($(this).attr("price").replace(",",""));
                                    console.log('Check Price : '+parseFloat($(this).attr("price").replace(",","")));
                                    
                                }
                                console.log('Checkbox Adding Price  : '+$(this).attr("price").replace(",","")+' Additional Total : '+total_additional_price);
                                var curr_label = $("label[for='"+$(this).attr("id")+"']").split('+');
                                my_custom_choice += ' '+curr_label[0];
                            }
                            else {
                                    //do nothing
                            }
                        }
                        catch(err) {
                            console.log(err.message);
                        }
                    });
                }
            }
        }
        else {
            if(element_type == 'text' || element_type == 'textarea') {
                var curr_value = $(this).val().trim();
                if(curr_value == null || curr_value == '' || curr_value == 'undefined') {

                }
                else {
                    custom_options_results[custom_option_id] = curr_value;
                    total_additional_price += parseFloat($(this).attr("price").replace(",",""));
                    my_custom_choice += ' '+curr_value;
                }
                console.log('Text2 Adding Price  : '+$(this).attr("price").replace(",","")+' Additional Total : '+total_additional_price);
            }
            else if(element_type == 'datetime') {
                var curr_value = $(this).val().trim();
                if(curr_value == null || curr_value == '' || curr_value == 'undefined') {

                }
                else {
                    custom_options_results[custom_option_id] = curr_value;
                    my_custom_choice += ' '+curr_value;
                    total_additional_price += parseFloat($(this).attr("price").replace(",",""));
                }
                console.log('Date Time2 Adding Price  : '+$(this).attr("price").replace(",","")+' Additional Total : '+total_additional_price);
            }
            else if(element_type == 'select') {
                try {
                    var curr_value = $(this).children("option").filter(":selected").text().trim();
                }
                catch(err) {
                    console.error('Select Error '.err.message);
                }
                if(curr_value == locale.message.text["select"] || curr_value == null || curr_value == '' || curr_value == 'undefined') {

                }
                else {
                    custom_options_results[custom_option_id] = $(this).children("option").filter(":selected").attr("valueid");
                    curr_label =  curr_value.split('+');
                    my_custom_choice += ' '+curr_label[0];
                    total_additional_price += parseFloat($(this).children("option").filter(":selected").attr("price").replace(",",""));
                    console.log('Select 2 Adding Price  : '+$(this).children("option").filter(":selected").attr("price").replace(",","")+' Additional Total : '+total_additional_price);
                }
            }
            else if(element_type == 'radio') {
                var ele_name = $(this).attr("name");
                if($('input[name='+ele_name+']:checked').length<=0) {

                }
                else {
                    $('input[name='+ele_name+']:checked').each(function(){
                        try {
                            custom_options_results[custom_option_id].push($(this).attr("valueid"));
                        }
                        catch(err) {
                            custom_options_results[custom_option_id] = new Array();
                            custom_options_results[custom_option_id].push($(this).attr("valueid"));
                        }
                        var curr_label = $("label[for='"+$(this).attr("id")+"']").text().split('+');
                        my_custom_choice += ' '+curr_label[0];
                    });
                }
            }
            else if(element_type == 'checkbox') {
                var ele_name = $(this).attr("name");
                var len = $('input[name='+ele_name+']:checked').length;
                if(len<=0) {
                //do nothing    
                }
                else {
                    $('input[name='+ele_name+']:checked').each(function(){
                        try {
                            var inarray_flag = $.inArray($(this).attr("valueid"), custom_options_results[custom_option_id]);
                            if(inarray_flag == -1) {
                                try {
                                    custom_options_results[custom_option_id].push($(this).attr("valueid"));
                                    total_additional_price += parseFloat($(this).attr("price"));
                                }
                                catch(err) {
                                    custom_options_results[custom_option_id] = new Array();
                                    custom_options_results[custom_option_id].push($(this).attr("valueid"));
                                    total_additional_price += parseFloat($(this).attr("price").replace(",",""));
                                }
                                curr_label =  $("label[for='"+$(this).attr("id")+"']").split('+');
                                my_custom_choice = ' '+ curr_label[0]; 
                                console.log('Checkbox 2  Time Adding Price  : '+$(this).attr("price").replace(",","")+' Additional Total : '+total_additional_price);
                            }
                            else {
                                //do nothing
                            }
                        }
                        catch(err) {
                            console.log(err.message);
                        }
                    });
                }
            }
        }
    });
    var additional_radio = 0;
    $('input[type="radio"]:checked').each(function(){
        additional_radio += parseFloat($(this).attr("price").replace(",",""));
    });
    console.log('Radio Price '+additional_radio);
    total_additional_price += additional_radio;
    var  final_custom_options_results = [];
    final_custom_options_results["error"] = total_custom_option_validation_error;
    final_custom_options_results["customoptions"] = custom_options_results;
    final_custom_options_results["total_additional_price"] = total_additional_price;
    final_custom_options_results["custom_choice"] = my_custom_choice;
    return final_custom_options_results;
}

/* ----------------------------------- function.js Code Ends ------------------------------------ */
