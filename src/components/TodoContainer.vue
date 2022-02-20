<template>
    <div class="todo-wrapper" v-for="todo in todos" :key="todo.id">
        <p class="date">Created: {{todo.date}}</p>
        <div class="flex">
            <p class="content">{{todo.content}}</p>
            <button class="delete" @click="deleteBtn(todo)">Delete</button>
            <button class="edit" @click="editBtn(todo)">Edit</button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        todos: Array,
        saveTodos: Array,
    },
    emits: ['delete', 'edit'],
    methods: {
        deleteBtn(todo) {
            let newList = this.saveTodos;
            let index = this.saveTodos.findIndex((el) => {
                return el === todo;
            });
            newList.splice(index, 1);

            this.$emit('delete', newList);
        },
        editBtn(todo) {
            let newList = this.saveTodos;
            let newContent = prompt('Enter edited task: ', todo.content);
            todo.content = newContent === null ? todo.content : newContent;
            this.$emit('edit', newList);
        }
    },
}
</script>

<style scoped>

    .todo-wrapper {
        margin-bottom: 20px;
        width: 100%;
        padding: 20px 40px;
        border: 4px solid;
        
    }
    .date {
        padding: 0 10px;
        border: 1px solid;
        font-size: 1.5em;
        width: max-content;
        
    }
    .flex {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .content {
        width: 65%;
    }
    button {
        border: 4px solid;
        box-sizing: content-box;
        width: 10%;
        padding: 10px 20px;
        text-align: center;
    }
    .content, button {
        font-size: 2em;
    }
</style>