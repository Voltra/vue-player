"use strict";(self.webpackChunkvuePlayer=self.webpackChunkvuePlayer||[]).push([[925],{5e3:(e,n,t)=>{t.r(n),t.d(n,{default:()=>f});var a=t(2912),l=["id"];t(5666),t(2322),t(4723),t(6394),t(4747),t(5334),t(9070),t(9751),t(2526),t(8833),t(5003),t(9174),t(3321);var r=t(9853),o=t(7724),i=t(8941),u=t(6073);function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){d(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function d(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function p(e,n,t,a,l,r,o){try{var i=e[r](o),u=i.value}catch(e){return void t(e)}i.done?n(u):Promise.resolve(u).then(a,l)}const y={displayName:"Wistia",canPlay:o.tW.wistia,loopOnEnded:!0,mixins:[i.Y],props:{config:u.o},data:function(){return{randomId:"".concat("wistia-player-").concat((0,r.O1)())}},computed:{pid:function(){var e;return null!==(e=this.config.playerId)&&void 0!==e?e:this.randomId},videoId:function(){var e,n,t;return null===(e=this.url)||void 0===e||null===(n=e.match)||void 0===n||null===(t=n.call(e,o.xF))||void 0===t?void 0:t[1]},className:function(){return"vue-player--wistia wistia_embed wistia_async_".concat(this.videoId)}},methods:{play:function(){this.callPlayer("play")},pause:function(){this.callPlayer("pause")},stop:function(){this.unbind(),this.callPlayer("remove")},seekTo:function(e){this.callPlayer("time",e)},setVolume:function(e){this.callPlayer("volume",e)},mute:function(){this.callPlayer("mute")},unmute:function(){this.callPlayer("unmute")},setPlaybackRate:function(e){this.callPlayer("playbackRate",e)},getDuration:function(){return this.callPlayer("duration")},getCurrentTime:function(){return this.callPlayer("time")},getSecondsLoaded:function(){return null},load:function(e){var n,t=this;return(n=regeneratorRuntime.mark((function e(){var n,a,l,r,o,i,u,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,l=t.playing,r=t.muted,o=t.controls,i=t.onReady,u=t.config,t.onError,e.next=4,getSDK("https://fast.wistia.com/assets/external/E-v1.js","Wistia");case 4:c=e.sent,null===(n=u.customControls)||void 0===n||null===(a=n.forEach)||void 0===a||a.call(n,(function(e){return c.defineControl(e)})),window._wq=window._wq||[],window._wq.push({id:t.playerID,options:s({autoPlay:l,silentAutoPlay:"allow",muted:r,controlsVisibleOnLoad:o,fullscreenButton:o,playbar:o,playbackRateControl:o,qualityControl:o,volumeControl:o,settingsControl:o,smallPlayButton:o},u.options),onReady:function(e){t.player=e,t.unbind(),t.player.bind("play",t.onPlay),t.player.bind("pause",t.onPause),t.player.bind("seek",t.onSeek),t.player.bind("end",t.onEnded),t.player.bind("playbackratechange",t.onPlaybackRateChange),i()}}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),t.onError(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})),function(){var e=this,t=arguments;return new Promise((function(a,l){var r=n.apply(e,t);function o(e){p(r,a,l,o,i,"next",e)}function i(e){p(r,a,l,o,i,"throw",e)}o(void 0)}))})()},unbind:function(){var e,n,t,a,l,r,o,i,u,c;null===(e=this.player)||void 0===e||null===(n=e.unbind)||void 0===n||n.call(e,"play",this.onPlay),null===(t=this.player)||void 0===t||null===(a=t.unbind)||void 0===a||a.call(t,"pause",this.onPause),null===(l=this.player)||void 0===l||null===(r=l.unbind)||void 0===r||r.call(l,"seek",this.onSeek),null===(o=this.player)||void 0===o||null===(i=o.unbind)||void 0===i||i.call(o,"end",this.onEnded),null===(u=this.player)||void 0===u||null===(c=u.unbind)||void 0===c||c.call(u,"playbackratechange",this.onPlaybackRateChange)}}},f=(0,t(3744).Z)(y,[["render",function(e,n,t,r,o,i){return(0,a.openBlock)(),(0,a.createElementBlock)("div",{id:i.pid,key:i.videoId,class:(0,a.normalizeClass)(i.className)},null,10,l)}]])}}]);