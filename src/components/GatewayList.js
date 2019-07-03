/* global fetch, performance */
import React, { useState, useEffect } from 'react'
import GATEWAYS from '../../static/gateways.json'

const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'

const Gateway = ({ gatewayUrl, incrementChecked, incrementOnline }) => {
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
        incrementOnline()
        setRtt(rtt)
      }).catch(() => {
        setOnline(false)
      })
      .finally(() => {
        incrementChecked()
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

const Badge = ({ checked, total = 0, online = null }) => (
  online
    ? <span className='ml1 pv1 ph2 white br-pill f7' style={{ backgroundColor: '#00b500' }} title='Online gateways'>{checked}</span>
    : <span className='ml1 pv1 ph2 bg-navy white br-pill f7' title='Checked gateways'>{checked}/{total}</span>
)

const GatewayList = () => {
  const [checked, setChecked] = useState(0)
  const [online, setOnline] = useState(0)

  const incrementChecked = () => setChecked(checked => checked + 1)
  const incrementOnline = () => setOnline(online => online + 1)

  const tableClass = 'w-100 w-80-ns mv4 center collapse sans-serif'
  const headerClass = 'fw6 tl tracked pv2 ph3'

  return (
    <div className='h-100 flex flex-column align-center'>
      <table className={tableClass}>
        <tbody>
          <tr>
            <td className={headerClass}>Status <Badge checked={online} online /></td>
            <td className={headerClass}>Gateway <Badge checked={checked} total={GATEWAYS.length} /></td>
            <td className={headerClass}>Response time</td>
          </tr>
          { GATEWAYS.map((gateway, idx) =>
            <Gateway
              key={`gateway-${idx}`}
              gatewayUrl={gateway}
              incrementChecked={incrementChecked}
              incrementOnline={incrementOnline} />
          ) }
        </tbody>
      </table>
    </div>
  )
}

export default GatewayList
