import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({name: "posts" })
export class Post {

    @PrimaryGeneratedColumn({name: "po_id"})
    id: number;

    @Column({name: "po_title"})
    title: string;

    @Column({name: "po_contenu", type:"text"})
    contenu: string;


}