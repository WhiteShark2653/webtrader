define(["jquery","common/rivetsExtra","jquery-ui","color-picker"],function(a,b){function c(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function d(d,e){require(["text!charts/indicators/cdlrickshawman/cdlrickshawman.html","text!charts/indicators/indicators.json"],function(f,g){f=a(f),f.appendTo("body"),g=JSON.parse(g);var h=g.cdlrickshawman,i={title:h.long_display_name,description:h.description};b.bind(f[0],i),f.dialog({autoOpen:!1,resizable:!1,width:350,modal:!0,my:"center",at:"center",of:window,buttons:[{text:"OK",click:function(){var b=a(a(".cdlrickshawman").data("refererChartID")).highcharts().series[0];b.addIndicator("cdlrickshawman",{cdlIndicatorCode:"cdlrickshawman",onSeriesID:b.options.id}),c.call(f)}},{text:"Cancel",click:function(){c.call(this)}}]}),a.isFunction(e)&&e(d)})}return{open:function(b){return 0==a(".cdlrickshawman").length?void d(b,this.open):void a(".cdlrickshawman").data("refererChartID",b).dialog("open")}}});