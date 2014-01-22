/**
 * Backbone localStorage Adapter
 * Version 1.1.8
 *
 * https://github.com/jeromegn/Backbone.localStorage
 */(function(a,b){typeof exports=="object"&&typeof require=="function"?module.exports=b(require("backbone")):typeof define=="function"&&define.amd?define(["backbone"],function(c){return b(c||a.Backbone)}):b(Backbone)})(this,function(a){function b(){return((1+Math.random())*65536|0).toString(16).substring(1)}function c(){return b()+b()+"-"+b()+"-"+b()+"-"+b()+"-"+b()+b()+b()}a.LocalStorage=window.Store=function(a){if(!this.localStorage)throw"Backbone.localStorage: Environment does not support localStorage.";this.name=a;var b=this.localStorage().getItem(this.name);this.records=b&&b.split(",")||[]};var d=Array.prototype,e=Object.prototype,f=Function.prototype,g=d.indexOf,h=d.slice,i=d.filter;return _extend=function(a){return ps=Array.prototype.slice.call(arguments,1),ps.forEach(function(b){if(b)for(var c in b)a[c]=b[c]}),a},_contains=_include=function(a,b){return a==null?!1:g&&a.indexOf===g?a.indexOf(b)!=-1:any(a,function(a){return a===b})},_chain=function(a){return _(a).chain()},_filter=_select=function(a,b,c){var d=[];return a==null?d:i&&a.filter===i?a.filter(b,c):(each(a,function(a,e,f){b.call(c,a,e,f)&&d.push(a)}),d)},_reject=function(a,b,c){return _filter(a,function(a,d,e){return!b.call(c,a,d,e)},c)},_extend(a.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(a){return a.id||(a.id=c(),a.set(a.idAttribute,a.id)),this.localStorage().setItem(this.name+"-"+a.id,JSON.stringify(a)),this.records.push(a.id.toString()),this.save(),this.find(a)},update:function(a){return this.localStorage().setItem(this.name+"-"+a.id,JSON.stringify(a)),_include(this.records,a.id.toString())||this.records.push(a.id.toString()),this.save(),this.find(a)},find:function(a){return this.jsonData(this.localStorage().getItem(this.name+"-"+a.id))},findAll:function(){return this.records.map(function(a){return this.jsonData(this.localStorage().getItem(this.name+"-"+a))},this)},destroy:function(a){return a.isNew()?!1:(this.localStorage().removeItem(this.name+"-"+a.id),this.records=_reject(this.records,function(b){return b===a.id.toString()}),this.save(),a)},localStorage:function(){return localStorage},jsonData:function(a){return a&&JSON.parse(a)},_clear:function(){var a=this.localStorage(),b=new RegExp("^"+this.name+"-");a.removeItem(this.name);var c=Object.keys(a),d=_filter(c,function(a){return b.test(a)});d.forEach(function(b){a.removeItem(b)}),this.records.length=0},_storageSize:function(){return this.localStorage().length}}),a.LocalStorage.sync=window.Store.sync=a.localSync=function(b,c,d){var e=c.localStorage||c.collection.localStorage,f,g,h=a.Deferred&&a.Deferred();try{switch(b){case"read":f=c.id!=undefined?e.find(c):e.findAll();break;case"create":f=e.create(c);break;case"update":f=e.update(c);break;case"delete":f=e.destroy(c)}}catch(i){i.code===22&&e._storageSize()===0?g="Private browsing is unsupported":g=i.message}return f?(d&&d.success&&(a.VERSION==="0.9.10"?d.success(c,f,d):d.success(f)),h&&h.resolve(f)):(g=g?g:"Record Not Found",d&&d.error&&(a.VERSION==="0.9.10"?d.error(c,g,d):d.error(g)),h&&h.reject(g)),d&&d.complete&&d.complete(f),h&&h.promise()},a.ajaxSync=a.sync,a.getSyncMethod=function(b){return b.localStorage||b.collection&&b.collection.localStorage?a.localSync:a.ajaxSync},a.sync=function(b,c,d){return a.getSyncMethod(c).apply(this,[b,c,d])},a.LocalStorage});