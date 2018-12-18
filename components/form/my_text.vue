<template>
    <v-text-field :model="v" :prepend-icon="config.el_icon" :name="config.el_name" :label="config.el_title" :type="config.el_type"></v-text-field>
</template>

<script>
    module.exports = {
        props:['config'],
        data: function () {
            return {
                v:'',
                question: '',
                validMessage: 'I cannot give you an validMessage until you ask a question!'
            }
        }
        // watch: {
        //     // 如果 `question` 发生改变，这个函数就会运行
        //     question: function (newQuestion, oldQuestion) {
        //         this.answer = 'Waiting for you to stop typing...'
        //         this.debouncedGetAnswer()
        //     }
        // },created: function () {
        //     // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        //     // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
        //     // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
        //     // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
        //     // 请参考：https://lodash.com/docs#debounce
        //     this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
        // },
        // methods: {
        //     getAnswer: function () {
        //         if (this.question.indexOf('?') === -1) {
        //             this.answer = 'Questions usually contain a question mark. ;-)'
        //             return
        //         }
        //         this.answer = 'Validating...';
        //         var vm = this;
        //         axios.get('https://yesno.wtf/api')
        //             .then(function (response) {
        //                 vm.validMessage = _.capitalize(response.data.validMessage)
        //             })
        //             .catch(function (error) {
        //                 vm.validMessage = 'Error! Could not reach the API. ' + error
        //             })
        //     }
        // }
    }
</script>
