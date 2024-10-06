import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemon, setPokemon] = useState({});
  const [showMoves, setShowMoves] = useState(false); // Added state for showing moves
  const [activeSection, setActiveSection] = useState('info');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error("Pokémon not found");
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error while fetching Pokémon data: ", error);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  const nextPokemon = () => setPokemonId((prev) => prev + 1);
  const prevPokemon = () => setPokemonId((prev) => Math.max(1, prev - 1));
  
  const toggleInfoMoves = () => setShowMoves(prev => !prev);

  const typeColors = {
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    ground: '#E2BF65',
    fairy: '#D685AD',
    fighting: '#C22E28',
    ice: '#96D9D6',
    poison: '#A33EA1',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
  };

  return (
    <div className="pokedex">
      <h1>Bits of Good Mid-Semester Project</h1>

      {Object.keys(pokemon).length > 0 && (
        <div className="poke-info">
          <div className="left-section">
            <div className="poke-image">
              <div className="image-container">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
              <div className="name-container">
                <h2 id="nameTag">{pokemon.name}</h2>
              </div>
              <div className="types">
                <h3>Types:</h3>
                <hr className="types-line" />
                <ul>
                  {pokemon.types.map((type) => (
                    <li
                      key={type.type.name}
                      style={{ backgroundColor: typeColors[type.type.name] || '#ddd' }}
                    >{type.type.name}</li>
                  ))}
                </ul>
              </div>
              {/* Arrow Buttons Below the Types */}
              <div className="navButtons">
                <button onClick={prevPokemon}>&lt;</button>
                <button onClick={nextPokemon}>&gt;</button>
              </div>
            </div>
          </div>

          <div className="right-section">
            <div className="poke-stats">
              {showMoves ? (
                <div>
                  <h3>Moves</h3>
                  <ul>
                    {pokemon.moves.slice(0, 5).map((move) => (
                      <li key={move.move.name}>{move.move.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <p>Height: {(pokemon.height / 10).toFixed(1)} m</p>
                  <p>Weight: {(pokemon.weight / 10).toFixed(1)} kg</p>
                  <p>HP: {pokemon.stats[0].base_stat}</p>
                  <p>Attack: {pokemon.stats[1].base_stat}</p>
                  <p>Defense: {pokemon.stats[2].base_stat}</p>
                  <p>Special Attack: {pokemon.stats[3].base_stat}</p>
                  <p>Special Defense: {pokemon.stats[4].base_stat}</p>
                  <p>Speed: {pokemon.stats[5].base_stat}</p>
                </div>
              )}
            </div>

            {/* Info/Move Buttons */}
            <div className="bottom-buttons">
              <button className={`info-button ${!showMoves ? 'active' : ''}`} onClick={() => setShowMoves(false)}>Info</button>
              <button className={`moves-button ${showMoves ? 'active' : ''}`} onClick={() => setShowMoves(true)}>Moves</button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default App;
