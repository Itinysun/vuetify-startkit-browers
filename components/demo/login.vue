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
                                <my-form :items="items"></my-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :loading="loading" :disabled="loading" color="info" @click="login" >
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
    var form_data;
    module.exports = {
        data: function () {
            return {
            }
        },
        props: {
            last: false,
            route_data:{}
        },
        computed:{
            loading:function () {
                return store.state.httpLoading;
            },
            form:function () {
                return form_data;
            }
        },
        methods:{
            login:function () {

            }
        },beforeCreate:function () {
            Vue.component('my-form',LoadComponent('form/my_form'));
        },created:function () {

        }
    }
</script>

<style>

</style>
