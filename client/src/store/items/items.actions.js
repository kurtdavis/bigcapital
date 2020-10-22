import ApiService from 'services/ApiService';
import t from 'store/types';

export const submitItem = ({ form }) => {
  return (dispatch) => ApiService.post(`items`, form);
};

export const editItem = ({ id, form }) => {
  return (dispatch) => ApiService.post(`items/${id}`, form);
};

export const fetchItems = ({ query }) => {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const pageQuery = getState().items.tableQuery;

      dispatch({
        type: t.ITEMS_TABLE_LOADING,
        payload: { loading: true },
      });
      ApiService.get(`items`, { params: { ...pageQuery, ...query } })
        .then((response) => {
          dispatch({
            type: t.ITEMS_SET,
            items: response.data.items,
          });
          dispatch({
            type: t.ITEMS_PAGE_SET,
            items: response.data.items,
            customViewId: response.data?.filter_meta?.view?.custom_view_id,
            paginationMeta: response.data.pagination,
          });
          dispatch({
            type: t.ITEMS_TABLE_LOADING,
            payload: { loading: false },
          });
          dispatch({
            type: t.SET_DASHBOARD_REQUEST_COMPLETED,
          });
          resolve(response);
        })
        .catch((error) => {
          dispatch({
            type: t.SET_DASHBOARD_REQUEST_COMPLETED,
          });
          reject(error);
        });
    });
};

export const fetchItem = ({ id }) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      ApiService.get(`items/${id}`)
        .then((response) => {
          dispatch({
            type: t.ITEM_SET,
            item: response.data.item,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
};

export const deleteItem = ({ id }) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      ApiService.delete(`items/${id}`)
        .then((response) => {
          dispatch({
            type: t.ITEM_DELETE,
            payload: { id },
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
};

export const deleteBulkItems = ({ ids }) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      ApiService.delete('items', { params: { ids } })
        .then((response) => {
          dispatch({
            type: t.ITEMS_BULK_DELETE,
            payload: { ids },
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error.response.data.errors || []);
        });
    });
};
