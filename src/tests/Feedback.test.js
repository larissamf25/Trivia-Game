import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

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
})