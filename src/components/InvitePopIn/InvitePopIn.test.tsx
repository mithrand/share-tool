import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,

} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InvitePopIn, { InvitePopInOpenButton, InvitePopInProvider } from '.'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '../../queries/queryClient'


describe('Invite App', () => {

  const App = () => (
    <QueryClientProvider client={queryClient}>
      <InvitePopInProvider>
        <InvitePopIn onSubmit={jest.fn()} />
        <InvitePopInOpenButton />
      </InvitePopInProvider>
    </QueryClientProvider>
  )

  it('Opens when clicking on PopIn button', () => {
    render(<App />)
    const inviteTeammatesButton = screen.getByText(/Invite teammates/i)
    expect(inviteTeammatesButton).toBeInTheDocument()
  })

  it('Contants header and text', async () => {
    render(<App />)
    const inviteTeammatesButton = screen.getByText(/Invite teammates/i)
    await userEvent.click(inviteTeammatesButton)
    const header = screen.getByText(/Invite members/i)
    expect(header).toBeInTheDocument()
    const mainText = screen.getByText(/Email invite/i)
    expect(mainText).toBeInTheDocument()
    const secondaryText = screen.getByText(
      /Send members an email invitation to join this workspace/i,
    )
    expect(secondaryText).toBeInTheDocument()
  })

  it('Close modal when submitting', async () => {
    render(<App />)
    const inviteTeammatesButton = screen.getByText(/Invite teammates/i)
    await userEvent.click(inviteTeammatesButton)
    const textInput = screen.getByRole('textbox')
    await userEvent.type(textInput, 'email@gmail.com{enter}')
    const inviteButton = screen.getByText('Invite')
    await userEvent.click(inviteButton)
    await waitForElementToBeRemoved(() => screen.queryByText(/Invite members/i))
  })
})
