
import { create } from 'zustand';

export interface Location {
    id: string;
    movieName: string;
    sceneDescription: string;
    coordinates: [number, number]; // [lat, lng]
    thumbnailUrl: string;
    rating: number;
}

interface StoreState {
    locations: Location[];
    selectedLocation: Location | null;
    setSelectedLocation: (location: Location | null) => void;
}

export const useStore = create<StoreState>((set) => ({
    locations: [
        {
            id: '1',
            movieName: 'Joker (2019)',
            sceneDescription: 'The Bronx Stairs where Joker dances.',
            coordinates: [40.8359, -73.9242],
            thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg',
            rating: 4.8,
        },
        {
            id: '2',
            movieName: 'Harry Potter',
            sceneDescription: 'Platform 9 3/4 at Kings Cross Station.',
            coordinates: [51.5322, -0.1243],
            thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg',
            rating: 4.5,
        },
        {
            id: '3',
            movieName: 'The Beach',
            sceneDescription: 'Maya Bay, Thailand.',
            coordinates: [7.6756, 98.7664],
            thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f7/The_Beach_poster.jpg',
            rating: 4.7,
        },
    ],
    selectedLocation: null,
    setSelectedLocation: (location) => set({ selectedLocation: location }),
}));
