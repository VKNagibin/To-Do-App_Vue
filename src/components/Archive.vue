<template>
    <div class="open-archive" @click="openArchive">Archive</div>
    <div class="archive-backing" v-if="isOpen">
        <button class="exit" @click="closeArchive">x</button>
        <div class="archive-content" v-if="items.length > 0">
            <div class="archive-item" v-for="item in items" :key="item.id">
                <div class="flex">
                    <div class="todo">{{item.content}}</div>
                    <button class="delete" @click="deleteFunc(item)">delete permanently</button>
                </div>
                <div class="date-area">
                    <div class="date created">Created:{{item.date}}</div>
                    <div class="date deleted">Deleted:{{item.removeDate}}</div>
                </div>
            </div>
        </div>
        <h3 class="is-empty" v-else>It's Empty...</h3>
    </div>
</template>

<script>
export default {
    props: {
        items: Array,
    },
    emits: ['delete', 'edit'],
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        openArchive() {
            this.isOpen = true;
        },
        closeArchive() {
            this.isOpen = false;
        },
        deleteFunc(todo) {
            let newArch = this.items;
            let index = this.items.findIndex((item) => {
                return item === todo;
            });
            newArch.splice(index, 1);

            this.$emit('delete', newArch);
        }
    }
}
</script>

<style scoped>
    button {
        font-size: 20px;
    }
    .open-archive {
        background: transparent;
        bottom: 3.6vh;
        border: 4px solid #b25bf8;
        box-sizing: content-box;
        cursor: pointer;
        font-size: 2em;
        padding: 45px 10px;
        position: fixed;
        right: 2vw;
        text-align: center;
        transition: .3s;
        opacity: .5;
    }
    .archive-backing {
        background: rgba(0, 0, 0, 0.8);
        border-radius: 0;
        bottom: 0;
        left: 0;
        padding: 20px 50px;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 1000;
    }
    .is-empty {
        position: absolute;
        top: 50%;
        width: 100%;
        text-align: center;
        z-index: 2000;
        font-size: 6em;
        transform: translate(0, -50%);
    }
    .archive-content {
        border: 10px solid #b25bf8;
        background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url('../img/zvezdy_kosmos_temnyj_139528_1920x1080.jpg');
        overflow-y: auto;
        position: absolute;
        top: 20%;
        bottom: 20%;
        right: 10vw;
        left: 10vw;
        padding: 50px;
    }
    .date-area {
        display: flex;
        justify-content: space-evenly;
    }
    .flex {
        display: flex;
        justify-content: space-evenly;
    }
    .todo {
        font-size: 2em;
        overflow: auto;
        width: 60%;
    }
    .delete {
        border: 1px solid rgb(105, 21, 131);
    }
    .archive-item {
        padding: 3px 10px;
        border: 1px solid rgb(105, 21, 131);
        margin-bottom: 5px; 
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .exit {
        border-radius: 50%;
        border: 10px solid rgb(105, 21, 131);
        cursor: pointer;
        font-family: sans-serif;
        font-size: 100px;
        font-weight: bold;
        height: 150px;
        padding: 0 0 10px 0;
        position: absolute;
        right: 20px;
        text-align: center;
        top: 20px;
        width: 150px;
    }
    .exit:hover {
        transform: scale(110%);
    }
</style>