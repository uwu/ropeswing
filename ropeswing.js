"use strict";(()=>{var H=Object.defineProperty;var E=(e,t)=>{for(var o in t)H(e,o,{get:t[o],enumerable:!0})};var $=["a","b","i"],p=new Map;function C(e,t,o,n,i){let r=p.get(t)?.[e];if(!r)return i?Reflect.construct(t[e],o,n):t[e].apply(n,o);for(let s of r.b.values()){let c=s.call(n,o);Array.isArray(c)&&(o=c)}let a=[...r.i.values()].reduce((s,c)=>(...w)=>c.call(n,w,s),(...s)=>i?Reflect.construct(r.o,s,n):r.o.apply(n,s))(...o);for(let s of r.a.values())a=s.call(n,o,a)??a;return a}function S(e,t,o,n){let i=p.get(e),r=i?.[t];return r?.[n].has(o)?(r[n].delete(o),$.every(a=>r[a].size===0)&&(Reflect.defineProperty(e,t,{value:r.o,writable:!0,configurable:!0})||(e[t]=r.o),delete i[t]),Object.keys(i).length==0&&p.delete(e),!0):!1}var h=e=>(t,o,n,i=!1)=>{if(typeof o[t]!="function")throw new Error(`${t} is not a function in ${o.constructor.name}`);p.has(o)||p.set(o,{});let r=p.get(o);if(!r[t]){let c=o[t];r[t]={o:c,b:new Map,i:new Map,a:new Map};let w=(m,l,u)=>{let B=C(t,o,l,m,u);return i&&s(),B},v=new Proxy(c,{apply:(m,l,u)=>w(l,u,!1),construct:(m,l)=>w(c,l,!0),get:(m,l,u)=>l=="toString"?c.toString.bind(c):Reflect.get(m,l,u)});Reflect.defineProperty(o,t,{value:v,configurable:!0,writable:!0})||(o[t]=v)}let a=Symbol(),s=()=>S(o,t,a,e);return r[t][e].set(a,n),s};var oe=h("b"),O=h("i"),ne=h("a");var _={};E(_,{clear:()=>I,typewrite:()=>q,write:()=>x,writeLine:()=>f});var b={};E(b,{timer:()=>g});var g=e=>new Promise(t=>setTimeout(t,e));var y=document.getElementById("convga");if(!y)throw new Error("Failed to find VGA console element - are we on the right site?");var I=()=>y.innerHTML="",x=(...e)=>y.textContent+=e.join(" "),f=(...e)=>x(e.join(" ")+`
`),q=async(e,...t)=>{for(let o of t.join(" ").split(""))x(o),await g(e)};var j={patches:[{executable:"C:/system/local/bin/shell36",find:/document\.addEventListener\("keydown",/,replace:()=>"("}],manifest:{name:"forcereboot",description:"Removes the reboot confirmation when pressing Ctrl+R or F5",authors:["redstonekasi"]}};var R={patches:[{find:/\(await\(0,.{1,2}\..{1,2}\)\(i\.value\)\)\.valid/,replace:"true"},{find:"the product key you have received on Patreon",replace:e=>`<s>${e}</s> any product key`}],manifest:{name:"keygen",description:"makes the keymgr app (patreon rewards app) accept any key",authors:["Beef"]}};var L={patches:[{find:/{caption:"System Flags",icon:await (.{1,2}\..{1,2}\.getIconUrl)\("objects\/tools"\),onclick:\(\)=>(.{1,2}\..{1,2}\.execCmd)\("flags"\)}/,replace:(e,t,o)=>`${e},{category:"ropeswing"},{caption:"Settings",icon:await ${t}("apps/settings"),onclick:()=>${o}("ctrl", ["--cpl", "ropeswing"])}`},{find:"rcon:k",replace:e=>`${e},ropeswing:$self.applet(__string_require__("Application not found").QP)`}],manifest:{name:"royalmail",description:"settings frontend for ropeswing",authors:["Beef"]},applet:e=>class extends e{constructor(){super()}async main(o){if(super.main(o))return;this.createWindow({taskbar:!1,center:!0,bodyClass:"ropeswing-applet",initialWidth:320,initialHeight:340,resizable:!1,controlBoxStyle:"WS_CBX_CLOSE",title:"ropeswing",body:'<div style="color: red">TODO!</div>'},!0).show()}}};var M={patches:[{find:/run\(await .+?\((.)\)/,replace:(e,t)=>`run(await $self.getFileContent(${t})`}],manifest:{name:"treebranch",description:"ropeswing in userland",authors:["redstonekasi"]},async getFileContent(e){let t=await w96.FS.readstr(e);for(let o of d)for(let n of o.patches)n.executable===e&&(t=t.replace(n.find,k(n.replace,o.manifest.name)));return t}};var T={patches:[{find:/var __webpack_exports__=__webpack_require__\(\d{4}\)/,replace:e=>`${e};$self.unpack(__webpack_require__,__webpack_modules__);`}],manifest:{name:"unbox",description:"webpack unpacker",authors:["Beef"]},unpack(e,t){window.__string_require__=o=>{for(let[n,i]of Object.entries(t)){let r=i.toString();if(o instanceof RegExp&&o.test(r)||typeof o=="string"&&r.includes(o))return e(n)}}}};var W={patches:[{find:/Windows 96 main<br>/,replace:e=>`${e}ropeswing 8f36a1d<br>`}],manifest:{name:"version",description:"show ropeswing version info on desktop",authors:["redstonekasi"]}};var d=[j,R,L,M,T,W];function k(e,t){let o=`ropeswing.extensions["${t}"]`;switch(typeof e){case"string":return e.replaceAll("$self",o);case"function":return(...n)=>e(...n).replaceAll("$self",o)}}function F(e){if(!e.textContent)throw new Error("Script doesn't have textContent, what?");console.group("[ ropeswing-patcher ]");for(let t of d)for(let o of t.patches)o.executable||(e.textContent=e.textContent.replace(o.find,k(o.replace,t.manifest.name)),console.log(`applied patch ${t.patches.indexOf(o)+1} of ${t.patches.length} from ${t.manifest.name}`));console.groupEnd()}var A=()=>({console:_,utils:b,extensions:Object.fromEntries([...d].map(e=>[e.manifest.name,{...e}]))});console.group("[ ropeswing ]");console.log("in kernel ctx...");var z=O("appendChild",document.head,(e,t)=>{z(),e[0]instanceof HTMLScriptElement||t(...e);let o=e[0];f("[ropeswing] preboot loaded. welcome!"),f("exposing API..."),window.ropeswing=A(),f("applying patches..."),F(o),f("booting original!"),t(...e),localStorage["ropeswing-welcome"]!=="true"&&(localStorage["ropeswing-welcome"]="true",w96.evt.sys.on("init-complete",()=>w96.WApplication.execAsync(new class extends w96.WApplication{main(n){super.main(n);let i=this.createWindow({title:"ropeswing",initialHeight:120,initialWidth:260,resizable:!1,bodyClass:"dlg-run-box",controlBoxStyle:"WS_CBX_CLOSE"}),r=i.getBodyContainer();r.innerHTML='<div class="text exp">ropeswing has been installed!<br>Check your system settings in order to configure it.</div><button class="w96-button">OK</button>',r.querySelector("button").addEventListener("click",()=>{i.close()}),i.setPosition(window.innerWidth/2-130,window.innerHeight/2-60),i.show()}},null,null)))});console.log("kernel done!");console.groupEnd();})();
//# sourceURL=ropeswing
