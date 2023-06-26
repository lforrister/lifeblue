<template>
    <div class="formHeader__container">
        <div v-if="copy" class="formHeader__title">
            <h3>{{ copy }}</h3>
        </div>
        <div v-for="(img, index) in image" :key="index" class="formHeader__image-container">
            <figure :class="index !== displayImg ? 'is-hidden' : ''" class="formHeader__figure">
                <img 
                    :src="img.url"
                    :alt="alt ?? 'A BlueMoon vacation image.'"
                />
            </figure>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// == Define Props & Emits == //
const props = defineProps({
    index: {
        type: Number,
        default: 0
    },
    display: {
        type: String,
        default: ''
    }
})

// == Declare Variables == //
const image = [
    {
        url: new URL('../assets/images/mountains.jpg', import.meta.url),
        alt: "A couple leans on each other while seeing the view of the mountains."
    },
    {
        url: new URL('../assets/images/maldives.jpg', import.meta.url),
        alt: "Landscape shot of huts over the ocean in the Maldives."
    }, 
    {
        url: new URL('../assets/images/hands.jpg', import.meta.url),
        alt: "A woman leads her partner towards a vibrant lake."
    },
    {
        url: new URL('../assets/images/couple.jpg', import.meta.url),
        alt: "A couple stands on a deck watching a sunset over a lake."
    }

]

const displayImg = ref(0)

// == Computed Properties == //
const copy = computed(() => {
    if (props.display === 'finished') {
        displayImg.value = 3
        return ''
    } else if (props.display === 'full') {
        displayImg.value = 2
        return 'Step 3: Review & Submit'
    } else if (props.index < 5) {
        displayImg.value = 0
        return 'Step 1: Your Information'
    } else if (props.index <= 10) {
        displayImg.value = 1
        return 'Step 2: Your Dream Trip'
    }

    return "Let's Get Started"
})

</script>

<style lang="scss">
.formHeader__container {
    margin-left: calc($spacing-24 * -1);
    margin-right: calc($spacing-24 * -1);

    @media screen and (min-width: $breakpoint-sm) {
        margin-left: calc($spacing-40 * -1);
        margin-right: calc($spacing-40 * -1);
    }
}

.formHeader__title {
    background-image: $ocean-gradient;
    color: white;
    padding: $spacing-8 $spacing-40;
}

.formHeader__image-container {
    background-image: $mist-gradient;
}

.formHeader__figure {
    position: relative;
    @include image-figure;
    height: 225px;
    transition: opacity 0.3s ease-in;

    &:after {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(30, 60, 114, 0.25);
    }

    &.is-hidden {
        opacity: 0;
        height: 0;
    }
}
</style>
