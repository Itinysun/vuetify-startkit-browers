trace('------app start------',null);
var dev=true;
var routes,router,app,system_apiBase,system_apiClient,store;
if(dev){
    trace('we are in DEV mode');
    system_apiBase='https://www.easy-mock.com/mock/5c14f94ae31bd20904e2fd81/api'
}else{
    system_apiBase='';
}
var system_baseUrlPath=getRealPath();
trace(system_baseUrlPath,'base url path');
init_apiClient();
init_Store();
init_router();
Vue.config.productionTip = false;
app = new Vue({
    router: router,
    store:store
}).$mount('#app');
