<template>
    <v-text-field v-model="v" :success="is_validated" :messages="messages" :loading="is_loading" :error-messages="error_messages" :error="is_error" :prepend-icon="config.el_icon" :name="config.el_name" :label="config.el_title" :type="vtype" counter>
        <v-fade-transition slot="append">
            <v-progress-circular
                    v-if="is_loading"
                    size="24"
                    color="info"
                    indeterminate
            ></v-progress-circular>
        </v-fade-transition>
        <v-icon slot="append" v-if="is_validated && !isPassword" color="green darken-2">mdi-check-outline</v-icon>
        <v-icon slot="append" v-if="!is_validated && is_error && !isPassword" color="red darken-2">mdi-alert-circle-outline</v-icon>
        <v-icon slot="append" v-if="isPassword" @click="showText = !showText">{{passwordIcon}}</v-icon>
    </v-text-field>
</template>

<script>
    module.exports = {
        props:['config'],
        data: function () {
            return {
                v:'',
                messages:'',
                error_messages: '',
                is_error:false,
                is_loading:false,
                is_validated:false,
                showText:false,
                isPassword:'password'===this.config.el_type
            }
        },
        watch: {
            v: function (newV, oldV) {
                this.is_error=false;
                this.error_messages='';
                this.is_validated=false;
                this.messages = '等待输入完成...';
                this.debouncedValidate()
            }
        },computed:{
            passwordIcon:function () {
                if(this.isPassword){
                    return this.showText ? 'visibility_off' : 'visibility';
                }else{
                    return '';
                }
            },
            vtype:function () {
                if(this.isPassword){
                    return this.showText ? 'text' : 'password';
                }else{
                    return 'text';
                }
            },
            checkRequired:function (){
                if(this.config.required && !this.v){
                    this.setValidateStatue('这是必填项');
                    return false;
                }else{
                    return true;
                }
            }
        },
        created: function () {
            // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
            // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
            // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
            // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
            // 请参考：https://lodash.com/docs#debounce
            this.debouncedValidate = _.debounce(this.remoteValidate, 1000)
        },
        methods: {
            setValidateStatue(val){
                this.is_error=!(true===val);
                this.error_messages=(this.is_error ? val:'');
                this.is_validated=!this.is_error;
                this.messages='';
            },
            remoteValidate:function (){
                if(this.checkRequired===true){
                    var vm = this;
                    vm.messages = '数据验证中...';
                    vm.is_loading=true;
                    trace('Validating.00');
                    api_call('/validate',null,{val:vm.v},false,false).then(function (value) {
                        if(value.code===200){
                            vm.setValidateStatue(true);
                        }else{
                            vm.setValidateStatue(value.message);
                        }
                    }).catch(function (error) {
                        vm.setValidateStatue('抱歉，远程验证发生异常：' + error);
                    }).then(function () {
                        vm.is_loading=false;
                    })
                }
            }
        }
    }
</script>
