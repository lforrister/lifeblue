<template>
    <nav class="nav__container">
        <div class="wrapper">
            <span>BLUEMOON</span>
            <MoonIcon />
        </div>
    </nav>
</template>

<script setup>
    import MoonIcon from './icons/MoonIcon.vue';
</script>

<style lang="scss">
    .nav__container {
        height: 40px;
        background: $dark-ocean;
        position: relative;

        &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.15);
        }

        .wrapper {
            height: 100%;
            display: flex;
            align-items: center;
        }

        span {
            color: $iceberg;
            z-index: 100;
            position: relative;
            font-family: $raleway;
            font-weight:900;
        }

        svg {
            height: 18px;
            width: auto;
            stroke: $iceberg;
            z-index: 100;
            position: relative;
            transform: rotate(120deg);
        }
    }
</style>