import{d as u,j as f,E as a,k as p,o as _,c as g,l as V,t as h,f as e,a as t,i as k}from"./index.89b09bb0.js";import{_ as v}from"./dayjs.61318a8b.js";import{_ as w}from"./DataBlock.vue_vue_type_script_setup_true_lang.242cf07b.js";import{b as B}from"./composable.0cd6be3b.js";import"./get.2f731681.js";const y=u({__name:"GateView",setup(I){const{t:n}=f(),o=k(),s=a(()=>+o.params.id),i=a(()=>+o.params.columnId),{loading:l,model:c,fields:m,actions:r,fetch:d}=B(i,s);return p(()=>{s.value&&d()}),(x,E)=>(_(),g("div",null,[V("h1",null,h(e(n)("gates.viewTitle")),1),t(e(w),{fields:e(m),model:e(c),loading:e(l)},null,8,["fields","model","loading"]),t(e(v),{actions:e(r),class:"pt-8"},null,8,["actions"])]))}});export{y as default};