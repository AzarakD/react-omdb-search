import { createEffect, createEvent, createStore, sample } from "effector";
import { API_HOST } from "../constants";

export const getData = createEffect(async (params) => {
  const { search, type, page } = params;
  let url = `${API_HOST}&s=${search}`;

  console.log(params);

  if (type) {
    url += `&type=${type !== "all" ? type : ""}`;
  }
  if (page) {
    url += `&page=${page}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
});

export const setSearch = createEvent();
export const setType = createEvent();
export const setCurrentPage = createEvent();

export const $search = createStore("Matrix").on(
  setSearch,
  (_, payload) => payload
);
export const $type = createStore("all").on(setType, (_, payload) => payload);
export const $currentPage = createStore(1).on(
  setCurrentPage,
  (_, payload) => payload
);
export const $isLoading = createStore(false)
  .on(getData, () => true)
  .on(getData.done, () => false);
export const $movies = createStore([]).on(
  getData.doneData,
  (_, data) => data.Search
);
export const $total = createStore(null).on(
  getData.doneData,
  (_, data) => data.totalResults
);

sample({
  source: $currentPage,
  clock: setCurrentPage,
  fn: (page) => ({
    search: $search.getState(),
    type: $type.getState(),
    page: page,
  }),
  target: getData,
});
