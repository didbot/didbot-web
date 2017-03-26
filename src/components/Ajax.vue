<template>
</template>
<script>
    import querystring from 'querystring'
    import _ from 'lodash'

    module.exports = {
        name: 'ajax',
        mounted: function () {
            this.$didbotBus.$on('get-dids', function (filters) {
                this.getDids(filters)
            }.bind(this))

            this.$didbotBus.$on('get-more-dids', function (filters) {
                this.getMoreDids(filters)
            }.bind(this))

            this.$didbotBus.$on('create-did', this.createDid)
            this.$didbotBus.$on('delete-did', this.deleteDid)
            this.$didbotBus.$on('delete-did', this.deleteDid)

            this.$didbotBus.$on('get-tags', this.getTags)
            this.$didbotBus.$on('create-tag', this.createTag)

            this.$didbotBus.$on('get-sources', this.getSources)
        },
        methods: {
            // Dids
            getDids: _.debounce(function (filters) {
                var qs = querystring.stringify(filters)
                this.$http.get('dids?' + qs)
                    .then(response => {
                        this.$didbotBus.$emit('get-dids-response', response.data)
                    })
                    .catch(error => {
                        this.$didbotBus.$emit('set-error', error)
                    })
            }, 250),
            getMoreDids: _.debounce(function (filters) {
                var qs = querystring.stringify(filters)
                this.$http.get('dids?' + qs)
                    .then(response => {
                        this.$didbotBus.$emit('get-more-dids-response', response.data)
                    })
                    .catch(error => {
                        this.$didbotBus.$emit('set-error', error)
                    })
            }, 250),
            createDid: function (body) {
                this.$http.post('dids', {
                        text: body.text,
                        geo: this.geo,
                        tags: body.tags
                    })
                    .then(response => {
                        this.getDids()
                    })
                    .catch(error => {
                        this.$didbotBus.$emit('set-error', error)
                    })
            },
            deleteDid (id) {
                this.$http.delete('dids/' + id)
                    .then(response => {
                        this.getDids()
                    })
                    .catch(error => {
                        this.$didbotBus.$emit('set-error', error)
                    })
            },
            // Tags
            getTags () {
                this.$http.get('tags')
                    .then(response => {
                        this.$didbotBus.$emit('set-tags', response.data.data)
                    })
                    .catch(error => {
                        this.$didbotBus.$emit('set-error', error)
                    })
            },
            createTag: function (body) {
                this.$http.post('tags', body)
                    .then(response => {
                        this.getTags()
                    })
                    .catch(error => {
                        this.$didbotBus.$emit('set-error', error)
                    })
            },
            // Tags
            getSources () {
                this.$http.get('sources')
                    .then(response => {
                        this.$didbotBus.$emit('set-sources', response.data.data)
                    })
                    .catch(error => {
                        this.$didbotBus.$emit('set-error', error)
                    })
            }
        }
    }
</script>