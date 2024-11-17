"use client";
import { createThread } from "@/apis/threads";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useTriggerStore from "@/store/useTriggerStore";
import { Thread } from "@/types/threadType";
import { useMutation } from "react-query";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../custom/button";

export function CreateThreadCard() {
  const isCreateThreadCardOpened = useTriggerStore(
    (state) => state.isCreateThreadCardOpened
  );
  const toggleTrigger = useTriggerStore((state) => state.toggleTrigger);
  const handleOpenChange = () => {
    toggleTrigger("isCreateThreadCardOpened");
  };

  return (
    <Dialog open={isCreateThreadCardOpened} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create thread</DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you&apos;re done. */}
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <CreateThreadForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

type FormData = z.infer<typeof formSchema>;
function CreateThreadForm({ className }: React.ComponentProps<"form">) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toggleTrigger } = useTriggerStore();

  // API mutation setup with React Query
  const { isLoading, mutate } = useMutation<Thread, Error, { text: string }>({
    mutationFn: createThread,
    onSuccess: () => {
      toggleTrigger("isCreateThreadCardOpened");
      toast({
        title: "Create Success",
        action: <ToastAction altText="undo">Undo</ToastAction>,
      });
    },
    onError: (error: any) => {
      console.error("Error creating thread:", error);
      const errMessage =
        error?.response?.data?.error || "Server error, please try again later";
      setErrorMessage(errMessage);
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    // Trigger mutation with form data
    mutate({
      text: values.text,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="font-semibold">Bio</FormLabel>
              <FormControl>
                <Textarea rows={10} className="no-focus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Handling */}
        {errorMessage && (
          <p className="text-sm font-medium text-red-500 dark:text-red-900">
            {errorMessage}
          </p>
        )}
        <Button className="mt-2" loading={isLoading}>
          Create
        </Button>
      </form>
    </Form>
  );
}

export default CreateThreadForm;
