(this["webpackJsonp@devias-io/material-kit-pro-react"]=this["webpackJsonp@devias-io/material-kit-pro-react"]||[]).push([[4],{739:function(e,t,a){"use strict";var n=a(1),i=a(4),r=a(13),o=a(0),l=a(5),s=a(6),c=a(7),d=o.forwardRef((function(e,t){var a=e.classes,r=e.className,s=e.component,d=void 0===s?"div":s,m=e.disableGutters,u=void 0!==m&&m,p=e.fixed,b=void 0!==p&&p,g=e.maxWidth,x=void 0===g?"lg":g,h=Object(i.a)(e,["classes","className","component","disableGutters","fixed","maxWidth"]);return o.createElement(d,Object(n.a)({className:Object(l.a)(a.root,r,b&&a.fixed,u&&a.disableGutters,!1!==x&&a["maxWidth".concat(Object(c.a)(String(x)))]),ref:t},h))}));t.a=Object(s.a)((function(e){return{root:Object(r.a)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",paddingLeft:e.spacing(2),paddingRight:e.spacing(2),display:"block"},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),disableGutters:{paddingLeft:0,paddingRight:0},fixed:Object.keys(e.breakpoints.values).reduce((function(t,a){var n=e.breakpoints.values[a];return 0!==n&&(t[e.breakpoints.up(a)]={maxWidth:n}),t}),{}),maxWidthXs:Object(r.a)({},e.breakpoints.up("xs"),{maxWidth:Math.max(e.breakpoints.values.xs,444)}),maxWidthSm:Object(r.a)({},e.breakpoints.up("sm"),{maxWidth:e.breakpoints.values.sm}),maxWidthMd:Object(r.a)({},e.breakpoints.up("md"),{maxWidth:e.breakpoints.values.md}),maxWidthLg:Object(r.a)({},e.breakpoints.up("lg"),{maxWidth:e.breakpoints.values.lg}),maxWidthXl:Object(r.a)({},e.breakpoints.up("xl"),{maxWidth:e.breakpoints.values.xl})}}),{name:"MuiContainer"})(d)},742:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(16),o=a(675),l=a(739),s=a(729),c=a(441),d=a(260),m=a(77),u=a(5),p=a(261),b=a(262),g=a(722),x=a(686),h=a(711),f=a(58),y=a(3),v=a.n(y);function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function j(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var E=Object(n.forwardRef)((function(e,t){var a=e.color,n=void 0===a?"currentColor":a,r=e.size,o=void 0===r?24:r,l=j(e,["color","size"]);return i.a.createElement("svg",O({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},l),i.a.createElement("polyline",{points:"23 6 13.5 15.5 8.5 10.5 1 18"}),i.a.createElement("polyline",{points:"17 6 23 6 23 12"}))}));E.propTypes={color:v.a.string,size:v.a.oneOfType([v.a.string,v.a.number])},E.displayName="TrendingUp";var k=E;const S=Object(o.a)(()=>({root:{},inputField:{padding:"2px","& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":{borderWidth:"2px",borderColor:"white"},"& .MuiInputBase-input MuiOutlinedInput-input":{padding:"3px"}},middleText:{display:"flex",alignItems:"center"},largeText:{fontSize:"24px"},smallText:{fontSize:"16px"}}));function w(e){let{className:t,onSubmitSuccess:a,...n}=e;const r=S(),o=Object(m.b)();return i.a.createElement(b.a,{initialValues:{email:""},validationSchema:p.b().shape({email:p.c().email("Must be a valid email").max(255).required("Email is required")}),onSubmit:async(e,t)=>{let{setErrors:n,setStatus:i,setSubmitting:r}=t;try{await o(Object(f.g)(e.email)),a()}catch(l){const e=l.response&&l.response.data.message||"Something went wrong";i({success:!1}),n({submit:e}),r(!1)}}},e=>{let{errors:a,handleBlur:o,handleChange:l,handleSubmit:d,isSubmitting:m,touched:p,values:b}=e;return i.a.createElement("form",Object.assign({noValidate:!0,className:Object(u.a)(r.root,t),onSubmit:d},n),i.a.createElement(g.a,{error:Boolean(p.email&&a.email),fullWidth:!0,helperText:p.email&&a.email,margin:"normal",name:"email",onBlur:o,onChange:l,type:"email",value:b.email,placeholder:"Please enter company email",variant:"outlined",className:r.inputField}),i.a.createElement(s.a,{display:"flex",justifyContent:"center"},i.a.createElement(c.a,{variant:"body2",className:r.middleText},"Sep 1.2023 -"),i.a.createElement(c.a,{variant:"subtitle1",style:{color:"#0cb3e5"}},"989,758,621"),i.a.createElement(c.a,{variant:"body2",style:{color:"#0cb3e5"},className:r.middleText},"w"),i.a.createElement(c.a,{variant:"body2",className:r.middleText},"available and rising"),i.a.createElement(k,{style:{color:"#0cb3e5"},width:"18px",height:"25px"})),a.submit&&i.a.createElement(s.a,{display:"flex",justifyContent:"center"},i.a.createElement(x.a,{error:!0},a.submit)),i.a.createElement(s.a,{mt:1,display:"flex",justifyContent:"center"},i.a.createElement(h.a,{color:"primary",disabled:m,size:"medium",type:"submit",variant:"contained",style:{backgroundColor:"#0cb3e5"}},"Enter site")))})}w.defaultProps={onSubmitSuccess:()=>{}};var W=w;const N=Object(o.a)(e=>({root:{justifyContent:"center",backgroundColor:e.palette.background.dark,display:"flex",height:"100%",minHeight:"100%",flexDirection:"column",paddingBottom:80,paddingTop:80},blueUnderline:{textDecoration:"none",borderBottom:"4px solid #0cb3e5",display:"inline",textAlign:"center",fontWeight:"bold",fontSize:"80px",height:"103px"},subtext:{textAlign:"center"}}));t.default=function(){const e=N(),t=Object(r.g)();return i.a.createElement(d.a,{className:e.root,title:"Login"},i.a.createElement(l.a,{maxWidth:"md"},i.a.createElement(s.a,{display:"flex",justifyContent:"center"},i.a.createElement(c.a,{color:"textPrimary",className:e.blueUnderline},"1000")),i.a.createElement(s.a,{display:"flex",justifyContent:"center"},i.a.createElement(c.a,{variant:"h2",color:"textPrimary",className:e.subtext},"CONTAINERS.COM")),i.a.createElement(c.a,{variant:"body2",color:"textSecondary",style:{textAlign:"center",fontStyle:"italic"}},"SUN - BY THE PALLET OR BUY THE TON"),i.a.createElement(W,{onSubmitSuccess:()=>{t.push("/app")}})))}}}]);
//# sourceMappingURL=4.e30df744.chunk.js.map