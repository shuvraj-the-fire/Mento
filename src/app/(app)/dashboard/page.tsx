'use client';

import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { mockDepartmentInsightData, mockPlacementTrendData, mockSkillData } from '@/lib/mock-data';
import type { DepartmentInsightData, PlacementTrendData, SkillData } from '@/lib/types';

const chartConfigSkills = {
  students: {
    label: 'Students',
    color: 'hsl(var(--chart-1))',
  },
};

const chartConfigPlacements = {
  placements: {
    label: 'Placements',
    color: 'hsl(var(--chart-1))',
  },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl md:text-4xl">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a snapshot of placement activities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Placements</CardTitle>
            <CardDescription>This academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">260</p>
            <p className="text-xs text-muted-foreground">+20.1% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Companies Onboarded</CardTitle>
            <CardDescription>New partnerships</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">42</p>
            <p className="text-xs text-muted-foreground">+15% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Salary</CardTitle>
            <CardDescription>Annual package</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">₹70.5L</p>
            <p className="text-xs text-muted-foreground">+8% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Skill Distribution</CardTitle>
            <CardDescription>Top skills across student profiles.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigSkills} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSkillData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="skill" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="students" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Departmental Insights</CardTitle>
            <CardDescription>Placement distribution by department.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Tooltip
                        content={<ChartTooltipContent nameKey="placed" hideLabel />}
                    />
                    <Pie
                        data={mockDepartmentInsightData}
                        dataKey="placed"
                        nameKey="department"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                    </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Placement Trends</CardTitle>
            <CardDescription>Monthly placement volume.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigPlacements} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPlacementTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="placements" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  );
}
