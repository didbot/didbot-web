<style>
    .btn{
        outline: none !important;
    }
</style>
<template>
    <div class="form-group">
        <div class="btn-group btn-group-xs" role="group">
            <button type="button"
                    v-for="(key, val) in values"
                    @click="changeSelectVal(val)"
                    :class="['btn', { 'btn-primary': selected === val, 'btn-default': selected !== val }]"
                    role="group"
            >{{ val }}</button>
        </div>
    </div>
</template>
<script>
    module.exports = {
        name: 'button-group',
        props: ['values', 'default'],
        data () {
            return {
                selected: null
            }
        },
        methods: {
            changeSelectVal: function (val) {
                this.selected = val
                this.$emit('type-selected', val)
            }
        }
    }
</script>