import {
  useState,
  createContext,
  ReactNode,
  useContext,
  createRef,
} from 'react'
import { noop } from '../../constants'

import { Invite } from '../../types'

type InvitesInputState = {
  invites: Invite[]
  keyword: string
  selectInputRef: React.RefObject<HTMLLIElement>
  textInputRef: React.RefObject<HTMLInputElement>
  addInvite(invite: Invite): void
  deleteInvite(inviteEmail: string): void
  submit(): void
  popInvite(): void
  setKeyword(keyword: string): void
}

const InvitesInputStateContext = createContext<InvitesInputState>({
  invites: [],
  keyword: '',
  selectInputRef: createRef(),
  textInputRef: createRef(),
  addInvite: noop,
  deleteInvite: noop,
  submit: noop,
  popInvite: noop,
  setKeyword: noop,
})

type Props = {
  onSubmit(invites: Invite[]): void
  children: ReactNode
}

const InvitesInput = ({ children, onSubmit }: Props) => {
  const [invites, setInvites] = useState<Invite[]>([])
  const [keyword, setKeyword] = useState('')
  const selectInputRef = createRef<HTMLLIElement>()
  const textInputRef = createRef<HTMLInputElement>()

  const addInvite = (invite: Invite) => {
    setInvites([...invites.filter((inv) => inv.email !== invite.email), invite])
    setKeyword('')
    textInputRef.current?.focus()
  }

  const deleteInvite = (inviteEmail: string) => {
    setInvites(invites.filter((inv) => inv.email !== inviteEmail))
  }

  const popInvite = () => {
    setInvites(invites.slice(0, invites.length - 1))
  }

  const submit = () => {
    onSubmit(invites)
  }

  return (
    <InvitesInputStateContext.Provider
      value={{
        invites,
        keyword,
        selectInputRef,
        textInputRef,
        addInvite,
        deleteInvite,
        submit,
        setKeyword,
        popInvite,
      }}
    >
      {children}
    </InvitesInputStateContext.Provider>
  )
}

export const useInvitesListContext = () => {
  const { invites, ...rest } = useContext(InvitesInputStateContext)
  return {
    invites,
    hasInvites: invites.length > 0,
    ...rest,
  }
}

export default InvitesInput
