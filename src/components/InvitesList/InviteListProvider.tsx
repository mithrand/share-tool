import { useState, createContext, ReactNode, useContext } from 'react'

import { Invite } from '../../types'

type InvitesState = {
  invites: Invite[],
  addInvite(invite: Invite): void,
  deleteInvite(inviteEmail: string): void
}

const InvitesStateContext = createContext<InvitesState>({
  invites: [],
  addInvite: (invite: Invite) => { },
  deleteInvite: (inviteEmail: string) => { },
})

const InvitesListProvider = ({ children }: { children: ReactNode }) => {
  const [invites, setInvites] = useState<Invite[]>([])

  const addInvite = (invite: Invite) => {
    setInvites([...invites.filter(inv => inv.email === invite.email), invite])
  }

  const deleteInvite = (inviteEmail: string) => {
    setInvites(invites.filter(inv => inv.email !== inviteEmail))
  }

  return (
    <InvitesStateContext.Provider value={{ invites, addInvite, deleteInvite }}>
      {children}
    </InvitesStateContext.Provider>
  )
}

export const useInvitesListContext = () => {
  const { invites, ...rest } = useContext(InvitesStateContext)
  return {
    invites,
    hasInvites: invites.length > 0,
    ...rest
  }
}

export default InvitesListProvider