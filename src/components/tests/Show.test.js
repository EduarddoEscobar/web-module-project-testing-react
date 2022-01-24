import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const exampleShow = {
    name: 'Show',
    summary: 'Summary',
    seasons: [
        {id: 1, name: 'Season 1', episodes: []},
        {id: 2, name: 'Season 2', episodes: []},
        {id: 3, name: 'Season 3', episodes: []}
    ]
}

test('renders without errors', ()=>{
    render(<Show show={exampleShow} selectedSeason={'none'} />);
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={'none'} />)

    const loading = screen.queryByTestId(/loading-container/i);

    expect(loading).toBeTruthy();
    expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={exampleShow} selectedSeason={'none'} />);

    const options = screen.getAllByTestId(/season-option/i);

    expect(options.length).toBe(exampleShow.seasons.length);

});

test('handleSelect is called when an season is selected', () => {
    const mockHandleSelect = jest.fn();

    render(<Show show={exampleShow} selectedSeason={'none'} handleSelect={mockHandleSelect}/>);

    const options = screen.queryByLabelText(/select a season/i);

    userEvent.selectOptions(options, ['1']);

    expect(mockHandleSelect.mock.calls.length).toBe(1);

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} = render(<Show show={exampleShow} selectedSeason={'none'} />);
    let episodes = screen.queryByTestId(/episodes-container/i);

    expect(episodes).toBeFalsy();
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={exampleShow} selectedSeason={'1'} />);
    episodes = screen.queryByTestId(/episodes-container/i);
    expect(episodes).toBeTruthy();
    expect(episodes).toBeInTheDocument();
});
