
import { create } from 'zustand';

export interface Series {
    id: number;
    title: string;
    poster: string;
    description: string;
    totalLocations: number;
    isTrending: boolean;
}

export interface Location {
    id: number;
    seriesId: number;
    name: string;
    image: string;
    isMajor: boolean;
    scene: string;
    description: string;
    coords: string; // "lat, lng" string to be parsed
}

interface StoreState {
    series: Series[];
    locations: Location[];
    selectedSeries: Series | null;
    selectedLocation: Location | null;
    isLoading: boolean;
    error: string | null;

    fetchData: () => Promise<void>;
    setSelectedSeries: (series: Series | null) => void;
    setSelectedLocation: (location: Location | null) => void;
    getLocationsBySeries: (seriesId: number) => Location[];
}

export const useStore = create<StoreState>((set, get) => ({
    series: [],
    locations: [],
    selectedSeries: null,
    selectedLocation: null,
    isLoading: false,
    error: null,

    fetchData: async () => {
        set({ isLoading: true, error: null });
        try {
            const [seriesRes, locationsRes] = await Promise.all([
                fetch('/api/series'),
                fetch('/api/locations')
            ]);

            if (!seriesRes.ok || !locationsRes.ok) {
                throw new Error('Failed to fetch data');
            }

            const seriesData = await seriesRes.json();
            const locationsData = await locationsRes.json();

            set({ series: seriesData, locations: locationsData, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    setSelectedSeries: (series) => set({ selectedSeries: series }),
    setSelectedLocation: (location) => set({ selectedLocation: location }),
    getLocationsBySeries: (seriesId) => {
        return get().locations.filter(l => l.seriesId === seriesId);
    },
}));
