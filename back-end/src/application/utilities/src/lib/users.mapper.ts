import {User} from "@back-end/domain/entities/user";
import {UserDTO} from "@back-end/domain/dtos/user";

export class UsersMapper {
  static toDTO(user: User): UserDTO {
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      photoUrl: user.photoUrl,
    };
  }

  static toDomain(userDTO: UserDTO): User {
    return {
      _id: userDTO._id,
      email: userDTO.email,
      name: userDTO.name,
      phoneNumber: userDTO.phoneNumber,
      address: userDTO.address,
      photoUrl: userDTO.photoUrl,
    };
  }
}
