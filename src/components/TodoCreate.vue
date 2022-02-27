<template>
    <fieldset>
        <legend>To Do App</legend>
        <h1>What To Do?</h1>
        <form>
            <input type="text" placeholder="to do something" v-model="value" :disabled="searchValue !== ''">
            <button @click.prevent="btnHandler" :disabled="searchValue !== ''" >Create</button>
            
        </form>
    </fieldset>
</template>

<script>
import {dateStyler} from '../helper.js';

export default {
    props: {
        searchValue: String,
    },
    data() {
        return {
            value: '',
        }
    },
    methods: {
        btnHandler() {
            if (this.value.trim() === '') {
                return;
            }
            let date = new Date();
            this.$emit("todo", 
                { id: Date.now(), 
                  content: this.value.trim(),
                  date: dateStyler(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `+
                        `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)});
            this.value = '';
        },
    },
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

    fieldset {
          border: 10px solid;
          width: 100%;
         }
    legend {
          font-family: 'Satisfy', cursive;
          font-size: 3em;
          margin-left: 50px;
          padding: 0 10px 20px 10px;
         }
    h1 {
           font-size: 4em;
           margin: 0 auto;
           text-align: center;
           width: 90%;
          }
    form {
          display: flex;
          margin: 50px auto 50px auto;
          width: 90%;
         }
    input {
          border: 2px solid;
          font-size: 2em;
          margin-left: 7%;
          padding: 1em;
          width: 65%;
         }
    button {
          border: 2px solid;
          font-size: 2em;
          margin-left: 6%;
         }
</style>