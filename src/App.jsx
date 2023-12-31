// class base component 
import React, { Component } from "react";
import './App.css';

// step 4 create Square component 
class Square extends Component {

  // step 9 create hook using consturor fun with props
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     value: null, // current value of state is null
  //   }
  // }

  render() {
    return (
      // step 8 adding onclick inside the button tag 
      <button
        className="square"
        onClick={() => this.props.onClick()}>
        {/* step 7 */}
        {this.props.value}
      </button>
    )
  }
}

// step 3 create Board component
class Board extends Component {

  // step 10 after comment step 7 and step 9

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    // alert(i);

    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }
  // step 5 
  renderSquare(i) {
    // step 11 update the value  
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}

    />
  }

  render() {




    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {/* step 6 */}
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div className="board-row">
          {/* step 6 */}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>

        <div className="board-row">
          {/* step 6 */}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

// step 2 create game componet here 
class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleClick(i) {

    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      // stepNumber:
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    console.log('history', this.state.history)
    const history = this.state.history;
    const current = history[history.length - 1];

    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const description = move ?
        `Go to move #  ${move}` : `Go to game start`;

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      )
    })

    let status;

    if (winner) {
      status = 'Winner : ' + winner;
    } else {
      status = `Next Playes : ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game_board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <div style={{ fontSize: "2rem", color: "red" }}>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

// store history of moves 



// step 1 create app class component 
class App extends Component {

  render() {
    return (
      <div className="app">
        {/* step 3  */}
        <Game />
      </div>
    )
  }
}

function calculateWinner(squares) {

  const combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < combination.length; i++) {
    const [a, b, c] = combination[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App


