import React from 'react'
import Helmet from 'react-helmet'

import 'src/styles/styles.scss'
import 'materialize-css/sass/materialize.scss'

import Header from 'src/components/Header'
import Stats from 'src/components/stats/Stats'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    let storedActions
    if (typeof window !== 'undefined') {
      storedActions = JSON.parse(localStorage.getItem('actions'))
    }

    this.state = {
      timer: {
        startedAt: 0,
        pausedAt: 0,
        diff: 0,
      },
      actions: storedActions || [],
      combatFame: 0,
      gatherFame: 0,
      lastAction: null,
    }

    this.timer = null
    this.startTimer = this.startTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.restartTimer = this.restartTimer.bind(this)
    this.tick = this.tick.bind(this)
    this.addAction = this.addAction.bind(this)
    this.deleteAction = this.deleteAction.bind(this)
    this.addFame = this.addFame.bind(this)
    this.getStat = this.getStat.bind(this)
  }

  tick() {
    if (!this.state.pausedAt) {
      const now = new Date().getTime()
      const distance = now - this.state.timer.startedAt
      this.setState({
        timer: {
          ...this.state.timer,
          diff: distance,
        },
      })
    } else {
    }
  }

  startTimer() {
    const time = new Date().getTime()
    const { pausedAt, startedAt } = this.state.timer
    if (pausedAt) {
      const pauseDiff = time - pausedAt
      const newStart = startedAt + pauseDiff
      this.setState({
        timer: {
          ...this.state.timer,
          startedAt: newStart,
          paused: null,
        },
      })
    } else {
      this.setState({
        timer: {
          ...this.state.timer,
          startedAt: startedAt ? startedAt : time,
        },
      })
    }

    this.timer = setInterval(() => {
      this.tick()
    }, 1000)
  }

  pauseTimer() {
    const time = new Date().getTime()
    clearInterval(this.timer)
    this.timer = null
    this.setState({
      timer: {
        ...this.state.timer,
        pausedAt: time,
      },
    })
  }

  restartTimer() {
    clearInterval(this.timer)
    this.timer = null
    this.setState({
      timer: {
        startedAt: null,
        pausedAt: null,
        diff: 0,
      },
    })
  }

  addAction(action) {
    this.setState({
      actions: [...this.state.actions, action],
    })
    localStorage.setItem(
      'actions',
      JSON.stringify([...this.state.actions, action])
    )
  }

  deleteAction(id) {
    this.setState({
      ...this.state,
      actions: this.state.actions.filter(action => action.id !== id),
    })
    localStorage.setItem(
      'actions',
      JSON.stringify(this.state.actions.filter(action => action.id !== id))
    )
  }

  addFame(action) {
    const { fame, type } = action
    const { gatherFame, combatFame } = this.state

    if (type === 'combat') {
      const total = parseInt(combatFame) + parseInt(fame)
      this.setState({
        combatFame: total,
        lastAction: action,
      })
    } else if (type === 'gather') {
      this.setState({
        gatherFame: parseInt(gatherFame) + parseInt(fame),
        lastAction: action,
      })
    }
  }

  getStat(type, period) {
    const diff = this.state.timer.diff
    // const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    if (period === 'hour') {
      if (type === 'combat') {
        const famePerHour = Math.round((this.state.combatFame * 3600000) / diff)
        return famePerHour
      } else if (type === 'gather') {
        const famePerHour = Math.round((this.state.gatherFame * 3600000) / diff)
        return famePerHour
      }
    } else if (period === 'total' && type) {
      if (type === 'combat') {
        return this.state.combatFame
      } else if (type === 'gather') {
        return this.state.gatherFame
      }
    } else if (period === 'total' && !type) {
      return this.state.combatFame + this.state.gatherFame
    } else if (period === 'total-hour') {
      const total = this.state.combatFame + this.state.gatherFame
      const famePerHour = Math.round((total * 3600000) / diff)
      return famePerHour
    }
  }

  render() {
    return (
      <React.Fragment>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <Helmet
          title={'Albion Fame Calculato'}
          meta={[
            {
              name: 'description',
              content:
                'Calculate your fame/hour easily, optimise your gathering routes, improve your gains.',
            },
            {
              name: 'keywords',
              content:
                'albion, calculator, fame, xp, silver, time, average, hour',
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
          restartTimer={this.restartTimer}
          diff={this.state.timer.diff}
          isPaused={this.timer ? true : false}
          lastAction={this.state.lastAction}
        />
        <div className="index-page">
          <Stats
            getStat={this.getStat}
            addFame={this.addFame}
            addAction={this.addAction}
            deleteAction={this.deleteAction}
            actions={this.state.actions}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default IndexPage
