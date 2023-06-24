<template>
    <div class="form__container" id="info-form">
        <FormHeader v-if="display !== 'finished'" :index="currentQ" :display="display"/>
        <ProgressTracker v-if="display !== 'finished'" :percent="progress" :display="display"/>
 
        <form class="form__form"> DISABLED? {{ disabled }}
            <div v-for="field in displayForm" class="form__section">
                <Edit v-if="display === 'single' || editable.includes(field.id)" :field="field" @update-validation="updateValidation"/>
                <Review v-else-if="display === 'full'" :field="field" :editable="editable"/>
                <SaveButton v-if="editable.includes(field.id)" @click.prevent="save(field)" class="form__review-btn"/>
                <EditButton v-else-if="display === 'full'" @click.prevent="edit(field)" class="form__review-btn"/>
            </div>

            <div v-if="display === 'single'" class="form__buttons">
                <button v-if="currentQ > 0" @click.prevent="prev" class="buttons__secondary forms__prev">
                    Back
                </button>
                <button v-if="currentQ < (quiz.length - 1)" @click.prevent="next" class="buttons__primary" :class="disabled ? 'is-disabled' : ''">
                    Next
                </button>
                <button v-if="currentQ === (quiz.length - 1)" @click.prevent="updateDisplay('full')" class="buttons__primary">
                    Review
                </button>

            </div>

            <div v-else-if="display === 'full'" class="form__buttons">
                <button class="buttons__primary" :class="disabled ? 'is-disabled' : ''" @click.prevent="submit">Submit</button>
            </div>

            <div v-else>
                <h3>Thank you for your submission!</h3>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { computed, onBeforeMount, ref } from 'vue'
    import EditButton from './Buttons/EditButton.vue'
    import FormHeader from './FormHeader.vue'
    import ProgressTracker from './ProgressTracker.vue'
    import SaveButton from './Buttons/SaveButton.vue'
    import questions from '../questions.json'
    import Review from './Review.vue'
    import Edit from './Edit.vue'

    
    // == Declaring Variables == //
    const currentQ = ref(Number(localStorage.getItem('index')) ?? 0)
    const display = ref('single')
    const editable = ref([])
    const quiz = ref(questions)
    const validated = ref([])

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

    const disabled = computed(() => {
        //Step 1: Check for required
        let req = displayForm.value.filter((field) => field.required)
        let inputs = req.filter((field) => field.input)
        let passRequired = req.length === inputs.length

        // Step 2: Check for validation
        let needsVal = displayForm.value.filter((field) => field.validate)
        let inputsVal = needsVal.filter((field) => field.input).map(f => f.id)
        let valCount = validated.value.filter((valField) => inputsVal.includes(valField))
        let passValidation = inputsVal.length === valCount.length

        console.log('pass required? ', passRequired)
        console.log('pass validation? ', passValidation)
        console.log('inputs', inputsVal.length, 'val', valCount.length)
        console.log('validated', validated.value)

        return !passValidation || !passRequired
    })

    const progress = computed(() => {
        let p = currentQ.value / quiz.value.length
        return Math.round(p * 100)
    })


    // == Functions == //
    function fill() {
        quiz.value.forEach((q) => {
            switch(q.type) {
                case 'checkbox':
                    let stored = localStorage.getItem(q.id)
                    q.input = ref(stored ? stored.split(',') : [])
                    break
                default:
                    q.input = ref(localStorage.getItem(q.id) ?? '')
            }
        })
    }
    
    function updateValidation(field) {
        validated.value = [...new Set(validated.value)]
        //@todo - make util for removing item from array
        let id = field[0]
        let valid = field[1]
        if (valid) {
            //remove item   
            validated.value.push(id)
 
        } else {
            let item = validated.value.find(i => i === id)
            let index = validated.value.indexOf(item)

            if (index > -1) {
                validated.value.splice(index, 1)
            }
        }

    }

    function prev() {
        currentQ.value = currentQ.value - 1 
        localStorage.setItem('index', currentQ.value)
    }

    function next() {
        if (!disabled.value) {
            currentQ.value = currentQ.value + 1
            updateStorage()
        }
    }

    function updateStorage() {
        quiz.value.forEach((q) => {
            if (q.input.length) {
                localStorage.setItem(q.id, q.input)
            } else {
                localStorage.removeItem(q.id)
            }
        })
        localStorage.setItem('index', currentQ.value)
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

        updateStorage()
    }

    function submit() {
        if (!disabled.value) {
            display.value = 'finished'
            clearStorage()
        }
    }

    function clearStorage() {
        quiz.value.forEach((q) => {
            localStorage.removeItem(q.id)
        })

        localStorage.removeItem('index')
    }

    onBeforeMount(() => {
        fill()
    })

</script>

<style lang="scss">
    .form__container {
        position: relative;
        padding: $spacing-40;
        padding-top: 0;
        width: 500px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border-radius: 12px;
        background: white;
    }

    .form__buttons {
        margin-top: $spacing-16;
    }

    .forms__prev {
        margin-right: $spacing-8;
    }

    .forms__back-btn {
        margin-right: $spacing-8;
    }

    .form__answer {
        font-family: $raleway;
        border-bottom: 1px solid $silver;
        padding-bottom: $spacing-8;
    }

    .form__edit {
        font-family: $raleway;
        font-size: 12px;
        padding: $spacing-4 $spacing-8;
    }

    .form__section {
        position: relative;
        margin-bottom: $spacing-24;
    }

    .form__review-btn {
        position: absolute;
        top: 0;
        right: 0;
    }   

</style>