/* global fetch, performance */
import React, { useState, useEffect } from 'react'
import GATEWAYS from '../../static/gateways.json'

const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'

const Gateway = ({ gatewayUrl }) => {
  const [online, setOnline] = useState(false)
  const [rtt, setRtt] = useState(0)

  useEffect(() => {
    const gatewayWithHash = `${gatewayUrl}/ipfs/${TEST_HASH}`
    // opt-out from gateway redirects done by browser extension
    const testUrl = gatewayWithHash + '#x-ipfs-companion-no-redirect'
    const start = performance.now()

    fetch(testUrl)
      .then(res => res.text())
      .then(() => {
        const rtt = Math.round(performance.now() - start)
        setOnline(true)
        setRtt(rtt)
      }).catch(() => {
        setOnline(false)
      })
  }, [])

  const gateway = gatewayUrl.split('https://')[1].split('/ipfs/:hash')[0]
  const dataClass = 'pv2 ph3 bt b--near-white charcoal'

  return (
    <tr>
      <td className={dataClass}>{online ? '✅ Online' : '❌ Offline'}</td>
      <td className={dataClass}><a className='link blue' href={gatewayUrl} target='_blank'>{gateway}</a></td>
      <td className={dataClass}>{online ? `${rtt}ms` : '-'}</td>
    </tr>
  )
}

const GatewayList = () => {
  const tableClass = 'w-100 w-80-ns mv4 center collapse sans-serif'
  const headerClass = 'fw6 tl tracked pv2 ph3'

  return (
    <div className='h-100 flex flex-column align-center'>
      <table className={tableClass}>
        <tbody>
          <tr>
            <td className={headerClass}>Status</td>
            <td className={headerClass}>Gateway</td>
            <td className={headerClass}>Response time</td>
          </tr>
          { GATEWAYS.map((gateway, idx) =>
            <Gateway
              key={`gateway-${idx}`}
              gatewayUrl={gateway} />
          ) }
        </tbody>
      </table>
    </div>
  )
}

export default GatewayList
