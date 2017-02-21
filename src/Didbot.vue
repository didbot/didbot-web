<template>
    <div>
        <did-create></did-create>
        <did-list :dids="dids"></did-list>
    </div>
</template>

<script>
    import Vue from 'vue'

    import axios from 'axios'

    var didbotBus = new Vue()

    import DidCreate from './components/DidCreate.vue'
    import DidList from './components/DidList.vue'

    export default {
        name: 'didbot',
        data () {
            return {
                dids: [],
                geo: null,
                axios: null
            }
        },
        mounted: function () {
            var didbotApp = this

            this.axios = axios.create({
                baseURL: (window.didbot.baseUrl) ? window.didbot.baseUrl : 'https://didbot.com/api/1.0/',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': (window.didbot.apiToken) ? window.didbot.apiToken : '',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            this.getDids()
            didbotBus.$on('create-did', this.createDid)
            didbotBus.$on('delete-did', this.deleteDid)

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    didbotApp.geo = position.coords.latitude + ',' + position.coords.longitude
                }, function() {
                    didbotApp.lookupGeoByIp();
                })
            } else {
                this.lookupGeoByIp();
            }

        },
        methods: {
            getDids () {
                this.axios.get('dids')
                    .then(response => {
                        this.dids = response.data.data.reverse()
                    })
            },
            createDid: function (text) {
                this.axios.post('dids', {text: text, geo: this.geo})
                    .then(response => {
                        this.getDids()
                    })
            },
            deleteDid (id) {
                this.axios.delete('dids/' + id)
                    .then(response => {
                        this.getDids()
                    })
            },
            lookupGeoByIp () {
                this.axios.get('https://ipinfo.io')
                    .then(response => {
                        this.geo = response.data.loc
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