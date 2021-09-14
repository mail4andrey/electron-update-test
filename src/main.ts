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

// const r = require('./applications/clipmaker/main');


// const application = `./applications/${process.env.APPLICATION}/main`;
// import(application)
// 	.then(mainModule => {
// 		mainModule.run();
// 	})
// 	.catch(error => {
// 		console.error(error);
// 	});

/** */
// async function run() {
// 	const mainModule = await import(application);
// 	mainModule.main.run();
// 	// `a` is imported and can be used here
// }