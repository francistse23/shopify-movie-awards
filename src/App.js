import "./App.css";

import { AppMain, AppTitle, HoverButton } from "./styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { Suspense, useEffect, useState } from "react";
import { replacer, reviver } from "./lib/JSONHelper";

import Loading from "./components/Loading";
import NominationsBanner from "./components/NominationsBanner";
import { ReactQueryDevtools } from "react-query/devtools";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { colors } from "./constants";
import useDebounce from "./components/useDebounce";

const Nominations = React.lazy(() => import("./components/Nominations"));
const queryClient = new QueryClient();

function App() {
  const [nominations, setNominations] = useState(new Map());
  const [inputText, setInputText] = useState("");
  const [page, setPage] = useState(1);

  const { debouncedValue: debouncedInputText, typing } = useDebounce(inputText);

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
          <Suspense fallback={<Loading loading={true} />}>
            <Nominations
              nominations={nominations}
              setNominations={setNominations}
            />
          </Suspense>

          <SearchBar inputText={inputText} setInputText={setInputText} />
        </div>
      </div>

      <SearchResults
        typing={typing}
        inputText={debouncedInputText}
        nominations={nominations}
        setNominations={setNominations}
        page={page}
        setPage={setPage}
      />

      <NominationsBanner numOfNominations={nominations.size} />
      <HoverButton
        aria-label="go back to your nominations"
        name="Go To Your Nominations"
        maxNominations={nominations.size === 5}
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
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  );
}

export default AppWithQueryClient;
