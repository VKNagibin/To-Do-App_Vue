<template>
    <div class="container">
        <todo-create @todo="todo" :searchValue="searchValue" />
        <input type="text" class="search" @input="search" v-model="searchValue" placeholder="search...">
        <todo-container :todos="todos" :saveTodos="saveTodos" @delete="deleteFunc" @edit="edit"/>
        <!-- <archive/>   -->
    </div>
</template>

<script>
import todoCreate from './TodoCreate'
import todoContainer from './TodoContainer'
// import archive from './Archive'

export default {
    components: {
        todoCreate,
        todoContainer,
        // archive,
    },
    data() {
        return {
            searchValue: '',
            todos: [],
            saveTodos: [],
            count: 0,
            // archiveItems: [],
            exit: false,
        }
    },
    mounted() {
        if (localStorage.getItem('todos')) {
           try {
               this.todos = JSON.parse(localStorage.getItem('todos'));
           } catch(err) {
               localStorage.removeItem('todos');
           }
        }
        this.saveTodos = this.todos;
    },
    methods: {
        search(e) {
            let str = e.target.value.toLowerCase();

            if (str === '') {
                this.todos = this.saveTodos;
                return;
            }

            this.todos = this.saveTodos.filter(item => {
                let itemContent = item.content.toLowerCase();
                if( itemContent.indexOf(str) + 1) {
                    return true
                } else if (item.date.indexOf(str) + 1) {
                    return true
                }
            }); 
        },
        todo(value) {
            this.todos.unshift(value);
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deleteFunc(todos) {
            this.todos = todos;
            // this.archiveItems.push(archived);
            localStorage.setItem('todos', JSON.stringify(this.todos));
            this.searchValue = '';
        },
        edit(todos) {
            this.todos = todos;
            localStorage.setItem('todos', JSON.stringify(this.todos));
            this.searchValue = '';
        },
    },
}
</script>

<style>
    *,*:after, *:before{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        outline: none;
        border: none;
        background: transparent;
        color: #cc8fff;
        border-color: #b25bf8;
        border-radius: 50px;
    }
    body {
        min-height: 100vh;
        background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url('../img/zvezdy_kosmos_temnyj_139528_1920x1080.jpg'); 
        background-size: 100vw 100vh;
        background-repeat: repeat-y;
    }
    .container {
        width: 1200px;
        margin: 0 auto;
    }
    button {
        cursor: pointer;
        width: 15%;
        transition: .3s;
    }
    input, .archive, .exit {
        transition: .5s;
    }
    button:hover, input:hover,  .archive:hover{
        transform: scale(110%);
    }
    .search {
        box-sizing: content-box;
        width: 50%;
        font-size: 2em;
        padding: 5px 10px;
        border: 4px solid;
        margin: 20px 0 20px 40px;
    }
    /* .archive {
        box-sizing: content-box;
        width: 100px;
        padding: 45px 10px;
        font-size: 2em;
        background: blue;
        position: fixed;
        bottom: 10px;
        right: 10px;
        border-radius: 0;
        cursor: pointer;
        text-align: center;
    }
    .archiveWrapper {
        display: none;
        position: fixed;
        padding: 20px 50px;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        z-index: 10;
        background: rgba(0, 0, 0, 0.5);
        border: 10px solid rgb(105, 21, 131);
    }
    .exit {
        cursor: pointer;
        box-sizing: content-box;
        font-family: sans-serif;
        border: 10px solid rgb(105, 21, 131);
        text-align: center;
        width: 150px;
        padding: 20px 0;
        font-size: 5em;
        position: absolute;
        top: -10px;
        right: -10px;
    }
    .exit:hover {
        font-size: 6em;
    } */
    
</style>