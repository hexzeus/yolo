"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[880],{9621:function(e,t,n){n.r(t),n.d(t,{default:function(){return pe}});var r=n(4506),a=n(6540),l=n(4794),o=n(1083),u=n(8516),i=n(7159),s=n(3008);function c(e){const{theme:t}=(0,s.UQ)(),n=(0,u.NU)();return(0,a.useMemo)((()=>(0,i.UP)(t.direction,{...n,...e})),[e,t.direction,n])}var d=n(763),m=n(6287),p=n(5599),b=n(8539),f=n(133),v=n(5979),g=n(6272),h=n(8493),x=n(5915),y=n(1147),E=n(8340),N=n(6400),C=n(8855),k=n(4848),w=(0,C.R)(((e,t)=>(0,k.jsx)(N.B,{align:"center",...e,direction:"row",ref:t})));w.displayName="HStack";var S=n(3285),A=n(3352),I=n(4515),M=n(213),j=n(9857),_=(0,C.R)((function(e,t){const{borderLeftWidth:n,borderBottomWidth:r,borderTopWidth:a,borderRightWidth:l,borderWidth:o,borderStyle:u,borderColor:i,...s}=(0,A.Vl)("Divider",e),{className:c,orientation:d="horizontal",__css:m,...p}=(0,I.MN)(e),b={vertical:{borderLeftWidth:n||l||o||"1px",height:"100%"},horizontal:{borderBottomWidth:r||a||o||"1px",width:"100%"}};return(0,k.jsx)(M.B.hr,{ref:t,"aria-orientation":d,...p,__css:{...s,border:"0",borderColor:i,borderStyle:u,...b[d],...m},className:(0,j.cx)("chakra-divider",c)})}));_.displayName="Divider";var P=n(4393),R=e=>(0,k.jsx)(P.I,{viewBox:"0 0 24 24",...e,children:(0,k.jsx)("path",{fill:"currentColor",d:"M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"})}),D=e=>(0,k.jsx)(P.I,{viewBox:"0 0 24 24",...e,children:(0,k.jsx)("path",{fill:"currentColor",d:"M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"})});function H(e,t,n,r){(0,a.useEffect)((()=>{var a;if(!e.current||!r)return;const l=null!=(a=e.current.ownerDocument.defaultView)?a:window,o=Array.isArray(t)?t:[t],u=new l.MutationObserver((e=>{for(const t of e)"attributes"===t.type&&t.attributeName&&o.includes(t.attributeName)&&n(t)}));return u.observe(e.current,{attributes:!0,attributeFilter:o}),()=>u.disconnect()}))}var B=n(1295);var z=50,T=300;function F(e,t){const[n,r]=(0,a.useState)(!1),[l,o]=(0,a.useState)(null),[u,i]=(0,a.useState)(!0),s=(0,a.useRef)(null),c=()=>clearTimeout(s.current);!function(e,t){const n=(0,B.c)(e);(0,a.useEffect)((()=>{let e=null;const r=()=>n();return null!==t&&(e=window.setInterval(r,t)),()=>{e&&window.clearInterval(e)}}),[t,n])}((()=>{"increment"===l&&e(),"decrement"===l&&t()}),n?z:null);const d=(0,a.useCallback)((()=>{u&&e(),s.current=setTimeout((()=>{i(!1),r(!0),o("increment")}),T)}),[e,u]),m=(0,a.useCallback)((()=>{u&&t(),s.current=setTimeout((()=>{i(!1),r(!0),o("decrement")}),T)}),[t,u]),p=(0,a.useCallback)((()=>{i(!0),r(!1),c()}),[]);return(0,a.useEffect)((()=>()=>c()),[]),{up:d,down:m,stop:p,isSpinning:n}}function L(e,t){let n=function(e){const t=parseFloat(e);return"number"!=typeof t||Number.isNaN(t)?0:t}(e);const r=10**(null!=t?t:10);return n=Math.round(n*r)/r,t?n.toFixed(t):n.toString()}function O(e){if(!Number.isFinite(e))return 0;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n+=1;return n}function U(e={}){const{onChange:t,precision:n,defaultValue:r,value:l,step:o=1,min:u=Number.MIN_SAFE_INTEGER,max:i=Number.MAX_SAFE_INTEGER,keepWithinRange:s=!0}=e,c=(0,B.c)(t),[d,m]=(0,a.useState)((()=>{var e;return null==r?"":null!=(e=V(r,o,n))?e:""})),p=void 0!==l,b=p?l:d,f=W(q(b),o),v=null!=n?n:f,g=(0,a.useCallback)((e=>{e!==b&&(p||m(e.toString()),null==c||c(e.toString(),q(e)))}),[c,p,b]),h=(0,a.useCallback)((e=>{let t=e;return s&&(t=function(e,t,n){return null==e?e:(n<t&&console.warn("clamp: max cannot be less than min"),Math.min(Math.max(e,t),n))}(t,u,i)),L(t,v)}),[v,s,i,u]),x=(0,a.useCallback)(((e=o)=>{let t;t=""===b?q(e):q(b)+e,t=h(t),g(t)}),[h,o,g,b]),y=(0,a.useCallback)(((e=o)=>{let t;t=""===b?q(-e):q(b)-e,t=h(t),g(t)}),[h,o,g,b]),E=(0,a.useCallback)((()=>{var e;let t;t=null==r?"":null!=(e=V(r,o,n))?e:u,g(t)}),[r,n,o,g,u]),N=(0,a.useCallback)((e=>{var t;const n=null!=(t=V(e,o,v))?t:u;g(n)}),[v,o,g,u]),C=q(b);return{isOutOfRange:C>i||C<u,isAtMax:C===i,isAtMin:C===u,precision:v,value:b,valueAsNumber:C,update:g,reset:E,increment:x,decrement:y,clamp:h,cast:N,setValue:m}}function q(e){return parseFloat(e.toString().replace(/[^\w.-]+/g,""))}function W(e,t){return Math.max(O(t),O(e))}function V(e,t,n){const r=q(e);if(Number.isNaN(r))return;const a=W(r,t);return L(r,null!=n?n:a)}var K=n(8933),G=n(1600),$=n(6597),X=/^[Ee0-9+\-.]$/;function Q(e){return X.test(e)}function Y(e={}){const{focusInputOnChange:t=!0,clampValueOnBlur:n=!0,keepWithinRange:r=!0,min:l=Number.MIN_SAFE_INTEGER,max:o=Number.MAX_SAFE_INTEGER,step:u=1,isReadOnly:i,isDisabled:s,isRequired:c,isInvalid:d,pattern:m="[0-9]*(.[0-9]+)?",inputMode:p="decimal",allowMouseWheel:b,id:f,onChange:v,precision:g,name:h,"aria-describedby":x,"aria-label":y,"aria-labelledby":E,onFocus:N,onBlur:C,onInvalid:k,getAriaValueText:w,isValidCharacter:S,format:A,parse:I,...M}=e,_=(0,B.c)(N),P=(0,B.c)(C),R=(0,B.c)(k),D=(0,B.c)(null!=S?S:Q),z=(0,B.c)(w),T=U(e),{update:L,increment:O,decrement:q}=T,[W,V]=(0,a.useState)(!1),X=!(i||s),Y=(0,a.useRef)(null),Z=(0,a.useRef)(null),J=(0,a.useRef)(null),ee=(0,a.useRef)(null),te=(0,a.useCallback)((e=>e.split("").filter(D).join("")),[D]),ne=(0,a.useCallback)((e=>{var t;return null!=(t=null==I?void 0:I(e))?t:e}),[I]),re=(0,a.useCallback)((e=>{var t;return(null!=(t=null==A?void 0:A(e))?t:e).toString()}),[A]);(0,K.w)((()=>{(T.valueAsNumber>o||T.valueAsNumber<l)&&(null==R||R("rangeOverflow",re(T.value),T.valueAsNumber))}),[T.valueAsNumber,T.value,re,R]),(0,G.U)((()=>{if(!Y.current)return;if(Y.current.value!=T.value){const e=ne(Y.current.value);T.setValue(te(e))}}),[ne,te]);const ae=(0,a.useCallback)(((e=u)=>{X&&O(e)}),[O,X,u]),le=(0,a.useCallback)(((e=u)=>{X&&q(e)}),[q,X,u]),oe=F(ae,le);H(J,"disabled",oe.stop,oe.isSpinning),H(ee,"disabled",oe.stop,oe.isSpinning);const ue=(0,a.useCallback)((e=>{if(e.nativeEvent.isComposing)return;const t=ne(e.currentTarget.value);L(te(t)),Z.current={start:e.currentTarget.selectionStart,end:e.currentTarget.selectionEnd}}),[L,te,ne]),ie=(0,a.useCallback)((e=>{var t,n,r;null==_||_(e),Z.current&&(e.target.selectionStart=null!=(n=Z.current.start)?n:null==(t=e.currentTarget.value)?void 0:t.length,e.currentTarget.selectionEnd=null!=(r=Z.current.end)?r:e.currentTarget.selectionStart)}),[_]),se=(0,a.useCallback)((e=>{if(e.nativeEvent.isComposing)return;(function(e,t){if(null==e.key)return!0;const n=e.ctrlKey||e.altKey||e.metaKey;return!(1===e.key.length&&!n)||t(e.key)})(e,D)||e.preventDefault();const t=ce(e)*u,n={ArrowUp:()=>ae(t),ArrowDown:()=>le(t),Home:()=>L(l),End:()=>L(o)}[e.key];n&&(e.preventDefault(),n(e))}),[D,u,ae,le,L,l,o]),ce=e=>{let t=1;return(e.metaKey||e.ctrlKey)&&(t=.1),e.shiftKey&&(t=10),t},de=(0,a.useMemo)((()=>{const e=null==z?void 0:z(T.value);if(null!=e)return e;const t=T.value.toString();return t||void 0}),[T.value,z]),me=(0,a.useCallback)((()=>{let e=T.value;if(""===T.value)return;/^[eE]/.test(T.value.toString())?T.setValue(""):(T.valueAsNumber<l&&(e=l),T.valueAsNumber>o&&(e=o),T.cast(e))}),[T,o,l]),pe=(0,a.useCallback)((()=>{V(!1),n&&me()}),[n,V,me]),be=(0,a.useCallback)((()=>{t&&requestAnimationFrame((()=>{var e;null==(e=Y.current)||e.focus()}))}),[t]),fe=(0,a.useCallback)((e=>{e.preventDefault(),oe.up(),be()}),[be,oe]),ve=(0,a.useCallback)((e=>{e.preventDefault(),oe.down(),be()}),[be,oe]);!function(e,t,n,r){const l=(0,B.c)(n);(0,a.useEffect)((()=>{const a="function"==typeof e?e():null!=e?e:document;if(n&&a)return a.addEventListener(t,l,r),()=>{a.removeEventListener(t,l,r)}}),[t,e,r,l,n])}((()=>Y.current),"wheel",(e=>{var t,n;const r=(null!=(n=null==(t=Y.current)?void 0:t.ownerDocument)?n:document).activeElement===Y.current;if(!b||!r)return;e.preventDefault();const a=ce(e)*u,l=Math.sign(e.deltaY);-1===l?ae(a):1===l&&le(a)}),{passive:!1});const ge=(0,a.useCallback)(((e={},t=null)=>{const n=s||r&&T.isAtMax;return{...e,ref:(0,$.Px)(t,J),role:"button",tabIndex:-1,onPointerDown:(0,j.Hj)(e.onPointerDown,(e=>{0!==e.button||n||fe(e)})),onPointerLeave:(0,j.Hj)(e.onPointerLeave,oe.stop),onPointerUp:(0,j.Hj)(e.onPointerUp,oe.stop),disabled:n,"aria-disabled":(0,j.rq)(n)}}),[T.isAtMax,r,fe,oe.stop,s]),he=(0,a.useCallback)(((e={},t=null)=>{const n=s||r&&T.isAtMin;return{...e,ref:(0,$.Px)(t,ee),role:"button",tabIndex:-1,onPointerDown:(0,j.Hj)(e.onPointerDown,(e=>{0!==e.button||n||ve(e)})),onPointerLeave:(0,j.Hj)(e.onPointerLeave,oe.stop),onPointerUp:(0,j.Hj)(e.onPointerUp,oe.stop),disabled:n,"aria-disabled":(0,j.rq)(n)}}),[T.isAtMin,r,ve,oe.stop,s]),xe=(0,a.useCallback)(((e={},t=null)=>{var n,r,a,u;return{name:h,inputMode:p,type:"text",pattern:m,"aria-labelledby":E,"aria-label":y,"aria-describedby":x,id:f,disabled:s,...e,readOnly:null!=(n=e.readOnly)?n:i,"aria-readonly":null!=(r=e.readOnly)?r:i,"aria-required":null!=(a=e.required)?a:c,required:null!=(u=e.required)?u:c,ref:(0,$.Px)(Y,t),value:re(T.value),role:"spinbutton","aria-valuemin":l,"aria-valuemax":o,"aria-valuenow":Number.isNaN(T.valueAsNumber)?void 0:T.valueAsNumber,"aria-invalid":(0,j.rq)(null!=d?d:T.isOutOfRange),"aria-valuetext":de,autoComplete:"off",autoCorrect:"off",onChange:(0,j.Hj)(e.onChange,ue),onKeyDown:(0,j.Hj)(e.onKeyDown,se),onFocus:(0,j.Hj)(e.onFocus,ie,(()=>V(!0))),onBlur:(0,j.Hj)(e.onBlur,P,pe)}}),[h,p,m,E,y,re,x,f,s,c,i,d,T.value,T.valueAsNumber,T.isOutOfRange,l,o,de,ue,se,ie,P,pe]);return{value:re(T.value),valueAsNumber:T.valueAsNumber,isFocused:W,isDisabled:s,isReadOnly:i,getIncrementButtonProps:ge,getDecrementButtonProps:he,getInputProps:xe,htmlProps:M}}var Z=n(3766),J=n(61),[ee,te]=(0,J.q)({name:"NumberInputStylesContext",errorMessage:"useNumberInputStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<NumberInput />\" "}),[ne,re]=(0,J.q)({name:"NumberInputContext",errorMessage:"useNumberInputContext: `context` is undefined. Seems you forgot to wrap number-input's components within <NumberInput />"}),ae=(0,C.R)((function(e,t){const n=(0,A.o5)("NumberInput",e),r=(0,I.MN)(e),l=(0,Z.v)(r),{htmlProps:o,...u}=Y(l),i=(0,a.useMemo)((()=>u),[u]);return(0,k.jsx)(ne,{value:i,children:(0,k.jsx)(ee,{value:n,children:(0,k.jsx)(M.B.div,{...o,ref:t,className:(0,j.cx)("chakra-numberinput",e.className),__css:{position:"relative",zIndex:0,...n.root}})})})}));ae.displayName="NumberInput";var le=(0,C.R)((function(e,t){const n=te();return(0,k.jsx)(M.B.div,{"aria-hidden":!0,ref:t,...e,__css:{display:"flex",flexDirection:"column",position:"absolute",top:"0",insetEnd:"0px",margin:"1px",height:"calc(100% - 2px)",zIndex:1,...n.stepperGroup}})}));le.displayName="NumberInputStepper";var oe=(0,C.R)((function(e,t){const{getInputProps:n}=re(),r=n(e,t),a=te();return(0,k.jsx)(M.B.input,{...r,className:(0,j.cx)("chakra-numberinput__field",e.className),__css:{width:"100%",...a.field}})}));oe.displayName="NumberInputField";var ue=(0,M.B)("div",{baseStyle:{display:"flex",justifyContent:"center",alignItems:"center",flex:1,transitionProperty:"common",transitionDuration:"normal",userSelect:"none",cursor:"pointer",lineHeight:"normal"}}),ie=(0,C.R)((function(e,t){var n;const r=te(),{getDecrementButtonProps:a}=re(),l=a(e,t);return(0,k.jsx)(ue,{...l,__css:r.stepper,children:null!=(n=e.children)?n:(0,k.jsx)(R,{})})}));ie.displayName="NumberDecrementStepper";var se=(0,C.R)((function(e,t){var n;const{getIncrementButtonProps:r}=re(),a=r(e,t),l=te();return(0,k.jsx)(ue,{...a,__css:l.stepper,children:null!=(n=e.children)?n:(0,k.jsx)(D,{})})}));se.displayName="NumberIncrementStepper";var ce=n(3153),de=(0,ce.w)({d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",displayName:"ArrowBackIcon"}),me=(0,ce.w)({d:"M23.555,8.729a1.505,1.505,0,0,0-1.406-.98H16.062a.5.5,0,0,1-.472-.334L13.405,1.222a1.5,1.5,0,0,0-2.81,0l-.005.016L8.41,7.415a.5.5,0,0,1-.471.334H1.85A1.5,1.5,0,0,0,.887,10.4l5.184,4.3a.5.5,0,0,1,.155.543L4.048,21.774a1.5,1.5,0,0,0,2.31,1.684l5.346-3.92a.5.5,0,0,1,.591,0l5.344,3.919a1.5,1.5,0,0,0,2.312-1.683l-2.178-6.535a.5.5,0,0,1,.155-.543l5.194-4.306A1.5,1.5,0,0,0,23.555,8.729Z",displayName:"StarIcon"});var pe=e=>{var t,n;let{params:u,location:i}=e;const{0:s,1:N}=(0,a.useState)((null===(t=i.state)||void 0===t?void 0:t.product)||null),{0:C,1:k}=(0,a.useState)(null),{0:A,1:I}=(0,a.useState)(!(null!==(n=i.state)&&void 0!==n&&n.product)),{0:M,1:j}=(0,a.useState)(1),P=c(),{colorMode:R}=(0,d.G6)(),D=(0,d.dU)("lightBg","darkBg"),H=(0,d.dU)("white","gray.700"),B=(0,d.dU)("lightText","darkText"),z=(0,d.dU)("gray.200","gray.600"),T=(0,d.dU)("lightAccent","darkAccent"),F=(0,a.useCallback)((async()=>{if(!s){I(!0);try{const e=await o.A.get("http://localhost:3000/api/products",{timeout:5e3});if(!e.data||!Array.isArray(e.data.result))throw new Error("Unexpected response format");{const t=e.data.result.find((e=>e.id===u.id));if(!t)throw new Error("Product not found");N(t)}}catch(e){console.error("Error fetching product:",e),k(e instanceof Error?e.message:"An unexpected error occurred")}finally{I(!1)}}}),[u.id,s]);(0,a.useEffect)((()=>{F()}),[F]);return A?a.createElement(m.az,{bg:D,minH:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},a.createElement(p.y,{size:"xl",color:T,thickness:"4px"})):C?a.createElement(m.az,{bg:D,minH:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},a.createElement(b.T,{spacing:4},a.createElement(f.E,{color:"red.500",fontSize:"xl"},C),a.createElement(v.$,{onClick:F,colorScheme:"dark"===R?"blue":"brand"},"Retry"))):s?a.createElement(m.az,{bg:D,minH:"100vh",py:8,transition:"background-color 0.2s"},a.createElement(g.m,{maxW:"container.xl"},a.createElement(h.N,{as:l.Link,to:"/",mb:6,display:"inline-flex",alignItems:"center",color:T},a.createElement(de,{mr:2})," Back to Products"),a.createElement(x.s,{direction:{base:"column",md:"row"},gap:8},a.createElement(m.az,{flex:1},a.createElement(y._,{src:s.thumbnail_url,alt:s.name,objectFit:"cover",w:"100%",maxH:"500px",borderRadius:"lg",boxShadow:"xl"})),a.createElement(b.T,{align:"start",spacing:4,flex:1},a.createElement(E.D,{as:"h1",size:"2xl",color:B},s.name),a.createElement(w,null,a.createElement(S.E,{colorScheme:"dark"===R?"teal":"green",fontSize:"lg",px:2,py:1},s.retail_price," ",s.currency),a.createElement(S.E,{colorScheme:"dark"===R?"blue":"purple",fontSize:"md"},s.variants," variants")),s.description&&a.createElement(f.E,{fontSize:"lg",color:B},s.description),a.createElement(w,null,(0,r.A)(Array(5)).map(((e,t)=>a.createElement(me,{key:t,color:t<4?T:"gray.300"}))),a.createElement(f.E,{color:B},"(4.0) 120 reviews")),a.createElement(_,{borderColor:z}),a.createElement(f.E,{color:B},"Synced: ",new Date(s.synced).toLocaleString()),a.createElement(w,{spacing:4},a.createElement(ae,{defaultValue:1,min:1,max:10,onChange:(e,t)=>j(t),bg:H,borderColor:z},a.createElement(oe,{color:B}),a.createElement(le,null,a.createElement(se,null),a.createElement(ie,null))),a.createElement(v.$,{onClick:()=>{P({title:"Added to cart",description:`Added ${M} ${null==s?void 0:s.name} to cart`,status:"success",duration:3e3,isClosable:!0})},colorScheme:"dark"===R?"blue":"brand",leftIcon:a.createElement(me,null)},"Add to Cart")))))):a.createElement(m.az,{bg:D,minH:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},a.createElement(f.E,{fontSize:"xl",color:B},"Product not found"))}}}]);
//# sourceMappingURL=component---src-pages-product-[id]-tsx-fbc70a8295d3e7c2f6df.js.map