<template>
    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12 form-group">
                    <input type="text" class="form-control" v-model="filters.q" placeholder="Search text...">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 form-group">
                    <v-select v-model="selectedTag" label="text" :options="tags" placeholder="Search tag..."></v-select>
                </div>
                <div class="col-sm-6 form-group">
                    <v-select v-model="selectedTag" label="text" :options="tags" placeholder="Search client..."></v-select>
                </div>
                <div class="col-sm-12">
                    <button class="btn btn-default" v-on:click="clearFilters()">Clear</button>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="form-group">
                <button-group :values="dateTypes" v-on:type-selected="setDateType"></button-group>
            </div>
            <div class="form-group">
                <date-range-picker v-if="dateType" :type="dateType" id="dfdfd" v-on:set-since-until="setSinceUntil"></date-range-picker>
            </div>
        </div>
    </div>
</template>
<script>
    import vSelect from "vue-select"
    import DateRangePicker from "./DateRangePicker.vue"
    import ButtonGroup from "./ButtonGroup.vue"

    module.exports = {
        name: 'did-filter',
        data () {
            return {
                filters: {
                    q: null,
                    tag_id: null,
                    client_id: null,
                    since: null,
                    until: null
                },
                advanced: null,
                selectedTag: null,
                tags: [],
                clients: [],
                dateRange: null,
                dateType: null,
                dateTypes: {
                    'single': 'Single',
                    'before': 'Before',
                    'after': 'After',
                    'range': 'Range'
                }
            }
        },
        mounted: function () {
            this.$didbotBus.$emit('get-tags')
            this.$didbotBus.$on('set-tags', function(tags){
                this.tags = tags
            }.bind(this))

            this.$didbotBus.$on('update-cursor', this.updateCursor)

            // these filters can be set by other components in the app
            this.$didbotBus.$on('get-dids-by-tag', function(tag_id){

                // loop over the tag array
                for (let tag of this.tags) {
                    // and if there's a match push it onto the selected tags array
                    if(tag.id == tag_id) this.selectedTag = tag
                }
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
            'filters.since': function () {
                this.$didbotBus.$emit('get-dids', this.filters)
            },
            'filters.until': function () {
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
            setSinceUntil: function(picker){
                this.filters.since = picker.since
                this.filters.until = picker.until
            },
            updateCursor: function(cursor){
                this.$didbotBus.$emit('get-more-dids', {
                    q: this.filters.q,
                    tag_id: this.filters.tag_id,
                    client_id: this.filters.client_id,
                    since: this.filters.since,
                    until: this.filters.until,
                    cursor: cursor
                })
            },
            setDateType: function (type) {
                this.dateType = type
            },
            clearFilters: function ()
            {
                this.filters.tag_id = null
                this.filters.client_id = null
                this.filters.since = null
                this.filters.until = null
                this.filters.cursor = null
                this.dateType = null
                this.selectedTag = null
            }
        },
        components: {
            vSelect,
            DateRangePicker,
            ButtonGroup
        }
    }
</script>