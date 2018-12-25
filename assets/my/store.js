function init_Store() {
    // noinspection JSAnnotator
    store = new Vuex.Store({
        state: {
            httpLoading: false,
            lastRoute:[],
            apiToken:false,
            menus:[],
            user:{
                id:false,
                nickname:'user',
                access:[]
            },
            mainColor:'teal'
        },
        mutations: {
            beginLoading(state) {
                state.httpLoading=true;
            },
            endLoading(state){
                state.httpLoading=false;
            },
            saveLastRoute(state,route){
                state.lastRoute=route
            },
            updateUser(state,user){
                state.user=user;
            },
            updateApiToken(state,apiToken){
                state.apiToken=apiToken;
            }
        },
        actions:{
            login(context){
                api_call('/login').then(function (value) {
                    if(value.code===200){
                        context.commit('updateUser',value.data.user);
                        context.commit('updateApiToken',value.data.token);
                        Cookies.set('_Auth',value.data);
                        router.push({name:'home'});
                    }else{
                        system_message.error('登陆失败！',value.message)
                    }
                })
            }
        }
    });
}
