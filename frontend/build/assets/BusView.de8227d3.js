import{d as u,j as f,E as a,k as p,o as _,c as g,l as B,t as V,f as e,a as t,i as h}from"./index.ea25dc33.js";import{_ as k}from"./dayjs.ab3c5591.js";import{_ as v}from"./DataBlock.vue_vue_type_script_setup_true_lang.f5cab9d6.js";import{b as w}from"./composable.1b528846.js";import"./get.b0a8469e.js";const y=u({__name:"BusView",setup(I){const{t:n}=f(),s=h(),o=a(()=>+s.params.id),i=a(()=>+s.params.columnId),{loading:l,model:c,fields:m,actions:r,fetch:d}=w(i,o);return p(()=>{o.value&&d()}),(b,x)=>(_(),g("div",null,[B("h1",null,V(e(n)("buses.viewTitle")),1),t(e(v),{fields:e(m),model:e(c),loading:e(l)},null,8,["fields","model","loading"]),t(e(k),{actions:e(r),class:"pt-8"},null,8,["actions"])]))}});export{y as default};