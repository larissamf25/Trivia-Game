import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
// import Login from '../App';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Testando pagina Login', () => {
  afterEach(() => jest.clearAllMocks());
  it('Teste se a pagina login é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
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
    const { history } = renderWithRouterAndRedux(<Login />);
    const user = screen.getAllByRole("textbox")[0];
    const email = screen.getAllByRole("textbox")[1];
    const playBtn = screen.getByRole("button", { name: /play/i });
    const token = '4f98dbe2ea782be2a011d6761fefc17c739f8e77bad2d9b52abe801252c4051f';
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    });
    
    userEvent.type(email, 'alguem@trybe.com');
    userEvent.type(user, 'alguem');
    
    expect(playBtn).toBeEnabled();
    // expect(email).toHaveTextContent('alguem@trybe.com');
    // expect(user).toHaveTextContent('alguem');
    
    userEvent.click(playBtn);
    
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
    // expect(localStorage.setItem).toHaveBeenCalled();
    // const { location: { pathname } } = history;
    // expect(pathname).toBe('/game');
  });
  // it('Testando a pagina de config', () => {
  //   const { history } = renderWithRouterAndRedux(<App />);
  //   const { location: { pathname } } = history;
  //   const configBtn = screen.getByRole("button", { name: /configurações/i });

  //   userEvent.click(configBtn);
  //   // history.push('/config')

  //   expect(pathname).toEqual('/config');
  // });
})
