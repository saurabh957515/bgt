import { useCallback, useContext } from "react";
import axios from "axios";
import _ from "lodash";
import { FlashContext } from "../FlashContext";
// import { useDispatch } from "react-redux";
// import { tostMessageLoad, setToastMessage } from "../actions";

const getErrors = (errorObj) => {
  let newErrors = {};
  _.forIn(errorObj, function (value, key) {
    newErrors[key] = value.message || value;
  });
  return { errors: newErrors };
};

const useApi = () => {
  //   const dispatch = useDispatch();
  const { setFlash } = useContext(FlashContext);

  const handleError = (err) => {
    let errors = {};
    if (err.response) {
      const status = err.response.status;
      if (status === 400) {
        errors = getErrors(err.response.data.errors || {});
      } else {
        errors.message =
          err.response.data.message || "An error occurred on the server.";
      }
    } else if (err.request) {
      errors.message =
        "No response received from the server. Please check your network.";
    } else {
      errors.message = err.message || "An unknown error occurred.";
    }
    return errors;
  };

  const getRoute = useCallback(
    async (url, params, toast = true, useHeaders = true) => {
      const headers = useHeaders
        ? {
            "Content-Type": "application/json",
          }
        : {};
      try {
        const { data } = await axios.get(url, {
          headers,
          params,
        });
        if (toast) {
          //   dispatch(tostMessageLoad(true));
          //   dispatch(setToastMessage(data?.message));
        }
        return { data }; // Return the data on success
      } catch (err) {
        console.log(err);
        return handleError(err); // Return errors on failure
      }
    },
    []
  );

  const postRoute = useCallback(
    async (url, postData, toast = true, useHeaders = true) => {
      const headers = useHeaders
        ? {
            "Content-Type": "application/json",
          }
        : {};
      try {
        const { data } = await axios.post(url, postData, {
          headers,
        });
        if (toast) {
          setFlash(data?.message, data?.description);
        }
        return { data }; // Return the data on success
      } catch (err) {
        console.log(err);
        return handleError(err); // Return errors on failure
      }
    },
    []
  );

  const deleteById = useCallback(async (url, toast) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { data } = await axios.delete(url, {
        headers,
      });
      if (toast) {
        setFlash(data?.message, data?.description);
      }

      return { data }; // Return the data on success
    } catch (err) {
      return handleError(err); // Return errors on failure
    }
  }, []);

  const editRoute = useCallback(async (url, formData, params = {},toast) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { data } = await axios.patch(url, formData, {
        params,
        headers,
      });
      if (toast) {
        setFlash(data?.message, data?.description);
      }
      // dispatch(tostMessageLoad(true));
      // dispatch(setToastMessage(data?.message));
      return { data }; // Return the data on success
    } catch (err) {
      return handleError(err); // Return errors on failure
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
