import React from 'react';
import Square from './Square';
import './index.scss';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const renderBoard = () => {
      for (let i = 0; i < 9; i++) {
        let row1 = (
          <div key={i} className="board__row">
            {this.renderSquare(i)}
            {this.renderSquare(i + 1)}
            {this.renderSquare(i + 2)}
          </div>
        )
        let row2 = (
          <div key={i + 1} className="board__row">
            {this.renderSquare(i + 3)}
            {this.renderSquare(i + 4)}
            {this.renderSquare(i + 5)}
          </div>
        )
        let row3 = (
          <div key={i + 2} className="board__row">
            {this.renderSquare(i + 6)}
            {this.renderSquare(i + 7)}
            {this.renderSquare(i + 8)}
          </div>
        )
        return [row1, row2, row3]
      }
    }

    return (
      <div className={this.props.class} >
        {renderBoard()}
      </div>
    );
  }
}

export default Board;
