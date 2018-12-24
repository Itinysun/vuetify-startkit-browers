<template>
    <v-treeview
            :active.sync="active"
            :items="items"
            :load-children="fetchChildMenu"
            :open.sync="open"
            activatable
            active-class="primary--text"
            class="grey lighten-5"
            open-on-click
            transition
    >
    </v-treeview>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                active: [],
                avatar: null,
                open: [],
                users: []
            }
        },
        computed: {
            items () {
                return [
                    {
                        name: 'Users',
                        children: this.users
                    }
                ]
            },
            selected () {
                if (!this.active.length) return undefined;

                const id = this.active[0];

                return this.users.find(user => user.id === id)
            }
        },
        methods:{
            fetchChildMenu:function () {

            }
        }
    }
</script>

<style>

</style>