<template>
    <div class="footer__container">
        <div class="wrapper">
            <div class="footer__content">
                <p>Copyright © 2023 BlueMoon Events Inc</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.footer__container {
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

.footer__content {
    color: white;
    padding: $spacing-16 0;
    text-align: center;
    position: relative;
    z-index: 100;
}
</style>
