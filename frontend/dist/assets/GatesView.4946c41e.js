import{d as u,j as c,E as f,k as g,o as _,c as w,l as v,t as V,f as e,a,w as k,i as x,r as C}from"./index.668956d2.js";import{_ as y}from"./dayjs.c94eb01b.js";import{_ as z}from"./DataTable.vue_vue_type_script_setup_true_lang.9157cba6.js";import{u as B}from"./composable.29292d1f.js";import"./get.a2513de1.js";const $=u({__name:"GatesView",setup(I){const{t:n}=c(),r=x(),l=f(()=>+r.params.columnId),{columns:i,table:o,actions:d,onRowClick:p}=B(l);return g(o.fetch),(R,t)=>{const m=C("v-text-field");return _(),w("div",null,[v("h1",null,V(e(n)("gates.listTitle")),1),a(e(y),{actions:e(d),reverse:"",class:"pt-8"},{default:k(()=>[a(m,{modelValue:e(o).search,"onUpdate:modelValue":t[0]||(t[0]=s=>e(o).search=s),"hide-details":"","prepend-inner-icon":"mdi-magnify",density:"compact"},null,8,["modelValue"])]),_:1},8,["actions"]),a(e(z),{page:e(o).page,"onUpdate:page":t[1]||(t[1]=s=>e(o).page=s),order:e(o).order,"onUpdate:order":t[2]||(t[2]=s=>e(o).order=s),columns:e(i),rows:e(o).rows,loading:e(o).loading,"page-size":e(o).pageSize,"server-total":e(o).total,onRowClick:t[3]||(t[3]=s=>e(p)(s.id))},null,8,["page","order","columns","rows","loading","page-size","server-total"])])}}});export{$ as default};
