"use strict";(self.webpackChunkvuePlayer=self.webpackChunkvuePlayer||[]).push([[110],{5255:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var r=n(2912),a={ref:"container"};n(5666),n(2322),n(9600),n(2070),n(4723),n(3296),n(1539),n(5334),n(9070),n(9751),n(2526),n(8833),n(5003),n(5090),n(9337),n(9664),n(1817),n(8288),n(6992),n(2129),n(3948),n(7633),n(8309),n(3675);var o=n(9853),i=n(7724),l=n(8941),s=n(9814);function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t,n,r,a,o,i){try{var l=e[o](i),s=l.value}catch(e){return void n(e)}l.done?t(s):Promise.resolve(s).then(r,a)}var h=/[?&](?:list|channel)=([a-zA-Z0-9_-]+)/,b=/user\/([a-zA-Z0-9_-]+)\/?/,m=/youtube-nocookie\.com/;const P={displayName:"YouTube",canPlay:i.tW.youtube,mixins:[l.Y],props:{config:s.$},computed:{styles:function(){return{display:this.display,width:"100%",height:"100%"}}},methods:{play:function(){this.callPlayer("playVideo")},pause:function(){this.callPlayer("pauseVideo")},stop:function(){document.body.contains(this.callPlayer("getIframe"))&&this.callPlayer("stopVideo")},seekTo:function(e){this.callPlayer("seekTo",e),this.playing||this.pause()},setVolume:function(e){this.callPlayer("setVolume",100*e)},mute:function(){this.callPlayer("mute")},unmute:function(){this.callPlayer("unmute")},setPlaybackRate:function(e){this.callPlayer("setPlaybackRate",e)},setLoop:function(e){this.callPlayer("setLoop",e)},getDuration:function(){return this.callPlayer("getDuration")},getCurrentTime:function(){return this.callPlayer("getCurrentTime")},getSecondsLoaded:function(){return this.callPlayer("getVideoLoadedFraction")*this.getDuration()},load:function(e,t){var n,r=this;return(n=regeneratorRuntime.mark((function n(){var a,i,l,s,u,c,y,f,d,P,g;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,a=r.playing,i=r.muted,l=r.playsinline,s=r.controls,u=r.loop,c=r.config,y=r.onError,f=c.playerVars,d=c.embedOptions,P=r.getID(e),!t){n.next=10;break}if(!(h.test(e)||b.test(e)||e instanceof Array)){n.next=8;break}return r.player.loadPlaylist(r.parsePlaylist(e)),n.abrupt("return");case 8:return r.player.cueVideoById({videoId:P,startSeconds:(0,o.pH)(e)||f.start,endSeconds:(0,o.Ct)(e)||f.end}),n.abrupt("return");case 10:return n.next=12,(0,o.Kb)("https://www.youtube.com/iframe_api","YT","onYouTubeIframeAPIReady",(function(e){return e.loaded}));case 12:if(g=n.sent,r.container){n.next=15;break}return n.abrupt("return");case 15:r.player=new g.Player(r.container,p({width:"100%",height:"100%",videoId:P,playerVars:p(p({autoplay:a?1:0,mute:i?1:0,controls:s?1:0,start:(0,o.pH)(e),end:(0,o.Ct)(e),origin:window.location.origin,playsinline:l?1:0},r.parsePlaylist(e)),f),events:{onReady:function(){u&&r.player.setLoop(!0),r.onReady()},onPlaybackRateChange:function(e){return r.onPlaybackRateChange(e.data)},onStateChange:r.onStateChange,onError:function(e){return y(e.data)}},host:m.test(e)?"https://www.youtube-nocookie.com":void 0},d)),d.events&&console.warn("Using `embedOptions.events` will likely break things. Use ReactPlayer’s callback props instead, eg onReady, onPlay, onPause"),n.next=22;break;case 19:n.prev=19,n.t0=n.catch(0),r.onError(n.t0);case 22:case"end":return n.stop()}}),n,null,[[0,19]])})),function(){var e=this,t=arguments;return new Promise((function(r,a){var o=n.apply(e,t);function i(e){d(o,r,a,i,l,"next",e)}function l(e){d(o,r,a,i,l,"throw",e)}i(void 0)}))})()},parsePlaylist:function(e){return e instanceof Array?{listType:"playlist",playlist:e.map(this.getID).join(",")}:h.test(e)?{listType:"playlist",list:u(e.match(h),2)[1].replace(/^UC/,"UU")}:b.test(e)?{listType:"user_uploads",list:u(e.match(b),2)[1]}:{}},onStateChange:function(e){var t=e.data,n=this.onPlay,r=this.onPause,a=this.onBuffer,o=this.onBufferEnd,i=this.onEnded,l=this.onReady,s=this.loop,u=this.config,c=u.playerVars,y=u.onUnstarted,p=window.YT.PlayerState,f=p.UNSTARTED,d=p.PLAYING,h=p.PAUSED,b=p.BUFFERING,m=p.ENDED,P=p.CUED;if(t===f&&y(),t===d&&(n(),o()),t===h&&r(),t===b&&a(),t===m){var g=!!this.callPlayer("getPlaylist");s&&!g&&(c.start?this.seekTo(c.start):this.play()),i()}t===P&&l()}}},g=(0,n(3744).Z)(P,[["render",function(e,t,n,o,i,l){return(0,r.openBlock)(),(0,r.createElementBlock)("div",{class:"vue-player--youtube",style:(0,r.normalizeStyle)(l.styles)},[(0,r.createElementVNode)("div",a,null,512)],4)}]])}}]);