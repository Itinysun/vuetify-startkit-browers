<template>
    <v-form>
        <component :is="item.c_instance" :config="item.c_prop" v-for="item in items" :key="item.c_name"></component>
    </v-form>
</template>

<script>
    module.exports = {
        props:['items'],
        data: function () {
            return {}
        },
        created:function () {
            if(this.items){
                for (var i=0;i<this.items.length;i++){
                    this.items[i].c_instance=LoadComponent(this.items[i].c_path);
                }
            }
        }
    }
</script>

<style>

</style>