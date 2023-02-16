import { Telegraf } from "telegraf";
import fetch from "node-fetch";
const TOKEN = "5738705161:AAF15n4PDuO1mkOZ1ZMaSBbLCXZRGA6jEpI";
import { createClient } from "pexels";
import imageSearch from "image-search-google";

const client = new imageSearch(
	"1017b26965d7849cd",
	"AIzaSyBa5minfOP2mpq8RDZLa13K-8aasA0HmyI"
);

const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
	const firstName = ctx.update.message.from.first_name;
	ctx.replyWithHTML(`Welcome <b>${firstName}</b> 👋`);
});

bot.on("message", async (ctx) => {
	let text = ctx.update.message.text;

	const options = { page: 1 };
	try {
		client
			.search(text, options)
			.then((images) => {
				for (let i in images) {
					ctx.replyWithPhoto(images[i].url);
				}
			})
			.catch((error) => console.log(error));
	} catch (error) {
		console.log("XATOLIK KETDI");
	}
});

bot.launch();
