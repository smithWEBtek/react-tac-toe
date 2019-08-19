import React from 'react';
import Board from './Board';
import './index.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
    Array.from(document.querySelectorAll('button')).forEach(b => b.classList.remove('green'))
    document.querySelector('.game__status--message').classList.remove('green')
  }

  onClickMove = (id) => {
    Array.from(document.getElementsByTagName('li')).forEach(l => l.firstChild.classList.remove('selected'))
    document.getElementsByTagName('li')[id].firstChild.classList.add('selected')
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = checkForDraw(current.squares)
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li
          key={move}
          id={move}
          onClick={() => this.onClickMove(move)}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li >
      );
    });

    let status;
    if (winner) {
      status = <p className="green">Winner: {winner[0]}</p>;
      highlightWinningSquares(winner[1])
    } else if (draw) {
      status = <p className="yellow">Draw!</p>;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game__title"><a href="/">Tic Tac Toe</a></div>
        <Board
          class="game__board"
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
        />
        <div className="game__status">
          <div className="game__status--message">{status}</div>
          <div className="game__status--moves">
            <ul>{moves}</ul>
          </div>
        </div >
      </div >
    );
  }
}

export default Game;

function checkForDraw(squares) {
  if (squares.filter(s => s).length === 7) {
    return true
  } else {
    return false
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}

function highlightWinningSquares(arr) {
  arr.forEach(sq => {
    document.querySelectorAll('button')[sq].classList.add('green')
  })
}