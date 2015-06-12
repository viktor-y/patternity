var React   = require('react');
var classNames = require('classnames');
var $ = require('jquery');

var Icon = require('../icon.jsx');
var Card = require('./card.jsx');

var ChallengeCard = React.createClass({
  PropTypes : {
    id : React.PropTypes.string
  },

  getDefaultProps : function(){
    return {
      id : ""
    };
  },

  componentDidMount : function(){
    this._adjustDescriptionHeight();
  },

  render: function () {
    return (
      <div className="pt-challenge-card" id={this.props.id}>
        <Card ref="card">
          {this.props.children}
        </Card>
      </div>
    );
  },

  _adjustDescriptionHeight : function(){
    var card = React.findDOMNode(this.refs.card);
    var cardHeight = card.offsetHeight;
    var imageHeight = $(card).find(".pt-challenge-image ").outerHeight(true);
    var actionsHeight = $(card).find(".pt-card-actions").outerHeight(true);
    var titleHeight = $(card).find(".headline").outerHeight(true);
    var typeHeight = $(card).find(".pt-challenge-type").outerHeight(true);
    var description = card.querySelector(".description");

    description.style.height = (cardHeight - actionsHeight - titleHeight - typeHeight - imageHeight) + "px";
  }
});

ChallengeCard.Details = React.createClass({
  PropTypes : {
    type : React.PropTypes.string,
    headline : React.PropTypes.string,
    description : React.PropTypes.string,
    onFilterByType : React.PropTypes.func,
    participantCount : React.PropTypes.number,
    challengeActions : React.PropTypes.object,
    challengeId : React.PropTypes.string,
  },

  getDefaultProps : function(){
    return {
      type : "",
      headline : "",
      description : "",
      onFilterByType : function(){},
      participantCount : 0,
      challengeActions : {view: function(){}},
      challengeId :""
    };
  },

  render : function(){
    return (
      <div className="pt-challenge-details">
        <h4 className="headline" onClick={this.props.challengeActions.view} data-challenge-id={this.props.challengeId}>{this.props.headline}</h4>
        <ChallengeTypeCount type={this.props.type} onClick={this.props.onFilterByType} participantCount={this.props.participantCount} />
        <p ref="description" className="description" dangerouslySetInnerHTML={this._sanitizeDescription()}></p>
      </div>
    );
  },

  _sanitizeDescription : function(){
    return {__html: this.props.description}
  }
});

var ChallengeTypeCount = React.createClass({
  PropTypes : {
    type : React.PropTypes.string,
    onClick : React.PropTypes.func,
    participantCount : React.PropTypes.number
  },

  getDefaultProps : function(){
    return {
      type : "",
      onClick : function(){},
      participantCount : 0
    };
  },

  render : function(){
    return (
      <div className="pt-challenge-type-count">
        <span className={"pt-challenge-type " + this._formatChallengeTypeClassName()} onClick={this.props.onClick}>
          {this.props.type.toLowerCase()}
        </span>
        <span className="pt-challenge-participant-count">
          <Icon icon="user" />
          <span className="count">{this.props.participantCount}</span>
        </span>
      </div>
    );
  },

  _formatChallengeTypeClassName : function(){
    var typeArray = this.props.type.split(' ');
    var typeClassName = "";
    for( var i = 0; i < typeArray.length; i++){
      typeClassName += typeArray[i].toLowerCase() + "-";
    }
    return typeClassName.substring(0, typeClassName.length - 1);
  }
});

ChallengeCard.Actions = Card.Actions;

ChallengeCard.Image = React.createClass({
  getDefaultProps : function(){
    return {
      image : null,
      challengeActions : {view: function(){}},
      challengeId :""
    };
  },
  PropTypes : {
    image : React.PropTypes.string,
    challengeActions : React.PropTypes.object,
    challengeId : React.PropTypes.string,    
  },
  render : function(){
    return (
      <div className={"pt-challenge-image " + this._doesChallengeHaveAnImage()}  >
        <img src={this.props.image} alt="Challenge Image" onClick={this.props.challengeActions.view} data-challenge-id={this.props.challengeId}/>
      </div>
    );
  },
  _doesChallengeHaveAnImage : function(){
    return this.props.image ? "" : "no-image";
  }
});

