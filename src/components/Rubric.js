import React, { Component } from 'react';
import * as Actions from '../actions/assessment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const CompetencyButton = props => {
  return (
    <li className={props.isActive}
      onClick={() => {
        props.setActiveComp(props.index)
      }}>
      <a href="#dashboard-2" role="tab" data-toggle="tab" aria-expanded="true">
        <i className="material-icons">{props.icon}</i> {props.name}
      </a>
    </li>
  )
}

const Criteria = props => {
  return (
    <tr>
      <td>
        <div className="checkbox">
          <label>
            <input type="checkbox" name="optionsCheckboxes" defaultChecked={false} />
          </label>
        </div>
      </td>
      <td>{props.text}</td>
    </tr>
  )
}

class Rubric extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeCompetencyIndex: 0
    }
    this.icons = [ "dashboard", "explore", "code", "backup", "lock", "bug_report", "line_style", "perm_identity", "star_rate" ]
    this.getCompetencyButtons = this.getCompetencyButtons.bind(this);
    this.getCriteriaForLevel = this.getCriteriaForLevel.bind(this);
    this.getLevels = this.getLevels.bind(this);
    this.getIsFetching = this.getIsFetching.bind(this);
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.getAssessment(localStorage.getItem("userId"), id);
  }

  setActiveComp(index) {
    this.setState({
      activeCompetencyIndex: index
    })
  }

  getCompetencyButtons() {
    if (this.props.assessment.rubricJSON.Competencies) {
      return this.props.assessment.rubricJSON.Competencies.map((comp, index) => {
        var isActiveClass = "";
        if (index === 0) {
          isActiveClass = "active";
        }
        return <CompetencyButton
          name={comp.name}
          key={index}
          index={index}
          isActive={isActiveClass}
          icon={this.icons[index]}
          setActiveComp={this.setActiveComp.bind(this)} />
      })
    }
  }

  getCriteriaForLevel(level) {
    const index = this.state.activeCompetencyIndex;
    const scales = [];
    if (this.props.assessment.rubricJSON.Competencies) {
      return this.props.assessment.rubricJSON.Competencies[index].Scales.map((scale, index) => {
        // if the criteria level matches the level parameter, add the
        // criteria component
        return scale.Criteria.filter(criteria => criteria.level == level).map((criteria, index) => {
          return <Criteria text={criteria.text} />
        })
      })
    }
  }

  getLevels() {
    const levelNames = ['Initial', 'Approaching', 'Overtaking', 'Innovating'];
    return levelNames.map((levelName, index) => {
      return (
        <div key={index} className='col-md-3'>
          <h3> {levelName} </h3>
          <hr />
          <table className="table">
            <tbody key={index} >
              {this.getCriteriaForLevel(index + 1)}
            </tbody>
          </table>
        </div>
      )
    })
  }

  getIsFetching() {
    if (this.props.assessment == null || this.props.assessment.isFetching == null) {
      return true;
    }
    return this.props.assessment.isFetching;
  }


  render() {
    return (
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title"> {this.getIsFetching() ? "" : this.props.assessment.rubricJSON.name + " "}
              <small className="category">{this.getIsFetching() ? "" : this.props.assessment.rubricJSON.description}</small>
            </h4>
          </div>
          <div className="card-content">
            <div className="row">
              <div className="col-md-2">
                <ul className="nav nav-pills nav-pills-icons nav-pills-rose nav-stacked" role="tablist">
                  {this.getIsFetching() ? "" : this.getCompetencyButtons()}
                </ul>
            </div>
            <div className="col-md-10">
              <div className="tab-content">
                <div className="tab-pane active" id="dashboard-2">
                  {this.getIsFetching() ? "" : this.getLevels()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    assessment: state.assessment
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rubric);
