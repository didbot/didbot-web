<template>
    <form class="new-did">
        <textarea @keyup.enter="createDid($event)" class="form-control" v-model="text" rows="2"
                  cols="60"></textarea><br>
        <button @click="createDid($event)" class="btn btn-sm btn-new">Did it!</button>
    </form>
</template>

<script>
    module.exports = {
        data() {
            return {
                text: null
            }
        },
        methods: {
            createDid: function (e) {
                e.preventDefault()
                this.$didbotBus.$emit('create-did', this.text)
                this.text = null
            }
        }
    }
</script>