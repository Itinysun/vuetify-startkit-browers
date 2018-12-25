function init_router() {
    routes = [
        { path: '/', component: LoadComponent('layout'),children:[
                {path:'',name:'home',component:LoadComponent('root/home')},
                {path:'admin',name:'admin',children:[
                        {path:'manage',name:'admin/manage',component:LoadComponent('admin/manage')},
                        {path:'settings',name:'admin/settings',component:LoadComponent('admin/settings')}
                    ]}
                ,
                {path:'others',name:'others',children:[
                        {path:'404',name:'others/404',component:LoadComponent('others/404')},
                        {path:'500',name:'others/500',component:LoadComponent('others/500')}
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
