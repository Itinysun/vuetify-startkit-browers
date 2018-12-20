<template>
    <v-app id="inspire"><v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12" >
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <div class="text-xs-center"  v-show="httpLoading && notLoaded">
                                    <v-progress-circular
                                            :size="50"
                                            color="primary"
                                            indeterminate
                                    ></v-progress-circular>
                                </div>
                                <v-form  ref="form" :lazy-validation="true">
                                    <component :is="item.c_instance" :config="item.c_prop" v-for="item in loginForm" :key="item.c_name"></component>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :loading="httpLoading" :disabled="httpLoading" color="info" @click="doLogin" >
                                    Login
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content></v-app>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                notLoaded:true
            }
        },
        props: {
            last: false,
            route_data:{}
        },
        computed:Vuex.mapState(['httpLoading','loginForm']),
        methods:{
            doLogin:function () {
                this.notLoaded=false;
                //store.dispatch('login');
                this.$refs.form.validate();
                trace(this.$refs.form,'form');
            }
        },
        mounted:function () {
            //从接口调取登陆需要的字段
            store.dispatch('loadLoginForm');
        },beforeRouteEnter (to, from, next) {
            //如果用户从其他页面跳转而来，那么登陆以后还跳转回去
            if(from && from.name && from.name!=='login'){
                trace('after login we will redirect to the route named:',from.name);
                store.commit('saveLastRoute',from);
            }
            next();
        }
    }
</script>

<style>

</style>
