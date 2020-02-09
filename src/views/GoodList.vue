<template>
    <div>
        <NavHeade></NavHeade>
        <NavBread>
            <span>Goods</span>
        </NavBread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a @click="sortGoods()" href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
                    <dl class="filter-price">
                    <dt>Price:</dt>
                    <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="priceChecked=all">All</a></dd>
                    <dd v-for="(item,index) in priceFliter" @click="priceChecked=index">
                        <a href="javascript:void(0)" @click="setPricrFilter" :class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
                    </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <!-- {{goodsList}} -->
                            <ul>
                                <li v-for="(item,index) in goodsList">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'/static/img/'+item.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.prodcutName}}</div>
                                        <div class="price">{{item.salePrice}}</div>
                                        <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                </div>
                                </li>
                            </ul>
                        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
                            加载中...
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
       <NavFoote></NavFoote>
    </div>
</template>
<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import axios from 'axios'
import NavHeade from '@/components/Heade'
import NavFoote from '@/components/Foote'
import NavBread from '@/components/Bread'
export default {
    components:{
        NavHeade,
        NavFoote,
        NavBread
        },
        data() {
            return {
                goodsList:[],
                priceFliter:[
                    {
                        startPrice:'0.00',
                        endPrice:'100.00'
                    },{
                        startPrice:'100.00',
                        endPrice:'500.00'
                    },{
                        startPrice:'500.00',
                        endPrice:'1000.00'
                    },{
                        startPrice:'1000.00',
                        endPrice:'5000.00'
                    }
                ],
                priceChecked:'all',
                filterBy:false,
                overLayFlag:false,
                sortFlag:true,
                page:1,
                pageSize:8,
                busy:true,
            }
        },
        mounted() {
            this.getGoodsList()
        },
        methods: {
            getGoodsList(flag){
                var param = {
                    page:this.page,
                    pageSize:this.pageSize,
                    sort:this.sortFlag?1:-1,
                    priceLevel:this.priceChecked
                }
                axios.get('/goods',{
                    params:param
                    }).then((res)=>{
                    console.log(res)
                    if(flag){
                        this.goodsList = this.goodsList.concat(res.data.msg)
                        if(res.data.count==0){
                            this.busy=true
                        }else{
                            this.busy=false
                        }
                    }else{
                            this.goodsList=res.data.msg;
                            this.busy=false

                    }
                })
            },
            showFilterPop(){
                this.filterBy = true;
                this.overLayFlag = true;
            },
            setPricrFilter(index){
                this.priceChecked = index;
                this.closePop();
                this.page=1;
                this.getGoodsList()
            },
            closePop(){
                 this.filterBy = false;
                this.overLayFlag = false;
            },
            sortGoods(){
            this.sortFlag=!this.sortFlag;
            this.flag=1;
            this.getGoodsList()
            },
            loadMore(){
                this.busy=true;
                setTimeout(()=>{
                this.page++;
                this.getGoodsList(true)
                },500)
            }
        },
        
}
</script>
