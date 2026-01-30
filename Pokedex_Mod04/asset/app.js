let pokemonData = []; 

    const fetchPokemons = async () => {
        try {
            const promises = [];
            for (let i = 1; i <= 9; i++) {
                promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
            }
            
            // Esperamos a que todas las peticiones terminen
            pokemonData = await Promise.all(promises);
            renderCards(pokemonData);
        } catch (error) {
            console.error("Error al obtener datos:", error);
            alert("Error de red: No se pudo conectar con la PokeAPI.");
        }
    };

    const renderCards = (list) => {
        const container = document.getElementById('pokemonContainer');
        container.innerHTML = list.map(pokemon => {
            const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const image = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
            const types = pokemon.types.map(t => `<span class="badge bg-success type-badge">${t.type.name}</span>`).join('');

            return `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm pokemon-card text-center">
                        <img src="${image}" class="card-img-top img-fluid" alt="${name}">
                        <div class="card-body">
                            <p class="text-muted mb-1">#${pokemon.id.toString().padStart(3, '0')}</p>
                            <h5 class="card-title fw-bold">${name}</h5>
                            <div class="mt-2">${types}
                            <a href="detalles.html"><button class="btn btn-primary">Ver Detalles</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    };
    

    // Filtro de búsqueda opcional
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = pokemonData.filter(p => p.name.includes(term));
        renderCards(filtered);
    });

    // Inicializar

    fetchPokemons();

