<template>
    <div class="header__container">
        <div class="header__content">
            <div class="header__copy wrapper">
                <h1>Your Guide to Epic Honeymoon Destinations</h1>
                <h2>
                    Fill out our questionnaire below, and we'll work with you to plan the honeymoon of your dreams.
                    After all, trips like these only happen once in a blue moon.
                </h2>
            </div>
            <div class="header__image">
                <figure class="header__figure image__figure">
                    <img src="../assets/images/canyon.jpg" />
                </figure>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .header__container {
        // background-image: linear-gradient(to left, $ocean , $dark-ocean);
    }

    .header__content {
        color: white;
        display: flex;
        
    }

    .header__copy {
        padding: $spacing-64 0;
        width: 50%;
        background-image: linear-gradient(to left, $ocean , $dark-ocean);
    }
    
    .header__image {
        width: 50%;
    }

    .header__figure {
        position: relative;
        // @include image-wrapper(50%, 50%);
    }

</style>