/* 
 * author : fang yongbao
 * data : 2014.12.24
 * model : åž‚ç›´å¤šçº§å¯¼èˆª
 * info ï¼šçŸ¥è¯†åœ¨äºŽç§¯ç´¯ï¼Œæ¯å¤©ä¸€å°æ­¥ï¼ŒæˆåŠŸæ°¸è¿œå±žäºŽåšæŒçš„äººã€‚
 * blog : http://www.best-html5.net
 */

/*
 *
 * @param {type} option
 * {
 *   @param Speed: num,//åŠ¨ç”»æ”¶ç¼©æ—¶é—´
 *   @param autostart: ture/false,//åˆæ¬¡åŠ è½½æ˜¯å¦å°†èœå•å…¨éƒ¨å±•å¼€
 *   @param autohide: true/false,//åŒçº§èœå•æ˜¯å¦éšè—
 * }
 * return obj
 *   none
 *
 *
 */
(function($) {
	$.fn.vmenuModule = function(option) {
		var obj,
			item;
		var options = $.extend({
				Speed: 220,
				autostart: true,
				autohide: 1
			},
			option);
		obj = $(this);

		item = obj.find("ul").parent("li").children("a");
		item.attr("data-option", "off");

		item.unbind('click').on("click", function() {
			var a = $(this);
			if (options.autohide) {
				a.parent().parent().find("a[data-option='on']").parent("li").children("ul").slideUp(options.Speed / 1.2,
					function() {
						$(this).parent("li").children("a").attr("data-option", "off");
					})
			}
			if (a.attr("data-option") == "off") {
				a.parent("li").children("ul").slideDown(options.Speed,
					function() {
						a.attr("data-option", "on");
					});
			}
			if (a.attr("data-option") == "on") {
				a.attr("data-option", "off");
				a.parent("li").children("ul").slideUp(options.Speed)
			}
		});
		if (options.autostart) {
			obj.find("a").each(function() {

				$(this).parent("li").parent("ul").slideDown(options.Speed,
					function() {
						$(this).parent("li").children("a").attr("data-option", "on");
					})
			})
		}

	}
})(window.jQuery || window.Zepto);