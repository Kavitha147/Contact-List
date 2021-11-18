import React from "react";
import "./style.css";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

class DisplayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      note: "",
      contactList: [],
      selectedIndex: ""
    };
  }

  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  setEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  setPhoneNo = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  setNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  onPopUp = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
  };
  onClose = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    this.setState({ name: "", email: "", note: "", phone: "" });
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("note").value = "";
  };
  onEditClose = () => {
    var modal = document.getElementById("editModal");
    modal.style.display = "none";
    this.setState({ name: "", email: "", note: "", phone: "" });
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("note").value = "";
  };
  onAdd = (e) => {
    e.preventDefault();
    var mailinput = this.state.email;
    var mailformat = new RegExp(
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
    );
    let setAdd = true;
    if (this.state.contactList.length > 0) {
      this.state.contactList.map((item) => {
        if (
          item.name.toLocaleLowerCase() === this.state.name.toLocaleLowerCase()
        ) {
          setAdd = false;
          alert("Name Already Exits Please Different Name");
        }
      });
    }
    if (setAdd) {
      if (mailformat.test(mailinput) || this.state.email === "") {
        this.state.contactList.push({
          name: this.state.name,
          email: this.state.email,
          note: this.state.note,
          phone: this.state.phone,
        });
        this.setState({ contactList: this.state.contactList });
        this.onClose();
      } else {
        alert("You have entered an invalid email address!");
      }
    }
  };

  saveEdit = (e) => {
    e.preventDefault();
    var mailinput = this.state.email;
    var mailformat = new RegExp(
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
    );

    if (mailformat.test(mailinput) || this.state.email === "") {
      let contactItem = this.state.contactList;
      contactItem.map((item, index) => {
        if (this.state.selectedIndex === index)
          contactItem[this.state.selectedIndex].name = this.state.name
        contactItem[this.state.selectedIndex].email = this.state.email
        contactItem[this.state.selectedIndex].phone = this.state.phone
        contactItem[this.state.selectedIndex].note = this.state.note
      })
      this.setState({
        contactList: contactItem
      })
      this.onEditClose();
    } else {
      alert("You have entered an invalid email address!");
    }
  }
  formEdit = (selectedItem, selectedIndex) => {
    var modal = document.getElementById("editModal");
    modal.style.display = "block";
    document.getElementById("edit-name").value = selectedItem.name;
    document.getElementById("edit-phone").value = selectedItem.phone;
    document.getElementById("edit-email").value = selectedItem.email;
    document.getElementById("edit-note").value = selectedItem.note;
    this.setState({ name: selectedItem.name, email: selectedItem.email, note: selectedItem.note, phone: selectedItem.phone, selectedIndex });

  }
  deleteContact = (selectedIndex) => {
    let contactItem = this.state.contactList;
    contactItem.map((item, index) => {
      if (selectedIndex === index)
        contactItem.splice(index, 1);
    })
    this.setState({
      contactList: contactItem
    })
  }
  render() {
    const modal = document.getElementById("myModal");
    return (
      <div>
        <script>
          {
            (window.onclick = function (event) {
              if (event.target === modal) {
                modal.style.display = "none";
              }
            })
          }
        </script>
        <center>
          <div className="top-content">
            <button onClick={this.onPopUp} className="createBtn">
              Create
            </button>
            <table id="table1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Notes</th>
                  <th /><th />
                </tr>
              </thead>
            </table>
          </div>
        </center>
        <p>CONTACTS ({this.state.contactList.length})</p>
        <center>
          <table id="table2">
            <tbody>
              {this.state.contactList.length > 0 &&
                this.state.contactList.map((item, index) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.email ? item.email : "--"}</td>
                    <td>{item.phone}</td>
                    <td>{item.note ? item.note : "--"}</td>
                    <td>
                      <MdModeEdit
                        onClick={() => this.formEdit(item, index)}
                        className="edit-icon"
                      />
                    </td>
                    <td>
                      <MdDelete
                        onClick={() => this.deleteContact(index)}
                        className="del-icon"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </center>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={this.onClose}>
                &times;
              </span>
              <h2>Create New Contact</h2>
            </div>
            <form onSubmit={this.onAdd}>
              <div className="modal-body">
                <label>Name </label>
                <input id="name" type="text" onChange={this.setName} required />
                <br />
                <br />
                <label>Email </label>
                <input id="email" type="text" onChange={this.setEmail} />
                <br />
                <br />
                <label>Phone Number </label>
                <input
                  id="phone"
                  type="number"
                  onChange={this.setPhoneNo}
                  required
                />
                <br />
                <br />
                <label>Note </label>
                <input id="note" type="text" onChange={this.setNote} />
              </div>
              <div className="modal-footer">
                <h3>
                  <center>
                    <button type="submit">ADD</button>
                  </center>
                </h3>
              </div>
            </form>
          </div>
        </div>
        <div id="editModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={this.onEditClose}>
                &times;
              </span>
              <h2>Edit Contact</h2>
            </div>
            <form onSubmit={this.saveEdit}>
              <div className="modal-body">
                <label>Name </label>
                <input id="edit-name" type="text" onChange={this.setName} required />
                <br />
                <br />
                <label>Email </label>
                <input id="edit-email" type="text" onChange={this.setEmail} />
                <br />
                <br />
                <label>Phone Number </label>
                <input
                  id="edit-phone"
                  type="number"
                  onChange={this.setPhoneNo}
                  required
                />
                <br />
                <br />
                <label>Note </label>
                <input id="edit-note" type="text" onChange={this.setNote} />
              </div>
              <div className="modal-footer">
                <h3>
                  <center>
                    <button type="submit">Save</button>
                  </center>
                </h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default DisplayComponent;