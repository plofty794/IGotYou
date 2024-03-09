import{u as v,j as d,k as e,af as Ae,ag as ze,Z as Ve,I as Pe,ah as Ee,l as $,O as Ue,m as Ie,L as Le,a7 as X,ab as Me,a4 as L,M as te,P as E,a3 as H}from"./index-e8f63a44.js";import{a as k,u as A,D as z,a3 as V,m as P,n as T,o as O,B as m,q as _,av as Te,aw as Oe,ax as _e,ay as y,az as S,aA as R,aB as q,$ as Re,ac as W,K as qe,O as We,T as Ye,aC as Be,aD as Ge,aE as He,aF as Qe,aG as Ke,aH as ae,aI as re,aJ as ne,aK as le,aL as ie,aM as oe,aN as Ze,aO as Je,aP as Xe,aQ as De,i as K,aR as ce,aS as de,j as N,aT as es,am as me,an as ue,ao as xe,ap as he,aq as fe,ar as M,as as ge,at as je,au as ss,aU as ts,aV as as,S as U,L as pe,al as rs,aW as ns,a6 as ls,C,d as F,af as is,ag as os,ah as cs,g as D,aX as ee,f as I,h as Q,aY as ds}from"./App-6c52475f.js";function ms(){var f,u,x,c,h,b;const s=v(),{mutate:r}=k(),[a,i]=d.useState(""),[o,g]=d.useState(),[t,l]=d.useState(""),{id:j}=A(),n=s.getQueryData(["profile",j]);d.useEffect(()=>{navigator.geolocation.getCurrentPosition(w=>g(w.coords))},[]);function p(w){if(w.preventDefault(),!a)return l("Invalid address (eg. 4010 for Pila, 4010 Laguna, Philippines)");r({address:a}),l("")}return e.jsxs(z,{children:[e.jsxs(V,{className:`w-full border font-medium hover:bg-[#e9e9e9] ${(f=n==null?void 0:n.data)!=null&&f.user.address?"text-xs":"text-sm"}
           flex items-center justify-start rounded py-8 pl-4 pr-6 shadow-md`,children:[e.jsx("span",{className:"mr-2",children:e.jsx(Ae,{color:"black",width:25,height:25})}),e.jsx("p",{className:"text-gray-600",children:(u=n==null?void 0:n.data)!=null&&u.user.address?`Where I live: ${(x=n==null?void 0:n.data)==null?void 0:x.user.address}`:"Where I live"})]}),e.jsxs(P,{className:"p-8",children:[e.jsx(T,{children:e.jsx(O,{className:"text-xl text-[#222222]",children:(c=n==null?void 0:n.data)!=null&&c.user.address?"Current address":"Where do you live?"})}),(h=n==null?void 0:n.data)!=null&&h.user.address?e.jsxs("div",{className:"mt-4",children:[e.jsx("p",{className:"mb-2 text-sm font-medium",children:(b=n==null?void 0:n.data)==null?void 0:b.user.address}),e.jsx("div",{className:"flex items-center gap-2 pt-2",children:e.jsx(m,{onClick:()=>{i(""),r({address:""})},className:"rounded-full bg-[#222222] font-medium text-white",size:"lg",variant:"secondary",children:"Delete"})})]}):e.jsxs("form",{onSubmit:p,className:"mt-4",children:[e.jsx(_,{className:"text-sm font-medium",htmlFor:"address",children:"Your current address"}),e.jsxs(Te,{apiKey:Oe,children:[e.jsx("div",{className:"geo mb-1",children:e.jsx(_e,{biasByProximity:{lat:(o==null?void 0:o.latitude)??0,lon:(o==null?void 0:o.longitude)??0},limit:5,filterByCountryCode:["ph"],allowNonVerifiedHouseNumber:!1,skipIcons:!0,addDetails:!0,allowNonVerifiedStreet:!1,postprocessHook:w=>(i(`${w.properties.formatted}, ${w.properties.country_code.toUpperCase()}`),w.properties.formatted)})}),t&&e.jsx(y,{message:t})]}),e.jsx("div",{className:"flex items-center gap-2 pt-2",children:e.jsx(m,{className:"rounded-full bg-[#222222] font-medium text-white",size:"lg",variant:"secondary",children:"Save"})})]})]})]})}const us=S.object({funFact:S.string().min(1,{message:"This field is required"}).max(25,{message:"Just write a short fact about you at least 25 characters"})});function xs(){var j,n,p,f,u,x;const{formState:{errors:s},handleSubmit:r,register:a}=R({defaultValues:{funFact:""},resolver:q(us)}),i=v(),{mutate:o}=k(),{id:g}=A(),t=i.getQueryData(["profile",g]);function l(c){o({funFact:c.funFact})}return e.jsxs(z,{children:[e.jsxs(V,{className:`hover:bg-[#e9e9e9] w-full border font-medium ${(j=t==null?void 0:t.data)!=null&&j.user.funFact?"text-xs":"text-sm"}
           shadow-md flex justify-start items-center pl-4 pr-6 py-8 rounded`,children:[e.jsx("span",{className:"mr-2",children:e.jsx(ze,{color:"black",width:25,height:25})}),e.jsx("p",{className:"text-zinc-500",children:(n=t==null?void 0:t.data)!=null&&n.user.funFact?`Fun Fact about you: ${(p=t==null?void 0:t.data)==null?void 0:p.user.funFact}`:"My Fun Fact"})]}),e.jsxs(P,{className:"p-8",children:[e.jsx(T,{children:e.jsx(O,{className:"text-xl text-[#222222]",children:(f=t==null?void 0:t.data)!=null&&f.user.funFact?"Fun fact about you":"What's a fun fact about you?"})}),(u=t==null?void 0:t.data)!=null&&u.user.funFact?e.jsxs("div",{className:"mt-4",children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:(x=t==null?void 0:t.data)==null?void 0:x.user.funFact}),e.jsx("div",{className:"flex gap-2 items-center pt-2",children:e.jsx(m,{onClick:()=>o({funFact:""}),className:"bg-[#222222] text-white font-medium rounded-full",size:"lg",variant:"secondary",children:"Delete"})})]}):e.jsxs("form",{onSubmit:r(l),className:"mt-4",children:[e.jsx(Re,{className:"text-sm font-medium",htmlFor:"funFact",children:"Your Fun Fact"}),e.jsx(W,{...a("funFact"),type:"text",id:"funFact",className:"mb-2"}),s.funFact&&e.jsx(y,{message:s.funFact.message}),e.jsx("div",{className:"flex gap-2 items-center pt-2",children:e.jsx(m,{className:"bg-[#222222] text-white font-medium rounded-full",size:"lg",variant:"secondary",children:"Save"})})]})]})]})}const se=["High School Diploma","Associate's Degree","Bachelor's Degree","Master's Degree","Doctorate","Professional License","No Formal Education"];function hs(){var n,p,f,u,x,c;const[s,r]=d.useState(!1),[a,i]=d.useState(""),o=v(),{mutate:g}=k(),{id:t}=A(),l=o.getQueryData(["profile",t]);function j(h){h.preventDefault(),g({educationalAttainment:a})}return e.jsxs(z,{children:[e.jsxs(V,{className:`border font-medium hover:bg-[#e9e9e9] ${(n=l==null?void 0:l.data)!=null&&n.user.educationalAttainment?"text-xs":"text-sm"}
          flex items-center rounded py-8 pl-4 pr-6 shadow-md`,children:[e.jsx("span",{className:"mr-2",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"black",className:"h-6 w-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"})})}),e.jsx("p",{className:"capitalize text-gray-600",children:(p=l==null?void 0:l.data)!=null&&p.user.educationalAttainment?`Educational attainment: ${(f=l==null?void 0:l.data)==null?void 0:f.user.educationalAttainment}`:"Educational attainment"})]}),e.jsxs(P,{className:"gap-2 p-8",children:[e.jsx(T,{children:e.jsx(O,{className:"text-lg font-semibold",children:(u=l==null?void 0:l.data)!=null&&u.user.educationalAttainment?"Your highest educational attainment":"What is your highest level of education completed?"})}),(x=l==null?void 0:l.data)!=null&&x.user.educationalAttainment?e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("p",{className:"text-sm font-semibold capitalize underline",children:(c=l==null?void 0:l.data)==null?void 0:c.user.educationalAttainment}),e.jsx("div",{className:"flex items-center gap-2 pt-2",children:e.jsx(m,{onClick:()=>{i(""),g({educationalAttainment:""})},className:"rounded-full bg-gray-950 font-medium",size:"lg",children:"Delete"})})]}):e.jsxs("form",{onSubmit:j,className:"flex flex-col",children:[e.jsxs(qe,{open:s,onOpenChange:r,children:[e.jsx(We,{asChild:!0,children:e.jsxs(m,{variant:"outline",role:"combobox","aria-expanded":s,className:"w-full gap-2 font-medium",children:[a?se.find(h=>h.toLowerCase()===a.toLowerCase()):"Select attainment",e.jsx(Ve,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(Ye,{className:"p-0",children:e.jsxs(Be,{children:[e.jsx(Ge,{placeholder:"Search attainment...",className:"h-9"}),e.jsx(He,{children:"No attainment found."}),e.jsx(Qe,{children:se.map(h=>e.jsxs(Ke,{value:h,onSelect:b=>{i(b.toLowerCase()===a.toLowerCase()?"":b),r(!1)},children:[h,e.jsx(Pe,{className:` ml-auto h-4 w-4
                   ${a.toLowerCase()===h.toLowerCase()?"opacity-100":"opacity-0"}`})]},h))})]})})]}),e.jsx("div",{className:"flex items-center gap-2 pt-2",children:e.jsx(m,{disabled:!a,className:"rounded-full bg-gray-950 font-medium",size:"lg",children:"Save"})})]})]})]})}const fs=S.object({work:S.string().min(1,{message:"This field is required"}).max(20,{message:"Just write a short description about your work"})});function gs(){var j,n,p,f,u,x;const{formState:{errors:s},handleSubmit:r,register:a}=R({defaultValues:{work:""},resolver:q(fs)}),i=v(),{mutate:o}=k(),{id:g}=A(),t=i.getQueryData(["profile",g]);function l(c){o({work:c.work})}return e.jsxs(z,{children:[e.jsxs(V,{className:`hover:bg-[#e9e9e9] border w-full font-medium ${(j=t==null?void 0:t.data)!=null&&j.user.work?"text-xs":"text-sm"}
           shadow-md flex justify-start items-center pl-4 pr-6 py-8 rounded`,children:[e.jsx("span",{className:"mr-2",children:e.jsx(Ee,{color:"black",width:25,height:25})}),e.jsx("p",{className:"text-zinc-500",children:(n=t==null?void 0:t.data)!=null&&n.user.work?`My work: ${(p=t==null?void 0:t.data)==null?void 0:p.user.work}`:"My work"})]}),e.jsxs(P,{className:"p-8",children:[e.jsx(T,{children:e.jsx(O,{className:"text-xl text-[#222222]",children:(f=t==null?void 0:t.data)!=null&&f.user.work?"Your current work":"What's your work?"})}),(u=t==null?void 0:t.data)!=null&&u.user.work?e.jsxs("div",{className:"mt-4",children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:(x=t==null?void 0:t.data)==null?void 0:x.user.work}),e.jsx("div",{className:"flex gap-2 items-center pt-2",children:e.jsx(m,{onClick:()=>o({work:""}),className:"bg-[#222222] text-white font-medium rounded-full",size:"lg",variant:"secondary",children:"Delete"})})]}):e.jsxs("form",{onSubmit:r(l),className:"mt-4",children:[e.jsx(_,{className:"text-sm font-medium",htmlFor:"work",children:"Your work"}),e.jsx(W,{...a("work"),type:"text",id:"work",className:"mb-2"}),s.work&&e.jsx(y,{message:s.work.message}),e.jsx("div",{className:"flex gap-2 items-center pt-2",children:e.jsx(m,{className:"bg-[#222222] text-white font-medium rounded-full",size:"lg",variant:"secondary",children:"Save"})})]})]})]})}function js(){return e.jsxs(e.Fragment,{children:[e.jsx(hs,{}),e.jsx(gs,{}),e.jsx(ms,{}),e.jsx(xs,{})]})}const ps=Ze,bs=Je,Ns=le,be=({...s})=>e.jsx(ae,{...s});be.displayName=ae.displayName;const Ne=d.forwardRef(({className:s,...r},a)=>e.jsx(re,{className:$("fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-zinc-950/80",s),...r,ref:a}));Ne.displayName=re.displayName;const ws=Ie("fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-zinc-950",{variants:{side:{top:"inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",bottom:"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",left:"inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",right:"inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"}},defaultVariants:{side:"right"}}),we=d.forwardRef(({side:s="right",className:r,children:a,...i},o)=>e.jsxs(be,{children:[e.jsx(Ne,{}),e.jsxs(ne,{ref:o,className:$(ws({side:s}),r),...i,children:[a,e.jsxs(le,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800",children:[e.jsx(Ue,{className:"h-4 w-4"}),e.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));we.displayName=ne.displayName;const ye=({className:s,...r})=>e.jsx("div",{className:$("flex flex-col space-y-2 text-center sm:text-left",s),...r});ye.displayName="SheetHeader";const ve=({className:s,...r})=>e.jsx("div",{className:$("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",s),...r});ve.displayName="SheetFooter";const ke=d.forwardRef(({className:s,...r},a)=>e.jsx(ie,{ref:a,className:$("text-lg font-semibold text-zinc-950 dark:text-zinc-50",s),...r}));ke.displayName=ie.displayName;const Ce=d.forwardRef(({className:s,...r},a)=>e.jsx(oe,{ref:a,className:$("text-sm text-zinc-500 dark:text-zinc-400",s),...r}));Ce.displayName=oe.displayName;const Fe=Xe,Se=De,ys=S.object({username:S.string().min(1,{message:"Invalid username"}).min(5,{message:"Username too short"}).max(15,{message:"Username must be at least 15 characters"})});K.register();function vs({data:s}){var u,x;const[r,a]=d.useState(!1),{mutate:i,isPending:o}=k(),[g,t]=d.useState(""),{register:l,handleSubmit:j,formState:{errors:n},setValue:p}=R({defaultValues:{username:((u=s==null?void 0:s.data)==null?void 0:u.user.username)??""},resolver:q(ys)});async function f(c){var b;const{username:h}=c;if(h===((b=s==null?void 0:s.data)==null?void 0:b.user.username))return t("This is already your current username");await de(N.currentUser,{displayName:h}),i({username:h}),t("")}return e.jsxs(ce,{open:r,onOpenChange:c=>a(c),children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"text-sm",children:[e.jsx(_,{className:"font-semibold",htmlFor:"username",children:"Username"}),e.jsx("p",{id:"username",className:`mt-2 ${r?"hidden":""}`,children:(x=s==null?void 0:s.data)==null?void 0:x.user.username})]}),e.jsx(Fe,{children:e.jsx("span",{className:"text-sm font-medium underline",children:r?"Cancel":"Edit"})})]}),e.jsx("form",{onSubmit:j(f),children:e.jsxs(Se,{children:[e.jsx("span",{className:"text-sm",children:"This is the name on your IGotYou account."}),e.jsx("div",{className:"mt-4 flex gap-2",children:e.jsxs("div",{className:"flex w-full flex-col gap-1",children:[e.jsx(W,{...l("username"),autoFocus:!0}),n.username&&e.jsx(y,{message:n.username.message}),g&&e.jsx(y,{message:g})]})}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(m,{onClick:()=>{t(""),p("username","")},className:"mt-3 w-max rounded-full bg-[#222222] text-xs font-semibold",children:"Clear"}),e.jsx(m,{className:"mt-3 w-max rounded-full bg-[#222222] text-xs font-semibold",children:o?e.jsx("l-dot-pulse",{size:"35",speed:"1.3",color:"white"}):"Save"})]})]})})]})}K.register();function ks({data:s}){var h,b,w;const r=es(),{toast:a}=Le(),[i,o]=d.useState(!1),{mutate:g,isPending:t}=k(),[l,j]=d.useState(""),n=((h=s==null?void 0:s.data)==null?void 0:h.user.email)&&((b=s==null?void 0:s.data)==null?void 0:b.user.email.replace(/^(\w)+/,`${s.data.user.email[0]}***`)),{register:p,handleSubmit:f,formState:{errors:u},setValue:x}=R({defaultValues:{email:(w=s==null?void 0:s.data)==null?void 0:w.user.email},resolver:q(ts)});async function c(Y){var Z;const{email:B}=Y;if(B===((Z=s==null?void 0:s.data)==null?void 0:Z.user.email))return j("This is already your current email address");try{await as(N.currentUser,B),g({email:B}),X(e.jsxs("div",{className:"flex w-max gap-2",children:[e.jsx(Me,{color:"white",className:"inline-block h-6 w-6 animate-spin rounded-full bg-green-500 p-1"}),e.jsx("p",{className:"text-sm font-semibold",children:"Logging out..."})]}),{duration:2e3}),setTimeout(async()=>{await r(),window.location.reload()},3e3)}catch($e){const J=$e,G=(J.code.split("/")[1].slice(0,1).toUpperCase()+J.code.split("/")[1].slice(1)).split("-").join(" ");G==="Requires recent login"?X("Uh oh!",{description:G+". Re-login your account.",duration:5e3,icon:e.jsx(L,{color:"white",className:"h-4 w-4 rounded-full bg-[#dc2626]"}),action:{label:"Log out",onClick:async()=>await r()},actionButtonStyle:{backgroundColor:"white",color:"black",border:"1px solid black",borderRadius:"6px",cursor:"pointer"}}):a({title:"Oops! An error occurred.",description:G,variant:"destructive"})}}return e.jsxs(ce,{open:i,onOpenChange:Y=>o(Y),children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"text-sm",children:[e.jsx(_,{htmlFor:"email",children:"Email"}),e.jsx("p",{id:"email",className:`mt-2 text-sm ${i?"hidden":""}`,children:n})]}),e.jsx(Fe,{children:e.jsx("span",{className:"text-sm font-medium underline",children:i?"Cancel":"Edit"})})]}),e.jsxs(Se,{children:[e.jsx("span",{className:"text-sm",children:"Use an email address you’ll always have access to."}),e.jsxs("div",{className:"mt-4 flex flex-col gap-2",children:[e.jsx("div",{className:"w-full",children:e.jsx(W,{autoComplete:"off",placeholder:"Email address",...p("email")})}),u.email&&e.jsx(y,{message:u.email.message}),l&&e.jsx(y,{message:l})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(m,{onClick:()=>{j(""),x("email","")},className:"mt-3 w-max rounded-full bg-[#222222] text-xs font-semibold",children:"Clear"}),e.jsx(Cs,{changeEmail:c,handleSubmit:f,isPending:t})]})]})]})}function Cs({isPending:s,handleSubmit:r,changeEmail:a}){return e.jsxs(me,{children:[e.jsx(ue,{type:"button",asChild:!0,children:e.jsx(m,{type:"button",className:"mt-3 w-max rounded-full bg-[#222222] text-xs font-semibold",children:"Save"})}),e.jsxs(xe,{className:"max-w-xl",children:[e.jsx(he,{children:e.jsx(fe,{children:"Are you sure you want to change your email address?"})}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs(M,{className:"font-medium text-black",children:["Changing your email address will"," ",e.jsx("span",{className:"font-bold text-red-500 underline",children:"send a confirmation email"})," ","to the new address provided. Once you"," ",e.jsx("span",{className:"font-bold text-red-500 underline",children:"click the link"})," ","in the confirmation email, you will be able to sign in with your new email address."]}),e.jsxs(M,{className:"font-medium text-black",children:["Please"," ",e.jsx("span",{className:"font-bold text-red-500 underline",children:"ensure that the new email address is correct and valid."})," ","If an unverified or non-existing email address is provided, your account cannot be retrieved."]}),e.jsx(M,{className:"font-medium text-black",children:"Proceeding with an incorrect email address may result in account access issues."})]}),e.jsxs(ge,{children:[e.jsx(je,{className:"rounded-full",children:"Cancel"}),e.jsx("form",{onSubmit:r(a),children:e.jsx(ss,{type:"submit",className:"rounded-full bg-gray-950",children:s?e.jsx("l-dot-pulse",{size:"35",speed:"1.3",color:"white"}):"Continue"})})]})]})]})}const Fs=d.lazy(()=>te(()=>import("./CollapsiblePhoneNumber-0669af36.js"),["assets/CollapsiblePhoneNumber-0669af36.js","assets/index-e8f63a44.js","assets/index-329e204f.css","assets/App-6c52475f.js","assets/App-40b7b6bf.css"]));function Ss(){var i,o;const s=v(),{id:r}=A(),a=s.getQueryData(["profile",r]);return e.jsxs(ps,{children:[e.jsx(bs,{asChild:!0,children:e.jsx(m,{className:"mt-2 rounded-full bg-white text-sm font-semibold text-[#222222] shadow-md",variant:"outline",children:"Edit info"})}),e.jsxs(we,{className:"profile-sheet overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full",side:"left",children:[e.jsxs(ye,{children:[e.jsx(ke,{children:"Edit Personal info"}),e.jsx(Ce,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsx(vs,{data:a}),e.jsx(U,{}),e.jsx(ks,{data:a}),e.jsx(U,{}),e.jsx(d.Suspense,{fallback:e.jsx("h1",{children:"Loading..."}),children:e.jsx(Fs,{data:a})}),!((i=a==null?void 0:a.data)!=null&&i.user.identityVerified)&&e.jsxs(e.Fragment,{children:[e.jsx(U,{}),e.jsx(m,{className:"bg-gray-950",children:e.jsx(pe,{className:"w-full",to:`/users/identity-verification/${(o=a==null?void 0:a.data)==null?void 0:o.user.uid}`,children:"Verify your identity"})})]}),e.jsx(U,{})]}),e.jsx(ve,{children:e.jsx(Ns,{asChild:!0,children:e.jsx(m,{className:"mt-4 rounded-full bg-gray-950",type:"submit",children:"Close"})})})]})]})}function $s(){const{id:s}=A(),r=v();return rs({mutationFn:async a=>{try{a.emailVerified?ls.patch("/api/users/current-user/verify-email",{...a}):await ns(N.currentUser)}catch(i){const o=i,g=(o.code.split("/")[1].slice(0,1).toUpperCase()+o.code.split("/")[1].slice(1)).split("-").join(" ");E({title:"Oops! An error occurred.",description:g,variant:"destructive"})}},onSuccess:async(a,{emailVerified:i})=>{i?(E({title:"Success! 🎉",description:"Your email has been verified.",className:"bg-[#FFF]"}),r.invalidateQueries({queryKey:["profile",s]})):E({title:"Verification email has been sent",description:"After verifying your email click the reload button.",className:"bg-[#FFF] "})},onError(a){E({title:"Oops! An error occurred.",description:a.response.data.error,variant:"destructive"})}})}K.register();const As=d.lazy(()=>te(()=>import("./Listings-013f3708.js"),["assets/Listings-013f3708.js","assets/index-e8f63a44.js","assets/index-329e204f.css","assets/App-6c52475f.js","assets/App-40b7b6bf.css"]));function zs({profileData:s,recentListings:r}){var f,u,x;const a=v(),{mutate:i,isPending:o,isSuccess:g}=$s(),t=k(),[l,j]=d.useState(""),[n,p]=d.useState();return d.useEffect(()=>{var c;(c=N.currentUser)!=null&&c.emailVerified&&s.emailVerified===!1&&i({emailVerified:!0})},[i,s.emailVerified]),d.useEffect(()=>{var c;j(s==null?void 0:s.photoUrl),t.isSuccess&&a.invalidateQueries({queryKey:["profile",(c=N.currentUser)==null?void 0:c.uid]})},[s==null?void 0:s.photoUrl,a,t.isSuccess]),d.useEffect(()=>{if(n)return;const c=window.cloudinary.createUploadWidget({cloudName:"dop5kqpod",uploadPreset:"s6lymwwh",folder:"IGotYou-Avatars",resourceType:"image",cropping:!0},async(h,b)=>{b.event==="success"&&(t.mutate({photoUrl:b.info.secure_url}),j(b.info.secure_url),de(N.currentUser,{photoURL:b.info.secure_url}))});c&&p(c)},[n,t]),e.jsx(e.Fragment,{children:e.jsxs("section",{className:"mx-auto my-14 flex w-5/6 gap-16 max-lg:flex-col",children:[e.jsxs("div",{className:"flex h-max w-2/4 flex-col justify-between gap-4 max-lg:w-full",children:[e.jsxs(C,{className:"px-22 flex w-full flex-col items-center justify-center py-5 shadow-lg max-lg:w-full",children:[e.jsxs(F,{className:"relative p-4",children:[e.jsxs(z,{children:[e.jsx(V,{className:"cursor-zoom-in",children:e.jsxs(is,{className:"h-[80px] w-[80px]",children:[e.jsx(os,{loading:"lazy",className:"max-h-full max-w-full object-cover transition-all hover:scale-105",src:((f=N.currentUser)==null?void 0:f.photoURL)??l??"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images",alt:`${s==null?void 0:s.username}'s avatar`}),e.jsx(cs,{children:"CN"})]})}),e.jsx(P,{className:"p-0",children:e.jsx("img",{className:"max-w-lg rounded-lg",src:((u=N.currentUser)==null?void 0:u.photoURL)??l??"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images",alt:`${s==null?void 0:s.username}'s avatar`})})]}),e.jsx(m,{onClick:()=>n==null?void 0:n.open(),type:"button",className:"absolute bottom-2 right-2 z-10 mx-auto rounded-full border bg-zinc-600 px-[0.70rem] py-2 text-center text-zinc-200",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"h-4 w-4",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"})]})})]}),e.jsxs(D,{className:"flex flex-col p-0",children:[e.jsx("span",{className:"text-2xl font-bold",children:(s==null?void 0:s.username)??e.jsx(ee,{className:"h-4 w-[100px]"})}),e.jsx("span",{className:"text-sm font-bold text-gray-600",children:(s==null?void 0:s.userStatus)==="host"?"Host":"Guest"})]})]}),e.jsxs(C,{className:"w-full shadow-lg max-lg:w-full",children:[e.jsx(F,{children:e.jsx("span",{className:"text-xl font-semibold",children:s!=null&&s.username?(s==null?void 0:s.username)+"'s confirmed information":e.jsx(ee,{className:"mx-auto h-4 w-[250px]"})})}),e.jsxs(I,{className:"flex flex-col gap-2",children:[s.identityVerified?e.jsxs("div",{className:"font-medium",children:[e.jsx(H,{color:"#FFF",width:22,height:22,className:"inline-block rounded-full bg-[#39c152]"})," ",e.jsx("span",{className:"ml-2 text-sm font-semibold text-gray-600",children:"Identity (verified)"})]}):e.jsxs("div",{className:"font-medium",children:[e.jsx(L,{color:"#FFF",width:22,height:22,className:"inline-block rounded-full bg-[#e94242]"})," ",e.jsx("span",{className:"ml-2  text-sm font-semibold text-gray-600",children:"Identity (not verified)"})]}),s!=null&&s.emailVerified?e.jsxs("div",{className:"font-medium",children:[e.jsx(H,{color:"#FFF",width:22,height:22,className:"inline-block rounded-full bg-[#39c152]"})," ",e.jsx("span",{className:"ml-2 text-sm font-semibold text-gray-600",children:"Email address (verified)"})]}):e.jsxs("div",{className:"font-medium",children:[e.jsx(L,{color:"#FFF",width:22,height:22,className:"inline-block rounded-full bg-[#e94242]"})," ",e.jsx("span",{className:"ml-2 text-sm font-semibold text-gray-600",children:"Email address (not verified)"})]}),s!=null&&s.mobileVerified?e.jsxs("div",{className:"font-medium",children:[e.jsx(H,{color:"#FFF",width:22,height:22,className:"inline-block rounded-full bg-[#39c152]"})," ",e.jsx("span",{className:"ml-2 text-sm font-semibold text-gray-600",children:"Mobile phone (verified)"})]}):e.jsxs("div",{className:"font-medium",children:[e.jsx(L,{color:"#FFF",width:22,height:22,className:"inline-block rounded-full bg-[#e94242]"})," ",e.jsx("span",{className:"ml-2  text-sm font-semibold text-gray-600",children:"Mobile phone (not verified)"})]})]})]}),e.jsxs(C,{className:"w-full shadow-lg",children:[e.jsxs(F,{className:"px-6 pb-2 pt-6 text-gray-950",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"h-10 w-10",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"})}),e.jsx("p",{className:"text-lg font-bold",children:s!=null&&s.emailVerified?"Personal info":"Verify your email to edit your personal info"}),e.jsx("p",{className:"text-sm font-semibold text-gray-600",children:"Provide personal details and how we can reach you"})]}),e.jsx(I,{children:s!=null&&s.emailVerified?e.jsx(Ss,{}):g&&((x=N.currentUser)==null?void 0:x.emailVerified)==!1?e.jsx(m,{type:"button",className:"ml-2 mt-2 rounded-full  bg-gray-950 text-sm font-semibold",onClick:()=>document.location.reload(),children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"h-5 w-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"})})}):e.jsx(m,{onClick:async()=>{var c;return i({emailVerified:(c=N.currentUser)==null?void 0:c.emailVerified})},className:"mt-2 rounded-full  bg-gray-950 text-sm font-semibold",children:o?e.jsx("l-dot-pulse",{size:"30",speed:"1.3",color:"white"}):"Verify email"})})]})]}),e.jsxs("div",{className:"flex w-full flex-col gap-4",children:[e.jsxs(C,{className:"shadow-lg",children:[e.jsx(F,{className:"p-6",children:e.jsx(Q,{className:"text-4xl font-semibold text-gray-950",children:"Your profile"})}),e.jsx("div",{className:"px-6 py-2",children:e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"The information you share will be used across IGotYou to help other guests and hosts get to know you."})}),e.jsx(D,{className:"mt-2 text-[#3c3b3b]",children:e.jsx("div",{className:"grid w-full gap-2 md:grid-cols-1 lg:grid-cols-2 ",children:e.jsx(js,{})})})]}),(r==null?void 0:r.length)>0||s.listings.length>0?e.jsx(d.Suspense,{fallback:e.jsx(ds,{}),children:e.jsx(As,{recentListings:r,listingsCount:s.listings.length})}):s.emailVerified?e.jsx(e.Fragment,{children:e.jsxs(C,{className:"w-full shadow-lg",children:[e.jsx(F,{children:e.jsx(Q,{className:"text-center text-lg font-semibold text-gray-600",children:"You have no listings to show"})}),e.jsx(I,{className:"mx-auto w-max",children:e.jsx(m,{className:"rounded-full bg-gray-950",children:e.jsx(pe,{to:`/become-a-host/${N.currentUser&&N.currentUser.uid}`,children:"Create a listing"})})})]})}):e.jsx(e.Fragment,{children:e.jsxs(C,{className:"w-full shadow-lg",children:[e.jsx(F,{children:e.jsx(Q,{className:"text-center text-lg font-semibold text-gray-600",children:"You have no listings to show"})}),e.jsx(I,{className:"mx-auto w-max",children:e.jsxs(me,{children:[e.jsx(ue,{asChild:!0,children:e.jsx(m,{className:"rounded-full bg-gray-950",children:"Subscribe to create"})}),e.jsxs(xe,{children:[e.jsx(he,{children:e.jsxs(fe,{className:"flex items-center gap-1 font-semibold",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"red",className:"h-7 w-7",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"})}),"You're email is not verified yet."]})}),e.jsx(M,{className:"text-sm font-medium text-gray-600",children:"To create a listing, users are required to have a verified email. Attempting this action without a verified email is useless."}),e.jsx(ge,{children:e.jsx(je,{className:"rounded-full",children:"Close"})})]})]})})]})})]})]})})}const Es=Object.freeze(Object.defineProperty({__proto__:null,default:zs},Symbol.toStringTag,{value:"Module"}));export{Fe as C,Es as P,Se as a};
