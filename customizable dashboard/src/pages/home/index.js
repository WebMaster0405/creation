import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DashboardLineChart from '../home/components/DashboardLineChart';
import DashboardPieChart from '../home/components/DashboardPieChart';

import { getLayout } from '../../redux/actions/home';

const ResponsiveGridLayout = WidthProvider(Responsive);

const HomeDashboard = (props) => {
  const onBreakpointChangeHandler = (e) => {
    console.log(e);
  };

  const onLayoutChangeHandler = (layout, layouts) => {
    // console.log('layout', layout);
    // console.log('layouts', layouts);
  };

  useEffect(() => {
    props.getLayout();
  }, []);

  return (
    <div className="content">
      <div className="container">
        <ResponsiveGridLayout
          className="layout"
          isDraggable
          isRearrangeable
          isResizable
          layouts={props.layouts}
          draggableHandle=".grid-item"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          onBreakpointChange={(e) => onBreakpointChangeHandler(e)}
          onLayoutChange={(layout, layouts) =>
            onLayoutChangeHandler(layout, layouts)
          }
        >
          <div
            key="graph1"
            className="grid-item p-3"
            data-grid={{ x: 0, y: 0, w: 5, h: 100 }}
          >
            <DashboardLineChart />
          </div>
          <div
            key="graph2"
            className="grid-item p-3"
            data-grid={{ x: 0, y: 0, w: 5, h: 100 }}
          >
            <DashboardPieChart />
          </div>
          <div
            key="graph3"
            className="grid-item p-3"
            data-grid={{ x: 0, y: 0, w: 5, h: 100 }}
          >
            <DashboardLineChart />
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

const mapStateToProps = ({ home: { layouts } }) => ({
  layouts,
});

HomeDashboard.propTypes = {
  getLayout: PropTypes.func.isRequired,
  layouts: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getLayout })(HomeDashboard);
