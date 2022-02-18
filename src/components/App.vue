<template>
    <div class="container">
        <todo-create @todo="todo"/>
        <input type="text" class="search" @input="search" placeholder="search...">
        <todo-container :todos="todos" @delete="deleteFunc" @edit="edit"/>
    </div>
</template>

<script>
import todoCreate from './TodoCreate';
import todoContainer from './TodoContainer'

export default {
    components: {
        todoCreate,
        todoContainer,
    },
    data() {
        return {
            todos: [],
            saveTodos: [],
            count: 0,
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
    },
    methods: {
        search(e) {
            let str = e.target.value;

            if (!this.count++) {
                this.saveTodos = JSON.stringify(this.todos);
            }
            if (str === '') {
                this.todos = JSON.parse(this.saveTodos);
                this.count = 0;
                return;
            }

            this.todos =JSON.parse(this.saveTodos).filter(item => {
                if( item.content.substring(0, str.length) === str) {
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
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        edit(todos) {
            this.todos = todos;
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }
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
        background: linear-gradient(90deg, rgba(0,0,0,0.1017449216014531) 0%, rgba(0,0,0,0.1) 100%), url('../img/gotham_17_11673_oboi_zvezdnoe_nebo_1920x1080.jpg'); 
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
    input {
        transition: .5s;
    }
    button:hover, input:hover {
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
    
</style>