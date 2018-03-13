import React, { Component } from 'react';
import { withRouter } from 'react-router'
import ChartistGraph from 'react-chartist';

class CompetencyScore extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr>
        <td><h5>{this.props.name}</h5></td>
        <td>
          <h4 className="text-default">
            <strong>{this.props.score}%</strong>
          </h4>
        </td>
      </tr>
    )
  }
}

class ScoreCard extends React.Component {

  constructor(props) {
    super(props)
    this.calculateTotalScore = this.calculateTotalScore.bind(this)
  }


  calculateTotalScore(){
    const { Competencies } = this.props.assessment.rubricJSON
    const totalSum = Competencies.reduce((acc, currentComp, currentCompIndex, competencies) => {
      return acc + (this.calculateCompetencyScore(currentComp)/ 100)
    }, 0)
    const result = (totalSum/Competencies.length) * 100
    return result.toFixed(0)
  }

  calculateCompetencyScore(competency) {

    const scoreTotals = {
      userTotal: 0,
      competencyTotal: 0
    }

    const { Scales } = competency

    Scales.map((scale, index) => {
      scale.Criteria.map((criterion, index) => {
        criterion.answer && (scoreTotals.userTotal += criterion.level)
        scoreTotals.competencyTotal += criterion.level
      })
    })

    const score = scoreTotals.competencyTotal === 0 ? 0 : (scoreTotals.userTotal/scoreTotals.competencyTotal *100)
    return score.toFixed(0)
  }

  render() {
    const assessment = this.props.assessment.rubricJSON
    const { name, description, Competencies } = assessment
    const totalScore = this.calculateTotalScore()
    return (
      <div className="col-md-5">
        <div className="card">
          <div className="card-header card-header-icon" data-background-color="blue">
            <i className="material-icons">pie_chart</i>
          </div>
          <div className="card-content">
            <div className="typography">

              <h4 className="card-title">{name}</h4>
              <div className="row">

                <div className="justify-content-center">
                  <div className="col-sm-5">
                    <span className="tim-note">OVERALL SCORE</span>
                    <h1>{ totalScore }%</h1>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="progress progress-line-info">
                    <div
                      className="progress-bar progress-bar-info"
                      role="progressbar"
                      aria-valuenow={ totalScore }
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{width: `${ totalScore }%`}}>
                      <span className="sr-only">{ totalScore }% Complete</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingOne">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded={false} aria-controls="collapseOne">
                      <h4 className="panel-title">
                        See Details...
                        <i className="material-icons">keyboard_arrow_down</i>
                      </h4>
                    </a>
                  </div>
                  <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                    <div className="panel-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="text-primary">
                            <tr>
                              <th>COMPETENCY</th>
                              <th>SCORE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Competencies.map((competency, index) => {
                              const score = this.calculateCompetencyScore(competency)
                              return <CompetencyScore key={index} score={score} name={competency.name} />
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>


        </div>
      </div>
    )
  }
}

export default withRouter(ScoreCard);
