'use client'

import type { PageContent } from '@/lib/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { Key, Send } from 'lucide-react'

type ContactProps = {
  content: PageContent['contact']
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function Contact({ content }: ContactProps) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Transmission Sent",
      description: "Your encrypted message has been securely dispatched.",
      variant: 'default',
      className: 'bg-primary text-primary-foreground border-accent',
    })
    form.reset()
  }
  
  return (
    <section id="contact" className="w-full">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">{content.title}</h2>
        <p className="text-lg text-gray-400 mt-2">{content.description}</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-accent font-headline">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your alias" {...field} className="bg-card/80 backdrop-blur-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-accent font-headline">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your-secure@email.com" {...field} className="bg-card/80 backdrop-blur-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-accent font-headline">Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your encrypted message here..." {...field} className="bg-card/80 backdrop-blur-sm min-h-[150px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" size="lg" className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground font-bold font-headline glow-shadow">
                <Send className="mr-2 h-4 w-4" />
                Send Transmission
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold font-headline">
                <a href="/pgp-key.txt" download>
                  <Key className="mr-2 h-4 w-4" />
                  Download PGP Key
                </a>
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </section>
  )
}
