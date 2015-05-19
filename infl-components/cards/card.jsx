var React   = require('react');

var Card = React.createClass({
  render : function(){
    return (
      <div ref="card" className="pt-card">
        {this.props.children}
      </div>
    );
  }
});

// Card.Container = React.createClass({
//   render : function(){
//     return (
//       <div className="pt-card-container">
//         {this.props.children}
//       </div>
//     );
//   }
// });

module.exports = Card;
