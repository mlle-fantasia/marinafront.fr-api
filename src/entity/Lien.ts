import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Article } from "./Article";

@Entity({ name: "liens" })
export class Lien {
	@PrimaryGeneratedColumn({ name: "li_id" })
	id: number;

	@Column({ name: "li_url" })
	url: string;

	@Column({ name: "li_nom" })
	nom: string;

	@ManyToOne((type) => Article, (article) => article.liens)
	article: Article;
}
