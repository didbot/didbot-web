<template>
    <div>
        <did-create></did-create>
        <did-list :dids="dids"></did-list>
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
                baseUrl: null,
                dids: [],
                geo: null,
                token: null
            }
        },
        mounted: function () {
            var vue = this

            this.token = (didbot.apiToken) ? didbot.apiToken : ''
            this.baseUrl = (didbot.baseUrl) ? didbot.baseUrl : 'https://didbot.com/api/1.0/'

            this.getDids(this.baseUrl + 'dids')
            this.$didbotBus.$on('create-did', this.createDid)
            this.$didbotBus.$on('delete-did', this.deleteDid)

            this.$didbotBus.$on('get-dids-by-tag', function (tag_id) {
                var url = vue.baseUrl + 'dids?client_id=' + tag_id
                vue.getDids(url)
            })
            this.$didbotBus.$on('get-dids-by-client', function (client_id) {
                var url = vue.baseUrl + 'dids?client_id=' + client_id
                vue.getDids(url)
            })

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    vue.geo = position.coords.latitude + ',' + position.coords.longitude
                })
            }
        },
        methods: {
            getDids(url){
                this.$http.get(url, {
                        headers: {
                            Accept: 'application/json',
                            Authorization: this.token
                        }})
                        .then(response => {
                            this.dids = response.body.data.reverse();
                        })
            },
            createDid: function (text) {
                this.$http.post(this.baseUrl + 'dids', {text: text, geo: this.geo}, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: this.token
                        }})
                        .then(response => {
                            this.getDids()
                        })
            },
            deleteDid(id){
                this.$http.delete(this.baseUrl + 'dids/' + id, {
                        headers: {
                            Authorization: this.token
                        }})
                        .then(response => {
                            this.getDids()
                        })
            }
        },
        components: {
            'did-list': require('./DidList.vue'),
            'did-create': require('./DidCreate.vue'),
        }
    }
</script>