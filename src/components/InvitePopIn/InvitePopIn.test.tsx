import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InviteListInput from '../InvitesList'

import InvitePopIn, { InvitePopInOpenButton, InvitePopInProvider } from '.'

jest.mock('../InvitesList', () => ({ onSend }: { onSend: () => void }) => (
  <button onClick={onSend}>submit</button>
))

describe('Invite App', () => {
  const onSubmitMock = () => jest.fn()

  const App = () => (
    <InvitePopInProvider>
      <InvitePopIn onSubmit={onSubmitMock} />
      <InvitePopInOpenButton />
    </InvitePopInProvider>
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
    const submitbutton = screen.getByText(/submit/i)
    await userEvent.click(submitbutton)
    await waitForElementToBeRemoved(() => screen.queryByText(/Invite members/i))
  })
})
