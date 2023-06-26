<template>
    <div class="submitted__container">
        <h3>Your adventure awaits!</h3>
        <p>
            Thank you for your submission! Our team will be in touch with you shortly to start
            planning the honeymoon of your dreams!
        </p>
    </div>
</template>

<style lang="scss">
.submitted__container {
    
    h3 {
        font-size: $type-24;
        font-weight: 600;
        text-align: center;
    }

    p {
        @include h2;
        line-height: $type-22;
        margin-top: $spacing-16;
    }
}
</style>
