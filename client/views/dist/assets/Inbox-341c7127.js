import{N as ct,j as t,K as Oe,u as lt,k as e,z as it,y as dt,q as K,_ as I,v as L,B as k,D as ut,w as ce,x as Le,o as ft,E as pt,a4 as mt,p as ht,A as Ie,l as X,a5 as xt,I as gt}from"./index-d5eb7ded.js";import{C as ye,d as Fe,A as Se,E as Be,F as qe,h as le,G as ie,H as $e,f as He,g as Ve,I as de,T as vt,w as bt,x as $t,D as ze,J as We,B as U,n as Ue,y as wt,O as yt,Q as Ee,U as Ke,V as St,W as Ct,X as Nt,Y as jt,Z as It,_ as Ce,a0 as Et,a1 as Tt,a2 as Pt,a3 as Te,a4 as Rt,a5 as kt,a6 as Dt,o as _t,p as Mt,r as At,a7 as Ot,j as Pe,a8 as Re,a9 as Lt,q as Ft,aa as Bt,ab as qt,ac as Ht,ad as ke,ae as De,af as _e,e as Vt,z as zt,ag as Wt}from"./App-a8cd9264.js";import{$ as Ut}from"./index-9c39f103.js";function Kt({notification:s}){const{toast:n}=ct(),{socket:o}=t.useContext(Oe),[a,c]=t.useState(!1),r=lt();function i({status:d,hostID:p,guestID:m,bookingRequestID:b,notificationID:j}){o==null||o.emit("host-update-bookingRequest",{status:d,hostID:p,guestID:m,bookingRequestID:b,notificationID:j})}return t.useMemo(()=>{o==null||o.on("res",d=>{n({title:"Yey!",description:"You have successfully updated the booking request.",className:"bg-white font-bold text-black"}),r.invalidateQueries({queryKey:["notifications"]}),console.log(d)})},[r,o,n]),e.jsxs(ye,{className:"px-4",children:[e.jsxs(Fe,{className:"w-full flex-row items-start justify-between",children:[e.jsxs("div",{className:"flex gap-4 ",children:[e.jsxs(Se,{children:[e.jsx(Be,{className:"object-cover max-w-full w-10 h-10",src:s.fromUserID.photoUrl}),e.jsx(qe,{children:"CN"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs(le,{className:"flex items-center gap font-bold",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor",className:"w-4 h-4",children:e.jsx("path",{strokeLinecap:"round",d:"M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"})}),s.fromUserID.username]}),e.jsxs(ie,{className:"font-semibold",children:["sent"," ",$e(new Date(s.createdAt),{addSuffix:!0})]})]})]}),s.read?e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"green",className:"w-5 h-5",children:e.jsx("path",{fillRule:"evenodd",d:"M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",clipRule:"evenodd"})}):e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 15 15",fill:"#0866FF",xmlns:"http://www.w3.org/2000/svg",className:"bg-[#0866FF] rounded-full",children:e.jsx("path",{d:"M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704Z",fillRule:"evenodd",clipRule:"evenodd"})})]}),e.jsxs(He,{children:[e.jsxs("h1",{className:"font-bold text-sm text-gray-600",children:["Subject: ",String(s.notificationType).split("-").join(" ")]}),e.jsxs(ie,{className:"mt-4 font-semibold text-gray-600",children:["Message: ",s.bookingRequest.message]}),e.jsxs(Ve,{className:"flex flex-col items-start gap-2 mt-2 p-0",children:[e.jsxs("span",{className:"text-sm font-semibold text-gray-600",children:[" ","Request: ",s.fromUserID.username," is requesting you to accept their booking on"," ",de(new Date(s.bookingRequest.requestedBookingDateStartsAt),"PPPP")," ","until"," ",de(new Date(s.bookingRequest.requestedBookingDateEndsAt),"PPPP")," ","for this listing named"," ",e.jsxs("span",{className:"text-green-600 underline underline-offset-2",children:['"',s.bookingRequest.listingID.serviceDescription,'"']})]}),e.jsxs("div",{className:"flex items-center justify-center gap-2 ml-auto",children:[e.jsx(vt,{children:e.jsxs(bt,{children:[e.jsx($t,{asChild:!0,children:e.jsxs(ze,{children:[e.jsx(We,{asChild:!0,children:e.jsx(U,{variant:"outline",className:"rounded-full",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"})})})}),e.jsx(Ue,{children:"Message"})]})}),e.jsxs(wt,{children:["Chat ",s.fromUserID.username]})]})}),s.bookingRequest.status==="approved"?e.jsxs("span",{className:"text-xs font-bold text-gray-600",children:["You have accepted this request"," ",$e(new Date(s.bookingRequest.updatedAt),{addSuffix:!0})]}):s.bookingRequest.status==="declined"?e.jsx("span",{className:"text-xs font-bold text-gray-600",children:"You declined this request"}):e.jsxs(e.Fragment,{children:[" ",e.jsx(U,{type:"button",disabled:a,onClick:()=>{c(!0),setTimeout(()=>{c(!1),i({status:"approved",guestID:s.fromUserID,hostID:s.toUserID,bookingRequestID:s.bookingRequest,notificationID:s._id})},1e3)},className:` bg-gray-950 rounded-full ${a?"opacity-70":"opacity-100"}`,children:"Accept"}),e.jsx(U,{type:"button",onClick:()=>i({status:"declined",guestID:s.fromUserID,hostID:s.toUserID,bookingRequestID:s.bookingRequest,notificationID:s._id}),variant:"outline",className:" rounded-full",children:"Decline"})]})]})]})]})]},s._id)}function Gt({notification:s}){return e.jsxs(ye,{children:[e.jsxs(Fe,{className:"flex-row gap-4",children:[e.jsxs(Se,{children:[e.jsx(yt,{className:"object-cover max-w-full w-10 h-10",src:s.senderID.photoUrl}),e.jsx(qe,{children:"CN"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(le,{className:"font-bold",children:s.senderID.username}),e.jsxs(ie,{className:"font-semibold",children:["sent"," ",$e(new Date(s.createdAt),{addSuffix:!0})]})]})]}),e.jsxs(He,{children:[e.jsxs("h1",{className:"font-bold text-sm text-gray-600",children:["Subject: ",String(s.notificationType).split("-").join(" ")]}),e.jsxs(ie,{className:"mt-4 font-semibold",children:["Message: ",s.content.message]}),e.jsxs(Ve,{className:"flex flex-col items-start gap-2 mt-2 p-0",children:[e.jsxs("span",{className:"text-sm font-semibold text-gray-600",children:[" ","Request: ",s.senderID.username," is requesting to you accept their booking on"," ",de(new Date(s.content.requestedBookingDateStartsAt),"PPPP")," ","until"," ",de(new Date(s.content.requestedBookingDateEndsAt),"PPPP")," "]}),e.jsxs("div",{className:"flex gap-2 ml-auto",children:[e.jsx(U,{variant:"default",className:" bg-gray-950 rounded-full",children:"Accept"}),e.jsx(U,{variant:"outline",className:" rounded-full",children:"Decline"})]})]})]})]},s._id)}const Yt=Ee.object({message:Ee.string().min(1,{message:"Message is required"}).max(200,{message:"Message cannot exceed 200 characters"})}),Zt=[" ","Enter","ArrowUp","ArrowDown"],Xt=[" ","Enter"],ue="Select",[fe,Ne,Qt]=it(ue),[J,qs]=dt(ue,[Qt,Ke]),je=Ke(),[Jt,ee]=J(ue),[es,ts]=J(ue),ss=s=>{const{__scopeSelect:n,children:o,open:a,defaultOpen:c,onOpenChange:r,value:i,defaultValue:d,onValueChange:p,dir:m,name:b,autoComplete:j,disabled:u,required:y}=s,h=je(n),[g,S]=t.useState(null),[x,l]=t.useState(null),[v,te]=t.useState(!1),D=Et(m),[se=!1,T]=Ie({prop:a,defaultProp:c,onChange:r}),[R,z]=Ie({prop:i,defaultProp:d,onChange:p}),G=t.useRef(null),W=g?!!g.closest("form"):!0,[A,q]=t.useState(new Set),H=Array.from(A).map(E=>E.props.value).join(";");return t.createElement(Tt,h,t.createElement(Jt,{required:y,scope:n,trigger:g,onTriggerChange:S,valueNode:x,onValueNodeChange:l,valueNodeHasChildren:v,onValueNodeHasChildrenChange:te,contentId:Ce(),value:R,onValueChange:z,open:se,onOpenChange:T,dir:D,triggerPointerDownPosRef:G,disabled:u},t.createElement(fe.Provider,{scope:n},t.createElement(es,{scope:s.__scopeSelect,onNativeOptionAdd:t.useCallback(E=>{q(O=>new Set(O).add(E))},[]),onNativeOptionRemove:t.useCallback(E=>{q(O=>{const F=new Set(O);return F.delete(E),F})},[])},o)),W?t.createElement(Ze,{key:H,"aria-hidden":!0,required:y,tabIndex:-1,name:b,autoComplete:j,value:R,onChange:E=>z(E.target.value),disabled:u},R===void 0?t.createElement("option",{value:""}):null,Array.from(A)):null))},os="SelectTrigger",ns=t.forwardRef((s,n)=>{const{__scopeSelect:o,disabled:a=!1,...c}=s,r=je(o),i=ee(os,o),d=i.disabled||a,p=K(n,i.onTriggerChange),m=Ne(o),[b,j,u]=Xe(h=>{const g=m().filter(l=>!l.disabled),S=g.find(l=>l.value===i.value),x=Qe(g,h,S);x!==void 0&&i.onValueChange(x.value)}),y=()=>{d||(i.onOpenChange(!0),u())};return t.createElement(St,I({asChild:!0},r),t.createElement(L.button,I({type:"button",role:"combobox","aria-controls":i.contentId,"aria-expanded":i.open,"aria-required":i.required,"aria-autocomplete":"none",dir:i.dir,"data-state":i.open?"open":"closed",disabled:d,"data-disabled":d?"":void 0,"data-placeholder":Ns(i.value)?"":void 0},c,{ref:p,onClick:k(c.onClick,h=>{h.currentTarget.focus()}),onPointerDown:k(c.onPointerDown,h=>{const g=h.target;g.hasPointerCapture(h.pointerId)&&g.releasePointerCapture(h.pointerId),h.button===0&&h.ctrlKey===!1&&(y(),i.triggerPointerDownPosRef.current={x:Math.round(h.pageX),y:Math.round(h.pageY)},h.preventDefault())}),onKeyDown:k(c.onKeyDown,h=>{const g=b.current!=="";!(h.ctrlKey||h.altKey||h.metaKey)&&h.key.length===1&&j(h.key),!(g&&h.key===" ")&&Zt.includes(h.key)&&(y(),h.preventDefault())})})))}),as=t.forwardRef((s,n)=>{const{__scopeSelect:o,children:a,...c}=s;return t.createElement(L.span,I({"aria-hidden":!0},c,{ref:n}),a||"▼")}),rs=s=>t.createElement(ut,I({asChild:!0},s)),Q="SelectContent",cs=t.forwardRef((s,n)=>{const o=ee(Q,s.__scopeSelect),[a,c]=t.useState();if(ce(()=>{c(new DocumentFragment)},[]),!o.open){const r=a;return r?Le.createPortal(t.createElement(Ge,{scope:s.__scopeSelect},t.createElement(fe.Slot,{scope:s.__scopeSelect},t.createElement("div",null,s.children))),r):null}return t.createElement(ls,I({},s,{ref:n}))}),B=10,[Ge,pe]=J(Q),ls=t.forwardRef((s,n)=>{const{__scopeSelect:o,position:a="item-aligned",onCloseAutoFocus:c,onEscapeKeyDown:r,onPointerDownOutside:i,side:d,sideOffset:p,align:m,alignOffset:b,arrowPadding:j,collisionBoundary:u,collisionPadding:y,sticky:h,hideWhenDetached:g,avoidCollisions:S,...x}=s,l=ee(Q,o),[v,te]=t.useState(null),[D,se]=t.useState(null),T=K(n,f=>te(f)),[R,z]=t.useState(null),[G,W]=t.useState(null),A=Ne(o),[q,H]=t.useState(!1),E=t.useRef(!1);t.useEffect(()=>{if(v)return Ct(v)},[v]),Nt();const O=t.useCallback(f=>{const[C,...P]=A().map(w=>w.ref.current),[N]=P.slice(-1),$=document.activeElement;for(const w of f)if(w===$||(w==null||w.scrollIntoView({block:"nearest"}),w===C&&D&&(D.scrollTop=0),w===N&&D&&(D.scrollTop=D.scrollHeight),w==null||w.focus(),document.activeElement!==$))return},[A,D]),F=t.useCallback(()=>O([R,v]),[O,R,v]);t.useEffect(()=>{q&&F()},[q,F]);const{onOpenChange:Y,triggerPointerDownPosRef:V}=l;t.useEffect(()=>{if(v){let f={x:0,y:0};const C=N=>{var $,w,_,M;f={x:Math.abs(Math.round(N.pageX)-(($=(w=V.current)===null||w===void 0?void 0:w.x)!==null&&$!==void 0?$:0)),y:Math.abs(Math.round(N.pageY)-((_=(M=V.current)===null||M===void 0?void 0:M.y)!==null&&_!==void 0?_:0))}},P=N=>{f.x<=10&&f.y<=10?N.preventDefault():v.contains(N.target)||Y(!1),document.removeEventListener("pointermove",C),V.current=null};return V.current!==null&&(document.addEventListener("pointermove",C),document.addEventListener("pointerup",P,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",C),document.removeEventListener("pointerup",P,{capture:!0})}}},[v,Y,V]),t.useEffect(()=>{const f=()=>Y(!1);return window.addEventListener("blur",f),window.addEventListener("resize",f),()=>{window.removeEventListener("blur",f),window.removeEventListener("resize",f)}},[Y]);const[me,ne]=Xe(f=>{const C=A().filter($=>!$.disabled),P=C.find($=>$.ref.current===document.activeElement),N=Qe(C,f,P);N&&setTimeout(()=>N.ref.current.focus())}),he=t.useCallback((f,C,P)=>{const N=!E.current&&!P;(l.value!==void 0&&l.value===C||N)&&(z(f),N&&(E.current=!0))},[l.value]),xe=t.useCallback(()=>v==null?void 0:v.focus(),[v]),Z=t.useCallback((f,C,P)=>{const N=!E.current&&!P;(l.value!==void 0&&l.value===C||N)&&W(f)},[l.value]),ae=a==="popper"?Me:is,oe=ae===Me?{side:d,sideOffset:p,align:m,alignOffset:b,arrowPadding:j,collisionBoundary:u,collisionPadding:y,sticky:h,hideWhenDetached:g,avoidCollisions:S}:{};return t.createElement(Ge,{scope:o,content:v,viewport:D,onViewportChange:se,itemRefCallback:he,selectedItem:R,onItemLeave:xe,itemTextRefCallback:Z,focusSelectedItem:F,selectedItemText:G,position:a,isPositioned:q,searchRef:me},t.createElement(jt,{as:ft,allowPinchZoom:!0},t.createElement(It,{asChild:!0,trapped:l.open,onMountAutoFocus:f=>{f.preventDefault()},onUnmountAutoFocus:k(c,f=>{var C;(C=l.trigger)===null||C===void 0||C.focus({preventScroll:!0}),f.preventDefault()})},t.createElement(pt,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:r,onPointerDownOutside:i,onFocusOutside:f=>f.preventDefault(),onDismiss:()=>l.onOpenChange(!1)},t.createElement(ae,I({role:"listbox",id:l.contentId,"data-state":l.open?"open":"closed",dir:l.dir,onContextMenu:f=>f.preventDefault()},x,oe,{onPlaced:()=>H(!0),ref:T,style:{display:"flex",flexDirection:"column",outline:"none",...x.style},onKeyDown:k(x.onKeyDown,f=>{const C=f.ctrlKey||f.altKey||f.metaKey;if(f.key==="Tab"&&f.preventDefault(),!C&&f.key.length===1&&ne(f.key),["ArrowUp","ArrowDown","Home","End"].includes(f.key)){let N=A().filter($=>!$.disabled).map($=>$.ref.current);if(["ArrowUp","End"].includes(f.key)&&(N=N.slice().reverse()),["ArrowUp","ArrowDown"].includes(f.key)){const $=f.target,w=N.indexOf($);N=N.slice(w+1)}setTimeout(()=>O(N)),f.preventDefault()}})}))))))}),is=t.forwardRef((s,n)=>{const{__scopeSelect:o,onPlaced:a,...c}=s,r=ee(Q,o),i=pe(Q,o),[d,p]=t.useState(null),[m,b]=t.useState(null),j=K(n,T=>b(T)),u=Ne(o),y=t.useRef(!1),h=t.useRef(!0),{viewport:g,selectedItem:S,selectedItemText:x,focusSelectedItem:l}=i,v=t.useCallback(()=>{if(r.trigger&&r.valueNode&&d&&m&&g&&S&&x){const T=r.trigger.getBoundingClientRect(),R=m.getBoundingClientRect(),z=r.valueNode.getBoundingClientRect(),G=x.getBoundingClientRect();if(r.dir!=="rtl"){const $=G.left-R.left,w=z.left-$,_=T.left-w,M=T.width+_,ge=Math.max(M,R.width),ve=window.innerWidth-B,be=Te(w,[B,ve-ge]);d.style.minWidth=M+"px",d.style.left=be+"px"}else{const $=R.right-G.right,w=window.innerWidth-z.right-$,_=window.innerWidth-T.right-w,M=T.width+_,ge=Math.max(M,R.width),ve=window.innerWidth-B,be=Te(w,[B,ve-ge]);d.style.minWidth=M+"px",d.style.right=be+"px"}const W=u(),A=window.innerHeight-B*2,q=g.scrollHeight,H=window.getComputedStyle(m),E=parseInt(H.borderTopWidth,10),O=parseInt(H.paddingTop,10),F=parseInt(H.borderBottomWidth,10),Y=parseInt(H.paddingBottom,10),V=E+O+q+Y+F,me=Math.min(S.offsetHeight*5,V),ne=window.getComputedStyle(g),he=parseInt(ne.paddingTop,10),xe=parseInt(ne.paddingBottom,10),Z=T.top+T.height/2-B,ae=A-Z,oe=S.offsetHeight/2,f=S.offsetTop+oe,C=E+O+f,P=V-C;if(C<=Z){const $=S===W[W.length-1].ref.current;d.style.bottom="0px";const w=m.clientHeight-g.offsetTop-g.offsetHeight,_=Math.max(ae,oe+($?xe:0)+w+F),M=C+_;d.style.height=M+"px"}else{const $=S===W[0].ref.current;d.style.top="0px";const _=Math.max(Z,E+g.offsetTop+($?he:0)+oe)+P;d.style.height=_+"px",g.scrollTop=C-Z+g.offsetTop}d.style.margin=`${B}px 0`,d.style.minHeight=me+"px",d.style.maxHeight=A+"px",a==null||a(),requestAnimationFrame(()=>y.current=!0)}},[u,r.trigger,r.valueNode,d,m,g,S,x,r.dir,a]);ce(()=>v(),[v]);const[te,D]=t.useState();ce(()=>{m&&D(window.getComputedStyle(m).zIndex)},[m]);const se=t.useCallback(T=>{T&&h.current===!0&&(v(),l==null||l(),h.current=!1)},[v,l]);return t.createElement(ds,{scope:o,contentWrapper:d,shouldExpandOnScrollRef:y,onScrollButtonChange:se},t.createElement("div",{ref:p,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:te}},t.createElement(L.div,I({},c,{ref:j,style:{boxSizing:"border-box",maxHeight:"100%",...c.style}}))))}),Me=t.forwardRef((s,n)=>{const{__scopeSelect:o,align:a="start",collisionPadding:c=B,...r}=s,i=je(o);return t.createElement(Pt,I({},i,r,{ref:n,align:a,collisionPadding:c,style:{boxSizing:"border-box",...r.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}}))}),[ds,us]=J(Q,{}),Ae="SelectViewport",fs=t.forwardRef((s,n)=>{const{__scopeSelect:o,...a}=s,c=pe(Ae,o),r=us(Ae,o),i=K(n,c.onViewportChange),d=t.useRef(0);return t.createElement(t.Fragment,null,t.createElement("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"}}),t.createElement(fe.Slot,{scope:o},t.createElement(L.div,I({"data-radix-select-viewport":"",role:"presentation"},a,{ref:i,style:{position:"relative",flex:1,overflow:"auto",...a.style},onScroll:k(a.onScroll,p=>{const m=p.currentTarget,{contentWrapper:b,shouldExpandOnScrollRef:j}=r;if(j!=null&&j.current&&b){const u=Math.abs(d.current-m.scrollTop);if(u>0){const y=window.innerHeight-B*2,h=parseFloat(b.style.minHeight),g=parseFloat(b.style.height),S=Math.max(h,g);if(S<y){const x=S+u,l=Math.min(y,x),v=x-l;b.style.height=l+"px",b.style.bottom==="0px"&&(m.scrollTop=v>0?v:0,b.style.justifyContent="flex-end")}}}d.current=m.scrollTop})}))))}),ps="SelectGroup",[ms,hs]=J(ps),xs=t.forwardRef((s,n)=>{const{__scopeSelect:o,...a}=s,c=Ce();return t.createElement(ms,{scope:o,id:c},t.createElement(L.div,I({role:"group","aria-labelledby":c},a,{ref:n})))}),gs="SelectLabel",vs=t.forwardRef((s,n)=>{const{__scopeSelect:o,...a}=s,c=hs(gs,o);return t.createElement(L.div,I({id:c.id},a,{ref:n}))}),we="SelectItem",[bs,Ye]=J(we),$s=t.forwardRef((s,n)=>{const{__scopeSelect:o,value:a,disabled:c=!1,textValue:r,...i}=s,d=ee(we,o),p=pe(we,o),m=d.value===a,[b,j]=t.useState(r??""),[u,y]=t.useState(!1),h=K(n,x=>{var l;return(l=p.itemRefCallback)===null||l===void 0?void 0:l.call(p,x,a,c)}),g=Ce(),S=()=>{c||(d.onValueChange(a),d.onOpenChange(!1))};if(a==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return t.createElement(bs,{scope:o,value:a,disabled:c,textId:g,isSelected:m,onItemTextChange:t.useCallback(x=>{j(l=>{var v;return l||((v=x==null?void 0:x.textContent)!==null&&v!==void 0?v:"").trim()})},[])},t.createElement(fe.ItemSlot,{scope:o,value:a,disabled:c,textValue:b},t.createElement(L.div,I({role:"option","aria-labelledby":g,"data-highlighted":u?"":void 0,"aria-selected":m&&u,"data-state":m?"checked":"unchecked","aria-disabled":c||void 0,"data-disabled":c?"":void 0,tabIndex:c?void 0:-1},i,{ref:h,onFocus:k(i.onFocus,()=>y(!0)),onBlur:k(i.onBlur,()=>y(!1)),onPointerUp:k(i.onPointerUp,S),onPointerMove:k(i.onPointerMove,x=>{if(c){var l;(l=p.onItemLeave)===null||l===void 0||l.call(p)}else x.currentTarget.focus({preventScroll:!0})}),onPointerLeave:k(i.onPointerLeave,x=>{if(x.currentTarget===document.activeElement){var l;(l=p.onItemLeave)===null||l===void 0||l.call(p)}}),onKeyDown:k(i.onKeyDown,x=>{var l;((l=p.searchRef)===null||l===void 0?void 0:l.current)!==""&&x.key===" "||(Xt.includes(x.key)&&S(),x.key===" "&&x.preventDefault())})}))))}),re="SelectItemText",ws=t.forwardRef((s,n)=>{const{__scopeSelect:o,className:a,style:c,...r}=s,i=ee(re,o),d=pe(re,o),p=Ye(re,o),m=ts(re,o),[b,j]=t.useState(null),u=K(n,x=>j(x),p.onItemTextChange,x=>{var l;return(l=d.itemTextRefCallback)===null||l===void 0?void 0:l.call(d,x,p.value,p.disabled)}),y=b==null?void 0:b.textContent,h=t.useMemo(()=>t.createElement("option",{key:p.value,value:p.value,disabled:p.disabled},y),[p.disabled,p.value,y]),{onNativeOptionAdd:g,onNativeOptionRemove:S}=m;return ce(()=>(g(h),()=>S(h)),[g,S,h]),t.createElement(t.Fragment,null,t.createElement(L.span,I({id:p.textId},r,{ref:u})),p.isSelected&&i.valueNode&&!i.valueNodeHasChildren?Le.createPortal(r.children,i.valueNode):null)}),ys="SelectItemIndicator",Ss=t.forwardRef((s,n)=>{const{__scopeSelect:o,...a}=s;return Ye(ys,o).isSelected?t.createElement(L.span,I({"aria-hidden":!0},a,{ref:n})):null}),Cs=t.forwardRef((s,n)=>{const{__scopeSelect:o,...a}=s;return t.createElement(L.div,I({"aria-hidden":!0},a,{ref:n}))});function Ns(s){return s===""||s===void 0}const Ze=t.forwardRef((s,n)=>{const{value:o,...a}=s,c=t.useRef(null),r=K(n,c),i=Ut(o);return t.useEffect(()=>{const d=c.current,p=window.HTMLSelectElement.prototype,b=Object.getOwnPropertyDescriptor(p,"value").set;if(i!==o&&b){const j=new Event("change",{bubbles:!0});b.call(d,o),d.dispatchEvent(j)}},[i,o]),t.createElement(mt,{asChild:!0},t.createElement("select",I({},a,{ref:r,defaultValue:o})))});Ze.displayName="BubbleSelect";function Xe(s){const n=ht(s),o=t.useRef(""),a=t.useRef(0),c=t.useCallback(i=>{const d=o.current+i;n(d),function p(m){o.current=m,window.clearTimeout(a.current),m!==""&&(a.current=window.setTimeout(()=>p(""),1e3))}(d)},[n]),r=t.useCallback(()=>{o.current="",window.clearTimeout(a.current)},[]);return t.useEffect(()=>()=>window.clearTimeout(a.current),[]),[o,c,r]}function Qe(s,n,o){const c=n.length>1&&Array.from(n).every(m=>m===n[0])?n[0]:n,r=o?s.indexOf(o):-1;let i=js(s,Math.max(r,0));c.length===1&&(i=i.filter(m=>m!==o));const p=i.find(m=>m.textValue.toLowerCase().startsWith(c.toLowerCase()));return p!==o?p:void 0}function js(s,n){return s.map((o,a)=>s[(n+a)%s.length])}const Is=ss,Je=ns,Es=as,Ts=rs,et=cs,Ps=fs,Rs=xs,tt=vs,st=$s,ks=ws,Ds=Ss,ot=Cs,_s=Is,Ms=Rs,nt=t.forwardRef(({className:s,children:n,...o},a)=>e.jsxs(Je,{ref:a,className:X("flex h-9 w-full items-center justify-between rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300",s),...o,children:[n,e.jsx(Es,{asChild:!0,children:e.jsx(xt,{className:"h-4 w-4 opacity-50"})})]}));nt.displayName=Je.displayName;const at=t.forwardRef(({className:s,children:n,position:o="popper",...a},c)=>e.jsx(Ts,{children:e.jsx(et,{ref:c,className:X("relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",o==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",s),position:o,...a,children:e.jsx(Ps,{className:X("p-1",o==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:n})})}));at.displayName=et.displayName;const As=t.forwardRef(({className:s,...n},o)=>e.jsx(tt,{ref:o,className:X("px-2 py-1.5 text-sm font-semibold",s),...n}));As.displayName=tt.displayName;const rt=t.forwardRef(({className:s,children:n,...o},a)=>e.jsxs(st,{ref:a,className:X("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",s),...o,children:[e.jsx("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:e.jsx(Ds,{children:e.jsx(gt,{className:"h-4 w-4"})})}),e.jsx(ks,{children:n})]}));rt.displayName=st.displayName;const Os=t.forwardRef(({className:s,...n},o)=>e.jsx(ot,{ref:o,className:X("-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800",s),...n}));Os.displayName=ot.displayName;function Hs(){const{socket:s}=t.useContext(Oe),[n,o]=t.useState(""),[a,c]=t.useState([]),{data:r,isPending:i}=Rt(),{formState:{errors:d},handleSubmit:p,register:m,watch:b}=kt({defaultValues:{message:""},resolver:Wt(Yt)});function j(u){var y;n&&(s==null||s.emit("chat-message",{message:u.message,receiverName:n,senderName:(y=Pe.currentUser)==null?void 0:y.displayName}))}return t.useMemo(()=>{setTimeout(async()=>{if(!n)return c([]);const u=await Dt.get(`/api/users/search/${n}`);c(u.data.userDetails)},500)},[c,n]),t.useEffect(()=>{document.title="Host Inbox - IGotYou"},[]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"p-4",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx("div",{className:"flex justify-between w-1/4 bg-slate h-max",children:e.jsxs(ze,{children:[e.jsx(We,{asChild:!0,children:e.jsxs(U,{className:"flex items-center justify-center bg-white gap-4 p-7 rounded-full border text-black hover:bg-white hover:shadow-lg",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"})}),"Compose"]})}),e.jsx(Ue,{children:e.jsxs("form",{onSubmit:p(j),className:"flex flex-col gap-2",method:"get",children:[e.jsxs(_t,{children:[e.jsx(Mt,{className:"text-lg font-semibold",children:"New Message"}),e.jsx("div",{className:"flex flex-col items-center justify-center gap-2 w-full",children:e.jsxs("div",{className:"flex items-center justify-center gap-2 w-full",children:[e.jsxs(At,{htmlFor:"to",className:"text-sm font-semibold text-gray-600",children:["To:"," "]}),e.jsx("div",{className:"w-max mr-auto",children:e.jsx(Ot,{value:n,onChange:u=>o(u.target.value),id:"to",placeholder:"Username",autoFocus:!0,className:"p-2 text-sm focus-visible:ring-0 focus-visible:border-none border-none outline-none shadow-none font-semibold"})}),a.length>0&&e.jsxs(_s,{onValueChange:u=>o(u),children:[e.jsx(nt,{className:"text-xs font-semibold",children:"Show suggestions"}),e.jsx(at,{className:"",children:e.jsx(Ms,{className:"rounded ",children:a.map(u=>{var y;return u.username!==((y=Pe.currentUser)==null?void 0:y.displayName)&&e.jsx(rt,{className:"hover:bg-gray-100 ",value:u.username,children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Se,{children:e.jsx(Be,{src:u.photoURL??"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"})}),e.jsx(le,{className:"font-bold text-xs text-gray-600",children:u.username})]})},u.photoURL)})})})]}),!n&&e.jsx(Re,{message:"Username is required"})]})})]}),e.jsxs("span",{className:"ml-auto font-bold text-xs text-gray-600",children:[b("message").length," / 200"]}),e.jsx(Lt,{...m("message"),maxLength:201}),d.message&&e.jsx(Re,{message:d.message.message}),e.jsx(Ft,{className:"mt-2",children:e.jsx(U,{className:"rounded-full bg-gray-950",children:"Send"})})]})})]})}),i?e.jsx(Bt,{}):(r==null?void 0:r.data.notifications.length)>0?e.jsx(e.Fragment,{children:e.jsxs(qt,{defaultValue:"inbox",onValueChange:u=>console.log(u),className:"bg-[#F5F5F5] rounded-md p-1 shadow-lg border w-full",children:[e.jsxs(Ht,{className:"bg-white mb-1",children:[e.jsxs(ke,{className:"flex items-center justify-center gap-4 text-sm px-6 font-bold",value:"inbox",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"})}),e.jsxs("span",{children:["Inbox (",r==null?void 0:r.data.notifications.length,")"]})]}),e.jsxs(ke,{className:"flex items-center justify-center gap-4 text-sm px-6 font-bold",value:"booking-requests",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"})}),"Booking requests (",r==null?void 0:r.data.notifications.map(u=>u.notificationType==="Booking-Request").length,")"]})]}),e.jsxs("div",{className:"flex",children:[e.jsx(De,{className:"flex max-h-[70vh] h-max",children:e.jsx(_e,{className:"grid grid-cols-1 gap-1",value:"inbox",children:r==null?void 0:r.data.notifications.map(u=>e.jsx(Kt,{notification:u},u._id))})}),e.jsx(De,{className:"h-[70vh]",children:e.jsx(_e,{className:"grid grid-cols-1 gap-1",value:"booking-requests",children:r==null?void 0:r.data.notifications.map(u=>u.notificationType==="Booking-Request"&&e.jsx(Gt,{notification:u},u._id))})})]})]})}):e.jsxs(ye,{className:"w-full h-[70vh] bg-[#F5F5F5] flex flex-col items-center justify-center",children:[e.jsx(Vt,{animationData:zt,className:"w-40 h-40",loop:!1}),e.jsx(le,{className:"font-bold text-gray-600 text-lg",children:"Nothing to show here"})]})]})})})}export{Hs as default};