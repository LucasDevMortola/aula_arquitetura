import {
  Column,
  Entity,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from "typeorm";

import { v4 as uuid} from 'uuid'
@Entity({
  name: "impediments",
})
export class ImpedimentEntity extends BaseEntity{
  @PrimaryColumn()
  uid!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  resolve!: boolean;
  
  @Column()
  uid_project!: string;

  @Column()
  create_at!: Date;

  @Column()
  update_at!: Date;

  @BeforeInsert()
  private beforeInsert() {
    this.uid = uuid();
    this.create_at = new Date();
    this.update_at = new Date();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.update_at = new Date();
  }
}
