import{d as u,j as f,E as a,k as p,o as _,c as g,l as V,t as h,f as e,a as t,i as k}from"./index.ea25dc33.js";import{_ as v}from"./dayjs.ab3c5591.js";import{_ as w}from"./DataBlock.vue_vue_type_script_setup_true_lang.f5cab9d6.js";import{b as B}from"./composable.5ce7e39b.js";import"./get.b0a8469e.js";const j=u({__name:"RouteView",setup(I){const{t:n}=f(),o=k(),s=a(()=>+o.params.id),i=a(()=>+o.params.columnId),{loading:l,model:c,fields:r,actions:m,fetch:d}=B(i,s);return p(()=>{s.value&&d()}),(x,E)=>(_(),g("div",null,[V("h1",null,h(e(n)("routes.viewTitle")),1),t(e(w),{fields:e(r),model:e(c),loading:e(l)},null,8,["fields","model","loading"]),t(e(v),{actions:e(m),class:"pt-8"},null,8,["actions"])]))}});export{j as default};