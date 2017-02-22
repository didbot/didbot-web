<template>
</template>
<script>
    import querystring from 'querystring'

    module.exports = {
        name: 'ajax',
        mounted: function () {
            this.$didbotBus.$on('get-dids', function(filters){
                this.getDids(filters);
            }.bind(this))

            this.$didbotBus.$on('get-more-dids', function(filters){
                this.getMoreDids(filters);
            }.bind(this))

            this.$didbotBus.$on('create-did', this.createDid)
            this.$didbotBus.$on('delete-did', this.deleteDid)
            this.$didbotBus.$on('delete-did', this.deleteDid)

            this.$didbotBus.$on('get-tags', this.getTags)

            this.$didbotBus.$on('lookup-geo', this.lookupGeo)
        },
        methods: {
            // Dids
            getDids: _.debounce(function (filters) {
                var qs = querystring.stringify( filters )
                this.$http.get('dids?' + qs)
                    .then(response => {
                        this.$didbotBus.$emit('get-dids-response', response.data)
                    })
            }, 250),
            getMoreDids: _.debounce(function (filters) {
                var qs = querystring.stringify( filters )
                this.$http.get('dids?' + qs)
                    .then(response => {
                        this.$didbotBus.$emit('get-more-dids-response', response.data)
                    })
            }, 250),
            createDid: function (text) {
                this.$http.post('dids', {text: text, geo: this.geo})
                    .then(response => {
                        this.getDids()
                    })
            },
            deleteDid (id) {
                this.$http.delete('dids/' + id)
                    .then(response => {
                        this.getDids()
                    })
            },

            // Tags
            getTags() {
                this.$http.get('tags')
                    .then(response => {
                        this.$didbotBus.$emit('set-tags', response.data.data)
                    })
            },

            // Other
            lookupGeo () {
                this.$http.get('https://ipinfo.io')
                    .then(response => {
                        this.geo = response.data.loc
                    })
            }
        }
    }
</script>