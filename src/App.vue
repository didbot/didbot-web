<template>
    <div>
        <did-create></did-create>
        <did-list :dids="dids"></did-list>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    Vue.use(VueResource)

    const didbotBus = new Vue()
    Vue.prototype.$didbotBus = didbotBus

    import DidCreate from './components/DidCreate.vue'
    import DidList from './components/DidList.vue'

    export default {
        name: 'app',
        data () {
            return {
                baseUrl: null,
                dids: [],
                geo: null,
                token: null
            }
        },
        mounted: function () {
            this.token = (window.didbot.apiToken) ? window.didbot.apiToken : ''
            this.baseUrl = (window.didbot.baseUrl) ? window.didbot.baseUrl : 'https://didbot.com/api/1.0/'

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
            getDids () {
                this.$http.get(this.baseUrl + 'dids', {
                    headers: {
                        Authorization: this.token,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                        .then(response => {
                            this.dids = response.body.data.reverse()
                        })
            },
            createDid: function (text) {
                this.$http.post(this.baseUrl + 'dids', {text: text, geo: this.geo}, {
                    headers: {
                        Authorization: this.token,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                        .then(response => {
                            this.getDids()
                        })
            },
            deleteDid (id) {
                this.$http.delete(this.baseUrl + 'dids/' + id, {
                    headers: {
                        Authorization: this.token,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                        .then(response => {
                            this.getDids()
                        })
            }
        },
        components: {
            DidList,
            DidCreate
        }
    }
</script>
<style src="./assets/scss/did.sass" lang="sass"></style>
