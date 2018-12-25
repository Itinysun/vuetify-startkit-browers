<template>
    <v-layout row>
        <v-flex>
            <v-card flat>
                <v-toolbar :color="color" dark>
                    <v-img src="assets/images/logo.png" max-height="50" max-width="100" contain></v-img>
                    <v-toolbar-title>Start Kit</v-toolbar-title>
                </v-toolbar>

                <v-list>
                    <v-list-tile :to="{name:'home'}"  :exact="true" class="my_nav_active">
                        <v-list-tile-action>
                            <v-icon>home</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile>
                    <v-list-group
                            v-for="item in items"
                            :key="item.title"
                            :prepend-icon="item.icon"
                            no-action
                            :group="item.route_name"
                    >
                        <v-list-tile slot="activator" >
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile
                                v-for="subItem in item.items"
                                :key="subItem.title"
                                :to="{name:subItem.route_name}"
                                class="my_nav_active">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon>{{ subItem.icon }}</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list-group>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                color:store.state.mainColor,
                items: []
            }
        },
        methods:{
            buildMenu:function (d) {
                let arr=[];
                for(let i=0;i<d.length;i++){
                    let di=d[i];
                    let it={};
                    it.route_name=di.name;
                    if(undefined!==di.meta){
                        let meta=di.meta;
                        if(undefined!==meta.nav && meta.nav===false)
                            continue;
                        if(undefined!==meta.icon)
                            it.icon=meta.icon;
                        if(undefined!==meta.title)
                            it.title=meta.title;
                    }
                    if(di.children && di.children.length>0){
                        it.items=this.buildMenu(di.children);
                    }
                    arr.push(it);
                }
                return arr;
            }
        },
        mounted:function () {
            this.items=this.buildMenu(routes[0].children);
        }
    }
</script>

<style>
.my_nav_active .primary--text {
    border-left: #1e88e5 solid 4px;
    cursor: default!important;
    background-color: #f3f3f3;
}
</style>
