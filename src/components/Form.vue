<template>
    <div class="form__container">
        <ProgressTracker :percent="progress"/>

        <form class="form__form">
            <div v-for="field in displayForm">
                <div v-if="display === 'single' || editable.includes(field.id)">
                    <Select v-if="field.type === 'select'" v-model="field.input" :field="field" />
                    <Checkbox v-else-if="field.type === 'checkbox'" v-model="field.input" :field="field" />
                    <Radio v-else-if="field.type === 'radio'" v-model="field.input" :field="field" />
                    <DatePicker v-else-if="field.type === 'date'" v-model="field.input" :field="field" />
                    <Text v-else v-model="field.input" :field="field" @validate-input="triggerValidate"/>

                    <p v-if="errors.find((err) => err.id === field.id)" class="forms__error">
                        {{ field.errorMessage }}
                    </p>

                    <button v-if="editable.includes(field.id)" @click.prevent="save(field)">Save</button>
                </div>

                <div v-else>
                    <div v-if="!editable.includes(field.id)" class="form__full">
                        <div class="form__row">
                            <h3>
                            {{ field.label }}
                            </h3>
                            <button @click.prevent="edit(field)" class="form__edit">EDIT</button>
                        </div>
                        <p class="form__answer">
                            {{ field.input }}
                        </p>
                    </div>
                
                </div>
                
            </div>

            <div v-if="display === 'single'" class="form__buttons">
                <button v-if="currentQ > 0" @click.prevent="prev" class="forms__back-btn">
                    Back
                </button>
                <button v-if="currentQ < (quiz.length - 1)" @click.prevent="next" :class="disabled ? 'is-disabled' : ''">
                    Next
                </button>
                <button v-if="currentQ === (quiz.length - 1)"  @click.prevent="updateDisplay('full')">
                    Review
                </button>
            </div>

            <div v-else class="form__buttons">
                <button :class="disabled ? 'is-disabled' : ''">Submit</button>
            </div>
            
        </form>
    </div>
</template>

<script setup>
    import Checkbox from './Fields/Checkbox.vue'
    import DatePicker from './Fields/DatePicker.vue'
    import { computed, onMounted, ref } from 'vue'
    import ProgressTracker from './ProgressTracker.vue'
    import Radio from './Fields/Radio.vue'
    import Select from './Fields/Select.vue'
    import Text from './Fields/Text.vue'
    import { debouncing, validation } from '../plugins/utils'

    
    // == Declaring Variables == //
    const currentQ = ref(0)
    const errors = ref([])
    const validated = ref(false)
    const display = ref('single')
    const editable = ref([])
    const quiz = ref([
        {
            input: ref(''),
            type: 'input',
            id: 'first_name',
            name: 'First Name',
            label: 'What is your first name?',
            required: true,
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

    const displayForm = computed(() => {
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
        //@todo - in theory we can use the 'full' for both, but have to figure out the debonce
        if (display.value === 'single') {
            if (required.value && needsValidation.value) {
                return !current.value.input.length || !validated.value
            } else if (required.value) {
                return !current.value.input.length
            } 

            return false
        }

        if (display.value === 'full') {
            let req = displayForm.value.filter((field) => field.required)
            let inputs = req.filter((f) => f.input.length)

            if (req.length != inputs.length || errors.value.length) {
                return true
            }

            return false
        }
    })

    const progress = computed(() => {
        let p = currentQ.value / quiz.value.length
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
        display.value = type
    }

    function edit(field) {
        editable.value.push(field.id)
    }

    function save(field) {
        let item = editable.value.find(i => i === field.id)
        let index = editable.value.indexOf(item)

        if (index > -1) {
            editable.value.splice(index, 1)
        }
    }

</script>

<style lang="scss">
    .form__container {
        position: relative;
        padding: $spacing-40;
        width: 500px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border-radius: 12px;
        background: white;
    }

    .form__form {
        margin-top: $spacing-8;
    }

    .form__buttons {
        margin-top: $spacing-16;

        button {
            @include button-primary;
        }
    }

    .forms__back-btn {
        margin-right: $spacing-8;
    }

    .form__answer {
        font-family: $raleway;
        border-bottom: 1px solid $silver;
        padding-bottom: $spacing-8;
    }

    .form__full {
        margin-bottom: $spacing-16;
    }

    .form__row {
        display: flex;
        justify-content: space-between;
        margin: $spacing-24 0;
    }

    .form__edit {
        font-family: $raleway;
        font-size: 12px;
        padding: $spacing-4 $spacing-8;
    }

</style>