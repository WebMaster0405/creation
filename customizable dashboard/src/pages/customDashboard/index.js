import React, { useState } from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import AddChartDialog from './AddChartDialog';

const CustomDashboard = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const toggleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  return (
    <div className="content position-relative">
      <div className="container h-100 pt-5 ">
        <h3 className="mb-4">Custom Dashboard</h3>
      </div>
      <Fab
        style={{ bottom: '20px', right: '20px' }}
        color="secondary"
        className="position-absolute"
        aria-label="add chart"
        onClick={() => toggleDialog()}
      >
        <AddIcon />
      </Fab>
      {isOpenDialog && (
        <AddChartDialog isOpen={isOpenDialog} toggleDialog={toggleDialog} />
      )}
    </div>
  );
};

export default CustomDashboard;
