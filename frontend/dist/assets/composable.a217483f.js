import{u as h,j as _,M as C,O as P,D as l,x as y,B as Y,h as k,R as r,N as i}from"./index.7c99f015.js";import{u as x,f as R,a as N,r as I,b as c}from"./dayjs.b55bd095.js";const U=s=>{var A;const a=h(),{t:e}=_(),d=k(),v=C(),f=P(),m=l(()=>r[i.EMPLOYEE_COLUMN_LIST]),u=E=>r[i.EMPLOYEE_COLUMN_VIEW](E),o=l(()=>s.value?u(s.value):m.value),t=y(!1),n=Y({userId:(A=a.user)==null?void 0:A.id,title:""}),M=l(()=>({userId:{required:I},title:{required:I}})),p=x(M,n),g=l(()=>[{key:"save",text:e("actions.save"),buttonType:"submit",type:"PRIMARY",loading:t.value},{key:"cancel",text:e("actions.cancel"),to:o.value}]);return{loading:t,model:n,v$:p,actions:g,save:async()=>{if(!!await p.value.$validate())return v.confirm(e("dialogs.saveConfirm"),()=>(t.value=!0,(s.value?c.columns._id.put(s.value,n).then(()=>s.value):c.columns._id.post(n)).then(b=>(f.success(e("alerts.saveSuccess")),d.push(u(b)))).finally(()=>{t.value=!1})))},fetch:()=>(t.value=!0,c.columns._id.get(s.value).then(E=>Object.assign(n,E)).finally(()=>t.value=!1))}},w=()=>{const s=h(),{t:a}=_(),e=k(),d=l(()=>r[i.EMPLOYEE_COLUMN_CREATOR]),v=t=>r[i.EMPLOYEE_COLUMN_VIEW](t),f=y([{key:"id",title:a("fields.id")},{key:"title",title:a("fields.title")},{key:"createdAt",title:a("fields.createdAt"),format:R},{key:"updatedAt",title:a("fields.updatedAt"),format:R}]),m=N({order:"created_at desc",page:1,pageSize:10,fetch:c.columns.get,additionalParams:()=>{var t;return{userId:(t=s.user)==null?void 0:t.id}}}),u=l(()=>[{key:"create",to:d.value,text:a("actions.create"),type:"PRIMARY",prependIcon:"mdi-plus"}]);return{columns:f,table:m,actions:u,onRowClick:t=>e.push(v(t))}},j=s=>{var O;const a=h(),{t:e}=_(),d=k(),v=C(),f=P(),m=l(()=>r[i.EMPLOYEE_COLUMN_EDITOR](s.value)),u=l(()=>r[i.EMPLOYEE_COLUMN_LIST]),o=y(!1),t=Y({userId:(O=a.user)==null?void 0:O.id,title:""}),n=y([{key:"id",title:e("fields.id")},{key:"title",title:e("fields.title")},{key:"createdAt",title:e("fields.createdAt"),format:R},{key:"updatedAt",title:e("fields.updatedAt"),format:R}]),M=l(()=>[{key:"edit",text:e("actions.edit"),to:m.value,type:"PRIMARY"},{key:"remove",text:e("actions.remove"),click:p,type:"ERROR",loading:o.value},{key:"cancel",text:e("actions.toList"),to:u.value}]),p=()=>v.confirm(e("dialogs.removeConfirm"),()=>(o.value=!0,c.columns._id.delete(s.value).then(()=>(f.success(e("alerts.removeSuccess")),d.push(u.value))).finally(()=>{o.value=!1})));return{loading:o,model:t,fields:n,actions:M,fetch:()=>(o.value=!0,c.columns._id.get(s.value).then(L=>Object.assign(t,L)).finally(()=>o.value=!1))}};export{U as a,j as b,w as u};
