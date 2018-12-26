<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                app
        >
            <my-nav></my-nav>
        </v-navigation-drawer>
        <v-toolbar :color="color" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-items class="main_nav">
                <v-btn :to="{name:'home'}" flat key="home" :exact="true">Home</v-btn>
                <v-btn v-for="tab in tabs" :to="{name:tab.name}" flat :key="tab.name">{{tab.meta.title}}</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <transition>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </v-container>
        </v-content>
        <v-footer :color="color" app>
            <span class="white--text">&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                color:store.state.mainColor,
                drawer: null,
                tabs:store.state.navTab,
                maxTabs:0
            }
        },
        computed:{
            leftTabs:function f() {
                return _.min([this.maxTabs,this.tabs.length]);
            }
        },
        components: {
            'my-nav': LoadComponent('root/my_nav')
        },
        beforeCreate:function () {

        }
    }
</script>

<style>
.main_nav .v-btn--active{
    border-bottom: 2px solid #ffffff;
}
</style>
