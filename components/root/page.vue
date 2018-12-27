<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
        </v-flex>
        <v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
            <router-view></router-view>
        </v-flex>
    </v-layout>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                items: [
                    {
                        text: 'Dashboard',
                        disabled: false,
                        href: 'breadcrumbs_dashboard'
                    },
                    {
                        text: 'Link 1',
                        disabled: false,
                        href: 'breadcrumbs_link_1'
                    },
                    {
                        text: 'Link 2',
                        disabled: true,
                        href: 'breadcrumbs_link_2'
                    }
                ]
            }
        }
    }
</script>

<style>

</style>