<template>
    <ul class="dids list-group">
        <li v-for="did in dids" class="list-group-item">
            <did :did="did"></did>
        </li>
    </ul>
</template>

<script>
    import Did from './Did.vue'

    module.exports = {
        name: 'did-list',
        props: ['dids'],
        components: {
            Did
        }
    }
</script>