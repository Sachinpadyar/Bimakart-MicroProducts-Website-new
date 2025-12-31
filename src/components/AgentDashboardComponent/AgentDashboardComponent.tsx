import { useState } from "react";
import { Row, Col, Card, Typography, Select, Table } from "antd";
import {
    ClipboardList,
    Wallet,
    Trophy,
    TrendingUp,
    TrendingDown,
    ChevronDown,
    ShieldCheck,
    FileText,
    Activity,
    Award
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import "./DashboardComponent.css";

const { Title, Text } = Typography;
const { Option } = Select;

// Sample Data for Chart
const chartData = [
    { name: "June", sales: 150 },
    { name: "July", sales: 250 },
    { name: "Aug", sales: 200 },
    { name: "Sept", sales: 380 },
    { name: "Oct", sales: 320 },
    { name: "Nov", sales: 480 },
    { name: "Dec", sales: 400 },
    { name: "Jan", sales: 490 },
    { name: "Feb", sales: 580 },
    { name: "Mar", sales: 680 },
];

// Sample Data for Table
const policyData = [
    {
        key: "1",
        policy: "Suraksha Policy",
        icon: <ShieldCheck size={18} color="#ff6b00" />,
        iconBg: "#fff0e6",
        sold: 420,
        revenue: "1,23,400",
        contribution: 75,
    },
    {
        key: "2",
        policy: "Kartavya Policy",
        icon: <FileText size={18} color="#1890ff" />,
        iconBg: "#e6f7ff",
        sold: 265,
        revenue: "1,05,475",
        contribution: 42,
    },
    {
        key: "3",
        policy: "Rudraksh Policy",
        icon: <Activity size={18} color="#52c41a" />,
        iconBg: "#f6ffed",
        sold: 155,
        revenue: "98,946",
        contribution: 36,
    },
    {
        key: "4",
        policy: "Road Kavach Policy",
        icon: <ShieldCheck size={18} color="#722ed1" />,
        iconBg: "#f9f0ff",
        sold: 76,
        revenue: "62,822",
        contribution: 21,
    },
    {
        key: "5",
        policy: "Sanjeevani Policy",
        icon: <FileText size={18} color="#eb2f96" />,
        iconBg: "#fff0f6",
        sold: 34,
        revenue: "49,223",
        contribution: 10,
    },
    {
        key: "6",
        policy: "Rakshak Policy",
        icon: <Award size={18} color="#faad14" />,
        iconBg: "#fffbe6",
        sold: 6,
        revenue: "3,566",
        contribution: 4,
    },
];

const AgentDashboardComponent = () => {
    const [activeFilter, setActiveFilter] = useState("1D");

    const timeFilters = ["1D", "1W", "1M", "Last month", "This quarter", "Last quarter", "This FY", "Last FY"];

    const columns = [
        {
            title: "Policy",
            dataIndex: "policy",
            key: "policy",
            render: (text: string, record: any) => (
                <div className="policy-cell">
                    <div className="policy-icon" style={{ backgroundColor: record.iconBg }}>
                        {record.icon}
                    </div>
                    <Text strong>{text}</Text>
                </div>
            ),
        },
        {
            title: "Policies Sold",
            dataIndex: "sold",
            key: "sold",
            align: "center" as const,
        },
        {
            title: "Revenue",
            dataIndex: "revenue",
            key: "revenue",
            render: (text: string) => `₹${text}`,
            align: "center" as const,
        },
        {
            title: "Contribution",
            dataIndex: "contribution",
            key: "contribution",
            render: (value: number) => (
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${value}%`, backgroundColor: "#ff6b00" }}
                        />
                    </div>
                    <span className="contribution-text">{value}%</span>
                </div>
            ),
        },
    ];

    const StatCard = ({ title, value, trend, isUp, icon, iconBg, hasBorder = false }: any) => (
        <Card className={`stat-card ${hasBorder ? 'best-selling-card' : ''}`}>
            <div className="stat-card-content">
                <div className="stat-icon-wrapper" style={{ backgroundColor: iconBg }}>
                    {icon}
                </div>
                <div className="stat-info">
                    <Text className="stat-title">{title}</Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Title level={4} className="stat-value" style={{ margin: 0 }}>{value}</Title>
                        <div className={`stat-trend ${isUp ? 'trend-up' : 'trend-down'}`}>
                            {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span>{trend}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );

    return (
        <div className="dashboard-wrapper MainComponentWrapper ">
            <div className="top-header-bar">
                <div className="Container header-inner">
                    <Link to="/"><img src="/logo.png" alt="Bimakart" className="header-logo" /></Link>
                    <div className="header-right">
                        <span className="user-name">Yalina Jamali</span>
                        <div className="user-avatar">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" />
                        </div>
                        <button className="sign-out-btn">Sign Out</button>
                    </div>
                </div>
            </div>
            <div className="Container SectionPaddingBottom ">
                {/* Header Section */}

                <div className="dashboard-header">
                    <div>
                        <div>
                            <Link to="/">
                                <button className="BtnFlex">
                                    <GoArrowLeft /> Back
                                </button>
                            </Link>
                        </div>
                        <br />
                        <div className="dashboard-header-text">
                            <div className="SectionMainHeading">Agent Dashboard</div>
                            <Text>Track your sales, revenue, and performance at a glance</Text>
                        </div>
                    </div>
                    <div className="time-filters">
                        {timeFilters.map((filter) => (
                            <button
                                key={filter}
                                className={`time-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quick Stats Section */}
                <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                    <Col xs={24} md={8}>
                        <StatCard
                            title="Policies Issued"
                            value="1,248"
                            trend="12%"
                            isUp={true}
                            icon={<ClipboardList size={24} color="#ff6b00" />}
                            iconBg="#fff0e6"
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <StatCard
                            title="Revenue Generated"
                            value="₹ 4,39,866"
                            trend="7%"
                            isUp={false}
                            icon={<Wallet size={24} color="#1890ff" />}
                            iconBg="#e6f7ff"
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <StatCard
                            title="Best Selling Policy"
                            value="Suraksha Policy"
                            trend="3%"
                            isUp={true}
                            icon={<Trophy size={24} color="#ff6b00" />}
                            iconBg="#fff0e6"
                            hasBorder={true}
                        />
                    </Col>
                </Row>

                {/* Charts & Table Section */}
                <Row gutter={[24, 24]}>
                    {/* Performance Overview Chart */}
                    <Col xs={24} lg={14}>
                        <Card className="section-card FlexColumn">
                            <div className="section-header">
                                <div className="SectionCardTitle">Performance Overview</div>
                                <div className="section-filters">
                                    <Select defaultValue="category" style={{ width: 150 }} suffixIcon={<ChevronDown size={14} />}>
                                        <Option value="category">Select a category</Option>
                                    </Select>
                                    <Select defaultValue="policy" style={{ width: 150 }} suffixIcon={<ChevronDown size={14} />}>
                                        <Option value="policy">Select a policy</Option>
                                    </Select>
                                    <Select defaultValue="range" style={{ width: 130 }} suffixIcon={<ChevronDown size={14} />}>
                                        <Option value="range">Select range</Option>
                                    </Select>
                                </div>
                            </div>
                            <div style={{ height: 350, width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#ff6b00" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#adb5bd', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#adb5bd', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="sales"
                                            stroke="#ff6b00"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorSales)"
                                            dot={{ r: 4, fill: '#ff6b00', strokeWidth: 2, stroke: '#fff' }}
                                            activeDot={{ r: 6, fill: '#ff6b00', strokeWidth: 0 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </Col>

                    {/* Policy Performance Table */}
                    <Col xs={24} lg={10}>
                        <Card className="section-card">
                            <div className="section-header">
                                <div className="SectionCardTitle">Policy Performance</div>
                                <Select defaultValue="range" style={{ width: 130 }} suffixIcon={<ChevronDown size={14} />}>
                                    <Option value="range">Select range</Option>
                                </Select>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={policyData}
                                pagination={false}
                                className="policy-table"
                                size="middle"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AgentDashboardComponent;