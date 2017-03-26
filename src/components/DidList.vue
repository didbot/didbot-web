<template>
    <ul class="dids list-group">
        <li v-for="did in dids" class="list-group-item">
            <did :did="did"></did>
        </li>
        <infinite-loading :on-infinite="loadDids" ref="infiniteLoading">
            <span slot="no-results">- end of results -</span>
        </infinite-loading>
    </ul>
</template>

<script>
    import Did from './Did.vue'
    import InfiniteLoading from 'vue-infinite-loading'

    module.exports = {
        name: 'did-list',
        data () {
            return {
                dids: [],
                cursor: {
                    current: null,
                    prev: null,
                    next: null,
                    count: null
                }
            }
        },
        mounted: function () {
            this.$didbotBus.$on('get-dids-response', function (response) {
                this.cursor = response.meta.cursor
                this.dids = response.data
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            }.bind(this))

            this.$didbotBus.$on('get-more-dids-response', function (response) {
                this.cursor = response.meta.cursor
                this.dids = this.dids.concat(response.data)
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            }.bind(this))
        },
        methods: {
            // note that this method will be called on initial load
            loadDids () {
                // if cursor.count === null this is the first load.
                if (this.cursor.count === null) {
                    this.$didbotBus.$emit('get-dids')
                    return
                }

                // if cursor.next is null or === 1 then there are no more records
                if (!this.cursor.next || this.cursor.next === 1) {
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
                    return
                }

                // in all other situations pass on the next cursor
                this.$didbotBus.$emit('update-cursor', this.cursor.next)
            }
        },
        components: {
            Did,
            InfiniteLoading
        }
    }
</script>