import {useRouter} from 'next/router'
import {usePronouns} from 'hooks/usePronouns'
import {isArray} from 'logic/utils'
import {IPronounStore} from 'logic/types'

export const usePackedPronouns = (): IPronounStore => {
  const router = useRouter()
  let {pack} = router.query
  if (pack === undefined) {
    pack = null
  }
  const data = isArray(pack) ? pack.join('/') : pack
  return usePronouns(data)
}
