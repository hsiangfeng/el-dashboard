"use strict";(self["webpackChunkel_dashboard"]=self["webpackChunkel_dashboard"]||[]).push([[203],{8203:function(e,t,l){l.r(t),l.d(t,{default:function(){return f}});var o=l(3396);const u=(0,o.Uk)("   電商後台 "),s=(0,o.Uk)(" 產品管理 "),n=(0,o.Uk)(" 優惠卷管理 "),a=(0,o.Uk)(" 訂單管理 "),r=(0,o.Uk)(" 模擬下單 "),i=(0,o.Uk)(" 登出 ");function d(e,t,d,c,h,p){const m=(0,o.up)("ElImage"),f=(0,o.up)("ElMenuItem"),w=(0,o.up)("Refrigerator"),W=(0,o.up)("ElIcon"),g=(0,o.up)("Money"),k=(0,o.up)("TrendCharts"),_=(0,o.up)("UserFilled"),x=(0,o.up)("ElMenu"),y=(0,o.up)("ElScrollbar"),$=(0,o.up)("ElAside"),v=(0,o.up)("Tools"),E=(0,o.up)("ElLink"),b=(0,o.up)("ElHeader"),C=(0,o.up)("RouterView"),U=(0,o.up)("ElMain"),T=(0,o.up)("ElContainer");return(0,o.wg)(),(0,o.j4)(T,{style:{height:"100vh"}},{default:(0,o.w5)((()=>[(0,o.Wm)($,{class:"bg-primary",width:"200px"},{default:(0,o.w5)((()=>[(0,o.Wm)(y,null,{default:(0,o.w5)((()=>[(0,o.Wm)(x,{"background-color":"#303133","text-color":"#ffffff","active-text-color":"#79bbff",router:!0},{default:(0,o.w5)((()=>[(0,o.Wm)(f,{index:"/admin"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{class:"el-logo",src:l(6949),fit:"fill",style:{width:"30px"}},null,8,["src"]),u])),_:1}),(0,o.Wm)(f,{index:"/admin/products"},{default:(0,o.w5)((()=>[(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Wm)(w)])),_:1}),s])),_:1}),(0,o.Wm)(f,{index:"/admin/coupon"},{default:(0,o.w5)((()=>[(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Wm)(g)])),_:1}),n])),_:1}),(0,o.Wm)(f,{index:"/admin/orders"},{default:(0,o.w5)((()=>[(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Wm)(k)])),_:1}),a])),_:1}),(0,o.Wm)(f,{index:"/admin/users"},{default:(0,o.w5)((()=>[(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Wm)(_)])),_:1}),r])),_:1})])),_:1})])),_:1})])),_:1}),(0,o.Wm)(T,null,{default:(0,o.w5)((()=>[(0,o.Wm)(b,null,{default:(0,o.w5)((()=>[(0,o.Wm)(E,{underline:!1,type:"info",onClick:p.logout},{default:(0,o.w5)((()=>[(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Wm)(v)])),_:1}),i])),_:1},8,["onClick"])])),_:1}),(0,o.Wm)(U,null,{default:(0,o.w5)((()=>[h.status?((0,o.wg)(),(0,o.j4)(C,{key:0})):(0,o.kq)("",!0)])),_:1})])),_:1})])),_:1})}var c=l(2748),h={components:{Refrigerator:c.g2r,Tools:c.w1W,UserFilled:c.wvC,TrendCharts:c.bEu,Money:c.WIg},data(){return{status:!1}},methods:{checkLogin(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=`${e}`;const t="https://vue3-course-api.hexschool.io/v2/api/user/check";this.$http.post(t).then((()=>{this.status=!0})).catch((e=>{this.$notify({title:"登入失敗",message:e.response.data.message,type:"error"}),this.$router.push("/login")}))},logout(){const e="https://vue3-course-api.hexschool.io/v2/logout";this.$http.post(e).then((()=>{document.cookie="hexToken='';",this.$notify({title:"登出資訊",message:"登出成功！",type:"success"}),this.$router.push("/login")})).catch((e=>{this.$notify({title:"登出失敗",message:e.response.data.message,type:"error"})}))}},mounted(){this.checkLogin()}},p=l(89);const m=(0,p.Z)(h,[["render",d],["__scopeId","data-v-3c6ca072"]]);var f=m}}]);
//# sourceMappingURL=203.314adccb.js.map