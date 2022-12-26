import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getCommentsQueryParams,
  updateCommentsQueryParams,
} from "../modules/post/postSlice";

const useSyncReduxCommentsParams = () => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector(getCommentsQueryParams);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchSort = searchParams.get("sort");

    if (searchSort) {
      dispatch(updateCommentsQueryParams(searchSort));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSearchParams({
      sort,
    });
    // eslint-disable-next-line
  }, [sort]);
};

export default useSyncReduxCommentsParams;
