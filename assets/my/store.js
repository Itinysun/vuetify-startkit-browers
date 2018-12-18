function init_Store() {
    // noinspection JSAnnotator
    store = new Vuex.Store({
        state: {
            httpLoading: false,
            loginForm:[],
            lastRoute:[],
            apiKey:false,
            apiToken:false,
            menus:[],
            user:{
                id:false,
                nickname:'user',
                access:[]
            },
            routes : [
                { path: '/',name:'root', component: LoadComponent('layout')},
                { path: '/login',name:'login', component: LoadComponent('demo/login')}
            ]
        },
        mutations: {
            beginLoading(state) {
                state.httpLoading=true;
            },
            endLoading(state){
                state.httpLoading=false;
            },
            updateLoginForm(state,value){
                for (var i=0;i<value.length;i++){
                    value[i].c_instance=LoadComponent(value[i].c_path);
                    state.loginForm.push(value[i]);
                }
            },
            saveLastRoute(state,route){
                state.lastRoute=route
            }
        },
        actions:{
            loadLoginForm(context){
                api_call('/login_form').then(function (value) {
                    if(value.code===200){
                        context.commit('updateLoginForm',value.data);
                    }else{
                        system_message.error('oh,no!出错了~',value.message)
                    }
                })
            },
            login(context){
                api_call('/login').then(function (value) {
                    if(value.code===200){
                        //context.commit('updateUser',value.data);
                    }else{
                        system_message.error('oh,no!出错了~',value.message)
                    }
                })
            }
        }
    });
}
