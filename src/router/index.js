import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Home from "../pages/Home/Home.vue"
import Address from "../components/Home/address/Address.vue"


import Discover from "../pages/Discover/Discover.vue"
import Order from "../pages/Order/Order.vue"
import Mine from "../pages/Mine/Mine.vue"
import Detial from "../components/Home/Detial/Detial.vue"
import ShopClose from "../components/Home/ShopClose/ShopClose.vue"
export default new Router({
  routes: [
    {
     name:'home',
     path:"/home",
     component:Home,
     children:[
    		{
    			path:'address',
     			component:Address
    		}
     		
     	]
    },
    {
     name:'discover',
     path:"/discover",
     component:Discover
    },
    {
     name:'order',
     path:"/order",
     component:Order
    },
    {
     name:'mine',
     path:"/mine",
     component:Mine
    },
    {
     			name:'detial',
     			path:'/detial',
     			component:Detial
     },
     {
     		  name:'shopclose',
     		  path:'/shopclose',
     		  component:ShopClose
     },
    {
    	path:"**",
    	component:Home
    }
  ]
})
