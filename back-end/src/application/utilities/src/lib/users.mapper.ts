import {User, UserList} from "@back-end/domain/entities/user";
import {UserDTO, UserListDTO} from "@back-end/domain/dtos/user";

export class UsersMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      photoUrl: user.photoUrl,
      deleteAt: user.deleteAt,
    };
  }

  static toEntity(userDTO: UserDTO): User {
    return {
      _id: userDTO.id,
      email: userDTO.email,
      name: userDTO.name,
      phoneNumber: userDTO.phoneNumber,
      address: userDTO.address,
      photoUrl: userDTO.photoUrl,
      deleteAt: userDTO.deleteAt,
    };
  }

  static toListDTO(users: UserList): UserListDTO {
    return {
      users: users.users.map((user) => this.toDTO(user)),
      page: users.page,
      total: users.total,
    };
  }
}
