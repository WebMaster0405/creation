import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { TextField } from '@material-ui/core';

import XLSX from 'xlsx';

import format from 'date-fns/format';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import darkColorGenerator from '../../utils/darkColorGenerator';
import CHART_TYPES from '../../constants/chartTypes';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddChartDialog = ({ toggleDialog, isOpen }) => {
  const classes = useStyles();
  const [fileInfo, setFileInfo] = useState({});
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({
    title: '',
    xAxis: '',
    yAxis: '',
    lines: [],
  });

  const [chartType, setChartTypes] = useState(CHART_TYPES.line);

  const getFile = async (event) => {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      const f = files[0];
      const { name, type, size, lastModified } = f;
      setFileInfo({ ...fileInfo, name, type, size, lastModified });

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const arrResult = XLSX.utils.sheet_to_json(sheet);
        setData(arrResult);
      };
      reader.readAsArrayBuffer(f);
    }
  };

  const handleBaseChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const sizeFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit clicked');
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={toggleDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Customize Chart
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className="row h-100 pt-4">
            <div className="col-6 border-end h-100">
              <DialogContentText>
                Click the button below to upload .xlsx file which contains your
                data
              </DialogContentText>
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden onChange={getFile} />
              </Button>
              {Object.keys(fileInfo).length > 0 && (
                <div className="mt-4">
                  <h2>File Information</h2>
                  <dl className="row">
                    <dt className="col-sm-3">Name</dt>
                    <dd className="col-sm-9">: {fileInfo.name}</dd>

                    <dt className="col-sm-3">Size</dt>
                    <dd className="col-sm-9">
                      : {sizeFormatter.format(fileInfo.size / 1000000)} MB
                    </dd>

                    <dt className="col-sm-3">Type</dt>
                    <dd className="col-sm-9">: {fileInfo.type}</dd>

                    <dt className="col-sm-3">Last Modified</dt>
                    <dd className="col-sm-9">
                      : {format(fileInfo.lastModified, 'dd-MM-yyyy HH:mm:ss')}
                    </dd>

                    <dt className="col-sm-3">Record Count</dt>
                    <dd className="col-sm-9">: {data.length}</dd>
                  </dl>
                </div>
              )}
            </div>
            <div className="col-6">
              <h2>Customization Panel</h2>
              {data.length > 0 && (
                <>
                  <div className="mt-4" style={{ minHeight: '300px' }}>
                    <div className="d-flex align-items-center mb-4">
                      <h5 className="m-0 me-4">Chart Type</h5>
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        {Object.keys(CHART_TYPES).map((key) => (
                          <Button
                            key={key}
                            variant={
                              chartType === CHART_TYPES[key]
                                ? 'contained'
                                : 'outlined'
                            }
                            onClick={() => setChartTypes(CHART_TYPES[key])}
                            className="text-capitalize"
                          >
                            {key}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={inputs.xAxis} />
                        <YAxis
                          dataKey={inputs.yAxis ? inputs.yAxis : undefined}
                        />
                        <Tooltip />
                        <Legend />
                        {inputs.lines.map((line) => (
                          <Line
                            key={line}
                            type="monotone"
                            dataKey={line}
                            stroke={darkColorGenerator()}
                          />
                        ))}
                        {/* <Line type="monotone" dataKey="uv" stroke="#00001b" /> */}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  {/* <div className="row mt-5">
                    
                  </div> */}
                  {/* <div className="row gx-5 gy-4 pt-3"> */}
                  <form className="row gx-5 gy-4 pt-3" onSubmit={handleSubmit}>
                    <div className="col-12">
                      <TextField
                        id="title"
                        label="Chart Title"
                        name="title"
                        fullWidth
                        required
                        onInput={handleBaseChange}
                      />
                    </div>
                    <div className="col-6">
                      <InputLabel id="x-axis">X Axis</InputLabel>
                      <Select
                        labelId="x-axis"
                        id="x-axis"
                        name="xAxis"
                        value={inputs.xAxis}
                        fullWidth
                        required
                        onChange={handleBaseChange}
                      >
                        {Object.keys(data[0]).map((key) => (
                          <MenuItem key={key} value={key}>
                            {key}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="col-6">
                      <InputLabel id="y-axis">Y Axis</InputLabel>
                      <Select
                        labelId="y-axis"
                        id="y-axis"
                        name="yAxis"
                        value={inputs.yAxis}
                        fullWidth
                        onChange={handleBaseChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {Object.keys(data[0]).map((key) => (
                          <MenuItem key={key} value={key}>
                            {key}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="col-6" key="x">
                      <InputLabel id="lines">Lines</InputLabel>
                      <Select
                        labelId="lines"
                        id="lines"
                        name="lines"
                        multiple
                        value={inputs.lines}
                        fullWidth
                        required
                        onChange={handleBaseChange}
                      >
                        {Object.keys(data[0]).map((key) => (
                          <MenuItem key={key} value={key}>
                            {key}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="col-12">
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        className="w-100"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                  {/* </div> */}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

AddChartDialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default AddChartDialog;
