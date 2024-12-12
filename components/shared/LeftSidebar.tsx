'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { logoutUser } from '@/apis/auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { sidebarLinks } from '@/constants';
import useTriggerStore from '@/store/useTriggerStore';
import useUserStore from '@/store/useUserStore';
import { LogOut } from 'lucide-react';
import { useMutation } from 'react-query';
import { toast } from '../ui/use-toast';
const LeftSidebar = () => {
  const pathname = usePathname();
  const { LeftSidebarOpened, toggleTrigger } = useTriggerStore();
  const userId = useUserStore((state) => state?.user?._id);
  const logout = useUserStore((state) => state?.logout);

  const router = useRouter();
  const { mutate: mutatelogout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      if (data.success) {
        logout();
        router.push('/sign-in');
        toast({
          title: 'Logout Success',
        });
      }
    },
    onError: (error: any) => {
      console.error('Error updating user:', error);
      const errMessage =
        error?.response?.data?.error || 'Server error, please try again later';
      errMessage(errMessage); // Set error message from API
    },
  });

  return (
    <section
      className={`custom-scrollbar sticky left-0 top-0 z-20 flex h-screen ${
        LeftSidebarOpened
          ? 'w-64'
          : 'w-[105px] transition-all duration-500 ease-in-out'
      } flex-col justify-between border-r border-r-light-6 pb-5 pt-28 dark:border-r-dark-4 dark:bg-dark-2 max-md:hidden`}
    >
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          const isCreateThreadLink = link.route === '/create-thread';

          if (link.route === '/profile' && userId)
            link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={isCreateThreadLink ? '#' : link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                isActive && 'bg-light-5 dark:bg-primary-500'
              }`}
              onClick={
                isCreateThreadLink
                  ? () => toggleTrigger('isCreateThreadCardOpened')
                  : undefined
              }
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              {LeftSidebarOpened && (
                <p className={`dark:text-light-1 max-lg:hidden`}>
                  {link.label}
                </p>
              )}
            </Link>
          );
        })}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="mt-10 px-6">
            <div className="flex cursor-pointer gap-4 p-4">
              <LogOut className="size-6" />
              {LeftSidebarOpened && (
                <p className="dark:text-light-2 max-lg:hidden">Logout</p>
              )}
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc chắn muốn đăng xuất không?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sẽ bị đăng xuất khỏi tài khoản của mình. Mọi tiến trình chưa
              lưu có thể sẽ bị mất.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutatelogout()}>
              Đăng xuất
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default LeftSidebar;
