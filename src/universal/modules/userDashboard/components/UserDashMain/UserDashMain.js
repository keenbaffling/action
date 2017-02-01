import React, {PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import ui from 'universal/styles/ui';
import UserActions from 'universal/modules/userDashboard/components/UserActions/UserActions';
import UserColumnsContainer from 'universal/modules/userDashboard/containers/UserColumns/UserColumnsContainer';
import UserProjectsHeaderContainer from 'universal/modules/userDashboard/containers/UserProjectsHeader/UserProjectsHeaderContainer';
import {
  DashContent,
  DashHeader,
  DashHeaderInfo,
  DashMain,
  makeDateString
} from 'universal/components/Dashboard';
import getRallyLink from '../../helpers/getRallyLink';
import {Link} from 'react-router';

const UserDashMain = (props) => {
  const {styles} = props;
  const userHasNotifications = true;
  const makeSeparator = () =>
    <span> {'//'} </span>;
  const iconStyle = {
    fontSize: ui.iconSize,
    lineHeight: 'inherit'
  };
  const linkStyle = {
    textDecoration: 'none'
  };
  return (
    <DashMain>
      <DashHeader>
        <DashHeaderInfo title="My Dashboard">
          {makeDateString()}{makeSeparator()}<span className={css(styles.crayCrayHover)}>{getRallyLink()}!</span>
          {userHasNotifications && makeSeparator()}
          {userHasNotifications &&
            <Link to="/me/notifications" style={linkStyle}>
              <FontAwesome name="bell" style={iconStyle} /> See Your Notifications
            </Link>
          }
        </DashHeaderInfo>
      </DashHeader>
      <DashContent padding="0">
        <div className={css(styles.root)}>
          <div className={css(styles.actionsLayout)}>
            <UserActions />
          </div>
          <div className={css(styles.projectsLayout)}>
            <UserProjectsHeaderContainer />
            <UserColumnsContainer/>
          </div>
        </div>
      </DashContent>
    </DashMain>

  );
};

UserDashMain.propTypes = {
  projects: PropTypes.array,
  styles: PropTypes.object
};

const styleThunk = () => ({
  root: {
    display: 'flex',
    flex: 1,
    width: '100%'
  },

  actionsLayout: {
    boxSizing: 'content-box',
    borderRight: `2px solid ${ui.dashBorderColor}`,
    display: 'flex',
    flexDirection: 'column',
    width: ui.dashActionsWidth
  },

  crayCrayHover: {
    color: 'inherit'
  },

  projectsLayout: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '1rem'
  }
});

export default withStyles(styleThunk)(UserDashMain);
