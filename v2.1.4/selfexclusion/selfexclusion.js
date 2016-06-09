define(["jquery","windows/windows","websockets/binary_websockets","lodash","common/rivetsExtra","moment","jquery-growl","common/util"],function(a,b,c,d,e,f){function g(){k.exclude_until&&f.utc(k.exclude_until,"YYYY-MM-DD").isAfter(f.utc().startOf("day"))&&d.defer(function(){a.growl.error({message:"You have excluded yourself until "+k.exclude_until}),c.invalidate()})}var h=null,i=null,j=null,k={max_balance:null,max_turnover:null,max_losses:null,max_7day_turnover:null,max_7day_losses:null,max_30day_turnover:null,max_30day_losses:null,max_open_bets:null,session_duration_limit:null,exclude_until:null,update:function(b,e){if(e.session_duration_limit&&!d.inRange(e.session_duration_limit,0,99999))return void a.growl.error({message:"Please enter value between 0 and 99999 for Session duration limit"});if(e.exclude_until&&f.utc(e.exclude_until,"YYYY-MM-DD").isBefore(f.utc().startOf("day").add("months",6)))return void a.growl.error({message:"Exclude time cannot be less than 6 months"});if(e.max_open_bets&&!d.inRange(e.max_open_bets,0,9999))return void a.growl.error({message:"Please enter positive integer value between 0 and 9999"});if(e.max_balance&&!d.inRange(e.max_balance,0,Number.MAX_VALUE))return void a.growl.error({message:"Please enter positive integer value for Maximum number of open positions"});if(e.max_30day_losses&&!d.inRange(e.max_30day_losses,0,Number.MAX_VALUE))return void a.growl.error({message:"Please enter positive integer value for 30-day limit on losses"});if(e.max_turnover&&!d.inRange(e.max_turnover,0,Number.MAX_VALUE))return void a.growl.error({message:"Please enter positive integer value for Daily turnover limit"});if(e.max_30day_turnover&&!d.inRange(e.max_30day_turnover,0,Number.MAX_VALUE))return void a.growl.error({message:"Please enter positive integer value for 30-day turnover limit"});if(e.max_7day_losses&&!d.inRange(e.max_7day_losses,0,Number.MAX_VALUE))return void a.growl.error({message:"Please enter positive integer value for 7-day limit on losses"});if(e.max_losses&&!d.inRange(e.max_losses,0,Number.MAX_VALUE))return void a.growl.error({message:"Please enter positive integer value for Daily limit on losses"});if(e.max_7day_turnover&&!d.inRange(e.max_7day_turnover,0,Number.MAX_VALUE))return void a.growl.error({message:"Please enter positive integer value for 7-day turnover limit"});var h={set_self_exclusion:1,session_duration_limit:e.session_duration_limit,exclude_until:e.exclude_until,max_open_bets:e.max_open_bets,max_balance:e.max_balance,max_30day_losses:e.max_30day_losses,max_turnover:e.max_turnover,max_30day_turnover:e.max_30day_turnover,max_7day_losses:e.max_7day_losses,max_losses:e.max_losses,max_7day_turnover:e.max_7day_turnover};c.send(h).then(function(){a.growl.notice({message:"Your changes have been updated"}),g(),n()})["catch"](function(b){a.growl.error({message:b.message})})}},l=function(){return require(["css!selfexclusion/selfexclusion.css"]),new Promise(function(c){require(["text!selfexclusion/selfexclusion.html"],function(d){var f=a(d);h=b.createBlankWindow(a("<div/>"),{title:"Self-Exclusion Facilities",width:900,minHeight:500,height:500,"data-authorized":"true",destroy:function(){h=null}}),f.appendTo(h),e.bind(f[0],k),m(),c()})})},m=function(){return a.growl.notice({message:"Loading self-exclusion settings!"}),c.send({get_self_exclusion:1}).then(function(a){a.get_self_exclusion&&(k.max_balance=a.get_self_exclusion.max_balance,k.max_turnover=a.get_self_exclusion.max_turnover,k.max_losses=a.get_self_exclusion.max_losses,k.max_7day_turnover=a.get_self_exclusion.max_7day_turnover,k.max_7day_losses=a.get_self_exclusion.max_7day_losses,k.max_30day_turnover=a.get_self_exclusion.max_30day_turnover,k.max_30day_losses=a.get_self_exclusion.max_30day_losses,k.max_open_bets=a.get_self_exclusion.max_open_bets,k.session_duration_limit=a.get_self_exclusion.session_duration_limit,k.exclude_until=a.get_self_exclusion.exclude_until,g())})["catch"](function(b){a.growl.error({message:b.message})})},n=function(){if(!d.isUndefined(k.session_duration_limit)&&!d.isNull(k.session_duration_limit)&&d.isFinite(d.toNumber(k.session_duration_limit))){i&&clearTimeout(i);var b=60*k.session_duration_limit*1e3;b-=d.now()-j,b>Math.pow(2,32)&&(b=Math.pow(2,32)),i=setTimeout(function(){a.growl.warning({message:"Logging out because of self-exclusion session time out!"}),c.invalidate()},b)}},o=function(){h&&h.dialog("destroy"),h=null,i&&clearTimeout(i),i=null,j=null,k.max_balance=null,k.max_turnover=null,k.max_losses=null,k.max_7day_turnover=null,k.max_7day_losses=null,k.max_30day_turnover=null,k.max_30day_losses=null,k.max_open_bets=null,k.session_duration_limit=null,k.exclude_until=null,a("#nav-container a.selfexclusion").addClass("disabled")};return c.events.on("login",function(){c.cached.authorize().then(function(b){b.authorize.is_virtual?o():(j=d.now(),m().then(function(){n()}),a("#nav-container a.selfexclusion").removeClass("disabled"))})}),c.events.on("logout",o),{init:function(b){b.click(function(){a(this).hasClass("disabled")||c.cached.authorize().then(function(){h?(m(),h.moveToTop()):l().then(function(){h.dialog("open")})})["catch"](function(a){})})}}});