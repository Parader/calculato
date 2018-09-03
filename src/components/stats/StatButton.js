import React from 'react'

class StatButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, tier, type, addFame, deleting, deleteAction } = this.props
    const typeActions = actions.filter(action => action.type === type)
    return (
      <React.Fragment>
        {typeActions
          .filter(action => action.tier == tier)
          .sort((a, b) => a.fame - b.fame)
          .sort((a, b) => a.enchant - b.enchant)
          .map((action, i) => {
            return (
              <span key={`${action.fame}${i}${type}`}>
                <button
                  onClick={e => {
                    let deleteStatus = deleting
                    if (deleting && typeActions.length == 1) {
                      deleteStatus = false
                    }
                    deleting
                      ? deleteAction(action.id, deleteStatus)
                      : addFame(type, action.fame)
                  }}
                  className={`action t${action.tier} enchant${action.enchant} ${
                    deleting ? 'deleting' : ''
                  }`}
                >
                  {action.fame}
                </button>
              </span>
            )
          })}
      </React.Fragment>
    )
  }
}

export default StatButton
