import React from 'react'
import Link from 'gatsby-link'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fixed: false,
    }

    this.staticPart = React.createRef()

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.handleScroll()
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(e) {
    const scrollTop = document.body.getBoundingClientRect().top
    const staticPartHeight = this.staticPart.current.offsetHeight
    if (scrollTop < -staticPartHeight && !this.state.fixed) {
      this.setState({ fixed: true })
    } else if (scrollTop > -staticPartHeight && this.state.fixed) {
      this.setState({ fixed: false })
    }
  }

  render() {
    const { diff, isPaused, actions } = this.props
    const time = getTime(diff)

    return (
      <div className={`header ${this.state.fixed ? 'fixed' : ''}`}>
        <nav className="nav-extended">
          <div className="nav-wrapper site-title" ref={this.staticPart}>
            <Link to="/">Albion Fame Calculato</Link>
          </div>
          <div className="nav-content">
            <div className="timer">{time}</div>
            <div className="last-action">{}</div>
            <div className="buttons">
              <button
                aria-label="Restart"
                className={'restart waves-effect btn'}
                onClick={() => {
                  this.props.restartTimer()
                }}
              >
                <i className="material-icons">refresh</i>
              </button>
              {isPaused ? (
                <button
                  aria-label="Pause"
                  className={'pause waves-effect waves-light btn'}
                  onClick={() => {
                    this.props.pauseTimer()
                  }}
                >
                  Pause
                  <i className="material-icons">pause</i>
                </button>
              ) : (
                <button
                  aria-label="Start"
                  className={'start waves-effect waves-light btn'}
                  onClick={() => {
                    this.props.startTimer()
                  }}
                >
                  Start
                  <i className="material-icons ">play_arrow</i>
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export const getTime = distance => {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  return `${hours || `00`}:${minutes || `00`}:${seconds}`
}

export default Header
