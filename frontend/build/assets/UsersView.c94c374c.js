import{d as p,j as m,k as u,o as c,c as d,l as f,t as g,f as e,a as t}from"./index.542bf2ca.js";import{_}from"./dayjs.4546f259.js";import{_ as w}from"./DataTable.vue_vue_type_script_setup_true_lang.c88d1310.js";import{u as k}from"./composable.e95b7349.js";import"./get.0b4bd993.js";const N=p({__name:"UsersView",setup(v){const{t:n}=m(),{columns:r,table:o,actions:l,onRowClick:i}=k();return u(o.fetch),(z,s)=>(c(),d("div",null,[f("h1",null,g(e(n)("users.listTitle")),1),t(e(_),{actions:e(l),reverse:""},null,8,["actions"]),t(e(w),{page:e(o).page,"onUpdate:page":s[0]||(s[0]=a=>e(o).page=a),columns:e(r),rows:e(o).rows,loading:e(o).loading,"page-size":e(o).pageSize,"server-total":e(o).total,onRowClick:s[1]||(s[1]=a=>e(i)(a.id))},null,8,["page","columns","rows","loading","page-size","server-total"])]))}});export{N as default};