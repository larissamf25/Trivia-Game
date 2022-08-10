import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
const { questionsResponse, invalidTokenQuestionsResponse } = require('../../cypress/mocks/questions');


describe('Testando a página Game', async () => {

  afterEach(() => jest.resetAllMocks());

  it('teste se os componentes são renderizados na página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const user = screen.getAllByRole("textbox")[0];
    const email = screen.getAllByRole("textbox")[1];
    const playBtn = screen.getByRole("button", { name: /play/i });
    
    global.fetch = jest.fn(() => Promise.resolve({
      json:() => Promise.resolve(questionsResponse),
    }));

    userEvent.type(user, 'Cássio');
    userEvent.type(email, 'cassio@gmail.com');
    userEvent.click(playBtn);
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/game');

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(screen.getByRole("button", { name: /Next/i }));
    
    userEvent.click( await screen.findByTestId('correct-answer'));
    userEvent.click(screen.getByRole("button", { name: /Next/i }));
    
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(screen.getByRole("button", { name: /Next/i }));
    
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(screen.getByRole("button", { name: /Next/i }));
    
    userEvent.click(await screen.findByTestId('wrong-answer-1'));
    userEvent.click(screen.getByRole("button", { name: /Next/i }));

    expect(history.location.pathname).toBe('/feedback');
  });

  it('Teste com token infalido', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const user = screen.getAllByRole("textbox")[0];
    const email = screen.getAllByRole("textbox")[1];
    const playBtn = screen.getByRole("button", { name: /play/i });

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(invalidTokenQuestionsResponse),
    }));

    userEvent.type(user, 'fulano');
    userEvent.type(email, 'test@gmail.com');
    userEvent.click(playBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    // expect(history.location.pathname).toBe('/game');
    jest.setTimeout(3000);

    // expect(history.location.pathname).toBe('/');
    // await waitFor(() => expect(history.location.pathname).toBe('/'));

  })
it('Teste quando timer === 0 ',  async () => {
  renderWithRouterAndRedux(<App />);
    const user = screen.getAllByRole("textbox")[0];
    const email = screen.getAllByRole("textbox")[1];
    const playBtn = screen.getByRole("button", { name: /play/i });
    global.fetch = jest.fn(() => Promise.resolve({
      json:() => Promise.resolve(questionsResponse),
    }));

    userEvent.type(user, 'fulano');
    userEvent.type(email, 'test@gmail.com');
    userEvent.click(playBtn);

    const trueBttn = await screen.findByTestId('correct-answer');

    userEvent
    await waitFor(() => {
    expect(trueBttn).toBeDisabled();
    
    }, {timeout: 31000}) 
   

}, 32000)

})
