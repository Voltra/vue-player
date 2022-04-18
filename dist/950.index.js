"use strict";(self.webpackChunkvuePlayer=self.webpackChunkvuePlayer||[]).push([[950],{8758:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var r=n(2912),a={ref:"container"};n(5666),n(2322),n(4723),n(6394),n(8674),n(4649),n(7941),n(2004),n(7327),n(815),n(4747),n(9337),n(9664);var o=n(7724),i=n(8941),l=n(1746),u=n(9853),c=n(1687);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){y(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t,n,r,a,o,i){try{var l=e[o](i),u=l.value}catch(e){return void n(e)}l.done?t(u):Promise.resolve(u).then(r,a)}const f={displayName:"Vidyard",canPlay:o.tW.vidyard,mixins:[i.Y],props:{config:c.T,display:l.ZP.string.def("block")},computed:{styles:function(){return{display:this.display,width:"100%",height:"100%"}}},methods:{play:function(){this.callPlayer("play")},pause:function(){this.callPlayer("pause")},stop:function(){var e,t,n;null===(e=window.VidyardV4)||void 0===e||null===(t=e.api)||void 0===t||null===(n=t.destroyPlayer)||void 0===n||n.call(t,this.player)},seekTo:function(e){this.callPlayer("seek",e)},setVolume:function(e){this.callPlayer("setVolume",e)},mute:function(){this.setVolume(0)},unmute:function(){this.volume&&this.setVolume(this.volume)},setPlaybackRate:function(e){this.callPlayer("setPlaybackSpeed",e)},getDuration:function(){return this.duration},getCurrentTime:function(){return this.callPlayer("currentTime")},getSecondsLoaded:function(){return null},load:function(e){var t,n=this;return(t=regeneratorRuntime.mark((function t(){var r,a,i,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r=n.playing,a=n.config,i=(null!=e?e:n.url).match(o.bB)[1],n.player&&n.stop(),t.next=6,(0,u.Kb)("https://play.vidyard.com/embed/v4.js","VidyardV4","onVidyardAPI");case 6:if(l=t.sent,n.$refs.container){t.next=9;break}return t.abrupt("return");case 9:l.api.addReadyListener((function(e,t){n.player=t,n.player.on("ready",n.onReady),n.player.on("play",n.onPlay),n.player.on("pause",n.onPause),n.player.on("seek",n.onSeek),n.player.on("playerComplete",n.onEnded)}),i),l.api.renderPlayer(p({uuid:i,container:n.$refs.container,autoplay:r?1:0},a.options)),l.api.getPlayerMetadata(i).then((function(e){n.duration=e.length_in_seconds,n.onDuration(e.length_in_seconds)})),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(0),n.onError(t.t0);case 17:case"end":return t.stop()}}),t,null,[[0,14]])})),function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(e){d(o,r,a,i,l,"next",e)}function l(e){d(o,r,a,i,l,"throw",e)}i(void 0)}))})()}}},h=(0,n(6021).Z)(f,[["render",function(e,t,n,o,i,l){return(0,r.openBlock)(),(0,r.createElementBlock)("div",{style:(0,r.normalizeStyle)(l.styles)},[(0,r.createElementVNode)("div",a,null,512)],4)}]])}}]);