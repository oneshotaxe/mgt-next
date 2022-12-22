import{d as z,y as R,E as y,o as i,c,a as l,f as e,F as G,m as L,n as A,l as v,w as f,b as j,t as C,r as x,q,j as H,k as J,P as K,i as Q}from"./index.0cc843cd.js";import{k as W,l as k,w as X,_ as Z,b as ee}from"./dayjs.565fdc9c.js";import{_ as te}from"./ServerAutocomplete.vue_vue_type_script_setup_true_lang.f29ce261.js";import{e as F}from"./vuelidate.593c808c.js";import{a as ae}from"./composable.4035d7b9.js";import"./get.c200ceda.js";var le=W,oe=1,se=4;function ne(r){return le(r,oe|se)}var O=ne;const de=[{name:"111",date:"2019-01-01",format:"\u0420\u0412"},{name:"112",date:"2019-01-02",format:"\u0420\u0412"},{name:"221",date:"2019-01-02",format:"\u0420\u0420\u0412\u0412"},{name:"222",date:"2019-01-04",format:"\u0420\u0420\u0412\u0412"},{name:"223",date:"2019-01-05",format:"\u0420\u0420\u0412\u0412"},{name:"224",date:"2019-01-03",format:"\u0420\u0420\u0412\u0412"},{name:"311",date:"2021-01-04",format:"\u0420\u0420\u0420\u0412"},{name:"312",date:"2021-01-03",format:"\u0420\u0420\u0420\u0412"},{name:"313",date:"2021-01-02",format:"\u0420\u0420\u0420\u0412"},{name:"314",date:"2021-01-01",format:"\u0420\u0420\u0420\u0412"},{name:"421",date:"2019-01-05",format:"\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"422",date:"2019-01-06",format:"\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"423",date:"2019-01-07",format:"\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"424",date:"2019-01-08",format:"\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"425",date:"2019-01-09",format:"\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"426",date:"2019-01-10",format:"\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"521",date:"2019-01-07",format:"\u0420\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"522",date:"2019-01-08",format:"\u0420\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"523",date:"2019-01-09",format:"\u0420\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"524",date:"2019-01-10",format:"\u0420\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"525",date:"2019-01-11",format:"\u0420\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"526",date:"2019-01-12",format:"\u0420\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"527",date:"2019-01-13",format:"\u0420\u0420\u0420\u0420\u0420\u0412\u0412"},{name:"611",date:"2019-01-08",format:"\u0420\u0420\u0420\u0420\u0420\u0420\u0412"},{name:"612",date:"2019-01-09",format:"\u0420\u0420\u0420\u0420\u0420\u0420\u0412"},{name:"613",date:"2019-01-10",format:"\u0420\u0420\u0420\u0420\u0420\u0420\u0412"},{name:"614",date:"2019-01-11",format:"\u0420\u0420\u0420\u0420\u0420\u0420\u0412"},{name:"615",date:"2019-01-12",format:"\u0420\u0420\u0420\u0420\u0420\u0420\u0412"},{name:"616",date:"2019-01-13",format:"\u0420\u0420\u0420\u0420\u0420\u0420\u0412"},{name:"617",date:"2019-01-14",format:"\u0420\u0420\u0420\u0420\u0420\u0420\u0412"}],re={key:0,class:"ge-statuses"},me=["onClick"],ue={key:1,class:"ge-calendar"},ie={class:"ge-calendar__header"},ce={class:"ge-calendar__prev"},fe={class:"ge-calendar__title"},_e={class:"ge-calendar__next"},ve={class:"ge-calendar__body"},pe={class:"ge-calendar__day"},be={class:"ge-calendar__day"},ge={class:"ge-calendar__day-index"},he={class:"ge-calendar__day-value"},Ve=z({__name:"GraphicEditor",props:{modelValue:null,label:null},emits:["update:model-value"],setup(r,{emit:m}){const u=r;k.locale("ru"),k.extend(X);const n=R(k().date(1)),M=y(()=>(n.value.day()+6)%7),$=y(()=>u.modelValue?N(u.modelValue,n.value.format("YYYY-MM-DD"),n.value.daysInMonth()):[]),I=()=>{n.value=n.value.subtract(1,"month")},d=()=>{n.value=n.value.add(1,"month")},p=t=>{const a={...t,items:t.format.split("")};m("update:model-value",a)},E=t=>{!u.modelValue||m("update:model-value",h(u.modelValue,t))},S=()=>{!u.modelValue||m("update:model-value",U(u.modelValue))},Y=()=>{!u.modelValue||m("update:model-value",w(u.modelValue))};function U(t){const a=O(t);return a.items=a.items.concat(t.format.split("")),a}function w(t){const a=O(t);return a.items=a.items.slice(0,-t.format.length),a}const o=["\u0420","1","2"];function h(t,a){const b=O(t),_=b.items[a],g=D(_,o);return b.items[a]=g,b}function D(t,a){const _=(a.findIndex(g=>g==t)+1)%a.length;return a[_]}function N(t,a,b=1){const _=[],g=k(t.date),s=t.items;let V=k(a);for(let B=0;B<b;B++){const T=(V.diff(g,"days")%s.length+s.length)%s.length,P=s[T];_.push({date:V.format("YYYY-MM-DD"),value:P}),V=V.add(1,"days")}return _}return(t,a)=>{const b=x("v-autocomplete"),_=x("v-icon"),g=x("v-btn");return i(),c("div",null,[l(b,{"model-value":r.modelValue,items:e(de),"menu-props":{maxHeight:"300px"},label:r.label,"return-object":"","hide-details":"","item-value":"name","item-title":"name","onUpdate:modelValue":p},null,8,["model-value","items","label"]),r.modelValue?(i(),c("div",re,[(i(!0),c(G,null,L(r.modelValue.items,(s,V)=>(i(),c("div",{class:q(["ge-statuses__item",{"ge-statuses__item--clickable":s!=="\u0412","ge-statuses__item--disabled":s==="\u0412"}]),onClick:B=>s!=="\u0412"&&E(V)},C(s),11,me))),256)),r.modelValue.format.length<r.modelValue.items.length?(i(),c("div",{key:0,class:"ge-statuses__item ge-statuses__item--clickable",onClick:Y}," - ")):A("",!0),v("div",{class:"ge-statuses__item ge-statuses__item--clickable",onClick:S},"+")])):A("",!0),r.modelValue?(i(),c("div",ue,[v("div",ie,[v("div",ce,[l(g,{rounded:"",icon:"",flat:"",size:"small",onClick:I},{default:f(()=>[l(_,null,{default:f(()=>[j("mdi-chevron-left")]),_:1})]),_:1})]),v("div",fe,C(n.value.format("MMM YYYY")),1),v("div",_e,[l(g,{rounded:"",icon:"",flat:"",size:"small",onClick:d},{default:f(()=>[l(_,null,{default:f(()=>[j("mdi-chevron-right")]),_:1})]),_:1})])]),v("div",ve,[(i(!0),c(G,null,L(e(M),s=>(i(),c("div",pe))),256)),(i(!0),c(G,null,L(e($),s=>(i(),c("div",be,[v("div",ge,C(e(k)(s.date).date()),1),v("div",he,C(s.value),1)]))),256))])])):A("",!0)])}}}),we=z({__name:"DriverEditor",setup(r){const{t:m}=H(),u=Q(),n=y(()=>+u.params.id),M=y(()=>+u.params.columnId),$=y(()=>n.value?m("drivers.editorTitle"):m("drivers.creatorTitle")),{loading:I,model:d,v$:p,actions:E,fetch:S,save:Y}=ae(M,n),U=w=>ee.buses.get({...w,columnId:M.value});return J(()=>{n.value&&S()}),(w,o)=>{const h=x("v-col"),D=x("v-text-field"),N=x("v-row");return i(),c("form",{onSubmit:o[5]||(o[5]=K((...t)=>e(Y)&&e(Y)(...t),["prevent"]))},[v("h1",null,C(e($)),1),l(N,{class:"pt-8"},{default:f(()=>[l(h,{cols:"12",md:"6",lg:"4"},{default:f(()=>[l(N,null,{default:f(()=>[l(h,{cols:"12"},{default:f(()=>[l(e(te),{modelValue:e(d).bus,"onUpdate:modelValue":o[0]||(o[0]=t=>e(d).bus=t),"model-value-id":e(d).busId,"onUpdate:model-value-id":o[1]||(o[1]=t=>e(d).busId=t),fetch:U,disabled:e(I),error:e(p).busId.$error,"error-messages":e(F)(e(p).busId.$errors),label:e(m)("fields.bus"),"item-title":"num"},null,8,["modelValue","model-value-id","disabled","error","error-messages","label"])]),_:1}),l(h,{cols:"12"},{default:f(()=>[l(D,{modelValue:e(d).num,"onUpdate:modelValue":o[2]||(o[2]=t=>e(d).num=t),disabled:e(I),error:e(p).num.$error,"error-messages":e(F)(e(p).num.$errors),label:e(m)("fields.num")},null,8,["modelValue","disabled","error","error-messages","label"])]),_:1}),l(h,{cols:"12"},{default:f(()=>[l(D,{modelValue:e(d).fullName,"onUpdate:modelValue":o[3]||(o[3]=t=>e(d).fullName=t),disabled:e(I),error:e(p).fullName.$error,"error-messages":e(F)(e(p).fullName.$errors),label:e(m)("fields.fullName")},null,8,["modelValue","disabled","error","error-messages","label"])]),_:1})]),_:1})]),_:1}),l(h,{cols:"12",md:"6",lg:"4"},{default:f(()=>[l(e(Ve),{modelValue:e(d).graphic,"onUpdate:modelValue":o[4]||(o[4]=t=>e(d).graphic=t),label:e(m)("fields.graphic")},null,8,["modelValue","label"])]),_:1})]),_:1}),l(e(Z),{actions:e(E),class:"pt-8"},null,8,["actions"])],32)}}});export{we as default};
