import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
const { questionsResponse } = require('../../cypress/mocks/questions');

describe('Testando a página Game', () => {
  it('teste se os componentes são renderizados na página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json:() => Promise.resolve(questionsResponse),
    // }));
    const user = screen.getAllByRole("textbox")[0];
    const email = screen.getAllByRole("textbox")[1];
    const playBtn = screen.getByRole("button", { name: /play/i });
    // await waitFor(() => expect(fetch).toHaveBeenCalled())
    
    userEvent.type(user, 'Cássio');
    userEvent.type(email, 'cassio@gmail.com');
    userEvent.click(playBtn);
    
    userEvent.click(await screen.findByTestId('correct-answer'));
    const nextBtn = screen.getByRole("button", { name: /Next/i });
    userEvent.click(nextBtn);

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(nextBtn);

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(nextBtn);

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(nextBtn);

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(nextBtn);

    expect(history.location.pathname).toBe('/feedback');
  });
})