<template>
    <div class="form__container">
        HERE IS MY FORM
        <div v-for="(q, index) in quiz">
            <div v-if="index === currentQ">
                {{ q.label }}
            </div>
        </div>
        {{ currentQ }} {{  quiz.length }}
        <div class="form__buttons">
            <button v-if="currentQ > 0" @click="prev">
                Back
            </button>
            <button v-if="currentQ < (quiz.length - 1)" @click="next">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
    
    // == Declaring Variables == //
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
            type: 'input',
            id: 'q2',
            name: 'q2',
            label: 'Question Two',
            required: true,
            validate: true,
            errorMessage: 'Please fill out the question.'
        },
        {
            input: ref(''),
            type: 'input',
            id: 'q3',
            name: 'q3',
            label: 'Question Three',
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


</script>

<style lang="scss">
    .form__container {
        border: 1px solid black;
    }

</style>