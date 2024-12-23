(this["webpackJsonp@devias-io/material-kit-pro-react"]=this["webpackJsonp@devias-io/material-kit-pro-react"]||[]).push([[3],{739:function(e,a,t){"use strict";var n=t(1),r=t(4),o=t(13),i=t(0),l=t(5),c=t(6),s=t(7),m=i.forwardRef((function(e,a){var t=e.classes,o=e.className,c=e.component,m=void 0===c?"div":c,d=e.disableGutters,u=void 0!==d&&d,p=e.fixed,b=void 0!==p&&p,h=e.maxWidth,v=void 0===h?"lg":h,f=Object(r.a)(e,["classes","className","component","disableGutters","fixed","maxWidth"]);return i.createElement(m,Object(n.a)({className:Object(l.a)(t.root,o,b&&t.fixed,u&&t.disableGutters,!1!==v&&t["maxWidth".concat(Object(s.a)(String(v)))]),ref:a},f))}));a.a=Object(c.a)((function(e){return{root:Object(o.a)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",paddingLeft:e.spacing(2),paddingRight:e.spacing(2),display:"block"},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),disableGutters:{paddingLeft:0,paddingRight:0},fixed:Object.keys(e.breakpoints.values).reduce((function(a,t){var n=e.breakpoints.values[t];return 0!==n&&(a[e.breakpoints.up(t)]={maxWidth:n}),a}),{}),maxWidthXs:Object(o.a)({},e.breakpoints.up("xs"),{maxWidth:Math.max(e.breakpoints.values.xs,444)}),maxWidthSm:Object(o.a)({},e.breakpoints.up("sm"),{maxWidth:e.breakpoints.values.sm}),maxWidthMd:Object(o.a)({},e.breakpoints.up("md"),{maxWidth:e.breakpoints.values.md}),maxWidthLg:Object(o.a)({},e.breakpoints.up("lg"),{maxWidth:e.breakpoints.values.lg}),maxWidthXl:Object(o.a)({},e.breakpoints.up("xl"),{maxWidth:e.breakpoints.values.xl})}}),{name:"MuiContainer"})(m)},741:function(e,a,t){"use strict";var n=t(1),r=t(4),o=t(0),i=t(5),l=t(414),c=t(112),s=Object(c.a)(o.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),m=Object(c.a)(o.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),d=t(11),u=Object(c.a)(o.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),p=t(7),b=t(6),h=o.createElement(m,null),v=o.createElement(s,null),f=o.createElement(u,null),g=o.forwardRef((function(e,a){var t=e.checkedIcon,c=void 0===t?h:t,s=e.classes,m=e.color,d=void 0===m?"secondary":m,u=e.icon,b=void 0===u?v:u,g=e.indeterminate,x=void 0!==g&&g,k=e.indeterminateIcon,E=void 0===k?f:k,y=e.inputProps,O=e.size,j=void 0===O?"medium":O,N=Object(r.a)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]),S=x?E:b,W=x?E:c;return o.createElement(l.a,Object(n.a)({type:"checkbox",classes:{root:Object(i.a)(s.root,s["color".concat(Object(p.a)(d))],x&&s.indeterminate),checked:s.checked,disabled:s.disabled},color:d,inputProps:Object(n.a)({"data-indeterminate":x},y),icon:o.cloneElement(S,{fontSize:void 0===S.props.fontSize&&"small"===j?j:S.props.fontSize}),checkedIcon:o.cloneElement(W,{fontSize:void 0===W.props.fontSize&&"small"===j?j:W.props.fontSize}),ref:a},N))}));a.a=Object(b.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.a)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.a)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(g)},743:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(92),i=t(16),l=t(675),c=t(739),s=t(729),m=t(711),d=t(725),u=t(726),p=t(441),b=t(710),h=t(709),v=t(260),f=t(184),g=t(77),x=t(5),k=t(261),E=t(262),y=t(722),O=t(741),j=t(686),N=t(58);const S=Object(l.a)(()=>({root:{}}));function W(e){let{className:a,onSubmitSuccess:t,...n}=e;const o=S(),i=Object(g.b)();return r.a.createElement(E.a,{initialValues:{firstName:"",lastName:"",email:"",password:"",policy:!1},validationSchema:k.b().shape({firstName:k.c().max(255).required("First name is required"),lastName:k.c().max(255).required("Last name is required"),email:k.c().email("Must be a valid email").max(255).required("Email is required"),password:k.c().min(7).max(255).required("Password is required"),policy:k.a().oneOf([!0],"This field must be checked")}),onSubmit:async(e,a)=>{let{setErrors:n,setStatus:r,setSubmitting:o}=a;try{await i(Object(N.i)(e)),t()}catch(l){r({success:!1}),n({submit:l.message}),o(!1)}}},e=>{let{errors:t,handleBlur:i,handleChange:l,handleSubmit:c,isSubmitting:d,touched:u,values:b}=e;return r.a.createElement("form",Object.assign({className:Object(x.a)(o.root,a),onSubmit:c},n),r.a.createElement(y.a,{error:Boolean(u.firstName&&t.firstName),fullWidth:!0,helperText:u.firstName&&t.firstName,label:"First Name",margin:"normal",name:"firstName",onBlur:i,onChange:l,type:"firstName",value:b.firstName,variant:"outlined"}),r.a.createElement(y.a,{error:Boolean(u.lastName&&t.lastName),fullWidth:!0,helperText:u.lastName&&t.lastName,label:"Last Name",margin:"normal",name:"lastName",onBlur:i,onChange:l,type:"lastName",value:b.lastName,variant:"outlined"}),r.a.createElement(y.a,{error:Boolean(u.email&&t.email),fullWidth:!0,helperText:u.email&&t.email,label:"Email Address",margin:"normal",name:"email",onBlur:i,onChange:l,type:"email",value:b.email,variant:"outlined"}),r.a.createElement(y.a,{error:Boolean(u.password&&t.password),fullWidth:!0,helperText:u.password&&t.password,label:"Password",margin:"normal",name:"password",onBlur:i,onChange:l,type:"password",value:b.password,variant:"outlined"}),r.a.createElement(s.a,{alignItems:"center",display:"flex",mt:2,ml:-1},r.a.createElement(O.a,{checked:b.policy,name:"policy",onChange:l}),r.a.createElement(p.a,{variant:"body2",color:"textSecondary"},"I have read the"," ",r.a.createElement(h.a,{component:"a",href:"#",color:"secondary"},"Terms and Conditions"))),Boolean(u.policy&&t.policy)&&r.a.createElement(j.a,{error:!0},t.policy),r.a.createElement(s.a,{mt:2},r.a.createElement(m.a,{color:"secondary",disabled:d,fullWidth:!0,size:"large",type:"submit",variant:"contained"},"Create account")))})}W.default={onSubmitSuccess:()=>{}};var C=W;const B=Object(l.a)(e=>({root:{justifyContent:"center",backgroundColor:e.palette.background.dark,display:"flex",height:"100%",minHeight:"100%",flexDirection:"column",paddingBottom:80,paddingTop:80}}));a.default=function(){const e=B(),a=Object(i.g)();return r.a.createElement(v.a,{className:e.root,title:"Register"},r.a.createElement(c.a,{maxWidth:"sm"},r.a.createElement(s.a,{mb:5,display:"flex",alignItems:"center"},r.a.createElement(o.a,{to:"/"},r.a.createElement(f.a,null)),r.a.createElement(m.a,{component:o.a,to:"/",className:e.backButton},"Back to home")),r.a.createElement(d.a,null,r.a.createElement(u.a,null,r.a.createElement(p.a,{gutterBottom:!0,variant:"h2",color:"textPrimary"},"Sign up"),r.a.createElement(p.a,{variant:"subtitle1"},"Sign up on the internal platform"),r.a.createElement(s.a,{mt:3},r.a.createElement(C,{onSubmitSuccess:()=>{a.push("/app/login")}})),r.a.createElement(s.a,{my:2},r.a.createElement(b.a,null)),r.a.createElement(h.a,{component:o.a,to:"/login",variant:"body2",color:"textSecondary"},"Have an account?")))))}}}]);
//# sourceMappingURL=3.cb74abe8.chunk.js.map