import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');


const exampleShow = {
    name: 'Show',
    summary: 'Summary',
    seasons: [
        {id: 1, name: 'Season 1', episodes: []},
        {id: 2, name: 'Season 2', episodes: []},
        {id: 3, name: 'Season 3', episodes: []}
    ]
}

test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', async ()=>{
    mockFetchShow.mockResolvedValueOnce(exampleShow);
    render(<Display />);

    const button = screen.queryByRole('button');
    userEvent.click(button);

    const showComponent = await screen.findByTestId(/show-container/i);
    expect(showComponent).toBeTruthy();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
    mockFetchShow.mockResolvedValueOnce(exampleShow);
    render(<Display />);

    const button = screen.queryByRole('button');
    userEvent.click(button);

    const options = await screen.findAllByTestId(/season-option/i);

    expect(options.length).toBe(exampleShow.seasons.length);
});

test('tests when the fetch button is clicked the function is called', async () => {
    mockFetchShow.mockResolvedValueOnce(exampleShow);
    const mockDisplayFunc = jest.fn();

    render(<Display displayFunc={mockDisplayFunc} />);
    const button = screen.queryByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(mockDisplayFunc).toBeCalled();
    })

})
