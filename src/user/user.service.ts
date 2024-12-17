import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor()
    async checkExistUser(email) {
      const findUser = await User.findOne({ email });

    }
}
