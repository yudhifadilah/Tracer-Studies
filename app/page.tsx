import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Tracer&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Study&nbsp;</h1>
				<br />
				<h1 className={title()}>
					Studi pelakacan jejak lulusan/alumni.
				</h1>
				<h2 className={subtitle({ class: "mt-5" })}>
					untuk mengetahui, outcome pendidikan.
				</h2>
			</div>

			<div className="mt-4">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Tracer Study <Code color="primary">SMK Darut Tauhid</Code>
					</span>
				</Snippet>
			</div>
		</section>
	);
}