ChallengeCard.Notice = React.createClass({
    getDefaultProps : function(){
    return {
      points : 0,
      createdAt : "",
      status : "",
      completedOn : "",
      startedOn : "",
      unlocked : false
    };
  },
  PropTypes : {
    points : React.PropTypes.number,
    createdAt : React.PropTypes.string,
    status : React.PropTypes.string,
    completedOn : React.PropTypes.string,
    startedOn : React.PropTypes.string,
    unlocked : React.PropTypes.bool
  },
  render : function(){
    return (
      <div className="pt-card-notice">
        <ChallengeStatus
            createdAt={this.props.createdAt}
            status={this.props.status}
            completedOn={this.props.completedOn}
            startedOn={this.props.startedOn}
            unlocked={this.props.unlocked} />
        <Points points={this.props.points} />
      </div>
    );
  }
});

var Points = React.createClass({
  getDefaultProps : function(){
    return {
      points : 0,
    };
  },
  PropTypes : {
    points : React.PropTypes.number,
  },
  render : function(){
    return (
      <span className="pt-card-points">
        <Icon icon="coins-old" />
        {this.props.points}
      </span>
    );
  }
});

var ChallengeStatus = React.createClass({
  getDefaultProps : function(){
    return {
      createdAt : "",
      status : "",
      completedOn : "",
      startedOn : "",
      unlocked : false
    };
  },
  PropTypes : {
    createdAt : React.PropTypes.string,
    status : React.PropTypes.string,
    completedOn : React.PropTypes.string,
    startedOn : React.PropTypes.string,
    unlocked : React.PropTypes.bool
  },
  render : function(){
    return (
      <span className="pt-challenge-status">
        {this._determineStatusDetails()}
      </span>
    );
  },
  _determineStatusDetails : function(){
    // TODO if date was always stored in the same place, this could be refactored

    if (this.props.status === "completed") {
      return this._showStatus("Completed", this.props.completedOn);
    } else if(this.props.status === "started") {
      return this._showStatus('Started', this.props.startedOn);
    } else if(this.props.status === "expiring") {
      return this._showStatus('Expiring Soon');
    } else if(this.props.status === "limited_expiring") {
      return this._showStatus('Expiring & Limited');
    } else if(this.props.status === "limited") {
      return this._showStatus('Limited');
    } else if(this.props.unlocked) {
      return this._showUnlockedStatus();
    }
  },

  _showStatus: function (title, date) {
    var formattedDate = this._dateString(date);

    return (
      <span className="completed">{title} {formattedDate}</span>
    );
  },

  _showUnlockedStatus : function(){
    return (
      <span className="unlocked status-icon">
        <Icon icon="unlock" />
        <span>Challenge unlocked!</span>
      </span>
    );
  },

  _monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  _dateString: function (date) {
    var formattedDateStr = "";

    if (date) {
      var parsedDate = new Date(date);
      formattedDateStr = this._monthNames[parsedDate.getUTCMonth()] + " " + parsedDate.getUTCDate();
    }

    return formattedDateStr
  }
});

module.exports = ChallengeCard;

// created_at: "2015-03-02T14:46:34.913-05:00"
// description: ""
// description_text_only: ""
// featured: false
// headline: "Take this 2-minute challenge to learn how you can benefit from app AdvocateHub."
// id: 1
// image: null
// multiple_completion: false
// name: "Introductory Challenge for New Advocates"
// points: 5
// stage_count: 4
// stage_types:[
//   0: "intro_questions"
//   1: "intro_questions"
//   2: "intro_questions"
//   3: "intro_questions"
// ]
// timeout_message: null
// type: "Survey"
// unique_participant_count: 0
