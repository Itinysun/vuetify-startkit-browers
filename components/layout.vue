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
            <v-container pa-0 ma-0 fill-height>
                <v-layout>
                    <v-flex xs10>
                        <v-tabs
                                color="transparent"
                                slider-color="yellow"
                                height="64"
                        >
                            <v-tab
                                    class="navTab"
                                    v-for="tab in tabs"
                                    :to="{name:tab.name}"
                                    :key="tab.name"
                            >
                                {{ tab.meta.title }}
                            </v-tab>
                        </v-tabs>
                    </v-flex>
                    <v-flex xs2>

                    </v-flex>
                </v-layout>
            </v-container>
        </v-toolbar>
        <v-content>
            <v-container fill-height>
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
                tabs:store.state.navTab
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
.navTab .v-tabs__item--active{
    background-color: rgba(86, 86, 86, 0.23);
}
</style>
