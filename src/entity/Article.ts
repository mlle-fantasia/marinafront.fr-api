import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Lien } from "./Lien";

@Entity({ name: "articles" })
export class Article {
	@PrimaryGeneratedColumn({ name: "ar_id" })
	id: number;

	@Column({ name: "ar_order" })
	order: number;

	@Column({ name: "ar_title" })
	title: string;

	@Column({ name: "ar_resume" })
	resume: string;

	@Column({ name: "ar_contenu", type: "text" })
	contenu: string;

	@Column({ name: "ar_langage" })
	langage: string;

	@Column({ name: "ar_miniature" , nullable: true})
	miniature: string;

	@Column({ name: "ar_hidden" , default:true})
	hidden: boolean;

	@Column({ name: "ar_oc" , default:false})
	oc: boolean;

	@Column({ name: "ar_site", nullable: true })
	site: string;

	@OneToMany((type) => Lien, (lien) => lien.article)
	liens: Lien[];
}
