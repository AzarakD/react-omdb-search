import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";
import { createGate } from "effector-react";
import { API_HOST } from "../constants";

const PER_PAGE = 10;

export const InitGate = createGate();

// ===== Event =====

export const getDataFx = createEffect(async (params) => {
  const { search = $userInput.getState(), type, page } = params;

  let url = `${API_HOST}&s=${search}`;

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

export const userInputSet = createEvent();
export const typeSet = createEvent();
export const currentPageSet = createEvent();

// ===== Store =====

export const $userInput = createStore("Matrix")
  .on(userInputSet, (_, payload) => payload)
  .on(getDataFx, (prev) => {
    if (!prev) return $currentSearch.getState();
  });

export const $type = createStore("all").on(typeSet, (_, payload) => payload);

export const $movies = createStore([]).on(
  getDataFx.doneData,
  (_, data) => data.Search
);

export const $currentPage = createStore(1)
  .on(currentPageSet, (_, payload) => payload)
  .reset(typeSet);

export const $pagesCount = createStore(0).on(getDataFx.doneData, (_, data) =>
  Math.ceil(data.totalResults / PER_PAGE)
);

const $currentSearch = createStore("").on(getDataFx, () =>
  $userInput.getState()
);

// ===== Logic Workflow =====

forward({
  from: InitGate.open,
  to: getDataFx,
});

sample({
  clock: typeSet,
  source: $userInput,
  fn: (userInput) => ({
    search: userInput ? userInput : $currentSearch.getState(),
    type: $type.getState(),
  }),
  target: getDataFx,
});

sample({
  clock: currentPageSet,
  source: $currentSearch,
  filter: (search) => search.length,
  fn: (search) => ({
    search: search,
    type: $type.getState(),
    page: $currentPage.getState(),
  }),
  target: getDataFx,
});
