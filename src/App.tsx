import { lazy, Suspense, useEffect, useState } from 'react';
import { readTheme, saveTheme } from './theme';
import Card from "@tremor/react/dist/components/layout-elements/Card/Card.js";
import Flex from "@tremor/react/dist/components/layout-elements/Flex/Flex.js";
import Metric from "@tremor/react/dist/components/text-elements/Metric/Metric.js";
import Text from "@tremor/react/dist/components/text-elements/Text/Text.js";
import { FiActivity, FiArrowUpRight, FiBell, FiCalendar, FiChevronDown, FiCommand, FiDownload, FiFilter, FiGrid, FiHelpCircle, FiMoon, FiSearch, FiSettings, FiSun, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { formatCount, formatCurrency, getPeriodSnapshot, periodRangeOptions, salesChannelOptions, type PeriodRange, type SalesChannel } from './data/metrics';
const rows = [
  { initials: 'NO', name: 'Northline Objects', type: 'Wholesale', amount: '$42,800', change: '+18.4%', positive: true },
  { initials: 'ST', name: 'Studio Tana', type: 'Direct', amount: '$31,250', change: '+12.1%', positive: true },
  { initials: 'MO', name: 'Maison October', type: 'Wholesale', amount: '$24,900', change: '-2.8%', positive: false }
];
const RevenueChart = lazy(() => import('./components/RevenueChart'));
function Stat({ label, value }: { label: string; value: string }) {
  return <Card className="stat-card"><Text className="stat-label">{label}</Text><Flex className="stat-line" justifyContent="between" alignItems="end"><Metric className="stat-value">{value}</Metric></Flex><div className="stat-foot">Selected period</div></Card>;
}
export default function App() {
  const [theme, setTheme] = useState(readTheme);
  const dark = theme === 'dark';
  useEffect(() => { saveTheme(theme); document.documentElement.style.colorScheme = theme; }, [theme]);
  const [range, setRange] = useState<PeriodRange>('full-year');
  const [channel, setChannel] = useState<SalesChannel>('all');
  const periodData = getPeriodSnapshot(range, channel);
  const metrics = periodData.metrics;
  const planVariance = metrics.planVarianceBasisPoints / 100;
  return <div className={dark ? 'revenue-app dark' : 'revenue-app'}>
    <aside className="rail"><div className="brand-mark">A</div><nav className="rail-icons"><button className="rail-active" aria-label="Overview"><FiGrid/></button><button aria-label="Revenue"><FiTrendingUp/></button><button aria-label="Customers"><FiUsers/></button><button aria-label="Activity"><FiActivity/></button></nav><div className="rail-bottom"><button aria-label="Help"><FiHelpCircle/></button><button aria-label="Settings"><FiSettings/></button><div className="avatar">AM</div></div></aside>
    <div className="dashboard-shell"><header className="topbar"><div className="crumb"><span>WORKSPACE</span><FiChevronDown/><b>Northstar Goods</b><FiChevronDown/></div><div className="top-actions"><button className="search-control"><FiSearch/><span>Search anything</span><kbd><FiCommand/> K</kbd></button><button className="icon-button" aria-label="Notifications"><FiBell/><i/></button><button className="icon-button" aria-label="Toggle color theme" aria-pressed={dark} onClick={()=>setTheme(dark ? 'light' : 'dark')}>{dark?<FiSun/>:<FiMoon/>}</button><div className="profile">AM <span>Alex Morgan</span><FiChevronDown/></div></div></header>
      <main className="dashboard-main"><div className="welcome-row"><div><div className="eyebrow"><span className="live-dot"/> ILLUSTRATIVE SAMPLE DATA <span className="eyebrow-divider"/> {periodData.label.toUpperCase()}</div><h1>Revenue, in focus.</h1><p className="subhead">A clear read on the momentum behind your business.</p></div><div className="action-row"><label className="period-picker"><FiCalendar aria-hidden="true"/><select className="outline-action" aria-label="Reporting period" value={range} onChange={(event)=>setRange(event.target.value as PeriodRange)}>{periodRangeOptions.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select></label><label className="channel-picker"><FiFilter aria-hidden="true"/><select className="outline-action" aria-label="Sales channel" value={channel} onChange={(event)=>setChannel(event.target.value as SalesChannel)}>{salesChannelOptions.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select></label><button className="primary-action"><FiDownload/> Export report</button></div></div>
        <p className="range-feedback" role="status" aria-live="polite">Revenue KPIs and trend show {periodData.label} for {periodData.channelLabel}. Channel splits are illustrative; account examples remain full-year and unfiltered.</p>
        <div className="stat-grid"><Stat label="NET REVENUE" value={formatCurrency(metrics.netRevenueCents, 0)}/><Stat label="GROSS MARGIN" value={`${(metrics.grossMarginBasisPoints / 100).toFixed(1)}%`}/><Stat label="ORDERS" value={formatCount(metrics.orderCount)}/><Stat label="AVG. ORDER VALUE" value={formatCurrency(metrics.averageOrderValueCents)}/></div>
        <div className="content-grid"><Card className="chart-panel"><div className="panel-heading"><div><span className="section-label">PERFORMANCE</span><h2>Revenue over time</h2><p>Monthly sample performance · {periodData.label}</p></div><button className="icon-button filter-button" aria-label="Filter chart"><FiFilter/></button></div><div className="chart-legend"><span><i className="legend-revenue"/> Revenue</span><span><i className="legend-plan"/> Plan</span><strong>{planVariance > 0 ? '+' : ''}{planVariance.toFixed(1)}% <FiArrowUpRight/></strong></div><div className="tremor-wrap"><Suspense fallback={<div role="status" className="chart-loading">Loading revenue trend…</div>}><RevenueChart data={periodData.chartData}/></Suspense></div></Card>
          <Card className="insight-panel"><div className="panel-heading"><div><span className="section-label">SIGNAL TO WATCH</span><h2>Repeat customers</h2></div><span className="insight-icon"><FiUsers/></span></div><div className="insight-number">42.6<span>%</span></div><p className="insight-copy">Returning customers drove <b>61%</b> of this month's revenue, up from 54% in September.</p><div className="insight-divider"/><div className="insight-bottom"><span className="signal-chip"><i/> Healthy signal</span><a href="#customers">View cohort <FiArrowUpRight/></a></div><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></Card></div>
        <section className="table-panel"><div className="table-heading"><div><span className="section-label">CUSTOMER MIX</span><h2>Top accounts</h2></div><button className="text-action">Full report <FiArrowUpRight/></button></div><p className="table-caption">Full-year account examples; not filtered by reporting period or sales channel.</p><div className="table-scroll"><table><thead><tr><th>ACCOUNT</th><th>CHANNEL</th><th>REVENUE</th><th>PERIOD CHANGE</th></tr></thead><tbody>{rows.map(row=><tr key={row.name}><td><div className="account-name"><span className="account-avatar">{row.initials}</span><b>{row.name}</b></div></td><td><span className="channel-tag">{row.type}</span></td><td className="amount">{row.amount}</td><td><span className={row.positive?'table-change positive':'table-change negative'}>{row.change}</span></td></tr>)}</tbody></table></div></section>
        <footer className="dashboard-footer"><span>Synthetic figures for product preview</span><span>No merchant data is connected <i className="sync-dot"/><a href="#settings">Manage sources</a></span></footer>
      </main></div>
  </div>;
}
