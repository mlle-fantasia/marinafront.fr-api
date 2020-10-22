import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Lien } from "./Lien";

@Entity({ name: "projet" })
export class Projet {
	@PrimaryGeneratedColumn({ name: "pr_id" })
	id: number;

	@Column({ name: "pr_order" })
	order: number;

	@Column({ name: "pr_title" })
	title: string;

	@Column({ name: "pr_contenu", type: "text" })
	contenu: string;

	@Column({ name: "pr_langage" })
	langage: string;

	@Column({ name: "pr_hidden", default:true })
	hidden: boolean;

	@Column({ name: "pr_site", nullable: true })
	site: string;
}
