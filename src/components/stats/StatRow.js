import React from 'react'

const StatRow = ({ label, value }) => {
  return (
    <div className="row statrow">
      <div className="label">{label}</div>
      <div className="value">{value || 0}</div>
    </div>
  )
}
export default StatRow
