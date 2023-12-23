<script>
    export default {

    }
</script>

<template>
    <div class="wrapper">
        <header class="header">
            <div class="header-logo">                
                <span>Expense</span> 
                <img src="./assets/logo.png"> 
                <span>Watcher</span>
            </div>
            
            <div class="header-nav">
                <router-link to="/expenses">Расходы</router-link>
                <router-link to="/incomes">Доходы</router-link>
                <router-link to="/statistic">Статистика</router-link>
            </div>
        </header>


        <main class="main">
            <Transition name="view">
                <router-view v-slot="{ Component }">
                    <component :is="Component" :route="$route.path"/>       
                </router-view>
            </Transition>
        </main>
    </div>
</template>

<style lang="scss" scoped>
    .wrapper {
        width: 50%;
        min-height: 800px;
        max-height: 80%;
        margin: auto;
        box-shadow: 0 0 20px #3db39e;
        border-radius: 10px;
        padding: 25px 50px;
    }

    .header {
        width: 100%;        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;
        padding: 25px 25px 50px;

        &-logo {
            display: flex;
            align-items: center;
            gap: 5px;

            & > img {
                width: 50px;
            }

            & > span {
                font-size: 24px;
                font-weight: 700;
            }
        }        

        &-nav {
            grid-area: 2/1/3/3;
            justify-self: center;
            display: flex;
            align-items: center;
            gap: 50px;

            & > * {
                width: 150px;
                padding: 10px 20px;
                border: 2px solid #3db39e;
                border-radius: 10px;
                text-decoration: none;
                text-transform: uppercase;
                font-weight: 700;
                color: #3db39e;
                text-align: center;
                transition: 0.3s;

                &:hover {
                    background-color: #3db39e;
                    color: #ffffff;
                }
            }
        }
    }

    .view-enter-from {
        opacity: 0;
        transform: translateY(-10px);
    }

    .view-enter-active {
        transition: 0.5s;
    }
</style>
