<style src="../../node_modules/bootstrap-daterangepicker/daterangepicker.scss" lang="scss"></style>
<template>
        <input type="text" :id="id" :name="id" class="form-control">
</template>

<script>
    import daterangepicker from "bootstrap-daterangepicker"

    module.exports = {
        name: 'date-range-picker',
        props:['id','type'],
        mounted: function () {
            this.loadDateRangePicker(this.type)
        },
        watch: {
            type: function () {
                    this.loadDateRangePicker(this.type)
            }
        },
        methods: {
            loadDateRangePicker: function (type) {

                var config = (type == 'range') ? this.getRangeConfig() : this.getSingleConfig()

                var drp = $('input[name="'+ this.id +'"]')
                    .daterangepicker(config)
                    .on('apply.daterangepicker', function(ev, picker) {

                    var since = null
                    var until = null
                    switch(type) {
                        case 'single':
                            since = picker.startDate.toISOString()
                            until = picker.endDate.toISOString()
                            break;
                        case 'before':
                            until = picker.endDate.toISOString()
                            break;
                        case 'after':
                            since = picker.startDate.toISOString()
                            break;
                        case 'range':
                            since = picker.startDate.toISOString()
                            until = picker.endDate.toISOString()
                            break;
                    }

                    this.$emit('set-since-until', {since:since, until:until})

                }.bind(this)).data('daterangepicker').show()
            },
            getRangeConfig(){
                var now = moment()

                return {
                    autoApply: true,
                    ranges: {
                        "Today": [
                            now.clone().startOf('day'),
                            now.clone().endOf('day')
                        ],
                        "Yesterday": [
                            now.clone().subtract(1, 'days').startOf('day'),
                            now.clone().subtract(1, 'days').endOf('day')
                        ],
                        "Last 7 Days": [
                            now.clone().subtract(7, 'days').startOf('day'),
                            now.clone().endOf('day')
                        ],
                        "Last 30 Days": [
                            now.clone().subtract(30, 'days').startOf('day'),
                            now.clone().endOf('day')
                        ],
                    }
                }

            },
            getSingleConfig(){
                return {
                    autoApply: true,
                    singleDatePicker: true
                }
            }
        }
    }
</script>