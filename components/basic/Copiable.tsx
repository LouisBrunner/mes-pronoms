import {useCallback} from "react"

export interface CopiableProps {
  children: string,
}

export const Copiable = ({children}: CopiableProps): JSX.Element => {
  const toClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(children)
  }, [children])

  return (
    <span>
      {children} <button onClick={toClipboard}>Copier</button>
    </span>
  )
}
