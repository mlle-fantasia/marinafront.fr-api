import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn({ name: "us_id" })
	id: number;

	@Column({ name: "us_email" })
	email: string;

	@Column({ name: "us_password", type: "text" })
	password: string;

	@Column({ name: "us_tel" })
	tel: string;

	@Column({ name: "us_address" })
	address: string;

	@Column({ name: "us_city" })
	city: string;
}
