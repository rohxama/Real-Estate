export interface Faq {
  question: string;
  answer: string;
}

/**
 * Questions are transcribed from the reference. Answers are placeholders
 * because the capture cannot resolve body copy below roughly 13px.
 */
export const faqs: Faq[] = [
  {
    question: 'What are your fees, and how do you charge?',
    answer:
      'Our fee is agreed in writing before we begin and is typically a percentage of the purchase price. It covers search, private viewings, negotiation and coordination through to completion, with no hidden charges.',
  },
  {
    question: 'Do you offer an initial or private tour?',
    answer:
      'Yes. We begin with a private consultation, in person or by video, and then arrange viewings at times that suit you — including evenings and weekends for off-market residences.',
  },
  {
    question: 'Should we make an offer or can we negotiate directly?',
    answer:
      'We handle every offer on your behalf. Your adviser will advise on positioning, present the terms directly to the seller’s side and negotiate discreetly until an agreement is reached.',
  },
  {
    question: 'Do we need an extra deposit/booking fee?',
    answer:
      'A reservation deposit is only required once an offer is accepted, and it is held against the purchase price. We confirm the exact amount and protections in writing before anything is signed.',
  },
];
