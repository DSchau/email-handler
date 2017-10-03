import { renderToString } from 'react-dom/server';
import { EmailTemplate } from './email-template';

export default renderToString(<EmailTemplate name="Dustin Schau" />);
