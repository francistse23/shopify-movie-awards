import "./App.css";

import { AppMain, AppTitle, HoverButton } from "./styled-components";
import React, { Suspense, useEffect, useState } from "react";
import { replacer, reviver } from "./lib/JSONHelper";

import Loading from "./components/Loading";
import Movie from "./components/Movie";
import NominationsBanner from "./components/NominationsBanner";
import PaginationFooter from "./components/PaginationFooter";
import SearchBar from "./components/SearchBar";
import { colors } from "./constants";
import useDebouncedSearch from "./components/useDebouncedSearch";

const Nominations = React.lazy(() => import("./components/Nominations"));
const SearchResults = React.lazy(() => import("./components/SearchResults"));
const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

function App() {
  const [nominations, setNominations] = useState(new Map());

  const { localStorage } = window;

  const useSearchOMDB = () =>
    useDebouncedSearch((text, page) => searchMovies(text, page));

  const {
    inputText,
    setInputText,
    searchResults,
    page,
    setPage,
  } = useSearchOMDB();

  // need seperate call to get plot (short/full)
  async function searchMovies(text, page) {
    try {
      const res = await (
        await fetch(
          `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${text}&type=movie&page=${page}`
        )
      ).json();

      const moviesWithPlot = await Promise.all(
        res.Search?.map(async ({ imdbID }) => {
          const movie = (
            await fetch(
              `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}&type=movie&plot=full`
            )
          ).json();

          return movie;
        })
      );

      res.Search = moviesWithPlot;

      return res;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (
      localStorage.length === 0 ||
      !localStorage.getItem("shopify_the_shoppies_nominations")
    ) {
      const str = JSON.stringify(new Map(), replacer);
      localStorage.setItem("shopify_the_shoppies_nominations", str);
    } else {
      const storedNominations = JSON.parse(
        localStorage.getItem("shopify_the_shoppies_nominations"),
        reviver
      );

      setNominations(storedNominations);
    }
  }, [localStorage]);

  return (
    <AppMain>
      <Suspense fallback={<Loading />}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            height: "100%",
          }}
        >
          <AppTitle>The Shoppies</AppTitle>
          <div
            style={{
              backgroundColor: colors.mainColor,
              width: "100%",
              scrollbarColor: "transparent transparent",
            }}
          >
            <Nominations nominations={nominations} />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {[...nominations.values()].map(
                ({ Title, Year, Poster, imdbID }) => (
                  <Movie
                    key={imdbID}
                    Title={Title}
                    Year={Year}
                    Poster={Poster}
                    imdbID={imdbID}
                    nominations={nominations}
                    setNominations={setNominations}
                    isNominations={true}
                  />
                )
              )}
            </div>
            <SearchBar
              inputText={inputText}
              setInputText={setInputText}
              searchMovies={searchMovies}
            />
          </div>
        </div>
      </Suspense>
      {/* <AppBody> */}
      <Suspense fallback={<Loading />}>
        <SearchResults
          inputText={inputText}
          // searchResults={searchResults}
          searchResults={{
            status: "success",
            loading: false,
            result: {
              Search: [
                {
                  Title: "Iron Man",
                  Year: "2008",
                  Rated: "PG-13",
                  Released: "02 May 2008",
                  Runtime: "126 min",
                  Genre: "Action, Adventure, Sci-Fi",
                  Director: "Jon Favreau",
                  Writer:
                    "Mark Fergus (screenplay), Hawk Ostby (screenplay), Art Marcum (screenplay), Matt Holloway (screenplay), Stan Lee (characters), Don Heck (characters), Larry Lieber (characters), Jack Kirby (characters)",
                  Actors:
                    "Robert Downey Jr., Terrence Howard, Jeff Bridges, Gwyneth Paltrow",
                  Plot:
                    "Tony Stark. Genius, billionaire, playboy, philanthropist. Son of legendary inventor and weapons contractor Howard Stark. When Tony Stark is assigned to give a weapons presentation to an Iraqi unit led by Lt. Col. James Rhodes, he's given a ride on enemy lines. That ride ends badly when Stark's Humvee that he's riding in is attacked by enemy combatants. He survives - barely - with a chest full of shrapnel and a car battery attached to his heart. In order to survive he comes up with a way to miniaturize the battery and figures out that the battery can power something else. Thus Iron Man is born. He uses the primitive device to escape from the cave in Iraq. Once back home, he then begins work on perfecting the Iron Man suit. But the man who was put in charge of Stark Industries has plans of his own to take over Tony's technology for other matters.",
                  Language:
                    "English, Persian, Urdu, Arabic, Kurdish, Hindi, Hungarian",
                  Country: "USA, Canada",
                  Awards:
                    "Nominated for 2 Oscars. Another 22 wins & 70 nominations.",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "7.9/10" },
                    { Source: "Rotten Tomatoes", Value: "94%" },
                    { Source: "Metacritic", Value: "79/100" },
                  ],
                  Metascore: "79",
                  imdbRating: "7.9",
                  imdbVotes: "930,966",
                  imdbID: "tt0371746",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "N/A",
                  Production: "Marvel Enterprises, Paramount",
                  Website: "N/A",
                  Response: "True",
                },
                {
                  Title: "Iron Man 3",
                  Year: "2013",
                  Rated: "PG-13",
                  Released: "03 May 2013",
                  Runtime: "130 min",
                  Genre: "Action, Adventure, Sci-Fi",
                  Director: "Shane Black",
                  Writer:
                    'Drew Pearce (screenplay by), Shane Black (screenplay by), Stan Lee (based on the Marvel comic book by), Don Heck (based on the Marvel comic book by), Larry Lieber (based on the Marvel comic book by), Jack Kirby (based on the Marvel comic book by), Warren Ellis (based on the "Extremis" mini-series written by), Adi Granov (based on the "Extremis" mini-series illustrated by)',
                  Actors:
                    "Robert Downey Jr., Gwyneth Paltrow, Don Cheadle, Guy Pearce",
                  Plot:
                    "Marvel's \"Iron Man 3\" pits brash-but-brilliant industrialist Tony Stark/Iron Man against an enemy whose reach knows no bounds. When Stark finds his personal world destroyed at his enemy's hands, he embarks on a harrowing quest to find those responsible. This journey, at every turn, will test his mettle. With his back against the wall, Stark is left to survive by his own devices, relying on his ingenuity and instincts to protect those closest to him. As he fights his way back, Stark discovers the answer to the question that has secretly haunted him: does the man make the suit or does the suit make the man?",
                  Language: "English",
                  Country: "USA",
                  Awards:
                    "Nominated for 1 Oscar. Another 20 wins & 62 nominations.",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "7.2/10" },
                    { Source: "Rotten Tomatoes", Value: "79%" },
                    { Source: "Metacritic", Value: "62/100" },
                  ],
                  Metascore: "62",
                  imdbRating: "7.2",
                  imdbVotes: "748,737",
                  imdbID: "tt1300854",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "$409,013,994",
                  Production: "Marvel Studios",
                  Website: "N/A",
                  Response: "True",
                },
                {
                  Title: "Iron Man 2",
                  Year: "2010",
                  Rated: "PG-13",
                  Released: "07 May 2010",
                  Runtime: "124 min",
                  Genre: "Action, Adventure, Sci-Fi",
                  Director: "Jon Favreau",
                  Writer:
                    "Justin Theroux (screenplay), Stan Lee (Marvel comic book), Don Heck (Marvel comic book), Larry Lieber (Marvel comic book), Jack Kirby (Marvel comic book)",
                  Actors:
                    "Robert Downey Jr., Gwyneth Paltrow, Don Cheadle, Scarlett Johansson",
                  Plot:
                    'With the world now aware of his dual life as the armored superhero Iron Man, billionaire inventor Tony Stark faces pressure from the government, the press, and the public to share his technology with the military. Unwilling to let go of his invention, Stark, along with Pepper Potts, and James "Rhodey" Rhodes at his side, must forge new alliances - and confront powerful enemies.',
                  Language: "English, French, Russian",
                  Country: "USA",
                  Awards:
                    "Nominated for 1 Oscar. Another 7 wins & 43 nominations.",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "7.0/10" },
                    { Source: "Rotten Tomatoes", Value: "72%" },
                    { Source: "Metacritic", Value: "57/100" },
                  ],
                  Metascore: "57",
                  imdbRating: "7.0",
                  imdbVotes: "716,181",
                  imdbID: "tt1228705",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "$312,433,331",
                  Production: "Marvel Studios",
                  Website: "N/A",
                  Response: "True",
                },
                {
                  Title: "The Man in the Iron Mask",
                  Year: "1998",
                  Rated: "PG-13",
                  Released: "13 Mar 1998",
                  Runtime: "132 min",
                  Genre: "Action, Adventure, Drama",
                  Director: "Randall Wallace",
                  Writer:
                    "Alexandre Dumas (novels), Randall Wallace (screenplay)",
                  Actors:
                    "Leonardo DiCaprio, Jeremy Irons, John Malkovich, Gérard Depardieu",
                  Plot:
                    "Paris is starving, but the King of France is more interested in money and bedding women. When a young soldier dies for the sake of a shag, Aramis, Athos and Porthos band together with a plan to replace the king. Unknown to many, there is a 2nd king, a twin, hidden at birth, then imprisoned for 6 years behind an iron mask. All that remains now is D'Artagnan, will he stand against his long time friends, or do what is best for his country?",
                  Language: "English, Italian",
                  Country: "France, USA",
                  Awards: "3 wins & 4 nominations.",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BZjM2YzcxMmQtOTc2Mi00YjdhLWFlZjUtNmFmMDQzYzU2YTk5L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "6.5/10" },
                    { Source: "Rotten Tomatoes", Value: "32%" },
                    { Source: "Metacritic", Value: "48/100" },
                  ],
                  Metascore: "48",
                  imdbRating: "6.5",
                  imdbVotes: "155,660",
                  imdbID: "tt0120744",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "$56,968,902",
                  Production: "United Artists",
                  Website: "N/A",
                  Response: "True",
                },
                {
                  Title: "The Man with the Iron Fists",
                  Year: "2012",
                  Rated: "R",
                  Released: "02 Nov 2012",
                  Runtime: "95 min",
                  Genre: "Action",
                  Director: "RZA",
                  Writer:
                    "RZA (story), RZA (screenplay), Eli Roth (screenplay)",
                  Actors: "RZA, Rick Yune, Russell Crowe, Lucy Liu",
                  Plot:
                    "In Jungle Village, the leader of the Lion's clan Gold Lion is summoned by the Governor and assigned to protect his gold that will be transported through the village. However he is betrayed and murdered by the greedy Silver Lion and Bronze Lion. Gold Lion's favorite son Zen Yi, a.k.a. The X-Blade, seeks revenge and heads to Jungle Village, but he is defeated by Brass Body and rescued by the local Blacksmith Thaddeus. Meanwhile the Gemini Female and the Gemini Male protect the Governor's gold, but they are vanquished by the army of Silver and Bronze Lion. The Blacksmith is abducted by the Lions and has his arms severed by Brass Body. However he is saved by the British Jack Knife, who is the emissary of the Emperor, and he manufactures iron arms for Thaddeus. Meanwhile the Governor sends the Jackal army to fight against the Lions and they hide the gold in the brothel of Madam Blossom. However, Madam Blossom and his girls form an army of black widows and together with Jack, Zen Yi and The Blacksmith, they fight against the Lions.",
                  Language: "English, Mandarin",
                  Country: "USA, Hong Kong",
                  Awards: "4 nominations.",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BMTg5ODI3ODkzOV5BMl5BanBnXkFtZTcwMTQxNjUwOA@@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "5.4/10" },
                    { Source: "Rotten Tomatoes", Value: "51%" },
                    { Source: "Metacritic", Value: "51/100" },
                  ],
                  Metascore: "51",
                  imdbRating: "5.4",
                  imdbVotes: "60,279",
                  imdbID: "tt1258972",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "$15,634,090",
                  Production: "Arcade",
                  Website: "N/A",
                  Response: "True",
                },
                {
                  Title: "Tetsuo: The Iron Man",
                  Year: "1989",
                  Rated: "Not Rated",
                  Released: "01 Jul 1989",
                  Runtime: "67 min",
                  Genre: "Fantasy, Horror, Sci-Fi",
                  Director: "Shin'ya Tsukamoto",
                  Writer: "Shin'ya Tsukamoto",
                  Actors:
                    "Tomorô Taguchi, Kei Fujiwara, Nobu Kanaoka, Shin'ya Tsukamoto",
                  Plot:
                    'A strange man known only as the "metal fetishist", who seems to have an insane compulsion to stick scrap metal into his body, is hit and possibly killed by a Japanese "salaryman", out for a drive with his girlfriend. The salaryman then notices that he is being slowly overtaken by some kind of disease that is turning his body into scrap metal, and that his nemesis is not in fact dead but is somehow masterminding and guiding his rage and frustration-fueled transformation.',
                  Language: "Japanese",
                  Country: "Japan",
                  Awards: "2 wins.",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BODYxZTIwMWQtZTdiMS00ODRmLThlODEtNjkwNmE1ZTY1ZjM1XkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "7.0/10" },
                    { Source: "Rotten Tomatoes", Value: "79%" },
                  ],
                  Metascore: "N/A",
                  imdbRating: "7.0",
                  imdbVotes: "19,355",
                  imdbID: "tt0096251",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "N/A",
                  Production: "Palisades Tartan Films",
                  Website: "N/A",
                  Response: "True",
                },
                {
                  Title: "The Man with the Iron Heart",
                  Year: "2017",
                  Rated: "R",
                  Released: "07 Jun 2017",
                  Runtime: "120 min",
                  Genre: "Action, Biography, Thriller, War",
                  Director: "Cédric Jimenez",
                  Writer:
                    "Laurent Binet (based on the novel by), David Farr (screenplay by), Audrey Diwan (screenplay by), Cédric Jimenez (screenplay by)",
                  Actors:
                    "Jason Clarke, Rosamund Pike, Jack O'Connell, Jack Reynor",
                  Plot:
                    '1942: The Third Reich is at its peak. The Czech resistance in London decides to plan the most ambitious military operation of WWII: Anthropoid. Two young recruits in their late twenties, Jozef Gabcik and Jan Kubis, are sent to Prague to assassinate the most ruthless Nazi leader - Reich-protector Reinhard Heydrich, Head of the SS, the Gestapo, and the architect of the "Final Solution".',
                  Language: "English, German, Czech, Latin, French",
                  Country: "USA, France, UK, Belgium, Germany",
                  Awards: "3 nominations.",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BMWZkZjRkOTYtMmVhZC00NGFhLWE0ZmUtOGFhOTg4ZmRkNDY3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "6.4/10" },
                    { Source: "Rotten Tomatoes", Value: "67%" },
                  ],
                  Metascore: "N/A",
                  imdbRating: "6.4",
                  imdbVotes: "13,855",
                  imdbID: "tt3296908",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "N/A",
                  Production:
                    "Red Crown Productions, Echo Lake Entertainment, Nexus Factory, Cutting Edge Entertainment",
                  Website: "N/A",
                  Response: "True",
                },
                {
                  Title: "The Invincible Iron Man",
                  Year: "2007",
                  Rated: "PG-13",
                  Released: "23 Jan 2007",
                  Runtime: "83 min",
                  Genre: "Animation, Action, Adventure, Fantasy, Sci-Fi",
                  Director: "Patrick Archibald, Jay Oliva, Frank Paur",
                  Writer:
                    "Avi Arad (story), Greg Johnson (story), Craig Kyle (story), Greg Johnson (screenplay), Stan Lee (comic book), Don Heck (comic book), Larry Lieber (comic book), Jack Kirby (comic book)",
                  Actors:
                    "Marc Worden, Gwendoline Yeo, Fred Tatasciore, Rodney Saulsberry",
                  Plot:
                    'Billionaire inventor Tony Stark digs up far more than he bargained for. He unleashes an age-old prophecy that foretells the resurrection of the Mandarin, the emperor of China\'s darkest and most violent dynasty. When his best friend James "Rhodey" Rhodes has been kidnapped, Tony travels to China to investigate, he is captured and badly injured by the Jade Dragons, his life only saved thanks to a Chinese shaman and Rhodes\' skills as an army medic after a piece of shrapnel damages his heart. In order to confront the destructive force in this ultimate battle, Tony creates an armored suit infused with high-tech weaponry. To stop the evil that he himself has raised form the earth, Tony must become his greatest invention ever which becomes known as "Iron Man"! The newly born champion must travel to the four corners of the earth to battle the Mandarin\'s henchmen, the Elementals four magical warriors who harness the power of the elements earth, water, wind, and fire with deadly chemistry.',
                  Language: "English",
                  Country: "USA",
                  Awards: "2 nominations.",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BOGRmZDg1YjMtMDA5YS00OTFjLTgyMjQtNDgzNTIyNzAwZDg0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "5.9/10" },
                    { Source: "Rotten Tomatoes", Value: "46%" },
                  ],
                  Metascore: "N/A",
                  imdbRating: "5.9",
                  imdbVotes: "6,915",
                  imdbID: "tt0903135",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "N/A",
                  Production: "Marvel Studios Inc., Marvel Enterprises",
                  Website: "N/A",
                  Response: "True",
                },
                {
                  Title: "Iron Man: Rise of Technovore",
                  Year: "2013",
                  Rated: "PG-13",
                  Released: "09 Apr 2013",
                  Runtime: "88 min",
                  Genre: "Animation, Action, Sci-Fi",
                  Director: "Hiroshi Hamazaki",
                  Writer:
                    "Stan Lee (based on the Marvel comics by), Don Heck (based on the Marvel comics by), Larry Lieber (based on the Marvel comics by), Jack Kirby (based on the Marvel comics by), Brandon Auman (story), Kengo Kaji (screenplay)",
                  Actors:
                    "Norman Reedus, Matthew Mercer, Eric Bauza, Kate Higgins",
                  Plot:
                    "The young and insane tech genius Ezekiel Stane has developed a new techno-organic armor that seemingly outclasses Iron Man. When Stane unleashes a terrorist attack during the launch of Tony Stark's newest satellite, Iron Man is blamed. Now he must evade S.H.I.E.L.D.'s man hunt and find a way to clear his name.",
                  Language: "N/A",
                  Country: "Japan",
                  Awards: "1 nomination.",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BNGJkNDQwNzUtNWE0MC00MGVjLWFjMjEtODMyNTExMTU4ZDRhL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "5.3/10" },
                    { Source: "Rotten Tomatoes", Value: "34%" },
                  ],
                  Metascore: "N/A",
                  imdbRating: "5.3",
                  imdbVotes: "3,883",
                  imdbID: "tt2654124",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "N/A",
                  Production:
                    "Madhouse Entertainment, Sony Pictures Entertainment",
                  Website: "N/A",
                  Response: "True",
                },
                {
                  Title: "The Man with the Iron Fists 2",
                  Year: "2015",
                  Rated: "R",
                  Released: "14 Apr 2015",
                  Runtime: "90 min",
                  Genre: "Action",
                  Director: "Roel Reiné",
                  Writer:
                    "John Jarrell (screenplay by), RZA (screenplay by), RZA (story by)",
                  Actors:
                    "RZA, Schnitrnunt Busarakamwong, Grace Huang, Andrew Lin",
                  Plot:
                    "When a stranger, Thaddeus, is found badly wounded near the village, miner Li Kung and his wife Ah Ni offer him refuge. As he heals, he becomes entrenched in a conflict that pits the townsfolk against the evil Master Ho, his nefarious Beetle Clan and the terrifying Lord Pi.",
                  Language: "English, Japanese",
                  Country: "USA, Hong Kong, Thailand",
                  Awards: "N/A",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BODkyMTMwMjA0Nl5BMl5BanBnXkFtZTgwMzQ3MDc4NDE@._V1_SX300.jpg",
                  Ratings: [
                    { Source: "Internet Movie Database", Value: "4.4/10" },
                    { Source: "Rotten Tomatoes", Value: "24%" },
                  ],
                  Metascore: "N/A",
                  imdbRating: "4.4",
                  imdbVotes: "3,846",
                  imdbID: "tt3625152",
                  Type: "movie",
                  DVD: "N/A",
                  BoxOffice: "N/A",
                  Production:
                    "Iron Fists, Living Films, Arcade Pictures, Universal 1440 Entertainment",
                  Website: "N/A",
                  Response: "True",
                },
              ],
              totalResults: "79",
              Response: "True",
            },
            currentPromise: {},
            currentParams: [null, "iron man", 1],
          }}
          nominations={nominations}
          setNominations={setNominations}
          setInputText={setInputText}
          searchMovies={searchMovies}
        />

        {/* {searchResults?.result?.Search?.length && ( */}
        <PaginationFooter
          page={page}
          setPage={setPage}
          // searchResults?.result?.totalResults
          totalResults={Number(79)}
        />
        {/* // )} */}
      </Suspense>
      {/* </AppBody> */}

      <NominationsBanner nominations={nominations} />
      <HoverButton
        aria-label="go back to your nominations"
        name="Your Nominations"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("nominations").scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        <span aria-label="trophy" role="img" style={{ fontSize: "24px" }}>
          🏆
        </span>
      </HoverButton>
    </AppMain>
  );
}

export default App;
