<template>
    <nav class="nav__container">
        NAVIGATION
    </nav>
</template>

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
    }
</style>