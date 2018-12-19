<template>
    <v-text-field v-model.trim="v" :rules="rules" :message="message" :error-messages="error_messages" :error="is_error" :prepend-icon="config.el_icon" :name="config.el_name" :label="config.el_title" :type="config.el_type"></v-text-field>
</template>

<script>
    module.exports = {
        props:['config'],
        data: function () {
            return {
                v:'',
                question: '',
                messages:'',
                remoteValidate:false,
                error_messages: '',
                is_error:false,
                rules:[function () {

                }]
            }
        },
        watch: {
            // 如果 `question` 发生改变，这个函数就会运行
            v: function (newV, oldV) {
                this.messages = 'Waiting for you to stop typing...'
                this.debouncedGetAnswer()
            }
        },created: function () {
            // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
            // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
            // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
            // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
            // 请参考：https://lodash.com/docs#debounce
            this.debouncedGetAnswer = _.debounce(this.remoteValidate, 500)
        },
        methods: {
            async remoteValidate (){
                var vm = this;
                    if (vm.config.required && !vm.v) {
                        vm.messages = 'this filed is required';
                        return false;
                    }else{
                        vm.messages = 'Validating...';
                      var res = await api_call('/validate',null,{val:vm.v},false,false).then(function (value) {
                            if(value.code===200){
                                vm.error_messages = false;
                                resolve(true);
                            }else{
                                vm.error_messages = value.data;
                                resolve(false);
                            }
                        }).catch(function (error) {
                            vm.is_error=false;
                            vm.error_messages = 'Error! Could not reach the API. ' + error;
                            resolve(false);
                        })
                    }
            }
        }
    }
</script>
