<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                app
        >
            <my-nav></my-nav>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer color="indigo" app>
            <span class="white--text">&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                drawer: null,
                admins: [
                    ['Management', 'people_outline'],
                    ['Settings', 'settings']
                ],
                cruds: [
                    ['Create', 'add'],
                    ['Read', 'insert_drive_file'],
                    ['Update', 'update'],
                    ['Delete', 'delete']
                ]
            }
        },
        props: {
            source: String
        },
        components: {
            'my-nav': LoadComponent('root/my_nav')
        },
        beforeCreate:function () {


        }
    }
</script>

<style>

</style>
