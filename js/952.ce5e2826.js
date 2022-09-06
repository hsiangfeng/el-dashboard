"use strict";(self["webpackChunkel_dashboard"]=self["webpackChunkel_dashboard"]||[]).push([[952],{7659:function(e,t,o){o.d(t,{Z:function(){return m}});var l=o(3396),a=o(7139);const i=(0,l.Uk)("取消"),n=(0,l.Uk)("刪除");function d(e,t,o,d,u,s){const p=(0,l.up)("ElButton"),m=(0,l.up)("ElDialog");return(0,l.wg)(),(0,l.j4)(m,{modelValue:u.dialogVisible,"onUpdate:modelValue":t[1]||(t[1]=e=>u.dialogVisible=e),title:"刪除",width:"50%"},{footer:(0,l.w5)((()=>[(0,l.Wm)(p,{type:"info",onClick:t[0]||(t[0]=e=>u.dialogVisible=!1),plain:""},{default:(0,l.w5)((()=>[i])),_:1}),(0,l.Wm)(p,{type:"danger",onClick:s.onClick,plain:""},{default:(0,l.w5)((()=>[n])),_:1},8,["onClick"])])),default:(0,l.w5)((()=>[(0,l._)("h3",null,"你確定要刪除 "+(0,a.zw)(o.data.title||o.data.id)+"(刪除後將無法恢復)。",1)])),_:1},8,["modelValue"])}var u={props:["data"],emits:["delete"],data(){return{dialogVisible:!1}},methods:{onClick(){this.$emit("delete",this.data.id)}}},s=o(89);const p=(0,s.Z)(u,[["render",d]]);var m=p},3952:function(e,t,o){o.r(t),o.d(t,{default:function(){return y}});var l=o(3396),a=o(7139);const i=(0,l._)("h3",null,"優惠券列表",-1),n={class:"text-end"},d=(0,l.Uk)("新增優惠券"),u=(0,l.Uk)("編輯"),s=(0,l.Uk)("刪除");function p(e,t,o,p,m,r){const h=(0,l.up)("ElButton"),c=(0,l.up)("ElTableColumn"),w=(0,l.up)("ElTag"),f=(0,l.up)("ElTable"),C=(0,l.up)("CouponModal"),g=(0,l.up)("DeleteModal"),b=(0,l.Q2)("loading");return(0,l.wg)(),(0,l.iD)(l.HY,null,[i,(0,l._)("div",n,[(0,l.Wm)(h,{type:"primary",plain:"",onClick:t[0]||(t[0]=e=>r.openModal(!0))},{default:(0,l.w5)((()=>[d])),_:1})]),(0,l.wy)(((0,l.wg)(),(0,l.j4)(f,{data:m.coupons,stripe:"",style:{width:"100%"}},{default:(0,l.w5)((()=>[(0,l.Wm)(c,{prop:"title",label:"名稱"}),(0,l.Wm)(c,{label:"折扣百分比",width:"200"},{default:(0,l.w5)((e=>[(0,l.Uk)((0,a.zw)(e.row.percent)+"% ",1)])),_:1}),(0,l.Wm)(c,{label:"到期日",width:"150"},{default:(0,l.w5)((t=>[(0,l.Uk)((0,a.zw)(e.$filters.date(t.row.due_date)),1)])),_:1}),(0,l.Wm)(c,{label:"是否啟用",width:"100"},{default:(0,l.w5)((e=>[(0,l.Wm)(w,{type:e.row.is_enabled?"success":"info"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,a.zw)(e.row.is_enabled?"啟用":"未啟用"),1)])),_:2},1032,["type"])])),_:1}),(0,l.Wm)(c,{label:"功能",width:"150"},{default:(0,l.w5)((e=>[(0,l.Wm)(h,{type:"primary",plain:"",size:"small",onClick:t=>r.openModal(!1,e.row)},{default:(0,l.w5)((()=>[u])),_:2},1032,["onClick"]),(0,l.Wm)(h,{type:"danger",plain:"",size:"small",onClick:t=>r.openDeleteModal(e.row)},{default:(0,l.w5)((()=>[s])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])),[[b,m.isLoading]]),(0,l.Wm)(C,{ref:"CouponModalRef","is-new":m.isNew,coupon:m.tempCoupon,onUpdateCoupon:r.updateCoupon},null,8,["is-new","coupon","onUpdateCoupon"]),(0,l.Wm)(g,{ref:"DeleteModalRef",data:m.tempCoupon,onDelete:r.deleteCoupon},null,8,["data","onDelete"])],64)}var m=o(9242);const r={class:"text-end"},h=(0,l.Uk)("取消"),c=(0,l.Uk)("送出");function w(e,t,o,a,i,n){const d=(0,l.up)("ElInput"),u=(0,l.up)("ElFormItem"),s=(0,l.up)("ElDatePicker"),p=(0,l.up)("ElCol"),w=(0,l.up)("ElInputNumber"),f=(0,l.up)("ElRow"),C=(0,l.up)("ElCheckbox"),g=(0,l.up)("ElButton"),b=(0,l.up)("ElForm"),_=(0,l.up)("ElDialog");return(0,l.wg)(),(0,l.j4)(_,{modelValue:i.dialogVisible,"onUpdate:modelValue":t[6]||(t[6]=e=>i.dialogVisible=e),title:o.isNew?"新增優惠券":"編輯優惠券",width:"50%","close-on-click-modal":!1},{default:(0,l.w5)((()=>[(0,l.Wm)(b,{onSubmit:(0,m.iM)(n.onSubmit,["prevent"]),"label-position":"top"},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{label:"優惠卷標題"},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{type:"text",modelValue:i.tempCoupon.title,"onUpdate:modelValue":t[0]||(t[0]=e=>i.tempCoupon.title=e),placeholder:"請輸入優惠卷標題"},null,8,["modelValue"])])),_:1}),(0,l.Wm)(u,{label:"優惠碼"},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{type:"text",modelValue:i.tempCoupon.code,"onUpdate:modelValue":t[1]||(t[1]=e=>i.tempCoupon.code=e),placeholder:"請輸入優惠卷優惠碼"},null,8,["modelValue"])])),_:1}),(0,l.Wm)(f,{gutter:30},{default:(0,l.w5)((()=>[(0,l.Wm)(p,{md:12},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{label:"到期日"},{default:(0,l.w5)((()=>[(0,l.Wm)(s,{width:"100%",modelValue:i.due_date,"onUpdate:modelValue":t[2]||(t[2]=e=>i.due_date=e),type:"date",placeholder:"請選擇優惠卷到期日",format:"YYYY/MM/DD","value-format":"X"},null,8,["modelValue"])])),_:1})])),_:1}),(0,l.Wm)(p,{md:12},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{label:"折扣百分比"},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{modelValue:i.tempCoupon.percent,"onUpdate:modelValue":t[3]||(t[3]=e=>i.tempCoupon.percent=e),modelModifiers:{number:!0}},null,8,["modelValue"])])),_:1})])),_:1})])),_:1}),(0,l.Wm)(C,{class:"text-end",modelValue:i.tempCoupon.is_enabled,"onUpdate:modelValue":t[4]||(t[4]=e=>i.tempCoupon.is_enabled=e),label:"是否啟用","true-label":1,"false-label":0,size:"large"},null,8,["modelValue"]),(0,l._)("div",r,[(0,l.Wm)(g,{type:"info",onClick:t[5]||(t[5]=e=>i.dialogVisible=!1),plain:""},{default:(0,l.w5)((()=>[h])),_:1}),(0,l.Wm)(g,{"native-type":"submit",type:"primary",plain:""},{default:(0,l.w5)((()=>[c])),_:1})])])),_:1},8,["onSubmit"])])),_:1},8,["modelValue","title"])}var f={props:["isNew","coupon"],emits:["update-coupon"],data(){return{tempCoupon:{},due_date:"",dialogVisible:!1}},methods:{onSubmit(){this.tempCoupon.is_enabled||(this.tempCoupon.is_enabled=0),this.tempCoupon.due_date=Number(this.due_date),this.$emit("update-coupon",this.tempCoupon)}},watch:{coupon(){this.tempCoupon=this.coupon,this.due_date=this.tempCoupon.due_date}}},C=o(89);const g=(0,C.Z)(f,[["render",w]]);var b=g,_=o(7659),V={data(){return{isNew:!0,coupons:[],tempCoupon:{},isLoading:!1}},components:{CouponModal:b,DeleteModal:_.Z},methods:{getCoupons(){this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/v2/api/teaching-example/admin/coupons";this.$http.get(e).then((e=>{this.coupons=e.data.coupons,this.isLoading=!1})).catch((e=>{this.isLoading=!1,this.$notify({title:"優惠券取得失敗",message:e.response.data.message,type:"error"})}))},openModal(e,t){this.isNew=e,this.isNew?this.tempCoupon={is_enabled:0}:this.tempCoupon={...t},this.$refs.CouponModalRef.dialogVisible=!0},openDeleteModal(e){this.tempCoupon={...e},this.$refs.DeleteModalRef.dialogVisible=!0},updateCoupon(e){this.isLoading=!0;let t="https://vue3-course-api.hexschool.io/v2/api/teaching-example/admin/coupon",o="post",l="新增優惠卷";this.isNew||(t=`https://vue3-course-api.hexschool.io/v2/api/teaching-example/admin/coupon/${this.tempCoupon.id}`,o="put",l="更新優惠卷"),this.$http[o](t,{data:e}).then((()=>{this.isLoading=!1,this.$notify({title:l,message:"執行成功！",type:"success"}),this.$refs.CouponModalRef.dialogVisible=!1,this.getCoupons()})).catch((e=>{this.isLoading=!1,this.$notify({title:"錯誤訊息",message:e.response.data.message,type:"error"})}))},deleteCoupon(e){this.isLoading=!0;const t=`https://vue3-course-api.hexschool.io/v2/api/teaching-example/admin/coupon/${e}`;this.$http.delete(t).then((()=>{this.isLoading=!1,this.$refs.DeleteModalRef.dialogVisible=!1,this.$notify({title:"優惠券刪除",message:"執行成功！",type:"success"}),this.getCoupons()})).catch((e=>{this.isLoading=!1,this.$notify({title:"錯誤訊息",message:e.response.data.message,type:"error"})}))}},mounted(){this.getCoupons()}};const k=(0,C.Z)(V,[["render",p]]);var y=k}}]);
//# sourceMappingURL=952.ce5e2826.js.map