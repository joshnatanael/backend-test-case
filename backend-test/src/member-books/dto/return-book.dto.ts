import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class ReturnBookBodyDto {
  @ApiProperty({
    description: 'The code of the book',
    default: 'JK-45',
    type: String,
  })
  @JoiSchema(Joi.string().required())
  bookCode: string;

  @ApiProperty({
    description: 'The code of the member',
    default: 'M002',
    type: String,
  })
  @JoiSchema(Joi.string().required())
  memberCode: string;
}
