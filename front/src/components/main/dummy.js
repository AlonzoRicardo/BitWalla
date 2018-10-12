import React, { Component } from "react";
//import { Link } from "react-router-dom";
import styles from "./Wines.css";

class Wines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      search: ""
    };
  }

  updateSearch = event => {
    return this.setState({ search: event.target.value });
  };

  render() {
    console.log(this.state.search);
    if (this.props.userInSession) {
      let parker = this.props.parker.filter(wine => {
        return (
          wine.fields.region.toLowerCase().indexOf(this.state.search) !== -1
        )
      });
      console.log(parker);
      return (
        <div>
          <div class="field is-grouped searchBar">
            <p class="control is-expanded">
              <input
                class="input"
                value={this.state.search.toLowerCase()}
                onChange={this.updateSearch}
                type="text"
                placeholder="Find a region"
              />
            </p>
          </div>

          <div className="wineTable">
            <table>
            <tbody>
              
                <th>Vintage</th>
                <th>Maturity</th>
                <th>Region</th>
            
              {parker.map(wine => {
                return (
                  <tr>
                    <td>{wine.fields.year}</td>
                    <td>{wine.fields.maturity}</td>
                    <td>{wine.fields.region}</td>
                  </tr>
                );
              })}

            </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Please Log In</h1>
        </div>
      );
    }
  }
}
export default Wines;