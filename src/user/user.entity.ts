import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey({ name: 'uuid' })
  private _uuid: string = v4();

  @Property({ name: 'email' })
  private _email!: string;

  @Property({ name: 'password' })
  private _password!: string;

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
