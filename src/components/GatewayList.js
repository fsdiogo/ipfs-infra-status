/* global fetch, performance */
import React, { useState, useEffect } from 'react'
import GATEWAYS from '../../static/gateways.json'

const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'

const Gateway = ({ host }) => {
  const [online, setOnline] = useState(false)
  const [gatewayWithHash, setGatewayWithHash] = useState('')
  const [rtt, setRtt] = useState(0)

  useEffect(() => {
    const gatewayAndHash = host.replace(':hash', TEST_HASH)
    setGatewayWithHash(gatewayAndHash)
    // opt-out from gateway redirects done by browser extension
    const testUrl = gatewayAndHash + '#x-ipfs-companion-no-redirect'
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

  const dataClass = 'pv2 ph3 bt b--near-white charcoal'

  return (
    online
      ? <tr>
        <td className={dataClass}>✅ Online</td>
        <td className={dataClass}><a className='link blue' href={gatewayWithHash} target='_blank'>{gatewayWithHash}</a></td>
        <td className={dataClass}>{rtt}ms</td>
      </tr>
      : <tr>
        <td className={dataClass}>❌ Offline</td>
        <td className={dataClass}>{gatewayWithHash}</td>
        <td className={dataClass}>-</td>
      </tr>
  )
}

const GatewayList = () => {
  const tableClass = 'w-100 collapse sans-serif'
  const headerClass = 'aqua fw2 ttu tl tracked pv2 ph3'

  return (
    <div className='h-100 ma3 flex flex-column align-center'>
      <table className={tableClass}>
        <tbody>
          <tr>
            <th className={headerClass}>Status</th>
            <th className={headerClass}>Host</th>
            <th className={headerClass}>RTT</th>
          </tr>
          { GATEWAYS.map((gateway, idx) =>
            <Gateway
              key={`gateway-${idx}`}
              host={gateway} />
          ) }
        </tbody>
      </table>
    </div>
  )
}

export default GatewayList
