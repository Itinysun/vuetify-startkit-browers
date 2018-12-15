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
                                <v-form>
                                    <v-text-field :model="un" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                                    <v-text-field :model="pwd" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                                </v-form>
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
                un:'',
                pwd:''
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
                apiRequest({
                    url:'/login',
                    method:'get',
                    params:auth
                }).then(function (response) {
                    if(response.status==200){
                        if(response.data.code==200){
                            apiKey=response.data.data.key;
                            apiToken=response.data.data.token;
                            console.log(response.data.data);
                            router.push({'name':'home'});
                        }else{

                        }
                    }else{
                        console.log(response);
                    }
                }).catch(function (error) {
                    console.log(error);
                });


            }
        }
    }
</script>

<style>

</style>