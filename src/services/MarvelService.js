
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'f2d8c225a12cbfea5b5c875a30325e37';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=210&apikey=${this._apiKey}`);
        return res.data.results.map(char => this._transformCharacter(char));
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?apikey=${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
          name: char.name,
          description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
          thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
          homepage: char.urls[0].url,
          wiki: char.urls[1].url,
        }
    }

}

export default MarvelService;