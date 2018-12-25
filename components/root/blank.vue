<template>
{{title}}
</template>

<script>
    module.exports = {
        data: function () {
            return {
                title:function () {
                    return this.$route.meta.title;
                }
            }
        }
    }
</script>

<style>

</style>