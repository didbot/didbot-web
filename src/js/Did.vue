<template>
    <div>
        <div class="row primary" @click="showDetails($event)">
            <div class="col-sm-10">{{did.text}}</div>
            <div class="col-sm-2 text-right secondary">
                <template v-if="!details">{{did.created_at}} ago</template>
            </div>
        </div>
        <div v-if="details" class="secondary">
            <div class="row">
                <div class="col-sm-2"><i class="fa fa-desktop" aria-hidden="true"></i> <a href="#">Web</a></div>
                <div class="col-sm-3"><i class="fa fa-map-marker" aria-hidden="true"></i> <a href="#">Los
                    Angeles</a></div>
                <div class="col-sm-3">
                    <i class="fa fa-tags" aria-hidden="true"></i>
                    <a href="#">tag1</a>
                    <a href="#">tag2</a>
                    <a href="#">tag3</a>
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
        props: ['did'],
        data() {
            return {
                details: false
            }
        },
        methods: {
            deleteDid(e){
                e.preventDefault()
                this.$didbotBus.$emit('delete-did', this.did.id)
            },
            showDetails(e){
                e.preventDefault()
                this.details = !this.details
            }
        },
    }
</script>