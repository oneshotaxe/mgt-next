import{d,j as m,E as u,k as f,o as p,c as _,l as g,t as V,f as e,a as o,i as h}from"./index.668956d2.js";import{_ as k}from"./dayjs.c94eb01b.js";import{_ as v}from"./DataBlock.vue_vue_type_script_setup_true_lang.c75c077a.js";import{b as w}from"./composable.71de5618.js";import"./get.a2513de1.js";const y=d({__name:"UserView",setup(B){const{t:a}=m(),t=h(),s=u(()=>+t.params.id),{loading:n,model:i,fields:l,actions:r,fetch:c}=w(s);return f(()=>{s.value&&c()}),(x,E)=>(p(),_("div",null,[g("h1",null,V(e(a)("users.viewTitle")),1),o(e(v),{fields:e(l),model:e(i),loading:e(n)},null,8,["fields","model","loading"]),o(e(k),{actions:e(r),class:"pt-8"},null,8,["actions"])]))}});export{y as default};