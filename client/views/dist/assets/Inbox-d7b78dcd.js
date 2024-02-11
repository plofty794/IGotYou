import{k as e,a9 as k,j as x,u as q,ab as S}from"./index-08751a26.js";import{K as D,O as C,B as d,Q as p,T as I,V as T,W as P,X as R,Y as B,Z as F,_ as u,a0 as L,a1 as $,a2 as A,D as _,a3 as M,m as O,n as Q,o as K,S as N,a4 as U,a5 as H,a6 as y,j as E,a7 as W,u as z,a8 as G,a9 as V,aa as Y,ab as X,ac as Z,ad as b,ae as m,af as h,ag as f,ah as j,ai as g,aj as J,ak as ee}from"./App-9725fef7.js";function se({date:s,setDate:l}){return e.jsxs(D,{children:[e.jsx(C,{className:"w-full p-6",asChild:!0,children:e.jsxs(d,{id:"date",variant:"outline",className:`
              w-full justify-center font-medium ${!s&&"text-muted-foreground"}
              
            `,children:[e.jsx(k,{className:"mr-2 h-4 w-4"}),s!=null&&s.from?s.to?e.jsxs(e.Fragment,{children:[p(s.from,"LLL dd, y")," -"," ",p(s.to,"LLL dd, y")]}):p(s.from,"LLL dd, y"):e.jsx("span",{children:"Pick a date"})]})}),e.jsx(I,{className:"w-auto p-0",align:"start",children:e.jsx(T,{initialFocus:!0,mode:"range",defaultMonth:s==null?void 0:s.from,selected:s,onSelect:l,numberOfMonths:2,fromYear:2024})})]})}function te({setBookingRequestStatus:s}){return e.jsxs(P,{onValueChange:l=>s(l),children:[e.jsx(R,{className:"w-full",children:e.jsx(B,{placeholder:"Status"})}),e.jsxs(F,{children:[e.jsx(u,{value:"pending",children:"Pending"}),e.jsx(u,{value:"approved",children:"Approved"}),e.jsx(u,{value:"declined",children:"Declined"}),e.jsx(u,{value:"cancelled",children:"Cancelled"})]})]})}function ae(){const[s,l]=x.useState({from:new Date,to:L(new Date,10)}),[n,r]=x.useState(""),o=$(),c=A();return e.jsxs(_,{onOpenChange:i=>{i||(l({from:void 0,to:void 0}),r(""))},children:[e.jsx(M,{asChild:!0,children:e.jsx(d,{className:"rounded-full p-2",variant:"ghost",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"h-6 w-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"})})})}),e.jsxs(O,{children:[e.jsx(Q,{children:e.jsx(K,{className:"text-center",children:"Filters"})}),e.jsxs("div",{className:"flex flex-col gap-4 p-8 px-0",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Type of booking request"}),e.jsx(te,{setBookingRequestStatus:r}),e.jsx(N,{}),e.jsxs("div",{className:"flex w-full flex-col gap-2",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Date range"}),e.jsx("p",{className:"text-sm font-medium",children:"Booking request dates"}),e.jsx(se,{date:s,setDate:l})]})]}),e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsx(d,{variant:"outline",onClick:()=>{l({from:void 0,to:void 0}),r(""),o[1](""),setTimeout(()=>document.location.reload(),200)},children:"Clear all"}),e.jsx(d,{disabled:!n||!(s!=null&&s.from)||!s.to,onClick:()=>{const i=U([["status",n],["dateFrom",s.from.toDateString()],["dateTo",s.to.toDateString()]]);o[1](i.toString()),c(`/hosting-inbox/${location.search}`),setTimeout(()=>document.location.reload(),200)},className:"bg-gray-950",children:"Save filter"})]})]})]})}function le(){var r;const s=location.search?location.search.split("?")[1].split("&")[0].split("=")[1]:"",l=location.search?location.search.split("?")[1].split("&")[1].split("=")[1].split("+").join(" "):"",n=location.search?location.search.split("?")[1].split("&")[2].split("=")[1].split("+").join(" "):"";return H({queryKey:["host-booking-requests"],queryFn:async({pageParam:o})=>y.get(`/api/host-booking-requests/${o}`,{params:{status:s,requestedBookingDateStartsAt:l,requestedBookingDateEndsAt:n}}),getNextPageParam:(o,c)=>c.length+1,initialPageParam:1,enabled:((r=E.currentUser)==null?void 0:r.uid)!=null,refetchOnWindowFocus:!1})}function ne(s){return W({queryKey:["guest",s],queryFn:async()=>y.get(`/api/search-guest/${s}`),enabled:s!=="",refetchOnMount:!1,refetchOnWindowFocus:!1})}function oe(){var w;const s=q(),{id:l}=z(),{data:n}=le(),[r,o]=x.useState(""),c=ne(r),i=x.useMemo(()=>{var t;return r?(t=c.data)==null?void 0:t.data.guestNames:[]},[r,(w=c.data)==null?void 0:w.data.guestNames]);return console.log(i),x.useEffect(()=>{document.title="Host Inbox - IGotYou"},[]),e.jsxs("section",{className:"flex gap-4 p-4",children:[e.jsxs("div",{className:"flex w-1/3 flex-col gap-2",children:[e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsx("h1",{className:"text-2xl font-bold",children:" Booking requests"}),e.jsx(G,{children:e.jsxs(V,{children:[e.jsx(Y,{asChild:!0,children:e.jsx(d,{onClick:()=>{s.invalidateQueries({queryKey:["host-booking-requests"]}),s.invalidateQueries({queryKey:["booking-request"],exact:!1}),s.invalidateQueries({queryKey:["host-notifications"],exact:!1})},size:"sm",className:"rounded-full",variant:"outline",children:e.jsx(S,{className:"h-4 w-4"})})}),e.jsx(X,{children:e.jsx("p",{className:"text-xs font-medium",children:"Reload requests"})})]})})]}),e.jsxs("div",{className:"flex w-full items-center justify-between gap-2",children:[e.jsx(Z,{value:r,onChange:t=>o(t.target.value),placeholder:"Search guest name...",className:"w-full font-medium"}),e.jsx(ae,{})]}),(i==null?void 0:i.length)>0?e.jsxs(e.Fragment,{children:[e.jsx(b,{className:"mt-2 h-max max-h-[484px]",children:e.jsx("div",{className:"flex w-full flex-col gap-4",children:i.map(t=>t.type==="Service-Cancellation-Request"?e.jsx(m,{to:`/hosting-inbox/booking-request/${t._id}`,className:"rounded-md border font-bold text-gray-600 shadow-md",children:e.jsxs("div",{className:"flex gap-2 px-4 py-2",children:[e.jsxs(h,{children:[e.jsx(f,{className:"object-cover",src:t.guestID.photoUrl,alt:t.guestID.username}),e.jsx(j,{children:"CN"})]}),e.jsxs("div",{className:"flex w-full flex-col",children:[e.jsxs("div",{className:"flex w-full items-start justify-between",children:[e.jsx("span",{className:"text-xs",children:t.guestID.username}),e.jsx("span",{className:"text-xs text-gray-600",children:g(new Date(t.createdAt),{addSuffix:!0})})]}),e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsx("div",{className:"w-44 overflow-hidden text-ellipsis whitespace-nowrap",children:e.jsx("span",{className:"max-w-xs text-xs capitalize italic",children:String(t.type).split("-").join(" ")})}),e.jsx("span",{className:` ${t.status==="pending"?"text-amber-600 hover:text-amber-500":t.status==="approved"?"text-green-600 hover:text-green-500":"text-red-600 hover:text-red-500"}  w-max text-xs font-extrabold`,children:t.status})]})]})]})},t._id):e.jsx(m,{to:`/hosting-inbox/booking-request/${t._id}`,className:"rounded-md border font-bold text-gray-600 shadow-md",children:e.jsxs("div",{className:"flex gap-2 px-4 py-2",children:[e.jsxs(h,{children:[e.jsx(f,{className:"object-cover",src:t.guestID.photoUrl,alt:t.guestID.username}),e.jsx(j,{children:"CN"})]}),e.jsxs("div",{className:"flex w-full flex-col",children:[e.jsxs("div",{className:"flex w-full items-start justify-between",children:[e.jsx("span",{className:"text-xs",children:t.guestID.username}),e.jsx("span",{className:"text-xs text-gray-600",children:g(new Date(t.createdAt),{addSuffix:!0})})]}),e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsx("div",{className:"w-44 overflow-hidden text-ellipsis whitespace-nowrap",children:e.jsx("span",{className:"max-w-xs text-xs italic",children:t.message})}),e.jsx("span",{className:` ${t.status==="pending"?"text-amber-600 hover:text-amber-500":t.status==="approved"?"text-green-600 hover:text-green-500":"text-red-600 hover:text-red-500"}  w-max text-xs font-extrabold`,children:t.status})]})]})]})},t._id))})}),e.jsx(N,{})]}):n==null?void 0:n.pages.flatMap(t=>t.data.bookingRequests.length>0?e.jsxs(e.Fragment,{children:[e.jsx(b,{className:"mt-2 h-max max-h-[484px]",children:e.jsx("div",{className:"flex w-full flex-col gap-4",children:n==null?void 0:n.pages.flatMap(v=>v.data.bookingRequests.map(a=>a.type==="Service-Cancellation-Request"?e.jsx(m,{to:`/hosting-inbox/booking-request/${a._id}`,className:"rounded-md border font-bold text-gray-600 shadow-md",children:e.jsxs("div",{className:"flex gap-2 px-4 py-2",children:[e.jsxs(h,{children:[e.jsx(f,{className:"object-cover",src:a.guestID.photoUrl,alt:a.guestID.username}),e.jsx(j,{children:"CN"})]}),e.jsxs("div",{className:"flex w-full flex-col",children:[e.jsxs("div",{className:"flex w-full items-start justify-between",children:[e.jsx("span",{className:"text-xs",children:a.guestID.username}),e.jsx("span",{className:"text-xs text-gray-600",children:g(new Date(a.createdAt),{addSuffix:!0})})]}),e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsx("div",{className:"w-44 overflow-hidden text-ellipsis whitespace-nowrap",children:e.jsx("span",{className:"max-w-xs text-xs capitalize italic",children:String(a.type).split("-").join(" ")})}),e.jsx("span",{className:` ${a.status==="pending"?"text-amber-600 hover:text-amber-500":a.status==="approved"?"text-green-600 hover:text-green-500":"text-red-600 hover:text-red-500"}  w-max text-xs font-extrabold`,children:a.status})]})]})]})},a._id):e.jsx(m,{to:`/hosting-inbox/booking-request/${a._id}`,className:"rounded-md border font-bold text-gray-600 shadow-md",children:e.jsxs("div",{className:"flex gap-2 px-4 py-2",children:[e.jsxs(h,{children:[e.jsx(f,{className:"object-cover",src:a.guestID.photoUrl,alt:a.guestID.username}),e.jsx(j,{children:"CN"})]}),e.jsxs("div",{className:"flex w-full flex-col",children:[e.jsxs("div",{className:"flex w-full items-start justify-between",children:[e.jsx("span",{className:"text-xs",children:a.guestID.username}),e.jsx("span",{className:"text-xs text-gray-600",children:g(new Date(a.createdAt),{addSuffix:!0})})]}),e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsx("div",{className:"w-44 overflow-hidden text-ellipsis whitespace-nowrap",children:e.jsx("span",{className:"max-w-xs text-xs italic",children:a.message})}),e.jsx("span",{className:` ${a.status==="pending"?"text-amber-600 hover:text-amber-500":a.status==="approved"?"text-green-600 hover:text-green-500":"text-red-600 hover:text-red-500"}  w-max text-xs font-extrabold`,children:a.status})]})]})]})},a._id)))})}),e.jsx(N,{})]}):e.jsxs(e.Fragment,{children:[e.jsx(J,{to:"/hosting-inbox",replace:!0}),e.jsx("div",{className:"p-4",children:e.jsx("p",{className:"text-center text-lg font-semibold text-gray-600",children:"No booking requests"})})]}))]}),e.jsx("div",{className:"w-full",children:l?e.jsx(ee,{}):e.jsxs("div",{className:"flex min-h-[70vh] w-full flex-col items-center justify-center p-8",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"This is your Booking Requests page."}),e.jsx("p",{className:"text-lg font-medium text-gray-600",children:"Select a booking request to be shown here."})]})})]})}export{oe as default};
