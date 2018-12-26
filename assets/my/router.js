function init_router() {
    routes = [
        //必须保证根路由组是第一个
        { path: '/', component: LoadComponent('layout'),children:[
            { path:'',name:'home',component:LoadComponent('root/home'),meta:{nav:false}},

            { path:'admin',name:'admin',meta:{icon:'people_outline',title: '权限管理'},children:[
                    { path:'manage',name:'admin/manage',meta:{title: '管理员',tab:true},component:LoadComponent('admin/manage')},
                    { path:'settings',name:'admin/settings',meta:{title: '规则设置',tab:true},component:LoadComponent('admin/settings')}
                ]
            },
            { path:'system',name:'system',meta:{icon:'dashboard',title: '系统配置'},children:[
                    { path:'path2',name:'name1',component:LoadComponent('root/blank'),meta:{title: '配置1',tab:true}},
                    { path:'path1',name:'name2',component:LoadComponent('root/blank'),meta:{title: '配置2',tab:true}}
                ]
            },
            { path:'members',name:'members',meta:{icon:'grade',title: '会员管理'},children:[
                { path:'path21',name:'name3',component:LoadComponent('root/blank'),meta:{title: '会员管理',tab:true}},
                { path:'path11',name:'name4',component:LoadComponent('root/blank'),meta:{title: '会员配置',tab:true}}
            ]
            },
            { path:'plugins',name:'plugins',meta:{icon:'gavel',title: '插件管理'},children:[
                { path:'path22',name:'name5',component:LoadComponent('root/blank'),meta:{title: '插件管理',tab:true}},
                { path:'path12',name:'name6',component:LoadComponent('root/blank'),meta:{title: '插件配置',tab:true}}
            ]
            }
        ]},
        { path:'/login',name:'login', component: LoadComponent('root/login'),meta:{nav:false}},
        { path:'/403',name:'403',props: { img: '403', title: 'Sorry, access denied.' },component:LoadComponent('root/error')},
        { path:'/500',name:'500',props: { img: '500', title: 'Sorry, the server is down.' },component:LoadComponent('root/error')},
        { path:'*',name:'404',props: { img: '404', title: 'Sorry, page not found' },component:LoadComponent('root/error')}

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
                if(to.meta && to.meta.tab){
                    store.commit('setNavTab',to);
                }
                system_apiClient.defaults.headers.common['Authorization'] =store.state.apiToken;
                next();
            }
        }
    });
}
