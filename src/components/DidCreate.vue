<template>
    <div>
        <div class="row">
            <div class="col-sm-12">
                <textarea @keydown.enter="createDid($event)" class="form-control" v-model="text" rows="2"
                          cols="60"></textarea>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-sm-6 col-sm-push-3 col-sm-offset-3">
                <v-select taggable  placeholder="add tags..." multiple v-on:option:created="createTag" v-model="selectedTags" label="text" :options="tags"></v-select>
                <br>
            </div>
            <div class="col-sm-3 col-sm-pull-9">
                <button @click="createDid($event)" class="btn btn-new">Did it!</button>
            </div>
        </div>
    </div>
</template>
<script>
    import vSelect from "vue-select"

    module.exports = {
        name: 'did-create',
        data () {
            return {
                text: null,
                selectedTags: [],
                tags: []
            }
        },
        mounted: function () {
            this.$didbotBus.$on('set-tags', function (tags) {
                this.tags = tags
            }.bind(this))
        },
        computed: {
            tagIds: function () {
                var tagIds = []
                for (let selectedTag of this.selectedTags) {

                    // if this is a new tag it won't have an id so match up the id from the tags array
                    if(selectedTag.id == undefined){
                        for (let tag of this.tags) {
                            if(tag.text == selectedTag.text){
                                selectedTag.id = tag.id
                            }
                        }
                    }

                    // double check that a tag has been set, and if so add to the tags array
                    if(selectedTag.id){
                        tagIds.push(selectedTag.id)
                    }

                }
                return tagIds
            }
        },
        methods: {
            createDid: function (e) {
                e.preventDefault()
                if(!this.text) return

                var body = {
                    text: this.text,
                    tags: this.tagIds
                }
                this.$didbotBus.$emit('create-did', body)
                this.text = null
                this.selectedTags = []
            },
            createTag: function(tag) {
                this.$didbotBus.$emit('create-tag', tag)
            }
        },
        components: {
            vSelect
        }
    }
</script>