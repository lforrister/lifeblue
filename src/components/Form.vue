<template>
    <div class="form__container">
        <FormHeader v-if="display !== 'finished'" :index="currentQ" :display="display" />
        <ProgressTracker v-if="display !== 'finished'" :percent="progress" :display="display" />

        <form class="form__form">
            <div v-for="field in displayForm" :key="field.id" class="form__section">
                <EditField
                    v-if="display === 'single' || editable === field.id"
                    :field="field"
                    @update-validation="updateValidation"
                />
                <Review v-else-if="display === 'full'" :field="field" :editable="editable" />
                <SaveButton
                    v-if="editable === field.id"
                    @click.prevent="save(field)"
                    class="form__review-btn"
                    :class="disabled ? 'is-disabled' : ''"
                />
                <EditButton
                    v-else-if="display === 'full'"
                    @click.prevent="edit(field)"
                    class="form__review-btn"
                    :class="editable !== '' && editable !== field.id ? 'is-disabled' : ''"
                />
            </div>

            <div v-if="display === 'single'" class="form__buttons">
                <button
                    v-if="currentQ > 0"
                    @click.prevent="prev"
                    class="buttons__secondary forms__prev"
                >
                    Back
                </button>
                <button
                    v-if="currentQ < quiz.length - 1"
                    @click.prevent="next"
                    class="buttons__primary"
                    :class="disabled ? 'is-disabled' : ''"
                >
                    Next
                </button>
                <button
                    v-if="currentQ === quiz.length - 1"
                    @click.prevent="review"
                    class="buttons__primary"
                >
                    Review
                </button>
            </div>

            <div v-else-if="display === 'full'" class="form__buttons">
                <button
                    class="buttons__primary"
                    :class="disabled || editable ? 'is-disabled' : ''"
                    @click.prevent="submit"
                >
                    Submit
                </button>
            </div>

            <Submitted v-else />
        </form>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, onUpdated, ref, nextTick } from 'vue'
import EditButton from './Buttons/EditButton.vue'
import FormHeader from './FormHeader.vue'
import ProgressTracker from './ProgressTracker.vue'
import SaveButton from './Buttons/SaveButton.vue'
import questions from '../questions.json'
import Review from './Review.vue'
import EditField from './EditField.vue'
import Submitted from './Submitted.vue'

// == Declaring Variables == //
const currentQ = ref(Number(localStorage.getItem('index')) ?? 0)
const display = ref('single')
const editable = ref('')
const quiz = ref(questions)
const notValid = ref([])

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
    let inputs = req.filter((field) => field.input.length)
    let passRequired = req.length === inputs.length

    //Step 2: Check for validation
    let needsVal = displayForm.value.filter((field) => field.validate)
    let inputsVal = needsVal.filter((field) => field.input).map((f) => f.id)
    let valCount = notValid.value.filter((valField) => inputsVal.includes(valField))
    let passValidation = !valCount.length

    return !passValidation || !passRequired
})

const progress = computed(() => {
    let p = currentQ.value / quiz.value.length
    return Math.round(p * 100)
})

// == Functions == //
function fill() {
    quiz.value.forEach((q) => {
        switch (q.type) {
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
    notValid.value = [...new Set(notValid.value)]
    let id = field[0]
    let valid = field[1]

    if (valid) {
        let item = notValid.value.find((i) => i === id)
        let index = notValid.value.indexOf(item)

        if (index > -1) {
            notValid.value.splice(index, 1)
        }
    } else {
        notValid.value.push(id)
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
        nextTick(setFocus)
    }
}

function setFocus() {
    let id = current.value.type === 'checkbox' || current.value.type === 'radio' ? current.value.options[0].id : current.value.id
    let el = document.getElementById(id)
    el.focus()
}

function review() {
    updateDisplay('full')
    updateStorage()
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
    if (editable.value === '' || editable.value === field.id) {
        editable.value = field.id
    }

    nextTick(() => {
        console.log('next!!!')
        let el = document.getElementById(editable.value)
        console.log('el', el)
        el.focus()
    })
}

function save() {
    if (!disabled.value) {
        editable.value = ''
        updateStorage()
    }
}

function submit() {
    if (!disabled.value && !editable.value) {
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

onUpdated(() => {
    console.log('updated!')
})
</script>

<style lang="scss">
.form__container {
    position: relative;
    padding: $spacing-24;
    padding-top: 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 12px;
    background: white;

    @media screen and (min-width: $breakpoint-md) {
        padding: $spacing-40;
        padding-top: 0;
        width: 500px;
    }
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
    border-bottom: 1px solid $stars;
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

    &.is-disabled {
        border: 2px solid $stars;

        svg {
            stroke: $stars;
        }

        &:hover {
            cursor: not-allowed;
        }
    }
}
</style>
