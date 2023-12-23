<script>
    import Modal from './Modal.vue';
    import { mapGetters } from 'vuex';

    export default {
        components: { Modal },
        props: ['route'],

        data() {
            return {
                showModal: false,
                showAll: true,
                list: null,
                categoriesSet: [],
                totalInCategory: 0,
            }
        },

        computed: {
            ...mapGetters(['expenses', 'incomes', 'expensesCategoriesSet', 'incomesCategoriesSet']),
            balanceType() {
                if(this.route == '/' || this.route == '/expenses') {
                    this.categoriesSet = this.expensesCategoriesSet;
                    return this.expenses;
                }
                
                if(this.route == '/incomes') {
                    this.categoriesSet = this.incomesCategoriesSet;                    
                    return this.incomes;
                }
            },       
        },        

        methods: {
            toggleModal() {
                this.showModal = !this.showModal;
            },

            sortCategory(e) {
                this.showAll = false; 
                this.list = this.balanceType.list.filter(item => item.category == e.target.textContent);
                this.totalInCategory = this.list.reduce((a, b) => a + b.amount, 0)
            },

            showAllItems() {
                this.showAll = true;
            },
        },
    }       
</script>

<template>
    <div class="item">
        <h1 class="item-header">{{ balanceType.header }}</h1>
        <div class="item-info">
            <h3 class="item-info-total">ИТОГОВАЯ СУММА: {{ showAll ? balanceType.total : totalInCategory }} тг</h3>
            <button class="item-info-add" @click="toggleModal">СОЗДАТЬ ЗАПИСЬ</button>
            <div class="item-info-sort">
                <h3 class="item-info-sort-header">СОРТИРОВАТЬ ПО КАТЕГОРИЯМ:</h3>
                <div class="item-info-sort-btns">
                    <button @click="showAllItems">ВСЕ</button>
                    <button @click="sortCategory" v-for="category in categoriesSet">{{ category }}</button>
                </div>
            </div>
        </div>
        <div class="item-list">
            <ol class="item-list-items" v-if="balanceType.length">
                <li v-for="item in (showAll ? balanceType.list : list)">
                    <p>{{ item.category }}</p>
                    <p>{{ item.date }}</p>
                    <p>{{ item.name }}</p>
                    <p>{{ item.amount }} тг</p>
                    <p>{{ item.comment }}</p>
                </li>
            </ol>
            <p v-else-if="!balanceType.length">Пока ничего нет</p>
        </div>        

        <Transition name="modal">
            <Modal v-if="showModal" @closeModal="toggleModal" :data="{ route, balanceType }"></Modal>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
    button {
        width: 150px;
        height: 40px;
        border: 2px solid #3db39e;
        border-radius: 10px;
        background-color: transparent;
        font-weight: 700;
        color: #3db39e;
        transition: 0.2s;
        cursor: pointer;

        &:hover {
            background-color: #3db39e;
            color: #ffffff;
        }
    }

    h3 {
        text-align: center;
    }
    .item {
        display: grid;
        grid-template-rows: repeat(2, auto);
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        gap: 50px;

        &-header {
            grid-area: 1/1/2/3;
            text-align: center;
            font-weight: 700;
        }
        
        &-info {
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 25px;

            &-total {
                text-align: center;
            }

            &-sort {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 25px;

                &-btns {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                }
            }
        }

        &-list {
            width: 100%;
            height: 400px;
            overflow: auto;
            padding: 10px 0;

            &::-webkit-scrollbar {
                width: 10px;
                background-color: transparent;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #3db39e;
                border-radius: 10px;
            }

            &-items {
                width: 60%;
                margin: auto;
                padding: 0;
                list-style-type: none;

                & > li {
                    padding: 15px 25px;
                    display: grid;
                    grid-template-rows: repeat(3, auto);
                    grid-template-columns: repeat(2, 1fr);
                    gap: 5px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px #3db39e;

                    & > p:first-child {
                        font-weight: 700;
                    }

                    & > p:nth-child(4) {
                        text-decoration: underline;
                    }

                    & > p:last-child {
                        grid-area: 3/1/4/3;
                        text-align: center;
                    }

                    & > p:nth-child(even) {
                        justify-self: end;
                    }
                }
            }
        }
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: translateY(20px);
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: 0.3s;
    }
</style>
