import{d as B,j as C,E as _,k as U,o as v,c as y,l as M,t as N,f as e,a as r,w as d,P,r as n,e as S,n as T,i as j}from"./index.0cc843cd.js";import{_ as D}from"./dayjs.565fdc9c.js";import{e as c}from"./vuelidate.593c808c.js";import{a as F}from"./composable.7f5174af.js";const H=B({__name:"UserEditor",setup(I){const{t}=C(),b=j(),i=_(()=>+b.params.id),w=_(()=>i.value?t("users.editorTitle"):t("users.creatorTitle")),{roles:V,showPasswordField:g,loading:m,model:l,v$:a,actions:k,fetch:$,save:p}=F(i);return U(()=>{i.value&&$()}),(R,s)=>{const f=n("v-text-field"),u=n("v-col"),x=n("v-select"),E=n("v-row");return v(),y("form",{onSubmit:s[3]||(s[3]=P((...o)=>e(p)&&e(p)(...o),["prevent"]))},[M("h1",null,N(e(w)),1),r(E,{class:"pt-8"},{default:d(()=>[r(u,{cols:"12",md:"6",lg:"4"},{default:d(()=>[r(f,{modelValue:e(l).nick,"onUpdate:modelValue":s[0]||(s[0]=o=>e(l).nick=o),disabled:e(m),error:e(a).nick.$error,"error-messages":e(c)(e(a).nick.$errors),"max-errors":1,label:e(t)("fields.nick")},null,8,["modelValue","disabled","error","error-messages","label"])]),_:1}),e(g)?(v(),S(u,{key:0,cols:"12",md:"6",lg:"4"},{default:d(()=>[r(f,{modelValue:e(l).password,"onUpdate:modelValue":s[1]||(s[1]=o=>e(l).password=o),disabled:e(m),error:e(a).password.$error,"error-messages":e(c)(e(a).password.$errors),label:e(t)("fields.password"),type:"password"},null,8,["modelValue","disabled","error","error-messages","label"])]),_:1})):T("",!0),r(u,{cols:"12",md:"6",lg:"4"},{default:d(()=>[r(x,{modelValue:e(l).roles,"onUpdate:modelValue":s[2]||(s[2]=o=>e(l).roles=o),items:e(V),disabled:e(m),error:e(a).roles.$error,"error-messages":e(c)(e(a).roles.$errors),label:e(t)("fields.roles"),multiple:""},null,8,["modelValue","items","disabled","error","error-messages","label"])]),_:1})]),_:1}),r(e(D),{actions:e(k),class:"pt-8"},null,8,["actions"])],32)}}});export{H as default};
