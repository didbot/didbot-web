<template>
    <ul class="dids list-group">
        <li v-for="did in dids" class="list-group-item">
            <did :did="did"></did>
        </li>
    </ul>
</template>

<script>
    module.exports = {
        props: ['dids'],
        components: {
            'did': require('./Did.vue'),
        }
    }
</script>