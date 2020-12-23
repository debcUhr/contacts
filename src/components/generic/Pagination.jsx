import React from 'react';
import { observer } from 'mobx-react';
import TablePagination from '@material-ui/core/TablePagination';
import store from '../../stores/ContactStore';

const Pagination = observer(() => {
  return (
    <TablePagination
      component="div"
      count={store.contactListCount}
      page={store.currentPagination}
      onChangePage={(e, page) => store.handlePageOnChange(e, page)}
      rowsPerPage={store.rowsPerPage}
      onChangeRowsPerPage={(e) => store.handleRowsPerPageChange(e)}
    />
  );
})

export default Pagination
