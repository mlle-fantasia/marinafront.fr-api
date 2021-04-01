import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn({ name: "us_id" })
	id: number;

	@Column({ name: "us_email" , default:""})
	email: string;

	@Column({ name: "us_password", type: "text" , default:""})
	password: string;

	@Column({ name: "us_tel" , default:""})
	tel: string;

	@Column({ name: "us_address" , default:""})
	address: string;

	@Column({ name: "us_city", default:"" })
	city: string;

	@Column({ name: "us_area" , default:""})
	area: string;

	@Column({ name: "us_cv", default:"" })
	cv: string;
}
