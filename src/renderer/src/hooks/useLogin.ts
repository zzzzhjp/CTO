import router from '@router/index'
import { useUserStore } from '@store/useUerStore'
import { useMenuStore } from '@store/useMenuStore'
import { ElMessage } from 'element-plus'
import { ILoginRequest } from "@interface/login";

const useLogin = async ( res: ILoginRequest ) => {
    if (res.code != '200') {
        return ElMessage.error(res.msg)
    }

    const token = res.data
    localStorage.setItem('TOKEN', token || '')

    await useUserStore().getUserInfo()

    await useMenuStore().getMenu()

    router.push('/')

    return
}

export default useLogin