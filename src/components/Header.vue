<template>
    <div class="header__container">
        <div class="header__content">
            <div class="header__copy wrapper">
                <h1>Your Guide to Epic Honeymoon Destinations</h1>
                <h2>
                    Fill out our questionnaire below, and we'll work with you to plan the honeymoon of your dreams.
                    After all, trips like these only happen once in a blue moon.
                </h2>

                <div class="header__cta">
                    <PulseButton @click="scrollToForm"/>
                </div>
            </div>
            <div class="header__image">
                <figure class="header__figure image__figure">
                    <img src="../assets/images/canyon.jpg" />
                </figure>
            </div>
        </div>
    </div>
</template>

<script setup>
    import PulseButton from './Buttons/PulseButton.vue'

    // == Functions == //
    function scrollToForm() {
        let form = document.getElementById('info-form')
        form.scrollIntoView({behavior: 'smooth'})
    }

</script>

<style lang="scss">
    .header__container {
        background-image: linear-gradient(to left, $ocean , $dark-ocean);
    }

    .header__content {
        color: white;
        display: flex;
        
    }

    .header__copy {
        padding: $spacing-64 0 $spacing-48 0;
        width: 50%;
    }
    
    .header__image {
        width: 50%;
        margin-left: -5%;
    }

    .header__figure {
        position: relative;
       clip-path: polygon(27% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%);

       &:after {
            position: absolute;
            content: '';
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            background: rgba(30, 60, 114, 0.25);
       }
    }

    .header__cta {
        margin-top: $spacing-40;
    }

</style>