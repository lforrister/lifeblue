<template>
    <div class="submitted__container">
        <figure class="submitted__figure">
            <img src="../assets/images/couple.jpg" alt="A couple on a dock watching the sunset over a lake."/>
        </figure>
        <h3>Your adventure awaits!</h3>
        <p>
            Thank you for your submission! Our team will be in touch with you shortly to start planning the honeymoon of your dreams!
        </p>
    </div>
</template>

<style lang="scss">

    .submitted__container {
        h3 {
            font-size: $type-24;
            font-weight: 600;
            text-align: center
        }

        p {
            @include h2;
            line-height: $type-22;
            margin-top: $spacing-16;
        }
    }

    .submitted__figure {
        @include image-figure;
        height: 250px;
        width: calc(100% + $spacing-48);
        margin: calc($spacing-24 * -1);
        margin-bottom: $spacing-24;
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
        position: relative;
        background-image: $mist-gradient;

        @media screen and (min-width: $breakpoint-md) {
            width: calc(100% + $spacing-80);
            margin: calc($spacing-40 * -1);
            margin-bottom: $spacing-40;
        }

        &:after {
            position: absolute;
            content: '';
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            background: rgba(30, 60, 114, 0.15);
       }
    }

</style>