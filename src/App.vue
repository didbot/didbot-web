<template>
    <div>
        <did-create></did-create>
        <did-list :dids="dids"></did-list>
    </div>
</template>

<script>
    import Vue from 'vue'

    import axios from 'axios'

    Vue.prototype.$didbotBus = new Vue()

    import DidCreate from './components/DidCreate.vue'
    import DidList from './components/DidList.vue'

    export default {
        name: 'app',
        data () {
            return {
                dids: [],
                geo: null,
                axios: null
            }
        },
        mounted: function () {

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
            }
        },
        components: {
            DidList,
            DidCreate
        }
    }
</script>
<style src="./assets/scss/did.sass" lang="sass"></style>