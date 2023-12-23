<script>
    import { Bar } from 'vue-chartjs';
    import { mapGetters } from 'vuex';

    export default {
        extends: Bar,
        
        computed: {
            ...mapGetters(['totalIncomes']),                                  
        },

        mounted () {
            this.renderChart({
                labels: Object.keys(this.totalIncomes),
                datasets: [{
                    label: 'ДОХОДЫ',
                    data: Object.values(this.totalIncomes),
                    borderWidth: 2,
                    backgroundColor: '#3db39e',
                }],
            }, {
                legend: { display: false },
                tooltips: {
                    callbacks: {
                        title: function() {
                            return '';
                        },
                        label: function(tooltipItem) {                                               
                            return tooltipItem.value + ' тг';
                        }
                    }
                }
            })            
        }, 
    }
        
</script>

<template>
    <canvas ref="canvas" class="canvas"></canvas>
</template>

<style lang="scss" scoped>
    .canvas {
        width: 100%;
    }
</style>
