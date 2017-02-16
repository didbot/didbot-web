<template>
    <div>
        <div class="row primary" @click="showDetails($event)">
            <div class="col-sm-10 did-text">{{did.text}}</div>
            <div class="col-sm-2 text-right secondary did-created-at">
                <template v-if="!details">{{did.created_at}} ago</template>
            </div>
        </div>
        <div v-if="details" class="secondary">
            <div class="row">
                <div class="col-sm-2"><i class="fa fa-desktop" aria-hidden="true"></i> <a href="#" @click="getDidsByTag($event, client.id)">{{client.name}}</a></div>
                <div class="col-sm-3"><i class="fa fa-map-marker" aria-hidden="true"></i> <a href="#">Los
                    Angeles</a></div>
                <div class="col-sm-3">
                    <i class="fa fa-tags" aria-hidden="true"></i>
                    <a v-for="tag in tags" href="#" @click="getDidsByTag($event, tag.id)">{{tag.text}}</a>
                </div>
                <div class="col-sm-4 text-right">
                    {{did.updated_at}}
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 text-right"><a href="#" @click="deleteDid($event)">delete</a></div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        name: 'did',
        props: ['did'],
        data () {
            return {
                details: false,
                client: false,
                tags: []
            }
        },
        mounted: function () {
            this.client = (this.did.client.data) ? this.did.client.data : ''
            this.tags = (this.did.tags.data) ? this.did.tags.data : []
        },
        methods: {
            deleteDid (e) {
                e.preventDefault()
                this.$didbotBus.$emit('delete-did', this.did.id)
            },
            showDetails (e) {
                e.preventDefault()
                this.details = !this.details
            },
            getDidsByTag (e, tagId) {
                e.preventDefault()
                this.$didbotBus.$emit('get-dids-by-tag', tagId)
            },
            getDidsByClient (e, clientId) {
                e.preventDefault()
                this.$didbotBus.$emit('get-dids-by-client', clientId)
            }
        }
    }
</script>