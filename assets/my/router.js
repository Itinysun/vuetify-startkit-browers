function init_router() {
    routes = [
        { path: '/', component: LoadComponent('layout'),children:[
                {path:'',name:'home',component:LoadComponent('root/home')},
                {path:'system',name:'system',component:LoadComponent('system'),children:[
                        {path:'cache',name:'cache',component:LoadComponent('system/cache')},
                        {path:'task',name:'task',component:LoadComponent('system/task')}
                    ]}
            ]},
        { path: '/login',name:'login', component: LoadComponent('root/login')}
    ];
    router = new VueRouter({
        routes: routes
    });
    router.beforeEach(function (to, from, next) {
        trace(to.name,'route to');
        if(!store.state.apiToken && to.name!=='login'){
            trace('need login',null);
            next({name:'login'})
        }else{
            if(store.state.apiToken && to.name==='login'){
                trace('no need login , redirect to home',null);
                next({name:'home'})
            }else{
                trace(store.state.apiToken,'auth token');
                system_apiClient.defaults.headers.common['Authorization'] =store.state.apiToken;
                next();
            }
        }
    });
}
