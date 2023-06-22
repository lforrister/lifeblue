<template>
    <div>
        REVIEW PAGE 
        {{ editing }}
        <div v-for="result in results">
            <div v-if="editing.includes(result)">
                INPUT: {{ result.input }}
                <Select v-if="result.type === 'select'" v-model="result.input" :field="result" />
                <Checkbox v-else-if="result.type === 'checkbox'" v-model="result.input" :field="result" />
                <Radio v-else-if="result.type === 'radio'" v-model="result.input" :field="result" />
                <DatePicker v-else-if="result.type === 'date'" v-model="result.input" :field="result" />
                <Text v-else v-model="result.input" :field="result" @validate-input="triggerValidate"/>

                <!-- <p v-if="errors.find((err) => err.id === result.id)" class="forms__error">
                    {{ result.errorMessage }}
                </p> -->
            </div>
            <div v-else>
                <h3>{{ result.label }}</h3>
                <p v-if="result.input"> {{ result.input }}</p>
                <button @click.prevent="edit(result)">Edit</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue'
    
    // == Define Props & Emits == //
    const props = defineProps({
        results: {
            type: Object,
            default: null
        }
    })

    // == Declare Variables == //
    const editing = ref([])
    

    // == Functions == //
    function edit(result) {
        console.log ('editing!', result)
        editing.value.push(result)
    }

</script>