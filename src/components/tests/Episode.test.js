import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id: 909340,
    name: "Chapter One: MADMAX",
    number: 1,
    runtime: 48,
    season: 2,
    summary: "One year after the events with the Upside Down and the Demogorgon, Will meets with a government doctor. The boys discover that there's a new player in town, and Jim pays a visit to El."
}

test("renders without error", () => {
    render(<Episode episode={testEpisode}/>);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={{...testEpisode, image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855794.jpg"}} />);

    const summary = screen.getByText(testEpisode.summary);

    expect(summary).toBeInTheDocument();
    expect(summary).toBeTruthy();

});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testEpisode} />);

    const altImg = screen.getByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');

    expect(altImg).toBeInTheDocument();
    expect(altImg).toBeTruthy();
});
