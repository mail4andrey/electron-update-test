import { Clipmaker } from './applications/clipmaker/main';
import { Kiosk } from './applications/kiosk/main';
import { Spinner } from './applications/spinner/main';

switch (process.env.APPLICATION) {
	case 'clipmaker':
		Clipmaker.run();
		break;

	case 'kiosk':
		Kiosk.run();
		break;

	case 'spinner':
		Spinner.run();
		break;

	default:
		Spinner.run();
		break;
}