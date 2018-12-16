<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12" >
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-tooltip bottom>
                                    <v-btn
                                            slot="activator"
                                            :href="source"
                                            icon
                                            large
                                            target="_blank"
                                    >
                                        <v-icon large>code</v-icon>
                                    </v-btn>
                                    <span>Source</span>
                                </v-tooltip>
                                <v-tooltip right>
                                    <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank">
                                        <v-icon large>mdi-codepen</v-icon>
                                    </v-btn>
                                    <span>Codepen</span>
                                </v-tooltip>
                            </v-toolbar>
                            <v-card-text>
                                <my-form :items="form"></my-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary"  @click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                form:[
                        {
                            c_name:"un",
                            c_path:'form/my_text',
                            c_instance:'',
                            c_prop:{
                                el_icon:'person',
                                el_type:'text',
                                el_name:'un',
                                el_value:'',
                                el_title:'User Name'
                            }
                        },
                        {
                            c_name:"pwd",
                            c_path:'form/my_text',
                            c_instance:'',
                            c_prop:{
                                el_icon:'lock',
                                el_type:'text',
                                el_name:'pwd',
                                el_value:'',
                                el_title:'Password'
                            }
                        }
                    ]
            }
        },
        props: {
            source: String
        },
        methods:{
            login:function () {
                var auth={
                    name:this.un,
                    pwd:this.pwd
                };
                system_apiClient({
                    url:'/login',
                    method:'get',
                    params:auth
                }).then(function (response) {
                    if(response.code===200){
                        system_auth.key=response.data.key;
                        system_auth.token=response.data.token;
                        router.push({'name':'home'});
                    }else{
                        console.log('123');
                        iziToast.show({
                            title: 'Hey',
                            message: 'What would you like to add?'
                        });
                    }
                });
            }
        },beforeCreate:function () {
            Vue.component('my-form',LoadComponent('form/my_form'));
        }
    }
</script>

<style>

</style>