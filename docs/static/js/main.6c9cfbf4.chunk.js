(this.webpackJsonpreactbootapp=this.webpackJsonpreactbootapp||[]).push([[0],{19:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var i=n(2),s=n.n(i),o=n(7),c=n.n(o),a=(n(19),n(0)),r=n(8),d=n(12),l=n(13),b=n(9),h=n(4),m=n(10),j=n(14),u=n(11),g=(n(20),n(1));var p=function(){const e=Object(i.useRef)(),[t,n]=Object(i.useState)(),[s,o]=Object(i.useState)(),[c,p]=Object(i.useState)(),[x,w]=Object(i.useState)(),[f,O]=Object(i.useState)(28),[y,v]=Object(i.useState)(),[C,N]=Object(i.useState)(),[P,S]=Object(i.useState)();function k(){if(requestAnimationFrame(k),s){let e=s.rotation,t=function(e){return e=function(e){return(e%=360)<0&&(e+=360),e}(e),console.log(e),e>=0&&e<20||e>=340&&e<360?"\u6b63\u9762":e>=20&&e<160?"\u53f3\u4fa7":e>=160&&e<210?"\u80cc\u9762":e>=210&&e<340?"\u5de6\u4fa7":void 0}(Math.round(a.R.radToDeg(e.z)));S(t)}y&&y.render()}Object(i.useEffect)((()=>{console.log("animate"),k()}),[y]),Object(i.useEffect)((()=>{e.current&&E()}),[]);const E=()=>{let t=e.current.clientWidth,i=e.current.clientHeight;console.log("w:"+t+"    h:"+i);const s=new a.wb,c=new a.Ob({antialias:!0}),g=new a.hb(45,t/i,.1,1e3);n(s),o(g),p(c),c.physicallyCorrectLights=!0,c.setClearColor(13421772),c.setPixelRatio(window.devicePixelRatio),c.setSize(t,i),g.position.z=30,g.position.x=0,g.position.y=15;const x=new a.d(16777215,2);s.add(x);const f=new a.o(16777215,3*Math.PI);f.position.set(.5,0,.866),g.add(f),s.add(g);const O=new r.a(g,c.domElement);O.maxPolarAngle=1.5,O.minPolarAngle=.3,O.update(),w(O);(new d.a).load("./models/model06.glb",(e=>{console.log("\u6a21\u578b\u52a0\u8f7d\u5b8c\u6210"),s.add(e.scene)}),(e=>{console.log("".concat(e.loaded/e.total*100,"% loaded"))}),(e=>{console.error("An error happened",e)})),c.render(s,g),e.current.appendChild(c.domElement);const y=new l.a(c),C=new b.a(s,g);y.addPass(C);const P=new m.a(new a.Kb(window.innerWidth,window.innerHeight),s,g);P.usePatternTexture=!0,P.visibleEdgeColor.set("#ffffff"),P.hiddenEdgeColor.set("#ffffff"),y.addPass(P);(new a.Fb).load("./models/points.png",(function(e){P.patternTexture=e,e.wrapS=a.tb,e.wrapT=a.tb}));const S=new j.a;y.addPass(S);const k=new h.a(u.a);k.uniforms.resolution.value.set(1/window.innerWidth,1/window.innerHeight),y.addPass(k),N(P),v(y)},T=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],R=e=>{T.forEach((n=>{t.getObjectByName("c"+n).visible=!(n>e)})),C.selectedObjects=[t.getObjectByName("c"+e)],N(C),O(e)};return Object(g.jsx)("div",{className:"container",children:Object(g.jsx)("main",{children:Object(g.jsxs)("div",{className:"container py-2",children:[Object(g.jsx)("header",{className:"pb-1 mb-2 border-bottom",children:Object(g.jsxs)("a",{href:"/",className:"d-flex align-items-center text-dark text-decoration-none",children:[Object(g.jsx)("img",{alt:"Welcome",width:"50",height:"32",src:"./mount-fuji.svg"}),Object(g.jsx)("span",{className:"fs-4",children:"\u7bb1\u4f53\u579b\u578b\u6f14\u793a"})]})}),Object(g.jsx)("div",{style:{position:"absolute",margin:8,backgroundColor:"#d3d3d3",textAlign:"center"},children:Object(g.jsxs)("div",{style:{margin:8,width:80},children:[f," \u4ef6\u579b\u578b "]})}),Object(g.jsx)("div",{style:{position:"absolute",margin:8,marginTop:365,textAlign:"center"},children:Object(g.jsx)("div",{style:{margin:2},children:P})}),Object(g.jsx)("div",{id:"canvas",style:{width:"100%",height:"400px",background:"#888"},ref:e}),Object(g.jsxs)("div",{className:"mt-1",style:{width:"100%"},children:[T.map(((e,t)=>Object(g.jsx)("button",{className:"btn btn-outline-secondary mt-1 text-center",style:{width:"12%",padding:"0.375rem 0.5rem",marginRight:"0.5%"},onClick:R.bind(this,e),children:e},t))),Object(g.jsx)("button",{className:"btn btn-outline-dark mt-1 text-center",style:{width:"23%",marginRight:"1%",marginLeft:"1%"},onClick:()=>{x.reset(),s.position.z=30,s.position.x=0,s.position.y=15,x.update()},children:"\u6b63\u9762"}),Object(g.jsx)("button",{className:"btn btn-outline-dark mt-1 text-center",style:{width:"23%",marginRight:"1%",marginLeft:"0.5%"},onClick:()=>{x.reset(),s.position.z=-30,s.position.x=0,s.position.y=15,x.update()},children:"\u80cc\u9762"})]}),Object(g.jsxs)("footer",{className:"pt-3 mt-4 text-muted border-top text-center",children:[Object(g.jsx)("img",{alt:"Welcome",style:{marginTop:-10},width:"30",height:"24",src:"./mount-fuji.svg"})," \u7269\u6d41 \xa9 2021"]})]})})})};var x=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,23)).then((t=>{let{getCLS:n,getFID:i,getFCP:s,getLCP:o,getTTFB:c}=t;n(e),i(e),s(e),o(e),c(e)}))};c.a.render(Object(g.jsx)(s.a.StrictMode,{children:Object(g.jsx)(p,{})}),document.getElementById("root")),x()}},[[22,1,2]]]);
//# sourceMappingURL=main.6c9cfbf4.chunk.js.map