import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
This exercise will help you put together and practice all of the concepts you've
learned thus far. It will also help you form a strong foundational knowledge of
React and prepare you for your first project.

The instructions for this project are located in the `instructions.md` file.
*/

class App extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    users: [],
    errors: [],
    showGamesPlayed: true,
  }

  handleChange = (event) => {
    // console.log(this.state[event.currentTarget.name], event.currentTarget.value);
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  showHideToggler = () => {
    this.setState({showGamesPlayed: !this.state.showGamesPlayed});
  }

  deleteUser = (user) => {
    const users = this.state.users.filter(u => u.id !== user.id);
    this.setState({users});
  }

  playGame = (user) => {
    const users = [...this.state.users];
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        u.gamesPlayed = u.gamesPlayed + 1;
      }
      return u;
    });
    this.setState({users: updatedUsers});
  }

  inputIsEmpty = () => {
    return this.state.firstname === '' || this.state.lastname === '' || this.state.username === '';
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.users.filter(user => user.username === this.state.username).length === 0) {
      this.setState(oldState => ({
        users: [...oldState.users, {
          id: oldState.users.length + 1,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
          gamesPlayed: 0
        }],
        errors: [],
      }));
    } else {
      this.setState(oldState => ({
        errors: [...oldState.errors, 'User with that username already exists!']
      }));
    }
  }

  render() {
    const {firstname, lastname, username, errors, users} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
    	<form onSubmit={this.onSubmit}>
          <input name="firstname" value={firstname} type="text" placeholder="First Name"
			autoComplete="off"
			onChange={(event) => this.handleChange(event)}/>
          <input name="lastname" value={lastname} type="text" placeholder="Last Name"
            autoComplete="off"
			onChange={(event) => this.handleChange(event)}/>
          <input name="username" value={username} type="text" placeholder="User Name"
            autoComplete="off"
			onChange={(event) => this.handleChange(event)}/>
          {errors.length !== 0 && errors.map((error, index) => <p key={index} style={{color: 'red'}}>{error}</p>)}
          <button disabled={this.inputIsEmpty()}>Add User</button>
        </form>
		<button onClick={this.showHideToggler}>Show/Hide games played</button>
		
		<div>
          <h1>List of users</h1>
          <table>
			<thead>
            <tr>
              <th colSpan="2">Firstname</th>
              <th colSpan="2">Lastname</th>
              <th colSpan="2">Username</th>
              {this.state.showGamesPlayed && <th colSpan="2">Games Played</th>}
              <th colSpan="2">Play Game</th>
              <th colSpan="2">Delete User</th>
            </tr>
			</thead>
			<tbody>
            {users.length !== 0 && users.map(user => (
                <tr key={user.id}>
                  <td colSpan="2">{user.firstname}</td>
                  <td colSpan="2">{user.lastname}</td>
                  <td colSpan="2">{user.username}</td>
                  {this.state.showGamesPlayed && <td colSpan="2">{user.gamesPlayed}</td>}
                  <td colSpan="2"><button onClick={() => this.playGame(user)}>Play Game</button></td>
                  <td colSpan="2"><button onClick={() => this.deleteUser(user)}>Delete User</button></td>
                </tr>
            ))}
			</tbody>
          </table>
          {users.length === 0 &&
            <p>
              No users are playing games right now
            </p>
          }
		</div>
      </div>
    );
  }
}

export default App;
