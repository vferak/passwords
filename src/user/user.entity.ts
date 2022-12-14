import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ name: 'id' })
  private _id!: number;

  @Property({ name: 'name' })
  private _name!: string;

  @Property({ name: 'password' })
  private _password!: string;

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }
}
