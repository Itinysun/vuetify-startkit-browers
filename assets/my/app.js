var routes,router,app;

routes = [
    { path: '/',name:'home', component: LoadComponent('demo') }
];
router = new VueRouter({
    routes: routes
});
app = new Vue({
    router: router
}).$mount('#app');
router.push('/');