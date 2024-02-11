import{j as p,k as e,ac as f}from"./index-08751a26.js";import{k as j,j as d,D as N,m as b,n as w,o as y,S as m,p as v,q as C,r as D,s as k,C as _,d as S,L as I,t as F,N as L,P as A,M as E,v as t,A as x,w as H,x as T,f as P,y as z,z as M,U as R,e as U,E as O,F as W}from"./App-9725fef7.js";const u=new W({cloud:{cloudName:"dop5kqpod"}});function B(){var o;const{listings:l,uid:n}=j();return p.useEffect(()=>{document.title="IGotYou"},[]),e.jsxs(e.Fragment,{children:[!((o=d.currentUser)!=null&&o.emailVerified)&&e.jsx(N,{defaultOpen:sessionStorage.getItem("checked")!=="true",children:e.jsxs(b,{className:"p-0",children:[e.jsx(w,{className:"p-4",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(f,{color:"orange",width:25,height:25}),e.jsx(y,{className:"text-base font-semibold",children:"Some features are disabled!"})]})}),e.jsx(m,{}),e.jsx(v,{children:e.jsx("div",{className:"px-6 py-4",children:e.jsxs("div",{className:"flex flex-col justify-center gap-2",children:[e.jsxs("span",{className:"text-sm ",children:["We trust you are doing well. To bolster the"," ",e.jsx("span",{className:"font-bold text-red-500 underline underline-offset-2",children:"security"})," ","and"," ",e.jsx("span",{className:"font-bold text-red-500 underline underline-offset-2",children:"reliability"})," ","of our platform, we seek your cooperation in verifying your email address. This verification is essential before you can"," ",e.jsx("span",{className:"font-bold text-red-500 underline underline-offset-2",children:"access certain features"})," ","on our website."]}),e.jsx("span",{className:"text-sm  ",children:"We appreciate your collaboration in maintaining the security and trustworthiness of our platform. Anticipating your verified email and the opportunity to see your contributions soon!"})]})})}),e.jsx(m,{}),e.jsxs("div",{className:"m-2 ml-auto flex w-max items-center justify-center gap-2 p-2",children:[e.jsx(C,{htmlFor:"checkbox",className:"text-xs font-medium",children:"Don't show this again"}),e.jsx(D,{className:"rounded-full",onCheckedChange:i=>sessionStorage.setItem("checked",JSON.stringify(i)),id:"checkbox"})]})]})}),e.jsxs("section",{className:"mt-2 px-8",children:[e.jsx(k,{}),l.pages[0].data.listings.length>0?e.jsx(e.Fragment,{children:e.jsx("div",{className:"grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1",children:l.pages.map(i=>i.data.listings.map((s,h)=>{var r,c;return e.jsxs(_,{className:"w-full overflow-hidden border-none shadow-none",children:[e.jsx(S,{className:"flex flex-col gap-1 p-0",children:e.jsx(I,{to:`${n===s.host.uid?`/hosting-listings/edit/${s._id}`:`/listings/show/${s._id}`} `,className:"mt-2",reloadDocument:n===s.host.uid,replace:!0,children:e.jsx(F,{className:"rounded-xl",spaceBetween:10,cssMode:!0,navigation:{enabled:!0},pagination:!0,mousewheel:!0,modules:[L,A,E],children:(r=s.listingAssets)==null?void 0:r.map(a=>a.format==="mp4"?e.jsx(t,{className:"h-72 rounded-xl",children:e.jsx(x,{className:"mx-auto h-72 w-full rounded-xl object-cover",cldImg:u.image(a.public_id).setAssetType("video").format("auto:image")})},a.public_id):a.format==="mp3"?e.jsx(t,{children:e.jsx("img",{className:"mx-auto h-72 w-full rounded-lg border object-cover",src:"https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png",alt:"some image",loading:"lazy"})},a.public_id):e.jsx(t,{children:e.jsx(x,{cldImg:u.image(a.public_id),plugins:[H(),T({steps:[800,1e3,1400]})],className:"mx-auto h-72 w-full rounded-lg border object-cover"},a._id)},a.public_id))},h)})}),e.jsxs(P,{className:"mt-2 flex justify-between p-0",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-base font-semibold",children:s.serviceTitle}),e.jsx("span",{className:"text-sm font-semibold text-gray-600",children:s.host.username}),e.jsx("div",{className:"w-full",children:e.jsxs("span",{className:"text-sm font-semibold text-gray-600",children:["Ends in"," ",z(new Date().setHours(0,0,0,0),new Date(s.endsAt))]})}),e.jsx("div",{className:"flex w-full items-center justify-between",children:e.jsxs("span",{className:"font-semibold",children:[M({value:s.price.toString(),intlConfig:{locale:"ph-PH",currency:"PHP"}})," ",e.jsx("span",{className:"text-sm font-semibold",children:"service"})]})})]}),e.jsxs("div",{className:"flex flex-col items-end",children:[e.jsxs("div",{className:"mb-2 flex items-center justify-center gap-1",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"h-4 w-4",children:e.jsx("path",{fillRule:"evenodd",d:"M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",clipRule:"evenodd"})}),e.jsx("span",{className:"text-xs font-bold",children:s.host.rating.length>0?(s.host.rating.map(a=>a.guestRating).reduce((a,g)=>a+g,0)/s.host.rating.length).toFixed(1):"No rating"})]}),s.host.uid!==((c=d.currentUser)==null?void 0:c.uid)&&e.jsx(e.Fragment,{children:e.jsx(R,{listingID:s._id})})]})]})]},s._id)}))})}):e.jsxs("div",{className:"mt-16 flex flex-col items-center justify-center",children:[e.jsx(U,{loop:!1,animationData:O,className:"h-64 w-64"}),e.jsx("span",{className:"text-xl font-bold text-gray-600",children:"No listings to show"})]})]})]})}export{B as default};
