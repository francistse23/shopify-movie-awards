import * as SC from "./styledComponents";

import { QueryClient, QueryClientProvider } from "react-query";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { replacer, reviver } from "./lib/JSONHelper";

import Loading from "./components/Loading";
import NominationsBanner from "./components/NominationsBanner";
import SearchBar from "./components/SearchBar";
import { colors } from "./constants";
import useDebounce from "./components/useDebounce";

const { AppHeader, AppMain, AppTitle, HoverButton } = SC;

const Nominations = React.lazy(() => import("./components/Nominations"));
const SearchResults = React.lazy(() => import("./components/SearchResults"));
const queryClient = new QueryClient();

export function enableButton(nominationsRef, setShowButton) {
  if (
    window.scrollY >
    nominationsRef.current?.offsetHeight + nominationsRef.current?.offsetTop
  )
    setShowButton(true);
  else setShowButton(false);
}

function App() {
  const [nominations, setNominations] = useState(new Map());
  const [inputText, setInputText] = useState("");
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const nominationsRef = useRef(null);

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

  useEffect(() => {
    window.addEventListener(
      "scroll",
      enableButton(nominationsRef, setShowButton)
    );

    return () =>
      window.removeEventListener(
        "scroll",
        enableButton(nominationsRef, setShowButton)
      );
  }, [showButton]);

  useEffect(() => setPage(1), [inputText]);

  return (
    <AppMain>
      <AppHeader>
        <AppTitle data-testid="app-title">The Shoppies</AppTitle>
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
              reference={nominationsRef}
            />
          </Suspense>

          <SearchBar inputText={inputText} setInputText={setInputText} />
        </div>
      </AppHeader>

      <Suspense fallback={<Loading loading={true} />}>
        <SearchResults
          typing={typing}
          inputText={debouncedInputText}
          nominations={nominations}
          setNominations={setNominations}
          page={page}
          setPage={setPage}
        />
      </Suspense>

      <NominationsBanner numOfNominations={nominations.size} />
      {nominations.size > 0 && showButton && (
        <HoverButton
          aria-label="go back to your nominations"
          data-testid="hover-button"
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
      )}
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
