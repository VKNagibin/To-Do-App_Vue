<template>
    <div class="todo-wrapper" v-for="todo in todos" :key="todo.id">
        <p class="date">Created: {{todo.date}}</p>
        <div class="flex">
            <p class="content">{{todo.content}}</p>
            <button class="delete" @click="deleteBtn(todo)">Delete</button>
            <button class="edit" @click="editBtn(todo)">Edit</button>
            <!-- <button class="done" @click="doneBtn">Done</button> -->
        </div>
    </div>
</template>

<script>
import {dateStyler} from '../helper.js'
export default {
    props: {
        todos: Array,
        saveTodos: Array,
    },
    emits: ['delete', 'edit'],
    methods: {
        deleteBtn(todo) {
            let date = new Date();
            let newList = this.saveTodos;
            let index = this.saveTodos.findIndex((item) => {
                return item === todo;
            });

            let archived = newList.splice(index, 1);
            archived[0].removeDate = dateStyler(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `+
                                                   `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`);

            this.$emit('delete', newList, archived[0]);
        },
        editBtn(todo) {
            let newList = this.saveTodos;
            let newContent = prompt('Enter edited task: ', todo.content);
            todo.content = newContent === null || newContent === '' ? todo.content : newContent;
            this.$emit('edit', newList);
        }
    },
}
</script>

<style scoped>

    .todo-wrapper {
          border: 4px solid;
          margin-bottom: 20px;
          padding: 20px 40px;
          width: 100%;
         }
    .date {
          border: 1px solid;
          font-size: 1.5em;
          padding: 0 10px;
          width: max-content;
         }
    .flex {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
         }
    .content {
          overflow: auto;
          width: 65%;
         }
    button {
          border: 4px solid;
          box-sizing: content-box;
          padding: 10px 20px;
          text-align: center;
          width: 10%;
         }
    .content, button {
          font-size: 2em;
         }
    h2 {
        margin: 50px 0;
    }
</style>