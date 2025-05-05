import { ResultMonster } from "@/app/definitions/result-monster";
import { Monster } from "@/app/definitions/monster";
import {notFound} from "next/navigation";
import Image from "next/image";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@/components/ui/table";
import {Heart, Rabbit, Shield, ShieldPlus, Sword, Swords} from "lucide-react";
import BackButton from "@/components/BackButton";

// Type for the page params
type PageProps = {
  params: Promise<{ id: string }>
}

// This function gets called at build time
// This replaces getStaticPaths
export async function generateStaticParams() {
  // Call the external API endpoint to get all the monsters
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  const json = await res.json();
  const resultMonsters: ResultMonster[] = json.results as ResultMonster[];

  // Get the paths we want to pre-render based on monsters
  return resultMonsters.map(resultMonster => ({
    id: resultMonster.url.substring(0, resultMonster.url.length - 1).split('/').pop() || '',
  }));
}

export default async function MonsterDetailsPage({ params }: PageProps) {
  // params contains the monster `id`.
  // If the route is like /monsters/1, then params.id is 1
  const { id } = await params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

  // Verify the monster API call handled properly, otherwise show Next.js 404 page
  if (!res.ok) {
    notFound();
  }

  const monster = await res.json() as Monster;

  const stats = monster.stats.reduce((acc, stat) => {
    acc[stat.stat.name] = stat.base_stat;
    return acc;
  }, {} as Record<string, number>);

  function extractSpriteUrls(): string[] {
    const urls: string[] = [];
    const sprites = monster.sprites;

    // Top-level
    if (sprites.front_default) urls.push(sprites.front_default);
    if (sprites.front_shiny) urls.push(sprites.front_shiny);

    // Other nested categories
    const other = sprites.other ?? {};
    for (const category of Object.values(other)) {
      for (const key in category) {
        const url = category[key as keyof typeof category];
        if (url) {
          urls.push(url);
        }
      }
    }

    return urls;
  }

  const availableSprites = extractSpriteUrls();

  const imageUrl =
      monster.sprites.other['official-artwork'].front_default ?? monster.sprites.other['official-artwork'].front_shiny ??
      availableSprites[0] ?? "../../no-image.svg";

  return (
      <div className="grid justify-items-center min-h-screen md:p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-4 max-w-6xl mx-auto">
            <BackButton />
            <h1 className="text-4xl text-center capitalize">{monster.name.replaceAll('-', ' ')}</h1>
            <div className="relative w-[400px] h-[500px] mx-auto">
              <Image
                  src={imageUrl}
                  alt={monster.name}
                  fill
                  style={{objectFit: 'contain'}}
                  priority
                  sizes={"(max-width: 600px) 100vw, 500px"}
                  unoptimized
              />
            </div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="w-[150px]">ID</TableHead>
                  <TableCell>{monster.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Base Experience</TableHead>
                  <TableCell>{monster.base_experience}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Height/Weight</TableHead>
                  <TableCell>{monster.height / 10}m / {monster.weight / 10}kg</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Stats</TableHead>
                  <TableCell>
                    <div className="flex flex-wrap justify-between gap-2 [&_div]:flex [&_div]:flex-col [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_span]:inline-flex [&_span]:items-center [&_span]:gap-2">
                      <div>
                        <span><Heart/>Hit Points: {stats.hp}</span>
                        <span><Rabbit/> Speed: {stats.speed}</span>
                      </div>
                      <div>
                        <span><Sword/>Attack: {stats.attack}</span>
                        <span><Swords/>Special Attack: {stats['special-attack']}</span>
                      </div>
                      <div>
                        <span><Shield/>Defense: {stats.defense}</span>
                        <span><ShieldPlus/>Special Defense: {stats['special-defense']}</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Abilities</TableHead>
                  <TableCell className="pr-0">
                    <div className="space-y-1">
                      <div className="capitalize">
                        {monster.abilities.filter(a => !a.is_hidden)
                            .map((ability) => ability.ability.name).join(", ")}
                      </div>
                      {monster.abilities.find(a => a.is_hidden) && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Hidden: {monster.abilities.find(a => a.is_hidden)?.ability.name}
                          </div>
                      )}
                      </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Moves</TableHead>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-h-[120px] overflow-y-auto">
                      {monster.moves.map((move) => (
                          <span
                              key={move.move.name}
                              className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 capitalize"
                          >
                            {move.move.name.replace('-', ' ')}
                          </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Held Items</TableHead>
                  <TableCell>
                    {monster.held_items.length > 0 ? (
                        <div className="space-y-1">
                          {monster.held_items.map((item, index) => (
                              <div key={index} className="capitalize">
                                {item.item.name.replace('-', ' ')}
                              </div>
                          ))}
                        </div>
                    ) : (
                        <span className="text-gray-500">None</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Game Appearances</TableHead>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-h-[120px] overflow-y-auto">
                      {monster.game_indices.length > 0 ? monster.game_indices.map((game) => (
                          <span
                              key={game.version.name}
                              className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 capitalize"
                          >
                            {game.version.name.replace('-', ' ')}
                          </span>
                      )) : (
                          <span className="text-gray-500">None</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Species</TableHead>
                  <TableCell className="capitalize">{monster.species.name.replace('-', ' ')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Forms</TableHead>
                  <TableCell>
                    {monster.forms.length > 1 ? (
                        <div className="space-y-1">
                          {monster.forms.map((form) => (
                              <div key={form.name} className="capitalize">
                                {form.name.replace('-', ' ')}
                              </div>
                          ))}
                        </div>
                    ) : (
                        <span className="text-gray-500">Default only</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Sprites</TableHead>
                  <TableCell>
                    {availableSprites.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {availableSprites.map((url, index) => (
                              <div key={`sprite-${index}`} className="relative w-[100px] h-[100px]">
                                <Image
                                    src={url}
                                    alt={monster.name}
                                    fill
                                    style={{objectFit: 'contain'}}
                                    priority
                                    sizes={"(max-width: 600px) 100vw, 100px"}
                                    unoptimized
                                />
                              </div>
                          ))}
                        </div>
                    ) : (
                        <span className="text-gray-500">None</span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </main>
        <footer className="text-center">
          <p>Pocket Monster Gallery 2025</p>
          <small>
            finally trying out <a
              href="https://ui.shadcn.com/"
              className="transition-colors text-purple-500 hover:underline hover:text-purple-600"
          >
            shadcn/ui
          </a>
          </small>
        </footer>
      </div>
  )
}
