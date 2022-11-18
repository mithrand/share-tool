import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';


describe('Invite App', () => {
  test('It renders invite teammeat button', () => {
    render(<App />);
    const inviteTeammatesButton = screen.getByText(/Invite teammates/i);
    expect(inviteTeammatesButton).toBeInTheDocument();
  });

  test('It open invite teammeat popin when click on invite teammate button', async () => {
    render(<App />);
    const inviteTeammatesButton = screen.getByText(/Invite teammates/i);
    await userEvent.click(inviteTeammatesButton)
    const invitePopInHeader = screen.getByText(/Invite members/i);
    expect(invitePopInHeader).toBeInTheDocument();
  });
})



