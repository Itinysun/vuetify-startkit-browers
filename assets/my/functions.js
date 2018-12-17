function getRealPath(){
    //获取当前网址，如： http://localhost:8083/myproj/view/my.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： myproj/view/my.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    var pos2=pathName.lastIndexOf('/');
    var projectName;
    if(pos2===-1){
        projectName='/';
    }else{
        projectName=pathName.substring(0,pos2+1);
    }
    return localhostPaht + projectName;
}
var system_components_cache={};
function LoadComponent(str) {
    var url = system_baseUrlPath+'components/'+str+'.vue';
    var instance=system_components_cache[str];
    if(instance){
        trace(str,'load component from cache:');
    }else{
        trace(str,'load component from url:');
       instance= httpVueLoader(url);
        system_components_cache[str]=instance;
    }
    return instance;
}
function trace(v,title) {
    if(!dev)
        return;
    if(title){
        console.log(title+' :',v);
    }else{
        console.log(v);
    }
}
function init_apiClient() {
    system_apiClient =  axios.create({
        baseURL: system_apiBase,
        timeout:5000
    });
}
function init_router() {
    var routes = [
        { path: '/',name:'home', component: LoadComponent('layout')},
        { path: '/login',name:'login', component: LoadComponent('demo/login')}
    ];
    router = new VueRouter({
        routes: routes
    });
    router.beforeEach(function (to, from, next) {
        trace(to.name,'route to');
        if(!system_auth.token && to.name!=='login'){
            trace('need login',null);
            next({name:'login',props:{last:"123"}})
        }else{
            trace(system_auth.token,'auth token');
            system_apiClient.defaults.headers.common['Authorization'] =system_auth.token;
            next();
        }
    });
}
var system_message={
    error : function (title,message) {
        iziToast.show({
            theme: 'dark',
            icon: 'mdi mdi-alert',
            title: title,
            message:message,
            timeout:3000,
            color:'#ff3c0f',
            position: 'topCenter',
            layout: 2
        })
    }
};
function api_call(url, method, data, useLoading,useRouter) {
    if(undefined=== method || null===method)
        method='get';
    if(undefined=== data || null===data)
        data={};
    if(undefined===useLoading || useLoading!==false)
        useLoading=true;
    if(undefined===useRouter || useRouter!==true)
        useRouter=false;
    if(useLoading)
        store.commit('beginLoading');
    return new Promise(function (resolve, reject) {
        system_apiClient({
            url:url,
            method:method,
            params:data
        }).then(function (response) {
            var status=response.status;
            trace(status,'response status');
            if(200===status){
                trace(response.data,'response data');
                resolve(response.data);
            }else {
                if(useRouter){
                    if(401===status){
                        router.push({name:'login', props:{last:response.config.url}});
                    }else if(404===status){
                        router.push({name:'404'});
                    }else if(403===status){
                        router.push({name:'403'})
                    }else{
                        router.push({name:'error', props:{code:status,message:response.statusText}})
                    }
                }else{
                    resolve({
                        code:status,
                        message:response.statusText
                    });
                }
            }
        }).catch(function (error) {
            resolve({
                code:500,
                message:error.message
            });
        }).then(function () {
            if(useLoading)
                store.commit('endLoading');
        });
    });
}

