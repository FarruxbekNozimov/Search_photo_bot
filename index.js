import { Telegraf } from "telegraf";
import fetch from "node-fetch";
const TOKEN = "5738705161:AAF15n4PDuO1mkOZ1ZMaSBbLCXZRGA6jEpI";
import { createClient } from "pexels";

const client = createClient(
	"esXMiq8unRbSpR84z13VkwvY4MNqdfqkThYVCIE2tpQWYjsNmM4bOYMr"
);

const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
	const firstName = ctx.update.message.from.first_name;
	ctx.replyWithHTML(`Welcome <b>${firstName}</b> 👋`);
});

bot.on("message", async (ctx) => {
	let text = ctx.update.message.text;
	console.log(text);
	const query = "Nature";

	// client.photos.search({ query, per_page: 3 }).then((photos) => {
	// 	// console.log(photos);
	// 	let photo = photos.photos;
	// 	for (let i in photo) {
	// 		ctx.replyWithPhoto(photo[i].src.original);
	// 	}
	// });
	fetch(`https://api.pexels.com/v1/search?query=${text}`)
		.then((res) => res.json())
		.then((json) => {
			let photos = json.photos;
			for (let i in photos) {
				ctx.replyWithPhoto(photos[i].webformatURL);
			}
			console.log(json, text);
		})
		.catch((err) => console.log(err));
});

bot.launch();
