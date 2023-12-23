<script>
    export default {
        props: ['data'],

        data() {
            return {
                name: null,
                amount: null,
                comment: null,
                date: null,
                category: 'Другое',

                newCategory: null,
            }
        },

        methods: {
            addItem() {
                if(this.name && this.amount && this.date) {                    
                    this.$store.commit('addItem', {
                        type: this.data.route,
                        name: this.name,
                        amount: this.amount,
                        category: this.category,
                        comment: this.comment,
                        date: this.date,
                    });

                    this.name = null;
                    this.amount = null;
                    this.comment = null;
                    this.date = null;
                    this.category = 'Другое';
                }
            },
            
            addCategory() {
                if(this.newCategory) {
                    this.$store.commit('addCategory', {
                        type: this.data.route,
                        newCategory: this.newCategory,
                    })
                }
                this.newCategory = null
            }
        },

    }
</script>

<template>
    <div class="wrapper">
        <div class="modal">
            <h1 class="modal-header">ДОБАВЛЕНИЕ ПОЗИЦИИ</h1>
            <input class="modal-text" type="text" placeholder="Наименование" v-model="name">
            <input class="modal-number" type="number" placeholder="Сумма" v-model="amount">
            <input class="modal-text" type="text" placeholder="Комментарий" v-model="comment">
            <div class="modal-category">
                <select v-model="category">
                    <option v-for="cat in data.balanceType.category" :value="cat">{{ cat }}</option>
                </select>                
                <input type="text" v-model="newCategory" placeholder="Новая категория">
                <button @click="addCategory">СОЗДАТЬ</button>
            </div>
            <input class="modal-date" type="date" v-model="date">
            <div class="modal-btns">
                <button class="modal-btns-add" @click="addItem">ДОБАВИТЬ</button>
                <button class="modal-btns-close" @click="$emit('closeModal')">ЗАКРЫТЬ</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    button {
        width: 150px;
        height: 40px;
        border: 2px solid #000000;
        border-radius: 10px;
        background-color: transparent;
        font-weight: 700;
        color: #000000;
        transition: 0.2s;
        cursor: pointer;

        &:hover {
            background-color: #000000;
            color: #ffffff;
        }
    }
    .wrapper {
        width: 100vw;
        height: 100vh;
        backdrop-filter: blur(10px);
        display: grid;
        place-items: center;
        position: absolute;
        top: 0;
        left: 0;
    }

    .modal {
        width: 600px;
        height: auto;
        padding: 40px 30px;
        border-radius: 20px;
        border: 2px solid #000000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;

        & > * {
            background-color: transparent;
            font-size: 16px;
        }

        &-header {
            font-size: 18px;
            font-weight: 700;
        }

        & input {
            width: 100%;
            height: 40px;
            border: none;
            border-bottom: 2px solid #000000;
            outline: none;
            padding: 5px 20px;
        }

        &-btns {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;            
        }

        &-category {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;  
            align-items: end;
            gap: 30px;  
            
            & > select {
                border: 2px solid #000000;
                border-radius: 10px;
                padding: 10px;    
                
                & > option {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            & > input {
                text-align: center;
            }

            & > button {
                height: 100%;
            }
            
            & > *:not(button) {
                font-size: 16px;
            }
        }
    }    
</style>
