"use client";
import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { getNotifications } from "@/apis/notification";
import { Notification } from "@/types/notification";
import { useQuery } from "react-query";

// Helper function to calculate time difference
function timeAgo(date: string) {
  const now = new Date();
  const createdAt = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return `${diffInSeconds} seconds ago`;
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  return `${diffInDays} days ago`;
}

type CardProps = React.ComponentProps<typeof Card>;

function Page({ className, ...props }: CardProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data } = useQuery("notifications", getNotifications, {
    onSuccess: (data) => {
      setNotifications(data);
    },
    onError: (error) => {
      console.error("Error fetching notifications:", error);
    },
  });

  return (
    <Card className={cn( className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have {notifications.length} unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex  space-x-4 rounded-md  p-4 w-50">
          <BellRing />
          <div className="   space-y-1">
            <p className="text-sm font-medium leading-none">Push Notifications</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className=" border p-4 mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 "
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.type === "like"
                    ? `${notification.user.name} liked the post: "${notification.thread?.text}" of ${notification.target?.name}`
                    : notification.type}
                </p>
                <p className="text-sm text-muted-foreground">
                  {timeAgo(notification.createdAt)} {/* Calculate time ago */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Page;
