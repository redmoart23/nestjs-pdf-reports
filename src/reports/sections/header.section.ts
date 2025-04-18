import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  alignment: 'left',
  margin: [0, 0, 0, 20],
};

interface HeaderOptions {
  title: string;
  subtitle: string;
  showLogo: boolean;
  showDate: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subtitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate
    ? {
        text: DateFormatter.formatDate(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : '';

  const headerTitle: Content = title
    ? { text: title, style: { fontSize: 22, bold: true }, alignment: 'center' }
    : '';

  const headerSubtitle: Content = subtitle
    ? { text: subtitle, style: { bold: true } }
    : '';

  return [headerLogo, headerTitle, headerSubtitle, headerDate];
};
