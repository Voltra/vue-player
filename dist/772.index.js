"use strict";(self.webpackChunkvuePlayer=self.webpackChunkvuePlayer||[]).push([[772],{7084:(e,r,n)=>{n.r(r),n.d(r,{default:()=>s});var t=n(2912),a=["src"];n(7588),n(4916),n(5017),n(1539),n(5334);var o=n(7724),u=n(8941);function l(e,r,n,t,a,o,u){try{var l=e[o](u),c=l.value}catch(e){return void n(e)}l.done?r(c):Promise.resolve(c).then(t,a)}const c={displayName:"Streamable",canPlay:o.tW.streamable,mixins:[u.Y],data:function(){return{duration:null,currentTime:null,secondsLoaded:null}},computed:{id:function(){return this.url.match(o.j8)[1]},src:function(){return"https://streamable.com/o/".concat(this.id)}},methods:{play:function(){this.callPlayer("play")},pause:function(){this.callPlayer("pause")},seekTo:function(e){this.callPlayer("setCurrentTime",e)},setVolume:function(e){this.callPlayer("setVolume",100*e)},setLoop:function(e){this.callPlayer("setLoop",e)},mute:function(){this.callPlayer("mute")},unmute:function(){this.callPlayer("unmute")},getDuration:function(){return this.duration},getCurrentTime:function(){return this.currentTime},getSecondsLoaded:function(){return this.secondsLoaded},load:function(e){var r,n=this;return(r=regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,getSDK("https://cdn.embed.ly/player-0.1.0.min.js","playerjs");case 3:if(r=e.sent,n.iframe){e.next=6;break}return e.abrupt("return");case 6:n.player=new r.Player(n.$refs.iframe),n.player.setLoop(n.loop),n.player.on("ready",n.onReady),n.player.on("play",n.onPlay),n.player.on("pause",n.onPause),n.player.on("seeked",n.onSeek),n.player.on("ended",n.onEnded),n.player.on("error",n.onError),n.player.on("timeupdate",(function(e){var r=e.duration,t=e.seconds;n.duration=r,n.currentTime=t})),n.player.on("buffered",(function(e){var r=e.percent;n.duration&&(n.secondsLoaded=n.duration*r)})),n.muted&&n.player.mute(),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(0),n.onError(e.t0);case 22:case"end":return e.stop()}}),e,null,[[0,19]])})),function(){var e=this,n=arguments;return new Promise((function(t,a){var o=r.apply(e,n);function u(e){l(o,t,a,u,c,"next",e)}function c(e){l(o,t,a,u,c,"throw",e)}u(void 0)}))})()}}},s=(0,n(3744).Z)(c,[["render",function(e,r,n,o,u,l){return(0,t.openBlock)(),(0,t.createElementBlock)("iframe",{class:"vue-player--streamable",ref:"iframe",src:l.src,frameborder:"0",scrolling:"no",allowfullscreen:""},null,8,a)}]])}}]);