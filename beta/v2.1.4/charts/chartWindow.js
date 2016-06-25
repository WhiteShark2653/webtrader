define(["jquery","windows/windows","text!charts/chartWindow.html","lodash","jquery.dialogextend"],function(a,b,c){"use strict";function d(){a(this).find(".chartSubContainer").width(a(this).width()-10),a(this).find(".chartSubContainer").height(a(this).height()-15);var b="#"+a(this).find(".chartSubContainer").attr("id");require(["charts/charts"],function(a){a.triggerReflow(b)})}return{addNewWindow:function(e){var f=e;e=a.extend({title:e.instrumentName+" ("+e.timePeriod+")",close:function(){var b=a(this).attr("id"),c=a("#"+b+"_chart"),d=c.data("timePeriod"),e=c.data("instrumentCode");a(this).dialog("destroy"),require(["charts/charts"],function(a){a.destroy({containerIDWithHash:"#"+b+"_chart",timePeriod:d,instrumentCode:e})})},resize:d},e);var g=b.createBlankWindow(c,e),h=g.attr("id");g.find("div.chartSubContainerHeader").attr("id",h+"_header").end().find("div.chartSubContainer").attr("id",h+"_chart").end(),require(["charts/charts"],function(a){a.drawChart("#"+h+"_chart",e,e.resize.bind(g)),require(["charts/chartOptions","charts/tableView"],function(a,b){var c=b.init(g);a.init(h,e.timePeriod,e.type,c.show,e.instrumentName)})});var i=g.track({module_id:"chartWindow",is_unique:!1,data:f});return g.on("chart-type-changed",function(a,b){f.type=b,i(f)}),g.dialog("open"),g},totalWindows:function(){return a("div.webtrader-dialog").length},triggerResizeEffects:function(a){d.call(a)}}});