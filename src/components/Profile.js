import React, { Component } from 'react';

class Profile extends Component {

  render() {
    console.log('profile rendering')
    return(
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-icon" data-background-color="rose">
              <i className="material-icons">perm_identity</i>
            </div>
            <div className="card-content">
              <h4 className="card-title">Edit Profile  -
                <small className="category">  Complete your profile</small>
              </h4>
              <form>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group label-floating is-empty">
                      <label className="control-label">Username</label>
                      <input type="text" className="form-control" />
                    <span className="material-input"></span></div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group label-floating is-empty">
                      <label className="control-label">Email address</label>
                      <input type="email" className="form-control" />
                    <span className="material-input"></span></div>
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group label-floating is-empty">
                        <label className="control-label">Fist Name</label>
                        <input type="text" className="form-control" />
                      <span className="material-input"></span></div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group label-floating is-empty">
                        <label className="control-label">Last Name</label>
                        <input type="text" className="form-control" />
                      <span className="material-input"></span></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group label-floating is-empty">
                        <label className="control-label">Adress</label>
                        <input type="text" className="form-control" />
                      <span className="material-input"></span></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group label-floating is-empty">
                        <label className="control-label">City</label>
                        <input type="text" className="form-control" />
                      <span className="material-input"></span></div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group label-floating is-empty">
                        <label className="control-label">Country</label>
                        <input type="text" className="form-control" />
                      <span className="material-input"></span></div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group label-floating is-empty">
                        <label className="control-label">Postal Code</label>
                        <input type="text" className="form-control" />
                      <span className="material-input"></span></div>
                    </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>About Me</label>
                          <div className="form-group label-floating is-empty">
                            <textarea className="form-control" rows="5"></textarea>
                          <span className="material-input"></span></div>
                        </div>
                      </div>
                  </div>
                  <button type="submit" className="btn btn-rose pull-right">Update Profile</button>
                  <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default Profile;
