import { describe } from "mocha";
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
const { questionsResponse } = require('../../cypress/mocks/questions');



    it('Teste', async () => {
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
        
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(screen.getByRole("button", { name: /Next/i }));

        expect(history.location.pathname).toBe('/feedback');

        const playAgain = screen.getByRole("link", { name: /play again/i });
        userEvent.click(playAgain);

        userEvent.type(screen.getAllByRole("textbox")[0], 'Danilo');
        userEvent.type(screen.getAllByRole("textbox")[1], 'danilo@gmail.com');
        const playBtnn = screen.getByRole("button", { name: /play/i });
        userEvent.click(playBtnn);


        userEvent.click(await screen.findByTestId('wrong-answer-0'));
        userEvent.click(screen.getByRole("button", { name: /Next/i }));
        
        userEvent.click( await screen.findByTestId('wrong-answer-0'));
        userEvent.click(screen.getByRole("button", { name: /Next/i }));
        
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(screen.getByRole("button", { name: /Next/i }));
        
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(screen.getByRole("button", { name: /Next/i }));
        
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(screen.getByRole("button", { name: /Next/i }));


        const rankBttn = screen.getByRole("button", { name: /ranking/i });
        userEvent.click(rankBttn);
        const player = screen.getByTestId('player-name-0');
        const score = screen.getByTestId('player-score-0');
        const playerImg = screen.getAllByRole("img", { name: /Cassio/i })[0];
        expect(player).toBeDefined();
        expect(score).toBeDefined();
        expect(playerImg).toBeDefined();
        const player2 = screen.getByTestId('player-name-1');
        const score2 = screen.getByTestId('player-score-1');
        const playerImg2 = screen.getAllByRole("img", { name: /Danilo/i })[0];
        expect(player2).toBeDefined();
        expect(score2).toBeDefined();
        expect(playerImg2).toBeDefined();

        const homeBttn = screen.getByRole("link", { name: /home/i });
        userEvent.click(homeBttn);
        expect(history.location.pathname).toBe('/');


    });
