import "./App.css";

import { AppMain, AppTitle, HoverButton } from "./styled-components";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import React, { Suspense, useEffect, useState } from "react";
import { replacer, reviver } from "./lib/JSONHelper";

import Loading from "./components/Loading";
import NominationsBanner from "./components/NominationsBanner";
import SearchBar from "./components/SearchBar";
import { colors } from "./constants";
import useDebounce from "./components/useDebounce";

const Nominations = React.lazy(() => import("./components/Nominations"));
const SearchResults = React.lazy(() => import("./components/SearchResults"));
const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;
const queryClient = new QueryClient();

function App() {
  const [nominations, setNominations] = useState(new Map());
  const [inputText, setInputText] = useState("");
  const [page, setPage] = useState(1);

  const debouncedInputText = useDebounce(inputText);

  const queriedResult = useQuery(
    [inputText, page],
    async () => {
      try {
        const res = await (
          await fetch(
            `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${inputText}&type=movie&page=${page}`
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
    },
    { enabled: !!debouncedInputText }
  );

  const {
    data: { Search: searchResults } = {},
    isLoading = true,
    isError,
  } = queriedResult;

  const { localStorage } = window;

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
      <Suspense fallback={<Loading loading={isLoading} />}>
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
            }}
          >
            <Nominations
              nominations={nominations}
              setNominations={setNominations}
            />

            <SearchBar inputText={inputText} setInputText={setInputText} />
          </div>
        </div>
      </Suspense>

      <Suspense
        fallback={<Loading loading={isLoading} />}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <SearchResults
          queryState={{ isLoading, isError }}
          inputText={inputText}
          searchResults={searchResults}
          nominations={nominations}
          setNominations={setNominations}
          page={page}
          setPage={setPage}
        />
      </Suspense>

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

function AppWithQueryClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppWithQueryClient;
