'use client';
import { getNotifications } from '@/apis/notification';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn, formatTimeAgo, throttle } from '@/lib/utils';
import useUserStore from '@/store/useUserStore';
import { BellRing } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

type CardProps = React.ComponentProps<typeof Card>;

function Page({ className, ...props }: CardProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 3;
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { user } = useUserStore();
  const { data: notifications, isFetching } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
    onError: (error) => {
      console.error('Sever bảo trì vui lòng thử lại sau', error);
    },
    enabled: !!user?._id,
  });
  // Infinite scroll handler with throttle
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (loaderRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = loaderRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 100 && !isFetching) {
          setPageNumber((prev) => prev + 1);
        }
      }
    }, 300); // Adjust delay as needed

    const divRef = loaderRef.current;
    divRef?.addEventListener('scroll', handleScroll);

    return () => {
      divRef?.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <div className="flex flex-wrap justify-between">
          <div className="flex w-full flex-col md:w-1/2">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              You have {notifications?.length} unread messages.
            </CardDescription>
          </div>
          <div className="flex w-full justify-end space-x-4 rounded-md  p-4 md:w-1/2">
            <BellRing />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </CardHeader>
      <CardContent
        ref={loaderRef}
        className="no-scrollbar mt-9 grid max-h-[80vh] flex-col gap-4 overflow-auto pb-40"
      >
        <div>
          {notifications &&
            notifications?.map((notification, index) => (
              <div
                key={index}
                className=" mb-4 grid grid-cols-[25px_1fr] items-start border p-4 last:mb-0 "
              >
                <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.type === 'like'
                      ? `${notification.user.name} liked the post: "${notification.thread?.text}" of ${notification.target?.name}`
                      : notification.type}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Page;
