import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Roboto_Flex as Roboto,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const fontSerif = Roboto({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});
