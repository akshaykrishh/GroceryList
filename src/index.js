import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Component for each item.
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitPrice: this.props.unitPrice,
      quantity: "",
      totalPrice: 0
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let quantity = Math.round(e.target.value) // Rounding off the value when non-integer is entered
    this.setState({
      quantity: quantity,
      totalPrice: this.state.unitPrice * quantity
    })

    //Changing the total price in Table class by subtracting the previousamount and adding the new amount
    this.props.onChange(this.state.totalPrice, this.state.unitPrice * quantity)
  }

  render() {
    return (
      //Row of each item.
      <tbody>
        <tr>
          <td>{this.props.name}</td>
          <td>{this.state.unitPrice}</td>
          <td><input type='number'
            name="quantity"
            className="input"
            value={this.state.quantity}
            onChange={this.handleInput}
            min={0} /></td>
          <td>{this.state.totalPrice}</td>
        </tr>
      </tbody>
    )
  }
}

class Table extends Component {
  constructor() {
    super();
    this.state = {
      disc: 0,
      total: 0
    }
    this.handleDisc = this.handleDisc.bind(this);
    this.handleTotal = this.handleTotal.bind(this);
  }

  //Setting the total
  handleTotal(prevVal, newVal) {
    this.setState({
      total: this.state.total - prevVal + newVal
    })
  }

  //handling the disc
  handleDisc(e) {
    this.setState({
      disc: e.target.value
    })
  }

  render() {
    return (
      <div className="root">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price/kg</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <Item name="Oreo" unitPrice={35} onChange={this.handleTotal} />
          <Item name="Potato" unitPrice={80} onChange={this.handleTotal} />
          <Item name="Bread" unitPrice={35} onChange={this.handleTotal} />
          <Item name="Nutella" unitPrice={175} onChange={this.handleTotal} />
          <Item name="Cereal" unitPrice={150} onChange={this.handleTotal} />
          <Item name="Milk" unitPrice={20} onChange={this.handleTotal} />
          <tfoot>
            <tr>
              <td colSpan={3} className="total">Total Amount: </td>
              <td>{this.state.total}</td>
            </tr>
          </tfoot>
        </table>

        <div className="disc">
          <label htmlFor="disc">Discount: </label>
          <input type='number' name="disc" className="input" value={this.state.disc} onChange={this.handleDisc} min={0} max={50} /> %
					<p name="total">Price after Discount : {((100 - this.state.disc) * this.state.total) / 100} </p>
        </div>

      </div>
    )
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('root')
);
