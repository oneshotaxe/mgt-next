import{j as h,M as S,O as M,E as n,y as R,C as T,R as u,N as r,h as A}from"./index.668956d2.js";import{u as L,f as _,a as Y,r as k,b as d}from"./dayjs.c94eb01b.js";const x=(s,e)=>{const{t}=h(),v=A(),E=S(),m=M(),f=n(()=>u[r.EMPLOYEE_GATE_LIST](s.value)),l=p=>u[r.EMPLOYEE_GATE_VIEW](s.value,p),o=n(()=>e.value?l(e.value):f.value),a=R(!1),c=T({columnId:s.value,routeId:void 0,num:"",durationFirstSmene:"",durationSecondSmene:"",endWork:"",change:"",lunchFirstSmene:"",lunchSecondSmene:"",outPark:""}),g=n(()=>({columnId:{required:k},routeId:{required:k},num:{required:k}})),y=L(g,c),O=n(()=>[{key:"save",text:t("actions.save"),buttonType:"submit",type:"PRIMARY",loading:a.value},{key:"cancel",text:t("actions.cancel"),to:o.value}]);return{loading:a,model:c,v$:y,actions:O,save:async()=>{if(!!await y.value.$validate())return E.confirm(t("dialogs.saveConfirm"),()=>(a.value=!0,(e.value?d.gates._id.put(e.value,c).then(()=>e.value):d.gates._id.post(c)).then(P=>(m.success(t("alerts.saveSuccess")),v.push(l(P)))).finally(()=>{a.value=!1})))},fetch:()=>(a.value=!0,d.gates._id.get(e.value).then(p=>Object.assign(c,p)).finally(()=>a.value=!1))}},V=s=>{const{t:e}=h(),t=A(),v=n(()=>u[r.EMPLOYEE_GATE_CREATOR](s.value)),E=a=>u[r.EMPLOYEE_GATE_VIEW](s.value,a),m=R([{key:"id",title:e("fields.id")},{key:"route",title:e("fields.route"),format:a=>a.num,to:a=>u[r.EMPLOYEE_ROUTE_VIEW](s.value,a.id)},{key:"num",orderKey:"num",title:e("fields.num")},{key:"createdAt",orderKey:"created_at",title:e("fields.createdAt"),format:_},{key:"updatedAt",title:e("fields.updatedAt"),format:_}]),f=Y({order:"created_at desc",page:1,pageSize:10,fetch:d.gates.get,additionalParams:()=>({columnId:s.value})}),l=n(()=>[{key:"create",to:v.value,text:e("actions.create"),type:"PRIMARY",prependIcon:"mdi-plus"},{key:"toColumn",to:u[r.EMPLOYEE_COLUMN_VIEW](s.value),text:e("actions.toColumn")}]);return{columns:m,table:f,actions:l,onRowClick:a=>t.push(E(a))}},W=(s,e)=>{const{t}=h(),v=A(),E=S(),m=M(),f=n(()=>u[r.EMPLOYEE_GATE_EDITOR](s.value,e.value)),l=n(()=>u[r.EMPLOYEE_GATE_LIST](s.value)),o=R(!1),a=T({columnId:s.value,routeId:void 0,num:"",durationFirstSmene:"",durationSecondSmene:"",endWork:"",change:"",lunchFirstSmene:"",lunchSecondSmene:"",outPark:""}),c=R([{key:"id",title:t("fields.id")},{key:"route",title:t("fields.route"),format:i=>i.num,to:i=>u[r.EMPLOYEE_ROUTE_VIEW](s.value,i.id)},{key:"num",title:t("fields.num")},{key:"createdAt",title:t("fields.createdAt"),format:_},{key:"updatedAt",title:t("fields.updatedAt"),format:_}]),g=n(()=>[{key:"edit",text:t("actions.edit"),to:f.value,type:"PRIMARY"},{key:"remove",text:t("actions.remove"),click:y,type:"ERROR",loading:o.value},{key:"cancel",text:t("actions.toList"),to:l.value}]),y=()=>E.confirm(t("dialogs.removeConfirm"),()=>(o.value=!0,d.gates._id.delete(e.value).then(()=>(m.success(t("alerts.removeSuccess")),v.push(l.value))).finally(()=>{o.value=!1})));return{loading:o,model:a,fields:c,actions:g,fetch:()=>(o.value=!0,d.gates._id.get(e.value).then(i=>Object.assign(a,i)).finally(()=>o.value=!1))}};export{x as a,W as b,V as u};