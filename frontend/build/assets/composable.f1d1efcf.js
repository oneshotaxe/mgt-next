import{u as M,j as R,M as I,O as L,E as n,y as v,C as O,h as _,R as m,N as y}from"./index.542bf2ca.js";import{u as b,f as E,a as C,r as A,b as p}from"./dayjs.4546f259.js";const T=s=>{var g;const a=M(),{t}=R(),l=_(),c=I(),o=L(),u=h=>m[y.EMPLOYEE_COLUMN_VIEW](h),i=n(()=>u(s.value)),e=v(!1),r=O({userId:(g=a.user)==null?void 0:g.id,title:""}),d=n(()=>({userId:{required:A},title:{required:A}})),f=b(d,r),k=n(()=>[{key:"save",text:t("actions.save"),buttonType:"submit",type:"PRIMARY",loading:e.value},{key:"cancel",text:t("actions.cancel"),to:i.value}]);return{loading:e,model:r,v$:f,actions:k,save:async()=>{if(!!await f.value.$validate())return c.confirm(t("dialogs.saveConfirm"),()=>(e.value=!0,p.columns._id.put(s.value,r).then(()=>(o.success(t("alerts.saveSuccess")),l.push(u(s.value)))).finally(()=>{e.value=!1})))},fetch:()=>(e.value=!0,p.columns._id.get(s.value).then(h=>Object.assign(r,h)).finally(()=>e.value=!1))}},Y=()=>{const s=M(),{t:a}=R(),t=_(),l=e=>m[y.EMPLOYEE_COLUMN_VIEW](e),c=v([{key:"title",orderKey:"title",title:a("fields.title")},{key:"createdAt",orderKey:"created_at",title:a("fields.createdAt"),format:E},{key:"updatedAt",title:a("fields.updatedAt"),format:E}]),o=C({order:"created_at desc",page:1,pageSize:10,fetch:p.columns.get,additionalParams:()=>{var e;return{userId:(e=s.user)==null?void 0:e.id}}}),u=n(()=>[]);return{columns:c,table:o,actions:u,onRowClick:e=>t.push(l(e))}},j=s=>{var d;const a=M(),{t}=R(),l=n(()=>m[y.EMPLOYEE_COLUMN_EDITOR](s.value)),c=n(()=>m[y.EMPLOYEE_COLUMN_LIST]),o=v(!1),u=O({userId:(d=a.user)==null?void 0:d.id,title:""}),i=v([{key:"title",title:t("fields.title")},{key:"createdAt",title:t("fields.createdAt"),format:E},{key:"updatedAt",title:t("fields.updatedAt"),format:E}]),e=n(()=>[{key:"edit",text:t("actions.edit"),to:l.value,type:"PRIMARY"},{key:"cancel",text:t("actions.toList"),to:c.value}]);return{loading:o,model:u,fields:i,actions:e,fetch:()=>(o.value=!0,p.columns._id.get(s.value).then(f=>Object.assign(u,f)).finally(()=>o.value=!1))}};export{j as a,T as b,Y as u};