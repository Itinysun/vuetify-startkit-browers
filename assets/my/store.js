function init_Store() {
    store = new Vuex.Store({
        state: {
            httpLoading: false
        },
        mutations: {
            beginLoading(state) {
                state.httpLoading=true;
            },
            endLoading(state){
                state.httpLoading=false;
            }
        }
    });
}
