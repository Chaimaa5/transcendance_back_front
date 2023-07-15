import { ApiProperty } from "@nestjs/swagger"

export class CreateFriendshipDTO{
    @ApiProperty()
    senderId :string
    @ApiProperty()
    receiverId  :string
  }