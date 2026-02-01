<script setup lang="ts">
import { ref,onBeforeMount } from 'vue'

onBeforeMount(()=>{
    // const dark = ref<string | null>(localStorage.getItem('dark'))

    // const element = document.querySelector('html') as HTMLElement | null
    // if(element){
    //     if(dark.value === 'dark'){
    //         element.className = ''
    //     }else{
    //         element.className = 'dark'
    //     }
    // }
    
})

</script>

<template>
    <router-view />
</template>

<style scoped>
    *{
        margin: 0;
        padding: 0; 
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: #409EFF;
    }
</style>