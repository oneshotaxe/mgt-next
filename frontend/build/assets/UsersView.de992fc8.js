import{d as p,j as m,k as u,o as c,c as d,l as f,t as g,f as e,a as t}from"./index.0cc843cd.js";import{_}from"./dayjs.565fdc9c.js";import{_ as w}from"./DataTable.vue_vue_type_script_setup_true_lang.260f1258.js";import{u as k}from"./composable.7f5174af.js";import"./get.c200ceda.js";const N=p({__name:"UsersView",setup(v){const{t:n}=m(),{columns:r,table:o,actions:l,onRowClick:i}=k();return u(o.fetch),(z,s)=>(c(),d("div",null,[f("h1",null,g(e(n)("users.listTitle")),1),t(e(_),{actions:e(l),reverse:""},null,8,["actions"]),t(e(w),{page:e(o).page,"onUpdate:page":s[0]||(s[0]=a=>e(o).page=a),columns:e(r),rows:e(o).rows,loading:e(o).loading,"page-size":e(o).pageSize,"server-total":e(o).total,onRowClick:s[1]||(s[1]=a=>e(i)(a.id))},null,8,["page","columns","rows","loading","page-size","server-total"])]))}});export{N as default};
