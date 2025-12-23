
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
    visitedLocations: number[];
    toggleVisited: (id: number) => void;
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

            if (!seriesRes.ok) {
                throw new Error(`Series API Failed: ${seriesRes.status} ${seriesRes.statusText}`);
            }
            if (!locationsRes.ok) {
                throw new Error(`Locations API Failed: ${locationsRes.status} ${locationsRes.statusText}`);
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

    // Track visited location IDs
    visitedLocations: [],
    toggleVisited: (locationId: number) => set((state) => {
        const isVisited = state.visitedLocations.includes(locationId);
        if (isVisited) {
            return { visitedLocations: state.visitedLocations.filter(id => id !== locationId) };
        } else {
            return { visitedLocations: [...state.visitedLocations, locationId] };
        }
    }),
}));
