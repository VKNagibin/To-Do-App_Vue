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
                  date: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `+
                        `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`});
            this.value = '';
        },
        search() {
            if (this.searchValue) {
                return false
            }
        }
    }
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
        padding: 0 10px 20px 10px;
        font-size: 3em;
        margin-left: 50px;
    }
    h1 { 
        width: 90%;
        font-size: 4em;
        margin: 0 auto;
        text-align: center;
    }
    form {
        width: 90%;
        margin: 50px auto 50px auto;
        display: flex;
    }
    input {
        border: 2px solid;
        width: 65%;
        margin-left: 7%;
        padding: 1em;
        font-size: 2em;
    }
    button {
        border: 2px solid;
        font-size: 2em;
        margin-left: 6%;
    }
</style>