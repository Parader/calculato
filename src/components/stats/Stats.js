import React from 'react'

import StatRow from 'src/components/stats/StatRow'
import StatForm from 'src/components/stats/StatForm'

class Stats extends React.Component {
  render() {
    const { getStat, addAction, deleteAction, actions, addFame } = this.props

    return (
      <div className="stats-container">
        <div className="calculato">
          <div className="gestion">
            <StatForm
              type="gather"
              addAction={addAction}
              deleteAction={deleteAction}
              actions={actions}
              addFame={addFame}
            />
            <StatForm
              type="combat"
              addAction={addAction}
              deleteAction={deleteAction}
              actions={actions}
              addFame={addFame}
            />
          </div>

          <div className="display">
            <div className="column">
              <div className="row title">Gather</div>
              <StatRow label="Fame / hour" value={getStat('gather', 'hour')} />

              <StatRow label="Total" value={getStat('gather', 'total')} />
            </div>
            <div className="column">
              <div className="row title">Combat</div>
              <StatRow label="Hour average" value={getStat('combat', 'hour')} />
              <StatRow label="Total" value={getStat('combat', 'total')} />
            </div>
            <div className="column">
              <div className="row title">Combined</div>
              <StatRow
                label="Fame / hour"
                value={getStat(null, 'total-hour')}
              />
              <StatRow label="Grand total" value={getStat(null, 'total')} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stats
