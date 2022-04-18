"use strict";(self.webpackChunkvuePlayer=self.webpackChunkvuePlayer||[]).push([[628],{4286:(e,t,n)=>{n.r(t),n.d(t,{default:()=>v});var r=n(2912),a=["id"];n(7588),n(4916),n(5017),n(1539),n(5334),n(9070),n(9751),n(2526),n(8833),n(5003),n(4747),n(9174),n(3321);var o=n(9853),i=n(7724),l=n(8941),c=n(2731);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t,n,r,a,o,i){try{var l=e[o](i),c=l.value}catch(e){return void n(e)}l.done?t(c):Promise.resolve(c).then(r,a)}const y={displayName:"Twitch",canPlay:i.tW.twitch,loopOnEnded:!0,mixins:[l.Y],props:{config:c.W},data:function(){return{randomId:"".concat("twitch-player-").concat((0,o.O1)())}},computed:{pid:function(){var e;return null!==(e=this.config.playerId)&&void 0!==e?e:this.randomId}},methods:{play:function(){this.callPlayer("play")},pause:function(){this.callPlayer("pause")},stop:function(){this.callPlayer("pause")},seekTo:function(e){this.callPlayer("seek",e)},setVolume:function(e){this.callPlayer("setVolume",e)},unmute:function(){this.callPlayer("setMuted",!1)},getDuration:function(){return this.callPlayer("getDuration")},getCurrentTime:function(){return this.callPlayer("getCurrentTime")},getSecondsLoaded:function(){return null},load:function(e,t){var n,r=this;return(n=regeneratorRuntime.mark((function n(){var a,l,c,u,d,p,y,v,f,h,P,m,b,O,E,g,w,j;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,a=r.playsinline,l=r.config,c=r.controls,u=i.vv.test(e),d=u?e.match(i.vv)[1]:e.match(MATCH_URL_TWITCH_VIDEO)[1],!t){n.next=7;break}return u?null===(p=r.player)||void 0===p||null===(y=p.setChannel)||void 0===y||y.call(p,d):null===(v=r.player)||void 0===v||null===(f=v.setVideo)||void 0===f||f.call(v,"v"+d),n.abrupt("return");case 7:return n.next=9,getSDK("https://player.twitch.tv/js/embed/v1.js","Twitch");case 9:h=n.sent,r.player=new h.Player(r.pid,s({video:u?"":d,channel:u?d:"",height:"100%",width:"100%",playsinline:a,autoplay:r.playing,muted:r.muted,controls:!!u||c,time:(0,o.pH)(e)},l.options)),P=h.Player,m=P.READY,b=P.PLAYING,O=P.PAUSE,E=P.ENDED,g=P.ONLINE,w=P.OFFLINE,j=P.SEEK,r.player.addEventListener(m,r.onReady),r.player.addEventListener(b,r.onPlay),r.player.addEventListener(O,r.onPause),r.player.addEventListener(E,r.onEnded),r.player.addEventListener(j,r.onSeek),r.player.addEventListener(g,r.onLoaded),r.player.addEventListener(w,r.onLoaded),n.next=24;break;case 21:n.prev=21,n.t0=n.catch(0),r.onError(n.t0);case 24:case"end":return n.stop()}}),n,null,[[0,21]])})),function(){var e=this,t=arguments;return new Promise((function(r,a){var o=n.apply(e,t);function i(e){p(o,r,a,i,l,"next",e)}function l(e){p(o,r,a,i,l,"throw",e)}i(void 0)}))})()}}},v=(0,n(3744).Z)(y,[["render",function(e,t,n,o,i,l){return(0,r.openBlock)(),(0,r.createElementBlock)("div",{class:"vue-player--twitch",id:l.pid},null,8,a)}]])}}]);