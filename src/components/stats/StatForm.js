import React from 'react'

import StatButton from './StatButton'
import M from 'materialize-css/dist/js/materialize.min.js'

class StatForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deleting: false,
      tier: 0,
      enchant: 0,
    }
    this.delete = this.delete.bind(this)
    this.tierContainer = React.createRef()
    this.enchantContainer = React.createRef()
  }

  componentDidMount() {
    M.AutoInit()
  }

  delete(id, deleteStatus) {
    if (deleteStatus !== this.state.status) {
      this.setState({ deleting: deleteStatus })
    }
    this.props.deleteAction(id)
  }

  addAction(e, type) {
    e.preventDefault()
    const fame = e.target.fame.value
    const tier = e.target.tier.value
    const enchant = e.target.enchant.value

    let id = Math.random()
      .toString(36)
      .substr(2, 9)

    while (this.props.actions.filter(action => action.id === id) > 0) {
      id = Math.random()
        .toString(36)
        .substr(2, 9)
    }

    const action = {
      id,
      fame,
      type,
      tier,
      enchant,
    }
    if (fame && tier && enchant) {
      this.props.addAction(action)
      e.target.fame.value = ''
      this.setState({
        tier: 0,
        enchant: 0,
      })
      this.tierContainer.current
        .querySelector('.selected')
        .classList.remove('selected')
      this.tierContainer.current.querySelector('.select-dropdown').value =
        'None'

      this.enchantContainer.current
        .querySelector('.selected')
        .classList.remove('selected')
      this.enchantContainer.current.querySelector('.select-dropdown').value =
        'None'
    }
  }
  render() {
    const { type, actions, addFame } = this.props
    const tiers = ['0', 3, 4, 5, 6, 7, 8]
    return (
      <div className="statform">
        <div className="split">
          <div className={`${type} head`}>
            {type}
            {actions.filter(a => a.type === type).length > 0 && (
              <button
                aria-label="deleteMode"
                className={`delete ${this.state.deleting ? 'active' : ''}`}
                onClick={() => {
                  this.setState({ deleting: !this.state.deleting })
                }}
              >
                <i className="material-icons">remove</i>
              </button>
            )}
          </div>
          <form
            onSubmit={e => {
              this.addAction(e, type)
            }}
            className="form"
          >
            <div className="input-field col s12" ref={this.tierContainer}>
              <select
                name="tier"
                placeholder="none"
                value={this.state.tier}
                onChange={e => {
                  this.setState({ tier: e.target.value })
                }}
              >
                <option value={0}>None</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
              <label>Tier</label>
            </div>
            <div className="input-field col s12" ref={this.enchantContainer}>
              <select
                name="enchant"
                placeholder="none"
                value={this.state.enchant}
                onChange={e => {
                  this.setState({ enchant: e.target.value })
                }}
              >
                <option value={0}>None</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <label>Enchant</label>
            </div>
            <div className="input-field col s6 text">
              <input
                placeholder="0"
                id={`fame-${type}`}
                type="number"
                name="fame"
                className="validate "
              />
              <label htmlFor={`fame-${type}`} className="active">
                Fame
              </label>
            </div>
            <button
              className="btn add waves-effect waves-light "
              aria-label="Add"
              type="submit"
            >
              <i className="material-icons">add</i>
            </button>
          </form>

          <div className="tier-container">
            {tiers.map(tier => {
              return (
                <div className="tier" key={tier}>
                  <StatButton
                    actions={actions}
                    type={type}
                    tier={tier}
                    addFame={addFame}
                    deleting={this.state.deleting}
                    deleteAction={this.delete}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default StatForm
