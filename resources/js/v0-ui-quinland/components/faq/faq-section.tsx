'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/v0-ui-quinland/components/ui/accordion"

const FAQS = [
  {
    question: "How can I view a property I'm interested in?",
    answer:
      "You can contact our agent to schedule a property viewing. We'll arrange a time that's convenient for both you and the property owner.",
  },
  {
    question: 'Does Realteek offer free consultations?',
    answer:
      'Yes, we offer free initial consultations to discuss your property needs and help you understand the buying or selling process.',
  },
  {
    question: 'How long does it take to sell a property?',
    answer:
      'The timeline varies depending on market conditions, property location, and pricing. On average, properties sell within 30-90 days with proper marketing.',
  },
  {
    question: 'What is the process for buying property?',
    answer:
      'The process includes property search, viewing, offer submission, negotiation, due diligence, financing approval, and closing. Our agents guide you through each step.',
  },
  {
    question: 'How can I contact Realteek Real Estate?',
    answer:
      'You can reach us through our contact form, phone, or email. Our team is available Monday to Friday, 9 AM to 6 PM to assist with your inquiries.',
  },
]

import { usePage } from '@inertiajs/react'

export function FaqSection() {
  const { props } = usePage<any>()
  const faqsItems = props.faqs?.length > 0 ? props.faqs : FAQS;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        {/* Left Column - Heading */}
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Frequently Asked Question
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Here are some common questions along with their answers to help
            clear up any confusion.
          </p>
        </div>

        {/* Right Column - Accordion */}
        <div className="lg:col-span-3">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqsItems.map((faq: any, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-4 overflow-hidden rounded-2xl border-0 bg-card shadow-sm transition-shadow hover:shadow-md data-[state=open]:bg-foreground data-[state=open]:text-background"
              >
                <AccordionTrigger className="px-6 py-5 text-left text-lg font-semibold hover:no-underline sm:px-8 sm:py-6 sm:text-xl [&[data-state=open]>svg]:text-background">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0 text-sm leading-relaxed sm:px-8 sm:text-base data-[state=open]:text-background/90">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
