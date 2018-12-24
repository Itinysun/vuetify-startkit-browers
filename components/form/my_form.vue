<template>
    <v-form>
        <component ref="child" :is="item.c_instance" :config="item.c_prop" v-for="item in form_data" :key="item.c_name"></component>
    </v-form>
</template>

<script>
    module.exports = {
        props:['form_id'],
        data: function () {
            return {
                form_data:[]
            }
        },
        mounted:function () {
            //从接口调取登陆需要的字段
            var vm=this;
            api_call('/form/'+vm.form_id).then(function (value) {
                if(value.code===200){
                    for (var i=0;i<value.data.length;i++){
                        value.data[i].c_instance=LoadComponent(value.data[i].c_path);
                        vm.form_data.push(value.data[i]);
                    }
                }else{
                    system_message.error('oh,no!出错了~',value.message)
                }
            })
        },
        methods:{
            validate:function () {
                var inputs=this.$refs.child;
                var result={};
                var errors=0;
                if(!inputs)
                    return false;
                for(var i=0;i<inputs.length;i++){
                    if(inputs[i].checkRequired===true){
                        _.set(result,inputs[i].$props.config.el_name,inputs[i].v);
                    }else{
                        errors++;
                    }
                }
                return errors===0?result:false;
            }
        }
    }
</script>

<style>

</style>
