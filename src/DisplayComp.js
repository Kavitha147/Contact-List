import React from "react";
import "./style.css";

class DisplayComponent extends React.Component {
  render() {
    return (
      <div>
        <center>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Phone Number</td>
                <td>Notes</td>
              </tr>
            </tbody>
          </table>
          <hr size="1" width="73%" color="black" />
        </center>
        <p>CONTACTS ( 0 )</p>
      </div>
    );
  }
}
export default DisplayComponent;
