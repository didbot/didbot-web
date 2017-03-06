<style src="./assets/scss/did.sass" lang="sass"></style>
<template>
    <div id="didbot">
        <ajax></ajax>
        <error></error>
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tab1default" data-toggle="tab" @click="toggle='create'"><i class="fa fa-plus" aria-hidden="true"></i></a></li>
            <li><a href="#tab2default" data-toggle="tab" @click="toggle='search'"><i class="fa fa-search" aria-hidden="true"></i></a></li>
        </ul>
        <div class="panel panel-default">
            <div class="panel-body">
                <did-create v-show="toggle == 'create'"></did-create>
                <did-filter v-show="toggle == 'search'"></did-filter>
            </div>
            <did-list></did-list>
        </div>
    </div>
</template>
<script>
    import Ajax from './components/Ajax.vue'
    import Error from './components/Error.vue'
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
                toggle: 'create'
            }
        },
        mounted: function () {
            this.$didbotBus.$on('set-toggle', function(toggle){
                if(this.toggle != toggle) this.toggle = toggle
            }.bind(this))

        },
        methods: {
            //
        },
        components: {
            Ajax,
            Error,
            DidList,
            DidCreate,
            DidFilter
        }
    }
</script>