import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Calendar, DollarSign, Users, Ticket } from "@repo/ui/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

const attendanceData = [
  { name: "Registered", value: 395 },
  { name: "Checked In", value: 280 },
  { name: "No Show", value: 115 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function DashboardContent() {
  return (
    <div className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <DashboardCard
          title='Total Revenue'
          value='$45,231.89'
          icon={<DollarSign className='h-4 w-4 text-muted-foreground' />}
          change='+20.1% from last month'
        />
        <DashboardCard
          title='Tickets Sold'
          value='2,350'
          icon={<Ticket className='h-4 w-4 text-muted-foreground' />}
          change='+15% from last month'
        />
        <DashboardCard
          title='Upcoming Events'
          value='12'
          icon={<Calendar className='h-4 w-4 text-muted-foreground' />}
          change='Next event in 3 days'
        />
        <DashboardCard
          title='Active Users'
          value='573'
          icon={<Users className='h-4 w-4 text-muted-foreground' />}
          change='+201 since last hour'
        />
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        <SalesOverviewChart />
        <AttendanceOverviewChart />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon,
  change,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-xs text-muted-foreground'>{change}</p>
      </CardContent>
    </Card>
  );
}

function SalesOverviewChart() {
  const salesData = [
    { name: "Jan", sales: 4000, revenue: 24000 },
    { name: "Feb", sales: 3000, revenue: 18000 },
    { name: "Mar", sales: 5000, revenue: 30000 },
    { name: "Apr", sales: 4500, revenue: 27000 },
    { name: "May", sales: 6000, revenue: 36000 },
    { name: "Jun", sales: 5500, revenue: 33000 },
  ];

  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width='100%'
          height={300}
        >
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis yAxisId='left' />
            <YAxis
              yAxisId='right'
              orientation='right'
            />
            <RechartsTooltip />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='sales'
              stroke='#8884d8'
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke='#82ca9d'
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function AttendanceOverviewChart() {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width='100%'
          height={300}
        >
          <RechartsPieChart>
            <Pie
              data={attendanceData}
              cx='50%'
              cy='50%'
              labelLine={false}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
            >
              {attendanceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <RechartsTooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
        <div className='mt-4 flex justify-center space-x-4'>
          {attendanceData.map((entry, index) => (
            <div
              key={`legend-${index}`}
              className='flex items-center'
            >
              <div
                className='w-3 h-3 mr-1'
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span>
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
