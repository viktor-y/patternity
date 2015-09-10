import React, { Component, PropTypes } from 'react';

import ProfilePopoverContent from './profile-popover-content';
import Popover from '../popover.jsx';

class ProfilePopover extends Component {
  static PropTypes = {
    user:         PropTypes.object.isRequired,
    defaultImage: PropTypes.string,
    underAvatar:  PropTypes.node,
    onOpen:       PropTypes.func,
    loading:      PropTypes.bool,
    trigger:      PropTypes.node
  }

  render() {
    const { children, onOpen, trigger, user, defaultImage, underAvatar } = this.props;
    const triggerLink = () => trigger || <a href="javascript://">{user.name}</a>;

    return <Popover ref="profilePopover" className="profile-popover" autoclose={true} onOpen={onOpen}>
      {triggerLink()}
      <ProfilePopoverContent user={user} defaultImage={defaultImage} underAvatar={underAvatar}>
        {children}
      </ProfilePopoverContent>
    </Popover>;
  }
}

export default ProfilePopover;
