import{d as E,j as I,u as M,x as i,R as r,N as _,o as l,c as v,a as e,w as o,F as p,r as t,b as u,m as U,e as m,f as L,g as F,h as H,i as O,t as j}from"./index.7c99f015.js";const q=E({__name:"AdminView",setup(G){const{t:c}=I(),d=H(),f=O(),{logout:b}=M(),a=i(!0),k=i([{key:"dashboard",to:r[_.ADMIN_DASHBOARD],title:c("dashboard.title"),exact:!0},{key:"users",to:r[_.ADMIN_USER_LIST],title:c("users.listTitle")}]),y=()=>b().then(()=>d.push(r[_.AUTH]));return(P,s)=>{const x=t("v-app-bar-nav-icon"),w=t("v-toolbar-title"),A=t("v-spacer"),g=t("v-btn"),C=t("v-toolbar-items"),S=t("v-app-bar"),D=t("v-list-item"),N=t("v-list"),R=t("v-navigation-drawer"),T=t("v-slide-y-reverse-transition"),V=t("router-view"),h=t("v-container"),B=t("v-main");return l(),v(p,null,[e(S,{app:"",dark:"",flat:"",color:"primary"},{default:o(()=>[e(x,{onClick:s[0]||(s[0]=n=>a.value=!a.value)}),e(w,null,{default:o(()=>[u("MGT")]),_:1}),e(A),e(C,null,{default:o(()=>[e(g,{onClick:y},{default:o(()=>[u("\u0412\u044B\u0439\u0442\u0438")]),_:1})]),_:1})]),_:1}),e(R,{modelValue:a.value,"onUpdate:modelValue":s[1]||(s[1]=n=>a.value=n),app:""},{default:o(()=>[e(N,{nav:""},{default:o(()=>[(l(!0),v(p,null,U(k.value,n=>(l(),m(D,{key:n.key,to:n.to,exact:n.exact,"active-class":"text-primary"},{default:o(()=>[u(j(n.title),1)]),_:2},1032,["to","exact"]))),128))]),_:1})]),_:1},8,["modelValue"]),e(B,null,{default:o(()=>[e(h,null,{default:o(()=>[e(V,null,{default:o(({Component:n})=>[e(T,{mode:"out-in"},{default:o(()=>[(l(),m(F(n),{key:L(f).fullPath}))]),_:2},1024)]),_:1})]),_:1})]),_:1})],64)}}});export{q as default};