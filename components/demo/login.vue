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
                                <my-form>
                                    <component :is="item.c_instance" :config="item.c_prop" v-for="item in items" :key="item.c_name"></component>
                                </my-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :loading="loading" :disabled="loading" color="info" @click="doLogin" >
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
                items:store.state.loginForm
            }
        },
        props: {
            last: false,
            route_data:{},
        },
        computed:Vuex.mapState(['loading']),
        methods:{
            doLogin:function () {
                trace(this.route_data,'route_data');
                trace(this.last,'last')
            }
        },
        beforeCreate:function () {
            Vue.component('my-form',LoadComponent('form/my_form'));
            store.dispatch('loadLoginForm');
        }
    }
</script>

<style>

</style>
