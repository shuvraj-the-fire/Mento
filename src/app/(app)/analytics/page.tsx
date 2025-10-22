'use client';

import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Sector, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const placementByCompanyData = [
  { company: 'Innovate Inc.', placements: 45, fill: 'hsl(var(--chart-1))' },
  { company: 'DataDriven Co.', placements: 30, fill: 'hsl(var(--chart-2))' },
  { company: 'Creative Solutions', placements: 25, fill: 'hsl(var(--chart-3))' },
  { company: 'ScaleFast', placements: 20, fill: 'hsl(var(--chart-4))' },
  { company: 'TechGaints', placements: 35, fill: 'hsl(var(--chart-5))' },
  { company: 'WebWeavers', placements: 15, fill: 'hsl(var(--chart-1))' },
  { company: 'CloudNimbus', placements: 28, fill: 'hsl(var(--chart-2))' },
  { company: 'AICore', placements: 22, fill: 'hsl(var(--chart-3))' },
];

const salaryData = [
    { range: '₹3-5L', count: 45 },
    { range: '₹5-8L', count: 80 },
    { range: '₹8-12L', count: 65 },
    { range: '₹12-15L', count: 35 },
    { range: '₹15L+', count: 25 },
];

const offerAcceptanceData = [
  { name: 'Accepted', value: 240, fill: 'hsl(var(--chart-2))' },
  { name: 'Declined', value: 20, fill: 'hsl(var(--destructive))' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="space-y-2">
            <h1 className="font-headline text-3xl md:text-4xl">Placement Analytics</h1>
            <p className="text-muted-foreground">
            In-depth analysis of placement statistics and trends.
            </p>
        </div>
        <Select defaultValue="2023-2024">
            <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
                <SelectItem value="2021-2022">2021-2022</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
         <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Placements by Company</CardTitle>
                <CardDescription>Number of students placed in top companies.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={placementByCompanyData} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" />
                            <YAxis dataKey="company" type="category" width={100} tick={{ fontSize: 12 }} />
                            <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))' }}/>
                            <Bar dataKey="placements" name="Placements" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Offer Acceptance Rate</CardTitle>
                    <CardDescription>Ratio of offers accepted vs. declined.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[150px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent hideLabel />} />
                            <Pie
                            data={offerAcceptanceData}
                            dataKey="value"
                            nameKey="name"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={40}
                            outerRadius={60}
                            cy="100%"
                            paddingAngle={2}
                            >
                            {offerAcceptanceData.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                            </Pie>
                        </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Total Offers</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-primary">260</p>
                    <p className="text-xs text-muted-foreground">Across all departments</p>
                </CardContent>
            </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Salary Package Distribution</CardTitle>
            <CardDescription>Breakdown of salary packages offered to students.</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="range" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />}/>
                        <Bar dataKey="count" name="Number of Students" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
