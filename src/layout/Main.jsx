import { useEffect } from "react";
import { useStore } from "effector-react";

import Movies from "../components/Movies";
import Search from "../components/Search";
import Preloader from "../components/Preloader";
import Pagination from "../components/Pagination";

import { $isLoading, $movies, $search, $total, getData } from "../model/model";

const Main = () => {
  const movies = useStore($movies);
  const search = useStore($search);
  const total = useStore($total);
  const isLoading = useStore($isLoading);

  useEffect(() => {
    getData({ search });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container content">
      <Search />
      {isLoading ? <Preloader /> : <Movies movies={movies} />}
      {total > 10 && <Pagination />}
    </main>
  );
};

export default Main;
