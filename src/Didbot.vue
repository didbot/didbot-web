<style src="./assets/scss/did.sass" lang="sass"></style>
<template>
    <div>
        <ajax></ajax>
        <did-create></did-create>
        <did-filter></did-filter>
        <did-list></did-list>
    </div>
</template>
<script>
    import Ajax from './components/Ajax.vue'
    import DidList from './components/DidList.vue'
    import DidCreate from './components/DidCreate.vue'
    import DidFilter from './components/DidFilter.vue'

    Vue.prototype.$didbotBus = new Vue()
    Vue.prototype.$http = axios.create({
        baseURL: (window.didbot) ? window.didbot.baseUrl : 'https://didbot.com/api/1.0/',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': (window.didbot) ? window.didbot.apiToken : '',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    export default {
        name: 'didbot',
        data () {
            return {
                geo: null,
            }
        },
        mounted: function () {
            var didbotApp = this

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    didbotApp.geo = position.coords.latitude + ',' + position.coords.longitude
                }, function() {
                    didbotApp.$didbotBus.$emit('lookup-geo');

                })
            } else {
                didbotApp.$didbotBus.$emit('lookup-geo');
            }

            this.$didbotBus.$on('set-geo', function(geo){
                this.geo = geo
            }.bind(this))

        },
        methods: {
            //
        },
        components: {
            Ajax,
            DidList,
            DidCreate,
            DidFilter
        }
    }
</script>