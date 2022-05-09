<template>
    <div class="container">
        <todo-create @todo="todo" :searchValue="searchValue" />
        <input type="text" class="search" @input="search" v-model="searchValue" placeholder="search...">
        <todo-container :todos="todos" :saveTodos="saveTodos" @delete="deleteFunc" @edit="edit" />
        <archive :items="archiveItems" @delete="newArch"/>
       
    </div>
</template>

<script>
import todoCreate from './TodoCreate'
import todoContainer from './TodoContainer'
import archive from './Archive'

export default {
    components: {
        todoCreate,
        todoContainer,
        archive,
    },
    data() {
        return {
            searchValue: '',
            todos: [],
            saveTodos: [],
            archiveItems: [],
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

        if (localStorage.getItem('archive')) {
           try {
               this.archiveItems = JSON.parse(localStorage.getItem('archive'));
           } catch(err) {
               localStorage.removeItem('archive');
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
        deleteFunc(todos, archived) {
            this.todos = todos;
            this.archiveItems.push(archived);
            localStorage.setItem('archive', JSON.stringify(this.archiveItems));
            localStorage.setItem('todos', JSON.stringify(this.todos));
            this.searchValue = '';
        },
        edit(todos) {
            this.todos = todos;
            localStorage.setItem('todos', JSON.stringify(this.todos));
            this.searchValue = '';
        },
        newArch(archive) {
            this.archiveItems = archive;
            localStorage.setItem('archive', JSON.stringify(this.archiveItems));
        }
    },
}
</script>

<style>
    *,*:after, *:before {
        background: transparent;
        border-color: #b25bf8;
        border-radius: 50px;
        border: none;
        box-sizing: border-box;
        color: #cc8fff;
        margin: 0;
        outline: none;
        padding: 0;
        scrollbar-color: #b25bf8 black;
        scrollbar-width: 10px;
    }
    ::-webkit-scrollbar {
        width: 15px; 
        height: 15px; 
        background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url('../img/zvezdy_kosmos_temnyj_139528_1920x1080.jpg');
        background-size: 100%;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #b25bf8;
        border-radius: 25px;
        box-shadow: inset -5px 5px 10px black;
    }
    body {
        background-repeat: repeat-y;
        background-size: 100vw 100vh;
        background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url('../img/zvezdy_kosmos_temnyj_139528_1920x1080.jpg');
        min-height: 100vh;
    }
    .container {
        margin: 0 auto;
        width: 1200px;
    }
    button {
        cursor: pointer;
        transition: .3s;
        width: 15%;
        opacity: .7;
    }
    input{
        transition: .5s;
        opacity: .7;
    }
    button:hover, input:hover, .open-archive:hover{
        transform: scale(110%);
        opacity: 1;
    }
    .search {
        border: 2px solid;
        box-sizing: content-box;
        font-size: 2em;
        margin: 20px 0 20px 40px;
        padding: 5px 10px;
        width: 50%;
    }
</style>