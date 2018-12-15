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
var baseUrlPath=getRealPath();
function LoadComponent(str) {
    var url = baseUrlPath+'components/'+str+'.vue';
    console.log(url);
   return httpVueLoader(url);
}