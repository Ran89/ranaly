(function(a,b){"object"==typeof exports&&exports?module.exports=b:"function"==typeof define&&define.amd?define(b):a.Mustache=b})(this,function(){function j(a,b){return h.call(a,b)}function k(a){return!j(d,a)}function m(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(a){return(a+"").replace(/[&<>"'\/]/g,function(a){return n[a]})}function p(a){this.string=a,this.tail=a,this.pos=0}function q(a,b){this.view=a,this.parent=b,this._cache={}}function r(){this.clearCache()}function s(b,c,d,e){for(var g,h,i,f="",j=0,k=b.length;k>j;++j)switch(g=b[j],h=g[1],g[0]){case"#":if(i=d.lookup(h),"object"==typeof i)if(l(i))for(var m=0,n=i.length;n>m;++m)f+=s(g[4],c,d.push(i[m]),e);else i&&(f+=s(g[4],c,d.push(i),e));else if("function"==typeof i){var o=null==e?null:e.slice(g[3],g[5]);i=i.call(d.view,o,function(a){return c.render(a,d)}),null!=i&&(f+=i)}else i&&(f+=s(g[4],c,d,e));break;case"^":i=d.lookup(h),(!i||l(i)&&0===i.length)&&(f+=s(g[4],c,d,e));break;case">":i=c.getPartial(h),"function"==typeof i&&(f+=i(d));break;case"&":i=d.lookup(h),null!=i&&(f+=i);break;case"name":i=d.lookup(h),null!=i&&(f+=a.escape(i));break;case"text":f+=h}return f}function t(a){for(var e,b=[],c=b,d=[],f=0,g=a.length;g>f;++f)switch(e=a[f],e[0]){case"#":case"^":d.push(e),c.push(e),c=e[4]=[];break;case"/":var h=d.pop();h[5]=e[2],c=d.length>0?d[d.length-1][4]:b;break;default:c.push(e)}return b}function u(a){for(var c,d,b=[],e=0,f=a.length;f>e;++e)c=a[e],c&&("text"===c[0]&&d&&"text"===d[0]?(d[1]+=c[1],d[3]=c[3]):(d=c,b.push(c)));return b}function v(a){return[RegExp(m(a[0])+"\\s*"),RegExp("\\s*"+m(a[1]))]}var a={};a.name="mustache.js",a.version="0.7.2",a.tags=["{{","}}"],a.Scanner=p,a.Context=q,a.Writer=r;var b=/\s*/,c=/\s+/,d=/\S/,e=/\s*=/,f=/\s*\}/,g=/#|\^|\/|>|\{|&|=|!/,h=RegExp.prototype.test,i=Object.prototype.toString,l=Array.isArray||function(a){return"[object Array]"===i.call(a)},n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};a.escape=o,p.prototype.eos=function(){return""===this.tail},p.prototype.scan=function(a){var b=this.tail.match(a);return b&&0===b.index?(this.tail=this.tail.substring(b[0].length),this.pos+=b[0].length,b[0]):""},p.prototype.scanUntil=function(a){var b,c=this.tail.search(a);switch(c){case-1:b=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:b="";break;default:b=this.tail.substring(0,c),this.tail=this.tail.substring(c),this.pos+=c}return b},q.make=function(a){return a instanceof q?a:new q(a)},q.prototype.push=function(a){return new q(a,this)},q.prototype.lookup=function(a){var b=this._cache[a];if(!b){if("."==a)b=this.view;else for(var c=this;c;){if(a.indexOf(".")>0){b=c.view;for(var d=a.split("."),e=0;b&&d.length>e;)b=b[d[e++]]}else b=c.view[a];if(null!=b)break;c=c.parent}this._cache[a]=b}return"function"==typeof b&&(b=b.call(this.view)),b},r.prototype.clearCache=function(){this._cache={},this._partialCache={}},r.prototype.compile=function(b,c){var d=this._cache[b];if(!d){var e=a.parse(b,c);d=this._cache[b]=this.compileTokens(e,b)}return d},r.prototype.compilePartial=function(a,b,c){var d=this.compile(b,c);return this._partialCache[a]=d,d},r.prototype.getPartial=function(a){return a in this._partialCache||!this._loadPartial||this.compilePartial(a,this._loadPartial(a)),this._partialCache[a]},r.prototype.compileTokens=function(a,b){var c=this;return function(d,e){if(e)if("function"==typeof e)c._loadPartial=e;else for(var f in e)c.compilePartial(f,e[f]);return s(a,c,q.make(d),b)}},r.prototype.render=function(a,b,c){return this.compile(a)(b,c)},a.parse=function(d,h){function s(){if(q&&!r)for(;o.length;)delete n[o.pop()];else o=[];q=!1,r=!1}if(d=d||"",h=h||a.tags,"string"==typeof h&&(h=h.split(c)),2!==h.length)throw Error("Invalid tags: "+h.join(", "));for(var w,x,y,z,A,i=v(h),j=new p(d),l=[],n=[],o=[],q=!1,r=!1;!j.eos();){if(w=j.pos,y=j.scanUntil(i[0]))for(var B=0,C=y.length;C>B;++B)z=y.charAt(B),k(z)?o.push(n.length):r=!0,n.push(["text",z,w,w+1]),w+=1,"\n"==z&&s();if(!j.scan(i[0]))break;if(q=!0,x=j.scan(g)||"name",j.scan(b),"="===x?(y=j.scanUntil(e),j.scan(e),j.scanUntil(i[1])):"{"===x?(y=j.scanUntil(RegExp("\\s*"+m("}"+h[1]))),j.scan(f),j.scanUntil(i[1]),x="&"):y=j.scanUntil(i[1]),!j.scan(i[1]))throw Error("Unclosed tag at "+j.pos);if(A=[x,y,w,j.pos],n.push(A),"#"===x||"^"===x)l.push(A);else if("/"===x){if(0===l.length)throw Error('Unopened section "'+y+'" at '+w);var D=l.pop();if(D[1]!==y)throw Error('Unclosed section "'+D[1]+'" at '+w)}else if("name"===x||"{"===x||"&"===x)r=!0;else if("="===x){if(h=y.split(c),2!==h.length)throw Error("Invalid tags at "+w+": "+h.join(", "));i=v(h)}}var D=l.pop();if(D)throw Error('Unclosed section "'+D[1]+'" at '+j.pos);return n=u(n),t(n)};var w=new r;return a.clearCache=function(){return w.clearCache()},a.compile=function(a,b){return w.compile(a,b)},a.compilePartial=function(a,b,c){return w.compilePartial(a,b,c)},a.compileTokens=function(a,b){return w.compileTokens(a,b)},a.render=function(a,b,c){return w.render(a,b,c)},a.to_html=function(b,c,d,e){var f=a.render(b,c,d);return"function"!=typeof e?f:(e(f),void 0)},a}());