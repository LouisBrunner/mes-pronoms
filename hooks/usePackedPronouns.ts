import {useRouter} from 'next/router'
import {usePronouns} from 'hooks/usePronouns'
import {isArray} from 'logic/utils'
import {IPronounStore} from 'logic/types'
import {isCompressed} from 'logic/storage/packing'

export type usePackedPronounsState = {
  store: IPronounStore,
  compressed: boolean,
}

export const usePackedPronouns = (): usePackedPronounsState => {
  const router = useRouter()
  let {pack} = router.query
  if (pack === undefined) {
    pack = null
  }
  const data = isArray(pack) ? pack.join('/') : pack
  return {
    store: usePronouns(data),
    compressed: data ? isCompressed(data) : false,
  }
}
