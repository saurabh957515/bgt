import { useCallback } from "react";
import axios from "axios";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { tostMessageLoad, setToastMessage } from "../actions";

const getErrors = (errorObj) => {
  let newErrors = {};
  _.forIn(errorObj, function (value, key) {
    newErrors[key] = value.message || value;
  });
  return { errors: newErrors };
};

const useApi = () => {
  const dispatch = useDispatch();

  const handleError = (err) => {
    console.error(err);
    // Trigger a toast message or handle error globally
    return err;
  };

  const getRoute = useCallback(async (url, params) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { data, status } = await axios.get(url, {
        headers,
        params,
      });
      if (data?.errors) {
        return getErrors(data.errors);
      }
      return data;
    } catch (err) {
      return handleError(err);
    }
  }, []);

  const postRoute = useCallback(async (url, postData) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { data } = await axios.post(url, postData, {
        headers,
      });
      if (data?.errors) {
        return getErrors(data.errors);
      }
      dispatch(tostMessageLoad(true));
      dispatch(setToastMessage(data?.message));
      return data;
    } catch (err) {
      return handleError(err);
    }
  }, []);

  const deleteById = useCallback(async (url) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { data } = await axios.delete(url, {
        headers,
      });

      if (data?.errors) {
        return getErrors(data.errors);
      }

      dispatch(tostMessageLoad(true));
      dispatch(setToastMessage(data?.message));
      return data;
    } catch (err) {
      return handleError(err);
    }
  }, []);

  const editRoute = useCallback(async (url, formData, params = {}) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { data } = await axios.patch(url, formData, {
        params,
        headers,
      });
      if (data?.errors) {
        return getErrors(data.errors);
      }
      dispatch(tostMessageLoad(true));
      dispatch(setToastMessage(data?.message));
      return data;
    } catch (err) {
      return handleError(err);
    }
  }, []);

  return {
    getRoute,
    postRoute,
    deleteById,
    editRoute,
  };
};

export default useApi;
