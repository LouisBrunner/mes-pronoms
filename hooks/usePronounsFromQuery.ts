import {NextRouter, useRouter} from 'next/router'
import {usePronouns} from 'hooks/usePronouns'
import {isArray} from 'logic/utils'
import {IPronounStore} from 'logic/types'
import {isCompressed} from 'logic/storage/packing'

export type usePronounsFromQueryState = {
  router: NextRouter,
  store: IPronounStore,
  compressed: boolean,
}

export const usePronounsFromQuery = (): usePronounsFromQueryState => {
  const router = useRouter()
  let {pack} = router.query
  if (pack === undefined) {
    pack = null
  }
  const data = isArray(pack) ? pack.join('/') : pack
  return {
    router,
    store: usePronouns(data),
    compressed: data ? isCompressed(data) : false,
  }
}
