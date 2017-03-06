<style>
    #error-container {
        position: fixed;
        z-index: 999;
        top: 80px;
        right: 0;
        width: 300px;
    }
</style>
<template>
    <div id="error-container">
        <div class="alert alert-danger" role="alert" v-for="(error, index) in errors">
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span class="sr-only">Error:</span>
            <button type="button" class="close" @click="clearError($event, index)">×</button>
            {{error.response.data}}
        </div>
    </div>
</template>
<script>
    module.exports = {
        name: 'error',
        data () {
            return {
                message: null,
                errors: []
            }
        },
        mounted: function () {
            this.$didbotBus.$on('set-error', function (error) {
                this.errors.push(error)
            }.bind(this));
        },
        methods: {
            clearError: function (e, key) {
                e.preventDefault()
                let index = this.errors.indexOf(key)
                this.errors.splice(index, 1);
            }
        }
    }
</script>