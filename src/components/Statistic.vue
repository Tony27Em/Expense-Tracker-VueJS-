<script>
    import ExpenseChart from './ExpenseChart.vue';
    import IncomesChart from './IncomesChart.vue';

    export default {
        components: { ExpenseChart, IncomesChart }
    }        
</script>

<template>
    <div class="stat">
        <h1 class="stat-header">СТАТИСТИКА</h1>
        <div class="stat-balance">
            <h3 class="stat-balance-header">РАСХОДЫ</h3>
            <ExpenseChart></ExpenseChart>
        </div>
        <div class="stat-balance">
            <h3 class="stat-balance-header">ДОХОДЫ</h3>
            <IncomesChart></IncomesChart>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .stat {
        display: grid;
        grid-template-rows: repeat(2, auto);
        grid-template-columns: repeat(2, 1fr);
        gap: 50px;

        &-header {
            grid-area: 1/1/2/3;
            text-align: center;
            font-weight: 700;
        }

        &-balance {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 25px;
            padding: 25px;
            box-shadow: 0 0 20px #3db39e;
            border-radius: 20px;

            &-header {
                font-weight: 700;
            }
        }
    }
</style>
