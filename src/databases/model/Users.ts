//modelo = representaçao do objeto que trafega entre banco e aplicação.

import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class User extends Model {
    static table = 'users' //nome da tabela

    @field('user_id') //nome do campo na tebela
    user_id!: string; //nome interno da tabela

    @field('name')
    name!: string; 

    @field('email')
    email!: string;

    @field('driver_license')
    driver_license!: string;

    @field('avatar')
    avatar!: string;

    @field('token')
    token!: string;
}

export { User } 