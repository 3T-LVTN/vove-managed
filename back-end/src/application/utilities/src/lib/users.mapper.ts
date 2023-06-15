import {User, UserList} from "@back-end/domain/entities/user";
import {UserDTO, UserListDTO} from "@back-end/domain/dtos/user";

export class UsersMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user._id?.toString(),
      phone: user.phone,
      name: user.name,
      avatar: user.avatar,
      trackingPlaces: user.trackingPlaces,
      addressName: user.addressName,
    };
  }

  static toEntity(userDTO: UserDTO): User {
    return {
      phone: userDTO.phone,
      name: userDTO.name,
      avatar: userDTO.avatar,
      trackingPlaces: userDTO.trackingPlaces,
      addressName: userDTO.addressName,
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
