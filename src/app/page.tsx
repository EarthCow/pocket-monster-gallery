import {ResultMonster} from "@/app/definitions/result-monster";
import MonsterList from "@/components/MonsterList";

export default async function Home() {
  // Call the external API endpoint to get all the monsters
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  const resultMonsters = (await res.json()).results as ResultMonster[];

  return (
    <div className="grid justify-items-center min-h-screen pt-4 sm:p-8 sm:gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 w-full">
        <h1 className="text-4xl text-center">Pocket Monster Gallery</h1>
        <div className="max-w-6xl mx-auto">
          <MonsterList resultMonsters={resultMonsters} />
        </div>
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
  );
}
