import{g as _}from"./get.a2513de1.js";import{d as x,E as y,o as l,c as o,a as u,w as f,l as s,F as c,m,f as $,r as d,q as E,t as g,b,p as M,e as j,n as q}from"./index.668956d2.js";const w={class:"data-table"},L=s("th",{width:"72px"},null,-1),U=["onClick"],W=s("td",null,null,-1),A={key:2},G={class:"d-flex justify-end"},J=x({__name:"DataTable",props:{columns:null,rows:null,loading:{type:Boolean},pageSize:{default:10},page:{default:1},order:null,itemKey:{default:"id"},serverTotal:{default:0}},emits:["update:order","update:page","row-click"],setup(r,{emit:v}){const k=r,C=y(()=>Math.ceil(k.serverTotal/k.pageSize)),V=y(()=>{var e,a;return(a=(e=k.order)==null?void 0:e.split(" "))==null?void 0:a[0]}),S=y(()=>{var e,a;return(a=(e=k.order)==null?void 0:e.split(" "))==null?void 0:a[1]}),z=e=>{if(!!e){if(e===V.value){v("update:order",`${e} ${S.value==="asc"?"desc":"asc"}`);return}v("update:order",`${e} asc`)}},B=()=>`${Math.random()*50+50}%`,i=(e,a)=>_(e,a.key),h=(e,a)=>{const p=i(e,a);return a.format?a.format(p):p};return(e,a)=>{const p=d("skeletor"),K=d("v-icon"),N=d("v-btn"),T=d("router-link"),D=d("v-table"),F=d("v-pagination");return l(),o("div",w,[u(D,null,{default:f(()=>[s("thead",null,[s("tr",null,[L,(l(!0),o(c,null,m(r.columns,t=>(l(),o("th",{key:t.key,class:E({"orderable-column":!!t.orderKey}),onClick:n=>z(t.orderKey)},g(t.title),11,U))),128))])]),s("tbody",null,[r.loading?(l(!0),o(c,{key:0},m(r.pageSize,t=>(l(),o("tr",{key:t},[W,(l(!0),o(c,null,m(r.columns,n=>(l(),o("td",{key:n.key},[s("span",null,[u(p,{width:B()},null,8,["width"])])]))),128))]))),128)):(l(!0),o(c,{key:1},m(r.rows,t=>(l(),o("tr",{key:$(_)(t,r.itemKey)},[s("td",null,[u(N,{rounded:"",icon:"",flat:"",size:"small",onClick:n=>e.$emit("row-click",t)},{default:f(()=>[u(K,null,{default:f(()=>[b("mdi-arrow-right")]),_:1})]),_:2},1032,["onClick"])]),(l(!0),o(c,null,m(r.columns,n=>(l(),o("td",{key:n.key},[e.$slots[`item-${n.key}`]?M(e.$slots,`item-${n.key}`,{key:0,column:n,row:t,value:i(t,n)}):i(t,n)&&n.to?(l(),j(T,{key:1,to:n.to(i(t,n),t)},{default:f(()=>[b(g(h(t,n)),1)]),_:2},1032,["to"])):i(t,n)?(l(),o("span",A,g(h(t,n)),1)):q("",!0)]))),128))]))),128))])]),_:3}),s("div",G,[u(F,{dense:"",density:"comfortable","model-value":r.page,length:$(C),"total-visible":5,"onUpdate:modelValue":a[0]||(a[0]=t=>e.$emit("update:page",t))},null,8,["model-value","length"])])])}}});export{J as _};