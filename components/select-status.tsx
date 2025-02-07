"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postStatus } from "@/app/service";
import { useTransition } from "react";
import { Send } from "lucide-react";

// Form Validation Schema using Zod
const FormSchema = z.object({
  status: z.enum(
    ["Moist soil: Recheck in 3 hours", "Moist until next watering", "Watered"],
    {
      required_error: "Please select a status.",
    }
  ),
});

export default function StatusForm({
  onStatusSubmitted,
}: {
  onStatusSubmitted: () => void;
}) {
  const [loading] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: undefined,
    },
  });

  // Handle Form Submission
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await postStatus(data);
      if (res) {
        toast({
          title: "Status Submitted Successfully!",
          description: data.status,
        });
      }
      onStatusSubmitted();
    } catch (error: any) {
      toast({
        title: "Error submitting status!",
        description: data.status,
      });
      console.log(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Soil Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-white">
                    <SelectValue placeholder="Choose a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Moist soil: Recheck in 3 hours">
                    Moist soil: Recheck in 3 hours
                  </SelectItem>
                  <SelectItem value="Moist until next watering">
                    Moist until next watering
                  </SelectItem>
                  <SelectItem value="Watered">Watered</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the current status of your plant to track its watering
                needs.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit">
            {!loading && (
              <div className="flex justify-between flex-row gap-2">
                <Send />
                Submit Status
              </div>
            )}

            {loading && (
              <div className="w-6 h-6 border-2 border-dashed p-2 mx-5 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
