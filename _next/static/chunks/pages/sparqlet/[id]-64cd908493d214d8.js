(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[843],{952:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sparqlet/[id]",function(){return c(5535)}])},5535:function(a,b,c){"use strict";c.r(b),c.d(b,{"__N_SSG":function(){return xa},"default":function(){return ya}});var d=c(5893),e=c.t(d,2),f=c(7294),g=c(7948),h=c(7357),i=c(5229),j=c(3937),k=c(2696),l=c(8456),m=c(7720),n=c(3946),o=c(1458),p=c(7922),q=c(5113),r=c(8883),s=c(2186),t=c(8531),u=c(6397),v=c(7109),w=c(6506),x=function(a){return(0,d.jsx)(u.ZP,{sx:{ml:1,flex:1},inputProps:a,startAdornment:(0,d.jsx)(v.Z,{position:"start",children:(0,d.jsx)(w.Z,{})})})},y=c(8566),z=c(7320),A=function(a){var b=a.value,c=a.onChange,e=a.children;return(0,d.jsx)(y.Z,{value:b,onChange:c,input:(0,d.jsx)(u.ZP,{sx:{ml:1,flex:1},startAdornment:(0,d.jsx)(v.Z,{position:"start",children:(0,d.jsx)(z.Z,{})})}),children:e})};function B(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function C(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{},d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){B(a,b,c[b])})}return a}var D=/^input|^text(input)?/i,E=/^select([oe]r)?/i,F=/^complete|^auto(complete)?/i,G=function(a){if(Array.isArray(a))return a.length?a[0]:"";var b=Object.keys(a);return b.length?a[b[0]]:""},H=function(a){var b,c=a.id,e=a.config,g=e.element,h=e.param,j=h.name,k=h.keywords,m=(0,f.useMemo)(function(){return G(k)},[k]),n=(0,f.useMemo)(function(){var a;return a=k,Array.isArray(a)?a.map(function(a,b){return(0,d.jsx)("option",{value:a,children:a},b)}):Object.keys(a).map(function(b,c){return(0,d.jsx)("option",{value:a[b],children:b},c)})},[k]),o=(0,f.useMemo)(function(){return(0,t.r)(h,"attributes")&& void 0!==h.attributes?h.attributes:{}},[h]),p=function(a){if(Array.isArray(a))return a}(b=(0,i.kD)({id:c,name:j}))||function(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{d||null==h.return||h.return()}finally{if(e)throw f}}return c}(b,2)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}(),q=p[0],r=p[1];if((0,f.useEffect)(function(){return r(m)},[]),D.test(g)){var s=C({},o,{value:q,onChange:function(a){return r(a.target.value)}});return(0,d.jsx)(x,C({},s))}if(E.test(g)){var u=C({},o,{value:q,onChange:function(a){return r(a.target.value)}});return(0,d.jsx)(A,C({},u,{children:n}))}if(!F.test(g))return console.error("Unknown element! errror occured..."),(0,d.jsx)(l.Z,{});var v="autocomplete-".concat(j),w=C({},o,{list:v,value:q,onChange:function(a){return r(a.target.value)}});return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(x,C({},w)),(0,d.jsx)("datalist",{id:v,children:n})]})},I=c(5852),J=c(9207),K=c(370),L=I.tk.theme({".cm-content":{fontFamily:"-apple-system,BlinkMacSystemFont,\"Segoe UI\",Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\";"}}),M=function(a){var b=a.id,c=(0,i.TL)(),e=(0,i.CG)(function(a){return j.FR.selectById(a,b)}),g=e?e.query:"",h=(0,f.useState)(g),k=h[0],l=h[1];(0,f.useEffect)(function(){var a=setTimeout(function(){e&&c((0,j.r6)({id:b,query:k}))},1000);return function(){return clearTimeout(a)}},[k]);var m=(0,f.useMemo)(function(){return(0,d.jsx)(I.ZP,{value:g,height:"50vh",width:"100%",extensions:[L,J.i.define(K.j)],onChange:function(a,b){return l(a)}})},[g]);return(0,d.jsx)(d.Fragment,{children:m})},N=function(){return(0,d.jsx)(m.Z,{sx:{height:"2rem",m:"0.25rem"},orientation:"vertical"})},O=function(a){var b=a.status,c=a.setStatus;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(N,{}),(0,d.jsx)(n.Z,{"aria-label":"query-visibility",onClick:function(){return b?c(!1):c(!0)},children:b?(0,d.jsx)(r.Z,{}):(0,d.jsx)(s.Z,{})})]})},P=function(a){var b=a.id,c=a.hideQuery,e=(0,f.useState)(!1),g=e[0],j=e[1],m=(0,i.CG)(function(a){return k.tq.selectById(a,b)});if(!m)return(0,d.jsx)(function(){return(0,d.jsx)(h.Z,{sx:{display:"flex"},children:(0,d.jsx)(l.Z,{})})},{});var n=m.config,r=n.form,s=n.endpoint,t=function(){return(0,i.Gi)({id:b,endpoint:s}).isLoading?(0,d.jsx)(o.Z,{}):(0,d.jsx)(d.Fragment,{})},u=function(){return(0,d.jsx)(p.Z,{in:g,children:(0,d.jsx)(h.Z,{my:1,sx:{width:"100%"},children:(0,d.jsx)(M,{id:b})})})};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(q.Z,{component:"form",sx:{p:"2px 4px",display:"flex",alignItems:"center"},onSubmit:function(a){return a.preventDefault()},children:[r.map(function(a,c){return(0,d.jsxs)(f.Fragment,{children:[(0,d.jsx)(H,{id:b,config:a}),c+1!==r.length&&(0,d.jsx)(N,{})]},a.param.name)}),c||(0,d.jsx)(O,{status:g,setStatus:j})]}),(0,d.jsx)(t,{}),c||(0,d.jsx)(u,{})]})},Q=c(655),R=c(6321),S=c(1727),T=function(){return(0,d.jsx)(h.Z,{my:2,sx:{height:"40vh",width:"100%"},children:(0,d.jsx)(Q._$r,{components:{NoRowsOverlay:function(){return(0,d.jsx)(Q.nik,{children:(0,d.jsx)("div",{children:"No Data"})})},Pagination:null},rows:[],columns:[]})})},U=c(8131),V=c(260);function W(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var X=/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,Y=function(a){var b=a.children;return(0,d.jsx)(h.Z,{my:2,sx:{display:"flex",height:"100%"},children:(0,d.jsx)(h.Z,{sx:{flexGrow:1},children:b})})},Z=function(a){var b=a.value;return(0,U.jv)(b)?(0,d.jsx)(S.C,{href:b,target:"_blank",rel:"noopener noreferrer",children:b}):a.value},$=function(a){var b=a.id,c=(0,i.iP)().width,e=(0,f.useState)(0),g=e[0],h=e[1],j=(0,f.useState)(10),k=j[0],l=j[1],m=(0,i.CG)(function(a){return V.U9.selectById(a,b)}),n=m&&m.data;if(!n)return(0,d.jsx)(T,{});var o=n.head,p=n.results;if(n.boolean,!p||!o||!p.bindings.length)return(0,d.jsx)(T,{});var q=o.vars;if(o.link,!q)return(0,d.jsx)(T,{});var r=Object.fromEntries(q.map(function(a){return[a,[]]})),s=p.bindings.map(function(a,b){return(function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{},d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){W(a,b,c[b])})}return a})({},Object.fromEntries(Object.entries(a).map(function(a){var b,c=function(a){if(Array.isArray(a))return a}(b=a)||function(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{d||null==h.return||h.return()}finally{if(e)throw f}}return c}(b,2)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}(),d=c[0],e=c[1].value;return r[d].push(X.test(e)?8*e.length:16*e.length),[d,e]})),{id:b})}),t=q.map(function(a){var b=Math.min(r[a].reduce(function(a,b){return Math.max(a,b)}),400);return{field:a,hide:!1,minWidth:b,renderCell:Z}});return(0,d.jsx)(Y,{children:(0,d.jsx)(Q._$r,{autoHeight:!0,rows:s,columns:t,pagination:!0,page:g,onPageChange:function(a){return h(a)},pageSize:k,rowsPerPageOptions:[10,25,50,100],onPageSizeChange:function(a){return l(a)},components:{Toolbar:c<R.P_?function(){return(0,d.jsxs)(Q.DSK,{children:[(0,d.jsx)(Q.ShC,{}),(0,d.jsx)(Q.Mum,{})]})}:Q.npt},columnBuffer:2,columnThreshold:2,checkboxSelection:!0,disableSelectionOnClick:!0})})},_=c(1163),aa=c(1496),ba=c(7533),ca=c(1237),da=c(8046),ea=c(3902),fa=c(4207);function ga(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var ha=function(){var a=(0,_.useRouter)().events,b=(0,i.TL)(),c=(0,i.CG)(fa.Qc);(0,f.useEffect)(function(){return b((0,fa.hk)()),a.on("routeChangeStart",function(){return b((0,fa.kj)())}),function(){a.off("routeChangeStart",function(){return b((0,fa.kj)())})}},[]);var d=(0,i.iP)().width,e=(0,i.CG)(fa.RK);return(0,f.useEffect)(function(){var a,c=(a=d)<R.P_?0.9*a:a<900?0.4*a:a<1200?0.35*a:a<1536?0.3*a:600;b((0,fa.Cv)(c))},[d]),{open:c,width:e,viewportWidth:d}},ia=(0,aa.ZP)("div")(function(a){var b=a.theme;return(function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{},d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){ga(a,b,c[b])})}return a})({display:"flex",alignItems:"center",padding:b.spacing(0,1)},b.mixins.toolbar,{justifyContent:"flex-start"})}),ja=function(a){var b=a.children,c=(0,i.TL)(),e=ha(),f=e.open,g=e.width,h=e.viewportWidth;return(0,d.jsxs)(ba.ZP,{sx:{width:g,flexShrink:0,"& .MuiDrawer-paper":{width:g}},variant:h<R.P_?"temporary":"persistent",anchor:"right",open:f,children:[(0,d.jsx)(ia,{children:(0,d.jsx)(n.Z,{onClick:function(){return c((0,fa.kj)())},children:"rtl"===ea.r.direction?(0,d.jsx)(ca.Z,{}):(0,d.jsx)(da.Z,{})})}),(0,d.jsx)(m.Z,{}),b]})},ka=c(44),la=c(5670),ma=c(298),na=c(5050),oa=c(8520),pa=c.n(oa),qa=c(4428);function ra(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(j){c(j);return}h.done?b(i):Promise.resolve(i).then(d,e)}var sa=function(a){var b=a.content,c=(0,f.useState)(),g=c[0],i=c[1],j=g?g.default:f.Fragment;return(0,f.useEffect)(function(){(function(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){var f=a.apply(b,c);function g(a){ra(f,d,e,g,h,"next",a)}function h(a){ra(f,d,e,g,h,"throw",a)}g(void 0)})}})(pa().mark(function a(){return pa().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.t0=i,a.next=3,(0,qa.K)(b,e);case 3:a.t1=a.sent,(0,a.t0)(a.t1);case 5:case"end":return a.stop()}},a)}))()},[b]),(0,d.jsx)(h.Z,{component:"article",className:"markdown-body",boxSizing:"border-box",minWidth:"200px",maxWidth:"980px",margin:"0 auto",padding:{sm:1},children:(0,d.jsx)(j,{})})},ta=c(3437),ua=function(a){var b=a.id,c=(0,i.TL)(),e=(0,i.CG)(function(a){return k.tq.selectById(a,b)}),g=e?e.config:"",h=(0,f.useState)(g&&JSON.stringify(g,null," ".repeat(4))),j=h[0],l=h[1];(0,f.useEffect)(function(){var a=setTimeout(function(){if(e){var a=(0,U.lo)(j);(0,U.CZ)(a)&&c((0,k.ak)({id:b,config:a}))}},1000);return function(){return clearTimeout(a)}},[j]);var m=(0,f.useMemo)(function(){return(0,d.jsx)(I.ZP,{value:JSON.stringify(g,null," ".repeat(4)),height:"60vh",theme:"light",extensions:[L,(0,ta.AV)()],onChange:function(a,b){return l(a)}})},[g]);return(0,d.jsx)(d.Fragment,{children:m})},va=["readme","config"],wa=function(a){var b=a.id,c=a.content,e=(0,f.useState)(va[0]),g=e[0],i=e[1];return(0,d.jsx)(h.Z,{sx:{width:"100%"},children:(0,d.jsxs)(la.ZP,{value:g,children:[(0,d.jsx)(h.Z,{sx:{borderBottom:1,borderColor:"divider"},children:(0,d.jsxs)(ma.Z,{variant:"fullWidth",onChange:function(a,b){i(b)},"aria-label":"SPARQLet details tab",children:[(0,d.jsx)(ka.Z,{label:va[0],value:va[0]}),(0,d.jsx)(ka.Z,{label:va[1],value:va[1]})]})}),(0,d.jsx)(na.Z,{value:va[0],children:(0,d.jsx)(h.Z,{m:{xs:1,sm:2},children:(0,d.jsx)(sa,{content:c})})}),(0,d.jsx)(na.Z,{value:va[1],children:(0,d.jsx)(h.Z,{children:(0,d.jsx)(ua,{id:b})})})]})})},xa=!0,ya=function(a){var b=a.meta,c=a.query,e=a.config,l=a.content,m=b.id,n=(0,i.TL)();return(0,f.useEffect)(function(){n((0,j.Wx)({id:m,query:c})),n((0,k.Nx)({id:m,config:e}))},[]),(0,d.jsxs)(g.Z,{maxWidth:"xl",children:[(0,d.jsxs)(h.Z,{mt:2,children:[(0,d.jsx)(P,{id:m}),(0,d.jsx)($,{id:m})]}),(0,d.jsx)(ja,{children:(0,d.jsx)(wa,{id:m,content:l})})]})}}},function(a){a.O(0,[762,179,824,774,888,377],function(){return a(a.s=952)}),_N_E=a.O()}])