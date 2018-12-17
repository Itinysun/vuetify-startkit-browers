function init_Store() {
    // noinspection JSAnnotator
    store = new Vuex.Store({
        state: {
            httpLoading: false,
            loginForm:[]
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
            }
        },
        actions:{
            loadLoginForm(context){
                api_call('/login_form',null,null,false).then(function (value) {
                    if(value.code===200){
                        context.commit('updateLoginForm',value.data);
                    }else{
                        system_message.error('oh,no!出错了~',value.message)
                    }
                })
            }
        }
    });
}
