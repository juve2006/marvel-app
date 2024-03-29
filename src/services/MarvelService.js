import useHttp from '../hooks/http.hook';

export default function useMarvelService() {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'f2d8c225a12cbfea5b5c875a30325e37';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(char => _transformCharacter(char));
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(comics => _transformComics(comics));
    }

    const getOneComics = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?apikey=${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : 'not available',
            title: comics.title,
            description: comics.description || 'There is no description',
            language: comics.language || 'en-us',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No info about the number of pages'
        }
    }

    return {loading, error, clearError, getCharacter, getAllCharacters, getAllComics, getOneComics};
}