
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2 } from "lucide-react";
import { getSuggestionAction } from "@/app/actions";

const formSchema = z.object({
  key: z.string().min(1, "Key cannot be empty."),
  value: z.string().min(1, "Value cannot be empty."),
});

type FormValues = z.infer<typeof formSchema>;

interface AddKeyFormProps {
    onAddOrUpdate: (data: FormValues) => void;
}

export function AddKeyForm({ onAddOrUpdate }: AddKeyFormProps) {
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: "",
      value: "",
    },
  });

  const handleSuggest = async () => {
    const value = form.getValues("value");
    // clear any previous errors
    form.clearErrors("value");

    if (!value) {
      form.setError("value", { type: "manual", message: "A value is needed to suggest a key." });
      return;
    }
    
    setIsSuggesting(true);
    const result = await getSuggestionAction(value);
    setIsSuggesting(false);

    if (result.suggestedKey) {
      form.setValue("key", result.suggestedKey, { shouldValidate: true });
      form.clearErrors("key");
    }
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Suggestion Failed",
        description: result.error,
      });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onAddOrUpdate(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your data value here..."
                  className="font-code min-h-[120px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key</FormLabel>
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <FormControl>
                      <Input placeholder="your-key-here" className="font-code" {...field} />
                  </FormControl>
                  <FormMessage className="mt-2" />
                </div>
                <Button type="button" variant="outline" size="icon" aria-label="Suggest Key" disabled={isSuggesting} onClick={handleSuggest}>
                  {isSuggesting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4" />}
                </Button>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Save Key-Value
        </Button>
      </form>
    </Form>
  );
}
