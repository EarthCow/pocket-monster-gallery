export interface Monster {
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    base_experience: number;
    cries: {
        latest: string;
        legacy: string;
    };
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    height: number;
    held_items: [
        {
            item: {
                name: string;
                url: string;
            },
            version_details: [
                {
                    rarity: number;
                    version: {
                        name: string;
                        url: string;
                    }
                }
            ]
        }
    ];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: {
        move: {
            name: string;
            url: string;
        };
        version_group_details: {
            level_learned_at: number;
            move_learn_method: {
                name: string;
                url: string;
            };
            version_group: {
                name: string;
                url: string;
            };
        }[];
    }[];
    name: string;
    order: number;
    species: {
        name: string;
        url: string;
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    weight: number;
    sprites: {
        front_default: string;
        front_shiny: string;
        other: {
            dream_world: {
                front_default: string;
            }
            home: {
                front_default: string;
                front_shiny: string;
            }
            'official-artwork': {
                front_default: string;
                front_shiny: string;
            }
            showdown: {
                front_default: string;
                front_shiny: string;
            }
        }
    }
}