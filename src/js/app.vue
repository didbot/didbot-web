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
            this.token = (didbot.apiToken) ? didbot.apiToken : ''
            this.baseUrl = (didbot.baseUrl) ? didbot.baseUrl : 'https://didbot.com/api/1.0/'

            this.getDids()
            this.$didbotBus.$on('create-did', this.createDid)
            this.$didbotBus.$on('delete-did', this.deleteDid)

            if (navigator.geolocation) {
                var vue = this
                navigator.geolocation.getCurrentPosition(function (position) {
                    vue.geo = position.coords.latitude + ',' + position.coords.longitude
                })
            }
        },
        methods: {
            getDids(){
                this.$http.get(this.baseUrl + 'dids', {
                        headers: {
                            Authorization: this.token
                        }})
                        .then(response => {
                            this.dids = response.body.reverse();
                        })
            },
            createDid: function (text) {
                this.$http.post(this.baseUrl + 'dids', {text: text, geo: this.geo}, {
                        headers: {
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