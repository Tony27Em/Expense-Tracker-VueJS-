import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            expenses: [
                {
                    name: 'Такси',
                    amount: 2000,
                    date: '2023-13-07',
                    category: 'Транспорт',
                    comment: 'Яндекс.Такси',
                },
            ],

            incomes: [
                {
                    name: 'Депозит',
                    amount: 5000,
                    date: '2023-13-07',
                    category: 'Процент',
                    comment: 'Ежемесячный процент',
                },
            ],

            expensesCategory: ['Еда', 'Кафе', 'Дом', 'Образование', 'Досуг', 'Здоровье', 'Спорт', 'Другое'],
            incomesCategory: ['Зарплата', 'Подарок', 'Проценты', 'Другое'],

            expensesCategoriesSet: [],
            incomesCategoriesSet: [],

            totalExpenses: {},
            totalIncomes: {},
        }
    },

    mutations: {
        addItem(state, payload) {
            if(payload.type == '/' || payload.type == '/expenses') state.expenses.unshift(payload);
            if(payload.type == '/incomes') state.incomes.unshift(payload);
        },

        addCategory(state, payload) {
            if(payload.type == '/' || payload.type == '/expenses') state.expensesCategory.unshift(payload.newCategory);
            if(payload.type == '/incomes') state.incomesCategory.unshift(payload.newCategory);
        },
    },

    getters: {
        expenses(state) {
            return {
                header: 'РАСХОДЫ',
                list: state.expenses,
                length: state.expenses.length,
                total: state.expenses.reduce((a, b) => a + (b.amount ? b.amount : 0), 0),
                category: state.expensesCategory,
            };
        },        

        incomes(state) {
            return {
                header: 'ДОХОДЫ',
                list: state.incomes,
                length: state.incomes.length,
                total: state.incomes.reduce((a, b) => a + (b.amount ? b.amount : 0), 0),
                category: state.incomesCategory,
            };
        }, 

        expensesCategoriesSet(state) {
            state.expenses.forEach(item => {
                state.expensesCategoriesSet.push(item.category)
            })
            return new Set(state.expensesCategoriesSet)
        },

        incomesCategoriesSet(state) {
            state.incomes.forEach(item => {
                state.incomesCategoriesSet.push(item.category)
            })
            return new Set(state.incomesCategoriesSet)
        },

        totalExpenses(state) {
            state.totalExpenses = {},
            state.expenses.forEach(item => {
                if(state.totalExpenses[item.category]) {
                    state.totalExpenses[item.category] += item.amount;
                } else {
                    state.totalExpenses[item.category] = item.amount;
                }
            })
            return state.totalExpenses;
        },

        totalIncomes(state) {
            state.totalIncomes = {};
            state.incomes.forEach(item => {
                if(state.totalIncomes[item.category]) {
                    state.totalIncomes[item.category] += item.amount;
                } else {                    
                    state.totalIncomes[item.category] = item.amount;
                }
            })
            return state.totalIncomes;
        },
    },
})

export default store;