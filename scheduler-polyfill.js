!function(){var t=["user-blocking","user-visible","background"];class i{constructor(){this.t=new MessageChannel,this.i=this.t.port2,this.l={},this.o=1,this.t.port1.onmessage=t=>this.h(t)}u(t){var i=this.o++;return this.l[i]=t,this.i.postMessage(i),i}p(t){delete this.l[t]}h(t){var i=t.data;if(i in this.l){var r=this.l[i];delete this.l[i],r()}}}function r(){return r.v||(r.v=new i),r.v}class s{constructor(t,i,r){void 0===r&&(r=0),this.k=t,this.T=null,this.C=null,this.m=!1,this._(i,r)}isIdleCallback(){return 0===this.T}I(){return 2===this.T}cancel(){if(!this.m)switch(this.m=!0,this.T){case 0:cancelIdleCallback(this.C);break;case 1:clearTimeout(this.C);break;case 2:r().p(this.C);break;default:throw new TypeError("Unknown CallbackType")}}_(i,s){if(s&&s>0)return this.T=1,void(this.C=setTimeout(()=>{this.P()},s));if(!t.includes(i))throw new TypeError("Invalid task priority : "+i);return"background"===i&&"function"==typeof requestIdleCallback?(this.T=0,void(this.C=requestIdleCallback(()=>{this.P()}))):"function"==typeof MessageChannel?(this.T=2,void(this.C=r().u(()=>{this.P()}))):(this.T=1,void(this.C=setTimeout(()=>{this.P()})))}P(){this.m||this.k()}}var e=0;class n{constructor(){this.j=null,this.M=null}isEmpty(){return null==this.j}push(t){if("object"!=typeof t)throw new TypeError("Task must be an Object");t.A=e++,this.isEmpty()?(t.N=null,this.j=t):(t.N=this.M,this.M.O=t),t.O=null,this.M=t}takeNextTask(){if(this.isEmpty())return null;var t=this.j;return this.q(t),t}merge(t,i){if("function"!=typeof i)throw new TypeError("Must provide a selector function.");if(null==t)throw new Error("sourceQueue cannot be null");for(var r=this.j,s=null,e=t.j;e;){var n=e;if(e=e.O,i(n)){for(t.q(n);r&&r.A<n.A;)s=r,r=r.O;this.D(n,s),s=n}}}D(t,i){if(i!=this.M){var r=i?i.O:this.j;t.O=r,r.N=t,t.N=i,null!=i?i.O=t:this.j=t}else this.push(t)}q(t){if(null==t)throw new Error("Expected task to be non-null");t===this.j&&(this.j=t.O),t===this.M&&(this.M=this.M.N),t.O&&(t.O.N=t.N),t.N&&(t.N.O=t.O)}}class l extends Event{constructor(i,r){if(!r||!t.includes(r.previousPriority))throw new TypeError("Invalid task priority: '"+r.previousPriority+"'");super(i),this.previousPriority=r.previousPriority}}class o extends AbortController{constructor(i){if(void 0===i&&(i={}),super(),null==i&&(i={}),"object"!=typeof i)throw new TypeError("'init' is not an object");var r,s,e=void 0===i.priority?"user-visible":i.priority;if(!t.includes(e))throw new TypeError("Invalid task priority: '"+e+"'");this.H=e,this.R=!1,s=(r=this).signal,Object.defineProperties(s,{priority:{get:function(){return r.H},enumerable:!0},onprioritychange:{value:null,writable:!0,enumerable:!0}}),s.addEventListener("prioritychange",t=>{s.onprioritychange&&s.onprioritychange(t)})}setPriority(i){if(!t.includes(i))throw new TypeError("Invalid task priority: "+i);if(this.R)throw new DOMException("","NotAllowedError");if(this.signal.priority!==i){this.R=!0;var r=this.H;this.H=i;var s=new l("prioritychange",{previousPriority:r});this.signal.dispatchEvent(s),this.R=!1}}}void 0===self.scheduler?(self.scheduler=new class{constructor(){this.S={},t.forEach(t=>{this.S[t]=[new n,new n]}),this.U=null,this.W=new WeakMap}yield(){return this.B(()=>{},{priority:"user-visible"},!0)}postTask(t,i){return this.B(t,i,!1)}B(i,r,s){if(void 0!==(r=Object.assign({},r)).signal){if(null===r.signal||!("aborted"in r.signal)||"function"!=typeof r.signal.addEventListener)return Promise.reject(new TypeError("'signal' is not a valid 'AbortSignal'"));if(r.signal&&r.signal.priority&&!t.includes(r.signal.priority))return Promise.reject(new TypeError("Invalid task priority: '"+r.signal.priority+"'"))}if(void 0!==r.priority&&(null===r.priority||!t.includes(r.priority)))return Promise.reject(new TypeError("Invalid task priority: '"+r.priority+"'"));if(void 0===r.delay&&(r.delay=0),r.delay=Number(r.delay),r.delay<0)return Promise.reject(new TypeError("'delay' must be a positive number."));var e={callback:i,options:r,resolve:null,reject:null,hostCallback:null,abortCallback:null,onTaskCompleted:function(){this.options.signal&&this.abortCallback&&(this.options.signal.removeEventListener("abort",this.abortCallback),this.abortCallback=null)},onTaskAborted:function(){this.hostCallback&&(this.hostCallback.cancel(),this.hostCallback=null),this.options.signal.removeEventListener("abort",this.abortCallback),this.abortCallback=null,this.reject(this.options.signal.reason)},isAborted:function(){return this.options.signal&&this.options.signal.aborted},isContinuation:s},n=new Promise((t,i)=>{e.resolve=t,e.reject=i});return this._(e),n}_(t){var i=t.options.signal;if(i){if(i.aborted)return void t.reject(i.reason);t.abortCallback=()=>{t.onTaskAborted()},i.addEventListener("abort",t.abortCallback)}t.options.delay>0?t.hostCallback=new s(()=>{t.hostCallback=null,this.F(t)},null,t.options.delay):(this.G(t),this.J())}F(t){this.G(t),this.U&&(this.U.cancel(),this.U=null),this.K()}L(t){var i=this.W.get(t);if(void 0===i)throw new Error("Attempting to change priority on an unregistered signal");if(i!==t.priority){for(var r=0;r<2;r++)this.S[t.priority][r].merge(this.S[i][r],i=>i.options.signal===t);this.W.set(t,t.priority)}}K(){this.U=null,this.V(),this.J()}J(){var{priority:t}=this.X();null!=t&&("background"!==t&&this.U&&this.U.isIdleCallback()&&(this.U.cancel(),this.U=null),this.U||(this.U=new s(()=>{this.K()},t,0)))}G(i){var r;if(!t.includes(r=i.options.priority?i.options.priority:i.options.signal&&i.options.signal.priority?i.options.signal.priority:"user-visible"))throw new TypeError("Invalid task priority: "+r);if(i.options.signal&&i.options.signal.priority){var s=i.options.signal;this.W.has(s)||(s.addEventListener("prioritychange",()=>{this.L(s)}),this.W.set(s,s.priority))}this.S[r][i.isContinuation?0:1].push(i)}V(){var t=null;do{var{priority:i,type:r}=this.X();if(null==i)return;t=this.S[i][r].takeNextTask()}while(t.isAborted());try{var s=t.callback();t.resolve(s)}catch(i){t.reject(i)}finally{t.onTaskCompleted()}}X(){for(var i=0;i<t.length;i++)for(var r=t[i],s=0;s<2;s++)if(!this.S[r][s].isEmpty())return{priority:r,type:s};return{priority:null,type:0}}},self.TaskController=o,self.TaskPriorityChangeEvent=l):self.scheduler.yield||(self.scheduler.yield=function(){return self.scheduler.postTask(()=>{},{priority:"user-blocking"})})}();
//# sourceMappingURL=scheduler-polyfill.js.map