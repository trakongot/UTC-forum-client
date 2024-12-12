'use client';

import { Activity, Badge, MessageCircle, Users } from 'lucide-react';

import { Button } from '@/components/custom/button';
import { DatePicker } from '@/components/custom/datepicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { NewThreadsChart } from './_components/newThreadsChart';
import { PieThreadsChart } from './_components/threadsChart';
import { UsersChart } from './_components/usersChart';

export default function Page() {
  return (
    <div className="flex-col px-10 pb-3 md:flex md:pb-10">
      <div className="flex-1 space-y-4">
        <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
          <div className="flex">
            <h2 className="mr-5 text-3xl font-bold tracking-tight">
              Dashboard
            </h2>
            <span className="mr-5">
              <DatePicker />
            </span>
            <span className="mr-5">
              <DatePicker />
            </span>
          </div>
          <div className="flex-col items-center space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
            <Button className="w-full">Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          {/* <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
          </TabsList> */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Threads */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Threads
                  </CardTitle>
                  <Badge className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,345</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>

              {/* Total Comments */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Comments
                  </CardTitle>
                  <MessageCircle className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">67,890</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              {/* Active Users */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Users
                  </CardTitle>
                  <Activity className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,200</div>
                  <p className="text-xs text-muted-foreground">
                    +15% from last hour
                  </p>
                </CardContent>
              </Card>

              {/* New Users */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Users
                  </CardTitle>
                  <Users className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,500</div>
                  <p className="text-xs text-muted-foreground">
                    +10% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid size-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              <div className="size-full">
                <UsersChart />
              </div>
              <div className="size-full">
                <PieThreadsChart />
              </div>
              <div className="size-full">
                <NewThreadsChart />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
