(function(){function d(a){var c=!1;return function(){if(c)throw Error("Callback was already called.");c=!0,a.apply(b,arguments)}}var b,c,a={};b=this,null!=b&&(c=b.async),a.noConflict=function(){return b.async=c,a};var e=function(a,b){if(a.forEach)return a.forEach(b);for(var c=0;a.length>c;c+=1)b(a[c],c,a)},f=function(a,b){if(a.map)return a.map(b);var c=[];return e(a,function(a,d,e){c.push(b(a,d,e))}),c},g=function(a,b,c){return a.reduce?a.reduce(b,c):(e(a,function(a,d,e){c=b(c,a,d,e)}),c)},h=function(a){if(Object.keys)return Object.keys(a);var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b};a.nextTick="undefined"!=typeof process&&process.nextTick?process.nextTick:"function"==typeof setImmediate?function(a){setImmediate(a)}:function(a){setTimeout(a,0)},a.forEach=function(a,b,c){if(c=c||function(){},!a.length)return c();var f=0;e(a,function(e){b(e,d(function(b){b?(c(b),c=function(){}):(f+=1,f>=a.length&&c(null))}))})},a.forEachSeries=function(b,c,d){if(d=d||function(){},!b.length)return d();var e=0,f=function(){var g=!0;c(b[e],function(c){c?(d(c),d=function(){}):(e+=1,e>=b.length?d(null):g?a.nextTick(f):f())}),g=!1};f()},a.forEachLimit=function(a,b,c,d){var e=i(b);e.apply(null,[a,c,d])};var i=function(a){return function(b,c,d){if(d=d||function(){},!b.length||0>=a)return d();var e=0,f=0,g=0;(function h(){if(e>=b.length)return d();for(;a>g&&b.length>f;)f+=1,g+=1,c(b[f-1],function(a){a?(d(a),d=function(){}):(e+=1,g-=1,e>=b.length?d():h())})})()}},j=function(b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[a.forEach].concat(c))}},k=function(a,b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[i(a)].concat(c))}},l=function(b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[a.forEachSeries].concat(c))}},m=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c,d){e[a.index]=d,b(c)})},function(a){d(a,e)})};a.map=j(m),a.mapSeries=l(m),a.mapLimit=function(a,b,c,d){return n(b)(a,c,d)};var n=function(a){return k(a,m)};a.reduce=function(b,c,d,e){a.forEachSeries(b,function(a,b){d(c,a,function(a,d){c=d,b(a)})},function(a){e(a,c)})},a.inject=a.reduce,a.foldl=a.reduce,a.reduceRight=function(b,c,d,e){var g=f(b,function(a){return a}).reverse();a.reduce(g,c,d,e)},a.foldr=a.reduceRight;var o=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c){c&&e.push(a),b()})},function(){d(f(e.sort(function(a,b){return a.index-b.index}),function(a){return a.value}))})};a.filter=j(o),a.filterSeries=l(o),a.select=a.filter,a.selectSeries=a.filterSeries;var p=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c){c||e.push(a),b()})},function(){d(f(e.sort(function(a,b){return a.index-b.index}),function(a){return a.value}))})};a.reject=j(p),a.rejectSeries=l(p);var q=function(a,b,c,d){a(b,function(a,b){c(a,function(c){c?(d(a),d=function(){}):b()})},function(){d()})};a.detect=j(q),a.detectSeries=l(q),a.some=function(b,c,d){a.forEach(b,function(a,b){c(a,function(a){a&&(d(!0),d=function(){}),b()})},function(){d(!1)})},a.any=a.some,a.every=function(b,c,d){a.forEach(b,function(a,b){c(a,function(a){a||(d(!1),d=function(){}),b()})},function(){d(!0)})},a.all=a.every,a.sortBy=function(b,c,d){a.map(b,function(a,b){c(a,function(c,d){c?b(c):b(null,{value:a,criteria:d})})},function(a,b){if(a)return d(a);var c=function(a,b){var c=a.criteria,d=b.criteria;return d>c?-1:c>d?1:0};d(null,f(b.sort(c),function(a){return a.value}))})},a.auto=function(b,c){c=c||function(){};var d=h(b);if(!d.length)return c(null);var f={},i=[],j=function(a){i.unshift(a)},k=function(a){for(var b=0;i.length>b;b+=1)if(i[b]===a)return i.splice(b,1),void 0},l=function(){e(i.slice(0),function(a){a()})};j(function(){h(f).length===d.length&&(c(null,f),c=function(){})}),e(d,function(d){var e=b[d]instanceof Function?[b[d]]:b[d],h=function(b){if(b)c(b),c=function(){};else{var e=Array.prototype.slice.call(arguments,1);1>=e.length&&(e=e[0]),f[d]=e,a.nextTick(l)}},i=e.slice(0,Math.abs(e.length-1))||[],m=function(){return g(i,function(a,b){return a&&f.hasOwnProperty(b)},!0)&&!f.hasOwnProperty(d)};if(m())e[e.length-1](h,f);else{var n=function(){m()&&(k(n),e[e.length-1](h,f))};j(n)}})},a.waterfall=function(b,c){if(c=c||function(){},!b.length)return c();var d=function(b){return function(e){if(e)c.apply(null,arguments),c=function(){};else{var f=Array.prototype.slice.call(arguments,1),g=b.next();g?f.push(d(g)):f.push(c),a.nextTick(function(){b.apply(null,f)})}}};d(a.iterator(b))()};var r=function(a,b,c){if(c=c||function(){},b.constructor===Array)a.map(b,function(a,b){a&&a(function(a){var c=Array.prototype.slice.call(arguments,1);1>=c.length&&(c=c[0]),b.call(null,a,c)})},c);else{var d={};a.forEach(h(b),function(a,c){b[a](function(b){var e=Array.prototype.slice.call(arguments,1);1>=e.length&&(e=e[0]),d[a]=e,c(b)})},function(a){c(a,d)})}};a.parallel=function(b,c){r({map:a.map,forEach:a.forEach},b,c)},a.parallelLimit=function(a,b,c){r({map:n(b),forEach:i(b)},a,c)},a.series=function(b,c){if(c=c||function(){},b.constructor===Array)a.mapSeries(b,function(a,b){a&&a(function(a){var c=Array.prototype.slice.call(arguments,1);1>=c.length&&(c=c[0]),b.call(null,a,c)})},c);else{var d={};a.forEachSeries(h(b),function(a,c){b[a](function(b){var e=Array.prototype.slice.call(arguments,1);1>=e.length&&(e=e[0]),d[a]=e,c(b)})},function(a){c(a,d)})}},a.iterator=function(a){var b=function(c){var d=function(){return a.length&&a[c].apply(null,arguments),d.next()};return d.next=function(){return a.length-1>c?b(c+1):null},d};return b(0)},a.apply=function(a){var b=Array.prototype.slice.call(arguments,1);return function(){return a.apply(null,b.concat(Array.prototype.slice.call(arguments)))}};var s=function(a,b,c,d){var e=[];a(b,function(a,b){c(a,function(a,c){e=e.concat(c||[]),b(a)})},function(a){d(a,e)})};a.concat=j(s),a.concatSeries=l(s),a.whilst=function(b,c,d){if(b()){var e=!0;c(function(f){return f?d(f):(e?a.nextTick(function(){a.whilst(b,c,d)}):a.whilst(b,c,d),void 0)}),e=!1}else d()},a.doWhilst=function(b,c,d){var e=!0;b(function(f){return f?d(f):(c()?e?a.nextTick(function(){a.doWhilst(b,c,d)}):a.doWhilst(b,c,d):d(),void 0)}),e=!1},a.until=function(b,c,d){if(b())d();else{var e=!0;c(function(f){return f?d(f):(e?a.nextTick(function(){a.until(b,c,d)}):a.until(b,c,d),void 0)}),e=!1}},a.doUntil=function(b,c,d){var e=!0;b(function(f){return f?d(f):(c()?d():e?a.nextTick(function(){a.doUntil(b,c,d)}):a.doUntil(b,c,d),void 0)}),e=!1},a.queue=function(b,c){function f(b,d,f,g){d.constructor!==Array&&(d=[d]),e(d,function(d){var e={data:d,callback:"function"==typeof g?g:null};f?b.tasks.unshift(e):b.tasks.push(e),b.saturated&&b.tasks.length===c&&b.saturated(),a.nextTick(b.process)})}var g=0,h={tasks:[],concurrency:c,saturated:null,empty:null,drain:null,push:function(a,b){f(h,a,!1,b)},unshift:function(a,b){f(h,a,!0,b)},process:function(){if(h.concurrency>g&&h.tasks.length){var c=h.tasks.shift();h.empty&&0===h.tasks.length&&h.empty(),g+=1;var e=!0,f=function(){g-=1,c.callback&&c.callback.apply(c,arguments),h.drain&&0===h.tasks.length+g&&h.drain(),h.process()},i=d(function(){var b=arguments;e?a.nextTick(function(){f.apply(null,b)}):f.apply(null,arguments)});b(c.data,i),e=!1}},length:function(){return h.tasks.length},running:function(){return g}};return h},a.cargo=function(b,c){var d=!1,g=[],h={tasks:g,payload:c,saturated:null,empty:null,drain:null,push:function(b,d){b.constructor!==Array&&(b=[b]),e(b,function(a){g.push({data:a,callback:"function"==typeof d?d:null}),h.saturated&&g.length===c&&h.saturated()}),a.nextTick(h.process)},process:function i(){if(!d){if(0===g.length)return h.drain&&h.drain(),void 0;var a="number"==typeof c?g.splice(0,c):g.splice(0),j=f(a,function(a){return a.data});h.empty&&h.empty(),d=!0,b(j,function(){d=!1;var b=arguments;e(a,function(a){a.callback&&a.callback.apply(null,b)}),i()})}},length:function(){return g.length},running:function(){return d}};return h};var t=function(a){return function(b){var c=Array.prototype.slice.call(arguments,1);b.apply(null,c.concat([function(b){var c=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(b?console.error&&console.error(b):console[a]&&e(c,function(b){console[a](b)}))}]))}};a.log=t("log"),a.dir=t("dir"),a.memoize=function(a,b){var c={},d={};b=b||function(a){return a};var e=function(){var e=Array.prototype.slice.call(arguments),f=e.pop(),g=b.apply(null,e);g in c?f.apply(null,c[g]):g in d?d[g].push(f):(d[g]=[f],a.apply(null,e.concat([function(){c[g]=arguments;var a=d[g];delete d[g];for(var b=0,e=a.length;e>b;b++)a[b].apply(null,arguments)}])))};return e.memo=c,e.unmemoized=a,e},a.unmemoize=function(a){return function(){return(a.unmemoized||a).apply(null,arguments)}},a.times=function(b,c,d){for(var e=[],f=0;b>f;f++)e.push(f);return a.map(e,c,d)},a.timesSeries=function(b,c,d){for(var e=[],f=0;b>f;f++)e.push(f);return a.mapSeries(e,c,d)},"undefined"!=typeof define&&define.amd?define([],function(){return a}):"undefined"!=typeof module&&module.exports?module.exports=a:b.async=a})();