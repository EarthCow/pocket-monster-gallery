'use client';
import {useEffect, useState} from 'react';
import {ResultMonster} from "@/app/definitions/result-monster";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {ChoosePage} from "@/components/ChoosePage";

interface MonsterListProps {
  resultMonsters: ResultMonster[],
}

// Helper function to highlight matching text from the search
const highlightMatch = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ?
          <span key={i} className="text-purple-500">{part}</span> :
          part
  );
};

// Helper function for better more common pagination
function getVisiblePages(currentPage: number, totalPages: number, delta = 1): number[] {
  const pages: number[] = [];

  const start = Math.max(0, currentPage - delta);
  const end = Math.min(totalPages, currentPage + delta);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Always include first and last page if they’re not already in the list
  if (pages[0] !== 0) {
    // -1 is an ellipsis
    if (pages[0] > 1) pages.unshift(-1);
    pages.unshift(0);
  }

  if (pages[pages.length - 1] !== totalPages) {
    if (pages[pages.length - 1] < totalPages - 1) pages.push(-1);
    pages.push(totalPages);
  }

  return pages;
}


export default function MonsterList(props: MonsterListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  // Zero-based pages
  const MONSTERS_PER_PAGE = 75;
  const [page, setPage] = useState(0);
  const resultMonsters = props.resultMonsters;

  // Restore page and scroll position if navigating back
  useEffect(() => {
    const storedScroll = sessionStorage.getItem('scroll-position');
    const storedPage = sessionStorage.getItem('current-page');

    if (storedPage) {
      setPage(parseInt(storedPage));
      sessionStorage.removeItem('current-page');
    }

    if (storedScroll) {
      window.scrollTo(0, parseInt(storedScroll));
      sessionStorage.removeItem('scroll-position');
    }
  }, []);

  // Filter monsters based on search term (name or ID)
  const filteredMonsters = resultMonsters.filter(monster => {
    const monsterId = monster.url.substring(0, monster.url.length - 1).split('/').pop() || '';
    const monsterName = monster.name.replaceAll('-', ' ');
    return (
        monsterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monsterId.includes(searchTerm)
    );
  });

  const maxPage = Math.ceil(filteredMonsters.length / MONSTERS_PER_PAGE) - 1;

  const cardElements = filteredMonsters
      // Separate them into pages so the dom can breathe
      .slice(page * MONSTERS_PER_PAGE, MONSTERS_PER_PAGE + page * MONSTERS_PER_PAGE)

      // Make them dom elements
      .map((resultMonster: ResultMonster) => {
        const monsterId = resultMonster.url.substring(0, resultMonster.url.length - 1).split('/').pop() || '';
        const monsterName = resultMonster.name.split('-').map(value => {
          return value.substring(0, 1).toUpperCase() + (value.length > 1 ? value.substring(1, value.length) : '');
        }).join(' ');
        return (
          <Link href={`/monsters/${monsterId}`} key={monsterId}
                onClick={() => {
                  sessionStorage.setItem('scroll-position', window.scrollY.toString());
                  sessionStorage.setItem('current-page', page.toString());
                }}>
            <Card className="transition hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer dark:hover:shadow-gray-700">
              <CardHeader>
                <CardTitle>
                  {highlightMatch(monsterName, searchTerm)}
                </CardTitle>
                <CardDescription>
                  ID {highlightMatch(monsterId, searchTerm)}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative w-[200px] h-[250px]">
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${monsterId}.png`}
                    alt={resultMonster.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                    sizes={"(max-width: 600px) 100vw, 200px"}
                    onError={e => {
                      e.currentTarget.srcset = "";
                      e.currentTarget.src = 'no-image.svg';
                    }}
                    unoptimized
                />
              </CardContent>
            </Card>
          </Link>
        );
      });

  // Get pagination item easily
  function getPaginationItem(indexPage: number, index: number = 0) {
    return indexPage === -1 ? (
        <PaginationItem key={index}>
          <ChoosePage currentPage={page} maxPage={maxPage} goToPage={setPage} />
        </PaginationItem>
        ) : (
        <PaginationItem key={index}>
          <PaginationLink onClick={() => setPage(indexPage)} isActive={page === indexPage}>{indexPage + 1}</PaginationLink>
        </PaginationItem>
    );
  }

  // Create the pagination only if there is more than 1 page
  const pagination = maxPage > 0 ? (
      <Pagination className="select-none">
        <PaginationContent>
          {page > 0 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(page => page > 0 ? page - 1 : page)} />
              </PaginationItem>
          )}
          {getVisiblePages(page, maxPage).map(getPaginationItem)}
          {page < maxPage && (
              <PaginationItem>
                <PaginationNext onClick={() => setPage(page => page < maxPage ? page + 1 : page)} />
              </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
  ) : undefined;

  return (
      <>
        <div className="flex justify-center">
          <Input
              className="mb-4 max-w-[300px]"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => {
                setPage(0);
                setSearchTerm(e.target.value);
              }}
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {cardElements.length > 0 ? (
              <>
                {pagination}
                {cardElements}
                {pagination}
              </>
          ) : (
              <p className="text-center text-gray-500">No monsters found matching your search</p>
          )}
        </div>
      </>
  );
}