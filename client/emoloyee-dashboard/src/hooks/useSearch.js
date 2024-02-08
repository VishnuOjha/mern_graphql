import { useState } from "react";
import debounce from "lodash.debounce";

export default function useSearch() {
  const [search, setSearch] = useState("");

  const onSearch = debounce((e) => {
    setSearch(e);
  }, 400);

  return {
    search,
    onSearch,
  };
}
