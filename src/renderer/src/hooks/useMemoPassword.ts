import { ref, Ref } from 'vue'

interface IMemoPassword{
    memoVal:Ref<boolean>
    onMemoPassword:(Value:boolean)=>void
}

function useMemoPassword ():IMemoPassword{
    let memoVal:Ref<boolean> = ref(localStorage.getItem('memoPassword') == 'true')

    const onMemoPassword = ( value : boolean)=> {
       localStorage.setItem('memoPassword',String(memoVal.value = value))
    }
    return {
        memoVal,
        onMemoPassword
    }
}

export default useMemoPassword