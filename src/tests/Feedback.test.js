import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
const {questionsResponse} = require('../../cypress/mocks/questions');

describe('Testando a página Feedback', () => {
  it('teste se os componentes estão sendo renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const img = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');
    const title = screen.getByRole("heading", { name: /feedback/i });
    const text = screen.getByTestId('feedback-text');
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestion = screen.getByTestId('feedback-total-question');
    const playBtn = screen.getByRole("button", { name: /play again/i });
    const rankingBtn = screen.getByRole("button", { name: /ranking/i });

    
    expect(history.location.pathname).toBe('/feedback');
    expect(img).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(totalScore).toBeInTheDocument();
    expect(totalQuestion).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    expect(rankingBtn).toBeInTheDocument();
  });
  
  it('testando as funcionalidades da do botão ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const rankingBtn = screen.getByRole("button", { name: /ranking/i });

    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');
  });

  it('testando as funcionalidades da do botão play again', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const playBtn = screen.getByRole("button", { name: /play again/i });

    userEvent.click(playBtn);
    expect(history.location.pathname).toBe('/');
  });

  it('testando se aparece Well Done', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const user = screen.getAllByRole("textbox")[0];
    const email = screen.getAllByRole("textbox")[1];
    const playBtn = screen.getByRole("button", { name: /play/i });

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    userEvent.type(user, 'fulano');
    userEvent.type(email, 'test@gmail.com');
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
    
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(screen.getByRole("button", { name: /Next/i }));
    
    expect(history.location.pathname).toBe('/feedback');
    expect(screen.getByTestId('feedback-text')).toHaveTextContent(/Well Done!/i);
  });
})