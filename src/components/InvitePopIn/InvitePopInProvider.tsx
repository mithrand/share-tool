import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { noop } from '../../constants'

type InvitePopInState = {
  isOpen: boolean
}

const defaultState: InvitePopInState = {
  isOpen: false,
}

const InvitePopInStateContext = createContext<InvitePopInState>(defaultState)

type InvitePopInActions = {
  open(): void
  close(): void
}

const defaultActions: InvitePopInActions = {
  open: noop,
  close: noop,
}

const InvitePopInActionsContext =
  createContext<InvitePopInActions>(defaultActions)

export const InvitePopInProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultState.isOpen)

  const InvitePopInActions = useMemo(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [setIsOpen],
  )

  return (
    <InvitePopInStateContext.Provider value={{ isOpen }}>
      <InvitePopInActionsContext.Provider value={InvitePopInActions}>
        {children}
      </InvitePopInActionsContext.Provider>
    </InvitePopInStateContext.Provider>
  )
}

export const useIsInvitePopInOpen = () =>
  useContext(InvitePopInStateContext).isOpen
export const useInvitePopInActions = () => useContext(InvitePopInActionsContext)

export default InvitePopInProvider
