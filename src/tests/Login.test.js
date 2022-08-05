import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Testando pagina Login', () => {
  it('Teste se a pagina login é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    const user = screen.getAllByRole("textbox")[0];
    const email = screen.getAllByRole("textbox")[1];
    const playBtn = screen.getByRole("button", { name: /play/i });
    const configBtn = screen.getByRole("button", { name: /configurações/i });
    
    expect(pathname).toBe('/');
    expect(user).toBeDefined();
    expect(email).toBeDefined();
    expect(playBtn).toBeDefined();
    expect(configBtn).toBeDefined();
    expect(playBtn).toBeDisabled();
  });
  it('Testando as funcionalidades', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const user = screen.getAllByRole("textbox")[0];
    const email = screen.getAllByRole("textbox")[1];
    const playBtn = screen.getByRole("button", { name: /play/i });
    
    userEvent.type(email, 'alguem@trybe.com');
    userEvent.type(user, 'alguem');
    
    expect(playBtn).toBeEnabled();
    expect(email).toHaveTextContent('alguem@trybe.com');
    
    userEvent.click(playBtn);
    
    // expect(await fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
    // expect(localStorage.setItem).toHaveBeenCalled();
    // const { location: { pathname } } = history;
    // expect(pathname).toBe('/game');
  });
  it('Testando a pagina de config', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    const configBtn = screen.getByRole("button", { name: /configurações/i });

    userEvent.click(configBtn);
    // history.push('/config')

    expect(pathname).toEqual('/config');
  });
})
