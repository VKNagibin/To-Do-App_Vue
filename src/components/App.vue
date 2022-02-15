<template>
    <div class="container">
        <todo-create @todo="todo"/>
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
        }
    },
    mounted() {
        if (localStorage.getItem('todos')) {
           try {
               this.todos = JSON.parse(localStorage.getItem('todos'));
           } catch(err) {
               localStorage.removeItem('todos');
           }
           console.log(this.todos);
        }
    },
    methods: {
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
        background-size: 100% 100%;
        background-repeat: no-repeat;
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
    
</style>