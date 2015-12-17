import React, { Component, PropTypes } from 'react';
import TetherElement from 'react-tether'
import PopoverContent from './popover-content';

//import style from './_popover.scss';

class Popover extends Component {
  static propTypes = {
    isOpen:            PropTypes.bool.isRequired,
    position:          PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    containerSelector: PropTypes.string,
    element:           PropTypes.any.isRequired,
    onOpen:            PropTypes.func,

    style: PropTypes.shape({
      background:  PropTypes.string.isRequired,
      borderColor: function(props, propName) {
        let borderColor = props.borderColor || '';
        if (borderColor.length > 0 && /rgba/.test(props.background)) {
          return new Error('Cannot use border with transparent background');
        }
      }
    }),
    className:          PropTypes.string
  }

  static defaultProps = {
    isOpen:            false,
    position:          'top',
    containerSelector: 'body',
    onOpen:            function() {},

    style: {
      borderColor: '#ccc',
      background:  'white'
    },
    className:          ''
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen && prevProps.isOpen !== this.props.isOpen) {
      this.props.onOpen();
    }
  }

  render() {
    let attachment, targetAttachment, offset;
    switch(this.props.position){
      case 'top':
        attachment = 'bottom middle';
        targetAttachment = 'top middle';
        break;
      case 'bottom':
        attachment = 'top middle';
        targetAttachment = 'bottom middle';
        break;
      case 'left':
        attachment = 'middle right';
        targetAttachment = 'middle left';
        break;
      case 'right':
        attachment = 'middle left';
        targetAttachment = 'middle right';
        break;
    }
    return (
      <span>
        {this._getElement()}
        {
          this.props.isOpen &&
          <TetherElement
            target={this.refs.element}
            options={{
              attachment: `${attachment}`,
              targetAttachment: `${targetAttachment}`,
              constraints: [
                {
                  to: 'window',
                  pin: true
                }
              ]
            }}
          >
            <PopoverContent
              position={this.props.position}
              shouldHaveBorder={this._shouldHaveBorder()}
              style={this.props.style}>
              {this.props.children}
            </PopoverContent>
          </TetherElement>
        }
      </span>
    );
  }

  _getElement(){
    return React.cloneElement(this.props.element, { ref: 'element' });
  }

  _shouldHaveBorder() {
    let borderColor = this.props.style.borderColor || '';
    return borderColor.length > 0 && /rgba/.test(this.props.style.background);
  }
}

export default Popover;
