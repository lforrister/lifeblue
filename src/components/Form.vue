<template>
    <div class="form__container">
        <form>
            <div v-for="(q, index) in quiz">
                <div v-if="index === currentQ">
                    INPUT: {{ q.input }}
                    <Select v-if="q.type === 'select'" :field="q" />
                    <Checkbox v-else-if="q.type === 'checkbox'" :field="q" />
                    <Radio v-else-if="q.type === 'radio'" v-model="q.input" :field="q" />
                    <DatePicker v-else-if="q.type === 'date'" :field="q" />
                    <Text v-else v-model="q.input" :field="q" />
                </div>
            </div>

            <div class="form__buttons">
                <button v-if="currentQ > 0" @click.prevent="prev">
                    Back
                </button>
                <button v-if="currentQ < (quiz.length - 1)" @click.prevent="next">
                    Next
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import Checkbox from './Fields/Checkbox.vue'
    import DatePicker from './Fields/DatePicker.vue'
    import Radio from './Fields/Radio.vue'
    import { ref } from 'vue'
    import Select from './Fields/Select.vue'
    import Text from './Fields/Text.vue'
    
    // == Declaring Variables == //
    const message = ref('')
    const currentQ = ref(0)
    const quiz = ref([
        {
            input: ref(''),
            type: 'input',
            id: 'q1',
            name: 'q1',
            label: 'Question One',
            required: true,
            validate: true,
            errorMessage: 'Please fill out the question.'
        },
        {
            input: ref(''),
            type: 'email',
            id: 'q2',
            name: 'q2',
            label: 'Question Two',
            required: true,
            validate: true,
            errorMessage: 'Please fill out the question.'
        },
        {
            input: ref(''),
            type: 'select',
            id: 'q3',
            name: 'q3',
            label: 'Question Three',
            required: true,
            validate: true,
            errorMessage: 'Please fill out the question.'
        },
        {
            input: ref(''),
            type: 'checkbox',
            id: 'q4',
            name: 'q4',
            label: 'Question Four',
            required: true,
            validate: true,
            errorMessage: 'Please fill out the question.'
        },
        {
            input: ref(''),
            type: 'radio',
            id: 'q5',
            name: 'q5',
            label: 'Question Five',
            required: true,
            validate: true,
            errorMessage: 'Please fill out the question.',
            options: [
                {   
                    id: 'option_1',
                    value: 'option_1',
                    label: 'Option 1'
                },
                {   
                    id: 'option_2',
                    value: 'option_2',
                    label: 'Option 2'
                },
                {
                    id: 'option_3',
                    value: 'option_3',
                    label: 'Option 3'
                }
            ]
        },
        {
            input: ref(''),
            type: 'date',
            id: 'q6',
            name: 'q6',
            label: 'Question Six',
            required: true,
            validate: true,
            errorMessage: 'Please fill out the question.'
        },

    ])

    // == Functions == //
    function prev() {
        currentQ.value = currentQ.value - 1 
    }

    function next() {
        console.log('clicked!')
        console.log('current', currentQ.value)
        currentQ.value = currentQ.value + 1
        console.log('after click', currentQ.value)
    }

    function updateInput() {
        console.log('updating!')
    }


</script>

<style lang="scss">
    .form__container {
        border: 1px solid black;
    }

</style>