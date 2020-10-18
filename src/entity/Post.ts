import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "posts" })
export class Post {
	@PrimaryGeneratedColumn({ name: "po_id" })
	id: number;

	@Column({ name: "po_order" })
	order: number;

	@Column({ name: "po_title" })
	title: string;

	@Column({ name: "po_contenu", type: "text" })
	contenu: string;

	@Column({ name: "po_resume" })
	resume: string;

	@Column({ name: "po_image" })
	image: string;

	@Column({ name: "po_image2" })
	image2: string;

	@Column({ name: "po_date", type: "date" })
	date: string;
	
	@Column({ name: "po_hidden" })
	hidden: boolean;
}
