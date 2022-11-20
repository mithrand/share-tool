import React from 'react'
import { Matcher, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '../../queries/queryClient'

import InvitesInput, {
  InvitesInputText,
  InvitesInputSubmitButton,
  InvitesInputSelect,
} from '.'

const withinTextInput = () => within(screen.getByRole('group'))

const withinSelectList = async () => within(await screen.findByRole('list'))

const submit = () => userEvent.click(screen.getByText('Invite'))

describe('Invite App', () => {
  const onSubmitMock = jest.fn()

  const App = () => (
    <QueryClientProvider client={queryClient}>
      <InvitesInput onSubmit={onSubmitMock}>
        <InvitesInputText />
        <InvitesInputSubmitButton>Invite</InvitesInputSubmitButton>
        <InvitesInputSelect />
      </InvitesInput>
    </QueryClientProvider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('adds an email when pressing enter', async () => {
    const email = 'email@gmail.com'
    render(<App />)
    const textInput = screen.getByRole('textbox')
    await userEvent.type(textInput, `${email}{enter}`)
    withinTextInput().getByText(email)
    submit()
    expect(onSubmitMock).toHaveBeenCalledWith([{ email }])
  })

  it('adds an email when clicking on select', async () => {
    const email = 'email@gmail.com'
    render(<App />)
    const textInput = screen.getByRole('textbox')
    await userEvent.type(textInput, `${email}`)
    const selectButton = (await withinSelectList()).getByText(email)
    await userEvent.click(selectButton)
    withinTextInput().getByText(email)
    submit()
    expect(onSubmitMock).toHaveBeenCalledWith([{ email }])
  })

  it('adds user from the list', async () => {
    render(<App />)
    const textInput = screen.getByRole('textbox')
    await userEvent.type(textInput, `t`)
    const selectButton = (await withinSelectList()).getByText(/Tara Halvik/i)
    await userEvent.click(selectButton)
    withinTextInput().getByText(/Tara Halvik/i)
    submit()
    expect(onSubmitMock).toHaveBeenCalledWith([
      expect.objectContaining({
        email: 'tara@claap.io',
        firstName: 'Tara',
        lastName: 'Halvik',
      }),
    ])
  })

  it('adds more than one user from the list', async () => {
    const email = 'email@gmail.com'
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), `t`)
    await userEvent.click((await withinSelectList()).getByText(/Tara Halvik/i))
    await userEvent.type(screen.getByRole('textbox'), `t`)
    await userEvent.click(
      (await withinSelectList()).getByText(/Tristan Agosta/i),
    )
    await userEvent.type(screen.getByRole('textbox'), email)
    await userEvent.click((await withinSelectList()).getByText(email))
    withinTextInput().getByText(/Tara Halvik/i)
    withinTextInput().getByText(/Tristan Agosta/i)
    withinTextInput().getByText(email)
    submit()
    expect(onSubmitMock).toHaveBeenCalledWith([
      expect.objectContaining({
        email: 'tara@claap.io',
        firstName: 'Tara',
        lastName: 'Halvik',
      }),
      expect.objectContaining({
        email: 'tristan@claap.com',
        firstName: 'Tristan',
        lastName: 'Agosta',
      }),
      expect.objectContaining({ email }),
    ])
  })

  it('Removes users from the list when clicking in tag icon', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), `t`)
    await userEvent.click((await withinSelectList()).getByText(/Tara Halvik/i))
    await userEvent.type(screen.getByRole('textbox'), `t`)
    await userEvent.click(
      (await withinSelectList()).getByText(/Tristan Agosta/i),
    )
    withinTextInput().getByText(/Tara Halvik/i)
    withinTextInput().getByText(/Tristan Agosta/i)
    const button = (await withinTextInput()).getByLabelText(
      /delete Tara Halvik/i,
    )
    await userEvent.click(button)

    submit()
    expect(onSubmitMock).toHaveBeenCalledWith([
      expect.objectContaining({
        email: 'tristan@claap.com',
        firstName: 'Tristan',
        lastName: 'Agosta',
      }),
    ])
  })
})
