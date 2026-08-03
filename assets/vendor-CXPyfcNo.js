var lk=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ak(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var $u={exports:{}},ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ip;function Qy(){if(Ip)return ee;Ip=1;var i=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),d=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),E=Symbol.iterator;function T(y){return y===null||typeof y!="object"?null:(y=E&&y[E]||y["@@iterator"],typeof y=="function"?y:null)}var x={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,V={};function K(y,R,B){this.props=y,this.context=R,this.refs=V,this.updater=B||x}K.prototype.isReactComponent={},K.prototype.setState=function(y,R){if(typeof y!="object"&&typeof y!="function"&&y!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,y,R,"setState")},K.prototype.forceUpdate=function(y){this.updater.enqueueForceUpdate(this,y,"forceUpdate")};function Pe(){}Pe.prototype=K.prototype;function Me(y,R,B){this.props=y,this.context=R,this.refs=V,this.updater=B||x}var Ae=Me.prototype=new Pe;Ae.constructor=Me,b(Ae,K.prototype),Ae.isPureReactComponent=!0;var Te=Array.isArray,nt=Object.prototype.hasOwnProperty,Oe={current:null},je={key:!0,ref:!0,__self:!0,__source:!0};function rt(y,R,B){var te,X={},he=null,se=null;if(R!=null)for(te in R.ref!==void 0&&(se=R.ref),R.key!==void 0&&(he=""+R.key),R)nt.call(R,te)&&!je.hasOwnProperty(te)&&(X[te]=R[te]);var ce=arguments.length-2;if(ce===1)X.children=B;else if(1<ce){for(var oe=Array(ce),st=0;st<ce;st++)oe[st]=arguments[st+2];X.children=oe}if(y&&y.defaultProps)for(te in ce=y.defaultProps,ce)X[te]===void 0&&(X[te]=ce[te]);return{$$typeof:i,type:y,key:he,ref:se,props:X,_owner:Oe.current}}function vt(y,R){return{$$typeof:i,type:y.type,key:R,ref:y.ref,props:y.props,_owner:y._owner}}function Rt(y){return typeof y=="object"&&y!==null&&y.$$typeof===i}function nr(y){var R={"=":"=0",":":"=2"};return"$"+y.replace(/[=:]/g,function(B){return R[B]})}var Ht=/\/+/g;function ft(y,R){return typeof y=="object"&&y!==null&&y.key!=null?nr(""+y.key):R.toString(36)}function Pt(y,R,B,te,X){var he=typeof y;(he==="undefined"||he==="boolean")&&(y=null);var se=!1;if(y===null)se=!0;else switch(he){case"string":case"number":se=!0;break;case"object":switch(y.$$typeof){case i:case e:se=!0}}if(se)return se=y,X=X(se),y=te===""?"."+ft(se,0):te,Te(X)?(B="",y!=null&&(B=y.replace(Ht,"$&/")+"/"),Pt(X,R,B,"",function(st){return st})):X!=null&&(Rt(X)&&(X=vt(X,B+(!X.key||se&&se.key===X.key?"":(""+X.key).replace(Ht,"$&/")+"/")+y)),R.push(X)),1;if(se=0,te=te===""?".":te+":",Te(y))for(var ce=0;ce<y.length;ce++){he=y[ce];var oe=te+ft(he,ce);se+=Pt(he,R,B,oe,X)}else if(oe=T(y),typeof oe=="function")for(y=oe.call(y),ce=0;!(he=y.next()).done;)he=he.value,oe=te+ft(he,ce++),se+=Pt(he,R,B,oe,X);else if(he==="object")throw R=String(y),Error("Objects are not valid as a React child (found: "+(R==="[object Object]"?"object with keys {"+Object.keys(y).join(", ")+"}":R)+"). If you meant to render a collection of children, use an array instead.");return se}function jt(y,R,B){if(y==null)return y;var te=[],X=0;return Pt(y,te,"","",function(he){return R.call(B,he,X++)}),te}function it(y){if(y._status===-1){var R=y._result;R=R(),R.then(function(B){(y._status===0||y._status===-1)&&(y._status=1,y._result=B)},function(B){(y._status===0||y._status===-1)&&(y._status=2,y._result=B)}),y._status===-1&&(y._status=0,y._result=R)}if(y._status===1)return y._result.default;throw y._result}var Se={current:null},L={transition:null},$={ReactCurrentDispatcher:Se,ReactCurrentBatchConfig:L,ReactCurrentOwner:Oe};return ee.Children={map:jt,forEach:function(y,R,B){jt(y,function(){R.apply(this,arguments)},B)},count:function(y){var R=0;return jt(y,function(){R++}),R},toArray:function(y){return jt(y,function(R){return R})||[]},only:function(y){if(!Rt(y))throw Error("React.Children.only expected to receive a single React element child.");return y}},ee.Component=K,ee.Fragment=n,ee.Profiler=l,ee.PureComponent=Me,ee.StrictMode=s,ee.Suspense=m,ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,ee.cloneElement=function(y,R,B){if(y==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+y+".");var te=b({},y.props),X=y.key,he=y.ref,se=y._owner;if(R!=null){if(R.ref!==void 0&&(he=R.ref,se=Oe.current),R.key!==void 0&&(X=""+R.key),y.type&&y.type.defaultProps)var ce=y.type.defaultProps;for(oe in R)nt.call(R,oe)&&!je.hasOwnProperty(oe)&&(te[oe]=R[oe]===void 0&&ce!==void 0?ce[oe]:R[oe])}var oe=arguments.length-2;if(oe===1)te.children=B;else if(1<oe){ce=Array(oe);for(var st=0;st<oe;st++)ce[st]=arguments[st+2];te.children=ce}return{$$typeof:i,type:y.type,key:X,ref:he,props:te,_owner:se}},ee.createContext=function(y){return y={$$typeof:d,_currentValue:y,_currentValue2:y,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},y.Provider={$$typeof:u,_context:y},y.Consumer=y},ee.createElement=rt,ee.createFactory=function(y){var R=rt.bind(null,y);return R.type=y,R},ee.createRef=function(){return{current:null}},ee.forwardRef=function(y){return{$$typeof:f,render:y}},ee.isValidElement=Rt,ee.lazy=function(y){return{$$typeof:S,_payload:{_status:-1,_result:y},_init:it}},ee.memo=function(y,R){return{$$typeof:g,type:y,compare:R===void 0?null:R}},ee.startTransition=function(y){var R=L.transition;L.transition={};try{y()}finally{L.transition=R}},ee.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},ee.useCallback=function(y,R){return Se.current.useCallback(y,R)},ee.useContext=function(y){return Se.current.useContext(y)},ee.useDebugValue=function(){},ee.useDeferredValue=function(y){return Se.current.useDeferredValue(y)},ee.useEffect=function(y,R){return Se.current.useEffect(y,R)},ee.useId=function(){return Se.current.useId()},ee.useImperativeHandle=function(y,R,B){return Se.current.useImperativeHandle(y,R,B)},ee.useInsertionEffect=function(y,R){return Se.current.useInsertionEffect(y,R)},ee.useLayoutEffect=function(y,R){return Se.current.useLayoutEffect(y,R)},ee.useMemo=function(y,R){return Se.current.useMemo(y,R)},ee.useReducer=function(y,R,B){return Se.current.useReducer(y,R,B)},ee.useRef=function(y){return Se.current.useRef(y)},ee.useState=function(y){return Se.current.useState(y)},ee.useSyncExternalStore=function(y,R,B){return Se.current.useSyncExternalStore(y,R,B)},ee.useTransition=function(){return Se.current.useTransition()},ee.version="18.2.0",ee}var Tp;function qy(){return Tp||(Tp=1,$u.exports=Qy()),$u.exports}var Gu={exports:{}},dt={},Ku={exports:{}},Qu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kp;function Yy(){return kp||(kp=1,(function(i){function e(L,$){var y=L.length;L.push($);e:for(;0<y;){var R=y-1>>>1,B=L[R];if(0<l(B,$))L[R]=$,L[y]=B,y=R;else break e}}function n(L){return L.length===0?null:L[0]}function s(L){if(L.length===0)return null;var $=L[0],y=L.pop();if(y!==$){L[0]=y;e:for(var R=0,B=L.length,te=B>>>1;R<te;){var X=2*(R+1)-1,he=L[X],se=X+1,ce=L[se];if(0>l(he,y))se<B&&0>l(ce,he)?(L[R]=ce,L[se]=y,R=se):(L[R]=he,L[X]=y,R=X);else if(se<B&&0>l(ce,y))L[R]=ce,L[se]=y,R=se;else break e}}return $}function l(L,$){var y=L.sortIndex-$.sortIndex;return y!==0?y:L.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;i.unstable_now=function(){return u.now()}}else{var d=Date,f=d.now();i.unstable_now=function(){return d.now()-f}}var m=[],g=[],S=1,E=null,T=3,x=!1,b=!1,V=!1,K=typeof setTimeout=="function"?setTimeout:null,Pe=typeof clearTimeout=="function"?clearTimeout:null,Me=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Ae(L){for(var $=n(g);$!==null;){if($.callback===null)s(g);else if($.startTime<=L)s(g),$.sortIndex=$.expirationTime,e(m,$);else break;$=n(g)}}function Te(L){if(V=!1,Ae(L),!b)if(n(m)!==null)b=!0,it(nt);else{var $=n(g);$!==null&&Se(Te,$.startTime-L)}}function nt(L,$){b=!1,V&&(V=!1,Pe(rt),rt=-1),x=!0;var y=T;try{for(Ae($),E=n(m);E!==null&&(!(E.expirationTime>$)||L&&!nr());){var R=E.callback;if(typeof R=="function"){E.callback=null,T=E.priorityLevel;var B=R(E.expirationTime<=$);$=i.unstable_now(),typeof B=="function"?E.callback=B:E===n(m)&&s(m),Ae($)}else s(m);E=n(m)}if(E!==null)var te=!0;else{var X=n(g);X!==null&&Se(Te,X.startTime-$),te=!1}return te}finally{E=null,T=y,x=!1}}var Oe=!1,je=null,rt=-1,vt=5,Rt=-1;function nr(){return!(i.unstable_now()-Rt<vt)}function Ht(){if(je!==null){var L=i.unstable_now();Rt=L;var $=!0;try{$=je(!0,L)}finally{$?ft():(Oe=!1,je=null)}}else Oe=!1}var ft;if(typeof Me=="function")ft=function(){Me(Ht)};else if(typeof MessageChannel<"u"){var Pt=new MessageChannel,jt=Pt.port2;Pt.port1.onmessage=Ht,ft=function(){jt.postMessage(null)}}else ft=function(){K(Ht,0)};function it(L){je=L,Oe||(Oe=!0,ft())}function Se(L,$){rt=K(function(){L(i.unstable_now())},$)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(L){L.callback=null},i.unstable_continueExecution=function(){b||x||(b=!0,it(nt))},i.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):vt=0<L?Math.floor(1e3/L):5},i.unstable_getCurrentPriorityLevel=function(){return T},i.unstable_getFirstCallbackNode=function(){return n(m)},i.unstable_next=function(L){switch(T){case 1:case 2:case 3:var $=3;break;default:$=T}var y=T;T=$;try{return L()}finally{T=y}},i.unstable_pauseExecution=function(){},i.unstable_requestPaint=function(){},i.unstable_runWithPriority=function(L,$){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var y=T;T=L;try{return $()}finally{T=y}},i.unstable_scheduleCallback=function(L,$,y){var R=i.unstable_now();switch(typeof y=="object"&&y!==null?(y=y.delay,y=typeof y=="number"&&0<y?R+y:R):y=R,L){case 1:var B=-1;break;case 2:B=250;break;case 5:B=1073741823;break;case 4:B=1e4;break;default:B=5e3}return B=y+B,L={id:S++,callback:$,priorityLevel:L,startTime:y,expirationTime:B,sortIndex:-1},y>R?(L.sortIndex=y,e(g,L),n(m)===null&&L===n(g)&&(V?(Pe(rt),rt=-1):V=!0,Se(Te,y-R))):(L.sortIndex=B,e(m,L),b||x||(b=!0,it(nt))),L},i.unstable_shouldYield=nr,i.unstable_wrapCallback=function(L){var $=T;return function(){var y=T;T=$;try{return L.apply(this,arguments)}finally{T=y}}}})(Qu)),Qu}var Np;function Xy(){return Np||(Np=1,Ku.exports=Yy()),Ku.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rp;function Jy(){if(Rp)return dt;Rp=1;var i=qy(),e=Xy();function n(t){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)r+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,l={};function u(t,r){d(t,r),d(t+"Capture",r)}function d(t,r){for(l[t]=r,t=0;t<r.length;t++)s.add(r[t])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),m=Object.prototype.hasOwnProperty,g=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,S={},E={};function T(t){return m.call(E,t)?!0:m.call(S,t)?!1:g.test(t)?E[t]=!0:(S[t]=!0,!1)}function x(t,r,o,a){if(o!==null&&o.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return a?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function b(t,r,o,a){if(r===null||typeof r>"u"||x(t,r,o,a))return!0;if(a)return!1;if(o!==null)switch(o.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function V(t,r,o,a,c,h,p){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=a,this.attributeNamespace=c,this.mustUseProperty=o,this.propertyName=t,this.type=r,this.sanitizeURL=h,this.removeEmptyString=p}var K={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){K[t]=new V(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var r=t[0];K[r]=new V(r,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){K[t]=new V(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){K[t]=new V(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){K[t]=new V(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){K[t]=new V(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){K[t]=new V(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){K[t]=new V(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){K[t]=new V(t,5,!1,t.toLowerCase(),null,!1,!1)});var Pe=/[\-:]([a-z])/g;function Me(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var r=t.replace(Pe,Me);K[r]=new V(r,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var r=t.replace(Pe,Me);K[r]=new V(r,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var r=t.replace(Pe,Me);K[r]=new V(r,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){K[t]=new V(t,1,!1,t.toLowerCase(),null,!1,!1)}),K.xlinkHref=new V("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){K[t]=new V(t,1,!1,t.toLowerCase(),null,!0,!0)});function Ae(t,r,o,a){var c=K.hasOwnProperty(r)?K[r]:null;(c!==null?c.type!==0:a||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(b(r,o,c,a)&&(o=null),a||c===null?T(r)&&(o===null?t.removeAttribute(r):t.setAttribute(r,""+o)):c.mustUseProperty?t[c.propertyName]=o===null?c.type===3?!1:"":o:(r=c.attributeName,a=c.attributeNamespace,o===null?t.removeAttribute(r):(c=c.type,o=c===3||c===4&&o===!0?"":""+o,a?t.setAttributeNS(a,r,o):t.setAttribute(r,o))))}var Te=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,nt=Symbol.for("react.element"),Oe=Symbol.for("react.portal"),je=Symbol.for("react.fragment"),rt=Symbol.for("react.strict_mode"),vt=Symbol.for("react.profiler"),Rt=Symbol.for("react.provider"),nr=Symbol.for("react.context"),Ht=Symbol.for("react.forward_ref"),ft=Symbol.for("react.suspense"),Pt=Symbol.for("react.suspense_list"),jt=Symbol.for("react.memo"),it=Symbol.for("react.lazy"),Se=Symbol.for("react.offscreen"),L=Symbol.iterator;function $(t){return t===null||typeof t!="object"?null:(t=L&&t[L]||t["@@iterator"],typeof t=="function"?t:null)}var y=Object.assign,R;function B(t){if(R===void 0)try{throw Error()}catch(o){var r=o.stack.trim().match(/\n( *(at )?)/);R=r&&r[1]||""}return`
`+R+t}var te=!1;function X(t,r){if(!t||te)return"";te=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(k){var a=k}Reflect.construct(t,[],r)}else{try{r.call()}catch(k){a=k}t.call(r.prototype)}else{try{throw Error()}catch(k){a=k}t()}}catch(k){if(k&&a&&typeof k.stack=="string"){for(var c=k.stack.split(`
`),h=a.stack.split(`
`),p=c.length-1,_=h.length-1;1<=p&&0<=_&&c[p]!==h[_];)_--;for(;1<=p&&0<=_;p--,_--)if(c[p]!==h[_]){if(p!==1||_!==1)do if(p--,_--,0>_||c[p]!==h[_]){var v=`
`+c[p].replace(" at new "," at ");return t.displayName&&v.includes("<anonymous>")&&(v=v.replace("<anonymous>",t.displayName)),v}while(1<=p&&0<=_);break}}}finally{te=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?B(t):""}function he(t){switch(t.tag){case 5:return B(t.type);case 16:return B("Lazy");case 13:return B("Suspense");case 19:return B("SuspenseList");case 0:case 2:case 15:return t=X(t.type,!1),t;case 11:return t=X(t.type.render,!1),t;case 1:return t=X(t.type,!0),t;default:return""}}function se(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case je:return"Fragment";case Oe:return"Portal";case vt:return"Profiler";case rt:return"StrictMode";case ft:return"Suspense";case Pt:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case nr:return(t.displayName||"Context")+".Consumer";case Rt:return(t._context.displayName||"Context")+".Provider";case Ht:var r=t.render;return t=t.displayName,t||(t=r.displayName||r.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case jt:return r=t.displayName||null,r!==null?r:se(t.type)||"Memo";case it:r=t._payload,t=t._init;try{return se(t(r))}catch{}}return null}function ce(t){var r=t.type;switch(t.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=r.render,t=t.displayName||t.name||"",r.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return se(r);case 8:return r===rt?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function oe(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function st(t){var r=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function X_(t){var r=st(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,r),a=""+t[r];if(!t.hasOwnProperty(r)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var c=o.get,h=o.set;return Object.defineProperty(t,r,{configurable:!0,get:function(){return c.call(this)},set:function(p){a=""+p,h.call(this,p)}}),Object.defineProperty(t,r,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(p){a=""+p},stopTracking:function(){t._valueTracker=null,delete t[r]}}}}function $s(t){t._valueTracker||(t._valueTracker=X_(t))}function Rd(t){if(!t)return!1;var r=t._valueTracker;if(!r)return!0;var o=r.getValue(),a="";return t&&(a=st(t)?t.checked?"true":"false":t.value),t=a,t!==o?(r.setValue(t),!0):!1}function Gs(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Jl(t,r){var o=r.checked;return y({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function Pd(t,r){var o=r.defaultValue==null?"":r.defaultValue,a=r.checked!=null?r.checked:r.defaultChecked;o=oe(r.value!=null?r.value:o),t._wrapperState={initialChecked:a,initialValue:o,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function Ad(t,r){r=r.checked,r!=null&&Ae(t,"checked",r,!1)}function Zl(t,r){Ad(t,r);var o=oe(r.value),a=r.type;if(o!=null)a==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(a==="submit"||a==="reset"){t.removeAttribute("value");return}r.hasOwnProperty("value")?ea(t,r.type,o):r.hasOwnProperty("defaultValue")&&ea(t,r.type,oe(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(t.defaultChecked=!!r.defaultChecked)}function Od(t,r,o){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var a=r.type;if(!(a!=="submit"&&a!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+t._wrapperState.initialValue,o||r===t.value||(t.value=r),t.defaultValue=r}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function ea(t,r,o){(r!=="number"||Gs(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var Ti=Array.isArray;function Ar(t,r,o,a){if(t=t.options,r){r={};for(var c=0;c<o.length;c++)r["$"+o[c]]=!0;for(o=0;o<t.length;o++)c=r.hasOwnProperty("$"+t[o].value),t[o].selected!==c&&(t[o].selected=c),c&&a&&(t[o].defaultSelected=!0)}else{for(o=""+oe(o),r=null,c=0;c<t.length;c++){if(t[c].value===o){t[c].selected=!0,a&&(t[c].defaultSelected=!0);return}r!==null||t[c].disabled||(r=t[c])}r!==null&&(r.selected=!0)}}function ta(t,r){if(r.dangerouslySetInnerHTML!=null)throw Error(n(91));return y({},r,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Dd(t,r){var o=r.value;if(o==null){if(o=r.children,r=r.defaultValue,o!=null){if(r!=null)throw Error(n(92));if(Ti(o)){if(1<o.length)throw Error(n(93));o=o[0]}r=o}r==null&&(r=""),o=r}t._wrapperState={initialValue:oe(o)}}function xd(t,r){var o=oe(r.value),a=oe(r.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),r.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),a!=null&&(t.defaultValue=""+a)}function Ld(t){var r=t.textContent;r===t._wrapperState.initialValue&&r!==""&&r!==null&&(t.value=r)}function Md(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function na(t,r){return t==null||t==="http://www.w3.org/1999/xhtml"?Md(r):t==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ks,bd=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,o,a,c){MSApp.execUnsafeLocalFunction(function(){return t(r,o,a,c)})}:t})(function(t,r){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=r;else{for(Ks=Ks||document.createElement("div"),Ks.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=Ks.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;r.firstChild;)t.appendChild(r.firstChild)}});function ki(t,r){if(r){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=r;return}}t.textContent=r}var Ni={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},J_=["Webkit","ms","Moz","O"];Object.keys(Ni).forEach(function(t){J_.forEach(function(r){r=r+t.charAt(0).toUpperCase()+t.substring(1),Ni[r]=Ni[t]})});function Fd(t,r,o){return r==null||typeof r=="boolean"||r===""?"":o||typeof r!="number"||r===0||Ni.hasOwnProperty(t)&&Ni[t]?(""+r).trim():r+"px"}function Ud(t,r){t=t.style;for(var o in r)if(r.hasOwnProperty(o)){var a=o.indexOf("--")===0,c=Fd(o,r[o],a);o==="float"&&(o="cssFloat"),a?t.setProperty(o,c):t[o]=c}}var Z_=y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ra(t,r){if(r){if(Z_[t]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(n(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(n(61))}if(r.style!=null&&typeof r.style!="object")throw Error(n(62))}}function ia(t,r){if(t.indexOf("-")===-1)return typeof r.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var sa=null;function oa(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var la=null,Or=null,Dr=null;function zd(t){if(t=qi(t)){if(typeof la!="function")throw Error(n(280));var r=t.stateNode;r&&(r=_o(r),la(t.stateNode,t.type,r))}}function Wd(t){Or?Dr?Dr.push(t):Dr=[t]:Or=t}function Vd(){if(Or){var t=Or,r=Dr;if(Dr=Or=null,zd(t),r)for(t=0;t<r.length;t++)zd(r[t])}}function Bd(t,r){return t(r)}function Hd(){}var aa=!1;function jd(t,r,o){if(aa)return t(r,o);aa=!0;try{return Bd(t,r,o)}finally{aa=!1,(Or!==null||Dr!==null)&&(Hd(),Vd())}}function Ri(t,r){var o=t.stateNode;if(o===null)return null;var a=_o(o);if(a===null)return null;o=a[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,r,typeof o));return o}var ua=!1;if(f)try{var Pi={};Object.defineProperty(Pi,"passive",{get:function(){ua=!0}}),window.addEventListener("test",Pi,Pi),window.removeEventListener("test",Pi,Pi)}catch{ua=!1}function ev(t,r,o,a,c,h,p,_,v){var k=Array.prototype.slice.call(arguments,3);try{r.apply(o,k)}catch(P){this.onError(P)}}var Ai=!1,Qs=null,qs=!1,ca=null,tv={onError:function(t){Ai=!0,Qs=t}};function nv(t,r,o,a,c,h,p,_,v){Ai=!1,Qs=null,ev.apply(tv,arguments)}function rv(t,r,o,a,c,h,p,_,v){if(nv.apply(this,arguments),Ai){if(Ai){var k=Qs;Ai=!1,Qs=null}else throw Error(n(198));qs||(qs=!0,ca=k)}}function rr(t){var r=t,o=t;if(t.alternate)for(;r.return;)r=r.return;else{t=r;do r=t,(r.flags&4098)!==0&&(o=r.return),t=r.return;while(t)}return r.tag===3?o:null}function $d(t){if(t.tag===13){var r=t.memoizedState;if(r===null&&(t=t.alternate,t!==null&&(r=t.memoizedState)),r!==null)return r.dehydrated}return null}function Gd(t){if(rr(t)!==t)throw Error(n(188))}function iv(t){var r=t.alternate;if(!r){if(r=rr(t),r===null)throw Error(n(188));return r!==t?null:t}for(var o=t,a=r;;){var c=o.return;if(c===null)break;var h=c.alternate;if(h===null){if(a=c.return,a!==null){o=a;continue}break}if(c.child===h.child){for(h=c.child;h;){if(h===o)return Gd(c),t;if(h===a)return Gd(c),r;h=h.sibling}throw Error(n(188))}if(o.return!==a.return)o=c,a=h;else{for(var p=!1,_=c.child;_;){if(_===o){p=!0,o=c,a=h;break}if(_===a){p=!0,a=c,o=h;break}_=_.sibling}if(!p){for(_=h.child;_;){if(_===o){p=!0,o=h,a=c;break}if(_===a){p=!0,a=h,o=c;break}_=_.sibling}if(!p)throw Error(n(189))}}if(o.alternate!==a)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:r}function Kd(t){return t=iv(t),t!==null?Qd(t):null}function Qd(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var r=Qd(t);if(r!==null)return r;t=t.sibling}return null}var qd=e.unstable_scheduleCallback,Yd=e.unstable_cancelCallback,sv=e.unstable_shouldYield,ov=e.unstable_requestPaint,ke=e.unstable_now,lv=e.unstable_getCurrentPriorityLevel,da=e.unstable_ImmediatePriority,Xd=e.unstable_UserBlockingPriority,Ys=e.unstable_NormalPriority,av=e.unstable_LowPriority,Jd=e.unstable_IdlePriority,Xs=null,$t=null;function uv(t){if($t&&typeof $t.onCommitFiberRoot=="function")try{$t.onCommitFiberRoot(Xs,t,void 0,(t.current.flags&128)===128)}catch{}}var At=Math.clz32?Math.clz32:hv,cv=Math.log,dv=Math.LN2;function hv(t){return t>>>=0,t===0?32:31-(cv(t)/dv|0)|0}var Js=64,Zs=4194304;function Oi(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function eo(t,r){var o=t.pendingLanes;if(o===0)return 0;var a=0,c=t.suspendedLanes,h=t.pingedLanes,p=o&268435455;if(p!==0){var _=p&~c;_!==0?a=Oi(_):(h&=p,h!==0&&(a=Oi(h)))}else p=o&~c,p!==0?a=Oi(p):h!==0&&(a=Oi(h));if(a===0)return 0;if(r!==0&&r!==a&&(r&c)===0&&(c=a&-a,h=r&-r,c>=h||c===16&&(h&4194240)!==0))return r;if((a&4)!==0&&(a|=o&16),r=t.entangledLanes,r!==0)for(t=t.entanglements,r&=a;0<r;)o=31-At(r),c=1<<o,a|=t[o],r&=~c;return a}function fv(t,r){switch(t){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pv(t,r){for(var o=t.suspendedLanes,a=t.pingedLanes,c=t.expirationTimes,h=t.pendingLanes;0<h;){var p=31-At(h),_=1<<p,v=c[p];v===-1?((_&o)===0||(_&a)!==0)&&(c[p]=fv(_,r)):v<=r&&(t.expiredLanes|=_),h&=~_}}function ha(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Zd(){var t=Js;return Js<<=1,(Js&4194240)===0&&(Js=64),t}function fa(t){for(var r=[],o=0;31>o;o++)r.push(t);return r}function Di(t,r,o){t.pendingLanes|=r,r!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,r=31-At(r),t[r]=o}function mv(t,r){var o=t.pendingLanes&~r;t.pendingLanes=r,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=r,t.mutableReadLanes&=r,t.entangledLanes&=r,r=t.entanglements;var a=t.eventTimes;for(t=t.expirationTimes;0<o;){var c=31-At(o),h=1<<c;r[c]=0,a[c]=-1,t[c]=-1,o&=~h}}function pa(t,r){var o=t.entangledLanes|=r;for(t=t.entanglements;o;){var a=31-At(o),c=1<<a;c&r|t[a]&r&&(t[a]|=r),o&=~c}}var le=0;function eh(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var th,ma,nh,rh,ih,ga=!1,to=[],wn=null,En=null,Sn=null,xi=new Map,Li=new Map,Cn=[],gv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function sh(t,r){switch(t){case"focusin":case"focusout":wn=null;break;case"dragenter":case"dragleave":En=null;break;case"mouseover":case"mouseout":Sn=null;break;case"pointerover":case"pointerout":xi.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":Li.delete(r.pointerId)}}function Mi(t,r,o,a,c,h){return t===null||t.nativeEvent!==h?(t={blockedOn:r,domEventName:o,eventSystemFlags:a,nativeEvent:h,targetContainers:[c]},r!==null&&(r=qi(r),r!==null&&ma(r)),t):(t.eventSystemFlags|=a,r=t.targetContainers,c!==null&&r.indexOf(c)===-1&&r.push(c),t)}function _v(t,r,o,a,c){switch(r){case"focusin":return wn=Mi(wn,t,r,o,a,c),!0;case"dragenter":return En=Mi(En,t,r,o,a,c),!0;case"mouseover":return Sn=Mi(Sn,t,r,o,a,c),!0;case"pointerover":var h=c.pointerId;return xi.set(h,Mi(xi.get(h)||null,t,r,o,a,c)),!0;case"gotpointercapture":return h=c.pointerId,Li.set(h,Mi(Li.get(h)||null,t,r,o,a,c)),!0}return!1}function oh(t){var r=ir(t.target);if(r!==null){var o=rr(r);if(o!==null){if(r=o.tag,r===13){if(r=$d(o),r!==null){t.blockedOn=r,ih(t.priority,function(){nh(o)});return}}else if(r===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function no(t){if(t.blockedOn!==null)return!1;for(var r=t.targetContainers;0<r.length;){var o=va(t.domEventName,t.eventSystemFlags,r[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var a=new o.constructor(o.type,o);sa=a,o.target.dispatchEvent(a),sa=null}else return r=qi(o),r!==null&&ma(r),t.blockedOn=o,!1;r.shift()}return!0}function lh(t,r,o){no(t)&&o.delete(r)}function vv(){ga=!1,wn!==null&&no(wn)&&(wn=null),En!==null&&no(En)&&(En=null),Sn!==null&&no(Sn)&&(Sn=null),xi.forEach(lh),Li.forEach(lh)}function bi(t,r){t.blockedOn===r&&(t.blockedOn=null,ga||(ga=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,vv)))}function Fi(t){function r(c){return bi(c,t)}if(0<to.length){bi(to[0],t);for(var o=1;o<to.length;o++){var a=to[o];a.blockedOn===t&&(a.blockedOn=null)}}for(wn!==null&&bi(wn,t),En!==null&&bi(En,t),Sn!==null&&bi(Sn,t),xi.forEach(r),Li.forEach(r),o=0;o<Cn.length;o++)a=Cn[o],a.blockedOn===t&&(a.blockedOn=null);for(;0<Cn.length&&(o=Cn[0],o.blockedOn===null);)oh(o),o.blockedOn===null&&Cn.shift()}var xr=Te.ReactCurrentBatchConfig,ro=!0;function yv(t,r,o,a){var c=le,h=xr.transition;xr.transition=null;try{le=1,_a(t,r,o,a)}finally{le=c,xr.transition=h}}function wv(t,r,o,a){var c=le,h=xr.transition;xr.transition=null;try{le=4,_a(t,r,o,a)}finally{le=c,xr.transition=h}}function _a(t,r,o,a){if(ro){var c=va(t,r,o,a);if(c===null)Ma(t,r,a,io,o),sh(t,a);else if(_v(c,t,r,o,a))a.stopPropagation();else if(sh(t,a),r&4&&-1<gv.indexOf(t)){for(;c!==null;){var h=qi(c);if(h!==null&&th(h),h=va(t,r,o,a),h===null&&Ma(t,r,a,io,o),h===c)break;c=h}c!==null&&a.stopPropagation()}else Ma(t,r,a,null,o)}}var io=null;function va(t,r,o,a){if(io=null,t=oa(a),t=ir(t),t!==null)if(r=rr(t),r===null)t=null;else if(o=r.tag,o===13){if(t=$d(r),t!==null)return t;t=null}else if(o===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;t=null}else r!==t&&(t=null);return io=t,null}function ah(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(lv()){case da:return 1;case Xd:return 4;case Ys:case av:return 16;case Jd:return 536870912;default:return 16}default:return 16}}var In=null,ya=null,so=null;function uh(){if(so)return so;var t,r=ya,o=r.length,a,c="value"in In?In.value:In.textContent,h=c.length;for(t=0;t<o&&r[t]===c[t];t++);var p=o-t;for(a=1;a<=p&&r[o-a]===c[h-a];a++);return so=c.slice(t,1<a?1-a:void 0)}function oo(t){var r=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&r===13&&(t=13)):t=r,t===10&&(t=13),32<=t||t===13?t:0}function lo(){return!0}function ch(){return!1}function pt(t){function r(o,a,c,h,p){this._reactName=o,this._targetInst=c,this.type=a,this.nativeEvent=h,this.target=p,this.currentTarget=null;for(var _ in t)t.hasOwnProperty(_)&&(o=t[_],this[_]=o?o(h):h[_]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?lo:ch,this.isPropagationStopped=ch,this}return y(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=lo)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=lo)},persist:function(){},isPersistent:lo}),r}var Lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},wa=pt(Lr),Ui=y({},Lr,{view:0,detail:0}),Ev=pt(Ui),Ea,Sa,zi,ao=y({},Ui,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ia,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==zi&&(zi&&t.type==="mousemove"?(Ea=t.screenX-zi.screenX,Sa=t.screenY-zi.screenY):Sa=Ea=0,zi=t),Ea)},movementY:function(t){return"movementY"in t?t.movementY:Sa}}),dh=pt(ao),Sv=y({},ao,{dataTransfer:0}),Cv=pt(Sv),Iv=y({},Ui,{relatedTarget:0}),Ca=pt(Iv),Tv=y({},Lr,{animationName:0,elapsedTime:0,pseudoElement:0}),kv=pt(Tv),Nv=y({},Lr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Rv=pt(Nv),Pv=y({},Lr,{data:0}),hh=pt(Pv),Av={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ov={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Dv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xv(t){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(t):(t=Dv[t])?!!r[t]:!1}function Ia(){return xv}var Lv=y({},Ui,{key:function(t){if(t.key){var r=Av[t.key]||t.key;if(r!=="Unidentified")return r}return t.type==="keypress"?(t=oo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ov[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ia,charCode:function(t){return t.type==="keypress"?oo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?oo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Mv=pt(Lv),bv=y({},ao,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),fh=pt(bv),Fv=y({},Ui,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ia}),Uv=pt(Fv),zv=y({},Lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Wv=pt(zv),Vv=y({},ao,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Bv=pt(Vv),Hv=[9,13,27,32],Ta=f&&"CompositionEvent"in window,Wi=null;f&&"documentMode"in document&&(Wi=document.documentMode);var jv=f&&"TextEvent"in window&&!Wi,ph=f&&(!Ta||Wi&&8<Wi&&11>=Wi),mh=" ",gh=!1;function _h(t,r){switch(t){case"keyup":return Hv.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vh(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Mr=!1;function $v(t,r){switch(t){case"compositionend":return vh(r);case"keypress":return r.which!==32?null:(gh=!0,mh);case"textInput":return t=r.data,t===mh&&gh?null:t;default:return null}}function Gv(t,r){if(Mr)return t==="compositionend"||!Ta&&_h(t,r)?(t=uh(),so=ya=In=null,Mr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return ph&&r.locale!=="ko"?null:r.data;default:return null}}var Kv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function yh(t){var r=t&&t.nodeName&&t.nodeName.toLowerCase();return r==="input"?!!Kv[t.type]:r==="textarea"}function wh(t,r,o,a){Wd(a),r=po(r,"onChange"),0<r.length&&(o=new wa("onChange","change",null,o,a),t.push({event:o,listeners:r}))}var Vi=null,Bi=null;function Qv(t){Uh(t,0)}function uo(t){var r=Wr(t);if(Rd(r))return t}function qv(t,r){if(t==="change")return r}var Eh=!1;if(f){var ka;if(f){var Na="oninput"in document;if(!Na){var Sh=document.createElement("div");Sh.setAttribute("oninput","return;"),Na=typeof Sh.oninput=="function"}ka=Na}else ka=!1;Eh=ka&&(!document.documentMode||9<document.documentMode)}function Ch(){Vi&&(Vi.detachEvent("onpropertychange",Ih),Bi=Vi=null)}function Ih(t){if(t.propertyName==="value"&&uo(Bi)){var r=[];wh(r,Bi,t,oa(t)),jd(Qv,r)}}function Yv(t,r,o){t==="focusin"?(Ch(),Vi=r,Bi=o,Vi.attachEvent("onpropertychange",Ih)):t==="focusout"&&Ch()}function Xv(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return uo(Bi)}function Jv(t,r){if(t==="click")return uo(r)}function Zv(t,r){if(t==="input"||t==="change")return uo(r)}function ey(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var Ot=typeof Object.is=="function"?Object.is:ey;function Hi(t,r){if(Ot(t,r))return!0;if(typeof t!="object"||t===null||typeof r!="object"||r===null)return!1;var o=Object.keys(t),a=Object.keys(r);if(o.length!==a.length)return!1;for(a=0;a<o.length;a++){var c=o[a];if(!m.call(r,c)||!Ot(t[c],r[c]))return!1}return!0}function Th(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function kh(t,r){var o=Th(t);t=0;for(var a;o;){if(o.nodeType===3){if(a=t+o.textContent.length,t<=r&&a>=r)return{node:o,offset:r-t};t=a}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Th(o)}}function Nh(t,r){return t&&r?t===r?!0:t&&t.nodeType===3?!1:r&&r.nodeType===3?Nh(t,r.parentNode):"contains"in t?t.contains(r):t.compareDocumentPosition?!!(t.compareDocumentPosition(r)&16):!1:!1}function Rh(){for(var t=window,r=Gs();r instanceof t.HTMLIFrameElement;){try{var o=typeof r.contentWindow.location.href=="string"}catch{o=!1}if(o)t=r.contentWindow;else break;r=Gs(t.document)}return r}function Ra(t){var r=t&&t.nodeName&&t.nodeName.toLowerCase();return r&&(r==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||r==="textarea"||t.contentEditable==="true")}function ty(t){var r=Rh(),o=t.focusedElem,a=t.selectionRange;if(r!==o&&o&&o.ownerDocument&&Nh(o.ownerDocument.documentElement,o)){if(a!==null&&Ra(o)){if(r=a.start,t=a.end,t===void 0&&(t=r),"selectionStart"in o)o.selectionStart=r,o.selectionEnd=Math.min(t,o.value.length);else if(t=(r=o.ownerDocument||document)&&r.defaultView||window,t.getSelection){t=t.getSelection();var c=o.textContent.length,h=Math.min(a.start,c);a=a.end===void 0?h:Math.min(a.end,c),!t.extend&&h>a&&(c=a,a=h,h=c),c=kh(o,h);var p=kh(o,a);c&&p&&(t.rangeCount!==1||t.anchorNode!==c.node||t.anchorOffset!==c.offset||t.focusNode!==p.node||t.focusOffset!==p.offset)&&(r=r.createRange(),r.setStart(c.node,c.offset),t.removeAllRanges(),h>a?(t.addRange(r),t.extend(p.node,p.offset)):(r.setEnd(p.node,p.offset),t.addRange(r)))}}for(r=[],t=o;t=t.parentNode;)t.nodeType===1&&r.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<r.length;o++)t=r[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var ny=f&&"documentMode"in document&&11>=document.documentMode,br=null,Pa=null,ji=null,Aa=!1;function Ph(t,r,o){var a=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;Aa||br==null||br!==Gs(a)||(a=br,"selectionStart"in a&&Ra(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),ji&&Hi(ji,a)||(ji=a,a=po(Pa,"onSelect"),0<a.length&&(r=new wa("onSelect","select",null,r,o),t.push({event:r,listeners:a}),r.target=br)))}function co(t,r){var o={};return o[t.toLowerCase()]=r.toLowerCase(),o["Webkit"+t]="webkit"+r,o["Moz"+t]="moz"+r,o}var Fr={animationend:co("Animation","AnimationEnd"),animationiteration:co("Animation","AnimationIteration"),animationstart:co("Animation","AnimationStart"),transitionend:co("Transition","TransitionEnd")},Oa={},Ah={};f&&(Ah=document.createElement("div").style,"AnimationEvent"in window||(delete Fr.animationend.animation,delete Fr.animationiteration.animation,delete Fr.animationstart.animation),"TransitionEvent"in window||delete Fr.transitionend.transition);function ho(t){if(Oa[t])return Oa[t];if(!Fr[t])return t;var r=Fr[t],o;for(o in r)if(r.hasOwnProperty(o)&&o in Ah)return Oa[t]=r[o];return t}var Oh=ho("animationend"),Dh=ho("animationiteration"),xh=ho("animationstart"),Lh=ho("transitionend"),Mh=new Map,bh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Tn(t,r){Mh.set(t,r),u(r,[t])}for(var Da=0;Da<bh.length;Da++){var xa=bh[Da],ry=xa.toLowerCase(),iy=xa[0].toUpperCase()+xa.slice(1);Tn(ry,"on"+iy)}Tn(Oh,"onAnimationEnd"),Tn(Dh,"onAnimationIteration"),Tn(xh,"onAnimationStart"),Tn("dblclick","onDoubleClick"),Tn("focusin","onFocus"),Tn("focusout","onBlur"),Tn(Lh,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $i="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sy=new Set("cancel close invalid load scroll toggle".split(" ").concat($i));function Fh(t,r,o){var a=t.type||"unknown-event";t.currentTarget=o,rv(a,r,void 0,t),t.currentTarget=null}function Uh(t,r){r=(r&4)!==0;for(var o=0;o<t.length;o++){var a=t[o],c=a.event;a=a.listeners;e:{var h=void 0;if(r)for(var p=a.length-1;0<=p;p--){var _=a[p],v=_.instance,k=_.currentTarget;if(_=_.listener,v!==h&&c.isPropagationStopped())break e;Fh(c,_,k),h=v}else for(p=0;p<a.length;p++){if(_=a[p],v=_.instance,k=_.currentTarget,_=_.listener,v!==h&&c.isPropagationStopped())break e;Fh(c,_,k),h=v}}}if(qs)throw t=ca,qs=!1,ca=null,t}function me(t,r){var o=r[Va];o===void 0&&(o=r[Va]=new Set);var a=t+"__bubble";o.has(a)||(zh(r,t,2,!1),o.add(a))}function La(t,r,o){var a=0;r&&(a|=4),zh(o,t,a,r)}var fo="_reactListening"+Math.random().toString(36).slice(2);function Gi(t){if(!t[fo]){t[fo]=!0,s.forEach(function(o){o!=="selectionchange"&&(sy.has(o)||La(o,!1,t),La(o,!0,t))});var r=t.nodeType===9?t:t.ownerDocument;r===null||r[fo]||(r[fo]=!0,La("selectionchange",!1,r))}}function zh(t,r,o,a){switch(ah(r)){case 1:var c=yv;break;case 4:c=wv;break;default:c=_a}o=c.bind(null,r,o,t),c=void 0,!ua||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(c=!0),a?c!==void 0?t.addEventListener(r,o,{capture:!0,passive:c}):t.addEventListener(r,o,!0):c!==void 0?t.addEventListener(r,o,{passive:c}):t.addEventListener(r,o,!1)}function Ma(t,r,o,a,c){var h=a;if((r&1)===0&&(r&2)===0&&a!==null)e:for(;;){if(a===null)return;var p=a.tag;if(p===3||p===4){var _=a.stateNode.containerInfo;if(_===c||_.nodeType===8&&_.parentNode===c)break;if(p===4)for(p=a.return;p!==null;){var v=p.tag;if((v===3||v===4)&&(v=p.stateNode.containerInfo,v===c||v.nodeType===8&&v.parentNode===c))return;p=p.return}for(;_!==null;){if(p=ir(_),p===null)return;if(v=p.tag,v===5||v===6){a=h=p;continue e}_=_.parentNode}}a=a.return}jd(function(){var k=h,P=oa(o),A=[];e:{var N=Mh.get(t);if(N!==void 0){var M=wa,U=t;switch(t){case"keypress":if(oo(o)===0)break e;case"keydown":case"keyup":M=Mv;break;case"focusin":U="focus",M=Ca;break;case"focusout":U="blur",M=Ca;break;case"beforeblur":case"afterblur":M=Ca;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":M=dh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":M=Cv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":M=Uv;break;case Oh:case Dh:case xh:M=kv;break;case Lh:M=Wv;break;case"scroll":M=Ev;break;case"wheel":M=Bv;break;case"copy":case"cut":case"paste":M=Rv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":M=fh}var z=(r&4)!==0,Ne=!z&&t==="scroll",C=z?N!==null?N+"Capture":null:N;z=[];for(var w=k,I;w!==null;){I=w;var O=I.stateNode;if(I.tag===5&&O!==null&&(I=O,C!==null&&(O=Ri(w,C),O!=null&&z.push(Ki(w,O,I)))),Ne)break;w=w.return}0<z.length&&(N=new M(N,U,null,o,P),A.push({event:N,listeners:z}))}}if((r&7)===0){e:{if(N=t==="mouseover"||t==="pointerover",M=t==="mouseout"||t==="pointerout",N&&o!==sa&&(U=o.relatedTarget||o.fromElement)&&(ir(U)||U[en]))break e;if((M||N)&&(N=P.window===P?P:(N=P.ownerDocument)?N.defaultView||N.parentWindow:window,M?(U=o.relatedTarget||o.toElement,M=k,U=U?ir(U):null,U!==null&&(Ne=rr(U),U!==Ne||U.tag!==5&&U.tag!==6)&&(U=null)):(M=null,U=k),M!==U)){if(z=dh,O="onMouseLeave",C="onMouseEnter",w="mouse",(t==="pointerout"||t==="pointerover")&&(z=fh,O="onPointerLeave",C="onPointerEnter",w="pointer"),Ne=M==null?N:Wr(M),I=U==null?N:Wr(U),N=new z(O,w+"leave",M,o,P),N.target=Ne,N.relatedTarget=I,O=null,ir(P)===k&&(z=new z(C,w+"enter",U,o,P),z.target=I,z.relatedTarget=Ne,O=z),Ne=O,M&&U)t:{for(z=M,C=U,w=0,I=z;I;I=Ur(I))w++;for(I=0,O=C;O;O=Ur(O))I++;for(;0<w-I;)z=Ur(z),w--;for(;0<I-w;)C=Ur(C),I--;for(;w--;){if(z===C||C!==null&&z===C.alternate)break t;z=Ur(z),C=Ur(C)}z=null}else z=null;M!==null&&Wh(A,N,M,z,!1),U!==null&&Ne!==null&&Wh(A,Ne,U,z,!0)}}e:{if(N=k?Wr(k):window,M=N.nodeName&&N.nodeName.toLowerCase(),M==="select"||M==="input"&&N.type==="file")var W=qv;else if(yh(N))if(Eh)W=Zv;else{W=Xv;var H=Yv}else(M=N.nodeName)&&M.toLowerCase()==="input"&&(N.type==="checkbox"||N.type==="radio")&&(W=Jv);if(W&&(W=W(t,k))){wh(A,W,o,P);break e}H&&H(t,N,k),t==="focusout"&&(H=N._wrapperState)&&H.controlled&&N.type==="number"&&ea(N,"number",N.value)}switch(H=k?Wr(k):window,t){case"focusin":(yh(H)||H.contentEditable==="true")&&(br=H,Pa=k,ji=null);break;case"focusout":ji=Pa=br=null;break;case"mousedown":Aa=!0;break;case"contextmenu":case"mouseup":case"dragend":Aa=!1,Ph(A,o,P);break;case"selectionchange":if(ny)break;case"keydown":case"keyup":Ph(A,o,P)}var j;if(Ta)e:{switch(t){case"compositionstart":var q="onCompositionStart";break e;case"compositionend":q="onCompositionEnd";break e;case"compositionupdate":q="onCompositionUpdate";break e}q=void 0}else Mr?_h(t,o)&&(q="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(q="onCompositionStart");q&&(ph&&o.locale!=="ko"&&(Mr||q!=="onCompositionStart"?q==="onCompositionEnd"&&Mr&&(j=uh()):(In=P,ya="value"in In?In.value:In.textContent,Mr=!0)),H=po(k,q),0<H.length&&(q=new hh(q,t,null,o,P),A.push({event:q,listeners:H}),j?q.data=j:(j=vh(o),j!==null&&(q.data=j)))),(j=jv?$v(t,o):Gv(t,o))&&(k=po(k,"onBeforeInput"),0<k.length&&(P=new hh("onBeforeInput","beforeinput",null,o,P),A.push({event:P,listeners:k}),P.data=j))}Uh(A,r)})}function Ki(t,r,o){return{instance:t,listener:r,currentTarget:o}}function po(t,r){for(var o=r+"Capture",a=[];t!==null;){var c=t,h=c.stateNode;c.tag===5&&h!==null&&(c=h,h=Ri(t,o),h!=null&&a.unshift(Ki(t,h,c)),h=Ri(t,r),h!=null&&a.push(Ki(t,h,c))),t=t.return}return a}function Ur(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Wh(t,r,o,a,c){for(var h=r._reactName,p=[];o!==null&&o!==a;){var _=o,v=_.alternate,k=_.stateNode;if(v!==null&&v===a)break;_.tag===5&&k!==null&&(_=k,c?(v=Ri(o,h),v!=null&&p.unshift(Ki(o,v,_))):c||(v=Ri(o,h),v!=null&&p.push(Ki(o,v,_)))),o=o.return}p.length!==0&&t.push({event:r,listeners:p})}var oy=/\r\n?/g,ly=/\u0000|\uFFFD/g;function Vh(t){return(typeof t=="string"?t:""+t).replace(oy,`
`).replace(ly,"")}function mo(t,r,o){if(r=Vh(r),Vh(t)!==r&&o)throw Error(n(425))}function go(){}var ba=null,Fa=null;function Ua(t,r){return t==="textarea"||t==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var za=typeof setTimeout=="function"?setTimeout:void 0,ay=typeof clearTimeout=="function"?clearTimeout:void 0,Bh=typeof Promise=="function"?Promise:void 0,uy=typeof queueMicrotask=="function"?queueMicrotask:typeof Bh<"u"?function(t){return Bh.resolve(null).then(t).catch(cy)}:za;function cy(t){setTimeout(function(){throw t})}function Wa(t,r){var o=r,a=0;do{var c=o.nextSibling;if(t.removeChild(o),c&&c.nodeType===8)if(o=c.data,o==="/$"){if(a===0){t.removeChild(c),Fi(r);return}a--}else o!=="$"&&o!=="$?"&&o!=="$!"||a++;o=c}while(o);Fi(r)}function kn(t){for(;t!=null;t=t.nextSibling){var r=t.nodeType;if(r===1||r===3)break;if(r===8){if(r=t.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return t}function Hh(t){t=t.previousSibling;for(var r=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(r===0)return t;r--}else o==="/$"&&r++}t=t.previousSibling}return null}var zr=Math.random().toString(36).slice(2),Gt="__reactFiber$"+zr,Qi="__reactProps$"+zr,en="__reactContainer$"+zr,Va="__reactEvents$"+zr,dy="__reactListeners$"+zr,hy="__reactHandles$"+zr;function ir(t){var r=t[Gt];if(r)return r;for(var o=t.parentNode;o;){if(r=o[en]||o[Gt]){if(o=r.alternate,r.child!==null||o!==null&&o.child!==null)for(t=Hh(t);t!==null;){if(o=t[Gt])return o;t=Hh(t)}return r}t=o,o=t.parentNode}return null}function qi(t){return t=t[Gt]||t[en],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Wr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function _o(t){return t[Qi]||null}var Ba=[],Vr=-1;function Nn(t){return{current:t}}function ge(t){0>Vr||(t.current=Ba[Vr],Ba[Vr]=null,Vr--)}function fe(t,r){Vr++,Ba[Vr]=t.current,t.current=r}var Rn={},Ke=Nn(Rn),ot=Nn(!1),sr=Rn;function Br(t,r){var o=t.type.contextTypes;if(!o)return Rn;var a=t.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===r)return a.__reactInternalMemoizedMaskedChildContext;var c={},h;for(h in o)c[h]=r[h];return a&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=c),c}function lt(t){return t=t.childContextTypes,t!=null}function vo(){ge(ot),ge(Ke)}function jh(t,r,o){if(Ke.current!==Rn)throw Error(n(168));fe(Ke,r),fe(ot,o)}function $h(t,r,o){var a=t.stateNode;if(r=r.childContextTypes,typeof a.getChildContext!="function")return o;a=a.getChildContext();for(var c in a)if(!(c in r))throw Error(n(108,ce(t)||"Unknown",c));return y({},o,a)}function yo(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Rn,sr=Ke.current,fe(Ke,t),fe(ot,ot.current),!0}function Gh(t,r,o){var a=t.stateNode;if(!a)throw Error(n(169));o?(t=$h(t,r,sr),a.__reactInternalMemoizedMergedChildContext=t,ge(ot),ge(Ke),fe(Ke,t)):ge(ot),fe(ot,o)}var tn=null,wo=!1,Ha=!1;function Kh(t){tn===null?tn=[t]:tn.push(t)}function fy(t){wo=!0,Kh(t)}function Pn(){if(!Ha&&tn!==null){Ha=!0;var t=0,r=le;try{var o=tn;for(le=1;t<o.length;t++){var a=o[t];do a=a(!0);while(a!==null)}tn=null,wo=!1}catch(c){throw tn!==null&&(tn=tn.slice(t+1)),qd(da,Pn),c}finally{le=r,Ha=!1}}return null}var Hr=[],jr=0,Eo=null,So=0,yt=[],wt=0,or=null,nn=1,rn="";function lr(t,r){Hr[jr++]=So,Hr[jr++]=Eo,Eo=t,So=r}function Qh(t,r,o){yt[wt++]=nn,yt[wt++]=rn,yt[wt++]=or,or=t;var a=nn;t=rn;var c=32-At(a)-1;a&=~(1<<c),o+=1;var h=32-At(r)+c;if(30<h){var p=c-c%5;h=(a&(1<<p)-1).toString(32),a>>=p,c-=p,nn=1<<32-At(r)+c|o<<c|a,rn=h+t}else nn=1<<h|o<<c|a,rn=t}function ja(t){t.return!==null&&(lr(t,1),Qh(t,1,0))}function $a(t){for(;t===Eo;)Eo=Hr[--jr],Hr[jr]=null,So=Hr[--jr],Hr[jr]=null;for(;t===or;)or=yt[--wt],yt[wt]=null,rn=yt[--wt],yt[wt]=null,nn=yt[--wt],yt[wt]=null}var mt=null,gt=null,_e=!1,Dt=null;function qh(t,r){var o=It(5,null,null,0);o.elementType="DELETED",o.stateNode=r,o.return=t,r=t.deletions,r===null?(t.deletions=[o],t.flags|=16):r.push(o)}function Yh(t,r){switch(t.tag){case 5:var o=t.type;return r=r.nodeType!==1||o.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(t.stateNode=r,mt=t,gt=kn(r.firstChild),!0):!1;case 6:return r=t.pendingProps===""||r.nodeType!==3?null:r,r!==null?(t.stateNode=r,mt=t,gt=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(o=or!==null?{id:nn,overflow:rn}:null,t.memoizedState={dehydrated:r,treeContext:o,retryLane:1073741824},o=It(18,null,null,0),o.stateNode=r,o.return=t,t.child=o,mt=t,gt=null,!0):!1;default:return!1}}function Ga(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ka(t){if(_e){var r=gt;if(r){var o=r;if(!Yh(t,r)){if(Ga(t))throw Error(n(418));r=kn(o.nextSibling);var a=mt;r&&Yh(t,r)?qh(a,o):(t.flags=t.flags&-4097|2,_e=!1,mt=t)}}else{if(Ga(t))throw Error(n(418));t.flags=t.flags&-4097|2,_e=!1,mt=t}}}function Xh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;mt=t}function Co(t){if(t!==mt)return!1;if(!_e)return Xh(t),_e=!0,!1;var r;if((r=t.tag!==3)&&!(r=t.tag!==5)&&(r=t.type,r=r!=="head"&&r!=="body"&&!Ua(t.type,t.memoizedProps)),r&&(r=gt)){if(Ga(t))throw Jh(),Error(n(418));for(;r;)qh(t,r),r=kn(r.nextSibling)}if(Xh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,r=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(r===0){gt=kn(t.nextSibling);break e}r--}else o!=="$"&&o!=="$!"&&o!=="$?"||r++}t=t.nextSibling}gt=null}}else gt=mt?kn(t.stateNode.nextSibling):null;return!0}function Jh(){for(var t=gt;t;)t=kn(t.nextSibling)}function $r(){gt=mt=null,_e=!1}function Qa(t){Dt===null?Dt=[t]:Dt.push(t)}var py=Te.ReactCurrentBatchConfig;function xt(t,r){if(t&&t.defaultProps){r=y({},r),t=t.defaultProps;for(var o in t)r[o]===void 0&&(r[o]=t[o]);return r}return r}var Io=Nn(null),To=null,Gr=null,qa=null;function Ya(){qa=Gr=To=null}function Xa(t){var r=Io.current;ge(Io),t._currentValue=r}function Ja(t,r,o){for(;t!==null;){var a=t.alternate;if((t.childLanes&r)!==r?(t.childLanes|=r,a!==null&&(a.childLanes|=r)):a!==null&&(a.childLanes&r)!==r&&(a.childLanes|=r),t===o)break;t=t.return}}function Kr(t,r){To=t,qa=Gr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&r)!==0&&(at=!0),t.firstContext=null)}function Et(t){var r=t._currentValue;if(qa!==t)if(t={context:t,memoizedValue:r,next:null},Gr===null){if(To===null)throw Error(n(308));Gr=t,To.dependencies={lanes:0,firstContext:t}}else Gr=Gr.next=t;return r}var ar=null;function Za(t){ar===null?ar=[t]:ar.push(t)}function Zh(t,r,o,a){var c=r.interleaved;return c===null?(o.next=o,Za(r)):(o.next=c.next,c.next=o),r.interleaved=o,sn(t,a)}function sn(t,r){t.lanes|=r;var o=t.alternate;for(o!==null&&(o.lanes|=r),o=t,t=t.return;t!==null;)t.childLanes|=r,o=t.alternate,o!==null&&(o.childLanes|=r),o=t,t=t.return;return o.tag===3?o.stateNode:null}var An=!1;function eu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ef(t,r){t=t.updateQueue,r.updateQueue===t&&(r.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function on(t,r){return{eventTime:t,lane:r,tag:0,payload:null,callback:null,next:null}}function On(t,r,o){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(ne&2)!==0){var c=a.pending;return c===null?r.next=r:(r.next=c.next,c.next=r),a.pending=r,sn(t,o)}return c=a.interleaved,c===null?(r.next=r,Za(a)):(r.next=c.next,c.next=r),a.interleaved=r,sn(t,o)}function ko(t,r,o){if(r=r.updateQueue,r!==null&&(r=r.shared,(o&4194240)!==0)){var a=r.lanes;a&=t.pendingLanes,o|=a,r.lanes=o,pa(t,o)}}function tf(t,r){var o=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,o===a)){var c=null,h=null;if(o=o.firstBaseUpdate,o!==null){do{var p={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};h===null?c=h=p:h=h.next=p,o=o.next}while(o!==null);h===null?c=h=r:h=h.next=r}else c=h=r;o={baseState:a.baseState,firstBaseUpdate:c,lastBaseUpdate:h,shared:a.shared,effects:a.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=r:t.next=r,o.lastBaseUpdate=r}function No(t,r,o,a){var c=t.updateQueue;An=!1;var h=c.firstBaseUpdate,p=c.lastBaseUpdate,_=c.shared.pending;if(_!==null){c.shared.pending=null;var v=_,k=v.next;v.next=null,p===null?h=k:p.next=k,p=v;var P=t.alternate;P!==null&&(P=P.updateQueue,_=P.lastBaseUpdate,_!==p&&(_===null?P.firstBaseUpdate=k:_.next=k,P.lastBaseUpdate=v))}if(h!==null){var A=c.baseState;p=0,P=k=v=null,_=h;do{var N=_.lane,M=_.eventTime;if((a&N)===N){P!==null&&(P=P.next={eventTime:M,lane:0,tag:_.tag,payload:_.payload,callback:_.callback,next:null});e:{var U=t,z=_;switch(N=r,M=o,z.tag){case 1:if(U=z.payload,typeof U=="function"){A=U.call(M,A,N);break e}A=U;break e;case 3:U.flags=U.flags&-65537|128;case 0:if(U=z.payload,N=typeof U=="function"?U.call(M,A,N):U,N==null)break e;A=y({},A,N);break e;case 2:An=!0}}_.callback!==null&&_.lane!==0&&(t.flags|=64,N=c.effects,N===null?c.effects=[_]:N.push(_))}else M={eventTime:M,lane:N,tag:_.tag,payload:_.payload,callback:_.callback,next:null},P===null?(k=P=M,v=A):P=P.next=M,p|=N;if(_=_.next,_===null){if(_=c.shared.pending,_===null)break;N=_,_=N.next,N.next=null,c.lastBaseUpdate=N,c.shared.pending=null}}while(!0);if(P===null&&(v=A),c.baseState=v,c.firstBaseUpdate=k,c.lastBaseUpdate=P,r=c.shared.interleaved,r!==null){c=r;do p|=c.lane,c=c.next;while(c!==r)}else h===null&&(c.shared.lanes=0);dr|=p,t.lanes=p,t.memoizedState=A}}function nf(t,r,o){if(t=r.effects,r.effects=null,t!==null)for(r=0;r<t.length;r++){var a=t[r],c=a.callback;if(c!==null){if(a.callback=null,a=o,typeof c!="function")throw Error(n(191,c));c.call(a)}}}var rf=new i.Component().refs;function tu(t,r,o,a){r=t.memoizedState,o=o(a,r),o=o==null?r:y({},r,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var Ro={isMounted:function(t){return(t=t._reactInternals)?rr(t)===t:!1},enqueueSetState:function(t,r,o){t=t._reactInternals;var a=Je(),c=Mn(t),h=on(a,c);h.payload=r,o!=null&&(h.callback=o),r=On(t,h,c),r!==null&&(bt(r,t,c,a),ko(r,t,c))},enqueueReplaceState:function(t,r,o){t=t._reactInternals;var a=Je(),c=Mn(t),h=on(a,c);h.tag=1,h.payload=r,o!=null&&(h.callback=o),r=On(t,h,c),r!==null&&(bt(r,t,c,a),ko(r,t,c))},enqueueForceUpdate:function(t,r){t=t._reactInternals;var o=Je(),a=Mn(t),c=on(o,a);c.tag=2,r!=null&&(c.callback=r),r=On(t,c,a),r!==null&&(bt(r,t,a,o),ko(r,t,a))}};function sf(t,r,o,a,c,h,p){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,h,p):r.prototype&&r.prototype.isPureReactComponent?!Hi(o,a)||!Hi(c,h):!0}function of(t,r,o){var a=!1,c=Rn,h=r.contextType;return typeof h=="object"&&h!==null?h=Et(h):(c=lt(r)?sr:Ke.current,a=r.contextTypes,h=(a=a!=null)?Br(t,c):Rn),r=new r(o,h),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Ro,t.stateNode=r,r._reactInternals=t,a&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=c,t.__reactInternalMemoizedMaskedChildContext=h),r}function lf(t,r,o,a){t=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(o,a),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(o,a),r.state!==t&&Ro.enqueueReplaceState(r,r.state,null)}function nu(t,r,o,a){var c=t.stateNode;c.props=o,c.state=t.memoizedState,c.refs=rf,eu(t);var h=r.contextType;typeof h=="object"&&h!==null?c.context=Et(h):(h=lt(r)?sr:Ke.current,c.context=Br(t,h)),c.state=t.memoizedState,h=r.getDerivedStateFromProps,typeof h=="function"&&(tu(t,r,h,o),c.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(r=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),r!==c.state&&Ro.enqueueReplaceState(c,c.state,null),No(t,o,c,a),c.state=t.memoizedState),typeof c.componentDidMount=="function"&&(t.flags|=4194308)}function Yi(t,r,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var a=o.stateNode}if(!a)throw Error(n(147,t));var c=a,h=""+t;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===h?r.ref:(r=function(p){var _=c.refs;_===rf&&(_=c.refs={}),p===null?delete _[h]:_[h]=p},r._stringRef=h,r)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function Po(t,r){throw t=Object.prototype.toString.call(r),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":t))}function af(t){var r=t._init;return r(t._payload)}function uf(t){function r(C,w){if(t){var I=C.deletions;I===null?(C.deletions=[w],C.flags|=16):I.push(w)}}function o(C,w){if(!t)return null;for(;w!==null;)r(C,w),w=w.sibling;return null}function a(C,w){for(C=new Map;w!==null;)w.key!==null?C.set(w.key,w):C.set(w.index,w),w=w.sibling;return C}function c(C,w){return C=Fn(C,w),C.index=0,C.sibling=null,C}function h(C,w,I){return C.index=I,t?(I=C.alternate,I!==null?(I=I.index,I<w?(C.flags|=2,w):I):(C.flags|=2,w)):(C.flags|=1048576,w)}function p(C){return t&&C.alternate===null&&(C.flags|=2),C}function _(C,w,I,O){return w===null||w.tag!==6?(w=zu(I,C.mode,O),w.return=C,w):(w=c(w,I),w.return=C,w)}function v(C,w,I,O){var W=I.type;return W===je?P(C,w,I.props.children,O,I.key):w!==null&&(w.elementType===W||typeof W=="object"&&W!==null&&W.$$typeof===it&&af(W)===w.type)?(O=c(w,I.props),O.ref=Yi(C,w,I),O.return=C,O):(O=Qo(I.type,I.key,I.props,null,C.mode,O),O.ref=Yi(C,w,I),O.return=C,O)}function k(C,w,I,O){return w===null||w.tag!==4||w.stateNode.containerInfo!==I.containerInfo||w.stateNode.implementation!==I.implementation?(w=Wu(I,C.mode,O),w.return=C,w):(w=c(w,I.children||[]),w.return=C,w)}function P(C,w,I,O,W){return w===null||w.tag!==7?(w=mr(I,C.mode,O,W),w.return=C,w):(w=c(w,I),w.return=C,w)}function A(C,w,I){if(typeof w=="string"&&w!==""||typeof w=="number")return w=zu(""+w,C.mode,I),w.return=C,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case nt:return I=Qo(w.type,w.key,w.props,null,C.mode,I),I.ref=Yi(C,null,w),I.return=C,I;case Oe:return w=Wu(w,C.mode,I),w.return=C,w;case it:var O=w._init;return A(C,O(w._payload),I)}if(Ti(w)||$(w))return w=mr(w,C.mode,I,null),w.return=C,w;Po(C,w)}return null}function N(C,w,I,O){var W=w!==null?w.key:null;if(typeof I=="string"&&I!==""||typeof I=="number")return W!==null?null:_(C,w,""+I,O);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case nt:return I.key===W?v(C,w,I,O):null;case Oe:return I.key===W?k(C,w,I,O):null;case it:return W=I._init,N(C,w,W(I._payload),O)}if(Ti(I)||$(I))return W!==null?null:P(C,w,I,O,null);Po(C,I)}return null}function M(C,w,I,O,W){if(typeof O=="string"&&O!==""||typeof O=="number")return C=C.get(I)||null,_(w,C,""+O,W);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case nt:return C=C.get(O.key===null?I:O.key)||null,v(w,C,O,W);case Oe:return C=C.get(O.key===null?I:O.key)||null,k(w,C,O,W);case it:var H=O._init;return M(C,w,I,H(O._payload),W)}if(Ti(O)||$(O))return C=C.get(I)||null,P(w,C,O,W,null);Po(w,O)}return null}function U(C,w,I,O){for(var W=null,H=null,j=w,q=w=0,Ue=null;j!==null&&q<I.length;q++){j.index>q?(Ue=j,j=null):Ue=j.sibling;var re=N(C,j,I[q],O);if(re===null){j===null&&(j=Ue);break}t&&j&&re.alternate===null&&r(C,j),w=h(re,w,q),H===null?W=re:H.sibling=re,H=re,j=Ue}if(q===I.length)return o(C,j),_e&&lr(C,q),W;if(j===null){for(;q<I.length;q++)j=A(C,I[q],O),j!==null&&(w=h(j,w,q),H===null?W=j:H.sibling=j,H=j);return _e&&lr(C,q),W}for(j=a(C,j);q<I.length;q++)Ue=M(j,C,q,I[q],O),Ue!==null&&(t&&Ue.alternate!==null&&j.delete(Ue.key===null?q:Ue.key),w=h(Ue,w,q),H===null?W=Ue:H.sibling=Ue,H=Ue);return t&&j.forEach(function(Un){return r(C,Un)}),_e&&lr(C,q),W}function z(C,w,I,O){var W=$(I);if(typeof W!="function")throw Error(n(150));if(I=W.call(I),I==null)throw Error(n(151));for(var H=W=null,j=w,q=w=0,Ue=null,re=I.next();j!==null&&!re.done;q++,re=I.next()){j.index>q?(Ue=j,j=null):Ue=j.sibling;var Un=N(C,j,re.value,O);if(Un===null){j===null&&(j=Ue);break}t&&j&&Un.alternate===null&&r(C,j),w=h(Un,w,q),H===null?W=Un:H.sibling=Un,H=Un,j=Ue}if(re.done)return o(C,j),_e&&lr(C,q),W;if(j===null){for(;!re.done;q++,re=I.next())re=A(C,re.value,O),re!==null&&(w=h(re,w,q),H===null?W=re:H.sibling=re,H=re);return _e&&lr(C,q),W}for(j=a(C,j);!re.done;q++,re=I.next())re=M(j,C,q,re.value,O),re!==null&&(t&&re.alternate!==null&&j.delete(re.key===null?q:re.key),w=h(re,w,q),H===null?W=re:H.sibling=re,H=re);return t&&j.forEach(function(Ky){return r(C,Ky)}),_e&&lr(C,q),W}function Ne(C,w,I,O){if(typeof I=="object"&&I!==null&&I.type===je&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case nt:e:{for(var W=I.key,H=w;H!==null;){if(H.key===W){if(W=I.type,W===je){if(H.tag===7){o(C,H.sibling),w=c(H,I.props.children),w.return=C,C=w;break e}}else if(H.elementType===W||typeof W=="object"&&W!==null&&W.$$typeof===it&&af(W)===H.type){o(C,H.sibling),w=c(H,I.props),w.ref=Yi(C,H,I),w.return=C,C=w;break e}o(C,H);break}else r(C,H);H=H.sibling}I.type===je?(w=mr(I.props.children,C.mode,O,I.key),w.return=C,C=w):(O=Qo(I.type,I.key,I.props,null,C.mode,O),O.ref=Yi(C,w,I),O.return=C,C=O)}return p(C);case Oe:e:{for(H=I.key;w!==null;){if(w.key===H)if(w.tag===4&&w.stateNode.containerInfo===I.containerInfo&&w.stateNode.implementation===I.implementation){o(C,w.sibling),w=c(w,I.children||[]),w.return=C,C=w;break e}else{o(C,w);break}else r(C,w);w=w.sibling}w=Wu(I,C.mode,O),w.return=C,C=w}return p(C);case it:return H=I._init,Ne(C,w,H(I._payload),O)}if(Ti(I))return U(C,w,I,O);if($(I))return z(C,w,I,O);Po(C,I)}return typeof I=="string"&&I!==""||typeof I=="number"?(I=""+I,w!==null&&w.tag===6?(o(C,w.sibling),w=c(w,I),w.return=C,C=w):(o(C,w),w=zu(I,C.mode,O),w.return=C,C=w),p(C)):o(C,w)}return Ne}var Qr=uf(!0),cf=uf(!1),Xi={},Kt=Nn(Xi),Ji=Nn(Xi),Zi=Nn(Xi);function ur(t){if(t===Xi)throw Error(n(174));return t}function ru(t,r){switch(fe(Zi,r),fe(Ji,t),fe(Kt,Xi),t=r.nodeType,t){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:na(null,"");break;default:t=t===8?r.parentNode:r,r=t.namespaceURI||null,t=t.tagName,r=na(r,t)}ge(Kt),fe(Kt,r)}function qr(){ge(Kt),ge(Ji),ge(Zi)}function df(t){ur(Zi.current);var r=ur(Kt.current),o=na(r,t.type);r!==o&&(fe(Ji,t),fe(Kt,o))}function iu(t){Ji.current===t&&(ge(Kt),ge(Ji))}var ve=Nn(0);function Ao(t){for(var r=t;r!==null;){if(r.tag===13){var o=r.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var su=[];function ou(){for(var t=0;t<su.length;t++)su[t]._workInProgressVersionPrimary=null;su.length=0}var Oo=Te.ReactCurrentDispatcher,lu=Te.ReactCurrentBatchConfig,cr=0,ye=null,De=null,be=null,Do=!1,es=!1,ts=0,my=0;function Qe(){throw Error(n(321))}function au(t,r){if(r===null)return!1;for(var o=0;o<r.length&&o<t.length;o++)if(!Ot(t[o],r[o]))return!1;return!0}function uu(t,r,o,a,c,h){if(cr=h,ye=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,Oo.current=t===null||t.memoizedState===null?yy:wy,t=o(a,c),es){h=0;do{if(es=!1,ts=0,25<=h)throw Error(n(301));h+=1,be=De=null,r.updateQueue=null,Oo.current=Ey,t=o(a,c)}while(es)}if(Oo.current=Mo,r=De!==null&&De.next!==null,cr=0,be=De=ye=null,Do=!1,r)throw Error(n(300));return t}function cu(){var t=ts!==0;return ts=0,t}function Qt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return be===null?ye.memoizedState=be=t:be=be.next=t,be}function St(){if(De===null){var t=ye.alternate;t=t!==null?t.memoizedState:null}else t=De.next;var r=be===null?ye.memoizedState:be.next;if(r!==null)be=r,De=t;else{if(t===null)throw Error(n(310));De=t,t={memoizedState:De.memoizedState,baseState:De.baseState,baseQueue:De.baseQueue,queue:De.queue,next:null},be===null?ye.memoizedState=be=t:be=be.next=t}return be}function ns(t,r){return typeof r=="function"?r(t):r}function du(t){var r=St(),o=r.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var a=De,c=a.baseQueue,h=o.pending;if(h!==null){if(c!==null){var p=c.next;c.next=h.next,h.next=p}a.baseQueue=c=h,o.pending=null}if(c!==null){h=c.next,a=a.baseState;var _=p=null,v=null,k=h;do{var P=k.lane;if((cr&P)===P)v!==null&&(v=v.next={lane:0,action:k.action,hasEagerState:k.hasEagerState,eagerState:k.eagerState,next:null}),a=k.hasEagerState?k.eagerState:t(a,k.action);else{var A={lane:P,action:k.action,hasEagerState:k.hasEagerState,eagerState:k.eagerState,next:null};v===null?(_=v=A,p=a):v=v.next=A,ye.lanes|=P,dr|=P}k=k.next}while(k!==null&&k!==h);v===null?p=a:v.next=_,Ot(a,r.memoizedState)||(at=!0),r.memoizedState=a,r.baseState=p,r.baseQueue=v,o.lastRenderedState=a}if(t=o.interleaved,t!==null){c=t;do h=c.lane,ye.lanes|=h,dr|=h,c=c.next;while(c!==t)}else c===null&&(o.lanes=0);return[r.memoizedState,o.dispatch]}function hu(t){var r=St(),o=r.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var a=o.dispatch,c=o.pending,h=r.memoizedState;if(c!==null){o.pending=null;var p=c=c.next;do h=t(h,p.action),p=p.next;while(p!==c);Ot(h,r.memoizedState)||(at=!0),r.memoizedState=h,r.baseQueue===null&&(r.baseState=h),o.lastRenderedState=h}return[h,a]}function hf(){}function ff(t,r){var o=ye,a=St(),c=r(),h=!Ot(a.memoizedState,c);if(h&&(a.memoizedState=c,at=!0),a=a.queue,fu(gf.bind(null,o,a,t),[t]),a.getSnapshot!==r||h||be!==null&&be.memoizedState.tag&1){if(o.flags|=2048,rs(9,mf.bind(null,o,a,c,r),void 0,null),Fe===null)throw Error(n(349));(cr&30)!==0||pf(o,r,c)}return c}function pf(t,r,o){t.flags|=16384,t={getSnapshot:r,value:o},r=ye.updateQueue,r===null?(r={lastEffect:null,stores:null},ye.updateQueue=r,r.stores=[t]):(o=r.stores,o===null?r.stores=[t]:o.push(t))}function mf(t,r,o,a){r.value=o,r.getSnapshot=a,_f(r)&&vf(t)}function gf(t,r,o){return o(function(){_f(r)&&vf(t)})}function _f(t){var r=t.getSnapshot;t=t.value;try{var o=r();return!Ot(t,o)}catch{return!0}}function vf(t){var r=sn(t,1);r!==null&&bt(r,t,1,-1)}function yf(t){var r=Qt();return typeof t=="function"&&(t=t()),r.memoizedState=r.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ns,lastRenderedState:t},r.queue=t,t=t.dispatch=vy.bind(null,ye,t),[r.memoizedState,t]}function rs(t,r,o,a){return t={tag:t,create:r,destroy:o,deps:a,next:null},r=ye.updateQueue,r===null?(r={lastEffect:null,stores:null},ye.updateQueue=r,r.lastEffect=t.next=t):(o=r.lastEffect,o===null?r.lastEffect=t.next=t:(a=o.next,o.next=t,t.next=a,r.lastEffect=t)),t}function wf(){return St().memoizedState}function xo(t,r,o,a){var c=Qt();ye.flags|=t,c.memoizedState=rs(1|r,o,void 0,a===void 0?null:a)}function Lo(t,r,o,a){var c=St();a=a===void 0?null:a;var h=void 0;if(De!==null){var p=De.memoizedState;if(h=p.destroy,a!==null&&au(a,p.deps)){c.memoizedState=rs(r,o,h,a);return}}ye.flags|=t,c.memoizedState=rs(1|r,o,h,a)}function Ef(t,r){return xo(8390656,8,t,r)}function fu(t,r){return Lo(2048,8,t,r)}function Sf(t,r){return Lo(4,2,t,r)}function Cf(t,r){return Lo(4,4,t,r)}function If(t,r){if(typeof r=="function")return t=t(),r(t),function(){r(null)};if(r!=null)return t=t(),r.current=t,function(){r.current=null}}function Tf(t,r,o){return o=o!=null?o.concat([t]):null,Lo(4,4,If.bind(null,r,t),o)}function pu(){}function kf(t,r){var o=St();r=r===void 0?null:r;var a=o.memoizedState;return a!==null&&r!==null&&au(r,a[1])?a[0]:(o.memoizedState=[t,r],t)}function Nf(t,r){var o=St();r=r===void 0?null:r;var a=o.memoizedState;return a!==null&&r!==null&&au(r,a[1])?a[0]:(t=t(),o.memoizedState=[t,r],t)}function Rf(t,r,o){return(cr&21)===0?(t.baseState&&(t.baseState=!1,at=!0),t.memoizedState=o):(Ot(o,r)||(o=Zd(),ye.lanes|=o,dr|=o,t.baseState=!0),r)}function gy(t,r){var o=le;le=o!==0&&4>o?o:4,t(!0);var a=lu.transition;lu.transition={};try{t(!1),r()}finally{le=o,lu.transition=a}}function Pf(){return St().memoizedState}function _y(t,r,o){var a=Mn(t);if(o={lane:a,action:o,hasEagerState:!1,eagerState:null,next:null},Af(t))Of(r,o);else if(o=Zh(t,r,o,a),o!==null){var c=Je();bt(o,t,a,c),Df(o,r,a)}}function vy(t,r,o){var a=Mn(t),c={lane:a,action:o,hasEagerState:!1,eagerState:null,next:null};if(Af(t))Of(r,c);else{var h=t.alternate;if(t.lanes===0&&(h===null||h.lanes===0)&&(h=r.lastRenderedReducer,h!==null))try{var p=r.lastRenderedState,_=h(p,o);if(c.hasEagerState=!0,c.eagerState=_,Ot(_,p)){var v=r.interleaved;v===null?(c.next=c,Za(r)):(c.next=v.next,v.next=c),r.interleaved=c;return}}catch{}finally{}o=Zh(t,r,c,a),o!==null&&(c=Je(),bt(o,t,a,c),Df(o,r,a))}}function Af(t){var r=t.alternate;return t===ye||r!==null&&r===ye}function Of(t,r){es=Do=!0;var o=t.pending;o===null?r.next=r:(r.next=o.next,o.next=r),t.pending=r}function Df(t,r,o){if((o&4194240)!==0){var a=r.lanes;a&=t.pendingLanes,o|=a,r.lanes=o,pa(t,o)}}var Mo={readContext:Et,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useInsertionEffect:Qe,useLayoutEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useMutableSource:Qe,useSyncExternalStore:Qe,useId:Qe,unstable_isNewReconciler:!1},yy={readContext:Et,useCallback:function(t,r){return Qt().memoizedState=[t,r===void 0?null:r],t},useContext:Et,useEffect:Ef,useImperativeHandle:function(t,r,o){return o=o!=null?o.concat([t]):null,xo(4194308,4,If.bind(null,r,t),o)},useLayoutEffect:function(t,r){return xo(4194308,4,t,r)},useInsertionEffect:function(t,r){return xo(4,2,t,r)},useMemo:function(t,r){var o=Qt();return r=r===void 0?null:r,t=t(),o.memoizedState=[t,r],t},useReducer:function(t,r,o){var a=Qt();return r=o!==void 0?o(r):r,a.memoizedState=a.baseState=r,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:r},a.queue=t,t=t.dispatch=_y.bind(null,ye,t),[a.memoizedState,t]},useRef:function(t){var r=Qt();return t={current:t},r.memoizedState=t},useState:yf,useDebugValue:pu,useDeferredValue:function(t){return Qt().memoizedState=t},useTransition:function(){var t=yf(!1),r=t[0];return t=gy.bind(null,t[1]),Qt().memoizedState=t,[r,t]},useMutableSource:function(){},useSyncExternalStore:function(t,r,o){var a=ye,c=Qt();if(_e){if(o===void 0)throw Error(n(407));o=o()}else{if(o=r(),Fe===null)throw Error(n(349));(cr&30)!==0||pf(a,r,o)}c.memoizedState=o;var h={value:o,getSnapshot:r};return c.queue=h,Ef(gf.bind(null,a,h,t),[t]),a.flags|=2048,rs(9,mf.bind(null,a,h,o,r),void 0,null),o},useId:function(){var t=Qt(),r=Fe.identifierPrefix;if(_e){var o=rn,a=nn;o=(a&~(1<<32-At(a)-1)).toString(32)+o,r=":"+r+"R"+o,o=ts++,0<o&&(r+="H"+o.toString(32)),r+=":"}else o=my++,r=":"+r+"r"+o.toString(32)+":";return t.memoizedState=r},unstable_isNewReconciler:!1},wy={readContext:Et,useCallback:kf,useContext:Et,useEffect:fu,useImperativeHandle:Tf,useInsertionEffect:Sf,useLayoutEffect:Cf,useMemo:Nf,useReducer:du,useRef:wf,useState:function(){return du(ns)},useDebugValue:pu,useDeferredValue:function(t){var r=St();return Rf(r,De.memoizedState,t)},useTransition:function(){var t=du(ns)[0],r=St().memoizedState;return[t,r]},useMutableSource:hf,useSyncExternalStore:ff,useId:Pf,unstable_isNewReconciler:!1},Ey={readContext:Et,useCallback:kf,useContext:Et,useEffect:fu,useImperativeHandle:Tf,useInsertionEffect:Sf,useLayoutEffect:Cf,useMemo:Nf,useReducer:hu,useRef:wf,useState:function(){return hu(ns)},useDebugValue:pu,useDeferredValue:function(t){var r=St();return De===null?r.memoizedState=t:Rf(r,De.memoizedState,t)},useTransition:function(){var t=hu(ns)[0],r=St().memoizedState;return[t,r]},useMutableSource:hf,useSyncExternalStore:ff,useId:Pf,unstable_isNewReconciler:!1};function Yr(t,r){try{var o="",a=r;do o+=he(a),a=a.return;while(a);var c=o}catch(h){c=`
Error generating stack: `+h.message+`
`+h.stack}return{value:t,source:r,stack:c,digest:null}}function mu(t,r,o){return{value:t,source:null,stack:o??null,digest:r??null}}function gu(t,r){try{console.error(r.value)}catch(o){setTimeout(function(){throw o})}}var Sy=typeof WeakMap=="function"?WeakMap:Map;function xf(t,r,o){o=on(-1,o),o.tag=3,o.payload={element:null};var a=r.value;return o.callback=function(){Bo||(Bo=!0,Ou=a),gu(t,r)},o}function Lf(t,r,o){o=on(-1,o),o.tag=3;var a=t.type.getDerivedStateFromError;if(typeof a=="function"){var c=r.value;o.payload=function(){return a(c)},o.callback=function(){gu(t,r)}}var h=t.stateNode;return h!==null&&typeof h.componentDidCatch=="function"&&(o.callback=function(){gu(t,r),typeof a!="function"&&(xn===null?xn=new Set([this]):xn.add(this));var p=r.stack;this.componentDidCatch(r.value,{componentStack:p!==null?p:""})}),o}function Mf(t,r,o){var a=t.pingCache;if(a===null){a=t.pingCache=new Sy;var c=new Set;a.set(r,c)}else c=a.get(r),c===void 0&&(c=new Set,a.set(r,c));c.has(o)||(c.add(o),t=by.bind(null,t,r,o),r.then(t,t))}function bf(t){do{var r;if((r=t.tag===13)&&(r=t.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return t;t=t.return}while(t!==null);return null}function Ff(t,r,o,a,c){return(t.mode&1)===0?(t===r?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(r=on(-1,1),r.tag=2,On(o,r,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=c,t)}var Cy=Te.ReactCurrentOwner,at=!1;function Xe(t,r,o,a){r.child=t===null?cf(r,null,o,a):Qr(r,t.child,o,a)}function Uf(t,r,o,a,c){o=o.render;var h=r.ref;return Kr(r,c),a=uu(t,r,o,a,h,c),o=cu(),t!==null&&!at?(r.updateQueue=t.updateQueue,r.flags&=-2053,t.lanes&=~c,ln(t,r,c)):(_e&&o&&ja(r),r.flags|=1,Xe(t,r,a,c),r.child)}function zf(t,r,o,a,c){if(t===null){var h=o.type;return typeof h=="function"&&!Uu(h)&&h.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(r.tag=15,r.type=h,Wf(t,r,h,a,c)):(t=Qo(o.type,null,a,r,r.mode,c),t.ref=r.ref,t.return=r,r.child=t)}if(h=t.child,(t.lanes&c)===0){var p=h.memoizedProps;if(o=o.compare,o=o!==null?o:Hi,o(p,a)&&t.ref===r.ref)return ln(t,r,c)}return r.flags|=1,t=Fn(h,a),t.ref=r.ref,t.return=r,r.child=t}function Wf(t,r,o,a,c){if(t!==null){var h=t.memoizedProps;if(Hi(h,a)&&t.ref===r.ref)if(at=!1,r.pendingProps=a=h,(t.lanes&c)!==0)(t.flags&131072)!==0&&(at=!0);else return r.lanes=t.lanes,ln(t,r,c)}return _u(t,r,o,a,c)}function Vf(t,r,o){var a=r.pendingProps,c=a.children,h=t!==null?t.memoizedState:null;if(a.mode==="hidden")if((r.mode&1)===0)r.memoizedState={baseLanes:0,cachePool:null,transitions:null},fe(Jr,_t),_t|=o;else{if((o&1073741824)===0)return t=h!==null?h.baseLanes|o:o,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:t,cachePool:null,transitions:null},r.updateQueue=null,fe(Jr,_t),_t|=t,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=h!==null?h.baseLanes:o,fe(Jr,_t),_t|=a}else h!==null?(a=h.baseLanes|o,r.memoizedState=null):a=o,fe(Jr,_t),_t|=a;return Xe(t,r,c,o),r.child}function Bf(t,r){var o=r.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(r.flags|=512,r.flags|=2097152)}function _u(t,r,o,a,c){var h=lt(o)?sr:Ke.current;return h=Br(r,h),Kr(r,c),o=uu(t,r,o,a,h,c),a=cu(),t!==null&&!at?(r.updateQueue=t.updateQueue,r.flags&=-2053,t.lanes&=~c,ln(t,r,c)):(_e&&a&&ja(r),r.flags|=1,Xe(t,r,o,c),r.child)}function Hf(t,r,o,a,c){if(lt(o)){var h=!0;yo(r)}else h=!1;if(Kr(r,c),r.stateNode===null)Fo(t,r),of(r,o,a),nu(r,o,a,c),a=!0;else if(t===null){var p=r.stateNode,_=r.memoizedProps;p.props=_;var v=p.context,k=o.contextType;typeof k=="object"&&k!==null?k=Et(k):(k=lt(o)?sr:Ke.current,k=Br(r,k));var P=o.getDerivedStateFromProps,A=typeof P=="function"||typeof p.getSnapshotBeforeUpdate=="function";A||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(_!==a||v!==k)&&lf(r,p,a,k),An=!1;var N=r.memoizedState;p.state=N,No(r,a,p,c),v=r.memoizedState,_!==a||N!==v||ot.current||An?(typeof P=="function"&&(tu(r,o,P,a),v=r.memoizedState),(_=An||sf(r,o,_,a,N,v,k))?(A||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount()),typeof p.componentDidMount=="function"&&(r.flags|=4194308)):(typeof p.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=a,r.memoizedState=v),p.props=a,p.state=v,p.context=k,a=_):(typeof p.componentDidMount=="function"&&(r.flags|=4194308),a=!1)}else{p=r.stateNode,ef(t,r),_=r.memoizedProps,k=r.type===r.elementType?_:xt(r.type,_),p.props=k,A=r.pendingProps,N=p.context,v=o.contextType,typeof v=="object"&&v!==null?v=Et(v):(v=lt(o)?sr:Ke.current,v=Br(r,v));var M=o.getDerivedStateFromProps;(P=typeof M=="function"||typeof p.getSnapshotBeforeUpdate=="function")||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(_!==A||N!==v)&&lf(r,p,a,v),An=!1,N=r.memoizedState,p.state=N,No(r,a,p,c);var U=r.memoizedState;_!==A||N!==U||ot.current||An?(typeof M=="function"&&(tu(r,o,M,a),U=r.memoizedState),(k=An||sf(r,o,k,a,N,U,v)||!1)?(P||typeof p.UNSAFE_componentWillUpdate!="function"&&typeof p.componentWillUpdate!="function"||(typeof p.componentWillUpdate=="function"&&p.componentWillUpdate(a,U,v),typeof p.UNSAFE_componentWillUpdate=="function"&&p.UNSAFE_componentWillUpdate(a,U,v)),typeof p.componentDidUpdate=="function"&&(r.flags|=4),typeof p.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof p.componentDidUpdate!="function"||_===t.memoizedProps&&N===t.memoizedState||(r.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&N===t.memoizedState||(r.flags|=1024),r.memoizedProps=a,r.memoizedState=U),p.props=a,p.state=U,p.context=v,a=k):(typeof p.componentDidUpdate!="function"||_===t.memoizedProps&&N===t.memoizedState||(r.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&N===t.memoizedState||(r.flags|=1024),a=!1)}return vu(t,r,o,a,h,c)}function vu(t,r,o,a,c,h){Bf(t,r);var p=(r.flags&128)!==0;if(!a&&!p)return c&&Gh(r,o,!1),ln(t,r,h);a=r.stateNode,Cy.current=r;var _=p&&typeof o.getDerivedStateFromError!="function"?null:a.render();return r.flags|=1,t!==null&&p?(r.child=Qr(r,t.child,null,h),r.child=Qr(r,null,_,h)):Xe(t,r,_,h),r.memoizedState=a.state,c&&Gh(r,o,!0),r.child}function jf(t){var r=t.stateNode;r.pendingContext?jh(t,r.pendingContext,r.pendingContext!==r.context):r.context&&jh(t,r.context,!1),ru(t,r.containerInfo)}function $f(t,r,o,a,c){return $r(),Qa(c),r.flags|=256,Xe(t,r,o,a),r.child}var yu={dehydrated:null,treeContext:null,retryLane:0};function wu(t){return{baseLanes:t,cachePool:null,transitions:null}}function Gf(t,r,o){var a=r.pendingProps,c=ve.current,h=!1,p=(r.flags&128)!==0,_;if((_=p)||(_=t!==null&&t.memoizedState===null?!1:(c&2)!==0),_?(h=!0,r.flags&=-129):(t===null||t.memoizedState!==null)&&(c|=1),fe(ve,c&1),t===null)return Ka(r),t=r.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((r.mode&1)===0?r.lanes=1:t.data==="$!"?r.lanes=8:r.lanes=1073741824,null):(p=a.children,t=a.fallback,h?(a=r.mode,h=r.child,p={mode:"hidden",children:p},(a&1)===0&&h!==null?(h.childLanes=0,h.pendingProps=p):h=qo(p,a,0,null),t=mr(t,a,o,null),h.return=r,t.return=r,h.sibling=t,r.child=h,r.child.memoizedState=wu(o),r.memoizedState=yu,t):Eu(r,p));if(c=t.memoizedState,c!==null&&(_=c.dehydrated,_!==null))return Iy(t,r,p,a,_,c,o);if(h){h=a.fallback,p=r.mode,c=t.child,_=c.sibling;var v={mode:"hidden",children:a.children};return(p&1)===0&&r.child!==c?(a=r.child,a.childLanes=0,a.pendingProps=v,r.deletions=null):(a=Fn(c,v),a.subtreeFlags=c.subtreeFlags&14680064),_!==null?h=Fn(_,h):(h=mr(h,p,o,null),h.flags|=2),h.return=r,a.return=r,a.sibling=h,r.child=a,a=h,h=r.child,p=t.child.memoizedState,p=p===null?wu(o):{baseLanes:p.baseLanes|o,cachePool:null,transitions:p.transitions},h.memoizedState=p,h.childLanes=t.childLanes&~o,r.memoizedState=yu,a}return h=t.child,t=h.sibling,a=Fn(h,{mode:"visible",children:a.children}),(r.mode&1)===0&&(a.lanes=o),a.return=r,a.sibling=null,t!==null&&(o=r.deletions,o===null?(r.deletions=[t],r.flags|=16):o.push(t)),r.child=a,r.memoizedState=null,a}function Eu(t,r){return r=qo({mode:"visible",children:r},t.mode,0,null),r.return=t,t.child=r}function bo(t,r,o,a){return a!==null&&Qa(a),Qr(r,t.child,null,o),t=Eu(r,r.pendingProps.children),t.flags|=2,r.memoizedState=null,t}function Iy(t,r,o,a,c,h,p){if(o)return r.flags&256?(r.flags&=-257,a=mu(Error(n(422))),bo(t,r,p,a)):r.memoizedState!==null?(r.child=t.child,r.flags|=128,null):(h=a.fallback,c=r.mode,a=qo({mode:"visible",children:a.children},c,0,null),h=mr(h,c,p,null),h.flags|=2,a.return=r,h.return=r,a.sibling=h,r.child=a,(r.mode&1)!==0&&Qr(r,t.child,null,p),r.child.memoizedState=wu(p),r.memoizedState=yu,h);if((r.mode&1)===0)return bo(t,r,p,null);if(c.data==="$!"){if(a=c.nextSibling&&c.nextSibling.dataset,a)var _=a.dgst;return a=_,h=Error(n(419)),a=mu(h,a,void 0),bo(t,r,p,a)}if(_=(p&t.childLanes)!==0,at||_){if(a=Fe,a!==null){switch(p&-p){case 4:c=2;break;case 16:c=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:c=32;break;case 536870912:c=268435456;break;default:c=0}c=(c&(a.suspendedLanes|p))!==0?0:c,c!==0&&c!==h.retryLane&&(h.retryLane=c,sn(t,c),bt(a,t,c,-1))}return Fu(),a=mu(Error(n(421))),bo(t,r,p,a)}return c.data==="$?"?(r.flags|=128,r.child=t.child,r=Fy.bind(null,t),c._reactRetry=r,null):(t=h.treeContext,gt=kn(c.nextSibling),mt=r,_e=!0,Dt=null,t!==null&&(yt[wt++]=nn,yt[wt++]=rn,yt[wt++]=or,nn=t.id,rn=t.overflow,or=r),r=Eu(r,a.children),r.flags|=4096,r)}function Kf(t,r,o){t.lanes|=r;var a=t.alternate;a!==null&&(a.lanes|=r),Ja(t.return,r,o)}function Su(t,r,o,a,c){var h=t.memoizedState;h===null?t.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:a,tail:o,tailMode:c}:(h.isBackwards=r,h.rendering=null,h.renderingStartTime=0,h.last=a,h.tail=o,h.tailMode=c)}function Qf(t,r,o){var a=r.pendingProps,c=a.revealOrder,h=a.tail;if(Xe(t,r,a.children,o),a=ve.current,(a&2)!==0)a=a&1|2,r.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=r.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Kf(t,o,r);else if(t.tag===19)Kf(t,o,r);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===r)break e;for(;t.sibling===null;){if(t.return===null||t.return===r)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}a&=1}if(fe(ve,a),(r.mode&1)===0)r.memoizedState=null;else switch(c){case"forwards":for(o=r.child,c=null;o!==null;)t=o.alternate,t!==null&&Ao(t)===null&&(c=o),o=o.sibling;o=c,o===null?(c=r.child,r.child=null):(c=o.sibling,o.sibling=null),Su(r,!1,c,o,h);break;case"backwards":for(o=null,c=r.child,r.child=null;c!==null;){if(t=c.alternate,t!==null&&Ao(t)===null){r.child=c;break}t=c.sibling,c.sibling=o,o=c,c=t}Su(r,!0,o,null,h);break;case"together":Su(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function Fo(t,r){(r.mode&1)===0&&t!==null&&(t.alternate=null,r.alternate=null,r.flags|=2)}function ln(t,r,o){if(t!==null&&(r.dependencies=t.dependencies),dr|=r.lanes,(o&r.childLanes)===0)return null;if(t!==null&&r.child!==t.child)throw Error(n(153));if(r.child!==null){for(t=r.child,o=Fn(t,t.pendingProps),r.child=o,o.return=r;t.sibling!==null;)t=t.sibling,o=o.sibling=Fn(t,t.pendingProps),o.return=r;o.sibling=null}return r.child}function Ty(t,r,o){switch(r.tag){case 3:jf(r),$r();break;case 5:df(r);break;case 1:lt(r.type)&&yo(r);break;case 4:ru(r,r.stateNode.containerInfo);break;case 10:var a=r.type._context,c=r.memoizedProps.value;fe(Io,a._currentValue),a._currentValue=c;break;case 13:if(a=r.memoizedState,a!==null)return a.dehydrated!==null?(fe(ve,ve.current&1),r.flags|=128,null):(o&r.child.childLanes)!==0?Gf(t,r,o):(fe(ve,ve.current&1),t=ln(t,r,o),t!==null?t.sibling:null);fe(ve,ve.current&1);break;case 19:if(a=(o&r.childLanes)!==0,(t.flags&128)!==0){if(a)return Qf(t,r,o);r.flags|=128}if(c=r.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),fe(ve,ve.current),a)break;return null;case 22:case 23:return r.lanes=0,Vf(t,r,o)}return ln(t,r,o)}var qf,Cu,Yf,Xf;qf=function(t,r){for(var o=r.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===r)break;for(;o.sibling===null;){if(o.return===null||o.return===r)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Cu=function(){},Yf=function(t,r,o,a){var c=t.memoizedProps;if(c!==a){t=r.stateNode,ur(Kt.current);var h=null;switch(o){case"input":c=Jl(t,c),a=Jl(t,a),h=[];break;case"select":c=y({},c,{value:void 0}),a=y({},a,{value:void 0}),h=[];break;case"textarea":c=ta(t,c),a=ta(t,a),h=[];break;default:typeof c.onClick!="function"&&typeof a.onClick=="function"&&(t.onclick=go)}ra(o,a);var p;o=null;for(k in c)if(!a.hasOwnProperty(k)&&c.hasOwnProperty(k)&&c[k]!=null)if(k==="style"){var _=c[k];for(p in _)_.hasOwnProperty(p)&&(o||(o={}),o[p]="")}else k!=="dangerouslySetInnerHTML"&&k!=="children"&&k!=="suppressContentEditableWarning"&&k!=="suppressHydrationWarning"&&k!=="autoFocus"&&(l.hasOwnProperty(k)?h||(h=[]):(h=h||[]).push(k,null));for(k in a){var v=a[k];if(_=c!=null?c[k]:void 0,a.hasOwnProperty(k)&&v!==_&&(v!=null||_!=null))if(k==="style")if(_){for(p in _)!_.hasOwnProperty(p)||v&&v.hasOwnProperty(p)||(o||(o={}),o[p]="");for(p in v)v.hasOwnProperty(p)&&_[p]!==v[p]&&(o||(o={}),o[p]=v[p])}else o||(h||(h=[]),h.push(k,o)),o=v;else k==="dangerouslySetInnerHTML"?(v=v?v.__html:void 0,_=_?_.__html:void 0,v!=null&&_!==v&&(h=h||[]).push(k,v)):k==="children"?typeof v!="string"&&typeof v!="number"||(h=h||[]).push(k,""+v):k!=="suppressContentEditableWarning"&&k!=="suppressHydrationWarning"&&(l.hasOwnProperty(k)?(v!=null&&k==="onScroll"&&me("scroll",t),h||_===v||(h=[])):(h=h||[]).push(k,v))}o&&(h=h||[]).push("style",o);var k=h;(r.updateQueue=k)&&(r.flags|=4)}},Xf=function(t,r,o,a){o!==a&&(r.flags|=4)};function is(t,r){if(!_e)switch(t.tailMode){case"hidden":r=t.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var a=null;o!==null;)o.alternate!==null&&(a=o),o=o.sibling;a===null?r||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function qe(t){var r=t.alternate!==null&&t.alternate.child===t.child,o=0,a=0;if(r)for(var c=t.child;c!==null;)o|=c.lanes|c.childLanes,a|=c.subtreeFlags&14680064,a|=c.flags&14680064,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)o|=c.lanes|c.childLanes,a|=c.subtreeFlags,a|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=a,t.childLanes=o,r}function ky(t,r,o){var a=r.pendingProps;switch($a(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(r),null;case 1:return lt(r.type)&&vo(),qe(r),null;case 3:return a=r.stateNode,qr(),ge(ot),ge(Ke),ou(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Co(r)?r.flags|=4:t===null||t.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,Dt!==null&&(Lu(Dt),Dt=null))),Cu(t,r),qe(r),null;case 5:iu(r);var c=ur(Zi.current);if(o=r.type,t!==null&&r.stateNode!=null)Yf(t,r,o,a,c),t.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!a){if(r.stateNode===null)throw Error(n(166));return qe(r),null}if(t=ur(Kt.current),Co(r)){a=r.stateNode,o=r.type;var h=r.memoizedProps;switch(a[Gt]=r,a[Qi]=h,t=(r.mode&1)!==0,o){case"dialog":me("cancel",a),me("close",a);break;case"iframe":case"object":case"embed":me("load",a);break;case"video":case"audio":for(c=0;c<$i.length;c++)me($i[c],a);break;case"source":me("error",a);break;case"img":case"image":case"link":me("error",a),me("load",a);break;case"details":me("toggle",a);break;case"input":Pd(a,h),me("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!h.multiple},me("invalid",a);break;case"textarea":Dd(a,h),me("invalid",a)}ra(o,h),c=null;for(var p in h)if(h.hasOwnProperty(p)){var _=h[p];p==="children"?typeof _=="string"?a.textContent!==_&&(h.suppressHydrationWarning!==!0&&mo(a.textContent,_,t),c=["children",_]):typeof _=="number"&&a.textContent!==""+_&&(h.suppressHydrationWarning!==!0&&mo(a.textContent,_,t),c=["children",""+_]):l.hasOwnProperty(p)&&_!=null&&p==="onScroll"&&me("scroll",a)}switch(o){case"input":$s(a),Od(a,h,!0);break;case"textarea":$s(a),Ld(a);break;case"select":case"option":break;default:typeof h.onClick=="function"&&(a.onclick=go)}a=c,r.updateQueue=a,a!==null&&(r.flags|=4)}else{p=c.nodeType===9?c:c.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Md(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=p.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof a.is=="string"?t=p.createElement(o,{is:a.is}):(t=p.createElement(o),o==="select"&&(p=t,a.multiple?p.multiple=!0:a.size&&(p.size=a.size))):t=p.createElementNS(t,o),t[Gt]=r,t[Qi]=a,qf(t,r,!1,!1),r.stateNode=t;e:{switch(p=ia(o,a),o){case"dialog":me("cancel",t),me("close",t),c=a;break;case"iframe":case"object":case"embed":me("load",t),c=a;break;case"video":case"audio":for(c=0;c<$i.length;c++)me($i[c],t);c=a;break;case"source":me("error",t),c=a;break;case"img":case"image":case"link":me("error",t),me("load",t),c=a;break;case"details":me("toggle",t),c=a;break;case"input":Pd(t,a),c=Jl(t,a),me("invalid",t);break;case"option":c=a;break;case"select":t._wrapperState={wasMultiple:!!a.multiple},c=y({},a,{value:void 0}),me("invalid",t);break;case"textarea":Dd(t,a),c=ta(t,a),me("invalid",t);break;default:c=a}ra(o,c),_=c;for(h in _)if(_.hasOwnProperty(h)){var v=_[h];h==="style"?Ud(t,v):h==="dangerouslySetInnerHTML"?(v=v?v.__html:void 0,v!=null&&bd(t,v)):h==="children"?typeof v=="string"?(o!=="textarea"||v!=="")&&ki(t,v):typeof v=="number"&&ki(t,""+v):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(l.hasOwnProperty(h)?v!=null&&h==="onScroll"&&me("scroll",t):v!=null&&Ae(t,h,v,p))}switch(o){case"input":$s(t),Od(t,a,!1);break;case"textarea":$s(t),Ld(t);break;case"option":a.value!=null&&t.setAttribute("value",""+oe(a.value));break;case"select":t.multiple=!!a.multiple,h=a.value,h!=null?Ar(t,!!a.multiple,h,!1):a.defaultValue!=null&&Ar(t,!!a.multiple,a.defaultValue,!0);break;default:typeof c.onClick=="function"&&(t.onclick=go)}switch(o){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return qe(r),null;case 6:if(t&&r.stateNode!=null)Xf(t,r,t.memoizedProps,a);else{if(typeof a!="string"&&r.stateNode===null)throw Error(n(166));if(o=ur(Zi.current),ur(Kt.current),Co(r)){if(a=r.stateNode,o=r.memoizedProps,a[Gt]=r,(h=a.nodeValue!==o)&&(t=mt,t!==null))switch(t.tag){case 3:mo(a.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&mo(a.nodeValue,o,(t.mode&1)!==0)}h&&(r.flags|=4)}else a=(o.nodeType===9?o:o.ownerDocument).createTextNode(a),a[Gt]=r,r.stateNode=a}return qe(r),null;case 13:if(ge(ve),a=r.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(_e&&gt!==null&&(r.mode&1)!==0&&(r.flags&128)===0)Jh(),$r(),r.flags|=98560,h=!1;else if(h=Co(r),a!==null&&a.dehydrated!==null){if(t===null){if(!h)throw Error(n(318));if(h=r.memoizedState,h=h!==null?h.dehydrated:null,!h)throw Error(n(317));h[Gt]=r}else $r(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;qe(r),h=!1}else Dt!==null&&(Lu(Dt),Dt=null),h=!0;if(!h)return r.flags&65536?r:null}return(r.flags&128)!==0?(r.lanes=o,r):(a=a!==null,a!==(t!==null&&t.memoizedState!==null)&&a&&(r.child.flags|=8192,(r.mode&1)!==0&&(t===null||(ve.current&1)!==0?xe===0&&(xe=3):Fu())),r.updateQueue!==null&&(r.flags|=4),qe(r),null);case 4:return qr(),Cu(t,r),t===null&&Gi(r.stateNode.containerInfo),qe(r),null;case 10:return Xa(r.type._context),qe(r),null;case 17:return lt(r.type)&&vo(),qe(r),null;case 19:if(ge(ve),h=r.memoizedState,h===null)return qe(r),null;if(a=(r.flags&128)!==0,p=h.rendering,p===null)if(a)is(h,!1);else{if(xe!==0||t!==null&&(t.flags&128)!==0)for(t=r.child;t!==null;){if(p=Ao(t),p!==null){for(r.flags|=128,is(h,!1),a=p.updateQueue,a!==null&&(r.updateQueue=a,r.flags|=4),r.subtreeFlags=0,a=o,o=r.child;o!==null;)h=o,t=a,h.flags&=14680066,p=h.alternate,p===null?(h.childLanes=0,h.lanes=t,h.child=null,h.subtreeFlags=0,h.memoizedProps=null,h.memoizedState=null,h.updateQueue=null,h.dependencies=null,h.stateNode=null):(h.childLanes=p.childLanes,h.lanes=p.lanes,h.child=p.child,h.subtreeFlags=0,h.deletions=null,h.memoizedProps=p.memoizedProps,h.memoizedState=p.memoizedState,h.updateQueue=p.updateQueue,h.type=p.type,t=p.dependencies,h.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return fe(ve,ve.current&1|2),r.child}t=t.sibling}h.tail!==null&&ke()>Zr&&(r.flags|=128,a=!0,is(h,!1),r.lanes=4194304)}else{if(!a)if(t=Ao(p),t!==null){if(r.flags|=128,a=!0,o=t.updateQueue,o!==null&&(r.updateQueue=o,r.flags|=4),is(h,!0),h.tail===null&&h.tailMode==="hidden"&&!p.alternate&&!_e)return qe(r),null}else 2*ke()-h.renderingStartTime>Zr&&o!==1073741824&&(r.flags|=128,a=!0,is(h,!1),r.lanes=4194304);h.isBackwards?(p.sibling=r.child,r.child=p):(o=h.last,o!==null?o.sibling=p:r.child=p,h.last=p)}return h.tail!==null?(r=h.tail,h.rendering=r,h.tail=r.sibling,h.renderingStartTime=ke(),r.sibling=null,o=ve.current,fe(ve,a?o&1|2:o&1),r):(qe(r),null);case 22:case 23:return bu(),a=r.memoizedState!==null,t!==null&&t.memoizedState!==null!==a&&(r.flags|=8192),a&&(r.mode&1)!==0?(_t&1073741824)!==0&&(qe(r),r.subtreeFlags&6&&(r.flags|=8192)):qe(r),null;case 24:return null;case 25:return null}throw Error(n(156,r.tag))}function Ny(t,r){switch($a(r),r.tag){case 1:return lt(r.type)&&vo(),t=r.flags,t&65536?(r.flags=t&-65537|128,r):null;case 3:return qr(),ge(ot),ge(Ke),ou(),t=r.flags,(t&65536)!==0&&(t&128)===0?(r.flags=t&-65537|128,r):null;case 5:return iu(r),null;case 13:if(ge(ve),t=r.memoizedState,t!==null&&t.dehydrated!==null){if(r.alternate===null)throw Error(n(340));$r()}return t=r.flags,t&65536?(r.flags=t&-65537|128,r):null;case 19:return ge(ve),null;case 4:return qr(),null;case 10:return Xa(r.type._context),null;case 22:case 23:return bu(),null;case 24:return null;default:return null}}var Uo=!1,Ye=!1,Ry=typeof WeakSet=="function"?WeakSet:Set,F=null;function Xr(t,r){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(a){Ce(t,r,a)}else o.current=null}function Iu(t,r,o){try{o()}catch(a){Ce(t,r,a)}}var Jf=!1;function Py(t,r){if(ba=ro,t=Rh(),Ra(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var a=o.getSelection&&o.getSelection();if(a&&a.rangeCount!==0){o=a.anchorNode;var c=a.anchorOffset,h=a.focusNode;a=a.focusOffset;try{o.nodeType,h.nodeType}catch{o=null;break e}var p=0,_=-1,v=-1,k=0,P=0,A=t,N=null;t:for(;;){for(var M;A!==o||c!==0&&A.nodeType!==3||(_=p+c),A!==h||a!==0&&A.nodeType!==3||(v=p+a),A.nodeType===3&&(p+=A.nodeValue.length),(M=A.firstChild)!==null;)N=A,A=M;for(;;){if(A===t)break t;if(N===o&&++k===c&&(_=p),N===h&&++P===a&&(v=p),(M=A.nextSibling)!==null)break;A=N,N=A.parentNode}A=M}o=_===-1||v===-1?null:{start:_,end:v}}else o=null}o=o||{start:0,end:0}}else o=null;for(Fa={focusedElem:t,selectionRange:o},ro=!1,F=r;F!==null;)if(r=F,t=r.child,(r.subtreeFlags&1028)!==0&&t!==null)t.return=r,F=t;else for(;F!==null;){r=F;try{var U=r.alternate;if((r.flags&1024)!==0)switch(r.tag){case 0:case 11:case 15:break;case 1:if(U!==null){var z=U.memoizedProps,Ne=U.memoizedState,C=r.stateNode,w=C.getSnapshotBeforeUpdate(r.elementType===r.type?z:xt(r.type,z),Ne);C.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var I=r.stateNode.containerInfo;I.nodeType===1?I.textContent="":I.nodeType===9&&I.documentElement&&I.removeChild(I.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(O){Ce(r,r.return,O)}if(t=r.sibling,t!==null){t.return=r.return,F=t;break}F=r.return}return U=Jf,Jf=!1,U}function ss(t,r,o){var a=r.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var c=a=a.next;do{if((c.tag&t)===t){var h=c.destroy;c.destroy=void 0,h!==void 0&&Iu(r,o,h)}c=c.next}while(c!==a)}}function zo(t,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&t)===t){var a=o.create;o.destroy=a()}o=o.next}while(o!==r)}}function Tu(t){var r=t.ref;if(r!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof r=="function"?r(t):r.current=t}}function Zf(t){var r=t.alternate;r!==null&&(t.alternate=null,Zf(r)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(r=t.stateNode,r!==null&&(delete r[Gt],delete r[Qi],delete r[Va],delete r[dy],delete r[hy])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function ep(t){return t.tag===5||t.tag===3||t.tag===4}function tp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||ep(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ku(t,r,o){var a=t.tag;if(a===5||a===6)t=t.stateNode,r?o.nodeType===8?o.parentNode.insertBefore(t,r):o.insertBefore(t,r):(o.nodeType===8?(r=o.parentNode,r.insertBefore(t,o)):(r=o,r.appendChild(t)),o=o._reactRootContainer,o!=null||r.onclick!==null||(r.onclick=go));else if(a!==4&&(t=t.child,t!==null))for(ku(t,r,o),t=t.sibling;t!==null;)ku(t,r,o),t=t.sibling}function Nu(t,r,o){var a=t.tag;if(a===5||a===6)t=t.stateNode,r?o.insertBefore(t,r):o.appendChild(t);else if(a!==4&&(t=t.child,t!==null))for(Nu(t,r,o),t=t.sibling;t!==null;)Nu(t,r,o),t=t.sibling}var $e=null,Lt=!1;function Dn(t,r,o){for(o=o.child;o!==null;)np(t,r,o),o=o.sibling}function np(t,r,o){if($t&&typeof $t.onCommitFiberUnmount=="function")try{$t.onCommitFiberUnmount(Xs,o)}catch{}switch(o.tag){case 5:Ye||Xr(o,r);case 6:var a=$e,c=Lt;$e=null,Dn(t,r,o),$e=a,Lt=c,$e!==null&&(Lt?(t=$e,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):$e.removeChild(o.stateNode));break;case 18:$e!==null&&(Lt?(t=$e,o=o.stateNode,t.nodeType===8?Wa(t.parentNode,o):t.nodeType===1&&Wa(t,o),Fi(t)):Wa($e,o.stateNode));break;case 4:a=$e,c=Lt,$e=o.stateNode.containerInfo,Lt=!0,Dn(t,r,o),$e=a,Lt=c;break;case 0:case 11:case 14:case 15:if(!Ye&&(a=o.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){c=a=a.next;do{var h=c,p=h.destroy;h=h.tag,p!==void 0&&((h&2)!==0||(h&4)!==0)&&Iu(o,r,p),c=c.next}while(c!==a)}Dn(t,r,o);break;case 1:if(!Ye&&(Xr(o,r),a=o.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=o.memoizedProps,a.state=o.memoizedState,a.componentWillUnmount()}catch(_){Ce(o,r,_)}Dn(t,r,o);break;case 21:Dn(t,r,o);break;case 22:o.mode&1?(Ye=(a=Ye)||o.memoizedState!==null,Dn(t,r,o),Ye=a):Dn(t,r,o);break;default:Dn(t,r,o)}}function rp(t){var r=t.updateQueue;if(r!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new Ry),r.forEach(function(a){var c=Uy.bind(null,t,a);o.has(a)||(o.add(a),a.then(c,c))})}}function Mt(t,r){var o=r.deletions;if(o!==null)for(var a=0;a<o.length;a++){var c=o[a];try{var h=t,p=r,_=p;e:for(;_!==null;){switch(_.tag){case 5:$e=_.stateNode,Lt=!1;break e;case 3:$e=_.stateNode.containerInfo,Lt=!0;break e;case 4:$e=_.stateNode.containerInfo,Lt=!0;break e}_=_.return}if($e===null)throw Error(n(160));np(h,p,c),$e=null,Lt=!1;var v=c.alternate;v!==null&&(v.return=null),c.return=null}catch(k){Ce(c,r,k)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)ip(r,t),r=r.sibling}function ip(t,r){var o=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Mt(r,t),qt(t),a&4){try{ss(3,t,t.return),zo(3,t)}catch(z){Ce(t,t.return,z)}try{ss(5,t,t.return)}catch(z){Ce(t,t.return,z)}}break;case 1:Mt(r,t),qt(t),a&512&&o!==null&&Xr(o,o.return);break;case 5:if(Mt(r,t),qt(t),a&512&&o!==null&&Xr(o,o.return),t.flags&32){var c=t.stateNode;try{ki(c,"")}catch(z){Ce(t,t.return,z)}}if(a&4&&(c=t.stateNode,c!=null)){var h=t.memoizedProps,p=o!==null?o.memoizedProps:h,_=t.type,v=t.updateQueue;if(t.updateQueue=null,v!==null)try{_==="input"&&h.type==="radio"&&h.name!=null&&Ad(c,h),ia(_,p);var k=ia(_,h);for(p=0;p<v.length;p+=2){var P=v[p],A=v[p+1];P==="style"?Ud(c,A):P==="dangerouslySetInnerHTML"?bd(c,A):P==="children"?ki(c,A):Ae(c,P,A,k)}switch(_){case"input":Zl(c,h);break;case"textarea":xd(c,h);break;case"select":var N=c._wrapperState.wasMultiple;c._wrapperState.wasMultiple=!!h.multiple;var M=h.value;M!=null?Ar(c,!!h.multiple,M,!1):N!==!!h.multiple&&(h.defaultValue!=null?Ar(c,!!h.multiple,h.defaultValue,!0):Ar(c,!!h.multiple,h.multiple?[]:"",!1))}c[Qi]=h}catch(z){Ce(t,t.return,z)}}break;case 6:if(Mt(r,t),qt(t),a&4){if(t.stateNode===null)throw Error(n(162));c=t.stateNode,h=t.memoizedProps;try{c.nodeValue=h}catch(z){Ce(t,t.return,z)}}break;case 3:if(Mt(r,t),qt(t),a&4&&o!==null&&o.memoizedState.isDehydrated)try{Fi(r.containerInfo)}catch(z){Ce(t,t.return,z)}break;case 4:Mt(r,t),qt(t);break;case 13:Mt(r,t),qt(t),c=t.child,c.flags&8192&&(h=c.memoizedState!==null,c.stateNode.isHidden=h,!h||c.alternate!==null&&c.alternate.memoizedState!==null||(Au=ke())),a&4&&rp(t);break;case 22:if(P=o!==null&&o.memoizedState!==null,t.mode&1?(Ye=(k=Ye)||P,Mt(r,t),Ye=k):Mt(r,t),qt(t),a&8192){if(k=t.memoizedState!==null,(t.stateNode.isHidden=k)&&!P&&(t.mode&1)!==0)for(F=t,P=t.child;P!==null;){for(A=F=P;F!==null;){switch(N=F,M=N.child,N.tag){case 0:case 11:case 14:case 15:ss(4,N,N.return);break;case 1:Xr(N,N.return);var U=N.stateNode;if(typeof U.componentWillUnmount=="function"){a=N,o=N.return;try{r=a,U.props=r.memoizedProps,U.state=r.memoizedState,U.componentWillUnmount()}catch(z){Ce(a,o,z)}}break;case 5:Xr(N,N.return);break;case 22:if(N.memoizedState!==null){lp(A);continue}}M!==null?(M.return=N,F=M):lp(A)}P=P.sibling}e:for(P=null,A=t;;){if(A.tag===5){if(P===null){P=A;try{c=A.stateNode,k?(h=c.style,typeof h.setProperty=="function"?h.setProperty("display","none","important"):h.display="none"):(_=A.stateNode,v=A.memoizedProps.style,p=v!=null&&v.hasOwnProperty("display")?v.display:null,_.style.display=Fd("display",p))}catch(z){Ce(t,t.return,z)}}}else if(A.tag===6){if(P===null)try{A.stateNode.nodeValue=k?"":A.memoizedProps}catch(z){Ce(t,t.return,z)}}else if((A.tag!==22&&A.tag!==23||A.memoizedState===null||A===t)&&A.child!==null){A.child.return=A,A=A.child;continue}if(A===t)break e;for(;A.sibling===null;){if(A.return===null||A.return===t)break e;P===A&&(P=null),A=A.return}P===A&&(P=null),A.sibling.return=A.return,A=A.sibling}}break;case 19:Mt(r,t),qt(t),a&4&&rp(t);break;case 21:break;default:Mt(r,t),qt(t)}}function qt(t){var r=t.flags;if(r&2){try{e:{for(var o=t.return;o!==null;){if(ep(o)){var a=o;break e}o=o.return}throw Error(n(160))}switch(a.tag){case 5:var c=a.stateNode;a.flags&32&&(ki(c,""),a.flags&=-33);var h=tp(t);Nu(t,h,c);break;case 3:case 4:var p=a.stateNode.containerInfo,_=tp(t);ku(t,_,p);break;default:throw Error(n(161))}}catch(v){Ce(t,t.return,v)}t.flags&=-3}r&4096&&(t.flags&=-4097)}function Ay(t,r,o){F=t,sp(t)}function sp(t,r,o){for(var a=(t.mode&1)!==0;F!==null;){var c=F,h=c.child;if(c.tag===22&&a){var p=c.memoizedState!==null||Uo;if(!p){var _=c.alternate,v=_!==null&&_.memoizedState!==null||Ye;_=Uo;var k=Ye;if(Uo=p,(Ye=v)&&!k)for(F=c;F!==null;)p=F,v=p.child,p.tag===22&&p.memoizedState!==null?ap(c):v!==null?(v.return=p,F=v):ap(c);for(;h!==null;)F=h,sp(h),h=h.sibling;F=c,Uo=_,Ye=k}op(t)}else(c.subtreeFlags&8772)!==0&&h!==null?(h.return=c,F=h):op(t)}}function op(t){for(;F!==null;){var r=F;if((r.flags&8772)!==0){var o=r.alternate;try{if((r.flags&8772)!==0)switch(r.tag){case 0:case 11:case 15:Ye||zo(5,r);break;case 1:var a=r.stateNode;if(r.flags&4&&!Ye)if(o===null)a.componentDidMount();else{var c=r.elementType===r.type?o.memoizedProps:xt(r.type,o.memoizedProps);a.componentDidUpdate(c,o.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var h=r.updateQueue;h!==null&&nf(r,h,a);break;case 3:var p=r.updateQueue;if(p!==null){if(o=null,r.child!==null)switch(r.child.tag){case 5:o=r.child.stateNode;break;case 1:o=r.child.stateNode}nf(r,p,o)}break;case 5:var _=r.stateNode;if(o===null&&r.flags&4){o=_;var v=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":v.autoFocus&&o.focus();break;case"img":v.src&&(o.src=v.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var k=r.alternate;if(k!==null){var P=k.memoizedState;if(P!==null){var A=P.dehydrated;A!==null&&Fi(A)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}Ye||r.flags&512&&Tu(r)}catch(N){Ce(r,r.return,N)}}if(r===t){F=null;break}if(o=r.sibling,o!==null){o.return=r.return,F=o;break}F=r.return}}function lp(t){for(;F!==null;){var r=F;if(r===t){F=null;break}var o=r.sibling;if(o!==null){o.return=r.return,F=o;break}F=r.return}}function ap(t){for(;F!==null;){var r=F;try{switch(r.tag){case 0:case 11:case 15:var o=r.return;try{zo(4,r)}catch(v){Ce(r,o,v)}break;case 1:var a=r.stateNode;if(typeof a.componentDidMount=="function"){var c=r.return;try{a.componentDidMount()}catch(v){Ce(r,c,v)}}var h=r.return;try{Tu(r)}catch(v){Ce(r,h,v)}break;case 5:var p=r.return;try{Tu(r)}catch(v){Ce(r,p,v)}}}catch(v){Ce(r,r.return,v)}if(r===t){F=null;break}var _=r.sibling;if(_!==null){_.return=r.return,F=_;break}F=r.return}}var Oy=Math.ceil,Wo=Te.ReactCurrentDispatcher,Ru=Te.ReactCurrentOwner,Ct=Te.ReactCurrentBatchConfig,ne=0,Fe=null,Re=null,Ge=0,_t=0,Jr=Nn(0),xe=0,os=null,dr=0,Vo=0,Pu=0,ls=null,ut=null,Au=0,Zr=1/0,an=null,Bo=!1,Ou=null,xn=null,Ho=!1,Ln=null,jo=0,as=0,Du=null,$o=-1,Go=0;function Je(){return(ne&6)!==0?ke():$o!==-1?$o:$o=ke()}function Mn(t){return(t.mode&1)===0?1:(ne&2)!==0&&Ge!==0?Ge&-Ge:py.transition!==null?(Go===0&&(Go=Zd()),Go):(t=le,t!==0||(t=window.event,t=t===void 0?16:ah(t.type)),t)}function bt(t,r,o,a){if(50<as)throw as=0,Du=null,Error(n(185));Di(t,o,a),((ne&2)===0||t!==Fe)&&(t===Fe&&((ne&2)===0&&(Vo|=o),xe===4&&bn(t,Ge)),ct(t,a),o===1&&ne===0&&(r.mode&1)===0&&(Zr=ke()+500,wo&&Pn()))}function ct(t,r){var o=t.callbackNode;pv(t,r);var a=eo(t,t===Fe?Ge:0);if(a===0)o!==null&&Yd(o),t.callbackNode=null,t.callbackPriority=0;else if(r=a&-a,t.callbackPriority!==r){if(o!=null&&Yd(o),r===1)t.tag===0?fy(cp.bind(null,t)):Kh(cp.bind(null,t)),uy(function(){(ne&6)===0&&Pn()}),o=null;else{switch(eh(a)){case 1:o=da;break;case 4:o=Xd;break;case 16:o=Ys;break;case 536870912:o=Jd;break;default:o=Ys}o=vp(o,up.bind(null,t))}t.callbackPriority=r,t.callbackNode=o}}function up(t,r){if($o=-1,Go=0,(ne&6)!==0)throw Error(n(327));var o=t.callbackNode;if(ei()&&t.callbackNode!==o)return null;var a=eo(t,t===Fe?Ge:0);if(a===0)return null;if((a&30)!==0||(a&t.expiredLanes)!==0||r)r=Ko(t,a);else{r=a;var c=ne;ne|=2;var h=hp();(Fe!==t||Ge!==r)&&(an=null,Zr=ke()+500,fr(t,r));do try{Ly();break}catch(_){dp(t,_)}while(!0);Ya(),Wo.current=h,ne=c,Re!==null?r=0:(Fe=null,Ge=0,r=xe)}if(r!==0){if(r===2&&(c=ha(t),c!==0&&(a=c,r=xu(t,c))),r===1)throw o=os,fr(t,0),bn(t,a),ct(t,ke()),o;if(r===6)bn(t,a);else{if(c=t.current.alternate,(a&30)===0&&!Dy(c)&&(r=Ko(t,a),r===2&&(h=ha(t),h!==0&&(a=h,r=xu(t,h))),r===1))throw o=os,fr(t,0),bn(t,a),ct(t,ke()),o;switch(t.finishedWork=c,t.finishedLanes=a,r){case 0:case 1:throw Error(n(345));case 2:pr(t,ut,an);break;case 3:if(bn(t,a),(a&130023424)===a&&(r=Au+500-ke(),10<r)){if(eo(t,0)!==0)break;if(c=t.suspendedLanes,(c&a)!==a){Je(),t.pingedLanes|=t.suspendedLanes&c;break}t.timeoutHandle=za(pr.bind(null,t,ut,an),r);break}pr(t,ut,an);break;case 4:if(bn(t,a),(a&4194240)===a)break;for(r=t.eventTimes,c=-1;0<a;){var p=31-At(a);h=1<<p,p=r[p],p>c&&(c=p),a&=~h}if(a=c,a=ke()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*Oy(a/1960))-a,10<a){t.timeoutHandle=za(pr.bind(null,t,ut,an),a);break}pr(t,ut,an);break;case 5:pr(t,ut,an);break;default:throw Error(n(329))}}}return ct(t,ke()),t.callbackNode===o?up.bind(null,t):null}function xu(t,r){var o=ls;return t.current.memoizedState.isDehydrated&&(fr(t,r).flags|=256),t=Ko(t,r),t!==2&&(r=ut,ut=o,r!==null&&Lu(r)),t}function Lu(t){ut===null?ut=t:ut.push.apply(ut,t)}function Dy(t){for(var r=t;;){if(r.flags&16384){var o=r.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var a=0;a<o.length;a++){var c=o[a],h=c.getSnapshot;c=c.value;try{if(!Ot(h(),c))return!1}catch{return!1}}}if(o=r.child,r.subtreeFlags&16384&&o!==null)o.return=r,r=o;else{if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function bn(t,r){for(r&=~Pu,r&=~Vo,t.suspendedLanes|=r,t.pingedLanes&=~r,t=t.expirationTimes;0<r;){var o=31-At(r),a=1<<o;t[o]=-1,r&=~a}}function cp(t){if((ne&6)!==0)throw Error(n(327));ei();var r=eo(t,0);if((r&1)===0)return ct(t,ke()),null;var o=Ko(t,r);if(t.tag!==0&&o===2){var a=ha(t);a!==0&&(r=a,o=xu(t,a))}if(o===1)throw o=os,fr(t,0),bn(t,r),ct(t,ke()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=r,pr(t,ut,an),ct(t,ke()),null}function Mu(t,r){var o=ne;ne|=1;try{return t(r)}finally{ne=o,ne===0&&(Zr=ke()+500,wo&&Pn())}}function hr(t){Ln!==null&&Ln.tag===0&&(ne&6)===0&&ei();var r=ne;ne|=1;var o=Ct.transition,a=le;try{if(Ct.transition=null,le=1,t)return t()}finally{le=a,Ct.transition=o,ne=r,(ne&6)===0&&Pn()}}function bu(){_t=Jr.current,ge(Jr)}function fr(t,r){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,ay(o)),Re!==null)for(o=Re.return;o!==null;){var a=o;switch($a(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&vo();break;case 3:qr(),ge(ot),ge(Ke),ou();break;case 5:iu(a);break;case 4:qr();break;case 13:ge(ve);break;case 19:ge(ve);break;case 10:Xa(a.type._context);break;case 22:case 23:bu()}o=o.return}if(Fe=t,Re=t=Fn(t.current,null),Ge=_t=r,xe=0,os=null,Pu=Vo=dr=0,ut=ls=null,ar!==null){for(r=0;r<ar.length;r++)if(o=ar[r],a=o.interleaved,a!==null){o.interleaved=null;var c=a.next,h=o.pending;if(h!==null){var p=h.next;h.next=c,a.next=p}o.pending=a}ar=null}return t}function dp(t,r){do{var o=Re;try{if(Ya(),Oo.current=Mo,Do){for(var a=ye.memoizedState;a!==null;){var c=a.queue;c!==null&&(c.pending=null),a=a.next}Do=!1}if(cr=0,be=De=ye=null,es=!1,ts=0,Ru.current=null,o===null||o.return===null){xe=1,os=r,Re=null;break}e:{var h=t,p=o.return,_=o,v=r;if(r=Ge,_.flags|=32768,v!==null&&typeof v=="object"&&typeof v.then=="function"){var k=v,P=_,A=P.tag;if((P.mode&1)===0&&(A===0||A===11||A===15)){var N=P.alternate;N?(P.updateQueue=N.updateQueue,P.memoizedState=N.memoizedState,P.lanes=N.lanes):(P.updateQueue=null,P.memoizedState=null)}var M=bf(p);if(M!==null){M.flags&=-257,Ff(M,p,_,h,r),M.mode&1&&Mf(h,k,r),r=M,v=k;var U=r.updateQueue;if(U===null){var z=new Set;z.add(v),r.updateQueue=z}else U.add(v);break e}else{if((r&1)===0){Mf(h,k,r),Fu();break e}v=Error(n(426))}}else if(_e&&_.mode&1){var Ne=bf(p);if(Ne!==null){(Ne.flags&65536)===0&&(Ne.flags|=256),Ff(Ne,p,_,h,r),Qa(Yr(v,_));break e}}h=v=Yr(v,_),xe!==4&&(xe=2),ls===null?ls=[h]:ls.push(h),h=p;do{switch(h.tag){case 3:h.flags|=65536,r&=-r,h.lanes|=r;var C=xf(h,v,r);tf(h,C);break e;case 1:_=v;var w=h.type,I=h.stateNode;if((h.flags&128)===0&&(typeof w.getDerivedStateFromError=="function"||I!==null&&typeof I.componentDidCatch=="function"&&(xn===null||!xn.has(I)))){h.flags|=65536,r&=-r,h.lanes|=r;var O=Lf(h,_,r);tf(h,O);break e}}h=h.return}while(h!==null)}pp(o)}catch(W){r=W,Re===o&&o!==null&&(Re=o=o.return);continue}break}while(!0)}function hp(){var t=Wo.current;return Wo.current=Mo,t===null?Mo:t}function Fu(){(xe===0||xe===3||xe===2)&&(xe=4),Fe===null||(dr&268435455)===0&&(Vo&268435455)===0||bn(Fe,Ge)}function Ko(t,r){var o=ne;ne|=2;var a=hp();(Fe!==t||Ge!==r)&&(an=null,fr(t,r));do try{xy();break}catch(c){dp(t,c)}while(!0);if(Ya(),ne=o,Wo.current=a,Re!==null)throw Error(n(261));return Fe=null,Ge=0,xe}function xy(){for(;Re!==null;)fp(Re)}function Ly(){for(;Re!==null&&!sv();)fp(Re)}function fp(t){var r=_p(t.alternate,t,_t);t.memoizedProps=t.pendingProps,r===null?pp(t):Re=r,Ru.current=null}function pp(t){var r=t;do{var o=r.alternate;if(t=r.return,(r.flags&32768)===0){if(o=ky(o,r,_t),o!==null){Re=o;return}}else{if(o=Ny(o,r),o!==null){o.flags&=32767,Re=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{xe=6,Re=null;return}}if(r=r.sibling,r!==null){Re=r;return}Re=r=t}while(r!==null);xe===0&&(xe=5)}function pr(t,r,o){var a=le,c=Ct.transition;try{Ct.transition=null,le=1,My(t,r,o,a)}finally{Ct.transition=c,le=a}return null}function My(t,r,o,a){do ei();while(Ln!==null);if((ne&6)!==0)throw Error(n(327));o=t.finishedWork;var c=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var h=o.lanes|o.childLanes;if(mv(t,h),t===Fe&&(Re=Fe=null,Ge=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||Ho||(Ho=!0,vp(Ys,function(){return ei(),null})),h=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||h){h=Ct.transition,Ct.transition=null;var p=le;le=1;var _=ne;ne|=4,Ru.current=null,Py(t,o),ip(o,t),ty(Fa),ro=!!ba,Fa=ba=null,t.current=o,Ay(o),ov(),ne=_,le=p,Ct.transition=h}else t.current=o;if(Ho&&(Ho=!1,Ln=t,jo=c),h=t.pendingLanes,h===0&&(xn=null),uv(o.stateNode),ct(t,ke()),r!==null)for(a=t.onRecoverableError,o=0;o<r.length;o++)c=r[o],a(c.value,{componentStack:c.stack,digest:c.digest});if(Bo)throw Bo=!1,t=Ou,Ou=null,t;return(jo&1)!==0&&t.tag!==0&&ei(),h=t.pendingLanes,(h&1)!==0?t===Du?as++:(as=0,Du=t):as=0,Pn(),null}function ei(){if(Ln!==null){var t=eh(jo),r=Ct.transition,o=le;try{if(Ct.transition=null,le=16>t?16:t,Ln===null)var a=!1;else{if(t=Ln,Ln=null,jo=0,(ne&6)!==0)throw Error(n(331));var c=ne;for(ne|=4,F=t.current;F!==null;){var h=F,p=h.child;if((F.flags&16)!==0){var _=h.deletions;if(_!==null){for(var v=0;v<_.length;v++){var k=_[v];for(F=k;F!==null;){var P=F;switch(P.tag){case 0:case 11:case 15:ss(8,P,h)}var A=P.child;if(A!==null)A.return=P,F=A;else for(;F!==null;){P=F;var N=P.sibling,M=P.return;if(Zf(P),P===k){F=null;break}if(N!==null){N.return=M,F=N;break}F=M}}}var U=h.alternate;if(U!==null){var z=U.child;if(z!==null){U.child=null;do{var Ne=z.sibling;z.sibling=null,z=Ne}while(z!==null)}}F=h}}if((h.subtreeFlags&2064)!==0&&p!==null)p.return=h,F=p;else e:for(;F!==null;){if(h=F,(h.flags&2048)!==0)switch(h.tag){case 0:case 11:case 15:ss(9,h,h.return)}var C=h.sibling;if(C!==null){C.return=h.return,F=C;break e}F=h.return}}var w=t.current;for(F=w;F!==null;){p=F;var I=p.child;if((p.subtreeFlags&2064)!==0&&I!==null)I.return=p,F=I;else e:for(p=w;F!==null;){if(_=F,(_.flags&2048)!==0)try{switch(_.tag){case 0:case 11:case 15:zo(9,_)}}catch(W){Ce(_,_.return,W)}if(_===p){F=null;break e}var O=_.sibling;if(O!==null){O.return=_.return,F=O;break e}F=_.return}}if(ne=c,Pn(),$t&&typeof $t.onPostCommitFiberRoot=="function")try{$t.onPostCommitFiberRoot(Xs,t)}catch{}a=!0}return a}finally{le=o,Ct.transition=r}}return!1}function mp(t,r,o){r=Yr(o,r),r=xf(t,r,1),t=On(t,r,1),r=Je(),t!==null&&(Di(t,1,r),ct(t,r))}function Ce(t,r,o){if(t.tag===3)mp(t,t,o);else for(;r!==null;){if(r.tag===3){mp(r,t,o);break}else if(r.tag===1){var a=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(xn===null||!xn.has(a))){t=Yr(o,t),t=Lf(r,t,1),r=On(r,t,1),t=Je(),r!==null&&(Di(r,1,t),ct(r,t));break}}r=r.return}}function by(t,r,o){var a=t.pingCache;a!==null&&a.delete(r),r=Je(),t.pingedLanes|=t.suspendedLanes&o,Fe===t&&(Ge&o)===o&&(xe===4||xe===3&&(Ge&130023424)===Ge&&500>ke()-Au?fr(t,0):Pu|=o),ct(t,r)}function gp(t,r){r===0&&((t.mode&1)===0?r=1:(r=Zs,Zs<<=1,(Zs&130023424)===0&&(Zs=4194304)));var o=Je();t=sn(t,r),t!==null&&(Di(t,r,o),ct(t,o))}function Fy(t){var r=t.memoizedState,o=0;r!==null&&(o=r.retryLane),gp(t,o)}function Uy(t,r){var o=0;switch(t.tag){case 13:var a=t.stateNode,c=t.memoizedState;c!==null&&(o=c.retryLane);break;case 19:a=t.stateNode;break;default:throw Error(n(314))}a!==null&&a.delete(r),gp(t,o)}var _p;_p=function(t,r,o){if(t!==null)if(t.memoizedProps!==r.pendingProps||ot.current)at=!0;else{if((t.lanes&o)===0&&(r.flags&128)===0)return at=!1,Ty(t,r,o);at=(t.flags&131072)!==0}else at=!1,_e&&(r.flags&1048576)!==0&&Qh(r,So,r.index);switch(r.lanes=0,r.tag){case 2:var a=r.type;Fo(t,r),t=r.pendingProps;var c=Br(r,Ke.current);Kr(r,o),c=uu(null,r,a,t,c,o);var h=cu();return r.flags|=1,typeof c=="object"&&c!==null&&typeof c.render=="function"&&c.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,lt(a)?(h=!0,yo(r)):h=!1,r.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,eu(r),c.updater=Ro,r.stateNode=c,c._reactInternals=r,nu(r,a,t,o),r=vu(null,r,a,!0,h,o)):(r.tag=0,_e&&h&&ja(r),Xe(null,r,c,o),r=r.child),r;case 16:a=r.elementType;e:{switch(Fo(t,r),t=r.pendingProps,c=a._init,a=c(a._payload),r.type=a,c=r.tag=Wy(a),t=xt(a,t),c){case 0:r=_u(null,r,a,t,o);break e;case 1:r=Hf(null,r,a,t,o);break e;case 11:r=Uf(null,r,a,t,o);break e;case 14:r=zf(null,r,a,xt(a.type,t),o);break e}throw Error(n(306,a,""))}return r;case 0:return a=r.type,c=r.pendingProps,c=r.elementType===a?c:xt(a,c),_u(t,r,a,c,o);case 1:return a=r.type,c=r.pendingProps,c=r.elementType===a?c:xt(a,c),Hf(t,r,a,c,o);case 3:e:{if(jf(r),t===null)throw Error(n(387));a=r.pendingProps,h=r.memoizedState,c=h.element,ef(t,r),No(r,a,null,o);var p=r.memoizedState;if(a=p.element,h.isDehydrated)if(h={element:a,isDehydrated:!1,cache:p.cache,pendingSuspenseBoundaries:p.pendingSuspenseBoundaries,transitions:p.transitions},r.updateQueue.baseState=h,r.memoizedState=h,r.flags&256){c=Yr(Error(n(423)),r),r=$f(t,r,a,o,c);break e}else if(a!==c){c=Yr(Error(n(424)),r),r=$f(t,r,a,o,c);break e}else for(gt=kn(r.stateNode.containerInfo.firstChild),mt=r,_e=!0,Dt=null,o=cf(r,null,a,o),r.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if($r(),a===c){r=ln(t,r,o);break e}Xe(t,r,a,o)}r=r.child}return r;case 5:return df(r),t===null&&Ka(r),a=r.type,c=r.pendingProps,h=t!==null?t.memoizedProps:null,p=c.children,Ua(a,c)?p=null:h!==null&&Ua(a,h)&&(r.flags|=32),Bf(t,r),Xe(t,r,p,o),r.child;case 6:return t===null&&Ka(r),null;case 13:return Gf(t,r,o);case 4:return ru(r,r.stateNode.containerInfo),a=r.pendingProps,t===null?r.child=Qr(r,null,a,o):Xe(t,r,a,o),r.child;case 11:return a=r.type,c=r.pendingProps,c=r.elementType===a?c:xt(a,c),Uf(t,r,a,c,o);case 7:return Xe(t,r,r.pendingProps,o),r.child;case 8:return Xe(t,r,r.pendingProps.children,o),r.child;case 12:return Xe(t,r,r.pendingProps.children,o),r.child;case 10:e:{if(a=r.type._context,c=r.pendingProps,h=r.memoizedProps,p=c.value,fe(Io,a._currentValue),a._currentValue=p,h!==null)if(Ot(h.value,p)){if(h.children===c.children&&!ot.current){r=ln(t,r,o);break e}}else for(h=r.child,h!==null&&(h.return=r);h!==null;){var _=h.dependencies;if(_!==null){p=h.child;for(var v=_.firstContext;v!==null;){if(v.context===a){if(h.tag===1){v=on(-1,o&-o),v.tag=2;var k=h.updateQueue;if(k!==null){k=k.shared;var P=k.pending;P===null?v.next=v:(v.next=P.next,P.next=v),k.pending=v}}h.lanes|=o,v=h.alternate,v!==null&&(v.lanes|=o),Ja(h.return,o,r),_.lanes|=o;break}v=v.next}}else if(h.tag===10)p=h.type===r.type?null:h.child;else if(h.tag===18){if(p=h.return,p===null)throw Error(n(341));p.lanes|=o,_=p.alternate,_!==null&&(_.lanes|=o),Ja(p,o,r),p=h.sibling}else p=h.child;if(p!==null)p.return=h;else for(p=h;p!==null;){if(p===r){p=null;break}if(h=p.sibling,h!==null){h.return=p.return,p=h;break}p=p.return}h=p}Xe(t,r,c.children,o),r=r.child}return r;case 9:return c=r.type,a=r.pendingProps.children,Kr(r,o),c=Et(c),a=a(c),r.flags|=1,Xe(t,r,a,o),r.child;case 14:return a=r.type,c=xt(a,r.pendingProps),c=xt(a.type,c),zf(t,r,a,c,o);case 15:return Wf(t,r,r.type,r.pendingProps,o);case 17:return a=r.type,c=r.pendingProps,c=r.elementType===a?c:xt(a,c),Fo(t,r),r.tag=1,lt(a)?(t=!0,yo(r)):t=!1,Kr(r,o),of(r,a,c),nu(r,a,c,o),vu(null,r,a,!0,t,o);case 19:return Qf(t,r,o);case 22:return Vf(t,r,o)}throw Error(n(156,r.tag))};function vp(t,r){return qd(t,r)}function zy(t,r,o,a){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function It(t,r,o,a){return new zy(t,r,o,a)}function Uu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Wy(t){if(typeof t=="function")return Uu(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Ht)return 11;if(t===jt)return 14}return 2}function Fn(t,r){var o=t.alternate;return o===null?(o=It(t.tag,r,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=r,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,r=t.dependencies,o.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Qo(t,r,o,a,c,h){var p=2;if(a=t,typeof t=="function")Uu(t)&&(p=1);else if(typeof t=="string")p=5;else e:switch(t){case je:return mr(o.children,c,h,r);case rt:p=8,c|=8;break;case vt:return t=It(12,o,r,c|2),t.elementType=vt,t.lanes=h,t;case ft:return t=It(13,o,r,c),t.elementType=ft,t.lanes=h,t;case Pt:return t=It(19,o,r,c),t.elementType=Pt,t.lanes=h,t;case Se:return qo(o,c,h,r);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Rt:p=10;break e;case nr:p=9;break e;case Ht:p=11;break e;case jt:p=14;break e;case it:p=16,a=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return r=It(p,o,r,c),r.elementType=t,r.type=a,r.lanes=h,r}function mr(t,r,o,a){return t=It(7,t,a,r),t.lanes=o,t}function qo(t,r,o,a){return t=It(22,t,a,r),t.elementType=Se,t.lanes=o,t.stateNode={isHidden:!1},t}function zu(t,r,o){return t=It(6,t,null,r),t.lanes=o,t}function Wu(t,r,o){return r=It(4,t.children!==null?t.children:[],t.key,r),r.lanes=o,r.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},r}function Vy(t,r,o,a,c){this.tag=r,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=fa(0),this.expirationTimes=fa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fa(0),this.identifierPrefix=a,this.onRecoverableError=c,this.mutableSourceEagerHydrationData=null}function Vu(t,r,o,a,c,h,p,_,v){return t=new Vy(t,r,o,_,v),r===1?(r=1,h===!0&&(r|=8)):r=0,h=It(3,null,null,r),t.current=h,h.stateNode=t,h.memoizedState={element:a,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},eu(h),t}function By(t,r,o){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Oe,key:a==null?null:""+a,children:t,containerInfo:r,implementation:o}}function yp(t){if(!t)return Rn;t=t._reactInternals;e:{if(rr(t)!==t||t.tag!==1)throw Error(n(170));var r=t;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(lt(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(lt(o))return $h(t,o,r)}return r}function wp(t,r,o,a,c,h,p,_,v){return t=Vu(o,a,!0,t,c,h,p,_,v),t.context=yp(null),o=t.current,a=Je(),c=Mn(o),h=on(a,c),h.callback=r??null,On(o,h,c),t.current.lanes=c,Di(t,c,a),ct(t,a),t}function Yo(t,r,o,a){var c=r.current,h=Je(),p=Mn(c);return o=yp(o),r.context===null?r.context=o:r.pendingContext=o,r=on(h,p),r.payload={element:t},a=a===void 0?null:a,a!==null&&(r.callback=a),t=On(c,r,p),t!==null&&(bt(t,c,p,h),ko(t,c,p)),p}function Xo(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Ep(t,r){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<r?o:r}}function Bu(t,r){Ep(t,r),(t=t.alternate)&&Ep(t,r)}function Hy(){return null}var Sp=typeof reportError=="function"?reportError:function(t){console.error(t)};function Hu(t){this._internalRoot=t}Jo.prototype.render=Hu.prototype.render=function(t){var r=this._internalRoot;if(r===null)throw Error(n(409));Yo(t,r,null,null)},Jo.prototype.unmount=Hu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var r=t.containerInfo;hr(function(){Yo(null,t,null,null)}),r[en]=null}};function Jo(t){this._internalRoot=t}Jo.prototype.unstable_scheduleHydration=function(t){if(t){var r=rh();t={blockedOn:null,target:t,priority:r};for(var o=0;o<Cn.length&&r!==0&&r<Cn[o].priority;o++);Cn.splice(o,0,t),o===0&&oh(t)}};function ju(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Zo(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Cp(){}function jy(t,r,o,a,c){if(c){if(typeof a=="function"){var h=a;a=function(){var k=Xo(p);h.call(k)}}var p=wp(r,a,t,0,null,!1,!1,"",Cp);return t._reactRootContainer=p,t[en]=p.current,Gi(t.nodeType===8?t.parentNode:t),hr(),p}for(;c=t.lastChild;)t.removeChild(c);if(typeof a=="function"){var _=a;a=function(){var k=Xo(v);_.call(k)}}var v=Vu(t,0,!1,null,null,!1,!1,"",Cp);return t._reactRootContainer=v,t[en]=v.current,Gi(t.nodeType===8?t.parentNode:t),hr(function(){Yo(r,v,o,a)}),v}function el(t,r,o,a,c){var h=o._reactRootContainer;if(h){var p=h;if(typeof c=="function"){var _=c;c=function(){var v=Xo(p);_.call(v)}}Yo(r,p,t,c)}else p=jy(o,r,t,c,a);return Xo(p)}th=function(t){switch(t.tag){case 3:var r=t.stateNode;if(r.current.memoizedState.isDehydrated){var o=Oi(r.pendingLanes);o!==0&&(pa(r,o|1),ct(r,ke()),(ne&6)===0&&(Zr=ke()+500,Pn()))}break;case 13:hr(function(){var a=sn(t,1);if(a!==null){var c=Je();bt(a,t,1,c)}}),Bu(t,1)}},ma=function(t){if(t.tag===13){var r=sn(t,134217728);if(r!==null){var o=Je();bt(r,t,134217728,o)}Bu(t,134217728)}},nh=function(t){if(t.tag===13){var r=Mn(t),o=sn(t,r);if(o!==null){var a=Je();bt(o,t,r,a)}Bu(t,r)}},rh=function(){return le},ih=function(t,r){var o=le;try{return le=t,r()}finally{le=o}},la=function(t,r,o){switch(r){case"input":if(Zl(t,o),r=o.name,o.type==="radio"&&r!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<o.length;r++){var a=o[r];if(a!==t&&a.form===t.form){var c=_o(a);if(!c)throw Error(n(90));Rd(a),Zl(a,c)}}}break;case"textarea":xd(t,o);break;case"select":r=o.value,r!=null&&Ar(t,!!o.multiple,r,!1)}},Bd=Mu,Hd=hr;var $y={usingClientEntryPoint:!1,Events:[qi,Wr,_o,Wd,Vd,Mu]},us={findFiberByHostInstance:ir,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},Gy={bundleType:us.bundleType,version:us.version,rendererPackageName:us.rendererPackageName,rendererConfig:us.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Te.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Kd(t),t===null?null:t.stateNode},findFiberByHostInstance:us.findFiberByHostInstance||Hy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var tl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!tl.isDisabled&&tl.supportsFiber)try{Xs=tl.inject(Gy),$t=tl}catch{}}return dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$y,dt.createPortal=function(t,r){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ju(r))throw Error(n(200));return By(t,r,null,o)},dt.createRoot=function(t,r){if(!ju(t))throw Error(n(299));var o=!1,a="",c=Sp;return r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(a=r.identifierPrefix),r.onRecoverableError!==void 0&&(c=r.onRecoverableError)),r=Vu(t,1,!1,null,null,o,!1,a,c),t[en]=r.current,Gi(t.nodeType===8?t.parentNode:t),new Hu(r)},dt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var r=t._reactInternals;if(r===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=Kd(r),t=t===null?null:t.stateNode,t},dt.flushSync=function(t){return hr(t)},dt.hydrate=function(t,r,o){if(!Zo(r))throw Error(n(200));return el(null,t,r,!0,o)},dt.hydrateRoot=function(t,r,o){if(!ju(t))throw Error(n(405));var a=o!=null&&o.hydratedSources||null,c=!1,h="",p=Sp;if(o!=null&&(o.unstable_strictMode===!0&&(c=!0),o.identifierPrefix!==void 0&&(h=o.identifierPrefix),o.onRecoverableError!==void 0&&(p=o.onRecoverableError)),r=wp(r,null,t,1,o??null,c,!1,h,p),t[en]=r.current,Gi(t),a)for(t=0;t<a.length;t++)o=a[t],c=o._getVersion,c=c(o._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[o,c]:r.mutableSourceEagerHydrationData.push(o,c);return new Jo(r)},dt.render=function(t,r,o){if(!Zo(r))throw Error(n(200));return el(null,t,r,!1,o)},dt.unmountComponentAtNode=function(t){if(!Zo(t))throw Error(n(40));return t._reactRootContainer?(hr(function(){el(null,null,t,!1,function(){t._reactRootContainer=null,t[en]=null})}),!0):!1},dt.unstable_batchedUpdates=Mu,dt.unstable_renderSubtreeIntoContainer=function(t,r,o,a){if(!Zo(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return el(t,r,o,!1,a)},dt.version="18.2.0-next-9e3b772b8-20220608",dt}var Pp;function uk(){if(Pp)return Gu.exports;Pp=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(e){console.error(e)}}return i(),Gu.exports=Jy(),Gu.exports}var Ap={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wm={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D=function(i,e){if(!i)throw _i(e)},_i=function(i){return new Error("Firebase Database ("+Wm.SDK_VERSION+") INTERNAL ASSERT FAILED: "+i)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm=function(i){const e=[];let n=0;for(let s=0;s<i.length;s++){let l=i.charCodeAt(s);l<128?e[n++]=l:l<2048?(e[n++]=l>>6|192,e[n++]=l&63|128):(l&64512)===55296&&s+1<i.length&&(i.charCodeAt(s+1)&64512)===56320?(l=65536+((l&1023)<<10)+(i.charCodeAt(++s)&1023),e[n++]=l>>18|240,e[n++]=l>>12&63|128,e[n++]=l>>6&63|128,e[n++]=l&63|128):(e[n++]=l>>12|224,e[n++]=l>>6&63|128,e[n++]=l&63|128)}return e},Zy=function(i){const e=[];let n=0,s=0;for(;n<i.length;){const l=i[n++];if(l<128)e[s++]=String.fromCharCode(l);else if(l>191&&l<224){const u=i[n++];e[s++]=String.fromCharCode((l&31)<<6|u&63)}else if(l>239&&l<365){const u=i[n++],d=i[n++],f=i[n++],m=((l&7)<<18|(u&63)<<12|(d&63)<<6|f&63)-65536;e[s++]=String.fromCharCode(55296+(m>>10)),e[s++]=String.fromCharCode(56320+(m&1023))}else{const u=i[n++],d=i[n++];e[s++]=String.fromCharCode((l&15)<<12|(u&63)<<6|d&63)}}return e.join("")},Oc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let l=0;l<i.length;l+=3){const u=i[l],d=l+1<i.length,f=d?i[l+1]:0,m=l+2<i.length,g=m?i[l+2]:0,S=u>>2,E=(u&3)<<4|f>>4;let T=(f&15)<<2|g>>6,x=g&63;m||(x=64,d||(T=64)),s.push(n[S],n[E],n[T],n[x])}return s.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(Vm(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):Zy(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let l=0;l<i.length;){const u=n[i.charAt(l++)],f=l<i.length?n[i.charAt(l)]:0;++l;const g=l<i.length?n[i.charAt(l)]:64;++l;const E=l<i.length?n[i.charAt(l)]:64;if(++l,u==null||f==null||g==null||E==null)throw new ew;const T=u<<2|f>>4;if(s.push(T),g!==64){const x=f<<4&240|g>>2;if(s.push(x),E!==64){const b=g<<6&192|E;s.push(b)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class ew extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Bm=function(i){const e=Vm(i);return Oc.encodeByteArray(e,!0)},cl=function(i){return Bm(i).replace(/\./g,"")},dl=function(i){try{return Oc.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tw(i){return Hm(void 0,i)}function Hm(i,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:i===void 0&&(i={});break;case Array:i=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!nw(n)||(i[n]=Hm(i[n],e[n]));return i}function nw(i){return i!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iw=()=>rw().__FIREBASE_DEFAULTS__,sw=()=>{if(typeof process>"u"||typeof Ap>"u")return;const i=Ap.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},ow=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&dl(i[1]);return e&&JSON.parse(e)},Dc=()=>{try{return iw()||sw()||ow()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},jm=i=>{var e,n;return(n=(e=Dc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[i]},lw=i=>{const e=jm(i);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},$m=()=>{var i;return(i=Dc())===null||i===void 0?void 0:i.config},Gm=i=>{var e;return(e=Dc())===null||e===void 0?void 0:e[`_${i}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aw(i,e){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",l=i.iat||0,u=i.sub||i.user_id;if(!u)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const d=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:l,exp:l+3600,auth_time:l,sub:u,user_id:u,firebase:{sign_in_provider:"custom",identities:{}}},i);return[cl(JSON.stringify(n)),cl(JSON.stringify(d)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(tt())}function uw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function cw(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function Km(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dw(){const i=tt();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function hw(){return Wm.NODE_ADMIN===!0}function fw(){try{return typeof indexedDB=="object"}catch{return!1}}function pw(){return new Promise((i,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",l=self.indexedDB.open(s);l.onsuccess=()=>{l.result.close(),n||self.indexedDB.deleteDatabase(s),i(!0)},l.onupgradeneeded=()=>{n=!1},l.onerror=()=>{var u;e(((u=l.error)===null||u===void 0?void 0:u.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mw="FirebaseError";class tr extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=mw,Object.setPrototypeOf(this,tr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xs.prototype.create)}}class xs{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},l=`${this.service}/${e}`,u=this.errors[e],d=u?gw(u,s):"Error",f=`${this.serviceName}: ${d} (${l}).`;return new tr(l,f,s)}}function gw(i,e){return i.replace(_w,(n,s)=>{const l=e[s];return l!=null?String(l):`<${s}?>`})}const _w=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(i){return JSON.parse(i)}function Le(i){return JSON.stringify(i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qm=function(i){let e={},n={},s={},l="";try{const u=i.split(".");e=Ss(dl(u[0])||""),n=Ss(dl(u[1])||""),l=u[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:l}},vw=function(i){const e=Qm(i),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},yw=function(i){const e=Qm(i).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(i,e){return Object.prototype.hasOwnProperty.call(i,e)}function ai(i,e){if(Object.prototype.hasOwnProperty.call(i,e))return i[e]}function hl(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function fl(i,e,n){const s={};for(const l in i)Object.prototype.hasOwnProperty.call(i,l)&&(s[l]=e.call(n,i[l],l,i));return s}function pl(i,e){if(i===e)return!0;const n=Object.keys(i),s=Object.keys(e);for(const l of n){if(!s.includes(l))return!1;const u=i[l],d=e[l];if(Op(u)&&Op(d)){if(!pl(u,d))return!1}else if(u!==d)return!1}for(const l of s)if(!n.includes(l))return!1;return!0}function Op(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vi(i){const e=[];for(const[n,s]of Object.entries(i))Array.isArray(s)?s.forEach(l=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(l))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function ps(i){const e={};return i.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[l,u]=s.split("=");e[decodeURIComponent(l)]=decodeURIComponent(u)}}),e}function ms(i){const e=i.indexOf("?");if(!e)return"";const n=i.indexOf("#",e);return i.substring(e,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let E=0;E<16;E++)s[E]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let E=0;E<16;E++)s[E]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let E=16;E<80;E++){const T=s[E-3]^s[E-8]^s[E-14]^s[E-16];s[E]=(T<<1|T>>>31)&4294967295}let l=this.chain_[0],u=this.chain_[1],d=this.chain_[2],f=this.chain_[3],m=this.chain_[4],g,S;for(let E=0;E<80;E++){E<40?E<20?(g=f^u&(d^f),S=1518500249):(g=u^d^f,S=1859775393):E<60?(g=u&d|f&(u|d),S=2400959708):(g=u^d^f,S=3395469782);const T=(l<<5|l>>>27)+g+m+S+s[E]&4294967295;m=f,f=d,d=(u<<30|u>>>2)&4294967295,u=l,l=T}this.chain_[0]=this.chain_[0]+l&4294967295,this.chain_[1]=this.chain_[1]+u&4294967295,this.chain_[2]=this.chain_[2]+d&4294967295,this.chain_[3]=this.chain_[3]+f&4294967295,this.chain_[4]=this.chain_[4]+m&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let l=0;const u=this.buf_;let d=this.inbuf_;for(;l<n;){if(d===0)for(;l<=s;)this.compress_(e,l),l+=this.blockSize;if(typeof e=="string"){for(;l<n;)if(u[d]=e.charCodeAt(l),++d,++l,d===this.blockSize){this.compress_(u),d=0;break}}else for(;l<n;)if(u[d]=e[l],++d,++l,d===this.blockSize){this.compress_(u),d=0;break}}this.inbuf_=d,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let l=this.blockSize-1;l>=56;l--)this.buf_[l]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let l=0;l<5;l++)for(let u=24;u>=0;u-=8)e[s]=this.chain_[l]>>u&255,++s;return e}}function Ew(i,e){const n=new Sw(i,e);return n.subscribe.bind(n)}class Sw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let l;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Cw(e,["next","error","complete"])?l=e:l={next:e,error:n,complete:s},l.next===void 0&&(l.next=qu),l.error===void 0&&(l.error=qu),l.complete===void 0&&(l.complete=qu);const u=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?l.error(this.finalError):l.complete()}catch{}}),this.observers.push(l),u}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Cw(i,e){if(typeof i!="object"||i===null)return!1;for(const n of e)if(n in i&&typeof i[n]=="function")return!0;return!1}function qu(){}function ui(i,e){return`${i} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iw=function(i){const e=[];let n=0;for(let s=0;s<i.length;s++){let l=i.charCodeAt(s);if(l>=55296&&l<=56319){const u=l-55296;s++,D(s<i.length,"Surrogate pair missing trail surrogate.");const d=i.charCodeAt(s)-56320;l=65536+(u<<10)+d}l<128?e[n++]=l:l<2048?(e[n++]=l>>6|192,e[n++]=l&63|128):l<65536?(e[n++]=l>>12|224,e[n++]=l>>6&63|128,e[n++]=l&63|128):(e[n++]=l>>18|240,e[n++]=l>>12&63|128,e[n++]=l>>6&63|128,e[n++]=l&63|128)}return e},Ml=function(i){let e=0;for(let n=0;n<i.length;n++){const s=i.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(i){return i&&i._delegate?i._delegate:i}class wr{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tw{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Yt;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const l=this.getOrInitializeService({instanceIdentifier:n});l&&s.resolve(l)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),l=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(u){if(l)return null;throw u}else{if(l)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Nw(e))try{this.getOrInitializeService({instanceIdentifier:gr})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(n);try{const u=this.getOrInitializeService({instanceIdentifier:l});s.resolve(u)}catch{}}}}clearInstance(e=gr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=gr){return this.instances.has(e)}getOptions(e=gr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const l=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[u,d]of this.instancesDeferred.entries()){const f=this.normalizeInstanceIdentifier(u);s===f&&d.resolve(l)}return l}onInit(e,n){var s;const l=this.normalizeInstanceIdentifier(n),u=(s=this.onInitCallbacks.get(l))!==null&&s!==void 0?s:new Set;u.add(e),this.onInitCallbacks.set(l,u);const d=this.instances.get(l);return d&&e(d,l),()=>{u.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const l of s)try{l(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:kw(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=gr){return this.component?this.component.multipleInstances?e:gr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kw(i){return i===gr?void 0:i}function Nw(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Tw(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(ue||(ue={}));const Pw={debug:ue.DEBUG,verbose:ue.VERBOSE,info:ue.INFO,warn:ue.WARN,error:ue.ERROR,silent:ue.SILENT},Aw=ue.INFO,Ow={[ue.DEBUG]:"log",[ue.VERBOSE]:"log",[ue.INFO]:"info",[ue.WARN]:"warn",[ue.ERROR]:"error"},Dw=(i,e,...n)=>{if(e<i.logLevel)return;const s=new Date().toISOString(),l=Ow[e];if(l)console[l](`[${s}]  ${i.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Lc{constructor(e){this.name=e,this._logLevel=Aw,this._logHandler=Dw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ue))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Pw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ue.DEBUG,...e),this._logHandler(this,ue.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ue.VERBOSE,...e),this._logHandler(this,ue.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ue.INFO,...e),this._logHandler(this,ue.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ue.WARN,...e),this._logHandler(this,ue.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ue.ERROR,...e),this._logHandler(this,ue.ERROR,...e)}}const xw=(i,e)=>e.some(n=>i instanceof n);let Dp,xp;function Lw(){return Dp||(Dp=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mw(){return xp||(xp=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const qm=new WeakMap,uc=new WeakMap,Ym=new WeakMap,Yu=new WeakMap,Mc=new WeakMap;function bw(i){const e=new Promise((n,s)=>{const l=()=>{i.removeEventListener("success",u),i.removeEventListener("error",d)},u=()=>{n(Gn(i.result)),l()},d=()=>{s(i.error),l()};i.addEventListener("success",u),i.addEventListener("error",d)});return e.then(n=>{n instanceof IDBCursor&&qm.set(n,i)}).catch(()=>{}),Mc.set(e,i),e}function Fw(i){if(uc.has(i))return;const e=new Promise((n,s)=>{const l=()=>{i.removeEventListener("complete",u),i.removeEventListener("error",d),i.removeEventListener("abort",d)},u=()=>{n(),l()},d=()=>{s(i.error||new DOMException("AbortError","AbortError")),l()};i.addEventListener("complete",u),i.addEventListener("error",d),i.addEventListener("abort",d)});uc.set(i,e)}let cc={get(i,e,n){if(i instanceof IDBTransaction){if(e==="done")return uc.get(i);if(e==="objectStoreNames")return i.objectStoreNames||Ym.get(i);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Gn(i[e])},set(i,e,n){return i[e]=n,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function Uw(i){cc=i(cc)}function zw(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=i.call(Xu(this),e,...n);return Ym.set(s,e.sort?e.sort():[e]),Gn(s)}:Mw().includes(i)?function(...e){return i.apply(Xu(this),e),Gn(qm.get(this))}:function(...e){return Gn(i.apply(Xu(this),e))}}function Ww(i){return typeof i=="function"?zw(i):(i instanceof IDBTransaction&&Fw(i),xw(i,Lw())?new Proxy(i,cc):i)}function Gn(i){if(i instanceof IDBRequest)return bw(i);if(Yu.has(i))return Yu.get(i);const e=Ww(i);return e!==i&&(Yu.set(i,e),Mc.set(e,i)),e}const Xu=i=>Mc.get(i);function Vw(i,e,{blocked:n,upgrade:s,blocking:l,terminated:u}={}){const d=indexedDB.open(i,e),f=Gn(d);return s&&d.addEventListener("upgradeneeded",m=>{s(Gn(d.result),m.oldVersion,m.newVersion,Gn(d.transaction),m)}),n&&d.addEventListener("blocked",m=>n(m.oldVersion,m.newVersion,m)),f.then(m=>{u&&m.addEventListener("close",()=>u()),l&&m.addEventListener("versionchange",g=>l(g.oldVersion,g.newVersion,g))}).catch(()=>{}),f}const Bw=["get","getKey","getAll","getAllKeys","count"],Hw=["put","add","delete","clear"],Ju=new Map;function Lp(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(Ju.get(e))return Ju.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,l=Hw.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(l||Bw.includes(n)))return;const u=async function(d,...f){const m=this.transaction(d,l?"readwrite":"readonly");let g=m.store;return s&&(g=g.index(f.shift())),(await Promise.all([g[n](...f),l&&m.done]))[0]};return Ju.set(e,u),u}Uw(i=>({...i,get:(e,n,s)=>Lp(e,n)||i.get(e,n,s),has:(e,n)=>!!Lp(e,n)||i.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if($w(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function $w(i){const e=i.getComponent();return(e==null?void 0:e.type)==="VERSION"}const dc="@firebase/app",Mp="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn=new Lc("@firebase/app"),Gw="@firebase/app-compat",Kw="@firebase/analytics-compat",Qw="@firebase/analytics",qw="@firebase/app-check-compat",Yw="@firebase/app-check",Xw="@firebase/auth",Jw="@firebase/auth-compat",Zw="@firebase/database",eE="@firebase/data-connect",tE="@firebase/database-compat",nE="@firebase/functions",rE="@firebase/functions-compat",iE="@firebase/installations",sE="@firebase/installations-compat",oE="@firebase/messaging",lE="@firebase/messaging-compat",aE="@firebase/performance",uE="@firebase/performance-compat",cE="@firebase/remote-config",dE="@firebase/remote-config-compat",hE="@firebase/storage",fE="@firebase/storage-compat",pE="@firebase/firestore",mE="@firebase/vertexai-preview",gE="@firebase/firestore-compat",_E="firebase",vE="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc="[DEFAULT]",yE={[dc]:"fire-core",[Gw]:"fire-core-compat",[Qw]:"fire-analytics",[Kw]:"fire-analytics-compat",[Yw]:"fire-app-check",[qw]:"fire-app-check-compat",[Xw]:"fire-auth",[Jw]:"fire-auth-compat",[Zw]:"fire-rtdb",[eE]:"fire-data-connect",[tE]:"fire-rtdb-compat",[nE]:"fire-fn",[rE]:"fire-fn-compat",[iE]:"fire-iid",[sE]:"fire-iid-compat",[oE]:"fire-fcm",[lE]:"fire-fcm-compat",[aE]:"fire-perf",[uE]:"fire-perf-compat",[cE]:"fire-rc",[dE]:"fire-rc-compat",[hE]:"fire-gcs",[fE]:"fire-gcs-compat",[pE]:"fire-fst",[gE]:"fire-fst-compat",[mE]:"fire-vertex","fire-js":"fire-js",[_E]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs=new Map,wE=new Map,fc=new Map;function bp(i,e){try{i.container.addComponent(e)}catch(n){mn.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,n)}}function ci(i){const e=i.name;if(fc.has(e))return mn.debug(`There were multiple attempts to register component ${e}.`),!1;fc.set(e,i);for(const n of Cs.values())bp(n,i);for(const n of wE.values())bp(n,i);return!0}function bc(i,e){const n=i.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),i.container.getProvider(e)}function Ut(i){return i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kn=new xs("app","Firebase",EE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new wr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Kn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yi=vE;function CE(i,e={}){let n=i;typeof e!="object"&&(e={name:e});const s=Object.assign({name:hc,automaticDataCollectionEnabled:!1},e),l=s.name;if(typeof l!="string"||!l)throw Kn.create("bad-app-name",{appName:String(l)});if(n||(n=$m()),!n)throw Kn.create("no-options");const u=Cs.get(l);if(u){if(pl(n,u.options)&&pl(s,u.config))return u;throw Kn.create("duplicate-app",{appName:l})}const d=new Rw(l);for(const m of fc.values())d.addComponent(m);const f=new SE(n,s,d);return Cs.set(l,f),f}function Xm(i=hc){const e=Cs.get(i);if(!e&&i===hc&&$m())return CE();if(!e)throw Kn.create("no-app",{appName:i});return e}function ck(){return Array.from(Cs.values())}function Qn(i,e,n){var s;let l=(s=yE[i])!==null&&s!==void 0?s:i;n&&(l+=`-${n}`);const u=l.match(/\s|\//),d=e.match(/\s|\//);if(u||d){const f=[`Unable to register library "${l}" with version "${e}":`];u&&f.push(`library name "${l}" contains illegal characters (whitespace or "/")`),u&&d&&f.push("and"),d&&f.push(`version name "${e}" contains illegal characters (whitespace or "/")`),mn.warn(f.join(" "));return}ci(new wr(`${l}-version`,()=>({library:l,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IE="firebase-heartbeat-database",TE=1,Is="firebase-heartbeat-store";let Zu=null;function Jm(){return Zu||(Zu=Vw(IE,TE,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(Is)}catch(n){console.warn(n)}}}}).catch(i=>{throw Kn.create("idb-open",{originalErrorMessage:i.message})})),Zu}async function kE(i){try{const n=(await Jm()).transaction(Is),s=await n.objectStore(Is).get(Zm(i));return await n.done,s}catch(e){if(e instanceof tr)mn.warn(e.message);else{const n=Kn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});mn.warn(n.message)}}}async function Fp(i,e){try{const s=(await Jm()).transaction(Is,"readwrite");await s.objectStore(Is).put(e,Zm(i)),await s.done}catch(n){if(n instanceof tr)mn.warn(n.message);else{const s=Kn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});mn.warn(s.message)}}}function Zm(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NE=1024,RE=720*60*60*1e3;class PE{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new OE(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const l=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),u=Up();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===u||this._heartbeatsCache.heartbeats.some(d=>d.date===u)?void 0:(this._heartbeatsCache.heartbeats.push({date:u,agent:l}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(d=>{const f=new Date(d.date).valueOf();return Date.now()-f<=RE}),this._storage.overwrite(this._heartbeatsCache))}catch(s){mn.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Up(),{heartbeatsToSend:s,unsentEntries:l}=AE(this._heartbeatsCache.heartbeats),u=cl(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,l.length>0?(this._heartbeatsCache.heartbeats=l,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),u}catch(n){return mn.warn(n),""}}}function Up(){return new Date().toISOString().substring(0,10)}function AE(i,e=NE){const n=[];let s=i.slice();for(const l of i){const u=n.find(d=>d.agent===l.agent);if(u){if(u.dates.push(l.date),zp(n)>e){u.dates.pop();break}}else if(n.push({agent:l.agent,dates:[l.date]}),zp(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class OE{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return fw()?pw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await kE(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const l=await this.read();return Fp(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:l.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const l=await this.read();return Fp(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:l.lastSentHeartbeatDate,heartbeats:[...l.heartbeats,...e.heartbeats]})}else return}}function zp(i){return cl(JSON.stringify({version:2,heartbeats:i})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DE(i){ci(new wr("platform-logger",e=>new jw(e),"PRIVATE")),ci(new wr("heartbeat",e=>new PE(e),"PRIVATE")),Qn(dc,Mp,i),Qn(dc,Mp,"esm2017"),Qn("fire-js","")}DE("");var xE="firebase",LE="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qn(xE,LE,"app");var Wp={};const Vp="@firebase/database",Bp="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eg="";function tg(i){eg=i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Le(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ss(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Jt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ng=function(i){try{if(typeof window<"u"&&typeof window[i]<"u"){const e=window[i];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new ME(e)}}catch{}return new bE},vr=ng("localStorage"),FE=ng("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri=new Lc("@firebase/database"),UE=(function(){let i=1;return function(){return i++}})(),rg=function(i){const e=Iw(i),n=new ww;n.update(e);const s=n.digest();return Oc.encodeByteArray(s)},Ls=function(...i){let e="";for(let n=0;n<i.length;n++){const s=i[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Ls.apply(null,s):typeof s=="object"?e+=Le(s):e+=s,e+=" "}return e};let gs=null,Hp=!0;const zE=function(i,e){D(!0,"Can't turn on custom loggers persistently."),ri.logLevel=ue.VERBOSE,gs=ri.log.bind(ri)},Ve=function(...i){if(Hp===!0&&(Hp=!1,gs===null&&FE.get("logging_enabled")===!0&&zE()),gs){const e=Ls.apply(null,i);gs(e)}},Ms=function(i){return function(...e){Ve(i,...e)}},pc=function(...i){const e="FIREBASE INTERNAL ERROR: "+Ls(...i);ri.error(e)},gn=function(...i){const e=`FIREBASE FATAL ERROR: ${Ls(...i)}`;throw ri.error(e),new Error(e)},et=function(...i){const e="FIREBASE WARNING: "+Ls(...i);ri.warn(e)},WE=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&et("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},bl=function(i){return typeof i=="number"&&(i!==i||i===Number.POSITIVE_INFINITY||i===Number.NEGATIVE_INFINITY)},VE=function(i){if(document.readyState==="complete")i();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,i())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},di="[MIN_NAME]",Er="[MAX_NAME]",Rr=function(i,e){if(i===e)return 0;if(i===di||e===Er)return-1;if(e===di||i===Er)return 1;{const n=jp(i),s=jp(e);return n!==null?s!==null?n-s===0?i.length-e.length:n-s:-1:s!==null?1:i<e?-1:1}},BE=function(i,e){return i===e?0:i<e?-1:1},cs=function(i,e){if(e&&i in e)return e[i];throw new Error("Missing required key ("+i+") in object: "+Le(e))},Fc=function(i){if(typeof i!="object"||i===null)return Le(i);const e=[];for(const s in i)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=Le(e[s]),n+=":",n+=Fc(i[e[s]]);return n+="}",n},ig=function(i,e){const n=i.length;if(n<=e)return[i];const s=[];for(let l=0;l<n;l+=e)l+e>n?s.push(i.substring(l,n)):s.push(i.substring(l,l+e));return s};function Be(i,e){for(const n in i)i.hasOwnProperty(n)&&e(n,i[n])}const sg=function(i){D(!bl(i),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let l,u,d,f,m;i===0?(u=0,d=0,l=1/i===-1/0?1:0):(l=i<0,i=Math.abs(i),i>=Math.pow(2,1-s)?(f=Math.min(Math.floor(Math.log(i)/Math.LN2),s),u=f+s,d=Math.round(i*Math.pow(2,n-f)-Math.pow(2,n))):(u=0,d=Math.round(i/Math.pow(2,1-s-n))));const g=[];for(m=n;m;m-=1)g.push(d%2?1:0),d=Math.floor(d/2);for(m=e;m;m-=1)g.push(u%2?1:0),u=Math.floor(u/2);g.push(l?1:0),g.reverse();const S=g.join("");let E="";for(m=0;m<64;m+=8){let T=parseInt(S.substr(m,8),2).toString(16);T.length===1&&(T="0"+T),E=E+T}return E.toLowerCase()},HE=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},jE=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function $E(i,e){let n="Unknown Error";i==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":i==="permission_denied"?n="Client doesn't have permission to access the desired data.":i==="unavailable"&&(n="The service is unavailable");const s=new Error(i+" at "+e._path.toString()+": "+n);return s.code=i.toUpperCase(),s}const GE=new RegExp("^-?(0*)\\d{1,10}$"),KE=-2147483648,QE=2147483647,jp=function(i){if(GE.test(i)){const e=Number(i);if(e>=KE&&e<=QE)return e}return null},wi=function(i){try{i()}catch(e){setTimeout(()=>{const n=e.stack||"";throw et("Exception was thrown by user callback.",n),e},Math.floor(0))}},qE=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},_s=function(i,e){const n=setTimeout(i,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YE{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(s=>this.appCheck=s)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){et(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XE{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(l=>this.auth_=l)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Ve("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',et(e)}}class sl{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}sl.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc="5",og="v",lg="s",ag="r",ug="f",cg=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,dg="ls",hg="p",mc="ac",fg="websocket",pg="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e,n,s,l,u=!1,d="",f=!1,m=!1){this.secure=n,this.namespace=s,this.webSocketOnly=l,this.nodeAdmin=u,this.persistenceKey=d,this.includeNamespaceInQueryParams=f,this.isUsingEmulator=m,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=vr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&vr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function JE(i){return i.host!==i.internalHost||i.isCustomHost()||i.includeNamespaceInQueryParams}function gg(i,e,n){D(typeof e=="string","typeof type must == string"),D(typeof n=="object","typeof params must == object");let s;if(e===fg)s=(i.secure?"wss://":"ws://")+i.internalHost+"/.ws?";else if(e===pg)s=(i.secure?"https://":"http://")+i.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);JE(i)&&(n.ns=i.namespace);const l=[];return Be(n,(u,d)=>{l.push(u+"="+d)}),s+l.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZE{constructor(){this.counters_={}}incrementCounter(e,n=1){Jt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return tw(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec={},tc={};function zc(i){const e=i.toString();return ec[e]||(ec[e]=new ZE),ec[e]}function e0(i,e){const n=i.toString();return tc[n]||(tc[n]=e()),tc[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t0{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let l=0;l<s.length;++l)s[l]&&wi(()=>{this.onMessage_(s[l])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $p="start",n0="close",r0="pLPCommand",i0="pRTLPCB",_g="id",vg="pw",yg="ser",s0="cb",o0="seg",l0="ts",a0="d",u0="dframe",wg=1870,Eg=30,c0=wg-Eg,d0=25e3,h0=3e4;class ni{constructor(e,n,s,l,u,d,f){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=l,this.authToken=u,this.transportSessionId=d,this.lastSessionId=f,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ms(e),this.stats_=zc(n),this.urlFn=m=>(this.appCheckToken&&(m[mc]=this.appCheckToken),gg(n,pg,m))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new t0(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(h0)),VE(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Wc((...u)=>{const[d,f,m,g,S]=u;if(this.incrementIncomingBytes_(u),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,d===$p)this.id=f,this.password=m;else if(d===n0)f?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(f,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+d)},(...u)=>{const[d,f]=u;this.incrementIncomingBytes_(u),this.myPacketOrderer.handleResponse(d,f)},()=>{this.onClosed_()},this.urlFn);const s={};s[$p]="t",s[yg]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[s0]=this.scriptTagHolder.uniqueCallbackIdentifier),s[og]=Uc,this.transportSessionId&&(s[lg]=this.transportSessionId),this.lastSessionId&&(s[dg]=this.lastSessionId),this.applicationId&&(s[hg]=this.applicationId),this.appCheckToken&&(s[mc]=this.appCheckToken),typeof location<"u"&&location.hostname&&cg.test(location.hostname)&&(s[ag]=ug);const l=this.urlFn(s);this.log_("Connecting via long-poll to "+l),this.scriptTagHolder.addTag(l,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ni.forceAllow_=!0}static forceDisallow(){ni.forceDisallow_=!0}static isAvailable(){return ni.forceAllow_?!0:!ni.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!HE()&&!jE()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Le(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Bm(n),l=ig(s,c0);for(let u=0;u<l.length;u++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,l.length,l[u]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[u0]="t",s[_g]=e,s[vg]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Le(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Wc{constructor(e,n,s,l){this.onDisconnect=s,this.urlFn=l,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=UE(),window[r0+this.uniqueCallbackIdentifier]=e,window[i0+this.uniqueCallbackIdentifier]=n,this.myIFrame=Wc.createIFrame_();let u="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(u='<script>document.domain="'+document.domain+'";<\/script>');const d="<html><body>"+u+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(d),this.myIFrame.doc.close()}catch(f){Ve("frame writing exception"),f.stack&&Ve(f.stack),Ve(f)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ve("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[_g]=this.myID,e[vg]=this.myPW,e[yg]=this.currentSerial;let n=this.urlFn(e),s="",l=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Eg+s.length<=wg;){const d=this.pendingSegs.shift();s=s+"&"+o0+l+"="+d.seg+"&"+l0+l+"="+d.ts+"&"+a0+l+"="+d.d,l++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},l=setTimeout(s,Math.floor(d0)),u=()=>{clearTimeout(l),s()};this.addTag(e,u)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const l=s.readyState;(!l||l==="loaded"||l==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{Ve("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f0=16384,p0=45e3;let ml=null;typeof MozWebSocket<"u"?ml=MozWebSocket:typeof WebSocket<"u"&&(ml=WebSocket);class Ft{constructor(e,n,s,l,u,d,f){this.connId=e,this.applicationId=s,this.appCheckToken=l,this.authToken=u,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ms(this.connId),this.stats_=zc(n),this.connURL=Ft.connectionURL_(n,d,f,l,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,l,u){const d={};return d[og]=Uc,typeof location<"u"&&location.hostname&&cg.test(location.hostname)&&(d[ag]=ug),n&&(d[lg]=n),s&&(d[dg]=s),l&&(d[mc]=l),u&&(d[hg]=u),gg(e,fg,d)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,vr.set("previous_websocket_failure",!0);try{let s;hw(),this.mySock=new ml(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const l=s.message||s.data;l&&this.log_(l),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const l=s.message||s.data;l&&this.log_(l),this.onClosed_()}}start(){}static forceDisallow(){Ft.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&ml!==null&&!Ft.forceDisallow_}static previouslyFailed(){return vr.isInMemoryStorage||vr.get("previous_websocket_failure")===!0}markConnectionHealthy(){vr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Ss(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(D(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=Le(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=ig(n,f0);s.length>1&&this.sendString_(String(s.length));for(let l=0;l<s.length;l++)this.sendString_(s[l])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(p0))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ft.responsesRequiredToBeHealthy=2;Ft.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[ni,Ft]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=Ft&&Ft.isAvailable();let s=n&&!Ft.previouslyFailed();if(e.webSocketOnly&&(n||et("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Ft];else{const l=this.transports_=[];for(const u of Ts.ALL_TRANSPORTS)u&&u.isAvailable()&&l.push(u);Ts.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ts.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m0=6e4,g0=5e3,_0=10*1024,v0=100*1024,nc="t",Gp="d",y0="s",Kp="r",w0="e",Qp="o",qp="a",Yp="n",Xp="p",E0="h";class S0{constructor(e,n,s,l,u,d,f,m,g,S){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=l,this.authToken_=u,this.onMessage_=d,this.onReady_=f,this.onDisconnect_=m,this.onKill_=g,this.lastSessionId=S,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ms("c:"+this.id+":"),this.transportManager_=new Ts(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const l=e.healthyTimeout||0;l>0&&(this.healthyTimeout_=_s(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>v0?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>_0?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(l)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(nc in e){const n=e[nc];n===qp?this.upgradeIfSecondaryHealthy_():n===Kp?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Qp&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=cs("t",e),s=cs("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Xp,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:qp,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Yp,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=cs("t",e),s=cs("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=cs(nc,e);if(Gp in e){const s=e[Gp];if(n===E0){const l=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(l.h=this.repoInfo_.host),this.onHandshake_(l)}else if(n===Yp){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let l=0;l<this.pendingDataMessages.length;++l)this.onDataMessage_(this.pendingDataMessages[l]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===y0?this.onConnectionShutdown_(s):n===Kp?this.onReset_(s):n===w0?pc("Server Error: "+s):n===Qp?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):pc("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,l=e.h;this.sessionId=e.s,this.repoInfo_.host=l,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Uc!==s&&et("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),_s(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(m0))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):_s(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(g0))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Xp,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(vr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{put(e,n,s,l){}merge(e,n,s,l){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{constructor(e){this.allowedEvents_=e,this.listeners_={},D(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let l=0;l<s.length;l++)s[l].callback.apply(s[l].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const l=this.getInitialEvent(e);l&&n.apply(s,l)}off(e,n,s){this.validateEventType_(e);const l=this.listeners_[e]||[];for(let u=0;u<l.length;u++)if(l[u].callback===n&&(!s||s===l[u].context)){l.splice(u,1);return}}validateEventType_(e){D(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl extends Cg{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!xc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new gl}getInitialEvent(e){return D(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp=32,Zp=768;class ae{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let l=0;l<this.pieces_.length;l++)this.pieces_[l].length>0&&(this.pieces_[s]=this.pieces_[l],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function ie(){return new ae("")}function Y(i){return i.pieceNum_>=i.pieces_.length?null:i.pieces_[i.pieceNum_]}function Xn(i){return i.pieces_.length-i.pieceNum_}function de(i){let e=i.pieceNum_;return e<i.pieces_.length&&e++,new ae(i.pieces_,e)}function Vc(i){return i.pieceNum_<i.pieces_.length?i.pieces_[i.pieces_.length-1]:null}function C0(i){let e="";for(let n=i.pieceNum_;n<i.pieces_.length;n++)i.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(i.pieces_[n])));return e||"/"}function ks(i,e=0){return i.pieces_.slice(i.pieceNum_+e)}function Ig(i){if(i.pieceNum_>=i.pieces_.length)return null;const e=[];for(let n=i.pieceNum_;n<i.pieces_.length-1;n++)e.push(i.pieces_[n]);return new ae(e,0)}function we(i,e){const n=[];for(let s=i.pieceNum_;s<i.pieces_.length;s++)n.push(i.pieces_[s]);if(e instanceof ae)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let l=0;l<s.length;l++)s[l].length>0&&n.push(s[l])}return new ae(n,0)}function J(i){return i.pieceNum_>=i.pieces_.length}function Ze(i,e){const n=Y(i),s=Y(e);if(n===null)return e;if(n===s)return Ze(de(i),de(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+i+")")}function I0(i,e){const n=ks(i,0),s=ks(e,0);for(let l=0;l<n.length&&l<s.length;l++){const u=Rr(n[l],s[l]);if(u!==0)return u}return n.length===s.length?0:n.length<s.length?-1:1}function Bc(i,e){if(Xn(i)!==Xn(e))return!1;for(let n=i.pieceNum_,s=e.pieceNum_;n<=i.pieces_.length;n++,s++)if(i.pieces_[n]!==e.pieces_[s])return!1;return!0}function Tt(i,e){let n=i.pieceNum_,s=e.pieceNum_;if(Xn(i)>Xn(e))return!1;for(;n<i.pieces_.length;){if(i.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class T0{constructor(e,n){this.errorPrefix_=n,this.parts_=ks(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Ml(this.parts_[s]);Tg(this)}}function k0(i,e){i.parts_.length>0&&(i.byteLength_+=1),i.parts_.push(e),i.byteLength_+=Ml(e),Tg(i)}function N0(i){const e=i.parts_.pop();i.byteLength_-=Ml(e),i.parts_.length>0&&(i.byteLength_-=1)}function Tg(i){if(i.byteLength_>Zp)throw new Error(i.errorPrefix_+"has a key path longer than "+Zp+" bytes ("+i.byteLength_+").");if(i.parts_.length>Jp)throw new Error(i.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Jp+") or object contains a cycle "+_r(i))}function _r(i){return i.parts_.length===0?"":"in property '"+i.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc extends Cg{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}static getInstance(){return new Hc}getInitialEvent(e){return D(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds=1e3,R0=300*1e3,em=30*1e3,P0=1.3,A0=3e4,O0="server_kill",tm=3;class fn extends Sg{constructor(e,n,s,l,u,d,f,m){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=l,this.onServerInfoUpdate_=u,this.authTokenProvider_=d,this.appCheckTokenProvider_=f,this.authOverride_=m,this.id=fn.nextPersistentConnectionId_++,this.log_=Ms("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ds,this.maxReconnectDelay_=R0,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,m)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Hc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&gl.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const l=++this.requestNumber_,u={r:l,a:e,b:n};this.log_(Le(u)),D(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(u),s&&(this.requestCBHash_[l]=s)}get(e){this.initConnection_();const n=new Yt,l={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:d=>{const f=d.d;d.s==="ok"?n.resolve(f):n.reject(f)}};this.outstandingGets_.push(l),this.outstandingGetCount_++;const u=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(u),n.promise}listen(e,n,s,l){this.initConnection_();const u=e._queryIdentifier,d=e._path.toString();this.log_("Listen called for "+d+" "+u),this.listens.has(d)||this.listens.set(d,new Map),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),D(!this.listens.get(d).has(u),"listen() called twice for same path/queryId.");const f={onComplete:l,hashFn:n,query:e,tag:s};this.listens.get(d).set(u,f),this.connected_&&this.sendListen_(f)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),l=n._queryIdentifier;this.log_("Listen on "+s+" for "+l);const u={p:s},d="q";e.tag&&(u.q=n._queryObject,u.t=e.tag),u.h=e.hashFn(),this.sendRequest(d,u,f=>{const m=f.d,g=f.s;fn.warnOnListenWarnings_(m,n),(this.listens.get(s)&&this.listens.get(s).get(l))===e&&(this.log_("listen response",f),g!=="ok"&&this.removeListen_(s,l),e.onComplete&&e.onComplete(g,m))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Jt(e,"w")){const s=ai(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const l='".indexOn": "'+n._queryParams.getIndex().toString()+'"',u=n._path.toString();et(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${l} at ${u} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||yw(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=em)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=vw(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,l=>{const u=l.s,d=l.d||"error";this.authToken_===e&&(u==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(u,d))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),l=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+l),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,l)&&this.connected_&&this.sendUnlisten_(s,l,e._queryObject,n)}sendUnlisten_(e,n,s,l){this.log_("Unlisten on "+e+" for "+n);const u={p:e},d="n";l&&(u.q=s,u.t=l),this.sendRequest(d,u)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,l){const u={p:n,d:s};this.log_("onDisconnect "+e,u),this.sendRequest(e,u,d=>{l&&setTimeout(()=>{l(d.s,d.d)},Math.floor(0))})}put(e,n,s,l){this.putInternal("p",e,n,s,l)}merge(e,n,s,l){this.putInternal("m",e,n,s,l)}putInternal(e,n,s,l,u){this.initConnection_();const d={p:n,d:s};u!==void 0&&(d.h=u),this.outstandingPuts_.push({action:e,request:d,onComplete:l}),this.outstandingPutCount_++;const f=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(f):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,l=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,u=>{this.log_(n+" response",u),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),l&&l(u.s,u.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const u=s.d;this.log_("reportStats","Error sending stats: "+u)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Le(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):pc("Unrecognized action received from server: "+Le(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){D(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ds,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ds,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>A0&&(this.reconnectDelay_=ds),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*P0)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),l=this.id+":"+fn.nextConnectionId_++,u=this.lastSessionId;let d=!1,f=null;const m=function(){f?f.close():(d=!0,s())},g=function(E){D(f,"sendRequest call when we're not connected not allowed."),f.sendRequest(E)};this.realtime_={close:m,sendRequest:g};const S=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[E,T]=await Promise.all([this.authTokenProvider_.getToken(S),this.appCheckTokenProvider_.getToken(S)]);d?Ve("getToken() completed but was canceled"):(Ve("getToken() completed. Creating connection."),this.authToken_=E&&E.accessToken,this.appCheckToken_=T&&T.token,f=new S0(l,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,x=>{et(x+" ("+this.repoInfo_.toString()+")"),this.interrupt(O0)},u))}catch(E){this.log_("Failed to get token: "+E),d||(this.repoInfo_.nodeAdmin&&et(E),m())}}}interrupt(e){Ve("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ve("Resuming connection for reason: "+e),delete this.interruptReasons_[e],hl(this.interruptReasons_)&&(this.reconnectDelay_=ds,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(u=>Fc(u)).join("$"):s="default";const l=this.removeListen_(e,s);l&&l.onComplete&&l.onComplete("permission_denied")}removeListen_(e,n){const s=new ae(e).toString();let l;if(this.listens.has(s)){const u=this.listens.get(s);l=u.get(n),u.delete(n),u.size===0&&this.listens.delete(s)}else l=void 0;return l}onAuthRevoked_(e,n){Ve("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=tm&&(this.reconnectDelay_=em,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Ve("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=tm&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+eg.replace(/\./g,"-")]=1,xc()?e["framework.cordova"]=1:Km()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=gl.getInstance().currentlyOnline();return hl(this.interruptReasons_)&&e}}fn.nextPersistentConnectionId_=0;fn.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new Z(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new Z(di,e),l=new Z(di,n);return this.compare(s,l)!==0}minPost(){return Z.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nl;class kg extends Fl{static get __EMPTY_NODE(){return nl}static set __EMPTY_NODE(e){nl=e}compare(e,n){return Rr(e.name,n.name)}isDefinedOn(e){throw _i("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return Z.MIN}maxPost(){return new Z(Er,nl)}makePost(e,n){return D(typeof e=="string","KeyIndex indexValue must always be a string."),new Z(e,nl)}toString(){return".key"}}const ii=new kg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,n,s,l,u=null){this.isReverse_=l,this.resultGenerator_=u,this.nodeStack_=[];let d=1;for(;!e.isEmpty();)if(e=e,d=n?s(e.key,n):1,l&&(d*=-1),d<0)this.isReverse_?e=e.left:e=e.right;else if(d===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class We{constructor(e,n,s,l,u){this.key=e,this.value=n,this.color=s??We.RED,this.left=l??ht.EMPTY_NODE,this.right=u??ht.EMPTY_NODE}copy(e,n,s,l,u){return new We(e??this.key,n??this.value,s??this.color,l??this.left,u??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let l=this;const u=s(e,l.key);return u<0?l=l.copy(null,null,null,l.left.insert(e,n,s),null):u===0?l=l.copy(null,n,null,null,null):l=l.copy(null,null,null,null,l.right.insert(e,n,s)),l.fixUp_()}removeMin_(){if(this.left.isEmpty())return ht.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,l;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return ht.EMPTY_NODE;l=s.right.min_(),s=s.copy(l.key,l.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,We.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,We.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}We.RED=!0;We.BLACK=!1;class D0{copy(e,n,s,l,u){return this}insert(e,n,s){return new We(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ht{constructor(e,n=ht.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ht(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,We.BLACK,null,null))}remove(e){return new ht(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,We.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,l=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return l?l.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(l=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new rl(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new rl(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new rl(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new rl(this.root_,null,this.comparator_,!0,e)}}ht.EMPTY_NODE=new D0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x0(i,e){return Rr(i.name,e.name)}function jc(i,e){return Rr(i,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gc;function L0(i){gc=i}const Ng=function(i){return typeof i=="number"?"number:"+sg(i):"string:"+i},Rg=function(i){if(i.isLeafNode()){const e=i.val();D(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Jt(e,".sv"),"Priority must be a string or number.")}else D(i===gc||i.isEmpty(),"priority of unexpected type.");D(i===gc||i.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nm;class ze{constructor(e,n=ze.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,D(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Rg(this.priorityNode_)}static set __childrenNodeConstructor(e){nm=e}static get __childrenNodeConstructor(){return nm}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ze(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ze.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return J(e)?this:Y(e)===".priority"?this.priorityNode_:ze.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:ze.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=Y(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(D(s!==".priority"||Xn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,ze.__childrenNodeConstructor.EMPTY_NODE.updateChild(de(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Ng(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=sg(this.value_):e+=this.value_,this.lazyHash_=rg(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ze.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ze.__childrenNodeConstructor?-1:(D(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,l=ze.VALUE_TYPE_ORDER.indexOf(n),u=ze.VALUE_TYPE_ORDER.indexOf(s);return D(l>=0,"Unknown leaf type: "+n),D(u>=0,"Unknown leaf type: "+s),l===u?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:u-l}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}ze.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pg,Ag;function M0(i){Pg=i}function b0(i){Ag=i}class F0 extends Fl{compare(e,n){const s=e.node.getPriority(),l=n.node.getPriority(),u=s.compareTo(l);return u===0?Rr(e.name,n.name):u}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return Z.MIN}maxPost(){return new Z(Er,new ze("[PRIORITY-POST]",Ag))}makePost(e,n){const s=Pg(e);return new Z(n,new ze("[PRIORITY-POST]",s))}toString(){return".priority"}}const Ee=new F0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U0=Math.log(2);class z0{constructor(e){const n=u=>parseInt(Math.log(u)/U0,10),s=u=>parseInt(Array(u+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const l=s(this.count);this.bits_=e+1&l}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const _l=function(i,e,n,s){i.sort(e);const l=function(m,g){const S=g-m;let E,T;if(S===0)return null;if(S===1)return E=i[m],T=n?n(E):E,new We(T,E.node,We.BLACK,null,null);{const x=parseInt(S/2,10)+m,b=l(m,x),V=l(x+1,g);return E=i[x],T=n?n(E):E,new We(T,E.node,We.BLACK,b,V)}},u=function(m){let g=null,S=null,E=i.length;const T=function(b,V){const K=E-b,Pe=E;E-=b;const Me=l(K+1,Pe),Ae=i[K],Te=n?n(Ae):Ae;x(new We(Te,Ae.node,V,null,Me))},x=function(b){g?(g.left=b,g=b):(S=b,g=b)};for(let b=0;b<m.count;++b){const V=m.nextBitIsOne(),K=Math.pow(2,m.count-(b+1));V?T(K,We.BLACK):(T(K,We.BLACK),T(K,We.RED))}return S},d=new z0(i.length),f=u(d);return new ht(s||e,f)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rc;const ti={};class un{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return D(ti&&Ee,"ChildrenNode.ts has not been loaded"),rc=rc||new un({".priority":ti},{".priority":Ee}),rc}get(e){const n=ai(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ht?n:null}hasIndex(e){return Jt(this.indexSet_,e.toString())}addIndex(e,n){D(e!==ii,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let l=!1;const u=n.getIterator(Z.Wrap);let d=u.getNext();for(;d;)l=l||e.isDefinedOn(d.node),s.push(d),d=u.getNext();let f;l?f=_l(s,e.getCompare()):f=ti;const m=e.toString(),g=Object.assign({},this.indexSet_);g[m]=e;const S=Object.assign({},this.indexes_);return S[m]=f,new un(S,g)}addToIndexes(e,n){const s=fl(this.indexes_,(l,u)=>{const d=ai(this.indexSet_,u);if(D(d,"Missing index implementation for "+u),l===ti)if(d.isDefinedOn(e.node)){const f=[],m=n.getIterator(Z.Wrap);let g=m.getNext();for(;g;)g.name!==e.name&&f.push(g),g=m.getNext();return f.push(e),_l(f,d.getCompare())}else return ti;else{const f=n.get(e.name);let m=l;return f&&(m=m.remove(new Z(e.name,f))),m.insert(e,e.node)}});return new un(s,this.indexSet_)}removeFromIndexes(e,n){const s=fl(this.indexes_,l=>{if(l===ti)return l;{const u=n.get(e.name);return u?l.remove(new Z(e.name,u)):l}});return new un(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hs;class G{constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Rg(this.priorityNode_),this.children_.isEmpty()&&D(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return hs||(hs=new G(new ht(jc),null,un.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||hs}updatePriority(e){return this.children_.isEmpty()?this:new G(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?hs:n}}getChild(e){const n=Y(e);return n===null?this:this.getImmediateChild(n).getChild(de(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(D(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new Z(e,n);let l,u;n.isEmpty()?(l=this.children_.remove(e),u=this.indexMap_.removeFromIndexes(s,this.children_)):(l=this.children_.insert(e,n),u=this.indexMap_.addToIndexes(s,this.children_));const d=l.isEmpty()?hs:this.priorityNode_;return new G(l,d,u)}}updateChild(e,n){const s=Y(e);if(s===null)return n;{D(Y(e)!==".priority"||Xn(e)===1,".priority must be the last token in a path");const l=this.getImmediateChild(s).updateChild(de(e),n);return this.updateImmediateChild(s,l)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,l=0,u=!0;if(this.forEachChild(Ee,(d,f)=>{n[d]=f.val(e),s++,u&&G.INTEGER_REGEXP_.test(d)?l=Math.max(l,Number(d)):u=!1}),!e&&u&&l<2*s){const d=[];for(const f in n)d[f]=n[f];return d}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Ng(this.getPriority().val())+":"),this.forEachChild(Ee,(n,s)=>{const l=s.hash();l!==""&&(e+=":"+n+":"+l)}),this.lazyHash_=e===""?"":rg(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const l=this.resolveIndex_(s);if(l){const u=l.getPredecessorKey(new Z(e,n));return u?u.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new Z(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new Z(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(l=>n(l.name,l.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,l=>l);{const l=this.children_.getIteratorFrom(e.name,Z.Wrap);let u=l.peek();for(;u!=null&&n.compare(u,e)<0;)l.getNext(),u=l.peek();return l}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,l=>l);{const l=this.children_.getReverseIteratorFrom(e.name,Z.Wrap);let u=l.peek();for(;u!=null&&n.compare(u,e)>0;)l.getNext(),u=l.peek();return l}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===bs?-1:0}withIndex(e){if(e===ii||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new G(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===ii||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(Ee),l=n.getIterator(Ee);let u=s.getNext(),d=l.getNext();for(;u&&d;){if(u.name!==d.name||!u.node.equals(d.node))return!1;u=s.getNext(),d=l.getNext()}return u===null&&d===null}else return!1;else return!1}}resolveIndex_(e){return e===ii?null:this.indexMap_.get(e.toString())}}G.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class W0 extends G{constructor(){super(new ht(jc),G.EMPTY_NODE,un.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return G.EMPTY_NODE}isEmpty(){return!1}}const bs=new W0;Object.defineProperties(Z,{MIN:{value:new Z(di,G.EMPTY_NODE)},MAX:{value:new Z(Er,bs)}});kg.__EMPTY_NODE=G.EMPTY_NODE;ze.__childrenNodeConstructor=G;L0(bs);b0(bs);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V0=!0;function Ie(i,e=null){if(i===null)return G.EMPTY_NODE;if(typeof i=="object"&&".priority"in i&&(e=i[".priority"]),D(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof i=="object"&&".value"in i&&i[".value"]!==null&&(i=i[".value"]),typeof i!="object"||".sv"in i){const n=i;return new ze(n,Ie(e))}if(!(i instanceof Array)&&V0){const n=[];let s=!1;if(Be(i,(d,f)=>{if(d.substring(0,1)!=="."){const m=Ie(f);m.isEmpty()||(s=s||!m.getPriority().isEmpty(),n.push(new Z(d,m)))}}),n.length===0)return G.EMPTY_NODE;const u=_l(n,x0,d=>d.name,jc);if(s){const d=_l(n,Ee.getCompare());return new G(u,Ie(e),new un({".priority":d},{".priority":Ee}))}else return new G(u,Ie(e),un.Default)}else{let n=G.EMPTY_NODE;return Be(i,(s,l)=>{if(Jt(i,s)&&s.substring(0,1)!=="."){const u=Ie(l);(u.isLeafNode()||!u.isEmpty())&&(n=n.updateImmediateChild(s,u))}}),n.updatePriority(Ie(e))}}M0(Ie);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B0 extends Fl{constructor(e){super(),this.indexPath_=e,D(!J(e)&&Y(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),l=this.extractChild(n.node),u=s.compareTo(l);return u===0?Rr(e.name,n.name):u}makePost(e,n){const s=Ie(e),l=G.EMPTY_NODE.updateChild(this.indexPath_,s);return new Z(n,l)}maxPost(){const e=G.EMPTY_NODE.updateChild(this.indexPath_,bs);return new Z(Er,e)}toString(){return ks(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H0 extends Fl{compare(e,n){const s=e.node.compareTo(n.node);return s===0?Rr(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return Z.MIN}maxPost(){return Z.MAX}makePost(e,n){const s=Ie(e);return new Z(n,s)}toString(){return".value"}}const j0=new H0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Og(i){return{type:"value",snapshotNode:i}}function hi(i,e){return{type:"child_added",snapshotNode:e,childName:i}}function Ns(i,e){return{type:"child_removed",snapshotNode:e,childName:i}}function Rs(i,e,n){return{type:"child_changed",snapshotNode:e,childName:i,oldSnap:n}}function $0(i,e){return{type:"child_moved",snapshotNode:e,childName:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e){this.index_=e}updateChild(e,n,s,l,u,d){D(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const f=e.getImmediateChild(n);return f.getChild(l).equals(s.getChild(l))&&f.isEmpty()===s.isEmpty()||(d!=null&&(s.isEmpty()?e.hasChild(n)?d.trackChildChange(Ns(n,f)):D(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):f.isEmpty()?d.trackChildChange(hi(n,s)):d.trackChildChange(Rs(n,s,f))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(Ee,(l,u)=>{n.hasChild(l)||s.trackChildChange(Ns(l,u))}),n.isLeafNode()||n.forEachChild(Ee,(l,u)=>{if(e.hasChild(l)){const d=e.getImmediateChild(l);d.equals(u)||s.trackChildChange(Rs(l,u,d))}else s.trackChildChange(hi(l,u))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?G.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this.indexedFilter_=new $c(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ps.getStartPost_(e),this.endPost_=Ps.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,l,u,d){return this.matches(new Z(n,s))||(s=G.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,l,u,d)}updateFullNode(e,n,s){n.isLeafNode()&&(n=G.EMPTY_NODE);let l=n.withIndex(this.index_);l=l.updatePriority(G.EMPTY_NODE);const u=this;return n.forEachChild(Ee,(d,f)=>{u.matches(new Z(d,f))||(l=l.updateImmediateChild(d,G.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,l,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G0{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Ps(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,l,u,d){return this.rangedFilter_.matches(new Z(n,s))||(s=G.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,l,u,d):this.fullLimitUpdateChild_(e,n,s,u,d)}updateFullNode(e,n,s){let l;if(n.isLeafNode()||n.isEmpty())l=G.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){l=G.EMPTY_NODE.withIndex(this.index_);let u;this.reverse_?u=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):u=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let d=0;for(;u.hasNext()&&d<this.limit_;){const f=u.getNext();if(this.withinDirectionalStart(f))if(this.withinDirectionalEnd(f))l=l.updateImmediateChild(f.name,f.node),d++;else break;else continue}}else{l=n.withIndex(this.index_),l=l.updatePriority(G.EMPTY_NODE);let u;this.reverse_?u=l.getReverseIterator(this.index_):u=l.getIterator(this.index_);let d=0;for(;u.hasNext();){const f=u.getNext();d<this.limit_&&this.withinDirectionalStart(f)&&this.withinDirectionalEnd(f)?d++:l=l.updateImmediateChild(f.name,G.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,l,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,l,u){let d;if(this.reverse_){const E=this.index_.getCompare();d=(T,x)=>E(x,T)}else d=this.index_.getCompare();const f=e;D(f.numChildren()===this.limit_,"");const m=new Z(n,s),g=this.reverse_?f.getFirstChild(this.index_):f.getLastChild(this.index_),S=this.rangedFilter_.matches(m);if(f.hasChild(n)){const E=f.getImmediateChild(n);let T=l.getChildAfterChild(this.index_,g,this.reverse_);for(;T!=null&&(T.name===n||f.hasChild(T.name));)T=l.getChildAfterChild(this.index_,T,this.reverse_);const x=T==null?1:d(T,m);if(S&&!s.isEmpty()&&x>=0)return u!=null&&u.trackChildChange(Rs(n,s,E)),f.updateImmediateChild(n,s);{u!=null&&u.trackChildChange(Ns(n,E));const V=f.updateImmediateChild(n,G.EMPTY_NODE);return T!=null&&this.rangedFilter_.matches(T)?(u!=null&&u.trackChildChange(hi(T.name,T.node)),V.updateImmediateChild(T.name,T.node)):V}}else return s.isEmpty()?e:S&&d(g,m)>=0?(u!=null&&(u.trackChildChange(Ns(g.name,g.node)),u.trackChildChange(hi(n,s))),f.updateImmediateChild(n,s).updateImmediateChild(g.name,G.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Ee}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return D(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return D(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:di}hasEnd(){return this.endSet_}getIndexEndValue(){return D(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return D(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Er}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return D(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Ee}copy(){const e=new Ul;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function K0(i){return i.loadsAllData()?new $c(i.getIndex()):i.hasLimit()?new G0(i):new Ps(i)}function rm(i){const e={};if(i.isDefault())return e;let n;if(i.index_===Ee?n="$priority":i.index_===j0?n="$value":i.index_===ii?n="$key":(D(i.index_ instanceof B0,"Unrecognized index type!"),n=i.index_.toString()),e.orderBy=Le(n),i.startSet_){const s=i.startAfterSet_?"startAfter":"startAt";e[s]=Le(i.indexStartValue_),i.startNameSet_&&(e[s]+=","+Le(i.indexStartName_))}if(i.endSet_){const s=i.endBeforeSet_?"endBefore":"endAt";e[s]=Le(i.indexEndValue_),i.endNameSet_&&(e[s]+=","+Le(i.indexEndName_))}return i.limitSet_&&(i.isViewFromLeft()?e.limitToFirst=i.limit_:e.limitToLast=i.limit_),e}function im(i){const e={};if(i.startSet_&&(e.sp=i.indexStartValue_,i.startNameSet_&&(e.sn=i.indexStartName_),e.sin=!i.startAfterSet_),i.endSet_&&(e.ep=i.indexEndValue_,i.endNameSet_&&(e.en=i.indexEndName_),e.ein=!i.endBeforeSet_),i.limitSet_){e.l=i.limit_;let n=i.viewFrom_;n===""&&(i.isViewFromLeft()?n="l":n="r"),e.vf=n}return i.index_!==Ee&&(e.i=i.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl extends Sg{constructor(e,n,s,l){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=l,this.log_=Ms("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(D(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,s,l){const u=e._path.toString();this.log_("Listen called for "+u+" "+e._queryIdentifier);const d=vl.getListenId_(e,s),f={};this.listens_[d]=f;const m=rm(e._queryParams);this.restRequest_(u+".json",m,(g,S)=>{let E=S;if(g===404&&(E=null,g=null),g===null&&this.onDataUpdate_(u,E,!1,s),ai(this.listens_,d)===f){let T;g?g===401?T="permission_denied":T="rest_error:"+g:T="ok",l(T,null)}})}unlisten(e,n){const s=vl.getListenId_(e,n);delete this.listens_[s]}get(e){const n=rm(e._queryParams),s=e._path.toString(),l=new Yt;return this.restRequest_(s+".json",n,(u,d)=>{let f=d;u===404&&(f=null,u=null),u===null?(this.onDataUpdate_(s,f,!1,null),l.resolve(f)):l.reject(new Error(f))}),l.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([l,u])=>{l&&l.accessToken&&(n.auth=l.accessToken),u&&u.token&&(n.ac=u.token);const d=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+vi(n);this.log_("Sending REST request for "+d);const f=new XMLHttpRequest;f.onreadystatechange=()=>{if(s&&f.readyState===4){this.log_("REST Response for "+d+" received. status:",f.status,"response:",f.responseText);let m=null;if(f.status>=200&&f.status<300){try{m=Ss(f.responseText)}catch{et("Failed to parse JSON response for "+d+": "+f.responseText)}s(null,m)}else f.status!==401&&f.status!==404&&et("Got unsuccessful REST response for "+d+" Status: "+f.status),s(f.status);s=null}},f.open("GET",d,!0),f.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q0{constructor(){this.rootNode_=G.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(){return{value:null,children:new Map}}function Ei(i,e,n){if(J(e))i.value=n,i.children.clear();else if(i.value!==null)i.value=i.value.updateChild(e,n);else{const s=Y(e);i.children.has(s)||i.children.set(s,yl());const l=i.children.get(s);e=de(e),Ei(l,e,n)}}function _c(i,e){if(J(e))return i.value=null,i.children.clear(),!0;if(i.value!==null){if(i.value.isLeafNode())return!1;{const n=i.value;return i.value=null,n.forEachChild(Ee,(s,l)=>{Ei(i,new ae(s),l)}),_c(i,e)}}else if(i.children.size>0){const n=Y(e);return e=de(e),i.children.has(n)&&_c(i.children.get(n),e)&&i.children.delete(n),i.children.size===0}else return!0}function vc(i,e,n){i.value!==null?n(e,i.value):q0(i,(s,l)=>{const u=new ae(e.toString()+"/"+s);vc(l,u,n)})}function q0(i,e){i.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y0{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&Be(this.last_,(s,l)=>{n[s]=n[s]-l}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm=10*1e3,X0=30*1e3,J0=300*1e3;class Z0{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Y0(e);const s=sm+(X0-sm)*Math.random();_s(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;Be(e,(l,u)=>{u>0&&Jt(this.statsToReport_,l)&&(n[l]=u,s=!0)}),s&&this.server_.reportStats(n),_s(this.reportStats_.bind(this),Math.floor(Math.random()*2*J0))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zt;(function(i){i[i.OVERWRITE=0]="OVERWRITE",i[i.MERGE=1]="MERGE",i[i.ACK_USER_WRITE=2]="ACK_USER_WRITE",i[i.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(zt||(zt={}));function Gc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Kc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Qc(i){return{fromUser:!1,fromServer:!0,queryId:i,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=zt.ACK_USER_WRITE,this.source=Gc()}operationForChild(e){if(J(this.path)){if(this.affectedTree.value!=null)return D(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new ae(e));return new wl(ie(),n,this.revert)}}else return D(Y(this.path)===e,"operationForChild called for unrelated child."),new wl(de(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,n){this.source=e,this.path=n,this.type=zt.LISTEN_COMPLETE}operationForChild(e){return J(this.path)?new As(this.source,ie()):new As(this.source,de(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=zt.OVERWRITE}operationForChild(e){return J(this.path)?new Sr(this.source,ie(),this.snap.getImmediateChild(e)):new Sr(this.source,de(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=zt.MERGE}operationForChild(e){if(J(this.path)){const n=this.children.subtree(new ae(e));return n.isEmpty()?null:n.value?new Sr(this.source,ie(),n.value):new fi(this.source,ie(),n)}else return D(Y(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new fi(this.source,de(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(J(e))return this.isFullyInitialized()&&!this.filtered_;const n=Y(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function tS(i,e,n,s){const l=[],u=[];return e.forEach(d=>{d.type==="child_changed"&&i.index_.indexedValueChanged(d.oldSnap,d.snapshotNode)&&u.push($0(d.childName,d.snapshotNode))}),fs(i,l,"child_removed",e,s,n),fs(i,l,"child_added",e,s,n),fs(i,l,"child_moved",u,s,n),fs(i,l,"child_changed",e,s,n),fs(i,l,"value",e,s,n),l}function fs(i,e,n,s,l,u){const d=s.filter(f=>f.type===n);d.sort((f,m)=>rS(i,f,m)),d.forEach(f=>{const m=nS(i,f,u);l.forEach(g=>{g.respondsTo(f.type)&&e.push(g.createEvent(m,i.query_))})})}function nS(i,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,i.index_)),e}function rS(i,e,n){if(e.childName==null||n.childName==null)throw _i("Should only compare child_ events.");const s=new Z(e.childName,e.snapshotNode),l=new Z(n.childName,n.snapshotNode);return i.index_.compare(s,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zl(i,e){return{eventCache:i,serverCache:e}}function vs(i,e,n,s){return zl(new Jn(e,n,s),i.serverCache)}function Dg(i,e,n,s){return zl(i.eventCache,new Jn(e,n,s))}function El(i){return i.eventCache.isFullyInitialized()?i.eventCache.getNode():null}function Cr(i){return i.serverCache.isFullyInitialized()?i.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ic;const iS=()=>(ic||(ic=new ht(BE)),ic);class pe{constructor(e,n=iS()){this.value=e,this.children=n}static fromObject(e){let n=new pe(null);return Be(e,(s,l)=>{n=n.set(new ae(s),l)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:ie(),value:this.value};if(J(e))return null;{const s=Y(e),l=this.children.get(s);if(l!==null){const u=l.findRootMostMatchingPathAndValue(de(e),n);return u!=null?{path:we(new ae(s),u.path),value:u.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(J(e))return this;{const n=Y(e),s=this.children.get(n);return s!==null?s.subtree(de(e)):new pe(null)}}set(e,n){if(J(e))return new pe(n,this.children);{const s=Y(e),u=(this.children.get(s)||new pe(null)).set(de(e),n),d=this.children.insert(s,u);return new pe(this.value,d)}}remove(e){if(J(e))return this.children.isEmpty()?new pe(null):new pe(null,this.children);{const n=Y(e),s=this.children.get(n);if(s){const l=s.remove(de(e));let u;return l.isEmpty()?u=this.children.remove(n):u=this.children.insert(n,l),this.value===null&&u.isEmpty()?new pe(null):new pe(this.value,u)}else return this}}get(e){if(J(e))return this.value;{const n=Y(e),s=this.children.get(n);return s?s.get(de(e)):null}}setTree(e,n){if(J(e))return n;{const s=Y(e),u=(this.children.get(s)||new pe(null)).setTree(de(e),n);let d;return u.isEmpty()?d=this.children.remove(s):d=this.children.insert(s,u),new pe(this.value,d)}}fold(e){return this.fold_(ie(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((l,u)=>{s[l]=u.fold_(we(e,l),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,ie(),n)}findOnPath_(e,n,s){const l=this.value?s(n,this.value):!1;if(l)return l;if(J(e))return null;{const u=Y(e),d=this.children.get(u);return d?d.findOnPath_(de(e),we(n,u),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,ie(),n)}foreachOnPath_(e,n,s){if(J(e))return this;{this.value&&s(n,this.value);const l=Y(e),u=this.children.get(l);return u?u.foreachOnPath_(de(e),we(n,l),s):new pe(null)}}foreach(e){this.foreach_(ie(),e)}foreach_(e,n){this.children.inorderTraversal((s,l)=>{l.foreach_(we(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e){this.writeTree_=e}static empty(){return new Wt(new pe(null))}}function ys(i,e,n){if(J(e))return new Wt(new pe(n));{const s=i.writeTree_.findRootMostValueAndPath(e);if(s!=null){const l=s.path;let u=s.value;const d=Ze(l,e);return u=u.updateChild(d,n),new Wt(i.writeTree_.set(l,u))}else{const l=new pe(n),u=i.writeTree_.setTree(e,l);return new Wt(u)}}}function yc(i,e,n){let s=i;return Be(n,(l,u)=>{s=ys(s,we(e,l),u)}),s}function om(i,e){if(J(e))return Wt.empty();{const n=i.writeTree_.setTree(e,new pe(null));return new Wt(n)}}function wc(i,e){return Pr(i,e)!=null}function Pr(i,e){const n=i.writeTree_.findRootMostValueAndPath(e);return n!=null?i.writeTree_.get(n.path).getChild(Ze(n.path,e)):null}function lm(i){const e=[],n=i.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(Ee,(s,l)=>{e.push(new Z(s,l))}):i.writeTree_.children.inorderTraversal((s,l)=>{l.value!=null&&e.push(new Z(s,l.value))}),e}function qn(i,e){if(J(e))return i;{const n=Pr(i,e);return n!=null?new Wt(new pe(n)):new Wt(i.writeTree_.subtree(e))}}function Ec(i){return i.writeTree_.isEmpty()}function pi(i,e){return xg(ie(),i.writeTree_,e)}function xg(i,e,n){if(e.value!=null)return n.updateChild(i,e.value);{let s=null;return e.children.inorderTraversal((l,u)=>{l===".priority"?(D(u.value!==null,"Priority writes must always be leaf nodes"),s=u.value):n=xg(we(i,l),u,n)}),!n.getChild(i).isEmpty()&&s!==null&&(n=n.updateChild(we(i,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(i,e){return Fg(e,i)}function sS(i,e,n,s,l){D(s>i.lastWriteId,"Stacking an older write on top of newer ones"),l===void 0&&(l=!0),i.allWrites.push({path:e,snap:n,writeId:s,visible:l}),l&&(i.visibleWrites=ys(i.visibleWrites,e,n)),i.lastWriteId=s}function oS(i,e,n,s){D(s>i.lastWriteId,"Stacking an older merge on top of newer ones"),i.allWrites.push({path:e,children:n,writeId:s,visible:!0}),i.visibleWrites=yc(i.visibleWrites,e,n),i.lastWriteId=s}function lS(i,e){for(let n=0;n<i.allWrites.length;n++){const s=i.allWrites[n];if(s.writeId===e)return s}return null}function aS(i,e){const n=i.allWrites.findIndex(f=>f.writeId===e);D(n>=0,"removeWrite called with nonexistent writeId.");const s=i.allWrites[n];i.allWrites.splice(n,1);let l=s.visible,u=!1,d=i.allWrites.length-1;for(;l&&d>=0;){const f=i.allWrites[d];f.visible&&(d>=n&&uS(f,s.path)?l=!1:Tt(s.path,f.path)&&(u=!0)),d--}if(l){if(u)return cS(i),!0;if(s.snap)i.visibleWrites=om(i.visibleWrites,s.path);else{const f=s.children;Be(f,m=>{i.visibleWrites=om(i.visibleWrites,we(s.path,m))})}return!0}else return!1}function uS(i,e){if(i.snap)return Tt(i.path,e);for(const n in i.children)if(i.children.hasOwnProperty(n)&&Tt(we(i.path,n),e))return!0;return!1}function cS(i){i.visibleWrites=Lg(i.allWrites,dS,ie()),i.allWrites.length>0?i.lastWriteId=i.allWrites[i.allWrites.length-1].writeId:i.lastWriteId=-1}function dS(i){return i.visible}function Lg(i,e,n){let s=Wt.empty();for(let l=0;l<i.length;++l){const u=i[l];if(e(u)){const d=u.path;let f;if(u.snap)Tt(n,d)?(f=Ze(n,d),s=ys(s,f,u.snap)):Tt(d,n)&&(f=Ze(d,n),s=ys(s,ie(),u.snap.getChild(f)));else if(u.children){if(Tt(n,d))f=Ze(n,d),s=yc(s,f,u.children);else if(Tt(d,n))if(f=Ze(d,n),J(f))s=yc(s,ie(),u.children);else{const m=ai(u.children,Y(f));if(m){const g=m.getChild(de(f));s=ys(s,ie(),g)}}}else throw _i("WriteRecord should have .snap or .children")}}return s}function Mg(i,e,n,s,l){if(!s&&!l){const u=Pr(i.visibleWrites,e);if(u!=null)return u;{const d=qn(i.visibleWrites,e);if(Ec(d))return n;if(n==null&&!wc(d,ie()))return null;{const f=n||G.EMPTY_NODE;return pi(d,f)}}}else{const u=qn(i.visibleWrites,e);if(!l&&Ec(u))return n;if(!l&&n==null&&!wc(u,ie()))return null;{const d=function(g){return(g.visible||l)&&(!s||!~s.indexOf(g.writeId))&&(Tt(g.path,e)||Tt(e,g.path))},f=Lg(i.allWrites,d,e),m=n||G.EMPTY_NODE;return pi(f,m)}}}function hS(i,e,n){let s=G.EMPTY_NODE;const l=Pr(i.visibleWrites,e);if(l)return l.isLeafNode()||l.forEachChild(Ee,(u,d)=>{s=s.updateImmediateChild(u,d)}),s;if(n){const u=qn(i.visibleWrites,e);return n.forEachChild(Ee,(d,f)=>{const m=pi(qn(u,new ae(d)),f);s=s.updateImmediateChild(d,m)}),lm(u).forEach(d=>{s=s.updateImmediateChild(d.name,d.node)}),s}else{const u=qn(i.visibleWrites,e);return lm(u).forEach(d=>{s=s.updateImmediateChild(d.name,d.node)}),s}}function fS(i,e,n,s,l){D(s||l,"Either existingEventSnap or existingServerSnap must exist");const u=we(e,n);if(wc(i.visibleWrites,u))return null;{const d=qn(i.visibleWrites,u);return Ec(d)?l.getChild(n):pi(d,l.getChild(n))}}function pS(i,e,n,s){const l=we(e,n),u=Pr(i.visibleWrites,l);if(u!=null)return u;if(s.isCompleteForChild(n)){const d=qn(i.visibleWrites,l);return pi(d,s.getNode().getImmediateChild(n))}else return null}function mS(i,e){return Pr(i.visibleWrites,e)}function gS(i,e,n,s,l,u,d){let f;const m=qn(i.visibleWrites,e),g=Pr(m,ie());if(g!=null)f=g;else if(n!=null)f=pi(m,n);else return[];if(f=f.withIndex(d),!f.isEmpty()&&!f.isLeafNode()){const S=[],E=d.getCompare(),T=u?f.getReverseIteratorFrom(s,d):f.getIteratorFrom(s,d);let x=T.getNext();for(;x&&S.length<l;)E(x,s)!==0&&S.push(x),x=T.getNext();return S}else return[]}function _S(){return{visibleWrites:Wt.empty(),allWrites:[],lastWriteId:-1}}function Sl(i,e,n,s){return Mg(i.writeTree,i.treePath,e,n,s)}function qc(i,e){return hS(i.writeTree,i.treePath,e)}function am(i,e,n,s){return fS(i.writeTree,i.treePath,e,n,s)}function Cl(i,e){return mS(i.writeTree,we(i.treePath,e))}function vS(i,e,n,s,l,u){return gS(i.writeTree,i.treePath,e,n,s,l,u)}function Yc(i,e,n){return pS(i.writeTree,i.treePath,e,n)}function bg(i,e){return Fg(we(i.treePath,e),i.writeTree)}function Fg(i,e){return{treePath:i,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yS{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;D(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),D(s!==".priority","Only non-priority child changes can be tracked.");const l=this.changeMap.get(s);if(l){const u=l.type;if(n==="child_added"&&u==="child_removed")this.changeMap.set(s,Rs(s,e.snapshotNode,l.snapshotNode));else if(n==="child_removed"&&u==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&u==="child_changed")this.changeMap.set(s,Ns(s,l.oldSnap));else if(n==="child_changed"&&u==="child_added")this.changeMap.set(s,hi(s,e.snapshotNode));else if(n==="child_changed"&&u==="child_changed")this.changeMap.set(s,Rs(s,e.snapshotNode,l.oldSnap));else throw _i("Illegal combination of changes: "+e+" occurred after "+l)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wS{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Ug=new wS;class Xc{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Jn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Yc(this.writes_,e,s)}}getChildAfterChild(e,n,s){const l=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Cr(this.viewCache_),u=vS(this.writes_,l,n,1,s,e);return u.length===0?null:u[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ES(i){return{filter:i}}function SS(i,e){D(e.eventCache.getNode().isIndexed(i.filter.getIndex()),"Event snap not indexed"),D(e.serverCache.getNode().isIndexed(i.filter.getIndex()),"Server snap not indexed")}function CS(i,e,n,s,l){const u=new yS;let d,f;if(n.type===zt.OVERWRITE){const g=n;g.source.fromUser?d=Sc(i,e,g.path,g.snap,s,l,u):(D(g.source.fromServer,"Unknown source."),f=g.source.tagged||e.serverCache.isFiltered()&&!J(g.path),d=Il(i,e,g.path,g.snap,s,l,f,u))}else if(n.type===zt.MERGE){const g=n;g.source.fromUser?d=TS(i,e,g.path,g.children,s,l,u):(D(g.source.fromServer,"Unknown source."),f=g.source.tagged||e.serverCache.isFiltered(),d=Cc(i,e,g.path,g.children,s,l,f,u))}else if(n.type===zt.ACK_USER_WRITE){const g=n;g.revert?d=RS(i,e,g.path,s,l,u):d=kS(i,e,g.path,g.affectedTree,s,l,u)}else if(n.type===zt.LISTEN_COMPLETE)d=NS(i,e,n.path,s,u);else throw _i("Unknown operation type: "+n.type);const m=u.getChanges();return IS(e,d,m),{viewCache:d,changes:m}}function IS(i,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const l=s.getNode().isLeafNode()||s.getNode().isEmpty(),u=El(i);(n.length>0||!i.eventCache.isFullyInitialized()||l&&!s.getNode().equals(u)||!s.getNode().getPriority().equals(u.getPriority()))&&n.push(Og(El(e)))}}function zg(i,e,n,s,l,u){const d=e.eventCache;if(Cl(s,n)!=null)return e;{let f,m;if(J(n))if(D(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const g=Cr(e),S=g instanceof G?g:G.EMPTY_NODE,E=qc(s,S);f=i.filter.updateFullNode(e.eventCache.getNode(),E,u)}else{const g=Sl(s,Cr(e));f=i.filter.updateFullNode(e.eventCache.getNode(),g,u)}else{const g=Y(n);if(g===".priority"){D(Xn(n)===1,"Can't have a priority with additional path components");const S=d.getNode();m=e.serverCache.getNode();const E=am(s,n,S,m);E!=null?f=i.filter.updatePriority(S,E):f=d.getNode()}else{const S=de(n);let E;if(d.isCompleteForChild(g)){m=e.serverCache.getNode();const T=am(s,n,d.getNode(),m);T!=null?E=d.getNode().getImmediateChild(g).updateChild(S,T):E=d.getNode().getImmediateChild(g)}else E=Yc(s,g,e.serverCache);E!=null?f=i.filter.updateChild(d.getNode(),g,E,S,l,u):f=d.getNode()}}return vs(e,f,d.isFullyInitialized()||J(n),i.filter.filtersNodes())}}function Il(i,e,n,s,l,u,d,f){const m=e.serverCache;let g;const S=d?i.filter:i.filter.getIndexedFilter();if(J(n))g=S.updateFullNode(m.getNode(),s,null);else if(S.filtersNodes()&&!m.isFiltered()){const x=m.getNode().updateChild(n,s);g=S.updateFullNode(m.getNode(),x,null)}else{const x=Y(n);if(!m.isCompleteForPath(n)&&Xn(n)>1)return e;const b=de(n),K=m.getNode().getImmediateChild(x).updateChild(b,s);x===".priority"?g=S.updatePriority(m.getNode(),K):g=S.updateChild(m.getNode(),x,K,b,Ug,null)}const E=Dg(e,g,m.isFullyInitialized()||J(n),S.filtersNodes()),T=new Xc(l,E,u);return zg(i,E,n,l,T,f)}function Sc(i,e,n,s,l,u,d){const f=e.eventCache;let m,g;const S=new Xc(l,e,u);if(J(n))g=i.filter.updateFullNode(e.eventCache.getNode(),s,d),m=vs(e,g,!0,i.filter.filtersNodes());else{const E=Y(n);if(E===".priority")g=i.filter.updatePriority(e.eventCache.getNode(),s),m=vs(e,g,f.isFullyInitialized(),f.isFiltered());else{const T=de(n),x=f.getNode().getImmediateChild(E);let b;if(J(T))b=s;else{const V=S.getCompleteChild(E);V!=null?Vc(T)===".priority"&&V.getChild(Ig(T)).isEmpty()?b=V:b=V.updateChild(T,s):b=G.EMPTY_NODE}if(x.equals(b))m=e;else{const V=i.filter.updateChild(f.getNode(),E,b,T,S,d);m=vs(e,V,f.isFullyInitialized(),i.filter.filtersNodes())}}}return m}function um(i,e){return i.eventCache.isCompleteForChild(e)}function TS(i,e,n,s,l,u,d){let f=e;return s.foreach((m,g)=>{const S=we(n,m);um(e,Y(S))&&(f=Sc(i,f,S,g,l,u,d))}),s.foreach((m,g)=>{const S=we(n,m);um(e,Y(S))||(f=Sc(i,f,S,g,l,u,d))}),f}function cm(i,e,n){return n.foreach((s,l)=>{e=e.updateChild(s,l)}),e}function Cc(i,e,n,s,l,u,d,f){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let m=e,g;J(n)?g=s:g=new pe(null).setTree(n,s);const S=e.serverCache.getNode();return g.children.inorderTraversal((E,T)=>{if(S.hasChild(E)){const x=e.serverCache.getNode().getImmediateChild(E),b=cm(i,x,T);m=Il(i,m,new ae(E),b,l,u,d,f)}}),g.children.inorderTraversal((E,T)=>{const x=!e.serverCache.isCompleteForChild(E)&&T.value===null;if(!S.hasChild(E)&&!x){const b=e.serverCache.getNode().getImmediateChild(E),V=cm(i,b,T);m=Il(i,m,new ae(E),V,l,u,d,f)}}),m}function kS(i,e,n,s,l,u,d){if(Cl(l,n)!=null)return e;const f=e.serverCache.isFiltered(),m=e.serverCache;if(s.value!=null){if(J(n)&&m.isFullyInitialized()||m.isCompleteForPath(n))return Il(i,e,n,m.getNode().getChild(n),l,u,f,d);if(J(n)){let g=new pe(null);return m.getNode().forEachChild(ii,(S,E)=>{g=g.set(new ae(S),E)}),Cc(i,e,n,g,l,u,f,d)}else return e}else{let g=new pe(null);return s.foreach((S,E)=>{const T=we(n,S);m.isCompleteForPath(T)&&(g=g.set(S,m.getNode().getChild(T)))}),Cc(i,e,n,g,l,u,f,d)}}function NS(i,e,n,s,l){const u=e.serverCache,d=Dg(e,u.getNode(),u.isFullyInitialized()||J(n),u.isFiltered());return zg(i,d,n,s,Ug,l)}function RS(i,e,n,s,l,u){let d;if(Cl(s,n)!=null)return e;{const f=new Xc(s,e,l),m=e.eventCache.getNode();let g;if(J(n)||Y(n)===".priority"){let S;if(e.serverCache.isFullyInitialized())S=Sl(s,Cr(e));else{const E=e.serverCache.getNode();D(E instanceof G,"serverChildren would be complete if leaf node"),S=qc(s,E)}S=S,g=i.filter.updateFullNode(m,S,u)}else{const S=Y(n);let E=Yc(s,S,e.serverCache);E==null&&e.serverCache.isCompleteForChild(S)&&(E=m.getImmediateChild(S)),E!=null?g=i.filter.updateChild(m,S,E,de(n),f,u):e.eventCache.getNode().hasChild(S)?g=i.filter.updateChild(m,S,G.EMPTY_NODE,de(n),f,u):g=m,g.isEmpty()&&e.serverCache.isFullyInitialized()&&(d=Sl(s,Cr(e)),d.isLeafNode()&&(g=i.filter.updateFullNode(g,d,u)))}return d=e.serverCache.isFullyInitialized()||Cl(s,ie())!=null,vs(e,g,d,i.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PS{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,l=new $c(s.getIndex()),u=K0(s);this.processor_=ES(u);const d=n.serverCache,f=n.eventCache,m=l.updateFullNode(G.EMPTY_NODE,d.getNode(),null),g=u.updateFullNode(G.EMPTY_NODE,f.getNode(),null),S=new Jn(m,d.isFullyInitialized(),l.filtersNodes()),E=new Jn(g,f.isFullyInitialized(),u.filtersNodes());this.viewCache_=zl(E,S),this.eventGenerator_=new eS(this.query_)}get query(){return this.query_}}function AS(i){return i.viewCache_.serverCache.getNode()}function OS(i){return El(i.viewCache_)}function DS(i,e){const n=Cr(i.viewCache_);return n&&(i.query._queryParams.loadsAllData()||!J(e)&&!n.getImmediateChild(Y(e)).isEmpty())?n.getChild(e):null}function dm(i){return i.eventRegistrations_.length===0}function xS(i,e){i.eventRegistrations_.push(e)}function hm(i,e,n){const s=[];if(n){D(e==null,"A cancel should cancel all event registrations.");const l=i.query._path;i.eventRegistrations_.forEach(u=>{const d=u.createCancelEvent(n,l);d&&s.push(d)})}if(e){let l=[];for(let u=0;u<i.eventRegistrations_.length;++u){const d=i.eventRegistrations_[u];if(!d.matches(e))l.push(d);else if(e.hasAnyCallback()){l=l.concat(i.eventRegistrations_.slice(u+1));break}}i.eventRegistrations_=l}else i.eventRegistrations_=[];return s}function fm(i,e,n,s){e.type===zt.MERGE&&e.source.queryId!==null&&(D(Cr(i.viewCache_),"We should always have a full cache before handling merges"),D(El(i.viewCache_),"Missing event cache, even though we have a server cache"));const l=i.viewCache_,u=CS(i.processor_,l,e,n,s);return SS(i.processor_,u.viewCache),D(u.viewCache.serverCache.isFullyInitialized()||!l.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),i.viewCache_=u.viewCache,Wg(i,u.changes,u.viewCache.eventCache.getNode(),null)}function LS(i,e){const n=i.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(Ee,(u,d)=>{s.push(hi(u,d))}),n.isFullyInitialized()&&s.push(Og(n.getNode())),Wg(i,s,n.getNode(),e)}function Wg(i,e,n,s){const l=s?[s]:i.eventRegistrations_;return tS(i.eventGenerator_,e,n,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tl;class Vg{constructor(){this.views=new Map}}function MS(i){D(!Tl,"__referenceConstructor has already been defined"),Tl=i}function bS(){return D(Tl,"Reference.ts has not been loaded"),Tl}function FS(i){return i.views.size===0}function Jc(i,e,n,s){const l=e.source.queryId;if(l!==null){const u=i.views.get(l);return D(u!=null,"SyncTree gave us an op for an invalid query."),fm(u,e,n,s)}else{let u=[];for(const d of i.views.values())u=u.concat(fm(d,e,n,s));return u}}function Bg(i,e,n,s,l){const u=e._queryIdentifier,d=i.views.get(u);if(!d){let f=Sl(n,l?s:null),m=!1;f?m=!0:s instanceof G?(f=qc(n,s),m=!1):(f=G.EMPTY_NODE,m=!1);const g=zl(new Jn(f,m,!1),new Jn(s,l,!1));return new PS(e,g)}return d}function US(i,e,n,s,l,u){const d=Bg(i,e,s,l,u);return i.views.has(e._queryIdentifier)||i.views.set(e._queryIdentifier,d),xS(d,n),LS(d,n)}function zS(i,e,n,s){const l=e._queryIdentifier,u=[];let d=[];const f=Zn(i);if(l==="default")for(const[m,g]of i.views.entries())d=d.concat(hm(g,n,s)),dm(g)&&(i.views.delete(m),g.query._queryParams.loadsAllData()||u.push(g.query));else{const m=i.views.get(l);m&&(d=d.concat(hm(m,n,s)),dm(m)&&(i.views.delete(l),m.query._queryParams.loadsAllData()||u.push(m.query)))}return f&&!Zn(i)&&u.push(new(bS())(e._repo,e._path)),{removed:u,events:d}}function Hg(i){const e=[];for(const n of i.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Yn(i,e){let n=null;for(const s of i.views.values())n=n||DS(s,e);return n}function jg(i,e){if(e._queryParams.loadsAllData())return Vl(i);{const s=e._queryIdentifier;return i.views.get(s)}}function $g(i,e){return jg(i,e)!=null}function Zn(i){return Vl(i)!=null}function Vl(i){for(const e of i.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kl;function WS(i){D(!kl,"__referenceConstructor has already been defined"),kl=i}function VS(){return D(kl,"Reference.ts has not been loaded"),kl}let BS=1;class pm{constructor(e){this.listenProvider_=e,this.syncPointTree_=new pe(null),this.pendingWriteTree_=_S(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Gg(i,e,n,s,l){return sS(i.pendingWriteTree_,e,n,s,l),l?Si(i,new Sr(Gc(),e,n)):[]}function HS(i,e,n,s){oS(i.pendingWriteTree_,e,n,s);const l=pe.fromObject(n);return Si(i,new fi(Gc(),e,l))}function jn(i,e,n=!1){const s=lS(i.pendingWriteTree_,e);if(aS(i.pendingWriteTree_,e)){let u=new pe(null);return s.snap!=null?u=u.set(ie(),!0):Be(s.children,d=>{u=u.set(new ae(d),!0)}),Si(i,new wl(s.path,u,n))}else return[]}function Fs(i,e,n){return Si(i,new Sr(Kc(),e,n))}function jS(i,e,n){const s=pe.fromObject(n);return Si(i,new fi(Kc(),e,s))}function $S(i,e){return Si(i,new As(Kc(),e))}function GS(i,e,n){const s=ed(i,n);if(s){const l=td(s),u=l.path,d=l.queryId,f=Ze(u,e),m=new As(Qc(d),f);return nd(i,u,m)}else return[]}function Nl(i,e,n,s,l=!1){const u=e._path,d=i.syncPointTree_.get(u);let f=[];if(d&&(e._queryIdentifier==="default"||$g(d,e))){const m=zS(d,e,n,s);FS(d)&&(i.syncPointTree_=i.syncPointTree_.remove(u));const g=m.removed;if(f=m.events,!l){const S=g.findIndex(T=>T._queryParams.loadsAllData())!==-1,E=i.syncPointTree_.findOnPath(u,(T,x)=>Zn(x));if(S&&!E){const T=i.syncPointTree_.subtree(u);if(!T.isEmpty()){const x=qS(T);for(let b=0;b<x.length;++b){const V=x[b],K=V.query,Pe=Yg(i,V);i.listenProvider_.startListening(ws(K),Os(i,K),Pe.hashFn,Pe.onComplete)}}}!E&&g.length>0&&!s&&(S?i.listenProvider_.stopListening(ws(e),null):g.forEach(T=>{const x=i.queryToTagMap.get(Bl(T));i.listenProvider_.stopListening(ws(T),x)}))}YS(i,g)}return f}function Kg(i,e,n,s){const l=ed(i,s);if(l!=null){const u=td(l),d=u.path,f=u.queryId,m=Ze(d,e),g=new Sr(Qc(f),m,n);return nd(i,d,g)}else return[]}function KS(i,e,n,s){const l=ed(i,s);if(l){const u=td(l),d=u.path,f=u.queryId,m=Ze(d,e),g=pe.fromObject(n),S=new fi(Qc(f),m,g);return nd(i,d,S)}else return[]}function Ic(i,e,n,s=!1){const l=e._path;let u=null,d=!1;i.syncPointTree_.foreachOnPath(l,(T,x)=>{const b=Ze(T,l);u=u||Yn(x,b),d=d||Zn(x)});let f=i.syncPointTree_.get(l);f?(d=d||Zn(f),u=u||Yn(f,ie())):(f=new Vg,i.syncPointTree_=i.syncPointTree_.set(l,f));let m;u!=null?m=!0:(m=!1,u=G.EMPTY_NODE,i.syncPointTree_.subtree(l).foreachChild((x,b)=>{const V=Yn(b,ie());V&&(u=u.updateImmediateChild(x,V))}));const g=$g(f,e);if(!g&&!e._queryParams.loadsAllData()){const T=Bl(e);D(!i.queryToTagMap.has(T),"View does not exist, but we have a tag");const x=XS();i.queryToTagMap.set(T,x),i.tagToQueryMap.set(x,T)}const S=Wl(i.pendingWriteTree_,l);let E=US(f,e,n,S,u,m);if(!g&&!d&&!s){const T=jg(f,e);E=E.concat(JS(i,e,T))}return E}function Zc(i,e,n){const l=i.pendingWriteTree_,u=i.syncPointTree_.findOnPath(e,(d,f)=>{const m=Ze(d,e),g=Yn(f,m);if(g)return g});return Mg(l,e,u,n,!0)}function QS(i,e){const n=e._path;let s=null;i.syncPointTree_.foreachOnPath(n,(g,S)=>{const E=Ze(g,n);s=s||Yn(S,E)});let l=i.syncPointTree_.get(n);l?s=s||Yn(l,ie()):(l=new Vg,i.syncPointTree_=i.syncPointTree_.set(n,l));const u=s!=null,d=u?new Jn(s,!0,!1):null,f=Wl(i.pendingWriteTree_,e._path),m=Bg(l,e,f,u?d.getNode():G.EMPTY_NODE,u);return OS(m)}function Si(i,e){return Qg(e,i.syncPointTree_,null,Wl(i.pendingWriteTree_,ie()))}function Qg(i,e,n,s){if(J(i.path))return qg(i,e,n,s);{const l=e.get(ie());n==null&&l!=null&&(n=Yn(l,ie()));let u=[];const d=Y(i.path),f=i.operationForChild(d),m=e.children.get(d);if(m&&f){const g=n?n.getImmediateChild(d):null,S=bg(s,d);u=u.concat(Qg(f,m,g,S))}return l&&(u=u.concat(Jc(l,i,s,n))),u}}function qg(i,e,n,s){const l=e.get(ie());n==null&&l!=null&&(n=Yn(l,ie()));let u=[];return e.children.inorderTraversal((d,f)=>{const m=n?n.getImmediateChild(d):null,g=bg(s,d),S=i.operationForChild(d);S&&(u=u.concat(qg(S,f,m,g)))}),l&&(u=u.concat(Jc(l,i,s,n))),u}function Yg(i,e){const n=e.query,s=Os(i,n);return{hashFn:()=>(AS(e)||G.EMPTY_NODE).hash(),onComplete:l=>{if(l==="ok")return s?GS(i,n._path,s):$S(i,n._path);{const u=$E(l,n);return Nl(i,n,null,u)}}}}function Os(i,e){const n=Bl(e);return i.queryToTagMap.get(n)}function Bl(i){return i._path.toString()+"$"+i._queryIdentifier}function ed(i,e){return i.tagToQueryMap.get(e)}function td(i){const e=i.indexOf("$");return D(e!==-1&&e<i.length-1,"Bad queryKey."),{queryId:i.substr(e+1),path:new ae(i.substr(0,e))}}function nd(i,e,n){const s=i.syncPointTree_.get(e);D(s,"Missing sync point for query tag that we're tracking");const l=Wl(i.pendingWriteTree_,e);return Jc(s,n,l,null)}function qS(i){return i.fold((e,n,s)=>{if(n&&Zn(n))return[Vl(n)];{let l=[];return n&&(l=Hg(n)),Be(s,(u,d)=>{l=l.concat(d)}),l}})}function ws(i){return i._queryParams.loadsAllData()&&!i._queryParams.isDefault()?new(VS())(i._repo,i._path):i}function YS(i,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const l=Bl(s),u=i.queryToTagMap.get(l);i.queryToTagMap.delete(l),i.tagToQueryMap.delete(u)}}}function XS(){return BS++}function JS(i,e,n){const s=e._path,l=Os(i,e),u=Yg(i,n),d=i.listenProvider_.startListening(ws(e),l,u.hashFn,u.onComplete),f=i.syncPointTree_.subtree(s);if(l)D(!Zn(f.value),"If we're adding a query, it shouldn't be shadowed");else{const m=f.fold((g,S,E)=>{if(!J(g)&&S&&Zn(S))return[Vl(S).query];{let T=[];return S&&(T=T.concat(Hg(S).map(x=>x.query))),Be(E,(x,b)=>{T=T.concat(b)}),T}});for(let g=0;g<m.length;++g){const S=m[g];i.listenProvider_.stopListening(ws(S),Os(i,S))}}return d}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new rd(n)}node(){return this.node_}}class id{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=we(this.path_,e);return new id(this.syncTree_,n)}node(){return Zc(this.syncTree_,this.path_)}}const ZS=function(i){return i=i||{},i.timestamp=i.timestamp||new Date().getTime(),i},mm=function(i,e,n){if(!i||typeof i!="object")return i;if(D(".sv"in i,"Unexpected leaf node or priority contents"),typeof i[".sv"]=="string")return eC(i[".sv"],e,n);if(typeof i[".sv"]=="object")return tC(i[".sv"],e);D(!1,"Unexpected server value: "+JSON.stringify(i,null,2))},eC=function(i,e,n){switch(i){case"timestamp":return n.timestamp;default:D(!1,"Unexpected server value: "+i)}},tC=function(i,e,n){i.hasOwnProperty("increment")||D(!1,"Unexpected server value: "+JSON.stringify(i,null,2));const s=i.increment;typeof s!="number"&&D(!1,"Unexpected increment value: "+s);const l=e.node();if(D(l!==null&&typeof l<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!l.isLeafNode())return s;const d=l.getValue();return typeof d!="number"?s:d+s},Xg=function(i,e,n,s){return sd(e,new id(n,i),s)},Jg=function(i,e,n){return sd(i,new rd(e),n)};function sd(i,e,n){const s=i.getPriority().val(),l=mm(s,e.getImmediateChild(".priority"),n);let u;if(i.isLeafNode()){const d=i,f=mm(d.getValue(),e,n);return f!==d.getValue()||l!==d.getPriority().val()?new ze(f,Ie(l)):i}else{const d=i;return u=d,l!==d.getPriority().val()&&(u=u.updatePriority(new ze(l))),d.forEachChild(Ee,(f,m)=>{const g=sd(m,e.getImmediateChild(f),n);g!==m&&(u=u.updateImmediateChild(f,g))}),u}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function ld(i,e){let n=e instanceof ae?e:new ae(e),s=i,l=Y(n);for(;l!==null;){const u=ai(s.node.children,l)||{children:{},childCount:0};s=new od(l,s,u),n=de(n),l=Y(n)}return s}function Ci(i){return i.node.value}function Zg(i,e){i.node.value=e,Tc(i)}function e_(i){return i.node.childCount>0}function nC(i){return Ci(i)===void 0&&!e_(i)}function Hl(i,e){Be(i.node.children,(n,s)=>{e(new od(n,i,s))})}function t_(i,e,n,s){n&&e(i),Hl(i,l=>{t_(l,e,!0)})}function rC(i,e,n){let s=i.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Us(i){return new ae(i.parent===null?i.name:Us(i.parent)+"/"+i.name)}function Tc(i){i.parent!==null&&iC(i.parent,i.name,i)}function iC(i,e,n){const s=nC(n),l=Jt(i.node.children,e);s&&l?(delete i.node.children[e],i.node.childCount--,Tc(i)):!s&&!l&&(i.node.children[e]=n.node,i.node.childCount++,Tc(i))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sC=/[\[\].#$\/\u0000-\u001F\u007F]/,oC=/[\[\].#$\u0000-\u001F\u007F]/,sc=10*1024*1024,ad=function(i){return typeof i=="string"&&i.length!==0&&!sC.test(i)},n_=function(i){return typeof i=="string"&&i.length!==0&&!oC.test(i)},lC=function(i){return i&&(i=i.replace(/^\/*\.info(\/|$)/,"/")),n_(i)},r_=function(i){return i===null||typeof i=="string"||typeof i=="number"&&!bl(i)||i&&typeof i=="object"&&Jt(i,".sv")},Rl=function(i,e,n,s){s&&e===void 0||jl(ui(i,"value"),e,n)},jl=function(i,e,n){const s=n instanceof ae?new T0(n,i):n;if(e===void 0)throw new Error(i+"contains undefined "+_r(s));if(typeof e=="function")throw new Error(i+"contains a function "+_r(s)+" with contents = "+e.toString());if(bl(e))throw new Error(i+"contains "+e.toString()+" "+_r(s));if(typeof e=="string"&&e.length>sc/3&&Ml(e)>sc)throw new Error(i+"contains a string greater than "+sc+" utf8 bytes "+_r(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let l=!1,u=!1;if(Be(e,(d,f)=>{if(d===".value")l=!0;else if(d!==".priority"&&d!==".sv"&&(u=!0,!ad(d)))throw new Error(i+" contains an invalid key ("+d+") "+_r(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);k0(s,d),jl(i,f,s),N0(s)}),l&&u)throw new Error(i+' contains ".value" child '+_r(s)+" in addition to actual children.")}},aC=function(i,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const u=ks(s);for(let d=0;d<u.length;d++)if(!(u[d]===".priority"&&d===u.length-1)){if(!ad(u[d]))throw new Error(i+"contains an invalid key ("+u[d]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(I0);let l=null;for(n=0;n<e.length;n++){if(s=e[n],l!==null&&Tt(l,s))throw new Error(i+"contains a path "+l.toString()+" that is ancestor of another path "+s.toString());l=s}},i_=function(i,e,n,s){const l=ui(i,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(l+" must be an object containing the children to replace.");const u=[];Be(e,(d,f)=>{const m=new ae(d);if(jl(l,f,we(n,m)),Vc(m)===".priority"&&!r_(f))throw new Error(l+"contains an invalid value for '"+m.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");u.push(m)}),aC(l,u)},uC=function(i,e,n){if(bl(e))throw new Error(ui(i,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!r_(e))throw new Error(ui(i,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},ud=function(i,e,n,s){if(!n_(n))throw new Error(ui(i,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},cC=function(i,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ud(i,e,n)},$n=function(i,e){if(Y(e)===".info")throw new Error(i+" failed = Can't modify data under /.info/")},dC=function(i,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ad(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!lC(n))throw new Error(ui(i,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hC{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function $l(i,e){let n=null;for(let s=0;s<e.length;s++){const l=e[s],u=l.getPath();n!==null&&!Bc(u,n.path)&&(i.eventLists_.push(n),n=null),n===null&&(n={events:[],path:u}),n.events.push(l)}n&&i.eventLists_.push(n)}function s_(i,e,n){$l(i,n),o_(i,s=>Bc(s,e))}function kt(i,e,n){$l(i,n),o_(i,s=>Tt(s,e)||Tt(e,s))}function o_(i,e){i.recursionDepth_++;let n=!0;for(let s=0;s<i.eventLists_.length;s++){const l=i.eventLists_[s];if(l){const u=l.path;e(u)?(fC(i.eventLists_[s]),i.eventLists_[s]=null):n=!1}}n&&(i.eventLists_=[]),i.recursionDepth_--}function fC(i){for(let e=0;e<i.events.length;e++){const n=i.events[e];if(n!==null){i.events[e]=null;const s=n.getEventRunner();gs&&Ve("event: "+n.toString()),wi(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pC="repo_interrupt",mC=25;class gC{constructor(e,n,s,l){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=l,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new hC,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=yl(),this.transactionQueueTree_=new od,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function _C(i,e,n){if(i.stats_=zc(i.repoInfo_),i.forceRestClient_||qE())i.server_=new vl(i.repoInfo_,(s,l,u,d)=>{gm(i,s,l,u,d)},i.authTokenProvider_,i.appCheckProvider_),setTimeout(()=>_m(i,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Le(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}i.persistentConnection_=new fn(i.repoInfo_,e,(s,l,u,d)=>{gm(i,s,l,u,d)},s=>{_m(i,s)},s=>{vC(i,s)},i.authTokenProvider_,i.appCheckProvider_,n),i.server_=i.persistentConnection_}i.authTokenProvider_.addTokenChangeListener(s=>{i.server_.refreshAuthToken(s)}),i.appCheckProvider_.addTokenChangeListener(s=>{i.server_.refreshAppCheckToken(s.token)}),i.statsReporter_=e0(i.repoInfo_,()=>new Z0(i.stats_,i.server_)),i.infoData_=new Q0,i.infoSyncTree_=new pm({startListening:(s,l,u,d)=>{let f=[];const m=i.infoData_.getNode(s._path);return m.isEmpty()||(f=Fs(i.infoSyncTree_,s._path,m),setTimeout(()=>{d("ok")},0)),f},stopListening:()=>{}}),cd(i,"connected",!1),i.serverSyncTree_=new pm({startListening:(s,l,u,d)=>(i.server_.listen(s,u,l,(f,m)=>{const g=d(f,m);kt(i.eventQueue_,s._path,g)}),[]),stopListening:(s,l)=>{i.server_.unlisten(s,l)}})}function l_(i){const n=i.infoData_.getNode(new ae(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Gl(i){return ZS({timestamp:l_(i)})}function gm(i,e,n,s,l){i.dataUpdateCount++;const u=new ae(e);n=i.interceptServerDataCallback_?i.interceptServerDataCallback_(e,n):n;let d=[];if(l)if(s){const m=fl(n,g=>Ie(g));d=KS(i.serverSyncTree_,u,m,l)}else{const m=Ie(n);d=Kg(i.serverSyncTree_,u,m,l)}else if(s){const m=fl(n,g=>Ie(g));d=jS(i.serverSyncTree_,u,m)}else{const m=Ie(n);d=Fs(i.serverSyncTree_,u,m)}let f=u;d.length>0&&(f=mi(i,u)),kt(i.eventQueue_,f,d)}function _m(i,e){cd(i,"connected",e),e===!1&&SC(i)}function vC(i,e){Be(e,(n,s)=>{cd(i,n,s)})}function cd(i,e,n){const s=new ae("/.info/"+e),l=Ie(n);i.infoData_.updateSnapshot(s,l);const u=Fs(i.infoSyncTree_,s,l);kt(i.eventQueue_,s,u)}function dd(i){return i.nextWriteId_++}function yC(i,e,n){const s=QS(i.serverSyncTree_,e);return s!=null?Promise.resolve(s):i.server_.get(e).then(l=>{const u=Ie(l).withIndex(e._queryParams.getIndex());Ic(i.serverSyncTree_,e,n,!0);let d;if(e._queryParams.loadsAllData())d=Fs(i.serverSyncTree_,e._path,u);else{const f=Os(i.serverSyncTree_,e);d=Kg(i.serverSyncTree_,e._path,u,f)}return kt(i.eventQueue_,e._path,d),Nl(i.serverSyncTree_,e,n,null,!0),u},l=>(zs(i,"get for query "+Le(e)+" failed: "+l),Promise.reject(new Error(l))))}function wC(i,e,n,s,l){zs(i,"set",{path:e.toString(),value:n,priority:s});const u=Gl(i),d=Ie(n,s),f=Zc(i.serverSyncTree_,e),m=Jg(d,f,u),g=dd(i),S=Gg(i.serverSyncTree_,e,m,g,!0);$l(i.eventQueue_,S),i.server_.put(e.toString(),d.val(!0),(T,x)=>{const b=T==="ok";b||et("set at "+e+" failed: "+T);const V=jn(i.serverSyncTree_,g,!b);kt(i.eventQueue_,e,V),er(i,l,T,x)});const E=fd(i,e);mi(i,E),kt(i.eventQueue_,E,[])}function EC(i,e,n,s){zs(i,"update",{path:e.toString(),value:n});let l=!0;const u=Gl(i),d={};if(Be(n,(f,m)=>{l=!1,d[f]=Xg(we(e,f),Ie(m),i.serverSyncTree_,u)}),l)Ve("update() called with empty data.  Don't do anything."),er(i,s,"ok",void 0);else{const f=dd(i),m=HS(i.serverSyncTree_,e,d,f);$l(i.eventQueue_,m),i.server_.merge(e.toString(),n,(g,S)=>{const E=g==="ok";E||et("update at "+e+" failed: "+g);const T=jn(i.serverSyncTree_,f,!E),x=T.length>0?mi(i,e):e;kt(i.eventQueue_,x,T),er(i,s,g,S)}),Be(n,g=>{const S=fd(i,we(e,g));mi(i,S)}),kt(i.eventQueue_,e,[])}}function SC(i){zs(i,"onDisconnectEvents");const e=Gl(i),n=yl();vc(i.onDisconnect_,ie(),(l,u)=>{const d=Xg(l,u,i.serverSyncTree_,e);Ei(n,l,d)});let s=[];vc(n,ie(),(l,u)=>{s=s.concat(Fs(i.serverSyncTree_,l,u));const d=fd(i,l);mi(i,d)}),i.onDisconnect_=yl(),kt(i.eventQueue_,ie(),s)}function CC(i,e,n){i.server_.onDisconnectCancel(e.toString(),(s,l)=>{s==="ok"&&_c(i.onDisconnect_,e),er(i,n,s,l)})}function vm(i,e,n,s){const l=Ie(n);i.server_.onDisconnectPut(e.toString(),l.val(!0),(u,d)=>{u==="ok"&&Ei(i.onDisconnect_,e,l),er(i,s,u,d)})}function IC(i,e,n,s,l){const u=Ie(n,s);i.server_.onDisconnectPut(e.toString(),u.val(!0),(d,f)=>{d==="ok"&&Ei(i.onDisconnect_,e,u),er(i,l,d,f)})}function TC(i,e,n,s){if(hl(n)){Ve("onDisconnect().update() called with empty data.  Don't do anything."),er(i,s,"ok",void 0);return}i.server_.onDisconnectMerge(e.toString(),n,(l,u)=>{l==="ok"&&Be(n,(d,f)=>{const m=Ie(f);Ei(i.onDisconnect_,we(e,d),m)}),er(i,s,l,u)})}function kC(i,e,n){let s;Y(e._path)===".info"?s=Ic(i.infoSyncTree_,e,n):s=Ic(i.serverSyncTree_,e,n),s_(i.eventQueue_,e._path,s)}function kc(i,e,n){let s;Y(e._path)===".info"?s=Nl(i.infoSyncTree_,e,n):s=Nl(i.serverSyncTree_,e,n),s_(i.eventQueue_,e._path,s)}function NC(i){i.persistentConnection_&&i.persistentConnection_.interrupt(pC)}function zs(i,...e){let n="";i.persistentConnection_&&(n=i.persistentConnection_.id+":"),Ve(n,...e)}function er(i,e,n,s){e&&wi(()=>{if(n==="ok")e(null);else{const l=(n||"error").toUpperCase();let u=l;s&&(u+=": "+s);const d=new Error(u);d.code=l,e(d)}})}function a_(i,e,n){return Zc(i.serverSyncTree_,e,n)||G.EMPTY_NODE}function hd(i,e=i.transactionQueueTree_){if(e||Kl(i,e),Ci(e)){const n=c_(i,e);D(n.length>0,"Sending zero length transaction queue"),n.every(l=>l.status===0)&&RC(i,Us(e),n)}else e_(e)&&Hl(e,n=>{hd(i,n)})}function RC(i,e,n){const s=n.map(g=>g.currentWriteId),l=a_(i,e,s);let u=l;const d=l.hash();for(let g=0;g<n.length;g++){const S=n[g];D(S.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),S.status=1,S.retryCount++;const E=Ze(e,S.path);u=u.updateChild(E,S.currentOutputSnapshotRaw)}const f=u.val(!0),m=e;i.server_.put(m.toString(),f,g=>{zs(i,"transaction put response",{path:m.toString(),status:g});let S=[];if(g==="ok"){const E=[];for(let T=0;T<n.length;T++)n[T].status=2,S=S.concat(jn(i.serverSyncTree_,n[T].currentWriteId)),n[T].onComplete&&E.push(()=>n[T].onComplete(null,!0,n[T].currentOutputSnapshotResolved)),n[T].unwatcher();Kl(i,ld(i.transactionQueueTree_,e)),hd(i,i.transactionQueueTree_),kt(i.eventQueue_,e,S);for(let T=0;T<E.length;T++)wi(E[T])}else{if(g==="datastale")for(let E=0;E<n.length;E++)n[E].status===3?n[E].status=4:n[E].status=0;else{et("transaction at "+m.toString()+" failed: "+g);for(let E=0;E<n.length;E++)n[E].status=4,n[E].abortReason=g}mi(i,e)}},d)}function mi(i,e){const n=u_(i,e),s=Us(n),l=c_(i,n);return PC(i,l,s),s}function PC(i,e,n){if(e.length===0)return;const s=[];let l=[];const d=e.filter(f=>f.status===0).map(f=>f.currentWriteId);for(let f=0;f<e.length;f++){const m=e[f],g=Ze(n,m.path);let S=!1,E;if(D(g!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),m.status===4)S=!0,E=m.abortReason,l=l.concat(jn(i.serverSyncTree_,m.currentWriteId,!0));else if(m.status===0)if(m.retryCount>=mC)S=!0,E="maxretry",l=l.concat(jn(i.serverSyncTree_,m.currentWriteId,!0));else{const T=a_(i,m.path,d);m.currentInputSnapshot=T;const x=e[f].update(T.val());if(x!==void 0){jl("transaction failed: Data returned ",x,m.path);let b=Ie(x);typeof x=="object"&&x!=null&&Jt(x,".priority")||(b=b.updatePriority(T.getPriority()));const K=m.currentWriteId,Pe=Gl(i),Me=Jg(b,T,Pe);m.currentOutputSnapshotRaw=b,m.currentOutputSnapshotResolved=Me,m.currentWriteId=dd(i),d.splice(d.indexOf(K),1),l=l.concat(Gg(i.serverSyncTree_,m.path,Me,m.currentWriteId,m.applyLocally)),l=l.concat(jn(i.serverSyncTree_,K,!0))}else S=!0,E="nodata",l=l.concat(jn(i.serverSyncTree_,m.currentWriteId,!0))}kt(i.eventQueue_,n,l),l=[],S&&(e[f].status=2,(function(T){setTimeout(T,Math.floor(0))})(e[f].unwatcher),e[f].onComplete&&(E==="nodata"?s.push(()=>e[f].onComplete(null,!1,e[f].currentInputSnapshot)):s.push(()=>e[f].onComplete(new Error(E),!1,null))))}Kl(i,i.transactionQueueTree_);for(let f=0;f<s.length;f++)wi(s[f]);hd(i,i.transactionQueueTree_)}function u_(i,e){let n,s=i.transactionQueueTree_;for(n=Y(e);n!==null&&Ci(s)===void 0;)s=ld(s,n),e=de(e),n=Y(e);return s}function c_(i,e){const n=[];return d_(i,e,n),n.sort((s,l)=>s.order-l.order),n}function d_(i,e,n){const s=Ci(e);if(s)for(let l=0;l<s.length;l++)n.push(s[l]);Hl(e,l=>{d_(i,l,n)})}function Kl(i,e){const n=Ci(e);if(n){let s=0;for(let l=0;l<n.length;l++)n[l].status!==2&&(n[s]=n[l],s++);n.length=s,Zg(e,n.length>0?n:void 0)}Hl(e,s=>{Kl(i,s)})}function fd(i,e){const n=Us(u_(i,e)),s=ld(i.transactionQueueTree_,e);return rC(s,l=>{oc(i,l)}),oc(i,s),t_(s,l=>{oc(i,l)}),n}function oc(i,e){const n=Ci(e);if(n){const s=[];let l=[],u=-1;for(let d=0;d<n.length;d++)n[d].status===3||(n[d].status===1?(D(u===d-1,"All SENT items should be at beginning of queue."),u=d,n[d].status=3,n[d].abortReason="set"):(D(n[d].status===0,"Unexpected transaction status in abort"),n[d].unwatcher(),l=l.concat(jn(i.serverSyncTree_,n[d].currentWriteId,!0)),n[d].onComplete&&s.push(n[d].onComplete.bind(null,new Error("set"),!1,null))));u===-1?Zg(e,void 0):n.length=u+1,kt(i.eventQueue_,Us(e),l);for(let d=0;d<s.length;d++)wi(s[d])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AC(i){let e="";const n=i.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let l=n[s];try{l=decodeURIComponent(l.replace(/\+/g," "))}catch{}e+="/"+l}return e}function OC(i){const e={};i.charAt(0)==="?"&&(i=i.substring(1));for(const n of i.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):et(`Invalid query segment '${n}' in query '${i}'`)}return e}const ym=function(i,e){const n=DC(i),s=n.namespace;n.domain==="firebase.com"&&gn(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&gn("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||WE();const l=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new mg(n.host,n.secure,s,l,e,"",s!==n.subdomain),path:new ae(n.pathString)}},DC=function(i){let e="",n="",s="",l="",u="",d=!0,f="https",m=443;if(typeof i=="string"){let g=i.indexOf("//");g>=0&&(f=i.substring(0,g-1),i=i.substring(g+2));let S=i.indexOf("/");S===-1&&(S=i.length);let E=i.indexOf("?");E===-1&&(E=i.length),e=i.substring(0,Math.min(S,E)),S<E&&(l=AC(i.substring(S,E)));const T=OC(i.substring(Math.min(i.length,E)));g=e.indexOf(":"),g>=0?(d=f==="https"||f==="wss",m=parseInt(e.substring(g+1),10)):g=e.length;const x=e.slice(0,g);if(x.toLowerCase()==="localhost")n="localhost";else if(x.split(".").length<=2)n=x;else{const b=e.indexOf(".");s=e.substring(0,b).toLowerCase(),n=e.substring(b+1),u=s}"ns"in T&&(u=T.ns)}return{host:e,port:m,domain:n,subdomain:s,secure:d,scheme:f,pathString:l,namespace:u}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",xC=(function(){let i=0;const e=[];return function(n){const s=n===i;i=n;let l;const u=new Array(8);for(l=7;l>=0;l--)u[l]=wm.charAt(n%64),n=Math.floor(n/64);D(n===0,"Cannot push at time == 0");let d=u.join("");if(s){for(l=11;l>=0&&e[l]===63;l--)e[l]=0;e[l]++}else for(l=0;l<12;l++)e[l]=Math.floor(Math.random()*64);for(l=0;l<12;l++)d+=wm.charAt(e[l]);return D(d.length===20,"nextPushId: Length should be 20."),d}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(e,n,s,l){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=l}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Le(this.snapshot.exportVal())}}class f_{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return D(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Yt;return CC(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){$n("OnDisconnect.remove",this._path);const e=new Yt;return vm(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){$n("OnDisconnect.set",this._path),Rl("OnDisconnect.set",e,this._path,!1);const n=new Yt;return vm(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){$n("OnDisconnect.setWithPriority",this._path),Rl("OnDisconnect.setWithPriority",e,this._path,!1),uC("OnDisconnect.setWithPriority",n);const s=new Yt;return IC(this._repo,this._path,e,n,s.wrapCallback(()=>{})),s.promise}update(e){$n("OnDisconnect.update",this._path),i_("OnDisconnect.update",e,this._path);const n=new Yt;return TC(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e,n,s,l){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=l}get key(){return J(this._path)?null:Vc(this._path)}get ref(){return new Bt(this._repo,this._path)}get _queryIdentifier(){const e=im(this._queryParams),n=Fc(e);return n==="{}"?"default":n}get _queryObject(){return im(this._queryParams)}isEqual(e){if(e=He(e),!(e instanceof Ql))return!1;const n=this._repo===e._repo,s=Bc(this._path,e._path),l=this._queryIdentifier===e._queryIdentifier;return n&&s&&l}toJSON(){return this.toString()}toString(){return this._repo.toString()+C0(this._path)}}class Bt extends Ql{constructor(e,n){super(e,n,new Ul,!1)}get parent(){const e=Ig(this._path);return e===null?null:new Bt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ir{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new ae(e),s=Tr(this.ref,e);return new Ir(this._node.getChild(n),s,Ee)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,l)=>e(new Ir(l,Tr(this.ref,s),Ee)))}hasChild(e){const n=new ae(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function LC(i,e){return i=He(i),i._checkNotDeleted("ref"),e!==void 0?Tr(i._root,e):i._root}function Tr(i,e){return i=He(i),Y(i._path)===null?cC("child","path",e):ud("child","path",e),new Bt(i._repo,we(i._path,e))}function MC(i){return i=He(i),new p_(i._repo,i._path)}function bC(i,e){i=He(i),$n("push",i._path),Rl("push",e,i._path,!0);const n=l_(i._repo),s=xC(n),l=Tr(i,s),u=Tr(i,s);let d;return e!=null?d=md(u,e).then(()=>u):d=Promise.resolve(u),l.then=d.then.bind(d),l.catch=d.then.bind(d,void 0),l}function FC(i){return $n("remove",i._path),md(i,null)}function md(i,e){i=He(i),$n("set",i._path),Rl("set",e,i._path,!1);const n=new Yt;return wC(i._repo,i._path,e,null,n.wrapCallback(()=>{})),n.promise}function UC(i,e){i_("update",e,i._path);const n=new Yt;return EC(i._repo,i._path,e,n.wrapCallback(()=>{})),n.promise}function zC(i){i=He(i);const e=new pd(()=>{}),n=new Ws(e);return yC(i._repo,i,n).then(s=>new Ir(s,new Bt(i._repo,i._path),i._queryParams.getIndex()))}class Ws{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new h_("value",this,new Ir(e.snapshotNode,new Bt(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new f_(this,e,n):null}matches(e){return e instanceof Ws?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class gd{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new f_(this,e,n):null}createEvent(e,n){D(e.childName!=null,"Child events should have a childName.");const s=Tr(new Bt(n._repo,n._path),e.childName),l=n._queryParams.getIndex();return new h_(e.type,this,new Ir(e.snapshotNode,s,l),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof gd?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function WC(i,e,n,s,l){let u;if(typeof s=="object"&&(u=void 0,l=s),typeof s=="function"&&(u=s),l&&l.onlyOnce){const m=n,g=(S,E)=>{kc(i._repo,i,f),m(S,E)};g.userCallback=n.userCallback,g.context=n.context,n=g}const d=new pd(n,u||void 0),f=new Ws(d);return kC(i._repo,i,f),()=>kc(i._repo,i,f)}function VC(i,e,n,s){return WC(i,"value",e,n,s)}function BC(i,e,n){let s=null;const l=n?new pd(n):null;e==="value"?s=new Ws(l):e&&(s=new gd(e,l)),kc(i._repo,i,s)}MS(Bt);WS(Bt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HC="FIREBASE_DATABASE_EMULATOR_HOST",Nc={};let jC=!1;function $C(i,e,n,s){i.repoInfo_=new mg(`${e}:${n}`,!1,i.repoInfo_.namespace,i.repoInfo_.webSocketOnly,i.repoInfo_.nodeAdmin,i.repoInfo_.persistenceKey,i.repoInfo_.includeNamespaceInQueryParams,!0),s&&(i.authTokenProvider_=s)}function m_(i,e,n,s,l){let u=s||i.options.databaseURL;u===void 0&&(i.options.projectId||gn("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ve("Using default host for project ",i.options.projectId),u=`${i.options.projectId}-default-rtdb.firebaseio.com`);let d=ym(u,l),f=d.repoInfo,m;typeof process<"u"&&Wp&&(m=Wp[HC]),m?(u=`http://${m}?ns=${f.namespace}`,d=ym(u,l),f=d.repoInfo):d.repoInfo.secure;const g=new XE(i.name,i.options,e);dC("Invalid Firebase Database URL",d),J(d.path)||gn("Database URL must point to the root of a Firebase Database (not including a child path).");const S=KC(f,i,g,new YE(i.name,n));return new g_(S,i)}function GC(i,e){const n=Nc[e];(!n||n[i.key]!==i)&&gn(`Database ${e}(${i.repoInfo_}) has already been deleted.`),NC(i),delete n[i.key]}function KC(i,e,n,s){let l=Nc[e.name];l||(l={},Nc[e.name]=l);let u=l[i.toURLString()];return u&&gn("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),u=new gC(i,jC,n,s),l[i.toURLString()]=u,u}class g_{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(_C(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Bt(this._repo,ie())),this._rootInternal}_delete(){return this._rootInternal!==null&&(GC(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&gn("Cannot call "+e+" on a deleted database.")}}function QC(i=Xm(),e){const n=bc(i,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=lw("database");s&&__(n,...s)}return n}function __(i,e,n,s={}){i=He(i),i._checkNotDeleted("useEmulator"),i._instanceStarted&&gn("Cannot call useEmulator() after instance has already been initialized.");const l=i._repoInternal;let u;if(l.repoInfo_.nodeAdmin)s.mockUserToken&&gn('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),u=new sl(sl.OWNER);else if(s.mockUserToken){const d=typeof s.mockUserToken=="string"?s.mockUserToken:aw(s.mockUserToken,i.app.options.projectId);u=new sl(d)}$C(l,e,n,u)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qC(i){tg(yi),ci(new wr("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),l=e.getProvider("auth-internal"),u=e.getProvider("app-check-internal");return m_(s,l,u,n)},"PUBLIC").setMultipleInstances(!0)),Qn(Vp,Bp,i),Qn(Vp,Bp,"esm2017")}fn.prototype.simpleListen=function(i,e){this.sendRequest("q",{p:i},e)};fn.prototype.echo=function(i,e){this.sendRequest("echo",{d:i},e)};qC();const dk=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:Ir,Database:g_,OnDisconnect:p_,_QueryImpl:Ql,_QueryParams:Ul,_ReferenceImpl:Bt,_repoManagerDatabaseFromApp:m_,_setSDKVersion:tg,_validatePathString:ud,_validateWritablePath:$n,child:Tr,connectDatabaseEmulator:__,get:zC,getDatabase:QC,off:BC,onDisconnect:MC,onValue:VC,push:bC,ref:LC,remove:FC,set:md,update:UC},Symbol.toStringTag,{value:"Module"}));function _d(i,e){var n={};for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&e.indexOf(s)<0&&(n[s]=i[s]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,s=Object.getOwnPropertySymbols(i);l<s.length;l++)e.indexOf(s[l])<0&&Object.prototype.propertyIsEnumerable.call(i,s[l])&&(n[s[l]]=i[s[l]]);return n}function v_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const YC=v_,y_=new xs("auth","Firebase",v_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl=new Lc("@firebase/auth");function XC(i,...e){Pl.logLevel<=ue.WARN&&Pl.warn(`Auth (${yi}): ${i}`,...e)}function ol(i,...e){Pl.logLevel<=ue.ERROR&&Pl.error(`Auth (${yi}): ${i}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(i,...e){throw yd(i,...e)}function Vt(i,...e){return yd(i,...e)}function vd(i,e,n){const s=Object.assign(Object.assign({},YC()),{[e]:n});return new xs("auth","Firebase",s).create(e,{appName:i.name})}function pn(i){return vd(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function JC(i,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&Nt(i,"argument-error"),vd(i,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function yd(i,...e){if(typeof i!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=i.name),i._errorFactory.create(n,...s)}return y_.create(i,...e)}function Q(i,e,...n){if(!i)throw yd(e,...n)}function cn(i){const e="INTERNAL ASSERTION FAILED: "+i;throw ol(e),new Error(e)}function _n(i,e){i||cn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rc(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.href)||""}function ZC(){return Em()==="http:"||Em()==="https:"}function Em(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ZC()||cw()||"connection"in navigator)?navigator.onLine:!0}function tI(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e,n){this.shortDelay=e,this.longDelay=n,_n(n>e,"Short delay should be less than long delay!"),this.isMobile=xc()||Km()}get(){return eI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wd(i,e){_n(i.emulator,"Emulator should always be set here");const{url:n}=i.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w_{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;cn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;cn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;cn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rI=new Vs(3e4,6e4);function vn(i,e){return i.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:i.tenantId}):e}async function Zt(i,e,n,s,l={}){return E_(i,l,async()=>{let u={},d={};s&&(e==="GET"?d=s:u={body:JSON.stringify(s)});const f=vi(Object.assign({key:i.config.apiKey},d)).slice(1),m=await i._getAdditionalHeaders();m["Content-Type"]="application/json",i.languageCode&&(m["X-Firebase-Locale"]=i.languageCode);const g=Object.assign({method:e,headers:m},u);return uw()||(g.referrerPolicy="no-referrer"),w_.fetch()(S_(i,i.config.apiHost,n,f),g)})}async function E_(i,e,n){i._canInitEmulator=!1;const s=Object.assign(Object.assign({},nI),e);try{const l=new sI(i),u=await Promise.race([n(),l.promise]);l.clearNetworkTimeout();const d=await u.json();if("needConfirmation"in d)throw il(i,"account-exists-with-different-credential",d);if(u.ok&&!("errorMessage"in d))return d;{const f=u.ok?d.errorMessage:d.error.message,[m,g]=f.split(" : ");if(m==="FEDERATED_USER_ID_ALREADY_LINKED")throw il(i,"credential-already-in-use",d);if(m==="EMAIL_EXISTS")throw il(i,"email-already-in-use",d);if(m==="USER_DISABLED")throw il(i,"user-disabled",d);const S=s[m]||m.toLowerCase().replace(/[_\s]+/g,"-");if(g)throw vd(i,S,g);Nt(i,S)}}catch(l){if(l instanceof tr)throw l;Nt(i,"network-request-failed",{message:String(l)})}}async function Bs(i,e,n,s,l={}){const u=await Zt(i,e,n,s,l);return"mfaPendingCredential"in u&&Nt(i,"multi-factor-auth-required",{_serverResponse:u}),u}function S_(i,e,n,s){const l=`${e}${n}?${s}`;return i.config.emulator?wd(i.config,l):`${i.config.apiScheme}://${l}`}function iI(i){switch(i){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class sI{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Vt(this.auth,"network-request-failed")),rI.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function il(i,e,n){const s={appName:i.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const l=Vt(i,e,s);return l.customData._tokenResponse=n,l}function Sm(i){return i!==void 0&&i.enterprise!==void 0}class oI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return iI(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function lI(i,e){return Zt(i,"GET","/v2/recaptchaConfig",vn(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aI(i,e){return Zt(i,"POST","/v1/accounts:delete",e)}async function C_(i,e){return Zt(i,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function uI(i,e=!1){const n=He(i),s=await n.getIdToken(e),l=Ed(s);Q(l&&l.exp&&l.auth_time&&l.iat,n.auth,"internal-error");const u=typeof l.firebase=="object"?l.firebase:void 0,d=u==null?void 0:u.sign_in_provider;return{claims:l,token:s,authTime:Es(lc(l.auth_time)),issuedAtTime:Es(lc(l.iat)),expirationTime:Es(lc(l.exp)),signInProvider:d||null,signInSecondFactor:(u==null?void 0:u.sign_in_second_factor)||null}}function lc(i){return Number(i)*1e3}function Ed(i){const[e,n,s]=i.split(".");if(e===void 0||n===void 0||s===void 0)return ol("JWT malformed, contained fewer than 3 sections"),null;try{const l=dl(n);return l?JSON.parse(l):(ol("Failed to decode base64 JWT payload"),null)}catch(l){return ol("Caught error parsing JWT payload as JSON",l==null?void 0:l.toString()),null}}function Cm(i){const e=Ed(i);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gi(i,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof tr&&cI(s)&&i.auth.currentUser===i&&await i.auth.signOut(),s}}function cI({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const l=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,l)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Es(this.lastLoginAt),this.creationTime=Es(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Al(i){var e;const n=i.auth,s=await i.getIdToken(),l=await gi(i,C_(n,{idToken:s}));Q(l==null?void 0:l.users.length,n,"internal-error");const u=l.users[0];i._notifyReloadListener(u);const d=!((e=u.providerUserInfo)===null||e===void 0)&&e.length?I_(u.providerUserInfo):[],f=fI(i.providerData,d),m=i.isAnonymous,g=!(i.email&&u.passwordHash)&&!(f!=null&&f.length),S=m?g:!1,E={uid:u.localId,displayName:u.displayName||null,photoURL:u.photoUrl||null,email:u.email||null,emailVerified:u.emailVerified||!1,phoneNumber:u.phoneNumber||null,tenantId:u.tenantId||null,providerData:f,metadata:new Pc(u.createdAt,u.lastLoginAt),isAnonymous:S};Object.assign(i,E)}async function hI(i){const e=He(i);await Al(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function fI(i,e){return[...i.filter(s=>!e.some(l=>l.providerId===s.providerId)),...e]}function I_(i){return i.map(e=>{var{providerId:n}=e,s=_d(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pI(i,e){const n=await E_(i,{},async()=>{const s=vi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:l,apiKey:u}=i.config,d=S_(i,l,"/v1/token",`key=${u}`),f=await i._getAdditionalHeaders();return f["Content-Type"]="application/x-www-form-urlencoded",w_.fetch()(d,{method:"POST",headers:f,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function mI(i,e){return Zt(i,"POST","/v2/accounts:revokeToken",vn(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Cm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const n=Cm(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:l,expiresIn:u}=await pI(e,n);this.updateTokensAndExpiration(s,l,Number(u))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:l,expirationTime:u}=n,d=new si;return s&&(Q(typeof s=="string","internal-error",{appName:e}),d.refreshToken=s),l&&(Q(typeof l=="string","internal-error",{appName:e}),d.accessToken=l),u&&(Q(typeof u=="number","internal-error",{appName:e}),d.expirationTime=u),d}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new si,this.toJSON())}_performRefresh(){return cn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zn(i,e){Q(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class dn{constructor(e){var{uid:n,auth:s,stsTokenManager:l}=e,u=_d(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new dI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=l,this.accessToken=l.accessToken,this.displayName=u.displayName||null,this.email=u.email||null,this.emailVerified=u.emailVerified||!1,this.phoneNumber=u.phoneNumber||null,this.photoURL=u.photoURL||null,this.isAnonymous=u.isAnonymous||!1,this.tenantId=u.tenantId||null,this.providerData=u.providerData?[...u.providerData]:[],this.metadata=new Pc(u.createdAt||void 0,u.lastLoginAt||void 0)}async getIdToken(e){const n=await gi(this,this.stsTokenManager.getToken(this.auth,e));return Q(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return uI(this,e)}reload(){return hI(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new dn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Al(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ut(this.auth.app))return Promise.reject(pn(this.auth));const e=await this.getIdToken();return await gi(this,aI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,l,u,d,f,m,g,S;const E=(s=n.displayName)!==null&&s!==void 0?s:void 0,T=(l=n.email)!==null&&l!==void 0?l:void 0,x=(u=n.phoneNumber)!==null&&u!==void 0?u:void 0,b=(d=n.photoURL)!==null&&d!==void 0?d:void 0,V=(f=n.tenantId)!==null&&f!==void 0?f:void 0,K=(m=n._redirectEventId)!==null&&m!==void 0?m:void 0,Pe=(g=n.createdAt)!==null&&g!==void 0?g:void 0,Me=(S=n.lastLoginAt)!==null&&S!==void 0?S:void 0,{uid:Ae,emailVerified:Te,isAnonymous:nt,providerData:Oe,stsTokenManager:je}=n;Q(Ae&&je,e,"internal-error");const rt=si.fromJSON(this.name,je);Q(typeof Ae=="string",e,"internal-error"),zn(E,e.name),zn(T,e.name),Q(typeof Te=="boolean",e,"internal-error"),Q(typeof nt=="boolean",e,"internal-error"),zn(x,e.name),zn(b,e.name),zn(V,e.name),zn(K,e.name),zn(Pe,e.name),zn(Me,e.name);const vt=new dn({uid:Ae,auth:e,email:T,emailVerified:Te,displayName:E,isAnonymous:nt,photoURL:b,phoneNumber:x,tenantId:V,stsTokenManager:rt,createdAt:Pe,lastLoginAt:Me});return Oe&&Array.isArray(Oe)&&(vt.providerData=Oe.map(Rt=>Object.assign({},Rt))),K&&(vt._redirectEventId=K),vt}static async _fromIdTokenResponse(e,n,s=!1){const l=new si;l.updateFromServerResponse(n);const u=new dn({uid:n.localId,auth:e,stsTokenManager:l,isAnonymous:s});return await Al(u),u}static async _fromGetAccountInfoResponse(e,n,s){const l=n.users[0];Q(l.localId!==void 0,"internal-error");const u=l.providerUserInfo!==void 0?I_(l.providerUserInfo):[],d=!(l.email&&l.passwordHash)&&!(u!=null&&u.length),f=new si;f.updateFromIdToken(s);const m=new dn({uid:l.localId,auth:e,stsTokenManager:f,isAnonymous:d}),g={uid:l.localId,displayName:l.displayName||null,photoURL:l.photoUrl||null,email:l.email||null,emailVerified:l.emailVerified||!1,phoneNumber:l.phoneNumber||null,tenantId:l.tenantId||null,providerData:u,metadata:new Pc(l.createdAt,l.lastLoginAt),isAnonymous:!(l.email&&l.passwordHash)&&!(u!=null&&u.length)};return Object.assign(m,g),m}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Im=new Map;function hn(i){_n(i instanceof Function,"Expected a class definition");let e=Im.get(i);return e?(_n(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,Im.set(i,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}T_.type="NONE";const Tm=T_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ll(i,e,n){return`firebase:${i}:${e}:${n}`}class oi{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:l,name:u}=this.auth;this.fullUserKey=ll(this.userKey,l.apiKey,u),this.fullPersistenceKey=ll("persistence",l.apiKey,u),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?dn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new oi(hn(Tm),e,s);const l=(await Promise.all(n.map(async g=>{if(await g._isAvailable())return g}))).filter(g=>g);let u=l[0]||hn(Tm);const d=ll(s,e.config.apiKey,e.name);let f=null;for(const g of n)try{const S=await g._get(d);if(S){const E=dn._fromJSON(e,S);g!==u&&(f=E),u=g;break}}catch{}const m=l.filter(g=>g._shouldAllowMigration);return!u._shouldAllowMigration||!m.length?new oi(u,e,s):(u=m[0],f&&await u._set(d,f.toJSON()),await Promise.all(n.map(async g=>{if(g!==u)try{await g._remove(d)}catch{}})),new oi(u,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function km(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(P_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(k_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(O_(e))return"Blackberry";if(D_(e))return"Webos";if(N_(e))return"Safari";if((e.includes("chrome/")||R_(e))&&!e.includes("edge/"))return"Chrome";if(A_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=i.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function k_(i=tt()){return/firefox\//i.test(i)}function N_(i=tt()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function R_(i=tt()){return/crios\//i.test(i)}function P_(i=tt()){return/iemobile/i.test(i)}function A_(i=tt()){return/android/i.test(i)}function O_(i=tt()){return/blackberry/i.test(i)}function D_(i=tt()){return/webos/i.test(i)}function Sd(i=tt()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function gI(i=tt()){var e;return Sd(i)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function _I(){return dw()&&document.documentMode===10}function x_(i=tt()){return Sd(i)||A_(i)||D_(i)||O_(i)||/windows phone/i.test(i)||P_(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L_(i,e=[]){let n;switch(i){case"Browser":n=km(tt());break;case"Worker":n=`${km(tt())}-${i}`;break;default:n=i}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${yi}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=u=>new Promise((d,f)=>{try{const m=e(u);d(m)}catch(m){f(m)}});s.onAbort=n,this.queue.push(s);const l=this.queue.length-1;return()=>{this.queue[l]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const l of n)try{l()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yI(i,e={}){return Zt(i,"GET","/v2/passwordPolicy",vn(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wI=6;class EI{constructor(e){var n,s,l,u;const d=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=d.minPasswordLength)!==null&&n!==void 0?n:wI,d.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=d.maxPasswordLength),d.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=d.containsLowercaseCharacter),d.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=d.containsUppercaseCharacter),d.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=d.containsNumericCharacter),d.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=d.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(l=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&l!==void 0?l:"",this.forceUpgradeOnSignin=(u=e.forceUpgradeOnSignin)!==null&&u!==void 0?u:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,s,l,u,d,f;const m={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,m),this.validatePasswordCharacterOptions(e,m),m.isValid&&(m.isValid=(n=m.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),m.isValid&&(m.isValid=(s=m.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),m.isValid&&(m.isValid=(l=m.containsLowercaseLetter)!==null&&l!==void 0?l:!0),m.isValid&&(m.isValid=(u=m.containsUppercaseLetter)!==null&&u!==void 0?u:!0),m.isValid&&(m.isValid=(d=m.containsNumericCharacter)!==null&&d!==void 0?d:!0),m.isValid&&(m.isValid=(f=m.containsNonAlphanumericCharacter)!==null&&f!==void 0?f:!0),m}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,l=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),l&&(n.meetsMaxPasswordLength=e.length<=l)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let l=0;l<e.length;l++)s=e.charAt(l),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,l,u){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=l)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SI{constructor(e,n,s,l){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=l,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Nm(this),this.idTokenSubscription=new Nm(this),this.beforeStateQueue=new vI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=y_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=l.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=hn(n)),this._initializationPromise=this.queue(async()=>{var s,l;if(!this._deleted&&(this.persistenceManager=await oi.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((l=this.currentUser)===null||l===void 0?void 0:l.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await C_(this,{idToken:e}),s=await dn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Ut(this.app)){const d=this.app.settings.authIdToken;return d?new Promise(f=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(d).then(f,f))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let l=s,u=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const d=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,f=l==null?void 0:l._redirectEventId,m=await this.tryRedirectSignIn(e);(!d||d===f)&&(m!=null&&m.user)&&(l=m.user,u=!0)}if(!l)return this.directlySetCurrentUser(null);if(!l._redirectEventId){if(u)try{await this.beforeStateQueue.runMiddleware(l)}catch(d){l=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(d))}return l?this.reloadAndSetCurrentUserOrClear(l):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===l._redirectEventId?this.directlySetCurrentUser(l):this.reloadAndSetCurrentUserOrClear(l)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Al(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=tI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ut(this.app))return Promise.reject(pn(this));const n=e?He(e):null;return n&&Q(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ut(this.app)?Promise.reject(pn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ut(this.app)?Promise.reject(pn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(hn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await yI(this),n=new EI(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new xs("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await mI(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&hn(e)||this._popupRedirectResolver;Q(n,this,"argument-error"),this.redirectPersistenceManager=await oi.create(this,[hn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,l){if(this._deleted)return()=>{};const u=typeof n=="function"?n:n.next.bind(n);let d=!1;const f=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(f,this,"internal-error"),f.then(()=>{d||u(this.currentUser)}),typeof n=="function"){const m=e.addObserver(n,s,l);return()=>{d=!0,m()}}else{const m=e.addObserver(n);return()=>{d=!0,m()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=L_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(n["X-Firebase-Client"]=s);const l=await this._getAppCheckToken();return l&&(n["X-Firebase-AppCheck"]=l),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&XC(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function yn(i){return He(i)}class Nm{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ew(n=>this.observer=n)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ql={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function CI(i){ql=i}function M_(i){return ql.loadJS(i)}function II(){return ql.recaptchaEnterpriseScript}function TI(){return ql.gapiScript}function kI(i){return`__${i}${Math.floor(Math.random()*1e6)}`}const NI="recaptcha-enterprise",RI="NO_RECAPTCHA";class PI{constructor(e){this.type=NI,this.auth=yn(e)}async verify(e="verify",n=!1){async function s(u){if(!n){if(u.tenantId==null&&u._agentRecaptchaConfig!=null)return u._agentRecaptchaConfig.siteKey;if(u.tenantId!=null&&u._tenantRecaptchaConfigs[u.tenantId]!==void 0)return u._tenantRecaptchaConfigs[u.tenantId].siteKey}return new Promise(async(d,f)=>{lI(u,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(m=>{if(m.recaptchaKey===void 0)f(new Error("recaptcha Enterprise site key undefined"));else{const g=new oI(m);return u.tenantId==null?u._agentRecaptchaConfig=g:u._tenantRecaptchaConfigs[u.tenantId]=g,d(g.siteKey)}}).catch(m=>{f(m)})})}function l(u,d,f){const m=window.grecaptcha;Sm(m)?m.enterprise.ready(()=>{m.enterprise.execute(u,{action:e}).then(g=>{d(g)}).catch(()=>{d(RI)})}):f(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((u,d)=>{s(this.auth).then(f=>{if(!n&&Sm(window.grecaptcha))l(f,u,d);else{if(typeof window>"u"){d(new Error("RecaptchaVerifier is only supported in browser"));return}let m=II();m.length!==0&&(m+=f),M_(m).then(()=>{l(f,u,d)}).catch(g=>{d(g)})}}).catch(f=>{d(f)})})}}async function Rm(i,e,n,s=!1){const l=new PI(i);let u;try{u=await l.verify(n)}catch{u=await l.verify(n,!0)}const d=Object.assign({},e);return s?Object.assign(d,{captchaResp:u}):Object.assign(d,{captchaResponse:u}),Object.assign(d,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(d,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),d}async function Ol(i,e,n,s){var l;if(!((l=i._getRecaptchaConfig())===null||l===void 0)&&l.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const u=await Rm(i,e,n,n==="getOobCode");return s(i,u)}else return s(i,e).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const d=await Rm(i,e,n,n==="getOobCode");return s(i,d)}else return Promise.reject(u)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AI(i,e){const n=bc(i,"auth");if(n.isInitialized()){const l=n.getImmediate(),u=n.getOptions();if(pl(u,e??{}))return l;Nt(l,"already-initialized")}return n.initialize({options:e})}function OI(i,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(hn);e!=null&&e.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function DI(i,e,n){const s=yn(i);Q(s._canInitEmulator,s,"emulator-config-failed"),Q(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const l=!1,u=b_(e),{host:d,port:f}=xI(e),m=f===null?"":`:${f}`;s.config.emulator={url:`${u}//${d}${m}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:d,port:f,protocol:u.replace(":",""),options:Object.freeze({disableWarnings:l})}),LI()}function b_(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function xI(i){const e=b_(i),n=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",l=/^(\[[^\]]+\])(:|$)/.exec(s);if(l){const u=l[1];return{host:u,port:Pm(s.substr(u.length+1))}}else{const[u,d]=s.split(":");return{host:u,port:Pm(d)}}}function Pm(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function LI(){function i(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return cn("not implemented")}_getIdTokenResponse(e){return cn("not implemented")}_linkToIdToken(e,n){return cn("not implemented")}_getReauthenticationResolver(e){return cn("not implemented")}}async function MI(i,e){return Zt(i,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bI(i,e){return Bs(i,"POST","/v1/accounts:signInWithPassword",vn(i,e))}async function FI(i,e){return Zt(i,"POST","/v1/accounts:sendOobCode",vn(i,e))}async function UI(i,e){return FI(i,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zI(i,e){return Bs(i,"POST","/v1/accounts:signInWithEmailLink",vn(i,e))}async function WI(i,e){return Bs(i,"POST","/v1/accounts:signInWithEmailLink",vn(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds extends Cd{constructor(e,n,s,l=null){super("password",s),this._email=e,this._password=n,this._tenantId=l}static _fromEmailAndPassword(e,n){return new Ds(e,n,"password")}static _fromEmailAndCode(e,n,s=null){return new Ds(e,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ol(e,n,"signInWithPassword",bI);case"emailLink":return zI(e,{email:this._email,oobCode:this._password});default:Nt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const s={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ol(e,s,"signUpPassword",MI);case"emailLink":return WI(e,{idToken:n,email:this._email,oobCode:this._password});default:Nt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function li(i,e){return Bs(i,"POST","/v1/accounts:signInWithIdp",vn(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VI="http://localhost";class kr extends Cd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new kr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Nt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:l}=n,u=_d(n,["providerId","signInMethod"]);if(!s||!l)return null;const d=new kr(s,l);return d.idToken=u.idToken||void 0,d.accessToken=u.accessToken||void 0,d.secret=u.secret,d.nonce=u.nonce,d.pendingToken=u.pendingToken||null,d}_getIdTokenResponse(e){const n=this.buildRequest();return li(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,li(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,li(e,n)}buildRequest(){const e={requestUri:VI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=vi(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BI(i){switch(i){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function HI(i){const e=ps(ms(i)).link,n=e?ps(ms(e)).deep_link_id:null,s=ps(ms(i)).deep_link_id;return(s?ps(ms(s)).link:null)||s||n||e||i}class Id{constructor(e){var n,s,l,u,d,f;const m=ps(ms(e)),g=(n=m.apiKey)!==null&&n!==void 0?n:null,S=(s=m.oobCode)!==null&&s!==void 0?s:null,E=BI((l=m.mode)!==null&&l!==void 0?l:null);Q(g&&S&&E,"argument-error"),this.apiKey=g,this.operation=E,this.code=S,this.continueUrl=(u=m.continueUrl)!==null&&u!==void 0?u:null,this.languageCode=(d=m.languageCode)!==null&&d!==void 0?d:null,this.tenantId=(f=m.tenantId)!==null&&f!==void 0?f:null}static parseLink(e){const n=HI(e);try{return new Id(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(){this.providerId=Ii.PROVIDER_ID}static credential(e,n){return Ds._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const s=Id.parseLink(n);return Q(s,"argument-error"),Ds._fromEmailAndCode(e,s.code,s.tenantId)}}Ii.PROVIDER_ID="password";Ii.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ii.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs extends Td{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn extends Hs{constructor(){super("facebook.com")}static credential(e){return kr._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wn.credential(e.oauthAccessToken)}catch{return null}}}Wn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn extends Hs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return kr._fromParams({providerId:Vn.PROVIDER_ID,signInMethod:Vn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Vn.credentialFromTaggedObject(e)}static credentialFromError(e){return Vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Vn.credential(n,s)}catch{return null}}}Vn.GOOGLE_SIGN_IN_METHOD="google.com";Vn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends Hs{constructor(){super("github.com")}static credential(e){return kr._fromParams({providerId:Bn.PROVIDER_ID,signInMethod:Bn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bn.credentialFromTaggedObject(e)}static credentialFromError(e){return Bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bn.credential(e.oauthAccessToken)}catch{return null}}}Bn.GITHUB_SIGN_IN_METHOD="github.com";Bn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn extends Hs{constructor(){super("twitter.com")}static credential(e,n){return kr._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Hn.credentialFromTaggedObject(e)}static credentialFromError(e){return Hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Hn.credential(n,s)}catch{return null}}}Hn.TWITTER_SIGN_IN_METHOD="twitter.com";Hn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jI(i,e){return Bs(i,"POST","/v1/accounts:signUp",vn(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,l=!1){const u=await dn._fromIdTokenResponse(e,s,l),d=Am(s);return new Nr({user:u,providerId:d,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const l=Am(s);return new Nr({user:e,providerId:l,_tokenResponse:s,operationType:n})}}function Am(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl extends tr{constructor(e,n,s,l){var u;super(n.code,n.message),this.operationType=s,this.user=l,Object.setPrototypeOf(this,Dl.prototype),this.customData={appName:e.name,tenantId:(u=e.tenantId)!==null&&u!==void 0?u:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,l){return new Dl(e,n,s,l)}}function F_(i,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(i):n._getIdTokenResponse(i)).catch(u=>{throw u.code==="auth/multi-factor-auth-required"?Dl._fromErrorAndOperation(i,u,e,s):u})}async function $I(i,e,n=!1){const s=await gi(i,e._linkToIdToken(i.auth,await i.getIdToken()),n);return Nr._forOperation(i,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GI(i,e,n=!1){const{auth:s}=i;if(Ut(s.app))return Promise.reject(pn(s));const l="reauthenticate";try{const u=await gi(i,F_(s,l,e,i),n);Q(u.idToken,s,"internal-error");const d=Ed(u.idToken);Q(d,s,"internal-error");const{sub:f}=d;return Q(i.uid===f,s,"user-mismatch"),Nr._forOperation(i,l,u)}catch(u){throw(u==null?void 0:u.code)==="auth/user-not-found"&&Nt(s,"user-mismatch"),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U_(i,e,n=!1){if(Ut(i.app))return Promise.reject(pn(i));const s="signIn",l=await F_(i,s,e),u=await Nr._fromIdTokenResponse(i,s,l);return n||await i._updateCurrentUser(u.user),u}async function KI(i,e){return U_(yn(i),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z_(i){const e=yn(i);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function hk(i,e,n){const s=yn(i);await Ol(s,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",UI)}async function fk(i,e,n){if(Ut(i.app))return Promise.reject(pn(i));const s=yn(i),d=await Ol(s,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",jI).catch(m=>{throw m.code==="auth/password-does-not-meet-requirements"&&z_(i),m}),f=await Nr._fromIdTokenResponse(s,"signIn",d);return await s._updateCurrentUser(f.user),f}function pk(i,e,n){return Ut(i.app)?Promise.reject(pn(i)):KI(He(i),Ii.credential(e,n)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&z_(i),s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QI(i,e){return Zt(i,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mk(i,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const s=He(i),u={idToken:await s.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},d=await gi(s,QI(s.auth,u));s.displayName=d.displayName||null,s.photoURL=d.photoUrl||null;const f=s.providerData.find(({providerId:m})=>m==="password");f&&(f.displayName=s.displayName,f.photoURL=s.photoURL),await s._updateTokensIfNecessary(d)}function qI(i,e,n,s){return He(i).onIdTokenChanged(e,n,s)}function YI(i,e,n){return He(i).beforeAuthStateChanged(e,n)}function gk(i,e,n,s){return He(i).onAuthStateChanged(e,n,s)}function _k(i){return He(i).signOut()}const xl="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(xl,"1"),this.storage.removeItem(xl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XI=1e3,JI=10;class V_ extends W_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=x_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),l=this.localCache[n];s!==l&&e(n,l,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((d,f,m)=>{this.notifyListeners(d,m)});return}const s=e.key;n?this.detachListener():this.stopPolling();const l=()=>{const d=this.storage.getItem(s);!n&&this.localCache[s]===d||this.notifyListeners(s,d)},u=this.storage.getItem(s);_I()&&u!==e.newValue&&e.newValue!==e.oldValue?setTimeout(l,JI):l()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const l of Array.from(s))l(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},XI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}V_.type="LOCAL";const ZI=V_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_ extends W_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}B_.type="SESSION";const H_=B_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eT(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(l=>l.isListeningto(e));if(n)return n;const s=new Yl(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:l,data:u}=n.data,d=this.handlersMap[l];if(!(d!=null&&d.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:l});const f=Array.from(d).map(async g=>g(n.origin,u)),m=await eT(f);n.ports[0].postMessage({status:"done",eventId:s,eventType:l,response:m})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Yl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kd(i="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return i+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const l=typeof MessageChannel<"u"?new MessageChannel:null;if(!l)throw new Error("connection_unavailable");let u,d;return new Promise((f,m)=>{const g=kd("",20);l.port1.start();const S=setTimeout(()=>{m(new Error("unsupported_event"))},s);d={messageChannel:l,onMessage(E){const T=E;if(T.data.eventId===g)switch(T.data.status){case"ack":clearTimeout(S),u=setTimeout(()=>{m(new Error("timeout"))},3e3);break;case"done":clearTimeout(u),f(T.data.response);break;default:clearTimeout(S),clearTimeout(u),m(new Error("invalid_response"));break}}},this.handlers.add(d),l.port1.addEventListener("message",d.onMessage),this.target.postMessage({eventType:e,eventId:g,data:n},[l.port2])}).finally(()=>{d&&this.removeMessageHandler(d)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(){return window}function nT(i){Xt().location.href=i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(){return typeof Xt().WorkerGlobalScope<"u"&&typeof Xt().importScripts=="function"}async function rT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function iT(){var i;return((i=navigator==null?void 0:navigator.serviceWorker)===null||i===void 0?void 0:i.controller)||null}function sT(){return j_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $_="firebaseLocalStorageDb",oT=1,Ll="firebaseLocalStorage",G_="fbase_key";class js{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Xl(i,e){return i.transaction([Ll],e?"readwrite":"readonly").objectStore(Ll)}function lT(){const i=indexedDB.deleteDatabase($_);return new js(i).toPromise()}function Ac(){const i=indexedDB.open($_,oT);return new Promise((e,n)=>{i.addEventListener("error",()=>{n(i.error)}),i.addEventListener("upgradeneeded",()=>{const s=i.result;try{s.createObjectStore(Ll,{keyPath:G_})}catch(l){n(l)}}),i.addEventListener("success",async()=>{const s=i.result;s.objectStoreNames.contains(Ll)?e(s):(s.close(),await lT(),e(await Ac()))})})}async function Om(i,e,n){const s=Xl(i,!0).put({[G_]:e,value:n});return new js(s).toPromise()}async function aT(i,e){const n=Xl(i,!1).get(e),s=await new js(n).toPromise();return s===void 0?null:s.value}function Dm(i,e){const n=Xl(i,!0).delete(e);return new js(n).toPromise()}const uT=800,cT=3;class K_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ac(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>cT)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return j_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Yl._getInstance(sT()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await rT(),!this.activeServiceWorker)return;this.sender=new tT(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((n=s[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||iT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ac();return await Om(e,xl,"1"),await Dm(e,xl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Om(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>aT(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Dm(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(l=>{const u=Xl(l,!1).getAll();return new js(u).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:l,value:u}of e)s.add(l),JSON.stringify(this.localCache[l])!==JSON.stringify(u)&&(this.notifyListeners(l,u),n.push(l));for(const l of Object.keys(this.localCache))this.localCache[l]&&!s.has(l)&&(this.notifyListeners(l,null),n.push(l));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const l of Array.from(s))l(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}K_.type="LOCAL";const dT=K_;new Vs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q_(i,e){return e?hn(e):(Q(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd extends Cd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return li(e,this._buildIdpRequest())}_linkToIdToken(e,n){return li(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return li(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function hT(i){return U_(i.auth,new Nd(i),i.bypassAuthState)}function fT(i){const{auth:e,user:n}=i;return Q(n,e,"internal-error"),GI(n,new Nd(i),i.bypassAuthState)}async function pT(i){const{auth:e,user:n}=i;return Q(n,e,"internal-error"),$I(n,new Nd(i),i.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(e,n,s,l,u=!1){this.auth=e,this.resolver=s,this.user=l,this.bypassAuthState=u,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:l,tenantId:u,error:d,type:f}=e;if(d){this.reject(d);return}const m={auth:this.auth,requestUri:n,sessionId:s,tenantId:u||void 0,postBody:l||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(f)(m))}catch(g){this.reject(g)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hT;case"linkViaPopup":case"linkViaRedirect":return pT;case"reauthViaPopup":case"reauthViaRedirect":return fT;default:Nt(this.auth,"internal-error")}}resolve(e){_n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mT=new Vs(2e3,1e4);async function vk(i,e,n){if(Ut(i.app))return Promise.reject(Vt(i,"operation-not-supported-in-this-environment"));const s=yn(i);JC(i,e,Td);const l=Q_(s,n);return new yr(s,"signInViaPopup",e,l).executeNotNull()}class yr extends q_{constructor(e,n,s,l,u){super(e,n,l,u),this.provider=s,this.authWindow=null,this.pollId=null,yr.currentPopupAction&&yr.currentPopupAction.cancel(),yr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){_n(this.filter.length===1,"Popup operations only handle one event");const e=kd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Vt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Vt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,yr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Vt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,mT.get())};e()}}yr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gT="pendingRedirect",al=new Map;class _T extends q_{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=al.get(this.auth._key());if(!e){try{const s=await vT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}al.set(this.auth._key(),e)}return this.bypassAuthState||al.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function vT(i,e){const n=ET(e),s=wT(i);if(!await s._isAvailable())return!1;const l=await s._get(n)==="true";return await s._remove(n),l}function yT(i,e){al.set(i._key(),e)}function wT(i){return hn(i._redirectPersistence)}function ET(i){return ll(gT,i.config.apiKey,i.name)}async function ST(i,e,n=!1){if(Ut(i.app))return Promise.reject(pn(i));const s=yn(i),l=Q_(s,e),d=await new _T(s,l,n).execute();return d&&!n&&(delete d.user._redirectEventId,await s._persistUserIfCurrent(d.user),await s._setRedirectUser(null,e)),d}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT=600*1e3;class IT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!TT(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!Y_(e)){const l=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(Vt(this.auth,l))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=CT&&this.cachedEventUids.clear(),this.cachedEventUids.has(xm(e))}saveEventToCache(e){this.cachedEventUids.add(xm(e)),this.lastProcessedEventTime=Date.now()}}function xm(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function Y_({type:i,error:e}){return i==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function TT(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Y_(i);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kT(i,e={}){return Zt(i,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,RT=/^https?/;async function PT(i){if(i.config.emulator)return;const{authorizedDomains:e}=await kT(i);for(const n of e)try{if(AT(n))return}catch{}Nt(i,"unauthorized-domain")}function AT(i){const e=Rc(),{protocol:n,hostname:s}=new URL(e);if(i.startsWith("chrome-extension://")){const d=new URL(i);return d.hostname===""&&s===""?n==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&d.hostname===s}if(!RT.test(n))return!1;if(NT.test(i))return s===i;const l=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+l+"|"+l+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OT=new Vs(3e4,6e4);function Lm(){const i=Xt().___jsl;if(i!=null&&i.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let n=0;n<i.CP.length;n++)i.CP[n]=null}}function DT(i){return new Promise((e,n)=>{var s,l,u;function d(){Lm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Lm(),n(Vt(i,"network-request-failed"))},timeout:OT.get()})}if(!((l=(s=Xt().gapi)===null||s===void 0?void 0:s.iframes)===null||l===void 0)&&l.Iframe)e(gapi.iframes.getContext());else if(!((u=Xt().gapi)===null||u===void 0)&&u.load)d();else{const f=kI("iframefcb");return Xt()[f]=()=>{gapi.load?d():n(Vt(i,"network-request-failed"))},M_(`${TI()}?onload=${f}`).catch(m=>n(m))}}).catch(e=>{throw ul=null,e})}let ul=null;function xT(i){return ul=ul||DT(i),ul}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LT=new Vs(5e3,15e3),MT="__/auth/iframe",bT="emulator/auth/iframe",FT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},UT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zT(i){const e=i.config;Q(e.authDomain,i,"auth-domain-config-required");const n=e.emulator?wd(e,bT):`https://${i.config.authDomain}/${MT}`,s={apiKey:e.apiKey,appName:i.name,v:yi},l=UT.get(i.config.apiHost);l&&(s.eid=l);const u=i._getFrameworks();return u.length&&(s.fw=u.join(",")),`${n}?${vi(s).slice(1)}`}async function WT(i){const e=await xT(i),n=Xt().gapi;return Q(n,i,"internal-error"),e.open({where:document.body,url:zT(i),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:FT,dontclear:!0},s=>new Promise(async(l,u)=>{await s.restyle({setHideOnLeave:!1});const d=Vt(i,"network-request-failed"),f=Xt().setTimeout(()=>{u(d)},LT.get());function m(){Xt().clearTimeout(f),l(s)}s.ping(m).then(m,()=>{u(d)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},BT=500,HT=600,jT="_blank",$T="http://localhost";class Mm{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function GT(i,e,n,s=BT,l=HT){const u=Math.max((window.screen.availHeight-l)/2,0).toString(),d=Math.max((window.screen.availWidth-s)/2,0).toString();let f="";const m=Object.assign(Object.assign({},VT),{width:s.toString(),height:l.toString(),top:u,left:d}),g=tt().toLowerCase();n&&(f=R_(g)?jT:n),k_(g)&&(e=e||$T,m.scrollbars="yes");const S=Object.entries(m).reduce((T,[x,b])=>`${T}${x}=${b},`,"");if(gI(g)&&f!=="_self")return KT(e||"",f),new Mm(null);const E=window.open(e||"",f,S);Q(E,i,"popup-blocked");try{E.focus()}catch{}return new Mm(E)}function KT(i,e){const n=document.createElement("a");n.href=i,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT="__/auth/handler",qT="emulator/auth/handler",YT=encodeURIComponent("fac");async function bm(i,e,n,s,l,u){Q(i.config.authDomain,i,"auth-domain-config-required"),Q(i.config.apiKey,i,"invalid-api-key");const d={apiKey:i.config.apiKey,appName:i.name,authType:n,redirectUrl:s,v:yi,eventId:l};if(e instanceof Td){e.setDefaultLanguage(i.languageCode),d.providerId=e.providerId||"",hl(e.getCustomParameters())||(d.customParameters=JSON.stringify(e.getCustomParameters()));for(const[S,E]of Object.entries({}))d[S]=E}if(e instanceof Hs){const S=e.getScopes().filter(E=>E!=="");S.length>0&&(d.scopes=S.join(","))}i.tenantId&&(d.tid=i.tenantId);const f=d;for(const S of Object.keys(f))f[S]===void 0&&delete f[S];const m=await i._getAppCheckToken(),g=m?`#${YT}=${encodeURIComponent(m)}`:"";return`${XT(i)}?${vi(f).slice(1)}${g}`}function XT({config:i}){return i.emulator?wd(i,qT):`https://${i.authDomain}/${QT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac="webStorageSupport";class JT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=H_,this._completeRedirectFn=ST,this._overrideRedirectResult=yT}async _openPopup(e,n,s,l){var u;_n((u=this.eventManagers[e._key()])===null||u===void 0?void 0:u.manager,"_initialize() not called before _openPopup()");const d=await bm(e,n,s,Rc(),l);return GT(e,d,kd())}async _openRedirect(e,n,s,l){await this._originValidation(e);const u=await bm(e,n,s,Rc(),l);return nT(u),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:l,promise:u}=this.eventManagers[n];return l?Promise.resolve(l):(_n(u,"If manager is not set, promise should be"),u)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await WT(e),s=new IT(e);return n.register("authEvent",l=>(Q(l==null?void 0:l.authEvent,e,"invalid-auth-event"),{status:s.onEvent(l.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(ac,{type:ac},l=>{var u;const d=(u=l==null?void 0:l[0])===null||u===void 0?void 0:u[ac];d!==void 0&&n(!!d),Nt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=PT(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return x_()||N_()||Sd()}}const ZT=JT;var Fm="@firebase/auth",Um="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tk(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function nk(i){ci(new wr("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),l=e.getProvider("heartbeat"),u=e.getProvider("app-check-internal"),{apiKey:d,authDomain:f}=s.options;Q(d&&!d.includes(":"),"invalid-api-key",{appName:s.name});const m={apiKey:d,authDomain:f,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:L_(i)},g=new SI(s,l,u,m);return OI(g,n),g},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),ci(new wr("auth-internal",e=>{const n=yn(e.getProvider("auth").getImmediate());return(s=>new ek(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qn(Fm,Um,tk(i)),Qn(Fm,Um,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rk=300,ik=Gm("authIdTokenMaxAge")||rk;let zm=null;const sk=i=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>ik)return;const l=n==null?void 0:n.token;zm!==l&&(zm=l,await fetch(i,{method:l?"POST":"DELETE",headers:l?{Authorization:`Bearer ${l}`}:{}}))};function yk(i=Xm()){const e=bc(i,"auth");if(e.isInitialized())return e.getImmediate();const n=AI(i,{popupRedirectResolver:ZT,persistence:[dT,ZI,H_]}),s=Gm("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const u=new URL(s,location.origin);if(location.origin===u.origin){const d=sk(u.toString());YI(n,d,()=>d(n.currentUser)),qI(n,f=>d(f))}}const l=jm("auth");return l&&DI(n,`http://${l}`),n}function ok(){var i,e;return(e=(i=document.getElementsByTagName("head"))===null||i===void 0?void 0:i[0])!==null&&e!==void 0?e:document}CI({loadJS(i){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",i),s.onload=e,s.onerror=l=>{const u=Vt("internal-error");u.customData=l,n(u)},s.type="text/javascript",s.charset="UTF-8",ok().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});nk("Browser");export{Vn as G,uk as a,ck as b,Xm as c,QC as d,yk as e,LC as f,ak as g,zC as h,CE as i,FC as j,vk as k,pk as l,fk as m,mk as n,VC as o,hk as p,gk as q,qy as r,md as s,_k as t,UC as u,lk as v,dk as w};
