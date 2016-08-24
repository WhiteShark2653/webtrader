define(["websockets/binary_websockets","common/rivetsExtra","lodash"],function(a,b,c){function d(){return h?Promise.resolve():new Promise(function(a){require(["text!charts/overlay/overlayManagement.html"],function(b){e(b).then(a)})})}function e(a){return new Promise(function(b){return a=$(a),"true"==getParameterByName("affiliates")?(h=$(a).dialog({autoOpen:!1,resizable:!1,width:Math.min(480,$(window).width()-10),height:400,modal:!0,my:"center",at:"center",of:window,buttons:[]}),f(a),void b()):void require(["windows/windows"],function(c){h=c.createBlankWindow(a,{title:"Add/remove overlays".i18n(),width:700,modal:!0,destroy:function(){i&&i.unbind(),i=null,h.dialog("destroy").remove(),h=null},open:function(){}}),f(a),b()})})}function f(a){j={dialog:{title:"Add/remove overlays".i18n(),container_id:""},overlays:{search:"",array:[],current:[]}},j.overlays.clear_search=function(){j.overlays.search=""},j.overlays.add=function(a){var b=a.symbol,d=a.delay_amount,e=a.display_name,f=j.dialog.container_id,g=($(f).data("timePeriod"),$(f)),h=g.data("type");require(["charts/chartOptions","charts/charts","common/util"],function(g,i){var k=f.replace("#","").replace("_chart",""),l=$(f),m=function(){l.data("overlayIndicator",!0),g.disableEnableCandlestickAndOHLC(k,!1),i.overlay(f,b,e,d).then(function(){var a={symbol:b,displaySymbol:e,delay_amount:d};c.defer(function(){l.trigger("chart-overlay-add",a),i.refresh(f)})})};"candlestick"===h||"ohlc"==h?(l.data("type","line"),l.trigger("chart-type-changed","line"),g.selectChartType(k,"line",!1),c.defer(m)):m(),j.overlays.current.push(e),a.dont_show=!0})},j.overlays.remove=function(a){var b=j.dialog.container_id,d=$(b),e=d.highcharts();if(e&&a){var f=c.find(e.series,function(b){return b.options.name===a&&"navigator"!==b.options.id});if(f){var g=e.get_indicator_series();f.removeCurrentPrice(),f.remove(),c.defer(function(){var a=0;e.series.forEach(function(b){(b.options.isInstrument||b.options.onChartIndicator)&&-1==b.options.id.indexOf("navigator")&&++a}),1==a&&e.series.forEach(function(a){return(a.options.isInstrument||a.options.onChartIndicator)&&-1==a.options.id.indexOf("navigator")?(a.update({compare:void 0}),$(b).data("overlayIndicator",null),require(["charts/chartOptions"],function(a){var c=b.replace("#","").replace("_chart","");a.disableEnableCandlestickAndOHLC(c,!0)}),c.defer(function(){e.redraw()}),!1):void 0}),e.set_indicator_series(g)})}var h=!1;j.overlays.array.forEach(function(b){return b.submarkets.forEach(function(b){return b.instruments.forEach(function(b){return b.display_name===a&&(b.dont_show=!1,h=!0),!h}),!h}),!h}),j.overlays.current.splice(j.overlays.current.indexOf(a),1),d.trigger("chart-overlay-remove",{displaySymbol:a})}},i=b.bind(a[0],j)}function g(a){require(["instruments/instruments"],function(b){var d=a.series[0].options.name,e=c.filter(a.series,function(a,b){return a.options.isInstrument&&"navigator"!==a.options.id&&0!==b}).map(function(a){return a.options.name})||[],f=b.getMarketData()||[];f.forEach(function(a){a.submarkets.forEach(function(a){a.instruments.forEach(function(a){c.includes(e,a.display_name)||d===a.display_name?a.dont_show=!0:delete a.dont_show})})}),j.overlays.array=f,j.overlays.current=e})}require(["text!charts/overlay/overlayManagement.html"]),require(["css!charts/overlay/overlayManagement.css"]);var h=null,i=null,j={};b.formatters["overlays-filter"]=function(a,b){return b=b&&b.toLowerCase(),a&&a.filter(function(a){return-1!==a.display_name.toLowerCase().indexOf(b)})};var k=!0;return{openDialog:function(a,b){d().then(function(){j.dialog.title="Add/remove comaprisons".i18n()+(b?" - "+b:""),j.dialog.container_id=a,j.overlays.current=$(a).data("overlays-current")||[];var c=$(a).highcharts();g(c);k||"true"==getParameterByName("affiliates");h.dialog("open"),k=!1})["catch"](void 0)}}});