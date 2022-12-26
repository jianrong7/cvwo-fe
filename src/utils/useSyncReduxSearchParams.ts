import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getQueryParams,
  updateQueryParamsTags,
  updateQueryParamsSearch,
  updateQueryParamsSort,
} from "../modules/posts/postsSlice";

const useSyncReduxSearchParams = () => {
  const dispatch = useAppDispatch();
  const { tags, search, sort } = useAppSelector(getQueryParams);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchTags = searchParams.get("tags");
    const searchSearch = searchParams.get("search");
    const searchSort = searchParams.get("sort");

    if (searchTags) {
      dispatch(updateQueryParamsTags(searchTags));
    }
    if (searchSearch) {
      dispatch(updateQueryParamsSearch(searchSearch));
    }
    if (searchSort) {
      dispatch(updateQueryParamsSort(searchSort));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSearchParams({
      tags,
      search,
      sort,
    });
    // eslint-disable-next-line
  }, [tags, search, sort]);
};

export default useSyncReduxSearchParams;
