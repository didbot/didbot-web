<template>
    <div class="row">
        <div class="col-sm-6 form-group">
            <label>Search Dids</label>
            <input type="text" class="form-control" v-model="filters.q" placeholder="search...">
        </div>
        <div class="col-sm-6 form-group">
            <label>Search Tags</label>
            <v-select taggable v-on:option:created="newOption" v-model="selectedTag" label="text" :options="tags"></v-select>
        </div>
    </div>

    </div>
</template>
<script>
    import vSelect from "vue-select"

    module.exports = {
        name: 'did-filter',
        data () {
            return {
                filters: {
                    q: null,
                    tag_id: null,
                    client_id: null
                },
                selectedTag: null,
                tags: [],
                clients: []
            }
        },
        mounted: function () {
            this.$didbotBus.$emit('get-tags')
            this.$didbotBus.$on('set-tags', function(tags){
                this.tags = tags
            }.bind(this))

            this.$didbotBus.$on('update-cursor', function(cursor){

                this.$didbotBus.$emit('get-more-dids', {
                    q: this.filters.q,
                    tag_id: this.filters.tag_id,
                    client_id: this.filters.client_id,
                    cursor: cursor
                })

            }.bind(this))

        },
        watch: {
            // update the dids list any time params change
            'filters.q': function () {
                this.$didbotBus.$emit('get-dids', this.filters)
            },
            'filters.tag_id': function () {
                this.$didbotBus.$emit('get-dids', this.filters)
            },
            selectedTag: function() {
                if(this.selectedTag == null){
                    this.filters.tag_id = null
                    return
                }

                this.filters.tag_id = this.selectedTag['id'] ? this.selectedTag.id : null
            }
        },
        methods: {
            getOptionValue: function(selected) {
                return selected && selected['id'] ? selected.id : null
            },
            newOption: function(value) {
                console.log(value)
            }
        },
        components: {
            vSelect
        }
    }
</script>