<template>
    <v-text-field :model="v" :prepend-icon="config.el_icon" :name="config.el_name" :label="config.el_title" :type="config.el_type"></v-text-field>
</template>

<script>
    module.exports = {
        props:['config'],
        data: function () {
            return {
                v:''
            }
        }
    }
</script>