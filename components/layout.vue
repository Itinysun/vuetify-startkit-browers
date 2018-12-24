<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                app
        >
            <v-list>
                <v-list-tile >
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile>

                <v-list-group
                        prepend-icon="account_circle"
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Users</v-list-tile-title>
                    </v-list-tile>

                    <v-list-group
                            no-action
                            sub-group
                            value="true"
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-title>Admin</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile
                                v-for="(admin, i) in admins"
                                :key="i"
                                @click=""
                        >
                            <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
                            <v-list-tile-action>
                                <v-icon v-text="admin[1]"></v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list-group>

                    <v-list-group
                            sub-group
                            no-action
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-title>Actions</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile
                                v-for="(crud, i) in cruds"
                                :key="i"
                                @click=""
                        >
                            <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                            <v-list-tile-action>
                                <v-icon v-text="crud[1]"></v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list-group>
                </v-list-group>
            </v-list>
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
            'my-text': LoadComponent('form/my_text')
        },
        beforeCreate:function () {


        }
    }
</script>

<style>

</style>
