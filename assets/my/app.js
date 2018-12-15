var routes,router,app;
Vue.use(VueRouter);
routes = [
    { path: '',name:'home', component: LoadComponent('demo') }
];
router = new VueRouter({
    routes: routes
});
console.log(router);
app = new Vue({
    router: router
}).$mount('#app');