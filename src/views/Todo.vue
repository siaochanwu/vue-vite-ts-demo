<template>
    <div class="container md:mx-lg sm:mx-sm m-auto text-center w-6/12 mt-5 border-double border-8 border-blue-500 p-5">
        <h1 class="text-3xl color-red-500 ">Task1: my todo</h1>
        <div class="flex justify-center">
            <input type="text" class="border-2 p-2" placeholder="add new todo" v-model="newTodo">
            <button class="bg-blue-100 hover:bg-blue-700 hover:text-white p-3" @click="addTodo">add</button>
        </div>
        <div class="w-6/12 m-auto text-left mt-3">
            <ul v-for="item in filterTodo" :key="item.id" class="my-2">
                <li class="flex justify-between items-center">
                    <input type="checkbox" name="" id="" @click="item.completed = !item.completed">
                    <span class="mx-3">{{item.name}}</span>
                    <button class="bg-red-500 rounded p-2 text-white" @click="deleteTodo(item.id)">delete</button>
                    <button class="bg-green-500 rounded p-2 text-white" @click="edit(item.id)">edit</button>
                </li>
                <div class="hidden " :id="item.id">
                    <input class="border-solid border-2 border-black w-7/12" type="text" v-model="editTodo">
                    <button class="bg-gray-300 p-1 mx-1" @click="cancelEdit(item.id)">cancel</button>
                    <button class="bg-gray-300 p-1" @click="doneEdit(item.id)">ok</button>
                </div>
            </ul>
            <div class="mt-5 text-center">
                <span class="bg-purple-300 p-2" @click="filter = 'done'">completed</span>
                <span class="bg-yellow-300 p-2" @click="filter = 'yet'">not yet</span>
                <span class="bg-blue-300 p-2" @click="filter = 'all'">all</span>
            </div>
        </div>
        
    </div>
</template>


<script lang="ts">
import { ref,onMounted, computed } from 'vue'

export default({
    setup() {
        const todo = ref([
            {
            name: 'gym',
            id: 1,
            completed: false
            }
        ])
        const newTodo = ref('')
        const editTodo = ref('')
        const filter = ref('all')

        function addTodo(){
            if (newTodo.value == '') {
                alert('It can not be empty!!')
                console.log('not empty')
            } else {
                todo.value.push(
                    {
                        name: newTodo.value,
                        id: Date.now(),
                        completed: false
                    }
                )
                localStorage.setItem('todolist', JSON.stringify(todo))
                newTodo.value = ''
            }
        }

        function deleteTodo(id:number) {
            const check = confirm(`are you sure you want to delete?`)
            if (check) {
                const index = todo.value.findIndex(item => item.id === id)
                todo.value.splice(index, 1)
            } else {
                console.log('nothing')
            }
        }

        function edit(id:number) {
            const edit = document.getElementById(`${id}`)
            edit!.className = 'block flex-auto my-2'
        }

        function cancelEdit(id:number) {
            const edit = document.getElementById(`${id}`)
            edit!.className = 'hidden'
            editTodo.value = ''
        }
        
        function doneEdit(id:number) {
            if (editTodo.value !== '') {
                todo.value.filter(item => {
                    if(item.id === id) {
                        item.name = editTodo.value
                    }
                })
            }
            const edit = document.getElementById(`${id}`)
            edit!.className = 'hidden'
            editTodo.value = ''
        }


        const filterTodo =  computed(() => {
            console.log(filter.value)
            if (filter.value == 'all') {
                return todo.value
            } else if (filter.value == 'yet') {
                return todo.value.filter(item => !item.completed)
            } else {
                return todo.value.filter(item => item.completed)
            }
        })


        return {
            todo,
            newTodo,
            editTodo,
            filterTodo,
            filter,
            addTodo,
            deleteTodo,
            edit,
            cancelEdit,
            doneEdit,
        }
    },
})
</script>
