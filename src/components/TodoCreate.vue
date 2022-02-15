<template>
    <fieldset>
        <legend>To Do App</legend>
        <h1>What To Do?</h1>
        <form>
            <input type="text" placeholder="to do something" v-model="value">
            <button @click="btnHandler">Create</button>
            
        </form>
    </fieldset>
</template>

<script>

export default {
    data() {
        return {
            value: '',
        }
    },
    methods: {
        btnHandler(e) {
            let date = new Date();
            e.preventDefault();
            this.$emit("todo", 
                { id: Date.now(), 
                  content: this.value,
                  date: `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()} `+
                        `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`});
            this.value = '';
           
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

    fieldset {
        margin-bottom: 40px;
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