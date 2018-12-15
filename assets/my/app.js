var routes,router,app,apiBase,apiRequest,apiToken,apiKey;
var baseUrlPath=getRealPath();
var dev=true;
if(dev){
    apiBase='https://www.easy-mock.com/mock/5c14f94ae31bd20904e2fd81/api'
}else{
    apiBase='';
}
apiRequest =  axios.create({
    baseURL: apiBase,
    timeout:5000
});
routes = [
    { path: '/',name:'home', component: LoadComponent('layout') },
    { path: '/login',name:'login', component: LoadComponent('demo/login') }
];
router = new VueRouter({
    routes: routes
});
router.beforeEach(function (to, from, next) {
    if(!apiToken && to.name!='login'){
        next({'name':'login'})
    }else{
        axios.defaults.headers.common['Authorization'] = apiToken;
        next();
    }
});
app = new Vue({
    router: router
}).$mount('#app');