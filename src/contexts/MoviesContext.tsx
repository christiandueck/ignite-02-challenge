import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface MoviesContextData {
    genres: GenreResponseProps[],
    selectedGenreId: number,
    setSelectedGenreId: (id: number) => void,
    selectedGenre: GenreResponseProps,
    movies: MovieProps[]
}

interface MoviesProviderProps {
    children: ReactNode;
}

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

export const MoviesContext = createContext({} as MoviesContextData);

export function MoviesProvider({
    children
}: MoviesProviderProps) {
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    return (
        <MoviesContext.Provider
            value={{
                genres,
                selectedGenreId,
                setSelectedGenreId,
                selectedGenre,
                movies
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
}