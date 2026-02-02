import { ref , inject ,provide, App} from 'vue'
import { queryBatch } from '@api/dicts'
import { IDictsData } from '@interface/dicts'

const DICTS_KEY = Symbol('dicts')

// 定义字典上下文类型
import type { Ref } from 'vue'

interface DictsContext {
  dicts: Ref<Partial<IDictsData>>
  getDicts: (data: string[]) => Promise<void>
}

export default function useDicts(app?: App) {
  const dicts = ref<Partial<IDictsData>>({})

  async function getDicts(data: string[]) {
    const res = await queryBatch(data)
    dicts.value = res.data
  }

  // 创建字典上下文
  const dictsContext: DictsContext = {
    dicts,
    getDicts
  }

  // 如果传入了app实例，则提供全局注入
  if (app) {
    app.provide(DICTS_KEY, dictsContext)
  } else {
    // 直接在当前上下文中提供
    provide(DICTS_KEY, dictsContext)
  }

  return {
    dicts,
    getDicts
  }
}

// 提供一个辅助函数用于在组件中注入字典服务
export function useDictsService(): DictsContext {
  const context = inject<DictsContext | null>(DICTS_KEY)
  
  if (!context) {
    console.warn('useDictsService was called but no dict provider was found in the parent hierarchy. Please ensure useDicts is properly provided in your app.')
    // 返回默认的上下文以避免应用崩溃
    const defaultDicts = ref<Partial<IDictsData>>({})
    const defaultGetDicts = async (data: string[]) => {
      console.warn('getDicts called without proper provider', data)
    }
    
    return {
      dicts: defaultDicts,
      getDicts: defaultGetDicts
    }
  }
  
  return context
}

// 也可以提供一个检查函数来验证是否有提供者
export function hasDictsProvider(): boolean {
  return !!inject<DictsContext | null>(DICTS_KEY, null)
}