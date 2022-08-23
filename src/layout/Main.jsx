import { useGate, useStore } from "effector-react";

import Movies from "../components/Movies";
import Search from "../components/Search";
import Preloader from "../components/Preloader";
import Pagination from "../components/Pagination";

import { getDataFx, $movies, InitGate } from "../model";

const Main = () => {
  const movies = useStore($movies);
  const isLoading = useStore(getDataFx.pending);

  useGate(InitGate);

  return (
    <main className="container content">
      <Search />
      {isLoading ? <Preloader /> : <Movies movies={movies} />}
      {!isLoading && <Pagination />}
    </main>
  );
};

export default Main;
