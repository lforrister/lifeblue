<template>
    <div class="form__container">
        <ProgressTracker :percent="progress"/>
        <form>
          
            <div v-for="(q, index) in displayTest">
                {{ q.input }}
                <div v-if="display === 'single'">
                    <Select v-if="q.type === 'select'" v-model="q.input" :field="q" />
                    <Checkbox v-else-if="q.type === 'checkbox'" v-model="q.input" :field="q" />
                    <Radio v-else-if="q.type === 'radio'" v-model="q.input" :field="q" />
                    <DatePicker v-else-if="q.type === 'date'" v-model="q.input" :field="q" />
                    <Text v-else v-model="q.input" :field="q" @validate-input="triggerValidate"/>

                    <p v-if="errors.find((err) => err.id === q.id)" class="forms__error">
                        {{ q.errorMessage }}
                    </p>
                </div>

                <div v-else>
                    <h3>
                        {{ q.label }}
                    </h3>
                    <p>
                        {{ q.input }}
                    </p>
                </div>
                
            </div>

            <div class="form__buttons">
                <button v-if="currentQ > 0" @click.prevent="prev">
                    Back
                </button>
                <button v-if="currentQ < (quiz.length - 1)" @click.prevent="next" :class="disabled ? 'is-disabled' : ''">
                    Next
                </button>
                <button v-if="currentQ === (quiz.length - 1)"  @click.prevent="updateDisplay('full')">
                    Review
                </button>
            </div>
            

            <!---------- @todo move this into its own component eventually  ------------------>


        </form>
    </div>
</template>

<script setup>
    import Checkbox from './Fields/Checkbox.vue'
    import DatePicker from './Fields/DatePicker.vue'
    import { computed, onMounted, ref } from 'vue'
    import ProgressTracker from './ProgressTracker.vue'
    import Review from './Review.vue'
    import Radio from './Fields/Radio.vue'
    import Select from './Fields/Select.vue'
    import Text from './Fields/Text.vue'
    import { debouncing, validation } from '../plugins/utils'

    
    // == Declaring Variables == //
    const currentQ = ref(0)
    const errors = ref([])
    const validated = ref(false)
    const display = ref('single')
    const quiz = ref([
        {
            input: ref(''),
            type: 'input',
            id: 'q1',
            name: 'q1',
            label: 'Question One',
            required: false,
            errorMessage: 'Please fill out the question.'
        },
        {
            input: ref(''),
            type: 'email',
            id: 'email',
            name: 'Email',
            label: 'What is your email address?',
            required: true,
            validate: true,
            errorMessage: 'Please enter a valid email address.'
        },
        {
            input: ref(''),
            type: 'phone',
            id: 'phone',
            name: 'Phone Number',
            label: 'What is your phone number?',
            required: true,
            validate: true,
            errorMessage: 'Please enter a valid phone number.'
        },
        {
            input: ref(''),
            type: 'select',
            id: 'q3',
            name: 'q3',
            label: 'Question Three',
            required: true,
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
            input: ref([]),
            type: 'checkbox',
            id: 'q4',
            name: 'q4',
            label: 'Question Four',
            required: true,
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
            type: 'radio',
            id: 'q5',
            name: 'q5',
            label: 'Question Five',
            required: true,
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
            errorMessage: 'Please fill out the question.'
        },

    ])

    // == Computed Properties == //
    const current = computed(() => {
        return quiz.value[currentQ.value]
    }) 

    const displayTest = computed(() => {
        let d = []
        if (display.value === 'single') {
            d.push(current.value)
            return d
        }
        return quiz.value
    })

    const required = computed(() => {
        return current.value.required
    })

    const needsValidation = computed(() => {
        return current.value.validate
    })

    const disabled = computed(() => {
      
        if (required.value && needsValidation.value) {
            return !current.value.input.length || !validated.value
        } else if (required.value) {
            return !current.value.input.length
        } 

        return false
    })

    const progress = computed(() => {
        let p = (currentQ.value + 1) / quiz.value.length
        return Math.round(p * 100)
    })


    // == Functions == //
    function prev() {
        currentQ.value = currentQ.value - 1 
    }

    function next() {
        if (!disabled.value) {
            currentQ.value = currentQ.value + 1
        }

        validated.value = false
    }

    const triggerValidate = debouncing((field) => validateInput(field))

    function validateInput(field) {
        if (field.validate) {
            const valid = validation(field.type, field.input)

            if(valid) {
                errors.value = errors.value.filter((err) => err.id !== field.id)
            } else {
                errors.value.push({
                    id: field.id,
                    message: field.errorMessage ?? field.errorMessage
                })
            }
        } 

        validated.value = errors.value.length ? false : true
        
    }

    function updateDisplay(type) {
        console.log('type', type)
        display.value = type
    }

</script>

<style lang="scss">
    .form__container {
        border: 1px solid black;
        padding: $spacing-40;
    }

    .form__buttons {
        margin-top: $spacing-16;

        button {
            @include button-primary;
        }
    }

</style>