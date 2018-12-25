<template>
    <v-app id="404">
        <v-container fluid fill-height>
            <v-layout align-center justify-center row>
                <div class="mr-3 hidden-sm-and-down">
                    <img :src="src" :alt="title">
                </div>
                <div class="text-md-center">
                    <h1>{{img}}</h1>
                    <h2 class="my-3 headline ">{{title}}</h2>
                    <div>
                        <v-btn color="primary" @click="goHome">Go Home</v-btn>
                    </div>
                </div>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    module.exports = {
        props: ['img','title'],
        data:function () {
          return {
              src:''
          }
        },
        methods: {
            goHome () {
                this.$router.push({ name: 'home' });
            }
        },
        mounted:function () {
            if(!this.img){
                this.img='404';
            }
            if(!this.title){
                this.title='some thing happened not expected'
            }
            this.src="assets/images/errors/"+this.img+".svg"
        }
    }
</script>

<style>

</style>
